import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCaseStudyNewView from "@/components/admin/AdminCaseStudyNewView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Case Study | HOF Pack Admin",
  description: "Create and publish a new client success story or packaging ROI case study",
};

export default function AdminCaseStudyNewPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies" },
        { label: "New case study" },
      ]}
    >
      <AdminCaseStudyNewView />
    </AdminLayout>
  );
}
