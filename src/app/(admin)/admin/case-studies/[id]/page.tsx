"use client";

import React from "react";
import { useParams } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import AdminCaseStudyNewView from "@/components/admin/AdminCaseStudyNewView";

export default function AdminCaseStudyEditPage() {
  const params = useParams();
  const id = params?.id as string;

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: "Case Studies", href: "/admin/case-studies" },
        { label: "Edit Case Study" },
      ]}
    >
      <AdminCaseStudyNewView caseStudyId={id} isEdit={true} />
    </AdminLayout>
  );
}
