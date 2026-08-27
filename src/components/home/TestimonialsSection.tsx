"use client";

import { DEFAULT_CMS_HOME } from "@/data/cms-defaults";


import { useState, useEffect, useCallback, useMemo } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useCmsHome } from "@/hooks/useCms";

const TestimonialsSection = () => {
  const { data } = useCmsHome();
  const cms = data || DEFAULT_CMS_HOME;
  const {
    items,
    trustStats,
    sectionLabel,
    titleLead,
    titleAccent,
    description,
  } = cms.testimonials;

  const testimonials = useMemo(() => items.filter((t) => t.active), [items]);

  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setActive((a) =>
      testimonials.length ? Math.min(a, testimonials.length - 1) : 0,
    );
  }, [testimonials.length]);

  const goTo = useCallback(
    (index: number) => {
      if (!testimonials.length || isAnimating) return;
      setIsAnimating(true);
      setActive(
        ((index % testimonials.length) + testimonials.length) %
          testimonials.length,
      );
      setTimeout(() => setIsAnimating(false), 500);
    },
    [isAnimating, testimonials.length],
  );

  const next = useCallback(() => {
    if (!testimonials.length) return;
    goTo(active + 1);
  }, [active, goTo, testimonials.length]);

  const prev = useCallback(() => {
    if (!testimonials.length) return;
    goTo(active - 1);
  }, [active, goTo, testimonials.length]);

  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next, testimonials.length]);

  if (!testimonials.length) return null;

  const current = testimonials[active];
  const rating = Math.max(0, Math.min(5, current.rating || 5));

  return (
    <section className="section-padding bg-section-alt overflow-hidden">
      <div className="container-max">
        <div className="text-center mb-14">
          <p className="ds-eyebrow text-accent mb-2">{sectionLabel}</p>
          <h2 className="font-display text-3xl sm:text-4xl text-foreground">
            {titleLead} <span className="text-accent">{titleAccent}</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-xl mx-auto font-sans">
            {description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-12">
          <div className="relative bg-card rounded-2xl border border-border p-8 sm:p-12 overflow-hidden">
            <Quote
              size={120}
              className="absolute -top-4 -left-4 text-accent/5 rotate-180"
            />

            <div key={active} className="relative z-10 animate-fade-in">
              <div className="flex gap-1 mb-6 justify-center">
                {Array(rating)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      size={22}
                      className="fill-accent text-accent"
                    />
                  ))}
              </div>

              <div className="flex justify-center mb-6">
                <span className="px-4 py-1.5 text-xs font-semibold font-sans bg-accent/10 text-accent rounded-full">
                  ✦ {current.highlight}
                </span>
              </div>

              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed text-center font-sans max-w-2xl mx-auto">
                &ldquo;{current.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-center gap-4 mt-8">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-display font-bold text-sm">
                  {current.initials}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">
                    {current.name}
                  </p>
                  <p className="text-sm text-muted-foreground font-sans">
                    {current.company}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 z-20"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/80 border border-border flex items-center justify-center text-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-200 z-20"
              aria-label="Next testimonial"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((t, i) => (
              <button
                type="button"
                key={t.id}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "w-8 bg-accent"
                    : "w-2 bg-border hover:bg-muted-foreground"
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {testimonials.map((t, i) => (
            <button
              type="button"
              key={t.id}
              onClick={() => goTo(i)}
              className={`text-left p-4 rounded-xl border transition-all duration-300 ${
                i === active
                  ? "border-accent bg-accent/5 shadow-md"
                  : "border-border bg-card hover:border-accent/40"
              }`}
            >
              <div className="flex gap-0.5 mb-2">
                {Array(5)
                  .fill(0)
                  .map((_, j) => (
                    <Star
                      key={j}
                      size={10}
                      className="fill-accent text-accent"
                    />
                  ))}
              </div>
              <p className="text-xs text-muted-foreground font-sans line-clamp-2 leading-relaxed">
                &ldquo;
                {t.text.length > 60 ? `${t.text.slice(0, 60)}...` : t.text}
                &rdquo;
              </p>
              <p className="text-xs font-display font-semibold text-foreground mt-2">
                {t.name}
              </p>
            </button>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 mt-12 pt-8 border-t border-border">
          {trustStats.map((stat, i) => (
            <div key={`${stat.label}-${i}`} className="text-center">
              <p className="font-display text-2xl sm:text-3xl font-bold text-accent">
                {stat.value}
              </p>
              <p className="text-xs text-muted-foreground font-sans mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;