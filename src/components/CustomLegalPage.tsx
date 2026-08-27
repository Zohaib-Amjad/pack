import React from "react";
import CustomPackingShell from "@/components/CustomPackingShell";

interface Section {
  heading: string;
  content: React.ReactNode;
}

interface CustomLegalPageProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
}

export default function CustomLegalPage({
  eyebrow,
  title,
  subtitle,
  lastUpdated,
  sections,
}: CustomLegalPageProps) {
  return (
    <CustomPackingShell>
      <section className="bg-[linear-gradient(130deg,#1f5a38_0%,#1f5a38_45%,#2a6b45_100%)] px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-[#ee7a1b]">
            {eyebrow}
          </p>
          <h1 className="mb-4 text-[40px] font-semibold leading-[1.05] text-white sm:text-[52px]">
            {title}
          </h1>
          <p className="mx-auto max-w-[520px] text-[14px] leading-[1.7] text-white/80">
            {subtitle}
          </p>
          <p className="mt-4 text-[11px] uppercase tracking-[0.12em] text-white/45">
            Last updated: {lastUpdated}
          </p>
        </div>
      </section>

      <section className="bg-white px-4 py-14 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-col gap-10">
            {sections.map((section, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#f1be95] bg-[#fff2e5] text-[11px] font-bold text-[#ee7a1b]">
                    {i + 1}
                  </span>
                  <h2 className="text-[22px] font-semibold leading-[1.2] text-[#1f1f1f] sm:text-[26px]">
                    {section.heading}
                  </h2>
                </div>
                <div className="space-y-3 pl-10 text-[13.5px] leading-[1.8] text-[#4f5856]">
                  {section.content}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 border-t border-[#ececec] pt-8">
            <p className="text-center text-[12px] leading-[1.7] text-[#616a67]">
              Questions about this policy? Contact us at{" "}
              <a
                href="mailto:info@hofpack.com"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                info@hofpack.com
              </a>{" "}
              or{" "}
              <a
                href="tel:+18884294881"
                className="text-[#ee7a1b] underline underline-offset-2 transition-colors hover:text-[#d46710]"
              >
                +1 (888) 429-4881
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </CustomPackingShell>
  );
}
