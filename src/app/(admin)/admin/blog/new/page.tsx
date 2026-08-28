import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBlogNewView from "@/components/admin/AdminBlogNewView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Blog Post | HOF Pack Admin",
  description: "Create and publish a new packaging knowledge article or blog post",
};

export default function AdminBlogNewPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Blog" },
        { label: "New post" },
      ]}
    >
      <AdminBlogNewView />
    </AdminLayout>
  );
}
