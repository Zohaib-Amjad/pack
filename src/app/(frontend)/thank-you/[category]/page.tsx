import type { Metadata } from "next";
import ThankYouView from "@/views/ThankYou";
import { getCategoryBySlug } from "@/data/products";

type Props = {
  params: Promise<{ category: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategoryBySlug(category);
  const catName = cat?.name || "Custom Packaging";

  return {
    title: `${catName} Quote Request Received | HOF Pack`,
    description: `Thank you for your ${catName.toLowerCase()} inquiry. Our specialists are preparing your detailed quote.`,
  };
}

export default async function CategoryThankYouPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategoryBySlug(category);

  return (
    <ThankYouView
      categorySlug={category}
      categoryName={cat?.name}
    />
  );
}
