"use client";

import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import Image from "next/image";
import {
  CheckCircle,
  Leaf,
  Heart,
  Shield,
  Factory,
  Globe,
  Printer,
  DollarSign,
  HeadphonesIcon,
  Truck,
  Users,
  Target,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useQuoteModal } from "@/components/QuoteModalContext";
import { Button } from "@/components/ui/button";
import { useCmsAbout } from "@/hooks/useCms";

import heroImgFallback from "@/assets/about-hero.jpg";
import aboutFactoryFallback from "@/assets/about-factory.jpg";
import aboutTeamFallback from "@/assets/about-team.jpg";
import badgeBbb from "@/assets/badge-bbb.png";
import badgeFsc from "@/assets/badge-fsc.png";
import badgeSsl from "@/assets/badge-ssl.png";
import type { CmsAbout, CmsAboutStat } from "@/types/cms";
import { DEFAULT_CMS_ABOUT } from "@/data/cms-defaults";

const STAT_ICONS: Record<CmsAboutStat["icon"], LucideIcon> = {
  users: Users,
  factory: Factory,
  globe: Globe,
  truck: Truck,
};

const VALUE_ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  heart: Heart,
  printer: Printer,
  shield: Shield,
  factory: Factory,
  dollar: DollarSign,
  headphones: HeadphonesIcon,
  truck: Truck,
  globe: Globe,
};

const MANU_ICONS = [Printer, Shield, Sparkles, Globe] as const;
const CERT_IMGS = [badgeBbb, badgeFsc, badgeSsl] as const;

type AboutProps = {
  cms?: CmsAbout;
};

const About = ({ cms: initialCms }: AboutProps = {}) => {
  const { open } = useQuoteModal();
  const { data } = useCmsAbout();
  const cms = data || initialCms || DEFAULT_CMS_ABOUT;
  const a = cms.hero;
  const mission = cms.mission;
  const heroSrc = a.heroImageUrl?.trim() || heroImgFallback;
  const teamSrc = mission.teamImageUrl?.trim() || aboutTeamFallback;
  const factorySrc = cms.manufacturing.factoryImageUrl?.trim() || aboutFactoryFallback;

  const statsList = Array.isArray(cms?.stats) ? cms.stats : [];
  const displayStats = statsList.filter((s: any) => s.active !== false && (s.value?.trim() || s.label?.trim()));

  return (
    <Layout>
      {/* 1. Hero & Intro Section */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={heroSrc}
            alt={a.heroImageAlt || "About HOF Pack"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            {a.sectionLabel && (
              <p className="ds-eyebrow text-accent mb-3">
                {a.sectionLabel}
              </p>
            )}
            {(a.titleLead || a.titleAccent) && (
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                {a.titleLead} {a.titleAccent && <span className="text-accent">{a.titleAccent}</span>}
              </h1>
            )}
            {a.description && (
              <p className="mt-4 text-white/70 text-lg font-sans leading-relaxed">{a.description}</p>
            )}
            {a.ctaLabel && (
              <Button variant="cta" size="lg" className="mt-8" onClick={() => open()}>
                {a.ctaLabel}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="relative -mt-10 z-20 px-4">
        <div className="container-max max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.08)] border border-[#e0ddd6] p-6 md:p-8">
            {displayStats.map((stat: any) => {
              const Icon = (stat.icon && (STAT_ICONS as any)[stat.icon]) ? (STAT_ICONS as any)[stat.icon] : Users;
              return (
                <div key={stat.id} className="text-center flex flex-col items-center justify-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] mb-3">
                    <Icon size={20} className="text-[#2d5c3e]" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-[#1a1a1a]">{stat.value}</p>
                  <p className="text-sm font-semibold text-[#7a7672] font-sans mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg aspect-video lg:aspect-[4/3] relative">
                <Image
                  src={teamSrc}
                  alt={mission.teamImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-lg z-10">
                <Target size={28} className="text-accent-foreground" />
              </div>
            </div>
            <div>
              {mission.sectionLabel && (
                <p className="ds-eyebrow text-accent mb-2">
                  {mission.sectionLabel}
                </p>
              )}
              {(mission.titleLead || mission.titleAccent) && (
                <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                  {mission.titleLead} {mission.titleAccent && <span className="text-accent">{mission.titleAccent}</span>}
                </h2>
              )}
              {mission.paragraph1 && (
                <p className="mt-4 text-[#5a5652] leading-relaxed font-sans text-base lg:text-lg">
                  {mission.paragraph1}
                </p>
              )}
              {mission.paragraph2 && (
                <p className="mt-4 text-[#5a5652] leading-relaxed font-sans">{mission.paragraph2}</p>
              )}
              {Array.isArray(mission.bullets) && mission.bullets.length > 0 && (
                <ul className="mt-6 space-y-3">
                  {mission.bullets.map((item: string, i: number) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-sans">
                      <span className="w-6 h-6 rounded-full bg-[#eaf2ed] flex items-center justify-center shrink-0">
                        <CheckCircle size={14} className="text-[#2d5c3e]" />
                      </span>
                      <span className="text-[#1a1a1a] font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Timeline Section */}
      {(() => {
        const timelineItems = Array.isArray(cms.timeline?.items)
          ? cms.timeline.items.filter((it: any) => it.active !== false && (it.year?.trim() || it.title?.trim()))
          : [];
        const hasHeader = Boolean(cms.timeline?.sectionLabel || cms.timeline?.titleLead || cms.timeline?.titleAccent);
        if (!hasHeader && timelineItems.length === 0) return null;

        return (
          <section className="section-padding bg-[#faf8f5] border-t border-[#e0ddd6]">
            <div className="container-max max-w-4xl mx-auto">
              {hasHeader && (
                <div className="text-center mb-14">
                  {cms.timeline.sectionLabel && (
                    <p className="ds-eyebrow text-accent mb-2">
                      {cms.timeline.sectionLabel}
                    </p>
                  )}
                  {(cms.timeline.titleLead || cms.timeline.titleAccent) && (
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                      {cms.timeline.titleLead} {cms.timeline.titleAccent && <span className="text-accent">{cms.timeline.titleAccent}</span>}
                    </h2>
                  )}
                </div>
              )}
              {timelineItems.length > 0 && (
                <div className="relative">
                  <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-[#e0ddd6] sm:-translate-x-px" />
                  <div className="space-y-12">
                    {timelineItems.map((item: any, i: number) => {
                      const isEven = i % 2 === 0;
                      return (
                        <div
                          key={item.id}
                          className={`relative flex items-start gap-6 sm:gap-0 ${!isEven ? "sm:flex-row-reverse" : ""}`}
                        >
                          <div className="absolute left-6 sm:left-1/2 w-3.5 h-3.5 rounded-full bg-[#e8732a] ring-4 ring-[#faf8f5] -translate-x-[7px] sm:-translate-x-[7px] mt-1.5 z-10 shadow-sm" />
                          <div className={`ml-14 sm:ml-0 sm:w-1/2 ${isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                            {item.year && (
                              <span className="inline-block px-3 py-1 rounded-full bg-[#eaf2ed] text-[#2d5c3e] text-xs font-bold font-sans mb-2">
                                {item.year}
                              </span>
                            )}
                            {item.title && (
                              <h3 className="font-display text-xl font-bold text-[#1a1a1a]">{item.title}</h3>
                            )}
                            {item.desc && (
                              <p className="mt-2 text-[13.5px] text-[#5a5652] font-sans leading-[1.78]">{item.desc}</p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* 5. Manufacturing Section */}
      {(() => {
        const highlights = Array.isArray(cms.manufacturing?.highlights)
          ? cms.manufacturing.highlights.filter((h: any) => typeof h === "string" && h.trim().length > 0)
          : [];
        const hasHeader = Boolean(
          cms.manufacturing?.sectionLabel ||
          cms.manufacturing?.titleLead ||
          cms.manufacturing?.titleAccent ||
          cms.manufacturing?.body
        );
        if (!hasHeader && highlights.length === 0) return null;

        return (
          <section className="section-padding bg-background">
            <div className="container-max">
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <div>
                  {cms.manufacturing.sectionLabel && (
                    <p className="ds-eyebrow text-accent mb-2">
                      {cms.manufacturing.sectionLabel}
                    </p>
                  )}
                  {(cms.manufacturing.titleLead || cms.manufacturing.titleAccent) && (
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                      {cms.manufacturing.titleLead}{" "}
                      {cms.manufacturing.titleAccent && <span className="text-accent">{cms.manufacturing.titleAccent}</span>}
                    </h2>
                  )}
                  {cms.manufacturing.body && (
                    <p className="mt-4 text-[#5a5652] leading-relaxed font-sans text-base lg:text-lg">
                      {cms.manufacturing.body}
                    </p>
                  )}
                  {highlights.length > 0 && (
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {highlights.map((label: string, i: number) => {
                        const Icon = MANU_ICONS[i % MANU_ICONS.length];
                        return (
                          <div key={`${label}-${i}`} className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#e0ddd6] shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-[#eaf2ed] text-[#2d5c3e] flex items-center justify-center shrink-0">
                              <Icon size={16} className="text-[#2d5c3e]" />
                            </div>
                            <span className="text-sm font-sans font-semibold text-[#1a1a1a]">{label}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <div className="relative group">
                  <div className="overflow-hidden rounded-2xl border border-[#e0ddd6] shadow-lg aspect-video lg:aspect-[4/3] relative bg-[#f5f3ee]">
                    <Image
                      src={factorySrc}
                      alt={cms.manufacturing.factoryImageAlt || "HOF Pack factory"}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="absolute -top-5 -left-5 w-16 h-16 rounded-2xl bg-[#2d5c3e] flex items-center justify-center shadow-lg z-10 text-white">
                    <Factory size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })()}

      {/* 6. Values Section */}
      {(() => {
        const valueItems = Array.isArray(cms.values?.items)
          ? cms.values.items.filter((v: any) => v.active !== false && (v.title?.trim() || v.desc?.trim()))
          : [];
        const hasHeader = Boolean(
          cms.values?.sectionLabel ||
          cms.values?.titleLead ||
          cms.values?.titleAccent ||
          cms.values?.description
        );
        if (!hasHeader && valueItems.length === 0) return null;

        return (
          <section className="section-padding bg-[#faf8f5] border-t border-[#e0ddd6]">
            <div className="container-max">
              {hasHeader && (
                <div className="text-center mb-14">
                  {cms.values.sectionLabel && (
                    <p className="ds-eyebrow text-accent mb-2">
                      {cms.values.sectionLabel}
                    </p>
                  )}
                  {(cms.values.titleLead || cms.values.titleAccent) && (
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                      {cms.values.titleLead} {cms.values.titleAccent && <span className="text-accent">{cms.values.titleAccent}</span>}
                    </h2>
                  )}
                  {cms.values.description && (
                    <p className="mt-3 text-[#5a5652] font-sans max-w-2xl mx-auto">{cms.values.description}</p>
                  )}
                </div>
              )}
              {valueItems.length > 0 && (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {valueItems.map((v: any) => {
                    const Icon = (VALUE_ICONS as any)[v.icon] ?? Leaf;
                    return (
                      <div
                        key={v.id}
                        className="p-6 rounded-2xl border border-[#e0ddd6] bg-white shadow-sm hover:shadow-xl hover:border-accent/30 transition-all duration-300 group text-left"
                      >
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#eaf2ed] text-[#2d5c3e] mb-4 group-hover:bg-[#2d5c3e] group-hover:text-white transition-all duration-300">
                          <Icon
                            size={22}
                            className="transition-colors duration-300"
                          />
                        </div>
                        <h3 className="font-display text-lg font-bold text-[#1a1a1a]">{v.title}</h3>
                        <p className="text-sm text-[#5a5652] mt-2 font-sans leading-relaxed">{v.desc}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      {/* 7. Certifications Section */}
      {(() => {
        const certItems = Array.isArray(cms.certifications?.items)
          ? cms.certifications.items.filter((c: any) => c.active !== false && (c.title?.trim() || c.desc?.trim()))
          : [];
        const hasHeader = Boolean(
          cms.certifications?.sectionLabel ||
          cms.certifications?.titleLead ||
          cms.certifications?.titleAccent ||
          cms.certifications?.description
        );
        if (!hasHeader && certItems.length === 0) return null;

        return (
          <section className="section-padding bg-white border-t border-[#e0ddd6]">
            <div className="container-max max-w-4xl mx-auto">
              {hasHeader && (
                <div className="text-center mb-12">
                  {cms.certifications.sectionLabel && (
                    <p className="ds-eyebrow text-accent mb-2">
                      {cms.certifications.sectionLabel}
                    </p>
                  )}
                  {(cms.certifications.titleLead || cms.certifications.titleAccent) && (
                    <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#1a1a1a]">
                      {cms.certifications.titleLead}{" "}
                      {cms.certifications.titleAccent && <span className="text-accent">{cms.certifications.titleAccent}</span>}
                    </h2>
                  )}
                  {cms.certifications.description && (
                    <p className="mt-3 text-[#5a5652] font-sans max-w-xl mx-auto">
                      {cms.certifications.description}
                    </p>
                  )}
                </div>
              )}
              {certItems.length > 0 && (
                <div className="grid sm:grid-cols-3 gap-6">
                  {certItems.map((cert: any, i: number) => (
                    <div
                      key={cert.id}
                      className="text-center p-8 rounded-2xl border border-[#e0ddd6] bg-[#faf8f5] hover:shadow-lg transition-all duration-300 flex flex-col items-center"
                    >
                      <div className="relative h-16 w-32 mx-auto mb-4">
                        <Image
                          src={CERT_IMGS[i % CERT_IMGS.length]}
                          alt={cert.title || "Certification badge"}
                          fill
                          className="object-contain mx-auto"
                        />
                      </div>
                      <h3 className="font-display text-lg font-bold text-[#1a1a1a]">{cert.title}</h3>
                      {cert.rating && (
                        <span className="inline-block mt-1.5 px-3 py-0.5 rounded-full bg-[#eaf2ed] text-[#2d5c3e] text-xs font-bold font-sans">
                          {cert.rating} Rating
                        </span>
                      )}
                      {cert.desc && (
                        <p className="mt-2 text-sm text-[#5a5652] font-sans">{cert.desc}</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        );
      })()}

      <CTASection />
    </Layout>
  );
};

export default About;