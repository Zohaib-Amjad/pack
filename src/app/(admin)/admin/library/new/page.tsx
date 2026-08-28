import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLibraryNewView from "@/components/admin/AdminLibraryNewView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Library Item | HOF Pack Admin",
  description: "Create and publish a new packaging material, finishing, or dieline resource",
};

export default function AdminLibraryNewPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Library items" },
        { label: "New item" },
      ]}
    >
      <AdminLibraryNewView />
    </AdminLayout>
  );
}
