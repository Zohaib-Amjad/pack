import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminRelatedProductsView from "@/components/admin/AdminRelatedProductsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Related Products | HOF Pack Admin",
  description: "Manage homepage related and trending products selection",
};

export default function AdminRelatedProductsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Related products" },
      ]}
    >
      <AdminRelatedProductsView />
    </AdminLayout>
  );
}
