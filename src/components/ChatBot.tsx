"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, X, Send, User, Bot, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ReactMarkdown from "react-markdown";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { buildInquiryAttribution } from "@/lib/attribution";

type Msg = { role: "user" | "assistant"; content: string; senderType?: string };

const isBusinessHours = () => {
  const now = new Date();
  const estOffset = -5;
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  const est = new Date(utc + 3600000 * estOffset);
  const day = est.getDay();
  const hour = est.getHours();
  return day >= 1 && day <= 5 && hour >= 9 && hour < 18;
};

const CHAT_URL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`;

function getVisitorId() {
  if (typeof window === "undefined") return "server-visitor";
  let id = window.localStorage.getItem("hof_visitor_id");
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem("hof_visitor_id", id);
  }
  return id;
}

async function streamChat({
  messages,
  onDelta,
  onDone,
}: {
  messages: { role: string; content: string }[];
  onDelta: (text: string) => void;
  onDone: () => void;
}) {
  const resp = await fetch(CHAT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY}`,
    },
    body: JSON.stringify({ messages }),
  });
  if (!resp.ok || !resp.body) throw new Error("Failed to start stream");

  const reader = resp.body.getReader();
  const decoder = new TextDecoder();
  let textBuffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    textBuffer += decoder.decode(value, { stream: true });

    let newlineIndex: number;
    while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
      let line = textBuffer.slice(0, newlineIndex);
      textBuffer = textBuffer.slice(newlineIndex + 1);
      if (line.endsWith("\r")) line = line.slice(0, -1);
      if (line.startsWith(":") || line.trim() === "") continue;
      if (!line.startsWith("data: ")) continue;
      const jsonStr = line.slice(6).trim();
      if (jsonStr === "[DONE]") { onDone(); return; }
      try {
        const parsed = JSON.parse(jsonStr);
        const content = parsed.choices?.[0]?.delta?.content as string | undefined;
        if (content) onDelta(content);
      } catch {
        textBuffer = line + "\n" + textBuffer;
        break;
      }
    }
  }
  onDone();
}

const ChatBot = () => {
  const pathname = usePathname();
  const supabase = createPublicClient();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState<"chat" | "inquiry" | "live">("chat");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [liveSessionId, setLiveSessionId] = useState<string | null>(null);
  const [liveStatus, setLiveStatus] = useState<string>("connecting");
  const scrollRef = useRef<HTMLDivElement>(null);
  const live = isBusinessHours();
  const visitorId = useRef(getVisitorId());

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  // Live chat realtime subscription
  useEffect(() => {
    if (!liveSessionId) return;

    const channel = supabase
      .channel(`visitor-msgs-${liveSessionId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "live_chat_messages", filter: `session_id=eq.${liveSessionId}` },
        (payload) => {
          const msg = payload.new as any;
          if (msg.sender_type === "agent") {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: msg.content, senderType: "agent" },
            ]);
          }
        }
      )
      .subscribe();

    // Also listen for session status changes
    const sessionChannel = supabase
      .channel(`visitor-session-${liveSessionId}`)
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "live_chat_sessions", filter: `id=eq.${liveSessionId}` },
        (payload) => {
          const session = payload.new as any;
          setLiveStatus(session.status);
          if (session.status === "active") {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "An agent has joined the chat! How can we help you?", senderType: "system" },
            ]);
          }
          if (session.status === "closed") {
            setMessages((prev) => [
              ...prev,
              { role: "assistant", content: "This chat has been closed. Feel free to start a new one!", senderType: "system" },
            ]);
            setLiveSessionId(null);
            setMode("chat");
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      supabase.removeChannel(sessionChannel);
    };
  }, [liveSessionId, supabase]);

  const startLiveChat = async () => {
    setMode("live");
    setLiveStatus("waiting");
    setMessages([
      { role: "assistant", content: "Connecting you with a live agent... Please wait.", senderType: "system" },
    ]);

    const { data, error } = await withAbortableTimeout((signal) =>
      (supabase
        .from("live_chat_sessions")
        .insert({
          visitor_id: visitorId.current,
          visitor_name: null,
          status: "waiting",
          page_url: pathname || "/",
        })
        .select()
        .abortSignal(signal)
        .single() as any)
    ) as any;

    if (data) {
      setLiveSessionId(data.id);
    } else {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, couldn't connect. Please try again or use the AI assistant.", senderType: "system" },
      ]);
      setMode("chat");
    }
  };

  const sendLiveMessage = async () => {
    if (!input.trim() || !liveSessionId) return;
    const text = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: text }]);

    await withAbortableTimeout((signal) =>
      (supabase
        .from("live_chat_messages")
        .insert({
          session_id: liveSessionId,
          sender_type: "visitor",
          sender_id: visitorId.current,
          content: text,
        })
        .abortSignal(signal) as any)
    );
  };

  const sendAIMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Msg = { role: "user", content: input.trim() };
    setInput("");
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    let assistantSoFar = "";
    const upsertAssistant = (chunk: string) => {
      assistantSoFar += chunk;
      setMessages((prev) => {
        const last = prev[prev.length - 1];
        if (last?.role === "assistant" && !last.senderType) {
          return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
        }
        return [...prev, { role: "assistant", content: assistantSoFar }];
      });
    };

    try {
      await streamChat({
        messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
        onDelta: (chunk) => upsertAssistant(chunk),
        onDone: () => setIsLoading(false),
      });
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again or contact us at info@hofpack.com." },
      ]);
      setIsLoading(false);
    }
  };

  const handleInquiry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const { error } = await withAbortableTimeout((signal) =>
      (supabase
        .from("chat_inquiries")
        .insert({
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          phone: (formData.get("phone") as string) || null,
          product_interest: (formData.get("product") as string) || null,
          message: formData.get("message") as string,
          source: "organic",
          ...buildInquiryAttribution("chat_widget"),
        })
        .abortSignal(signal) as any)
    ) as any;
    if (!error) setInquirySubmitted(true);
  };

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-300"
        aria-label="Open chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {open && (
        <div className="fixed bottom-[10.5rem] right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-background border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden" style={{ height: "500px" }}>
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              {mode === "live" ? <Headphones size={20} className="text-primary-foreground" /> : <Bot size={20} className="text-primary-foreground" />}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-primary-foreground font-display">
                {mode === "live" ? "Live Chat" : "HOF Pack Assistant"}
              </p>
              <p className="text-xs text-primary-foreground/70 font-sans flex items-center gap-1">
                {mode === "live" ? (
                  <>
                    <span className={`w-2 h-2 rounded-full inline-block ${liveStatus === "active" ? "bg-green-400" : "bg-amber-400 animate-pulse"}`} />
                    {liveStatus === "active" ? "Connected to agent" : "Waiting for agent..."}
                  </>
                ) : (
                  <>
                    <span className={`w-2 h-2 rounded-full inline-block ${live ? "bg-green-400" : "bg-muted-foreground"}`} />
                    {live ? "Live agents available" : "AI assistant • Leave a message"}
                  </>
                )}
              </p>
            </div>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-border">
            <button
              onClick={() => { if (mode !== "live") setMode("chat"); }}
              className={`flex-1 text-xs font-medium py-2 transition-colors font-sans ${mode === "chat" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              🤖 AI Chat
            </button>
            <button
              onClick={startLiveChat}
              className={`flex-1 text-xs font-medium py-2 transition-colors font-sans ${mode === "live" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              🎧 Live Agent
            </button>
            <button
              onClick={() => setMode("inquiry")}
              className={`flex-1 text-xs font-medium py-2 transition-colors font-sans ${mode === "inquiry" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}
            >
              📝 Inquiry
            </button>
          </div>

          {mode === "chat" || mode === "live" ? (
            <>
              {/* Messages */}
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-3">
                {messages.length === 0 && mode === "chat" && (
                  <div className="text-center py-8 space-y-2">
                    <Bot size={36} className="mx-auto text-muted-foreground/40" />
                    <p className="text-sm text-muted-foreground font-sans">Hi! 👋 I&apos;m your packaging assistant.</p>
                    <p className="text-xs text-muted-foreground/60 font-sans">Ask me about products, materials, or pricing.</p>
                    <div className="flex flex-wrap gap-1.5 justify-center mt-3">
                      {["What box types do you offer?", "Do you have eco-friendly options?", "What's the turnaround time?"].map((q) => (
                        <button
                          key={q}
                          onClick={() => setInput(q)}
                          className="text-xs px-2.5 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-accent hover:text-accent-foreground transition-colors font-sans"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((msg, i) => (
                  <div key={i} className={`flex gap-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    {msg.role === "assistant" && (
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        {msg.senderType === "agent" ? (
                          <Headphones size={14} className="text-primary" />
                        ) : (
                          <Bot size={14} className="text-primary" />
                        )}
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm font-sans ${
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-md"
                          : msg.senderType === "system"
                          ? "bg-muted text-muted-foreground rounded-bl-md italic text-xs"
                          : "bg-secondary text-secondary-foreground rounded-bl-md"
                      }`}
                    >
                      {msg.role === "assistant" && !msg.senderType ? (
                        <div className="prose prose-sm max-w-none [&>p]:m-0 [&>ul]:m-0 [&>ol]:m-0">
                          <ReactMarkdown>{msg.content}</ReactMarkdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="w-7 h-7 rounded-full bg-accent/10 flex items-center justify-center shrink-0 mt-0.5">
                        <User size={14} className="text-accent" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && messages[messages.length - 1]?.role !== "assistant" && (
                  <div className="flex gap-2">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Bot size={14} className="text-primary" />
                    </div>
                    <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-muted-foreground/40 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (mode === "live") sendLiveMessage(); else sendAIMessage();
                  }}
                  className="flex gap-2"
                >
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder={mode === "live" ? "Message agent..." : "Type your message..."}
                    className="flex-1 text-sm rounded-full font-sans"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="rounded-full w-9 h-9 shrink-0"
                  >
                    <Send size={16} />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            /* Inquiry Form */
            <div className="flex-1 overflow-y-auto p-4">
              {inquirySubmitted ? (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock size={24} className="text-accent" />
                  </div>
                  <h4 className="font-display font-semibold text-foreground">Message Received!</h4>
                  <p className="text-sm text-muted-foreground font-sans">Our team will get back to you within 24 hours.</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => { setInquirySubmitted(false); setMode("chat"); }}
                    className="font-sans"
                  >
                    Back to Chat
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleInquiry} className="space-y-3">
                  <p className="text-sm text-muted-foreground font-sans">Leave your details and we&apos;ll get back to you shortly.</p>
                  <Input name="name" placeholder="Your Name *" required className="text-sm font-sans" />
                  <Input name="email" type="email" placeholder="Email Address *" required className="text-sm font-sans" />
                  <Input name="phone" type="tel" placeholder="Phone (optional)" className="text-sm font-sans" />
                  <select
                    name="product"
                    className="w-full h-9 px-3 rounded-md border border-[#d8d4cc] bg-[#faf8f5] font-sans text-[13px] text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Product Interest (optional)</option>
                    <option>Rigid Boxes</option>
                    <option>Kraft Boxes</option>
                    <option>Mylar Bags</option>
                    <option>Mailer Boxes</option>
                    <option>Display Boxes</option>
                    <option>Cardboard Boxes</option>
                    <option>Other</option>
                  </select>
                  <textarea
                    name="message"
                    placeholder="Your message *"
                    required
                    rows={3}
                    className="w-full px-3 py-2 rounded-md border border-[#d8d4cc] bg-[#faf8f5] font-sans text-[13px] text-[#1a1a1a] resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button type="submit" className="w-full font-sans" size="sm">
                    <Send size={14} /> Submit Inquiry
                  </Button>
                </form>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ChatBot;