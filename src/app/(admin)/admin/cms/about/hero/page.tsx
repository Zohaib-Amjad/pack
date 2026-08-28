import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutHeroView from "@/components/admin/AdminAboutHeroView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Hero Section | HOF Pack Admin",
  description: "Manage About page hero section copy and imagery",
};

export default function AdminAboutHeroPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Hero & intro" },
      ]}
    >
      <AdminAboutHeroView />
    </AdminLayout>
  );
}
