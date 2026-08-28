"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminPortfolioModal from "@/components/admin/AdminPortfolioItemForm";

export default function AdminPortfolioEditPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Portfolio", href: "/admin/portfolio" },
        { label: "Edit Project" },
      ]}
    >
      <div className="p-8 flex items-center justify-center">
        <AdminPortfolioModal
          isOpen={true}
          itemId={id}
          isEdit={true}
          onClose={() => router.push("/admin/portfolio")}
          onSuccess={() => router.push("/admin/portfolio")}
        />
      </div>
    </AdminLayout>
  );
}
