"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type CarouselProduct = {
  id?: string;
  slug: string;
  name: string;
  images?: string[] | null;
  categories?: unknown;
};

type RelatedProductsCarouselSectionProps = {
  title: string;
  description?: string;
  products: CarouselProduct[];
  getProductImage?: (product: CarouselProduct, index: number) => string | null | undefined;
  sectionClassName?: string;
};

export default function RelatedProductsCarouselSection({
  title,
  description,
  products,
  getProductImage,
  sectionClassName = "section-padding bg-card border-t border-border",
}: RelatedProductsCarouselSectionProps) {
  const [cardsPerView, setCardsPerView] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1280) {
        setCardsPerView(4);
      } else if (window.innerWidth >= 1024) {
        setCardsPerView(3);
      } else if (window.innerWidth >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);

    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const totalPages = Math.max(1, Math.ceil(products.length / cardsPerView));

  const scrollToPage = (pageIndex: number) => {
    const container = carouselRef.current;
    if (!container) return;

    const nextPage = Math.max(0, Math.min(pageIndex, totalPages - 1));
    container.scrollTo({
      left: nextPage * container.clientWidth,
      behavior: "smooth",
    });
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    const container = carouselRef.current;
    if (!container) return;

    const handleScroll = () => {
      const pageWidth = container.clientWidth || 1;
      const nextPage = Math.round(container.scrollLeft / pageWidth);
      setCurrentPage(Math.max(0, Math.min(nextPage, totalPages - 1)));
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => container.removeEventListener("scroll", handleScroll);
  }, [totalPages, products.length]);

  if (products.length === 0) return null;

  return (
    <section className={cn("overflow-hidden", sectionClassName)}>
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">{title}</h2>
            {description ? (
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Previous ${title.toLowerCase()}`}
                onClick={() => scrollToPage(currentPage - 1)}
                disabled={currentPage === 0}
                className="rounded-full"
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                aria-label={`Next ${title.toLowerCase()}`}
                onClick={() => scrollToPage(currentPage + 1)}
                disabled={currentPage >= totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          )}
        </div>

        <div
          ref={carouselRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-5 lg:gap-6"
        >
          {products.map((product, index) => {
            const displayImg =
              (Array.isArray(product.images) && product.images[0]) ||
              getProductImage?.(product, index);

            return (
              <div
                key={product.id ?? product.slug}
                className="min-w-0 shrink-0 snap-start basis-[46%] sm:basis-[48%] lg:basis-[31%] xl:basis-[24%] self-stretch flex flex-col"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="group flex flex-col h-full overflow-hidden rounded-2xl border border-border/80 bg-card hover-lift shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-muted shrink-0">
                    {displayImg ? (
                      <Image
                        src={displayImg}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 46vw, (max-width: 1024px) 48vw, (max-width: 1280px) 31vw, 24vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center">
                        <Package
                          size={48}
                          className="text-muted-foreground/30 transition-colors duration-300 group-hover:text-accent"
                        />
                      </div>
                    )}
                  </div>
                  <div className="p-3 sm:p-4 text-center flex-1 flex flex-col justify-between gap-1.5 sm:gap-2">
                    <h3 className="font-display text-[12.5px] sm:text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-accent line-clamp-2 min-h-[2.4rem] sm:min-h-[2.5rem] flex items-center justify-center">
                      {product.name.replace("Custom ", "")}
                    </h3>
                    <span className="mt-auto inline-flex items-center justify-center gap-1 text-[11px] sm:text-xs font-bold text-accent group-hover:text-[var(--ds-orange-hover)] transition-colors">
                      Get a Quote &rarr;
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="mt-8 flex justify-center">
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Go to ${title.toLowerCase()} page ${index + 1}`}
                  onClick={() => scrollToPage(index)}
                  className={`h-1 rounded-full transition-all ${
                    currentPage === index
                      ? "w-12 bg-foreground"
                      : "w-8 bg-muted/30 hover:bg-muted/60"
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}