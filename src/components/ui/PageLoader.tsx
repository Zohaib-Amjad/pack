"use client";

import { cn } from "@/lib/utils";

interface PageLoaderProps {
  label?: string;
  className?: string;
  fullScreen?: boolean;
}

export default function PageLoader({
  label = "Loading HofPack...",
  className,
  fullScreen = true,
}: PageLoaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-6 animate-in fade-in duration-500",
        fullScreen ? "min-h-[60vh] w-full" : "py-12",
        className
      )}
    >
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-4 border-accent/10 border-t-accent animate-spin" />
        
        {/* Inner Pulsing Dot */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-accent rounded-full animate-pulse shadow-[0_0_15px_rgba(var(--accent),0.5)]" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <p className="text-[11px] font-sans font-black text-foreground uppercase tracking-[0.3em] pl-[0.3em] animate-pulse">
          {label}
        </p>
        <div className="flex gap-1.5">
          <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="w-1 h-1 bg-accent/40 rounded-full animate-bounce" />
        </div>
      </div>
    </div>
  );
}