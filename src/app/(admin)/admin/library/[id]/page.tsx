import React from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminLibraryNewView from "@/components/admin/AdminLibraryNewView";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit Library Item | HOF Pack Admin",
  description: "Edit packaging material, finishing, or dieline resource",
};

interface EditLibraryPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditLibraryPage({ params }: EditLibraryPageProps) {
  const resolvedParams = await params;
  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Library items", href: "/admin/library" },
        { label: "Edit item" },
      ]}
    >
      <AdminLibraryNewView itemId={resolvedParams.id} isEdit={true} />
    </AdminLayout>
  );
}
