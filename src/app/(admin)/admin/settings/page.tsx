import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminSettingsView from "@/components/admin/AdminSettingsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Global Settings | HOF Pack Admin",
  description: "Configure branding, contact details, social media, and header/footer link visibility",
};

export default function AdminSettingsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "Contact & inquiries" },
      ]}
    >
      <AdminSettingsView />
    </AdminLayout>
  );
}
