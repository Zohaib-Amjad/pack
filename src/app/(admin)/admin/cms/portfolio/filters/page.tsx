import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPortfolioFiltersView from "@/components/admin/AdminPortfolioFiltersView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Portfolio Filters | HOF Pack Admin",
  description: "Manage Portfolio page category filter labels",
};

export default function AdminPortfolioFiltersPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Portfolio page" },
        { label: "Gallery & filters" },
      ]}
    >
      <AdminPortfolioFiltersView />
    </AdminLayout>
  );
}
