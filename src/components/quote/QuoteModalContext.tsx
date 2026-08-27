"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { QuoteModal } from "./QuoteModal";

interface QuoteModalContextType {
  isQuoteModalOpen: boolean;
  selectedCategory?: string;
  openQuoteModal: (category?: string) => void;
  closeQuoteModal: () => void;
}

const QuoteModalContext = createContext<QuoteModalContextType | undefined>(undefined);

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState<string | undefined>(undefined);

  const openQuoteModal = (cat?: string) => {
    setCategory(cat);
    setIsOpen(true);
  };

  const closeQuoteModal = () => {
    setIsOpen(false);
    setCategory(undefined);
  };

  return (
    <QuoteModalContext.Provider
      value={{
        isQuoteModalOpen: isOpen,
        selectedCategory: category,
        openQuoteModal,
        closeQuoteModal,
      }}
    >
      {children}
      <QuoteModal
        isOpen={isOpen}
        onClose={closeQuoteModal}
        initialCategory={category}
      />
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const context = useContext(QuoteModalContext);
  const openFn = (cat?: any) => {
    const categoryStr = typeof cat === "string" ? cat : cat?.category;
    if (context?.openQuoteModal) context.openQuoteModal(categoryStr);
  };
  return {
    isOpen: context?.isQuoteModalOpen ?? false,
    isQuoteModalOpen: context?.isQuoteModalOpen ?? false,
    category: context?.selectedCategory,
    selectedCategory: context?.selectedCategory,
    open: openFn,
    openQuoteModal: openFn,
    closeQuoteModal: context?.closeQuoteModal || (() => {}),
  };
}