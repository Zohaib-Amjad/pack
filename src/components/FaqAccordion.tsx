"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface FaqItem {
  id?: string | number;
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  faqs: FaqItem[];
}

export default function FaqAccordion({ faqs }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-[#e0ddd6]">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={faq.id ?? i}>
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-6 py-5 text-left group"
              aria-expanded={isOpen}
            >
              <span className="font-sans text-[13.5px] font-normal leading-[1.5] text-[#1a1a1a] group-hover:text-[#e8732a] transition-colors duration-150">
                {faq.question}
              </span>
              <ChevronRight
                size={16}
                className={`shrink-0 text-[#e8732a] transition-transform duration-200 ${
                  isOpen ? "rotate-90" : ""
                }`}
              />
            </button>

            {isOpen && (
              <div className="pb-5 font-sans text-[13px] font-normal leading-[1.78] text-[#4a4a4a]">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}