import React from "react";
import PortfolioView from "@/views/Portfolio";
import { fetchCmsPortfolioServer } from "@/lib/cms-server";

export const revalidate = 300;

export const metadata = {
  title: "Packaging Portfolio | HOF Pack Showcase",
  description: "Explore our recent custom mailer boxes, luxury rigid boxes, retail cartons, and foil mylar pouches manufactured for leading brands.",
};

export default async function PortfolioPage() {
  const cmsPortfolio = await fetchCmsPortfolioServer();
  return <PortfolioView cms={cmsPortfolio} />;
}
