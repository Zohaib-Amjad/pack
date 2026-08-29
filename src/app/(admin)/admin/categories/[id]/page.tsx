import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCategoryEditView from "@/components/admin/AdminCategoryEditView";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Edit Category | HOF Pack Admin",
  description: "Edit category metadata, descriptions, and banners",
};

export default async function AdminCategoryEditPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Product pages" },
        { label: "Nav categories", href: "/admin/categories" },
        { label: "Edit Category" },
      ]}
    >
      <AdminCategoryEditView categoryId={id} />
    </AdminLayout>
  );
}
