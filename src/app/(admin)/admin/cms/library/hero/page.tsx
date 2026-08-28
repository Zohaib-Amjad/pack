import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLibraryHeroView from "@/components/admin/AdminLibraryHeroView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Library Hero | HOF Pack Admin",
  description: "Manage the hero banner of the Packaging Materials & Finishing Library",
};

export default function AdminLibraryHeroPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Library page" },
        { label: "Hero section" },
      ]}
    >
      <AdminLibraryHeroView />
    </AdminLayout>
  );
}
