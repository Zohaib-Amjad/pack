import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeroSectionView from "@/components/admin/AdminHeroSectionView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Section | HOF Pack Admin",
  description: "Manage homepage hero section copy and imagery",
};

export default function AdminHomeHeroPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Hero section" },
      ]}
    >
      <AdminHeroSectionView />
    </AdminLayout>
  );
}
