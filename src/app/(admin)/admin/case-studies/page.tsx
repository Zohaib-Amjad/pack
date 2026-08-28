import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCaseStudiesView from "@/components/admin/AdminCaseStudiesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Case Studies | HOF Pack Admin",
  description: "Manage client case studies, ROI outcomes, and packaging success stories",
};

export default function AdminCaseStudiesPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies" },
        { label: "All case studies" },
      ]}
    >
      <AdminCaseStudiesView />
    </AdminLayout>
  );
}
