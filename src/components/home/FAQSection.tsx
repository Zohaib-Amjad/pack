"use client";

import { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchHomepageFaqs, type FAQItem } from "@/lib/faq-service";

interface FAQSectionProps {
  cms?: any;
  initialFaqs?: FAQItem[];
}

const FAQSection = ({ cms, initialFaqs = [] }: FAQSectionProps) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: faqs = initialFaqs } = useQuery<FAQItem[]>({
    queryKey: ["faqs", "homepage"],
    initialData: initialFaqs.length > 0 ? initialFaqs : undefined,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    queryFn: async () => {
      try {
        const list = await fetchHomepageFaqs();
        return list || [];
      } catch (err) {
        console.error("Error loading homepage FAQs:", err);
        return [];
      }
    },
  });

  // Listen for storage / admin sync events
  useEffect(() => {
    const handleSync = () => {
      queryClient.invalidateQueries({ queryKey: ["faqs", "homepage"] });
    };
    window.addEventListener("storage", handleSync);
    window.addEventListener("focus", handleSync);
    return () => {
      window.removeEventListener("storage", handleSync);
      window.removeEventListener("focus", handleSync);
    };
  }, [queryClient]);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (!faqs || faqs.length === 0) {
    return null;
  }

  return (
    <div>
      <section className="bg-[#faf8f5] border-t border-[#e0ddd6] px-4 sm:px-10 py-16 sm:py-[72px]">
        <div style={{ maxWidth: "760px", margin: "0px auto" }}>
          <h2
            className="font-sans text-center text-[#1a1a1a]"
            style={{ fontSize: "26px", fontWeight: 700, marginBottom: "32px" }}
          >
            {cms?.faq?.titleLead || "Common"}{" "}
            <span className="text-[#e8732a]">
              {cms?.faq?.titleAccent || "Questions"}
            </span>
          </h2>

          <div className="flex flex-col">
            {faqs.map((faq) => {
              const isOpen = openId === faq.id;
              return (
                <div key={faq.id} className="border-b border-[#e0ddd6]">
                  <button
                    type="button"
                    onClick={() => toggle(faq.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${faq.id}`}
                    className="w-full flex items-center justify-between gap-4 bg-transparent border-none text-left cursor-pointer transition-colors font-sans text-[#1a1a1a] hover:text-[#e8732a]"
                    style={{ padding: "20px 0px", fontSize: "13.5px", fontWeight: 400 }}
                  >
                    <span>{faq.question}</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      style={{
                        flexShrink: 0,
                        transition: "transform 0.3s",
                        transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                      }}
                    >
                      <path
                        d="M5 2l5 5-5 5"
                        stroke="#e8732a"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    id={`faq-answer-${faq.id}`}
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      overflow: "hidden",
                      transition: "max-height 0.35s ease",
                    }}
                  >
                    <p
                      className="font-sans text-[#4a4a4a] whitespace-pre-line"
                      style={{
                        fontSize: "13px",
                        lineHeight: 1.75,
                        paddingBottom: "20px",
                        maxWidth: "640px",
                      }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQSection;