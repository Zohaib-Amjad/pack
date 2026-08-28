import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCmsSeoView from "@/components/admin/AdminCmsSeoView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SEO & Meta | HOF Pack Admin",
  description: "Manage global and page-level SEO meta tags, descriptions, and keywords",
};

export default function AdminCmsSeoPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "SEO & Meta" },
      ]}
    >
      <AdminCmsSeoView />
    </AdminLayout>
  );
}
