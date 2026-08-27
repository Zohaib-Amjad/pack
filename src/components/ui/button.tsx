import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground font-medium text-sm hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground font-medium text-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background font-medium text-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground font-medium text-sm hover:bg-secondary/80",
        ghost:
          "font-medium text-sm hover:bg-accent hover:text-accent-foreground",
        link: "text-primary text-sm underline-offset-4 hover:underline",

        // ── Design System CTA ─────────────────────────────────────
        // DM Sans · 11.5px · 500 · uppercase · ls 0.10em
        // bg: #e8732a  hover: #c45a18
        cta: [
          "bg-accent text-accent-foreground",
          "font-sans font-medium",
          "text-[11.5px] uppercase tracking-[0.10em]",
          "shadow-md hover:shadow-lg",
          "hover:bg-[#c45a18]",
          "transition-all duration-300 rounded-lg",
        ].join(" "),

        // ── CTA Outline ───────────────────────────────────────────
        "cta-outline": [
          "border-2 border-primary text-primary",
          "font-sans font-medium",
          "text-[11.5px] uppercase tracking-[0.10em]",
          "hover:bg-primary hover:text-primary-foreground",
          "transition-all duration-300 rounded-lg",
        ].join(" "),

        // ── Hero CTA (on dark/image bg) ───────────────────────────
        // Same as cta but slightly larger for hero placement
        hero: [
          "bg-accent text-accent-foreground",
          "font-sans font-medium",
          "text-[12px] uppercase tracking-[0.10em]",
          "shadow-lg hover:shadow-xl",
          "hover:bg-[#c45a18]",
          "transition-all duration-300 rounded-lg",
        ].join(" "),

        // ── Hero Outline (on image/green bg) ─────────────────────
        "hero-outline": [
          "border-2 border-primary-foreground/40 text-primary-foreground",
          "font-sans font-medium",
          "text-[12px] uppercase tracking-[0.10em]",
          "hover:bg-primary-foreground/10",
          "transition-all duration-300 rounded-lg",
        ].join(" "),
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-11 px-8 py-3",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
