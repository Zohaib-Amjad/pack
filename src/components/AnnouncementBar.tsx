import type { CmsHome } from "@/types/cms";

type AnnouncementBarProps = {
  cms: CmsHome;
};

const AnnouncementBar = ({ cms }: AnnouncementBarProps) => {
  const segments = cms.announcement.items
    .filter((it) => it.active && it.text.trim().length > 0)
    .map((it) => it.text.trim());
  const line = segments.length > 0 ? segments.join(" • ") : "";

  return (
    <div className="bg-[#1e3d2b] text-white py-2 overflow-hidden">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(4)].map((_, i) => (
          <span
            key={i}
            className="mx-8 font-sans text-[11px] sm:text-[13px] font-normal leading-none tracking-[0.02em] text-white/85"
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementBar;
