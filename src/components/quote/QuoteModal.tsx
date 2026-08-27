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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl z-10 overflow-hidden border border-[#e0ddd6] my-8 animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 hover:bg-[#ece9e2] text-[#4a4a4a] transition-colors shadow-sm"
          aria-label="Close quote modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-h-[90vh] overflow-y-auto">
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