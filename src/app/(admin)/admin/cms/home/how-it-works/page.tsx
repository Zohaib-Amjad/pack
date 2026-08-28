import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminHowItWorksView from "@/components/admin/AdminHowItWorksView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How It Works | HOF Pack Admin",
  description: "Manage homepage 4-step process copy, images, and bullet points",
};

export default function AdminHowItWorksPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "How it works" },
      ]}
    >
      <AdminHowItWorksView />
    </AdminLayout>
  );
}
