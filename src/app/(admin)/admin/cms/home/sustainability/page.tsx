import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSustainabilityView from "@/components/admin/AdminSustainabilityView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sustainability | HOF Pack Admin",
  description: "Manage homepage sustainability copy, stats, and icons",
};

export default function AdminSustainabilityPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Sustainability" },
      ]}
    >
      <AdminSustainabilityView />
    </AdminLayout>
  );
}
