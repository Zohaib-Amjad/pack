import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Layout
          "flex min-h-[80px] w-full rounded-md px-3 py-2",
          // Design System Typography — DM Sans 13px 400
          "font-sans text-[13px] font-normal leading-[1.5]",
          // Design System Colors
          "bg-[#faf8f5] text-[#1a1a1a]",
          "border border-[#d8d4cc]",
          "placeholder:text-[#aaa6a0]",
          // Focus — brand orange border + subtle glow
          "transition-colors duration-150",
          "focus-visible:outline-none focus-visible:border-[#e8732a] focus-visible:ring-2 focus-visible:ring-[#e8732a]/25 focus-visible:ring-offset-0",
          // Disabled
          "disabled:cursor-not-allowed disabled:opacity-50",
          // Resize
          "resize-y",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export { Textarea };
