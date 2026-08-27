import React from "react";
import Link from "next/link";

interface Section {
  heading: string;
  content: React.ReactNode;
}

interface LegalPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function LegalPage({ eyebrow, title, subtitle, lastUpdated, sections }: LegalPageProps) {
  return (
    <>
      {/* Hero */}
      <section className="bg-hero py-16 sm:py-20 px-4 sm:px-6">
        <div className="container-max max-w-3xl text-center">
          <p className="font-sans text-[10px] font-medium tracking-[0.2em] uppercase text-accent mb-3">{eyebrow}</p>
          <h1 className="font-display text-[40px] sm:text-[52px] font-semibold text-white leading-[1.05] mb-4">{title}</h1>
          <p className="font-sans text-[14px] text-white/75 leading-[1.7] max-w-[520px] mx-auto">{subtitle}</p>
          <p className="font-sans text-[11px] text-white/40 mt-4 uppercase tracking-[0.12em]">Last updated: {lastUpdated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background py-14 sm:py-20 px-4 sm:px-6">
        <div className="container-max max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center font-sans text-[11px] font-bold text-accent">
                    {i + 1}
                  </span>
                  <h2 className="font-display text-[22px] sm:text-[26px] font-semibold text-foreground leading-[1.2]">
                    {section.heading}
                  </h2>
                </div>
                <div className="pl-10 font-sans text-[13.5px] text-[var(--ds-body)] leading-[1.8] space-y-3">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-14 pt-8 border-t border-border">
            <p className="font-sans text-[12px] text-[var(--ds-muted)] text-center leading-[1.7]">
              Questions about this policy?{" "}
              <Link href="/contact" className="text-accent hover:text-[var(--ds-orange-hover)] underline underline-offset-2 transition-colors">
                Contact us
              </Link>{" "}
              and we&apos;ll be happy to help.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
