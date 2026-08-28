import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutMissionView from "@/components/admin/AdminAboutMissionView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mission Section | HOF Pack Admin",
  description: "Manage About page mission copy, paragraphs, and bullet points",
};

export default function AdminAboutMissionPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Mission" },
      ]}
    >
      <AdminAboutMissionView />
    </AdminLayout>
  );
}
