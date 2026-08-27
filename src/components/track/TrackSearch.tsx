"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function TrackSearch({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [code, setCode] = useState(initial);
  const [loading, setLoading] = useState(false);

  function go(e: React.FormEvent) {
    e.preventDefault();
    const c = code.trim();
    if (c && !loading) {
      setLoading(true);
      router.push(`/track/${encodeURIComponent(c)}`);
    }
  }

  return (
    <form onSubmit={go} className="flex gap-2">
      <input
        value={code}
        disabled={loading}
        onChange={(e) => setCode(e.target.value)}
        placeholder="e.g. HOF-7K3M-9QX2"
        className="flex-1 rounded-[10px] border border-[#d8d4cc] bg-[#faf8f5] px-3.5 py-2.5 text-[14px] font-mono text-[#1a1a1a] outline-none focus:border-[#2d5c3e] focus:ring-1 focus:ring-[#2d5c3e] disabled:opacity-60"
      />
      <button
        type="submit"
        disabled={loading || !code.trim()}
        className="inline-flex items-center justify-center rounded-[10px] bg-[#2d5c3e] px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-[#1e3d2b] disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed min-w-[95px]"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
            Tracking...
          </>
        ) : (
          "Track"
        )}
      </button>
    </form>
  );
}