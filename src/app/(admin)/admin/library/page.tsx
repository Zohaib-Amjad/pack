import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLibraryView from "@/components/admin/AdminLibraryView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Items | HOF Pack Admin",
  description: "Manage Packaging Materials, Finishes, Inserts, and Library specifications",
};

export default function AdminLibraryPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Library items" },
        { label: "All items" },
      ]}
    >
      <AdminLibraryView />
    </AdminLayout>
  );
}
