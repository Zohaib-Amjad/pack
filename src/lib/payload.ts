import {
  CATEGORIES,
  Category,
  TESTIMONIALS,
  Testimonial,
  FAQS,
  BLOG_POSTS,
  BlogPost,
  SITE_CONFIG,
  SUSTAINABILITY_PILLARS,
  WHY_CHOOSE_US,
  PROCESS_STEPS,
  CUSTOMIZATION_OPTIONS,
  BRAND_CLIENTS,
} from "@/data/seed-data";

export async function getCategories(): Promise<Category[]> {
  try {
    // In production or when Payload is active, we can query Payload Local API or REST API
    return CATEGORIES;
  } catch (error) {
    console.error("Error fetching categories from Payload, using seed data:", error);
    return CATEGORIES;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const categories = await getCategories();
  const found = categories.find((c) => c.slug === slug || c.slug === `custom-${slug}` || c.slug.replace("custom-", "") === slug);
  return found || null;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    return TESTIMONIALS;
  } catch (error) {
    return TESTIMONIALS;
  }
}

export async function getFAQs() {
  try {
    return FAQS;
  } catch (error) {
    return FAQS;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    return BLOG_POSTS;
  } catch (error) {
    return BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

export async function getSiteConfig() {
  return SITE_CONFIG;
}

export async function getSustainabilityPillars() {
  return SUSTAINABILITY_PILLARS;
}

export async function getWhyChooseUs() {
  return WHY_CHOOSE_US;
}

export async function getProcessSteps() {
  return PROCESS_STEPS;
}

export async function getCustomizationOptions() {
  return CUSTOMIZATION_OPTIONS;
}

export async function getBrandClients() {
  return BRAND_CLIENTS;
}
