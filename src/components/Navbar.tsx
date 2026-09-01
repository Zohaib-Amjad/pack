"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  // Industry icons
  Flame,
  Coffee,
  Sparkles,
  ShoppingBag,
  Shirt,
  Cpu,
  Utensils,
  Croissant,
  Package,
  Wine,
  Gem,
  Gift,
  Pill,
  PawPrint,
  Cannabis,
  Cigarette,
  Paintbrush,
  Droplets,
  // Material & Style icons
  Box,
  Layers,
  Cylinder,
  Boxes,
  Sticker,
  Archive,
  Monitor,
  PackageOpen,
  PackageCheck,
  Mailbox,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";

type IconComponent = ComponentType<LucideProps>;
import HofPackLogo from "@/components/HofPackLogo";
import { useSettings } from "@/hooks/useSettings";
import { useQuery } from "@tanstack/react-query";
import { categories as defaultCategories } from "@/data/products";
import SearchBar from "@/components/navbar/SearchBar";

const QuoteButton = ({ fullWidth }: { fullWidth?: boolean }) => {
  const { open } = useQuoteModal();
  return (
    <Button
      variant="cta"
      size="lg"
      className={fullWidth ? "w-full" : ""}
      onClick={() => open()}
    >
      Get a Free Quote
    </Button>
  );
};

// Icon map — matched by slug keywords
const CATEGORY_ICONS: Record<string, IconComponent> = {
  // Industry
  bakery: Croissant,
  bread: Croissant,
  pastry: Croissant,
  cake: Croissant,
  donut: Croissant,
  candle: Flame,
  coffee: Coffee,
  cafe: Coffee,
  tea: Coffee,
  cosmetic: Sparkles,
  makeup: Sparkles,
  beauty: Sparkles,
  skincare: Sparkles,
  cigarette: Cigarette,
  tobacco: Cigarette,
  cigar: Cigarette,
  jewelry: Gem,
  jewel: Gem,
  retail: ShoppingBag,
  store: ShoppingBag,
  wax: Paintbrush,
  paper: Paintbrush,
  wrap: Paintbrush,
  soap: Droplets,
  bath: Droplets,
  food: Utensils,
  apparel: Shirt,
  clothing: Shirt,
  shirt: Shirt,
  fashion: Shirt,
  tech: Cpu,
  electronics: Cpu,
  pharma: Pill,
  pill: Pill,
  medicine: Pill,
  cannabis: Cannabis,
  cbd: Cannabis,
  weed: Cannabis,
  wine: Wine,
  bottle: Wine,
  pet: PawPrint,

  // Material
  cardboard: Boxes,
  corrugated: Layers,
  kraft: Package,
  mylar: Archive,
  rigid: Box,

  // Style
  sticker: Sticker,
  label: Sticker,
  mailer: Mailbox,
  display: Monitor,
  gable: PackageOpen,
  pillow: Gift,
  tube: Cylinder,
  tuck: PackageCheck,

  // Fallback
  default: Box,
};

function getCategoryIcon(slug: string): IconComponent {
  const lower = slug.toLowerCase();
  for (const [key, Icon] of Object.entries(CATEGORY_ICONS)) {
    if (key !== "default" && lower.includes(key)) return Icon;
  }
  return CATEGORY_ICONS.default;
}

interface MegaMenuProps {
  label: string;
  categories: { name: string; slug: string }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

interface SimpleMenuProps {
  label: string;
  links: { label: string; href: string }[];
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SimpleMenuItem = ({
  label,
  links,
  isOpen,
  onOpen,
  onClose,
}: SimpleMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 px-3.5 py-2.5 ds-nav-link text-foreground/85 hover:text-foreground rounded-md transition-colors"
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
      >
        {label}{" "}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full pt-1.5 bg-transparent z-50 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
          style={{
            width: "clamp(220px, 18vw, 280px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-3 animate-fade-in">
            <div className="grid grid-cols-1 gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  onClick={onClose}
                  className="flex items-center px-3 py-2.5 rounded-xl text-foreground border border-transparent hover:border-accent/30 hover:bg-accent/5 transition-all"
                >
                  <span className="font-sans text-[13.5px] font-normal leading-snug">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const MegaMenuItem = ({
  label,
  categories,
  isOpen,
  onOpen,
  onClose,
}: MegaMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    onOpen();
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      onClose();
    }, 150);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isOpen, onClose]);

  const isMultiColumn = categories.length > 5;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 px-3.5 py-2.5 ds-nav-link text-foreground/85 hover:text-foreground rounded-md transition-colors"
        onClick={() => (isOpen ? onClose() : onOpen())}
        aria-expanded={isOpen}
      >
        {label}{" "}
        <ChevronDown
          size={13}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-accent" : ""}`}
        />
      </button>

      {isOpen && (
        <div
          className="absolute top-full pt-1.5 bg-transparent z-50 before:absolute before:-top-3 before:left-0 before:right-0 before:h-3 before:content-['']"
          style={{
            width: isMultiColumn ? "clamp(540px, 45vw, 680px)" : "clamp(280px, 24vw, 360px)",
            left: "50%",
            transform: "translateX(-50%)",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="bg-background border border-border rounded-2xl shadow-2xl p-4 animate-fade-in">
            <p className="px-2 pb-3 font-sans text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground/50 border-b border-border/50 mb-3">
              {label}
            </p>
            <div className={`grid gap-1.5 ${isMultiColumn ? "grid-cols-2" : "grid-cols-1"}`}>
              {categories.map((cat) => {
                const Icon = getCategoryIcon(cat.slug);
                return (
                  <Link
                    key={cat.slug}
                    href={`/${cat.slug}`}
                    prefetch={false}
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-foreground border border-transparent hover:border-accent/30 hover:bg-accent/5 transition-all group"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/12 text-accent group-hover:bg-accent/20 transition-colors">
                      <Icon size={18} strokeWidth={2.2} />
                    </span>
                    <span className="font-sans text-[13.5px] font-normal leading-snug">
                      {cat.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const { settings } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const pathname = usePathname();

  const { data: categories = defaultCategories } = useQuery({
    queryKey: ["public", "categories-nav"],
    staleTime: 0,
    refetchOnMount: true,
    initialData: defaultCategories,
    queryFn: async () => {
      try {
        const { fetchAllAdminCategories } = await import("@/lib/category-service");
        const list = await fetchAllAdminCategories();
        if (list && list.length > 0) {
          return list.filter((c) => c.is_active !== false);
        }
      } catch {}
      return defaultCategories;
    },
  });

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  const getUniqueCategories = (sectionName: string) => {
    const map = new Map<string, any>();
    categories
      .filter((c: any) => c.section === sectionName)
      .forEach((c: any) => {
        const canonical = c.slug === "kraft-boxes" ? "custom-kraft-boxes" : c.slug;
        const key = `${canonical}-${c.name.toLowerCase().trim()}`;
        if (!map.has(key)) {
          map.set(key, { ...c, slug: canonical });
        }
      });
    return Array.from(map.values());
  };

  const industryCategories = getUniqueCategories("industry");
  const materialCategories = getUniqueCategories("material");
  const styleCategories = getUniqueCategories("style");

  const megaMenus = [
    {
      label: "Boxes by Industry",
      key: "industry",
      categories: industryCategories,
    },
    {
      label: "Boxes by Material",
      key: "material",
      categories: materialCategories,
    },
    {
      label: "Boxes by Style",
      key: "style",
      categories: styleCategories,
    },
  ].filter((menu) => menu.categories.length > 0);

  const helpCenterLinks = [
    { label: "Artwork Guidelines", href: "/artwork-guidelines" },
    { label: "Blog", href: "/blog" },
    { label: "Library", href: "/library" },
  ];

  const utilityBadges = [
    "Earth-Friendly Packaging",
    "Cruelty-Free",
    "Made in USA",
    "Low MOQ",
    "Free Design Support",
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] border-b border-border bg-background lg:bg-background/95 lg:backdrop-blur-md w-full">
      {/* ── Top utility bar ── */}
      <div className="hidden lg:block bg-[#2d5c3e] text-white">
        <div className="container-max flex h-8 items-center justify-between">
          <div className="flex items-center gap-[18px]">
            {utilityBadges.map((badge) => (
              <div key={badge} className="flex items-center gap-[5px] font-sans text-[11px] text-white/80">
                <div className="w-[5px] h-[5px] rounded-full bg-accent shrink-0" />
                {badge}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-[6px] font-sans text-[11.5px] font-medium text-white/90">
            {settings.contact.email && (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="#e8732a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M22 6l-10 7L2 6" stroke="#e8732a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href={`mailto:${settings.contact.email}`} className="text-white/85 hover:text-accent transition-colors no-underline">
                  {settings.contact.email}
                </a>
              </>
            )}
            {settings.contact.email && settings.contact.phone && (
              <span className="text-white/25 mx-1">|</span>
            )}
            {settings.contact.phone && (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.06 2.22 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z" stroke="#e8732a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <a href={`tel:${settings.contact.phone.replace(/[^0-9+]/g, "")}`} className="text-white/85 hover:text-accent transition-colors no-underline">
                  {settings.contact.phone}
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ── Main navbar row ── */}
      <div className="container-max">
        <div className="flex items-center justify-between h-20 lg:h-20 gap-4">
          {/* Logo */}
          <Link href="/" prefetch={false} className="flex items-center gap-2 shrink-0">
            <HofPackLogo variant="light" className="h-10 sm:h-11 lg:h-16 w-auto shrink-0" />
          </Link>

          {/* ── Desktop nav links ── */}
          <div className="hidden lg:flex items-center gap-0.5">
            <Link
              href="/"
              prefetch={false}
              className={`px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                pathname === "/" ? "text-accent font-semibold" : "text-foreground/85 hover:text-foreground"
              }`}
            >
              Home
            </Link>

            {megaMenus.map((menu) => (
              <MegaMenuItem
                key={menu.key}
                label={menu.label}
                categories={menu.categories}
                isOpen={openMenu === menu.key}
                onOpen={() => setOpenMenu(menu.key)}
                onClose={() => setOpenMenu(null)}
              />
            ))}

            <Link
              href="/contact"
              prefetch={false}
              className={`px-3.5 py-2.5 ds-nav-link rounded-md transition-colors ${
                pathname === "/contact" ? "text-accent font-semibold" : "text-foreground/85 hover:text-foreground"
              }`}
            >
              Contact Us
            </Link>

            <SimpleMenuItem
              label="Help Center"
              links={helpCenterLinks}
              isOpen={openMenu === "help-center"}
              onOpen={() => setOpenMenu("help-center")}
              onClose={() => setOpenMenu(null)}
            />
          </div>

          {/* Desktop actions */}
          <div className="hidden lg:flex items-center gap-2">
            <SearchBar />
            <QuoteButton />
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className="lg:hidden inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background text-foreground hover:text-accent hover:border-accent/40 active:scale-95 transition-all cursor-pointer shadow-sm ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-tray"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu tray ── */}
      {mobileOpen && (
        <div
          id="mobile-nav-tray"
          className="fixed inset-0 z-[120] bg-background opacity-100 transition-opacity duration-300 ease-out lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="flex h-dvh w-full flex-col bg-background px-4 pb-6 pt-4 sm:px-6 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border/70 pb-3.5">
              <Link href="/" prefetch={false} onClick={() => setMobileOpen(false)}>
                <HofPackLogo variant="light" className="h-9 w-auto" />
              </Link>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background text-foreground transition-all hover:border-accent/40 hover:text-accent cursor-pointer"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Inline search */}
            <div className="my-3">
              <SearchBar mode="inline" onResultSelect={() => setMobileOpen(false)} />
            </div>

            {/* Main Links */}
            <div className="flex-1 space-y-1 overflow-y-auto pr-1 [scrollbar-width:thin]">
              <Link
                href="/"
                prefetch={false}
                className={`flex min-h-[44px] items-center rounded-lg px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                  pathname === "/" ? "text-accent font-semibold bg-accent/5" : "text-foreground hover:bg-accent/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {megaMenus.map((menu) => (
                <div key={menu.key} className="rounded-lg border border-transparent">
                  <button
                    className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-[14px] font-medium text-foreground hover:bg-accent/5 cursor-pointer"
                    onClick={() =>
                      setMobileExpanded(
                        mobileExpanded === menu.key ? null : menu.key,
                      )
                    }
                    aria-expanded={mobileExpanded === menu.key}
                  >
                    {menu.label}
                    <ChevronDown
                      size={15}
                      className={`transition-transform duration-200 ${
                        mobileExpanded === menu.key ? "rotate-180 text-accent" : ""
                      }`}
                    />
                  </button>

                  {mobileExpanded === menu.key && (
                    <div className="space-y-0.5 pb-2 pl-3 pr-2 animate-fade-in">
                      {menu.categories.map((cat: any) => {
                        const Icon = getCategoryIcon(cat.slug);
                        return (
                          <Link
                            key={cat.slug}
                            href={`/${cat.slug}`}
                            prefetch={false}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/5 hover:text-accent group"
                            onClick={() => setMobileOpen(false)}
                          >
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent group-hover:bg-accent/20 transition-colors">
                              <Icon size={15} strokeWidth={2.2} />
                            </span>
                            <span className="font-sans text-[12.5px] font-normal">{cat.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                prefetch={false}
                className={`flex min-h-[44px] items-center rounded-lg px-3.5 py-2.5 text-[14px] font-medium transition-colors ${
                  pathname === "/contact" ? "text-accent font-semibold bg-accent/5" : "text-foreground hover:bg-accent/5"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                Contact Us
              </Link>

              {/* Help Center Accordion */}
              <div className="rounded-lg border border-transparent">
                <button
                  className="flex min-h-[44px] w-full items-center justify-between rounded-lg px-3.5 py-2.5 text-left text-[14px] font-medium text-foreground hover:bg-accent/5 cursor-pointer"
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === "help-center" ? null : "help-center"
                    )
                  }
                  aria-expanded={mobileExpanded === "help-center"}
                >
                  Help Center
                  <ChevronDown
                    size={15}
                    className={`transition-transform duration-200 ${
                      mobileExpanded === "help-center" ? "rotate-180 text-accent" : ""
                    }`}
                  />
                </button>

                {mobileExpanded === "help-center" && (
                  <div className="space-y-0.5 pb-2 pl-3 pr-2 animate-fade-in">
                    {helpCenterLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        prefetch={false}
                        className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-muted-foreground transition-colors hover:bg-accent/5 hover:text-accent font-sans text-[12.5px] ${
                          pathname === link.href ? "text-accent font-semibold bg-accent/5" : ""
                        }`}
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="font-sans text-[12.5px] font-normal">{link.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Quick Contact & CTA */}
            <div className="mt-3 border-t border-border/70 pt-3.5 space-y-2.5 shrink-0">
              <div className="flex items-center justify-between text-[12px] text-muted-foreground px-1">
                <a
                  href={`tel:${settings.contact.phone?.replace(/[^0-9+]/g, "") || "+18884294881"}`}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-medium transition-colors"
                >
                  <Phone size={13} className="text-accent" />
                  {settings.contact.phone || "+1 (888) 429-4881"}
                </a>
                <a
                  href={`mailto:${settings.contact.email || "info@hofpack.com"}`}
                  className="inline-flex items-center gap-1.5 text-foreground hover:text-accent font-medium transition-colors"
                >
                  <Mail size={13} className="text-accent" />
                  {settings.contact.email || "info@hofpack.com"}
                </a>
              </div>

              <QuoteButton fullWidth />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
