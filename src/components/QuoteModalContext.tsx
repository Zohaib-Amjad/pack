"use client";

import dynamic from "next/dynamic";
import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

type QuoteModalConfig = { product?: string; category?: string };
type QuoteModalContextType = {
  open: (config?: QuoteModalConfig) => void;
};
type QuoteModalDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: string;
  initialCategory?: string;
};

const QuoteModalDialog = dynamic<QuoteModalDialogProps>(
  () => import("@/components/QuoteModal"),
  { ssr: false },
);

export const QuoteModalContext = createContext<QuoteModalContextType>({
  open: () => {},
});

export const useQuoteModal = () => {
  const ctx = useContext(QuoteModalContext);
  const openFn = ctx?.open || (() => {});
  return {
    ...ctx,
    open: openFn,
    openQuoteModal: (productOrCategory?: string) => {
      openFn(typeof productOrCategory === "string" ? { category: productOrCategory } : productOrCategory);
    },
  };
};

export function QuoteModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<QuoteModalConfig>({});

  const open = useCallback((nextConfig?: QuoteModalConfig) => {
    if (nextConfig) setConfig(nextConfig);
    setIsOpen(true);
  }, []);

  return (
    <QuoteModalContext.Provider value={{ open }}>
      {children}
      {isOpen ? (
        <QuoteModalDialog
          isOpen
          onClose={() => setIsOpen(false)}
          initialProduct={config.product}
          initialCategory={config.category}
        />
      ) : null}
    </QuoteModalContext.Provider>
  );
}