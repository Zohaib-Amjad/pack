import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTrustBarView from "@/components/admin/AdminTrustBarView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trust Bar | HOF Pack Admin",
  description: "Manage homepage trust stats and brand marquee logos",
};

export default function AdminTrustBarPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Trust bar" },
      ]}
    >
      <AdminTrustBarView />
    </AdminLayout>
  );
}
