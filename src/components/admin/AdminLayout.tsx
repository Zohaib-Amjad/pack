"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  ChartColumn,
  Square,
  List,
  Star,
  LayoutGrid,
  Package,
  ChartLine,
  Sparkles,
  Workflow,
  MessageSquare,
  Clock,
  CircleCheck,
  User,
  FileText,
  Grid3X3,
  Image as ImageIcon,
  Pencil,
  Layers,
  Mail,
  Search,
  CircleHelp,
  Users,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  breadcrumbs?: { label: string; href?: string }[];
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  badge?: string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

export default function AdminLayout({
  children,
  breadcrumbs = [
    { label: "Admin", href: "/admin" },
    { label: "Global settings" },
    { label: "FAQs" },
  ],
}: AdminLayoutProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navGroups: NavGroup[] = [
    {
      label: "Overview",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: ChartColumn,
        },
      ],
    },
    {
      label: "Homepage",
      items: [
        { label: "Hero section", href: "/admin/cms/home/hero", icon: Square },
        { label: "Announcement bar", href: "/admin/cms/home/announcement", icon: List },
        { label: "Trust bar", href: "/admin/cms/home/trust-bar", icon: Star },
        { label: "Featured categories", href: "/admin/cms/home/featured-categories", icon: LayoutGrid },
        { label: "Related products", href: "/admin/cms/home/related-products", icon: Package },
        { label: "More products", href: "/admin/cms/home/more-products", icon: Package },
        { label: "Sustainability", href: "/admin/cms/home/sustainability", icon: ChartLine },
        { label: "Why us", href: "/admin/cms/home/why-us", icon: Sparkles },
        { label: "How it works", href: "/admin/cms/home/how-it-works", icon: Workflow },
        { label: "Testimonials", href: "/admin/cms/home/testimonials", icon: MessageSquare },
        { label: "FAQ heading", href: "/admin/cms/home/faq", icon: Clock },
        { label: "Packaging showcase", href: "/admin/cms/home/packaging-showcase", icon: Package },
        { label: "Bottom CTA", href: "/admin/cms/home/cta", icon: CircleCheck },
      ],
    },
    {
      label: "About page",
      items: [
        { label: "Hero & intro", href: "/admin/cms/about/hero", icon: User },
        { label: "Stats strip", href: "/admin/cms/about/stats", icon: ChartColumn },
        { label: "Mission", href: "/admin/cms/about/mission", icon: FileText },
        { label: "Company timeline", href: "/admin/cms/about/timeline", icon: Workflow },
        { label: "Manufacturing", href: "/admin/cms/about/manufacturing", icon: Grid3X3 },
        { label: "Values cards", href: "/admin/cms/about/values", icon: LayoutGrid },
        { label: "Certifications", href: "/admin/cms/about/certifications", icon: Star },
      ],
    },
    {
      label: "Process page",
      items: [
        { label: "Hero", href: "/admin/cms/process/hero", icon: Square },
        { label: "Stats row", href: "/admin/cms/process/stats", icon: ChartColumn },
        { label: "Process steps", href: "/admin/cms/process/steps", icon: Workflow },
        { label: "Quality promise", href: "/admin/cms/process/promise", icon: CircleCheck },
      ],
    },
    {
      label: "Portfolio page",
      items: [
        { label: "Page header", href: "/admin/cms/portfolio/header", icon: Square },
        { label: "Gallery & filters", href: "/admin/cms/portfolio/filters", icon: Grid3X3 },
        { label: "All projects", href: "/admin/portfolio", icon: ImageIcon },
      ],
    },
    {
      label: "Blog",
      items: [
        { label: "All posts", href: "/admin/blog", icon: FileText },
        { label: "New post", href: "/admin/blog/new", icon: Pencil },
      ],
    },
    {
      label: "Case Studies",
      items: [
        { label: "All case studies", href: "/admin/case-studies", icon: FileText },
        { label: "New case study", href: "/admin/case-studies/new", icon: Pencil },
      ],
    },
    {
      label: "Library page",
      items: [
        { label: "Hero section", href: "/admin/cms/library/hero", icon: Square },
      ],
    },
    {
      label: "Library items",
      items: [
        { label: "All items", href: "/admin/library", icon: FileText },
        { label: "New item", href: "/admin/library/new", icon: Pencil },
      ],
    },
    {
      label: "Product pages",
      items: [
        { label: "All products", href: "/admin/products", icon: FileText },
        { label: "New product", href: "/admin/products/new", icon: Pencil },
        { label: "Nav categories", href: "/admin/categories", icon: Layers },
      ],
    },
    {
      label: "Communication",
      items: [
        {
          label: "Inquiries",
          href: "/admin/inquiries",
          icon: Mail,
          badge: "88",
        },
      ],
    },
    {
      label: "Global settings",
      items: [
        { label: "SEO & Meta", href: "/admin/cms/seo", icon: Search },
        { label: "Contact & inquiries", href: "/admin/settings", icon: Mail },
        { label: "General settings", href: "/admin/settings", icon: FileText },
        { label: "FAQs", href: "/admin/faqs", icon: CircleHelp },
        { label: "Team management", href: "/admin/team", icon: Users },
      ],
    },
  ];

  return (
    <div
      className="admin-theme flex h-screen bg-[#f5f3ee] font-sans overflow-hidden selection:bg-[#2d5c3e]/10 selection:text-[#2d5c3e]"
      data-admin-shell="true"
    >
      {/* ── Mobile Sidebar Overlay ── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── 1. Left Navigation Sidebar ── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[228px] flex-col shrink-0 bg-[#2d5c3e] text-white transition-all duration-300 lg:static lg:translate-x-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } shadow-[12px_0_40px_rgba(0,0,0,0.08)]`}
      >
        {/* Brand Header */}
        <div className="shrink-0 border-b border-white/[0.08] px-4 pt-[14px] pb-[12px] flex items-center justify-between">
          <div>
            <Link href="/admin" className="block shrink-0">
              <Image
                src="/Green and Orange.png"
                alt="HOF Pack"
                width={140}
                height={40}
                className="h-10 w-auto block shrink-0"
                priority
              />
            </Link>
            <div className="mt-[4px] text-[9px] font-bold uppercase tracking-[0.1em] text-white/35">
              Admin · Content Manager
            </div>
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-1 rounded-md text-white/60 hover:text-white lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Items List */}
        <nav className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden py-2 [scrollbar-width:thin] [scrollbar-color:rgba(255,255,255,0.12)_transparent]">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx}>
              {groupIdx > 0 && (
                <div
                  className="my-[3px] h-px bg-white/[0.06]"
                  aria-hidden="true"
                />
              )}
              <div className="py-2">
                <div className="select-none px-4 pb-[3px] pt-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[rgba(255,255,255,0.58)]">
                  {group.label}
                </div>
                <div className="flex flex-col">
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/admin" &&
                        pathname?.startsWith(item.href));

                    return (
                      <Link
                        key={`${group.label}-${item.label}`}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`group flex items-center gap-[9px] border-l-[2.5px] py-[7px] pl-[14px] pr-4 text-[12px] font-medium no-underline transition-colors duration-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e8732a]/45 focus-visible:ring-inset ${
                          isActive
                            ? "border-[#e8732a] bg-white/[0.13] text-white visited:text-white"
                            : "border-transparent text-white/55 visited:text-white/55 hover:bg-white/[0.07] hover:text-white/90"
                        }`}
                      >
                        <Icon
                          className={`h-[13px] w-[13px] shrink-0 text-current ${
                            isActive
                              ? "text-white opacity-100"
                              : "opacity-[0.65] group-hover:opacity-100"
                          }`}
                          strokeWidth={1.5}
                        />
                        <span className="leading-snug flex-1 truncate">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span className="ml-auto inline-flex min-w-[18px] items-center justify-center rounded-full bg-[#e8732a] px-1.5 py-[1px] text-[9px] font-extrabold leading-none text-white">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </nav>
      </aside>

      {/* ── 2. Main Content Canvas ── */}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-[#f5f3ee]/50 text-[#1a1a1a]">
        {/* Top Header Bar */}
        <header className="h-[52px] min-h-[52px] bg-white/80 backdrop-blur-md border-b border-[#e0ddd6]/80 px-5 sm:px-6 flex items-center justify-between shrink-0 sticky top-0 z-30 shadow-sm">
          {/* Breadcrumbs */}
          <div className="bc flex items-center gap-2 text-[12px] font-medium animate-in fade-in slide-in-from-left-4 duration-500 min-w-0">
            {breadcrumbs.map((crumb, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="w-1 h-1 rounded-full bg-[#e0ddd6]" />
                )}
                {idx === breadcrumbs.length - 1 ? (
                  <span className="text-[#1a1a1a] font-bold tracking-tight truncate">
                    {crumb.label}
                  </span>
                ) : crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-[#7a7672] hover:text-[#1a1a1a] transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[#7a7672] truncate">{crumb.label}</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Header Actions */}
          <div className="tr flex items-center gap-4">
            <div className="flex items-center gap-2 border-l border-[#e0ddd6] pl-3 ml-1">
              <a target="_blank" rel="noopener noreferrer" href="/">
                <button className="h-8 px-3 inline-flex items-center gap-1.5 text-[11px] font-semibold rounded-md border border-[#e0ddd6] bg-white text-[#7a7672] hover:bg-[#f5f3ee] hover:border-[#7a7672] transition-colors active:scale-[0.98]">
                  Preview ↗
                </button>
              </a>
            </div>

            {/* Admin Profile Dropdown Button */}
            <div className="flex items-center gap-1.5 h-8 pl-1 pr-2.5 ml-1 rounded-full border border-[#e8732a]/20 bg-white hover:bg-[#f5f3ee] transition-colors outline-none cursor-pointer max-w-[min(100%,220px)]">
              <div className="h-[26px] w-[26px] shrink-0 rounded-full bg-[#e8732a] flex items-center justify-center text-white font-bold text-[10px]">
                A
              </div>
              <span className="text-[12px] font-semibold text-[#1a1a1a] truncate hidden sm:inline">
                admin
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-[#aaa6a0] shrink-0" />
            </div>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="h-8 w-8 flex items-center justify-center rounded-lg bg-[#f5f3ee] hover:bg-[#e0ddd6] text-[#1a1a1a] transition-colors border border-[#e0ddd6]/50 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </header>

        {/* Page Main Content Scrollable Area */}
        <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
}
