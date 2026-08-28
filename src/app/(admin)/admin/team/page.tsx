import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTeamView from "@/components/admin/AdminTeamView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Management | HOF Pack Admin",
  description: "Control administrative access and user roles for your organization",
};

export default function AdminTeamPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Global settings" },
        { label: "Team management" },
      ]}
    >
      <AdminTeamView />
    </AdminLayout>
  );
}
