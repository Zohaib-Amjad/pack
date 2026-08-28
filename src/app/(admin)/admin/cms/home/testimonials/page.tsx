import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminTestimonialsView from "@/components/admin/AdminTestimonialsView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Testimonials | HOF Pack Admin",
  description: "Manage homepage customer testimonials, trust stats, and ratings",
};

export default function AdminTestimonialsPage() {
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Homepage" },
        { label: "Testimonials" },
      ]}
    >
      <AdminTestimonialsView />
    </AdminLayout>
  );
}
