import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBlogView from "@/components/admin/AdminBlogView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts | HOF Pack Admin",
  description: "Manage blog posts, industry articles, packaging guides, and publishing status",
};

export default function AdminBlogPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Blog" },
        { label: "All posts" },
      ]}
    >
      <AdminBlogView />
    </AdminLayout>
  );
}
