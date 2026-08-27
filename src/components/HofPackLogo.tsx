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
      width={256}
      height={154}
      sizes="(min-width: 1024px) 140px, 100px"
      priority={priority}
      quality={65}
      className={cn("block h-10 w-auto shrink-0", className)}
    />
  );
};

export default HofPackLogo;
