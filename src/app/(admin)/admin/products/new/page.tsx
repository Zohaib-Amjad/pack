import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProductNewView from "@/components/admin/AdminProductNewView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add New Product | HOF Pack Admin",
  description: "Expand catalog with custom box styles, specifications, and SEO metadata",
};

export default function AdminProductNewPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Product pages" },
        { label: "New product" },
      ]}
    >
      <AdminProductNewView />
    </AdminLayout>
  );
}
