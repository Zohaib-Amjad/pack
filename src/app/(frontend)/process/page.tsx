import React from "react";
import ProcessView from "@/views/Process";
import { fetchCmsProcessServer } from "@/lib/cms-server";

export const revalidate = 300;

export const metadata = {
  title: "Our 4-Step Process | HOF Pack Custom Packaging",
  description: "From concept and 3D digital mockup to precision die-cutting and fast nationwide delivery. See how HOF Pack manufactures custom boxes.",
};

export default async function ProcessPage() {
  const cmsProcess = await fetchCmsProcessServer();
  return <ProcessView cms={cmsProcess} />;
}
