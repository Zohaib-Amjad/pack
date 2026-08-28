"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCmsHome } from "@/hooks/useCms";

type FeaturedCategory = {
  name: string;
  slug: string;
  image: string;
};

const DEFAULT_FEATURED_CATEGORIES: FeaturedCategory[] = [
  {
    name: "Bakery Boxes",
    slug: "bakery-boxes",
    image: "/images/products/1fe0893f-78e4-405b-9eb8-3487f5542db9.jpg",
  },
  {
    name: "Candle Boxes",
    slug: "custom-candle-boxes",
    image: "/images/products/693fd1da-d3ea-4ca7-aa97-93436bab3316.jpg",
  },
  {
    name: "Coffee Packaging",
    slug: "custom-coffee-packaging",
    image: "/images/products/3721016a-83fc-41b5-b51d-9790695024df.jpg",
  },
  {
    name: "Custom Mailer Boxes",
    slug: "custom-mailer-boxes",
    image: "/images/products/b8b93179-0ea9-44a1-856c-7c214757be60.jpg",
  },
  {
    name: "Display Boxes",
    slug: "custom-display-boxes",
    image: "/images/products/36ca8036-2a5a-46db-bc8d-b46c04927fb6.jpg",
  },
  {
    name: "Kraft Boxes",
    slug: "custom-kraft-boxes",
    image: "/images/products/989f5382-207b-416b-a8bc-a8d4d519bb90.jpg",
  },
  {
    name: "Mylar Bags",
    slug: "custom-mylar-bags",
    image: "/images/products/e8f3b1bd-bf9b-4c93-b890-03c931f284ea.jpg",
  },
  {
    name: "Pillow Boxes",
    slug: "custom-pillow-boxes",
    image: "/images/products/ab4c63eb-3bcb-4710-9a13-8096acea36cf.jpg",
  },
  {
    name: "Rigid Boxes",
    slug: "custom-rigid-boxes",
    image: "/images/products/89a95be0-94d1-426f-b9a3-0316ad28edf7.jpg",
  },
  {
    name: "Soap Boxes",
    slug: "custom-soap-boxes",
    image: "/images/products/6fbbd91f-e52c-400e-8571-70d6c07d3b99.jpg",
  },
  {
    name: "Tuck Boxes",
    slug: "custom-tuck-boxes",
    image: "/images/products/6b967d06-0d52-41db-9b11-06d242b6cf8a.jpg",
  },
];

type FeaturedCategoriesProps = {
  cms?: CmsHome;
  categories?: any[];
};

const FeaturedCategories = ({ cms, categories }: FeaturedCategoriesProps) => {
  const { data } = useCmsHome();
  const fc = data?.featuredCategories || cms?.featuredCategories;

  const sectionLabel = fc?.sectionLabel ?? "Shop By Category";
  const titleBeforeAccent = fc?.titleBeforeAccent ?? fc?.titleLead ?? "Find Your";
  const titleAccent = fc?.titleAccent ?? "Perfect Box";
  const description =
    fc?.description ??
    "Browse our most popular packaging styles. Every box is fully customizable to fit your brand.";

  const row1 = DEFAULT_FEATURED_CATEGORIES.slice(0, 4);
  const row2 = DEFAULT_FEATURED_CATEGORIES.slice(4, 8);
  const row3 = DEFAULT_FEATURED_CATEGORIES.slice(8, 11);

  return (
    <div>
      <div className="bg-[#f5f3ee] px-4 sm:px-10 py-10 sm:py-[64px]">
        <div style={{ maxWidth: 1100, margin: "0px auto" }}>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4" style={{ marginBottom: 32 }}>
            <div>
              {sectionLabel && (
                <p className="font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-[#e8732a] mb-1">
                  {sectionLabel}
                </p>
              )}
              <h2 className="font-display text-[#1a1a1a]" style={{ fontSize: 26, fontWeight: 700 }}>
                {titleBeforeAccent} {titleAccent && <span className="text-[#e8732a]">{titleAccent}</span>}
              </h2>
              {description && (
                <p className="font-sans text-[13px] text-[#7a7672] mt-1 max-w-xl leading-relaxed">
                  {description}
                </p>
              )}
            </div>
            <Link
              className="font-sans font-semibold text-[#e8732a] border-b border-[#f5c8a8] pb-px hover:text-[#c45a18] transition-colors shrink-0 self-start sm:self-end"
              href="/catalog"
              style={{ fontSize: 12, letterSpacing: "0.02em" }}
            >
              View all Styles →
            </Link>
          </div>

          {/* Row 1 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ margin: "0px" }}>
            {row1.map((item) => (
              <Link
                key={item.slug}
                className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
                href={`/${item.slug}`}
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  alt={item.name}
                  loading="lazy"
                  fill
                  className="object-cover transition-transform duration-350 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src={item.image}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-3 left-3">
                  <p className="font-sans font-bold text-white" style={{ fontSize: 13 }}>
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginTop: 10 }}>
            {row2.map((item) => (
              <Link
                key={item.slug}
                className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
                href={`/${item.slug}`}
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  alt={item.name}
                  loading="lazy"
                  fill
                  className="object-cover transition-transform duration-350 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src={item.image}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-3 left-3">
                  <p className="font-sans font-bold text-white" style={{ fontSize: 13 }}>
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Row 3 (3 products + 1 View all card) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" style={{ marginTop: 10 }}>
            {row3.map((item) => (
              <Link
                key={item.slug}
                className="group relative rounded-[10px] overflow-hidden bg-[#ece9e2] block"
                href={`/${item.slug}`}
                style={{ aspectRatio: "4 / 3" }}
              >
                <Image
                  alt={item.name}
                  loading="lazy"
                  fill
                  className="object-cover transition-transform duration-350 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                  src={item.image}
                />
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 55%)" }}
                />
                <div className="absolute bottom-3 left-3">
                  <p className="font-sans font-bold text-white" style={{ fontSize: 13 }}>
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}

            {/* View all styles card */}
            <Link
              className="flex flex-col items-center justify-center gap-2 rounded-[10px]"
              href="/catalog"
              style={{ background: "rgb(45, 92, 62)", aspectRatio: "4 / 3" }}
            >
              <ArrowRight size={22} color="#e8732a" strokeWidth={2} />
              <p className="font-sans font-bold text-white" style={{ fontSize: 13 }}>
                View all styles
              </p>
              <small className="font-sans text-white/60" style={{ fontSize: "10.5px" }}>
                20+ box types
              </small>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
