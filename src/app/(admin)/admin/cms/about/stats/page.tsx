import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutStatsView from "@/components/admin/AdminAboutStatsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Stats Strip | HOF Pack Admin",
  description: "Manage About page statistics metrics and icons",
};

export default function AdminAboutStatsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Stats strip" },
      ]}
    >
      <AdminAboutStatsView />
    </AdminLayout>
  );
}
