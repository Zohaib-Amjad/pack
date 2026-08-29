import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCategoryEditView from "@/components/admin/AdminCategoryEditView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Category | HOF Pack Admin",
  description: "Create a new packaging navigation category",
};

export default function AdminCategoryNewPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Product pages" },
        { label: "Nav categories", href: "/admin/categories" },
        { label: "New Category" },
      ]}
    >
      <AdminCategoryEditView isNew />
    </AdminLayout>
  );
}
