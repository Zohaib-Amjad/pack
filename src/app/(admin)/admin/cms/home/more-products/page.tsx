import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminMoreProductsView from "@/components/admin/AdminMoreProductsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "More Products Slider | HOF Pack Admin",
  description: "Manage homepage bottom more products slider selection",
};

export default function AdminMoreProductsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "More products" },
      ]}
    >
      <AdminMoreProductsView />
    </AdminLayout>
  );
}
