import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProductsView from "@/components/admin/AdminProductsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products Management | HOF Pack Admin",
  description: "Manage packaging catalog products",
};

export default function AdminProductsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Product pages" },
        { label: "All products" },
      ]}
    >
      <AdminProductsView />
    </AdminLayout>
  );
}
