import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminWhyUsView from "@/components/admin/AdminWhyUsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Us | HOF Pack Admin",
  description: "Manage homepage Why Us section copy, stats, and cards",
};

export default function AdminWhyUsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Why us" },
      ]}
    >
      <AdminWhyUsView />
    </AdminLayout>
  );
}
