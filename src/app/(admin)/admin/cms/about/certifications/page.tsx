import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutCertificationsView from "@/components/admin/AdminAboutCertificationsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications | HOF Pack Admin",
  description: "Manage About page industry certifications, ratings, and trust badges",
};

export default function AdminAboutCertificationsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Certifications" },
      ]}
    >
      <AdminAboutCertificationsView />
    </AdminLayout>
  );
}
