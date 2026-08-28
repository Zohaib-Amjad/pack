import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminFaqHeadingView from "@/components/admin/AdminFaqHeadingView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Heading | HOF Pack Admin",
  description: "Manage homepage FAQ section title lead and accent copy",
};

export default function AdminFaqHeadingPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "FAQ heading" },
      ]}
    >
      <AdminFaqHeadingView />
    </AdminLayout>
  );
}
