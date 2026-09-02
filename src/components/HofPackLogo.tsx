"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface HofPackLogoProps {
  variant?: "light" | "dark";
  className?: string;
  priority?: boolean;
}

const HofPackLogo = ({
  className,
  priority = false,
}: HofPackLogoProps) => {
  return (
    <Image
      src="/images/brand/logo-green-orange.png"
      alt="HOF Pack"
      width={160}
      height={48}
      sizes="120px"
      priority={priority}
      className={cn("block h-12 w-auto object-contain object-left shrink-0", className)}
    />
  );
};

export default HofPackLogo;
