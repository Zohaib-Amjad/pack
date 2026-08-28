import React from "react";
import AboutView from "@/views/About";
import { fetchCmsAboutServer } from "@/lib/cms-server";

export const revalidate = 300;

export const metadata = {
  title: "About Us | HOF Pack Custom Packaging",
  description: "Learn about HOF Pack's state-of-the-art facilities, sustainable packaging missions, and our passionate packaging engineers.",
};

export default async function AboutPage() {
  const cmsAbout = await fetchCmsAboutServer();
  return <AboutView cms={cmsAbout} />;
}
