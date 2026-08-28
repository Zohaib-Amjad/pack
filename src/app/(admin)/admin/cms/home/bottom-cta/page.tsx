import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBottomCtaView from "@/components/admin/AdminBottomCtaView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bottom CTA | HOF Pack Admin",
  description: "Manage homepage bottom call-to-action banner copy and button label",
};

export default function AdminBottomCtaPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Bottom CTA" },
      ]}
    >
      <AdminBottomCtaView />
    </AdminLayout>
  );
}
