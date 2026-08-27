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
import type { CmsAboutStat } from "@/types/cms";

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

import { DEFAULT_CMS_ABOUT } from "@/data/cms-defaults";

const About = () => {
  const { open } = useQuoteModal();
  const { data } = useCmsAbout();
  const cms = data || DEFAULT_CMS_ABOUT;
  const a = cms.hero;
  const mission = cms.mission;
  const heroSrc = a.heroImageUrl?.trim() || heroImgFallback;
  const teamSrc = mission.teamImageUrl?.trim() || aboutTeamFallback;
  const factorySrc = cms.manufacturing.factoryImageUrl?.trim() || aboutFactoryFallback;

  return (
    <Layout>
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
            <p className="ds-eyebrow text-accent mb-3">
              {a.sectionLabel}
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              {a.titleLead} <span className="text-accent">{a.titleAccent}</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg font-sans leading-relaxed">{a.description}</p>
            <Button variant="cta" size="lg" className="mt-8" onClick={() => open()}>
              {a.ctaLabel}
            </Button>
          </div>
        </div>
      </section>

      <section className="relative -mt-10 z-10 px-4">
        <div className="container-max max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            {cms.stats
              .filter((s) => s.active)
              .map((stat) => {
              const Icon = STAT_ICONS[stat.icon] ?? Users;
              return (
                <div key={stat.id} className="text-center">
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 mb-3">
                    <Icon size={20} className="text-accent" />
                  </div>
                  <p className="font-display text-2xl sm:text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-sm text-muted-foreground font-sans mt-1">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

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
              <p className="ds-eyebrow text-accent mb-2">
                {mission.sectionLabel}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {mission.titleLead} <span className="text-accent">{mission.titleAccent}</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed font-sans text-base lg:text-lg">
                {mission.paragraph1}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed font-sans">{mission.paragraph2}</p>
              <ul className="mt-6 space-y-3">
                {mission.bullets.map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-sans">
                    <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                      <CheckCircle size={14} className="text-accent" />
                    </span>
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-14">
            <p className="ds-eyebrow text-accent mb-2">
              {cms.timeline.sectionLabel}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {cms.timeline.titleLead} <span className="text-accent">{cms.timeline.titleAccent}</span>
            </h2>
          </div>
          <div className="relative">
            <div className="absolute left-6 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-translate-x-px" />
            <div className="space-y-12">
              {cms.timeline.items
                .filter((it) => it.active)
                .map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <div
                    key={item.id}
                    className={`relative flex items-start gap-6 sm:gap-0 ${!isEven ? "sm:flex-row-reverse" : ""}`}
                  >
                    <div className="absolute left-6 sm:left-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-background -translate-x-1.5 sm:-translate-x-1.5 mt-1.5 z-10" />
                    <div className={`ml-14 sm:ml-0 sm:w-1/2 ${isEven ? "sm:pr-12 sm:text-right" : "sm:pl-12"}`}>
                      <span className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold font-sans mb-2">
                        {item.year}
                      </span>
                      <h3 className="font-display text-xl font-bold text-foreground">{item.title}</h3>
                      <p className="mt-2 text-[13px] text-muted-foreground font-sans leading-[1.78]">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="ds-eyebrow text-accent mb-2">
                {cms.manufacturing.sectionLabel}
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
                {cms.manufacturing.titleLead}{" "}
                <span className="text-accent">{cms.manufacturing.titleAccent}</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed font-sans text-base lg:text-lg">
                {cms.manufacturing.body}
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {cms.manufacturing.highlights.map((label, i) => {
                  const Icon = MANU_ICONS[i % MANU_ICONS.length];
                  return (
                    <div key={`${label}-${i}`} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                      <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Icon size={16} className="text-accent" />
                      </div>
                      <span className="text-sm font-sans font-medium text-foreground">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative group">
              <div className="overflow-hidden rounded-2xl border border-border shadow-lg aspect-video lg:aspect-[4/3] relative">
                <Image
                  src={factorySrc}
                  alt={cms.manufacturing.factoryImageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>
              <div className="absolute -top-5 -left-5 w-20 h-20 rounded-2xl bg-accent-gradient flex items-center justify-center shadow-lg z-10">
                <Factory size={28} className="text-accent-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-muted/30">
        <div className="container-max">
          <div className="text-center mb-14">
            <p className="ds-eyebrow text-accent mb-2">
              {cms.values.sectionLabel}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {cms.values.titleLead} <span className="text-accent">{cms.values.titleAccent}</span>
            </h2>
            <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">{cms.values.description}</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cms.values.items
              .filter((v) => v.active)
              .map((v) => {
              const Icon = VALUE_ICONS[v.icon] ?? Leaf;
              return (
                <div
                  key={v.id}
                  className="p-6 rounded-2xl border border-border bg-card hover:shadow-xl hover:border-accent/30 transition-all duration-400 group text-left"
                >
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 mb-4 group-hover:bg-accent-gradient transition-all duration-300">
                    <Icon
                      size={22}
                      className="text-primary group-hover:text-accent-foreground transition-colors duration-300"
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container-max max-w-4xl">
          <div className="text-center mb-12">
            <p className="ds-eyebrow text-accent mb-2">
              {cms.certifications.sectionLabel}
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              {cms.certifications.titleLead}{" "}
              <span className="text-accent">{cms.certifications.titleAccent}</span>
            </h2>
            <p className="mt-3 text-muted-foreground font-sans max-w-xl mx-auto">
              {cms.certifications.description}
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {cms.certifications.items
              .filter((c) => c.active)
              .map((cert, i) => (
              <div
                key={cert.id}
                className="text-center p-8 rounded-2xl border border-border bg-card hover:shadow-lg transition-all duration-300"
              >
                <div className="relative h-16 w-32 mx-auto mb-4">
                  <Image
                    src={CERT_IMGS[i % CERT_IMGS.length]}
                    alt={cert.title}
                    fill
                    className="object-contain mx-auto"
                  />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground">{cert.title}</h3>
                {cert.rating && (
                  <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold font-sans">
                    {cert.rating} Rating
                  </span>
                )}
                <p className="mt-3 text-[13px] text-muted-foreground font-sans leading-[1.78]">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </Layout>
  );
};

export default About;