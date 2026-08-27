// Full-page skeleton shown while CMS data is loading from the backend.
// Mirrors the rough layout of the home page sections.

const Bone = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
  <div className={`bg-[#e0ddd6] animate-pulse rounded-md ${className ?? ""}`} style={style} />
);

export default function HomePageSkeleton() {
  return (
    <div className="w-full overflow-hidden">
      {/* Announcement bar */}
      <div className="h-9 bg-[#2d5c3e]" />

      {/* Hero */}
      <div className="relative bg-[#ece9e2]" style={{ height: 480 }}>
        <div className="absolute inset-0 flex flex-col justify-center px-6 sm:px-[72px]">
          <Bone className="h-3 w-40 mb-4" />
          <Bone className="h-10 w-72 mb-3" />
          <Bone className="h-10 w-56 mb-5" />
          <Bone className="h-4 w-96 mb-2" />
          <Bone className="h-4 w-80 mb-8" />
          <div className="flex gap-3">
            <Bone className="h-11 w-40 rounded-[7px]" />
            <Bone className="h-11 w-36 rounded-[7px]" />
          </div>
        </div>
      </div>

      {/* Review bar */}
      <div className="h-16 bg-white border-b border-[#e0ddd6]" />

      {/* Client logos */}
      <div className="bg-[#f5f3ee] border-b border-[#e0ddd6] py-5 px-10">
        <Bone className="h-3 w-48 mx-auto mb-4" />
        <div className="flex gap-10 justify-center">
          {[1,2,3,4,5,6].map(i => <Bone key={i} className="h-4 w-20" />)}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-[#f5f3ee] px-10 py-16">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex justify-between mb-8">
            <Bone className="h-7 w-52" />
            <Bone className="h-4 w-28" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[1,2,3,4,5,6,7,8].map(i => (
              <Bone key={i} className="rounded-[10px]" style={{ aspectRatio: "4/3" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Discount bar */}
      <div className="h-24 bg-[#2d5c3e]" />

      {/* Trending */}
      <div className="bg-white px-10 py-14">
        <div className="max-w-[1100px] mx-auto">
          <Bone className="h-7 w-44 mb-6" />
          <div className="grid gap-1" style={{ gridTemplateColumns: "2fr 1fr", height: 300 }}>
            <Bone className="rounded-l-[10px] h-full" />
            <div className="grid gap-1" style={{ gridTemplateColumns: "1fr 1fr", gridTemplateRows: "repeat(3,1fr)" }}>
              {[1,2,3,4,5,6].map(i => <Bone key={i} />)}
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <div className="bg-[#f5f3ee] px-10 py-16">
        <div className="max-w-[1100px] mx-auto">
          <Bone className="h-7 w-56 mb-3" />
          <Bone className="h-4 w-80 mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[3px]">
            {[1,2,3,4].map(i => (
              <div key={i}>
                <Bone className="w-full rounded-none" style={{ aspectRatio: "4/3" }} />
                <div className="bg-white border border-[#e0ddd6] border-t-0 p-4 space-y-2">
                  <Bone className="h-2.5 w-24" />
                  <Bone className="h-4 w-36" />
                  <Bone className="h-6 w-28 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <div className="bg-white px-10 py-16 border-t border-[#e0ddd6]">
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="space-y-4">
            <Bone className="h-7 w-72" />
            <Bone className="h-4 w-full" />
            <Bone className="h-4 w-5/6" />
            {[1,2,3].map(i => (
              <div key={i} className="py-4 border-b border-[#f0ede6] space-y-2">
                <Bone className="h-4 w-48" />
                <Bone className="h-3 w-full" />
              </div>
            ))}
            <Bone className="h-9 w-40 rounded-md" />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            {[1,2,3,4].map(i => (
              <Bone key={i} className="rounded-[10px]" style={{ aspectRatio: "4/3" }} />
            ))}
          </div>
        </div>
      </div>

      {/* Reputation */}
      <div className="bg-white px-10 py-16 border-t border-[#e0ddd6]">
        <div className="max-w-[1100px] mx-auto">
          <Bone className="h-7 w-56 mx-auto mb-3" />
          <Bone className="h-4 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-[1px] bg-[#e0ddd6] rounded-[10px] overflow-hidden mb-6">
            {[1,2,3,4].map(i => <div key={i} className="bg-white p-5 text-center space-y-2"><Bone className="h-7 w-16 mx-auto" /><Bone className="h-3 w-24 mx-auto" /></div>)}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[1,2].map(i => <div key={i} className="border border-[#e0ddd6] rounded-[10px] p-7 text-center space-y-3"><Bone className="h-5 w-24 mx-auto" /><Bone className="h-9 w-16 mx-auto" /><Bone className="h-4 w-20 mx-auto" /></div>)}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="bg-[#faf8f5] px-10 py-16 border-t border-[#e0ddd6]">
        <div className="max-w-[760px] mx-auto">
          <Bone className="h-6 w-48 mx-auto mb-10" />
          {[1,2,3,4,5].map(i => (
            <div key={i} className="border-b border-[#e0ddd6] py-5">
              <Bone className="h-4 w-full" />
            </div>
          ))}
        </div>
      </div>

      {/* CTA strip */}
      <div className="bg-[#2d5c3e] border-t-[3px] border-[#e8732a] py-10 text-center space-y-3">
        <Bone className="h-7 w-72 mx-auto" />
        <Bone className="h-4 w-96 mx-auto" />
        <Bone className="h-10 w-32 mx-auto rounded-md" />
      </div>
    </div>
  );
}
