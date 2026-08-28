import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProcessStatsView from "@/components/admin/AdminProcessStatsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Stats Row | HOF Pack Admin",
  description: "Manage Process page metric statistics and badges",
};

export default function AdminProcessStatsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Process page" },
        { label: "Stats row" },
      ]}
    >
      <AdminProcessStatsView />
    </AdminLayout>
  );
}
