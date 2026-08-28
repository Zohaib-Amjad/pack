import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutTimelineView from "@/components/admin/AdminAboutTimelineView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Company Timeline | HOF Pack Admin",
  description: "Manage About page journey timeline headings and milestone items",
};

export default function AdminAboutTimelinePage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Company timeline" },
      ]}
    >
      <AdminAboutTimelineView />
    </AdminLayout>
  );
}
