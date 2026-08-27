import dotenv from "dotenv";
dotenv.config();

import { getPayload } from "payload";
import config from "../payload.config";
import { categories } from "../data/products";
import { TRUSTPILOT_REVIEWS } from "../data/trustpilot-reviews";

const DEFAULT_FAQS = [
  {
    question: "What is the minimum order quantity (MOQ)?",
    answer: "Our minimum order quantity starts as low as 100 units for custom printed mailers and folding cartons, allowing startups and established brands to order exactly what they need.",
    category: "general",
  },
  {
    question: "How long does production and shipping take?",
    answer: "Standard production takes 8 to 10 business days after artwork approval. We offer free ground shipping across the United States with expedited air freight options available.",
    category: "shipping",
  },
  {
    question: "Can I get a digital mockup or sample before ordering?",
    answer: "Yes! We provide free 3D digital mockups and flat dielines with every inquiry. Physical pre-production samples are also available upon request.",
    category: "design",
  },
  {
    question: "What materials and finishes do you offer?",
    answer: "We offer corrugated cardboard, kraft paperboard, SBS folding boxboard, and rigid greyboard with finishes including Matte, Gloss, Soft-Touch Velvet, Foil Stamping, Spot UV, and Embossing.",
    category: "materials",
  },
  {
    question: "Are your packaging materials eco-friendly?",
    answer: "Yes, 100% of our kraft and corrugated packaging is recyclable, biodegradable, and printed using non-toxic soy and vegetable-based inks.",
    category: "materials",
  },
];

export async function seedPayload() {
  console.log("🌱 Starting fast Payload CMS database seed...");
  const payload = await getPayload({ config });

  // 1. Create Admin User
  const existingUsers = await payload.find({
    collection: "users",
    limit: 1,
  });

  if (existingUsers.totalDocs === 0) {
    console.log("👤 Creating default admin: admin@hofpack.com");
    await payload.create({
      collection: "users",
      data: {
        email: "admin@hofpack.com",
        password: "adminPassword123!",
        role: "admin",
      },
    });
  } else {
    console.log("👤 Admin user already exists.");
  }

  // 2. Fetch all existing categories at once
  console.log("📦 Checking categories...");
  const existingCats = await payload.find({
    collection: "categories",
    limit: 100,
    pagination: false,
  });
  const categoryMap = new Map<string, any>();
  for (const doc of existingCats.docs) {
    categoryMap.set(doc.slug, doc.id);
  }

  for (const cat of categories) {
    if (!categoryMap.has(cat.slug)) {
      console.log(`  + Category: ${cat.name}`);
      const created = await payload.create({
        collection: "categories",
        data: {
          name: cat.name,
          slug: cat.slug,
          section: (cat.section as any) || "style",
          tagline: `Premium Custom ${cat.name}`,
          description: cat.description,
          badge: "LOW MOQ",
          moq: "100 Units",
          turnaround: "8-12 Days",
          material: "Corrugated / SBS Paperboard / Rigid Stock",
        },
      });
      categoryMap.set(cat.slug, created.id);
    }
  }

  // 3. Fetch all existing products at once
  console.log("🎁 Checking products...");
  const existingProds = await payload.find({
    collection: "products",
    limit: 500,
    pagination: false,
  });
  const prodSlugSet = new Set(existingProds.docs.map((p) => p.slug));

  for (const cat of categories) {
    const catId = categoryMap.get(cat.slug);
    if (!catId) continue;

    for (const prod of cat.products) {
      if (!prodSlugSet.has(prod.slug)) {
        console.log(`  + Product: ${prod.name}`);
        await payload.create({
          collection: "products",
          data: {
            title: prod.name,
            slug: prod.slug,
            category: catId,
            shortDescription: `Custom ${prod.name} with full-color CMYK printing, custom die-cut windows, and premium finishes.`,
            startingPrice: "$0.45",
            moq: "100",
            isFeatured: true,
          },
        });
        prodSlugSet.add(prod.slug);
      }
    }
  }

  // 4. Testimonials
  console.log("⭐ Checking testimonials...");
  const existingTestimonials = await payload.find({
    collection: "testimonials",
    limit: 50,
    pagination: false,
  });
  const testNames = new Set(existingTestimonials.docs.map((t) => t.name));

  for (const rev of TRUSTPILOT_REVIEWS) {
    if (!testNames.has(rev.name)) {
      await payload.create({
        collection: "testimonials",
        data: {
          name: rev.name,
          company: rev.location || "Verified Buyer",
          role: "Verified Customer",
          highlight: rev.title || "5 Star Experience",
          content: rev.text,
          rating: rev.rating || 5,
          isFeatured: true,
        },
      });
      testNames.add(rev.name);
    }
  }

  // 5. FAQs
  console.log("❓ Checking FAQs...");
  const existingFaqs = await payload.find({
    collection: "faqs",
    limit: 50,
    pagination: false,
  });
  const faqQuestions = new Set(existingFaqs.docs.map((f) => f.question));

  for (const faq of DEFAULT_FAQS) {
    if (!faqQuestions.has(faq.question)) {
      await payload.create({
        collection: "faqs",
        data: {
          question: faq.question,
          answer: faq.answer,
          category: (faq.category as any) || "general",
          order: 0,
        },
      });
      faqQuestions.add(faq.question);
    }
  }

  console.log("🎉 Payload CMS database seed completed successfully in Supabase!");
}

if (process.argv[1] && process.argv[1].includes("seed")) {
  seedPayload()
    .then(() => process.exit(0))
    .catch((err) => {
      console.error("❌ Seed error:", err);
      process.exit(1);
    });
}
