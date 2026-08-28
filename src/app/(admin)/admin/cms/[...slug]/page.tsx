import AdminLayout from "@/components/admin/AdminLayout";
import AdminHeroSectionView from "@/components/admin/AdminHeroSectionView";
import AdminAboutHeroView from "@/components/admin/AdminAboutHeroView";
import AdminAboutStatsView from "@/components/admin/AdminAboutStatsView";
import AdminAboutMissionView from "@/components/admin/AdminAboutMissionView";
import AdminAboutTimelineView from "@/components/admin/AdminAboutTimelineView";
import AdminAboutManufacturingView from "@/components/admin/AdminAboutManufacturingView";
import AdminAboutValuesView from "@/components/admin/AdminAboutValuesView";
import AdminAboutCertificationsView from "@/components/admin/AdminAboutCertificationsView";
import AdminProcessHeroView from "@/components/admin/AdminProcessHeroView";
import AdminProcessStatsView from "@/components/admin/AdminProcessStatsView";
import AdminProcessStepsView from "@/components/admin/AdminProcessStepsView";
import AdminProcessPromiseView from "@/components/admin/AdminProcessPromiseView";
import AdminPortfolioHeaderView from "@/components/admin/AdminPortfolioHeaderView";
import AdminPortfolioFiltersView from "@/components/admin/AdminPortfolioFiltersView";
import AdminLibraryHeroView from "@/components/admin/AdminLibraryHeroView";
import AdminCmsSeoView from "@/components/admin/AdminCmsSeoView";
import AdminCmsSectionEditor from "@/components/admin/AdminCmsSectionEditor";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Section Editor | HOF Pack Admin",
  description: "Edit website sections and content",
};

export default async function AdminCmsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const slugPath = slug ? slug.join("/") : "";

  const isHero = slugPath === "home/hero" || slugPath === "hero/hero" || slugPath === "hero";
  if (isHero) {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Homepage" },
          { label: "Hero section" },
        ]}
      >
        <AdminHeroSectionView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/hero") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Hero & intro" },
        ]}
      >
        <AdminAboutHeroView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/stats") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Stats strip" },
        ]}
      >
        <AdminAboutStatsView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/mission") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Mission" },
        ]}
      >
        <AdminAboutMissionView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/timeline") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Company timeline" },
        ]}
      >
        <AdminAboutTimelineView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/manufacturing") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Manufacturing" },
        ]}
      >
        <AdminAboutManufacturingView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/values") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Values cards" },
        ]}
      >
        <AdminAboutValuesView />
      </AdminLayout>
    );
  }

  if (slugPath === "about/certifications") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "About page" },
          { label: "Certifications" },
        ]}
      >
        <AdminAboutCertificationsView />
      </AdminLayout>
    );
  }

  if (slugPath === "process/hero") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Process page" },
          { label: "Hero" },
        ]}
      >
        <AdminProcessHeroView />
      </AdminLayout>
    );
  }

  if (slugPath === "process/stats") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Process page" },
          { label: "Stats row" },
        ]}
      >
        <AdminProcessStatsView />
      </AdminLayout>
    );
  }

  if (slugPath === "process/steps") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Process page" },
          { label: "Process steps" },
        ]}
      >
        <AdminProcessStepsView />
      </AdminLayout>
    );
  }

  if (slugPath === "process/promise") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Process page" },
          { label: "Quality promise" },
        ]}
      >
        <AdminProcessPromiseView />
      </AdminLayout>
    );
  }

  if (slugPath === "portfolio/header") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio page" },
          { label: "Page header" },
        ]}
      >
        <AdminPortfolioHeaderView />
      </AdminLayout>
    );
  }

  if (slugPath === "portfolio/filters") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Portfolio page" },
          { label: "Gallery & filters" },
        ]}
      >
        <AdminPortfolioFiltersView />
      </AdminLayout>
    );
  }

  if (slugPath === "library/hero") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Library page" },
          { label: "Hero section" },
        ]}
      >
        <AdminLibraryHeroView />
      </AdminLayout>
    );
  }

  if (slugPath === "seo") {
    return (
      <AdminLayout
        breadcrumbs={[
          { label: "Admin", href: "/admin" },
          { label: "Global settings" },
          { label: "SEO & Meta" },
        ]}
      >
        <AdminCmsSeoView />
      </AdminLayout>
    );
  }

  // Format breadcrumb section title
  const pageCategory = slug && slug[0] ? slug[0].charAt(0).toUpperCase() + slug[0].slice(1) : "Homepage";
  const sectionTitle = slug && slug[1] ? slug[1].split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "Section";

  return (
    <AdminLayout
      breadcrumbs={[
        { label: "Admin", href: "/admin" },
        { label: pageCategory },
        { label: sectionTitle },
      ]}
    >
      <AdminCmsSectionEditor />
    </AdminLayout>
  );
}
