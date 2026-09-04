import Image from "next/image";

const FINISHES = [
  { name: "Holographic Foiling", src: "/images/finishes/holographic-foiling.webp" },
  { name: "Silver Foiling", src: "/images/finishes/silver-foiling.webp" },
  { name: "Gold Foiling", src: "/images/finishes/gold-foiling.webp" },
  { name: "Spot UV", src: "/images/finishes/spot-uv.webp" },
  { name: "Embossing", src: "/images/finishes/embossing.webp" },
  { name: "Debossing", src: "/images/finishes/debossing.webp" },
] as const;

function FinishCard({
  name,
  src,
}: {
  name: string;
  src: string;
}) {
  return (
    <article
      className="relative h-[340px] w-[240px] shrink-0 overflow-hidden rounded-[12px] sm:h-[400px] sm:w-[280px]"
    >
      <Image
        src={src}
        alt={name}
        fill
        sizes="280px"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/35 to-transparent px-4 pb-4 pt-16">
        <span className="font-sans text-[13px] font-semibold tracking-[0.04em] text-white sm:text-[14px]">
          {name}
        </span>
      </div>
    </article>
  );
}

export default function PremiumFinishes() {
  const track = [...FINISHES, ...FINISHES];

  return (
    <section className="border-t border-[#e0ddd6] bg-[#f5f3ee] py-12 sm:py-16" aria-labelledby="premium-finishes-heading">
      <div className="mx-auto max-w-[1100px] px-4 text-center sm:px-6">
        <h2
          id="premium-finishes-heading"
          className="font-display text-[22px] font-bold uppercase tracking-[0.12em] text-[#1a1a1a] sm:text-[26px]"
        >
          Premium Finishes
        </h2>
        <p className="mx-auto mt-3 max-w-[560px] font-sans text-[13px] leading-relaxed text-[#7a7672] sm:text-[14px]">
          Variety of finishing options to ensure spectacular looks and a premium feel on custom boxes.
        </p>
      </div>

      <div className="group relative mt-8 overflow-hidden sm:mt-10">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f5f3ee] to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f5f3ee] to-transparent sm:w-24"
          aria-hidden
        />
        <div
          className="flex w-max animate-marquee-slow gap-4 pr-4 group-hover:[animation-play-state:paused] sm:gap-5"
          style={{ animationDuration: "42s" }}
        >
          {track.map((finish, i) => (
            <FinishCard
              key={`${finish.src}-${i}`}
              name={finish.name}
              src={finish.src}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
