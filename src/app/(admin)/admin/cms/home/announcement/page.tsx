import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminAnnouncementBarView from "@/components/admin/AdminAnnouncementBarView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Announcement Bar | HOF Pack Admin",
  description: "Manage rotating ticker messages on the homepage",
};

export default function AdminAnnouncementPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Announcement bar" },
      ]}
    >
      <AdminAnnouncementBarView />
    </AdminLayout>
  );
}
