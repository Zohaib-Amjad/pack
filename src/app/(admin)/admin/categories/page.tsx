import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCategoriesView from "@/components/admin/AdminCategoriesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Navigation Categories | HOF Pack Admin",
  description: "Manage catalog navigation categories",
};

export default function AdminCategoriesPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Product pages" },
        { label: "Nav categories" },
      ]}
    >
      <AdminCategoriesView />
    </AdminLayout>
  );
}
