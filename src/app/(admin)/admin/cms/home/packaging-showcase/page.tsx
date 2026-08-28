import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPackagingShowcaseView from "@/components/admin/AdminPackagingShowcaseView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Packaging Showcase | HOF Pack Admin",
  description: "Manage homepage packaging showcase copy and feature cards",
};

export default function AdminPackagingShowcasePage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Packaging showcase" },
      ]}
    >
      <AdminPackagingShowcaseView />
    </AdminLayout>
  );
}
