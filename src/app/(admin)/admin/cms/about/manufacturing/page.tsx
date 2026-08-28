import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAboutManufacturingView from "@/components/admin/AdminAboutManufacturingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Manufacturing Section | HOF Pack Admin",
  description: "Manage About page manufacturing facilities, copy, and QC highlights",
};

export default function AdminAboutManufacturingPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "About page" },
        { label: "Manufacturing" },
      ]}
    >
      <AdminAboutManufacturingView />
    </AdminLayout>
  );
}
