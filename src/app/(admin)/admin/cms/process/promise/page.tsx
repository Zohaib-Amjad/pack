import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminProcessPromiseView from "@/components/admin/AdminProcessPromiseView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quality Promise | HOF Pack Admin",
  description: "Manage Process page quality guarantee and promise pillars",
};

export default function AdminProcessPromisePage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Process page" },
        { label: "Quality promise" },
      ]}
    >
      <AdminProcessPromiseView />
    </AdminLayout>
  );
}
