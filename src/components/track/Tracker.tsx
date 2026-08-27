import Link from "next/link";
import { type TrackingStatus } from "@/lib/tracking";

/** Presentational, client-safe order tracker. Given a status, renders the
 *  5-step progress. No internal data is ever passed in here. */
export function Tracker({ code, status }: { code: string; status: TrackingStatus }) {
  if (!status.found) {
    return (
      <Shell code={code}>
        <div className="rounded-[12px] border border-[#e0ddd6] bg-white px-5 py-8 text-center shadow-sm">
          <div className="font-display text-[16px] font-bold text-[#1a1a1a]">No order found</div>
          <div className="mt-1.5 text-[13px] text-[#7a7672]">
            We couldn&apos;t find an order with that tracking code. Double-check the code from your email.
          </div>
        </div>
      </Shell>
    );
  }

  if (status.step === 0) {
    return (
      <Shell code={code}>
        <div className="rounded-[12px] border border-[#e0ddd6] bg-white px-5 py-8 text-center shadow-sm">
          <div className="font-display text-[16px] font-bold text-[#1a1a1a]">This order is closed</div>
          <div className="mt-1.5 text-[13px] text-[#7a7672]">
            Please contact your HOF Pack representative for details.
          </div>
        </div>
      </Shell>
    );
  }

  const current = status.step; // 1..5
  const steps = status.steps;  // labels from CRM API

  return (
    <Shell code={code}>
      <div className="rounded-[14px] border border-[#e0ddd6] bg-white p-6 shadow-sm">
        <div className="mb-1 text-[11px] font-bold tracking-[0.08em] text-[#7a7672] uppercase">
          CURRENT STATUS
        </div>
        <div className="font-display text-[22px] font-extrabold text-[#2d5c3e]">
          {status.label ?? steps[current - 1]}
        </div>

        <div className="mt-6 flex flex-col gap-0">
          {steps.map((label, i) => {
            const n = i + 1;
            const done = n < current;
            const isCurrent = n === current;
            return (
              <div key={label} className="flex items-start gap-3.5">
                <div className="flex flex-none flex-col items-center">
                  <span
                    className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 text-[11px] font-bold transition-colors"
                    style={{
                      background: done || isCurrent ? "#2d5c3e" : "#fff",
                      borderColor: done || isCurrent ? "#2d5c3e" : "#e0ddd6",
                      color: done || isCurrent ? "#fff" : "#aaa6a0",
                    }}
                  >
                    {done ? (
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    ) : (
                      n
                    )}
                  </span>
                  {i < steps.length - 1 ? (
                    <span
                      className="my-1 h-6 w-0.5 rounded transition-colors"
                      style={{ background: done ? "#2d5c3e" : "#e0ddd6" }}
                    />
                  ) : null}
                </div>
                <div className="pt-0.5">
                  <div
                    className="text-[14px]"
                    style={{
                      fontWeight: isCurrent ? 700 : 500,
                      color: isCurrent ? "#1a1a1a" : done ? "#4a4a4a" : "#7a7672",
                    }}
                  >
                    {label}
                  </div>
                  {isCurrent ? (
                    <div className="mt-0.5 text-[12px] font-medium text-[#2d5c3e]">
                      In progress
                    </div>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>

        {status.updatedAt ? (
          <div className="mt-5 border-t border-[#e0ddd6] pt-3.5 text-[12px] text-[#7a7672]">
            Last updated{" "}
            {new Date(status.updatedAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </div>
        ) : null}
      </div>
    </Shell>
  );
}

function Shell({ code, children }: { code: string; children: React.ReactNode }) {
  return (
    <div className="w-full max-w-[440px]">
      <Link
        href="/track"
        className="mb-4 inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-semibold text-[#7a7672] transition-colors hover:text-[#1a1a1a]"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M15 18l-6-6 6-6" />
        </svg>
        Back
      </Link>
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#2d5c3e] text-[15px] font-bold text-white shadow-[0_4px_12px_rgba(45,92,62,0.28)]">
          HP
        </span>
        <div className="leading-tight">
          <div className="font-display text-[20px] font-extrabold tracking-tight text-[#1a1a1a]">
            Order tracking
          </div>
          <div className="text-[11px] font-semibold tracking-[0.1em] text-[#7a7672]">
            HOF PACK
          </div>
        </div>
      </div>
      <div className="mb-3 text-[12.5px] text-[#7a7672]">
        Tracking code <span className="font-mono font-bold text-[#1a1a1a]">{code}</span>
      </div>
      {children}
    </div>
  );
}
