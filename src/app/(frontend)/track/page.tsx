"use client";

import React, { useState } from "react";
import { Truck, Search, CheckCircle2, Clock, ShieldCheck } from "lucide-react";

export default function TrackPage() {
  const [orderCode, setOrderCode] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderCode.trim()) {
      setSearched(true);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 sm:px-6 lg:px-8 space-y-10">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 ds-eyebrow text-[#2d5c3e]">
          <Truck className="w-3.5 h-3.5" />
          <span>Real-Time Order Tracking</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a1a]">
          Track Your Custom Order
        </h1>
        <p className="ds-body max-w-md mx-auto">
          Enter your 8-digit HOF Pack order confirmation number or carrier tracking code.
        </p>
      </div>

      <form onSubmit={handleSearch} className="card-warm p-6 sm:p-8 space-y-4">
        <div>
          <label className="block text-xs font-bold text-[#1a1a1a] mb-1.5">
            Order Reference / Tracking Code *
          </label>
          <div className="flex gap-3">
            <input
              type="text"
              required
              placeholder="e.g. HOF-89421 or 1Z9999999999999999"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              className="flex-1 bg-[#faf8f5] border border-[#d8d4cc] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-[#e8732a]"
            />
            <button
              type="submit"
              className="bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold py-2.5 px-6 rounded-xl text-xs ds-btn flex items-center gap-2 shadow"
            >
              <Search className="w-4 h-4" />
              <span>Lookup</span>
            </button>
          </div>
        </div>
      </form>

      {searched && (
        <div className="card-warm p-6 sm:p-8 space-y-6 border-l-4 border-l-[#2d5c3e] animate-fade-in">
          <div className="flex items-center justify-between border-b border-[#e0ddd6] pb-4">
            <div>
              <span className="text-xs text-[#7a7672]">Order Status for</span>
              <h3 className="text-lg font-bold text-[#1a1a1a]">{orderCode}</h3>
            </div>
            <span className="bg-[#eaf2ed] text-[#2d5c3e] text-xs font-bold px-3 py-1 rounded-full">
              In Production
            </span>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#2d5c3e] mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#1a1a1a] block">3D Digital Proof Approved</span>
                <span className="text-[11px] text-[#7a7672]">Artwork checked and pre-flight verified</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-[#e8732a] mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#1a1a1a] block">Offset CMYK Printing & Die-Cutting</span>
                <span className="text-[11px] text-[#7a7672]">Estimated completion in 3-4 business days</span>
              </div>
            </div>
            <div className="flex items-start gap-3 opacity-50">
              <Truck className="w-5 h-5 text-[#7a7672] mt-0.5" />
              <div>
                <span className="text-xs font-bold text-[#1a1a1a] block">Quality Inspection & Dispatch</span>
                <span className="text-[11px] text-[#7a7672]">Free UPS / FedEx ground delivery</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}