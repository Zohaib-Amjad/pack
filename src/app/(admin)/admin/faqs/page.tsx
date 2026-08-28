import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminFaqsView from "@/components/admin/AdminFaqsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin FAQs | HOF Pack",
  description: "Manage global and artwork FAQs",
};

export default function AdminFaqsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "FAQs" },
      ]}
    >
      <AdminFaqsView />
    </AdminLayout>
  );
}
