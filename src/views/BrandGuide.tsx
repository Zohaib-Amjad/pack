"use client";

import { useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Download } from "lucide-react";
import logo from "@/assets/logo-hofpack.png";

const colorPalette = [
  {
    name: "Primary CTA / Accent",
    hsl: "23, 80%, 54%",
    hex: "#e8732a",
    usage: "All CTA buttons, highlights, badges, active states",
  },
  {
    name: "CTA Hover",
    hsl: "23, 78%, 43%",
    hex: "#c45a18",
    usage: "Button hover state",
  },
  {
    name: "Primary Green / Hero",
    hsl: "142, 34%, 27%",
    hex: "#2d5c3e",
    usage: "Brand identity, hero sections, primary buttons",
  },
  {
    name: "Footer Dark Green",
    hsl: "145, 34%, 18%",
    hex: "#1e3d2b",
    usage: "Footer background, top bar",
  },
  {
    name: "Headings / Dark Text",
    hsl: "0, 0%, 10%",
    hex: "#1a1a1a",
    usage: "All headings, dark text",
  },
  {
    name: "Body Text",
    hsl: "0, 0%, 29%",
    hex: "#4a4a4a",
    usage: "Body copy, descriptions",
  },
  {
    name: "Muted / Labels",
    hsl: "31, 3%, 46%",
    hex: "#7a7672",
    usage: "Secondary text, form labels, captions",
  },
  {
    name: "Placeholder / Eyebrow",
    hsl: "35, 4%, 64%",
    hex: "#aaa6a0",
    usage: "Placeholder text, eyebrow labels",
  },
  {
    name: "Page Background",
    hsl: "43, 26%, 95%",
    hex: "#f5f3ee",
    usage: "Warm cream page background",
  },
  {
    name: "Card / Form Background",
    hsl: "0, 0%, 100%",
    hex: "#ffffff",
    usage: "Cards, modals, form panels",
  },
  {
    name: "Input Background",
    hsl: "38, 32%, 97%",
    hex: "#faf8f5",
    usage: "All form inputs, textareas, selects",
  },
  {
    name: "Border / Divider",
    hsl: "43, 14%, 86%",
    hex: "#e0ddd6",
    usage: "All borders and dividers",
  },
  {
    name: "Input Border",
    hsl: "43, 11%, 82%",
    hex: "#d8d4cc",
    usage: "Input field borders",
  },
];

const typographyScale = [
  {
    name: "Hero Title",
    font: "Cormorant Garamond",
    weight: "700",
    size: "52px",
    usage: "Main hero headline",
  },
  {
    name: "Page Heading / H2",
    font: "Cormorant Garamond",
    weight: "600",
    size: "30–32px",
    usage: "All section headings",
  },
  {
    name: "Sub Heading / H3",
    font: "Cormorant Garamond",
    weight: "600",
    size: "26px",
    usage: "Sub-section headings, modal titles",
  },
  {
    name: "Card / Type Title",
    font: "DM Sans",
    weight: "500",
    size: "13.5–15px",
    usage: "Product card names, category titles",
  },
  {
    name: "FAQ / Nav Heading",
    font: "DM Sans",
    weight: "500",
    size: "20–22px",
    usage: "FAQ labels, section nav headings · uppercase · ls 0.12em",
  },
  {
    name: "Body Copy",
    font: "DM Sans",
    weight: "400",
    size: "13px",
    usage: "All paragraph / descriptive text · lh 1.78",
  },
  {
    name: "Hero Description",
    font: "DM Sans",
    weight: "400",
    size: "13.5px",
    usage: "Hero tagline, page subtitle · lh 1.7",
  },
  {
    name: "Button / CTA",
    font: "DM Sans",
    weight: "500",
    size: "11–12px",
    usage: "All CTA and action buttons · uppercase · ls 0.10em",
  },
  {
    name: "Form Label",
    font: "DM Sans",
    weight: "500",
    size: "9.5px",
    usage: "All form field labels · uppercase · ls 0.09em",
  },
  {
    name: "Section / Eyebrow Label",
    font: "DM Sans",
    weight: "500",
    size: "9–10px",
    usage: "Section eyebrow labels above headings · uppercase · ls 0.16em",
  },
  {
    name: "Nav Links",
    font: "DM Sans",
    weight: "400",
    size: "12.5px",
    usage: "Main navigation links · ls 0.02em",
  },
  {
    name: "Footer Links",
    font: "DM Sans",
    weight: "400",
    size: "12.5px",
    usage: "Footer navigation links",
  },
];

const voiceGuidelines = [
  {
    do: "We make packaging that brands are proud of.",
    dont: "We leverage innovative packaging solutions to elevate brand experiences.",
  },
  {
    do: "Your boxes ship in 8 to 12 days.",
    dont: "Our industry-leading turnaround ensures expedited fulfillment timelines.",
  },
  {
    do: "Tell us what you need. We'll handle the rest.",
    dont: "Submit your specifications and our team will facilitate the production process.",
  },
  {
    do: "We use recycled materials because it matters.",
    dont: "Our commitment to sustainability drives our eco-conscious material selection.",
  },
  {
    do: "Got questions? Call us. Real humans pick up.",
    dont: "Reach out to our dedicated support infrastructure for comprehensive assistance.",
  },
];

const toneTraits = [
  {
    trait: "Confident",
    desc: "We know our craft. No hedging, no filler. State things clearly.",
  },
  {
    trait: "Warm",
    desc: "Talk to people, not at them. Be the helpful expert, not the corporate brochure.",
  },
  {
    trait: "Direct",
    desc: "Short sentences. Active voice. Say what you mean on the first try.",
  },
  {
    trait: "Honest",
    desc: "No inflated claims. If it's 8 to 12 days, say 8 to 12 days. Precision builds trust.",
  },
];

const socialGuidelines = [
  {
    platform: "Instagram",
    tone: "Visual first. Short captions. Show the product, not the pitch. Use behind the scenes, unboxing moments, and customer features.",
    hashtags:
      "#CustomPackaging #HOFPack #UnboxingExperience #BrandPackaging #EcoPackaging",
  },
  {
    platform: "LinkedIn",
    tone: "Professional but not stiff. Share industry insights, brand stories, and manufacturing updates. Celebrate milestones without bragging.",
    hashtags: "#PackagingDesign #SustainableBusiness #BrandIdentity",
  },
  {
    platform: "Facebook",
    tone: "Community focused. Customer stories, quick tips, seasonal promotions. Respond to comments like a person, not a brand.",
    hashtags: "#CustomBoxes #SmallBusinessPackaging #HOFPack",
  },
  {
    platform: "TikTok",
    tone: "Raw and real. Factory floor footage, packing orders, design reveals. No scripts. Let the work speak.",
    hashtags: "#PackagingTok #CustomBoxes #SmallBizTok #UnboxingASMR",
  },
];

const BrandGuide = () => {
  const handleDownloadPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-hero section-padding">
        <div className="container-max text-center text-left">
          <p className="ds-eyebrow text-accent mb-3">Brand Bible</p>
          <h1 className="font-display font-bold text-primary-foreground [text-wrap:balance] max-w-4xl mx-auto" style={{ fontSize: "clamp(26px, 4.5vw, 48px)", lineHeight: 1.12 }}>
            HOF Pack <span className="text-accent">Brand Guide</span>
          </h1>
          <p className="mt-4 text-primary-foreground/70 max-w-2xl mx-auto text-lg font-sans">
            Everything your team needs to represent HOF Pack consistently.
            Colors, type, voice, and usage rules.
          </p>
          <Button
            variant="cta"
            size="lg"
            className="mt-6 print:hidden"
            onClick={handleDownloadPDF}
          >
            <Download className="mr-2 h-5 w-5" />
            Download as PDF
          </Button>
        </div>
      </section>

      {/* Logo Usage */}
      <section className="section-padding bg-background">
        <div className="container-max max-w-5xl">
          <p className="ds-eyebrow text-accent mb-2">01. Logo</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Logo Usage
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="p-10 rounded-2xl border border-border bg-card flex items-center justify-center min-h-[12rem] relative">
              <div className="relative h-20 w-48">
                <Image
                  src={logo}
                  alt="HOF Pack Logo Light"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <div className="p-10 rounded-2xl border border-border bg-primary flex items-center justify-center min-h-[12rem] relative">
              <div className="relative h-20 w-48 brightness-0 invert">
                <Image
                  src={logo}
                  alt="HOF Pack Logo Dark"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                title: "Clear Space",
                desc: "Always maintain padding equal to the height of the 'H' in HOF around all sides of the logo.",
              },
              {
                title: "Minimum Size",
                desc: "Never display the logo smaller than 120px wide on digital or 1 inch on print.",
              },
              {
                title: "Don'ts",
                desc: "Never stretch, rotate, recolor, add shadows, or place the logo on busy backgrounds without a container.",
              },
            ].map((rule) => (
              <div
                key={rule.title}
                className="p-5 rounded-xl border border-border bg-card text-left"
              >
                <h4 className="font-display font-semibold text-foreground text-sm mb-2">
                  {rule.title}
                </h4>
                <p className="text-sm text-muted-foreground font-sans">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="section-padding bg-muted/30">
        <div className="container-max max-w-5xl">
          <p className="ds-eyebrow text-accent mb-2">02. Color</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-8 text-left">
            Color Palette
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {colorPalette.map((color) => (
              <div
                key={color.name}
                className="rounded-2xl border border-border overflow-hidden bg-card text-left"
              >
                <div className="h-24" style={{ backgroundColor: color.hex }} />
                <div className="p-4">
                  <h4 className="font-display font-semibold text-foreground text-sm">
                    {color.name}
                  </h4>
                  <p className="text-xs text-muted-foreground font-sans mt-1">
                    HEX: {color.hex}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans">
                    HSL: {color.hsl}
                  </p>
                  <p className="text-xs text-muted-foreground font-sans mt-2 italic">
                    {color.usage}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-xl border border-border bg-card text-left">
            <h4 className="font-display font-semibold text-foreground text-sm mb-2">
              Gradient Usage
            </h4>
            <div className="grid sm:grid-cols-2 gap-4 text-left">
              <div>
                <div
                  className="h-14 rounded-lg mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #3D5C4E 0%, #4A6D5C 40%, #567A66 100%)",
                  }}
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Hero Gradient. Used for hero sections, dark CTAs, footer
                </p>
              </div>
              <div>
                <div
                  className="h-14 rounded-lg mb-2"
                  style={{
                    background:
                      "linear-gradient(135deg, #D4872E 0%, #E09A3F 100%)",
                  }}
                />
                <p className="text-xs text-muted-foreground font-sans">
                  Accent Gradient. Used for CTA buttons, step badges, highlights
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="section-padding bg-background text-left">
        <div className="container-max max-w-5xl">
          <p className="ds-eyebrow text-accent mb-2">03. Typography</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-8">
            Type System
          </h2>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="p-8 rounded-2xl border border-border bg-card">
              <p className="ds-eyebrow mb-3">Display / Headings</p>
              <p className="font-display text-5xl font-bold text-foreground">
                Cormorant Garamond
              </p>
              <p className="font-display text-lg text-muted-foreground mt-2">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p className="font-display text-lg text-muted-foreground">
                abcdefghijklmnopqrstuvwxyz
              </p>
              <p className="font-display text-lg text-muted-foreground">
                0123456789
              </p>
            </div>
            <div className="p-8 rounded-2xl border border-border bg-card">
              <p className="ds-eyebrow mb-3">Body / UI</p>
              <p className="font-sans text-5xl font-bold text-foreground">
                DM Sans
              </p>
              <p className="font-sans text-lg text-muted-foreground mt-2">
                ABCDEFGHIJKLMNOPQRSTUVWXYZ
              </p>
              <p className="font-sans text-lg text-muted-foreground">
                abcdefghijklmnopqrstuvwxyz
              </p>
              <p className="font-sans text-lg text-muted-foreground">
                0123456789
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {typographyScale.map((t) => (
              <div
                key={t.name}
                className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 p-4 rounded-xl border border-border bg-card text-left"
              >
                <span className="font-display font-semibold text-foreground text-sm min-w-[180px]">
                  {t.name}
                </span>
                <span className="text-xs text-muted-foreground font-sans">
                  {t.font} · {t.weight} · {t.size}
                </span>
                <span className="text-xs text-muted-foreground font-sans italic ml-auto hidden sm:block">
                  {t.usage}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Voice */}
      <section className="section-padding bg-muted/30 text-left">
        <div className="container-max max-w-5xl">
          <p className="ds-eyebrow text-accent mb-2">04. Voice & Tone</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            How We Sound
          </h2>
          <p className="text-muted-foreground font-sans mb-10 max-w-2xl">
            HOF Pack sounds like a knowledgeable friend who happens to run a
            packaging company. We&apos;re clear, warm, and confident. Never
            corporate or fluffy.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
            {toneTraits.map((t) => (
              <div
                key={t.trait}
                className="p-5 rounded-xl border border-border bg-card"
              >
                <h4 className="font-display font-bold text-accent text-lg mb-2">
                  {t.trait}
                </h4>
                <p className="text-sm text-muted-foreground font-sans">
                  {t.desc}
                </p>
              </div>
            ))}
          </div>

          <h3 className="font-display text-xl font-bold text-foreground mb-5">
            Do vs. Don&apos;t
          </h3>
          <div className="space-y-4">
            {voiceGuidelines.map((v, i) => (
              <div key={i} className="grid sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border-2 border-accent/30 bg-accent/5">
                  <span className="text-xs font-bold text-accent font-sans uppercase tracking-wider">
                    ✓ Do
                  </span>
                  <p className="text-sm text-foreground font-sans mt-2">
                    &ldquo;{v.do}&rdquo;
                  </p>
                </div>
                <div className="p-4 rounded-xl border-2 border-destructive/20 bg-destructive/5">
                  <span className="text-xs font-bold text-destructive font-sans uppercase tracking-wider">
                    ✗ Don&apos;t
                  </span>
                  <p className="text-sm text-foreground font-sans mt-2">
                    &ldquo;{v.dont}&rdquo;
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Guidelines */}
      <section className="section-padding bg-background text-left">
        <div className="container-max max-w-5xl">
          <p className="ds-eyebrow text-accent mb-2">05. Social Media</p>
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">
            Platform Guidelines
          </h2>
          <p className="text-muted-foreground font-sans mb-10 max-w-2xl">
            Each platform has its own energy. Adapt the tone but keep the core
            voice consistent.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            {socialGuidelines.map((s) => (
              <div
                key={s.platform}
                className="p-6 rounded-2xl border border-border bg-card"
              >
                <h4 className="font-display text-xl font-bold text-foreground mb-3">
                  {s.platform}
                </h4>
                <p className="text-sm text-muted-foreground font-sans mb-4">
                  {s.tone}
                </p>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs text-muted-foreground font-sans font-medium uppercase tracking-wider mb-1">
                    Suggested Hashtags
                  </p>
                  <p className="text-xs text-accent font-sans">{s.hashtags}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-card">
            <h4 className="font-display font-bold text-foreground mb-3">
              Content Rules
            </h4>
            <ul className="space-y-2">
              {[
                "Always use the official logo. Never recreate it in text.",
                "Keep captions under 150 words. If you need more, use a carousel.",
                "Show real products, real factory footage, real customers. Stock photos break trust.",
                "Reply to every comment and DM within 4 hours during business hours.",
                "Never bash competitors. Focus on what we do well.",
                "Use the brand color palette for any graphics. No neon. No random gradients.",
                "Credit customers when sharing their unboxing content.",
              ].map((rule, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-muted-foreground font-sans"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-1.5" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="section-padding bg-primary text-left">
        <div className="container-max max-w-3xl text-center">
          <h2 className="font-display text-3xl font-bold text-primary-foreground mb-4">
            Quick Reference
          </h2>
          <p className="text-primary-foreground/70 font-sans mb-8">
            Pin this to your team channel.
          </p>
          <div className="grid sm:grid-cols-2 gap-4 text-left">
            {[
              { label: "Display Font", value: "Cormorant Garamond (headings)" },
              { label: "Body Font", value: "DM Sans (UI & body)" },
              { label: "Brand Green", value: "#2d5c3e" },
              { label: "CTA / Accent", value: "#e8732a" },
              { label: "Page Background", value: "#f5f3ee" },
              { label: "Tone", value: "Confident + Warm + Direct" },
              { label: "Logo Min Size", value: "120px / 1 inch" },
              {
                label: "Social Voice",
                value: "Helpful expert, not a brochure",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center p-3 rounded-lg bg-primary-foreground/10"
              >
                <span className="text-sm font-sans text-primary-foreground/60">
                  {item.label}
                </span>
                <span className="text-sm font-sans font-semibold text-primary-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BrandGuide;