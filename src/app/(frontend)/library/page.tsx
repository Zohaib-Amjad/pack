import React from "react";
import LibraryView from "@/views/Library";
import { fetchCmsLibraryServer } from "@/lib/cms-server";

export const revalidate = 300;

export const metadata = {
  title: "Resource Library | HOF Pack Custom Packaging",
  description: "Downloadable packaging dielines, templates, and structural design guidelines.",
};

export default async function LibraryPage() {
  const cmsLibrary = await fetchCmsLibraryServer();
  return <LibraryView initialCms={cmsLibrary} />;
}
