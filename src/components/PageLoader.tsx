"use client";

import HofPackLogo from "@/components/HofPackLogo";

/**
 * Full-page branded loader.
 * Used in:
 *  - app/loading.tsx  → Next.js route transitions
 *  - Index.tsx        → while CMS data is fetching (isPlaceholderData)
 */
export default function PageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#f5f3ee]">
      <HofPackLogo variant="light" priority className="h-20 w-auto mb-8" />

      {/* Sliding orange progress bar */}
      <div className="w-40 h-[3px] bg-[#e0ddd6] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#e8732a] rounded-full"
          style={{ width: "45%", animation: "hofpack-loading 1.4s ease-in-out infinite" }}
        />
      </div>

      <style>{`
        @keyframes hofpack-loading {
          0%   { transform: translateX(-120%); }
          100% { transform: translateX(340%); }
        }
      `}</style>

      <p className="font-sans text-[11px] text-[#aaa6a0] tracking-[0.12em] uppercase mt-4">
        Loading…
      </p>
    </div>
  );
}