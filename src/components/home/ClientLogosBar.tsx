import Image from "next/image";
import type { CmsHome } from "@/types/cms";

const BRAND_LOGOS = [
  {
    alt: "ShopMax",
    src: "/images/brand/ecd0a299-c933-483c-8dae-143ef4f0e161.png",
  },
  {
    alt: "NatureCo",
    src: "/images/brand/3bd7a2a2-3d40-49f1-8e82-989a4dff53cc.png",
  },
  {
    alt: "TechStart",
    src: "/images/brand/b341f936-f848-42cd-af1a-f831636cf01f.png",
  },
  {
    alt: "LuxeLife",
    src: "/images/brand/b0b85fe9-b81e-4fad-8cad-2b71c4729bdb.png",
  },
  {
    alt: "GreenBox",
    src: "/images/brand/0a990bf6-8e5d-45f2-95fa-731cf04a372d.png",
  },
  {
    alt: "PackWell",
    src: "/images/brand/d3857c33-8009-408d-a1e6-419253e4b7e2.png",
  },
  {
    alt: "EcoCrate",
    src: "/images/brand/dfbeb843-6fbb-448f-9f14-216c4cefe79c.png",
  },
  {
    alt: "Gilead",
    src: "/images/brand/5e8d59d6-1d11-46c8-999f-241cd91f9255.png",
  },
  {
    alt: "Cheerros",
    src: "/images/brand/9054bf8b-322c-4550-a2d1-903dc24941f5.png",
  },
  {
    alt: "Woosh",
    src: "/images/brand/b234ce64-2b35-4fdc-af62-ef6d50c0956b.png",
  },
  {
    alt: "RareBeauty",
    src: "/images/brand/5ca043b3-ab32-4348-9cfa-48f5505bd720.png",
  },
  {
    alt: "Subtl",
    src: "/images/brand/028d5bd8-177b-4f7a-8612-6f643f9dc05d.png",
  },
];

type ClientLogosBarProps = {
  cms?: CmsHome;
};

const ClientLogosBar = ({ cms }: ClientLogosBarProps) => {
  // Seamless loop by duplicating array
  const logos = [...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <div className="bg-[#f5f3ee] border-b border-[#e0ddd6] py-4 sm:py-6">
      <p
        className="font-sans font-semibold uppercase text-center text-[#9a9690]"
        style={{ fontSize: "10px", letterSpacing: "0.15em", marginBottom: "10px" }}
      >
        Trusted by 5,000+ brands across the USA
      </p>
      <div className="overflow-hidden relative">
        <div
          className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none"
          style={{ width: "80px", background: "linear-gradient(to right, #f5f3ee, transparent)" }}
        />
        <div
          className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none"
          style={{ width: "80px", background: "linear-gradient(to left, #f5f3ee, transparent)" }}
        />
        <div className="flex items-center animate-marquee-slow" style={{ width: "max-content" }}>
          {logos.map((logo, i) => (
            <span
              key={`${logo.alt}-${i}`}
              className="inline-flex items-center justify-center whitespace-nowrap"
              style={{ padding: "0 clamp(20px, 4vw, 36px)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt={logo.alt}
                loading="lazy"
                width={240}
                height={96}
                className="h-20 w-auto max-w-[220px] object-contain"
                style={{ color: "transparent", background: "transparent" }}
                src={logo.src}
              />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClientLogosBar;
