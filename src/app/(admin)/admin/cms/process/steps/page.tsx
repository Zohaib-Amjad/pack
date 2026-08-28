import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProcessStepsView from "@/components/admin/AdminProcessStepsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Process Steps | HOF Pack Admin",
  description: "Manage Process page 4-step workflow steps and detail bullets",
};

export default function AdminProcessStepsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Process page" },
        { label: "Process steps" },
      ]}
    >
      <AdminProcessStepsView />
    </AdminLayout>
  );
}
