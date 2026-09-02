import React from "react";
import type { Metadata } from "next";
import CartPage from "@/views/CartPage";

export const metadata: Metadata = {
  title: "Cart | HOF Pack",
  robots: { index: false, follow: false },
};

export default function CartRoutePage() {
  return <CartPage />;
}
