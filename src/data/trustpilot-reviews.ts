/**
 * Real Trustpilot reviews for hofpack.com only.
 * Source: https://www.trustpilot.com/review/hofpack.com
 * Do not add dummy / CMS testimonials here.
 */
export type TrustpilotReview = {
  id: string;
  name: string;
  location: string;
  title?: string;
  text: string;
  initials: string;
  rating: number;
  dateLabel?: string;
};

export const TRUSTPILOT_PROFILE_URL = "https://www.trustpilot.com/review/hofpack.com";

export const TRUSTPILOT_REVIEWS: TrustpilotReview[] = [
  {
    id: "tp-jarrett-c",
    name: "Jarrett C",
    location: "US",
    title: "Made the vision I had for some custom…",
    text: "Made the vision I had for some custom packaging come to life! Fantastic help from beginning to end.",
    initials: "JC",
    rating: 5,
    dateLabel: "13 hours ago",
  },
  {
    id: "tp-poornimarao",
    name: "Poornimarao Nageswararao",
    location: "US",
    title: "Great customer service",
    text: "Chris was very patient and answered all my questions and the replies and followup was excellent.",
    initials: "PN",
    rating: 5,
    dateLabel: "6 days ago",
  },
  {
    id: "tp-andrew-reynolds",
    name: "Andrew Reynolds",
    location: "US",
    title: "Exceptional quality control",
    text: "Exceptional quality control. Great finished product! Matt kept me in the loop every step of the way. A+",
    initials: "AR",
    rating: 5,
    dateLabel: "Jul 9, 2026",
  },
  {
    id: "tp-martina-gonzalez",
    name: "Martina Gonzalez",
    location: "US",
    title: "A Job Well Done",
    text: "The boxes I order are Excellent Quality, arrived on time, and I had amazing service. I am thankful for Matt for his patience and his ability to complete exactly what I asked.",
    initials: "MG",
    rating: 5,
    dateLabel: "Jul 1, 2026",
  },
  {
    id: "tp-mary-niles",
    name: "Mary niles",
    location: "US",
    title: "The quality of the soap boxes turned…",
    text: "The quality of the soap boxes turned out to be amazing. Excellent customer service & fast turnaround time.",
    initials: "MN",
    rating: 5,
    dateLabel: "Apr 8, 2026",
  },
];
