/**
 * Active-state rules for admin sidebar links (matches former CmsSidebar behavior).
 */
export function isAdminNavItemActive(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === "/admin" || pathname === "/admin/";
  }
  if (href === "/admin/settings") {
    return pathname === "/admin/settings" || pathname.startsWith("/admin/settings/");
  }
  if (href === "/admin/products/new") {
    return pathname === "/admin/products/new";
  }
  if (href === "/admin/products") {
    return (
      pathname === "/admin/products" ||
      (pathname.startsWith("/admin/products/") && pathname !== "/admin/products/new")
    );
  }
  if (href === "/admin/faqs") {
    return pathname === "/admin/faqs" || pathname.startsWith("/admin/faqs/");
  }
  if (href === "/admin/team") {
    return pathname === "/admin/team" || pathname.startsWith("/admin/team/");
  }
  if (href === "/admin/portfolio") {
    return pathname === "/admin/portfolio" || pathname.startsWith("/admin/portfolio/");
  }
  if (href === "/admin/categories") {
    return pathname === "/admin/categories" || pathname.startsWith("/admin/categories/");
  }
  if (href === "/admin/chat") {
    return pathname === "/admin/chat" || pathname.startsWith("/admin/chat/");
  }
  if (href === "/admin/inquiries") {
    return pathname === "/admin/inquiries" || pathname.startsWith("/admin/inquiries/");
  }
  if (href === "/admin/blog/new") {
    return pathname === "/admin/blog/new";
  }
  if (href === "/admin/blog") {
    return pathname === "/admin/blog" || (pathname.startsWith("/admin/blog/") && pathname !== "/admin/blog/new");
  }
  if (href === "/admin/case-studies/new") {
    return pathname === "/admin/case-studies/new";
  }
  if (href === "/admin/case-studies") {
    return pathname === "/admin/case-studies" || (pathname.startsWith("/admin/case-studies/") && pathname !== "/admin/case-studies/new");
  }
  if (href === "/admin/library/new") {
    return pathname === "/admin/library/new";
  }
  if (href === "/admin/library") {
    return pathname === "/admin/library" || (pathname.startsWith("/admin/library/") && pathname !== "/admin/library/new");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
