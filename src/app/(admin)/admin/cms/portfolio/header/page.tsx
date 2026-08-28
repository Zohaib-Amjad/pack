import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPortfolioHeaderView from "@/components/admin/AdminPortfolioHeaderView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Header | HOF Pack Admin",
  description: "Manage Portfolio page header headings and description",
};

export default function AdminPortfolioHeaderPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Portfolio page" },
        { label: "Page header" },
      ]}
    >
      <AdminPortfolioHeaderView />
    </AdminLayout>
  );
}
