"use client";

import React from "react";
import { QuoteForm } from "./QuoteForm";
import { X } from "lucide-react";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export function QuoteModal({ isOpen, onClose, initialCategory }: QuoteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto overscroll-contain p-4 sm:items-center sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative z-10 my-4 flex max-h-[calc(100dvh-2rem)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-[#e0ddd6] bg-white shadow-2xl animate-fade-in sm:my-8">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-[#ece9e2] text-[#4a4a4a] transition-colors shadow-sm"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <QuoteForm
            initialCategory={initialCategory}
            onSuccess={() => {
              setTimeout(() => {
                onClose();
              }, 3000);
            }}
            className="shadow-none border-none p-6 sm:p-8"
          />
        </div>
      </div>
    </div>
  );
}