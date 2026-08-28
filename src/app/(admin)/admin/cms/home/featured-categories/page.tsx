import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminFeaturedCategoriesView from "@/components/admin/AdminFeaturedCategoriesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Featured Categories Header | HOF Pack Admin",
  description: "Manage homepage featured categories section copy",
};

export default function AdminFeaturedCategoriesPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Featured categories" },
      ]}
    >
      <AdminFeaturedCategoriesView />
    </AdminLayout>
  );
}
