import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminDashboardView from "@/components/admin/AdminDashboardView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | HOF Pack",
  description: "HOF Pack CMS & Content Manager",
};

export default function AdminPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Overview" },
        { label: "Dashboard" },
      ]}
    >
      <AdminDashboardView />
    </AdminLayout>
  );
}
