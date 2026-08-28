import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminInquiriesView from "@/components/admin/AdminInquiriesView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Customer Inquiries | HOF Pack Admin",
  description: "Manage incoming customer quote requests and inquiries",
};

export default function AdminInquiriesPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Communication" },
        { label: "Inquiries" },
      ]}
    >
      <AdminInquiriesView />
    </AdminLayout>
  );
}
