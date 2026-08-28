import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProcessHeroView from "@/components/admin/AdminProcessHeroView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Hero Section | HOF Pack Admin",
  description: "Manage Process page hero section copy and headings",
};

export default function AdminProcessHeroPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Process page" },
        { label: "Hero" },
      ]}
    >
      <AdminProcessHeroView />
    </AdminLayout>
  );
}
