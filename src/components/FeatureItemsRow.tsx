import type { LucideIcon } from "lucide-react";
import {
  Award,
  Box,
  CheckCircle2,
  Clock3,
  Feather,
  Gift,
  Globe,
  Heart,
  Leaf,
  Maximize,
  Package2,
  Palette,
  Printer,
  Recycle,
  Shield,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import type { FeatureItem } from "@/types/product-content";

const ICON_MAP: Record<string, LucideIcon> = {
  Palette,
  Leaf,
  Feather,
  Sparkles,
  ShieldCheck,
  Package2,
  Maximize,
  Printer,
  CheckCircle2,
  Clock3,
  Star,
  Zap,
  Gift,
  Truck,
  Recycle,
  Award,
  Heart,
  Globe,
  Shield,
  Box,
};

function DynamicIcon({
  name,
  size = 20,
  className = "",
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Icon = ICON_MAP[name] ?? Box;
  return <Icon size={size} className={className} />;
}

type Props = {
  items: FeatureItem[];
};

/**
 * 3-column feature row below Product Specification table (Hof Pack product detail).
 * Renders nothing when feature_items is empty in DB.
 */
export default function FeatureItemsRow({ items }: Props) {
  if (!items || !items.length) return null;

  return (
    <div className="grid gap-5 border-b border-[#e0ddd6] pb-6 sm:grid-cols-2 xl:grid-cols-3 md:gap-6 lg:gap-8">
      {items.map((item) => (
        <div key={item.title} className="flex items-start gap-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-[#f5d5be] bg-[#faf8f5]">
            <DynamicIcon name={item.icon} size={20} className="text-accent" />
          </div>
          <div>
            <p className="mb-1 text-[13px] font-semibold text-[#1a1a1a]">{item.title}</p>
            <p className="text-[12px] leading-6 text-[#5a5652]">{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
