import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutValuesView from "@/components/admin/AdminAboutValuesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Values Cards | HOF Pack Admin",
  description: "Manage About page core values cards, icons, and descriptions",
};

export default function AdminAboutValuesPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Values cards" },
      ]}
    >
      <AdminAboutValuesView />
    </AdminLayout>
  );
}
