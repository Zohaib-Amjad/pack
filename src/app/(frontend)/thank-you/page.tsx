import React from "react";
import Link from "next/link";
import { CheckCircle2, Truck, Clock, ShieldCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/data/seed-data";

export const metadata = {
  title: "Quote Request Received | HOF Pack",
  description: "Thank you for requesting a custom packaging quote from HOF Pack.",
};

export default function ThankYouPage() {
  return (
    <div className="max-w-2xl mx-auto py-20 px-4 sm:px-6 lg:px-8 text-center space-y-8">
      <div className="w-20 h-20 bg-emerald-100 text-[#2d5c3e] rounded-full flex items-center justify-center mx-auto shadow-inner">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-3">
        <span className="bg-[#eaf2ed] text-[#2d5c3e] text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
          Submission Confirmed
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a]">
          Thank You! We&apos;ve Received Your Request
        </h1>
        <p className="ds-body max-w-md mx-auto">
          A dedicated structural packaging specialist is currently reviewing your dimensions and requirements. We will send your official pricing and 3D digital mockup proposal within 2 hours.
        </p>
      </div>

      <div className="card-warm p-6 grid grid-cols-3 gap-4 text-xs text-[#4a4a4a]">
        <div>
          <Clock className="w-5 h-5 text-[#e8732a] mx-auto mb-1" />
          <span className="font-bold block">&lt; 2 Hours</span>
          <span className="text-[10px] text-[#7a7672]">Response Time</span>
        </div>
        <div>
          <Truck className="w-5 h-5 text-[#2d5c3e] mx-auto mb-1" />
          <span className="font-bold block">Free Shipping</span>
          <span className="text-[10px] text-[#7a7672]">Across USA</span>
        </div>
        <div>
          <ShieldCheck className="w-5 h-5 text-[#2d5c3e] mx-auto mb-1" />
          <span className="font-bold block">Price Match</span>
          <span className="text-[10px] text-[#7a7672]">Guaranteed</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          href="/"
          className="w-full sm:w-auto bg-[#2d5c3e] hover:bg-[#1e3d2b] text-white font-bold py-3 px-6 rounded-md text-xs ds-btn shadow"
        >
          Return to Homepage
        </Link>
        <Link
          href="/catalog"
          className="w-full sm:w-auto bg-white hover:bg-[#ece9e2] text-[#1a1a1a] font-bold py-3 px-6 rounded-md text-xs border border-[#e0ddd6] shadow-sm"
        >
          Browse More Boxes
        </Link>
      </div>
    </div>
  );
}
