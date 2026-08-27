// Category image mapping with variants for visual diversity
import catBakery from "@/assets/cat-bakery-boxes.jpg";
import catBakeryV2 from "@/assets/cat-bakery-boxes-v2.jpg";
import catBakeryV3 from "@/assets/cat-bakery-boxes-v3.jpg";
import catCandle from "@/assets/cat-candle-boxes.jpg";
import catCandleV2 from "@/assets/cat-candle-boxes-v2.jpg";
import catCandleV3 from "@/assets/cat-candle-boxes-v3.jpg";
import catCoffee from "@/assets/cat-coffee-packaging.jpg";
import catCoffeeV2 from "@/assets/cat-coffee-packaging-v2.jpg";
import catCoffeeV3 from "@/assets/cat-coffee-packaging-v3.jpg";
import catFood from "@/assets/cat-food-boxes.jpg";
import catFoodV2 from "@/assets/cat-food-boxes-v2.jpg";
import catFoodV3 from "@/assets/cat-food-boxes-v3.jpg";
import catSoap from "@/assets/cat-soap-boxes.jpg";
import catSoapV2 from "@/assets/cat-soap-boxes-v2.jpg";
import catSoapV3 from "@/assets/cat-soap-boxes-v3.jpg";
import catKraft from "@/assets/cat-kraft-boxes.jpg";
import catKraftV2 from "@/assets/cat-kraft-boxes-v2.jpg";
import catKraftV3 from "@/assets/cat-kraft-boxes-v3.jpg";
import catMylar from "@/assets/cat-mylar-bags.jpg";
import catMylarV2 from "@/assets/cat-mylar-bags-v2.jpg";
import catMylarV3 from "@/assets/cat-mylar-bags-v3.jpg";
import catCardboard from "@/assets/cat-cardboard-boxes.jpg";
import catCardboardV2 from "@/assets/cat-cardboard-boxes-v2.jpg";
import catTuck from "@/assets/cat-tuck-boxes.jpg";
import catTuckV2 from "@/assets/cat-tuck-boxes-v2.jpg";
import catTuckV3 from "@/assets/cat-tuck-boxes-v3.jpg";
import catPillow from "@/assets/cat-pillow-boxes.jpg";
import catPillowV2 from "@/assets/cat-pillow-boxes-v2.jpg";
import catPillowV3 from "@/assets/cat-pillow-boxes-v3.jpg";
import catTube from "@/assets/cat-tube-packaging.jpg";
import catTubeV2 from "@/assets/cat-tube-packaging-v2.jpg";
import catTubeV3 from "@/assets/cat-tube-packaging-v3.jpg";
import catDisplay from "@/assets/cat-display-boxes.jpg";
import catDisplayV2 from "@/assets/cat-display-boxes-v2.jpg";
import catDisplayV3 from "@/assets/cat-display-boxes-v3.jpg";
import catMailer from "@/assets/cat-mailer-boxes.jpg";
import catMailerV2 from "@/assets/cat-mailer-boxes-v2.jpg";
import catMailerV3 from "@/assets/cat-mailer-boxes-v3.jpg";
import catGable from "@/assets/cat-gable-boxes.jpg";
import catGableV2 from "@/assets/cat-gable-boxes-v2.jpg";
import catGableV3 from "@/assets/cat-gable-boxes-v3.jpg";

import { StaticImageData } from "next/image";

// Each category has an array of image variants for visual diversity
const categoryImageVariants: Record<string, (string | StaticImageData)[]> = {
  "custom-bakery-boxes": [catBakery, catBakeryV2, catBakeryV3],
  "custom-candle-boxes": [catCandle, catCandleV2, catCandleV3],
  "custom-coffee-packaging": [catCoffee, catCoffeeV2, catCoffeeV3],
  "custom-food-boxes": [catFood, catFoodV2, catFoodV3],
  "custom-soap-boxes": [catSoap, catSoapV2, catSoapV3],
  "custom-kraft-boxes": [catKraft, catKraftV2, catKraftV3],
  "custom-mylar-bags": [catMylar, catMylarV2, catMylarV3],
  "custom-cardboard-boxes": [catCardboard, catCardboardV2],
  "custom-tuck-boxes": [catTuck, catTuckV2, catTuckV3],
  "custom-pillow-boxes": [catPillow, catPillowV2, catPillowV3],
  "custom-tube-packaging": [catTube, catTubeV2, catTubeV3],
  "custom-display-boxes": [catDisplay, catDisplayV2, catDisplayV3],
  "custom-mailer-boxes": [catMailer, catMailerV2, catMailerV3],
  "custom-gable-boxes": [catGable, catGableV2, catGableV3],
};

// Get the primary category image (for hero banners, featured cards)
export const getCategoryImage = (slug: string): string | undefined => {
  const img = categoryImageVariants[slug]?.[0];
  if (!img) return undefined;
  return typeof img === 'string' ? img : (img as any).src;
};

// Get a variant image for a product based on its index within the category
export const getProductImage = (categorySlug: string, productIndex: number): string | undefined => {
  const variants = categoryImageVariants[categorySlug];
  if (!variants || variants.length === 0) return undefined;
  const img = variants[productIndex % variants.length];
  return typeof img === 'string' ? img : (img as any).src;
};

export default categoryImageVariants;
