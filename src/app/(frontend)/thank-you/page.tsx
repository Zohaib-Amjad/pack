import type { Metadata } from "next";
import ThankYouView from "@/views/ThankYou";

export const metadata: Metadata = {
  title: "Quote Request Received | HOF Pack",
  description: "Thank you for your custom packaging inquiry. Our team will review your specifications and prepare your custom quote.",
};

export default function ThankYouPage() {
  return <ThankYouView />;
}
