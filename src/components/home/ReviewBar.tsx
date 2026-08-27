"use client";

const STATS = [
  { num: "5,000+", label: "Brands\nserved" },
  { num: "24hrs",  label: "Quote\nturnaround" },
  { num: "100%",   label: "Satisfaction\nguarantee" },
];

const ReviewBar = () => {
  return (
    <div className="bg-white border-b border-[#e0ddd6] px-5 sm:px-10">
      <div className="mx-auto flex items-stretch flex-wrap sm:flex-nowrap" style={{ maxWidth: 1100, minHeight: 64 }}>
        {/* Google */}
        {/* <div className="flex items-center gap-2.5 pr-5 sm:pr-7 flex-shrink-0">
          <div>
            <div className="font-bold" style={{ fontSize: 15, letterSpacing: "-0.5px" }}>
              <span style={{ color: "#4285F4" }}>G</span>
              <span style={{ color: "#EA4335" }}>o</span>
              <span style={{ color: "#FBBC05" }}>o</span>
              <span style={{ color: "#4285F4" }}>g</span>
              <span style={{ color: "#34A853" }}>l</span>
              <span style={{ color: "#EA4335" }}>e</span>
            </div>
            <div style={{ color: "#e8732a", fontSize: 12, letterSpacing: 1 }}>★★★★★</div>
          </div>
          <div>
            <div className="font-semibold text-[#1a1a1a]" style={{ fontSize: 11.5 }}>4.9 / 5</div>
            <div style={{ fontSize: 10.5, color: "#9a9690" }}>300+ verified reviews</div>
          </div>
        </div> */}

        {/* <div className="w-px bg-[#e0ddd6] flex-shrink-0" /> */}

        {/* Trustpilot */}
        {/* <div className="flex items-center gap-2 px-5 sm:px-7 flex-shrink-0">
          <div className="flex items-center justify-center flex-shrink-0"
            style={{ width: 18, height: 18, background: "#00b67a", borderRadius: 2 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
          <div>
            <div className="font-bold text-[#191919]" style={{ fontSize: 13 }}>Trustpilot</div>
          </div>
          <div className="ml-1">
            <div className="font-semibold text-[#191919]" style={{ fontSize: 11.5 }}>4.9 / 5</div>
            <div style={{ fontSize: 10.5, color: "#9a9690" }}>500+ verified reviews</div>
          </div>
        </div> */}

        <div className="w-px bg-[#e0ddd6] flex-shrink-0" />

        {/* Stats */}
        <div className="flex items-center flex-1 justify-end flex-wrap sm:flex-nowrap w-full sm:w-auto">
          {STATS.map((s) => (
            <div key={s.num} className="flex items-center gap-2 flex-shrink-0 flex-1 sm:flex-none justify-center sm:justify-start"
              style={{ padding: "12px 14px", borderLeft: "1px solid #e0ddd6" }}>
              <div>
                <div className="font-bold text-[#e8732a]" style={{ fontSize: 18, lineHeight: 1 }}>{s.num}</div>
                <div className="font-sans text-[#7a7672] whitespace-pre-line" style={{ fontSize: 10.5, lineHeight: 1.3 }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewBar;