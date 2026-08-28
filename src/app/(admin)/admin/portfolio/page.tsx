import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPortfolioView from "@/components/admin/AdminPortfolioView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Projects | HOF Pack Admin",
  description: "Manage portfolio projects, gallery showcases, and case studies",
};

export default function AdminPortfolioPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Portfolio page" },
        { label: "All projects" },
      ]}
    >
      <AdminPortfolioView />
    </AdminLayout>
  );
}
