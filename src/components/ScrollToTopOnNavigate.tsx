"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

function jumpToPageTop() {
  if (typeof window === "undefined") return;

  const hash = window.location.hash;
  if (hash.length > 1) {
    const id = decodeURIComponent(hash.slice(1));
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ block: "start" });
      return;
    }
  }

  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

export default function ScrollToTopOnNavigate() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    jumpToPageTop();

    const frame = requestAnimationFrame(jumpToPageTop);
    const immediate = window.setTimeout(jumpToPageTop, 0);
    const afterFocus = window.setTimeout(jumpToPageTop, 80);

    return () => {
      cancelAnimationFrame(frame);
      window.clearTimeout(immediate);
      window.clearTimeout(afterFocus);
    };
  }, [pathname]);

  return null;
}
