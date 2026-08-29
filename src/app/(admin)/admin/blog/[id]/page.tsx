"use client";

import React from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminBlogNewView from "@/components/admin/AdminBlogNewView";

export default function AdminBlogEditPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Blog", href: "/admin/blog" },
        { label: "Edit Post" },
      ]}
    >
      <AdminBlogNewView postId={id} isEdit={true} />
    </AdminLayout>
  );
}
