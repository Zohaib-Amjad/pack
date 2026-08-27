"use client";

const STATS = [
  { num: "5,000+", label: "Brands served across USA" },
  // { num: "4.9★",   label: "Average rating across platforms" },
  { num: "<24hrs", label: "Average quote turnaround" },
  { num: "100%",   label: "Satisfaction guarantee" },
];

const ReputationSection = () => {
  return (
    <div className="bg-white border-t border-[#e0ddd6] px-4 sm:px-10 py-16 sm:py-[64px]">
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="text-center" style={{ marginBottom: 28 }}>
          <h2 className="font-display text-[#1a1a1a]" style={{ fontSize: 26, fontWeight: 700, marginBottom: 6 }}>
            World-Class Reputation
          </h2>
          <p className="font-sans text-[#7a7672]" style={{ fontSize: 13 }}>
            Rated excellence by the world&apos;s leading review platforms.
          </p>
        </div>

        {/* Stats — 2 col mobile, 4 col desktop */}
        <div className="grid border border-[#e0ddd6] rounded-[10px] overflow-hidden"
          style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "#e0ddd6", marginBottom: 24 }}>
          <style>{`@media(min-width:640px){ .rep-stats-grid { grid-template-columns: repeat(4,1fr) !important; } }`}</style>
          <div className="rep-stats-grid grid border border-[#e0ddd6] rounded-[10px] overflow-hidden w-full col-span-2"
            style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 1, background: "#e0ddd6" }}>
            {STATS.map((s) => (
              <div key={s.num} className="bg-white text-center" style={{ padding: 20 }}>
                <div className="font-display text-[#e8732a]" style={{ fontSize: 26, fontWeight: 700 }}>{s.num}</div>
                <div className="font-sans text-[#7a7672]" style={{ fontSize: 11.5, marginTop: 3 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Review cards — stack on mobile, side by side on sm+ */}
        {/* <div className="grid gap-4" style={{ gridTemplateColumns: "1fr" }}>
          <style>{`@media(min-width:640px){ .rep-cards-grid { grid-template-columns: repeat(2,1fr) !important; } }`}</style>
          <div className="rep-cards-grid grid gap-4" style={{ gridTemplateColumns: "1fr" }}>
            <div className="text-center rounded-[10px]"
              style={{ border: "1px solid #b8dfc8", background: "#edf7f1", padding: 28 }}>
              <div className="text-[#e8732a]" style={{ fontSize: 18, letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
              <div className="font-display text-[#1a1a1a]" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>4.9/5</div>
              <div className="font-sans font-semibold text-[#5a5652]" style={{ fontSize: 13, marginBottom: 4 }}>Trustpilot</div>
              <div className="font-sans text-[#9a9690]" style={{ fontSize: 11.5 }}>500+ Verified Customer Reviews</div>
            </div>
            <div className="text-center rounded-[10px]"
              style={{ border: "1px solid #e0ddd6", padding: 28 }}>
              <div className="text-[#e8732a]" style={{ fontSize: 18, letterSpacing: 2, marginBottom: 8 }}>★★★★★</div>
              <div className="font-display text-[#1a1a1a]" style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>4.8/5</div>
              <div className="font-sans font-semibold text-[#5a5652]" style={{ fontSize: 13, marginBottom: 4 }}>Google</div>
              <div className="font-sans text-[#9a9690]" style={{ fontSize: 11.5 }}>300+ Verified Business Reviews</div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ReputationSection;