import React from "react";
import type { Metadata } from "next";
import CaseStudyDetailView from "@/views/CaseStudyDetail";
import { DEFAULT_CASE_STUDIES } from "@/data/case-studies-defaults";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(DEFAULT_CASE_STUDIES).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = DEFAULT_CASE_STUDIES[slug];
  if (!study) {
    return {
      title: "Case Study | HOF Pack Custom Packaging",
    };
  }
  return {
    title: `${study.title} | HOF Pack`,
    description: study.excerpt,
  };
}

export default async function CaseStudyDetailPage({ params }: PageProps) {
  const { slug } = await params;
  return <CaseStudyDetailView slug={slug} />;
}
