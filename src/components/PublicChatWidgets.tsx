"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const CRISP_SCRIPT_ID = "crisp-chat-script";
const CRISP_SRC = "https://client.crisp.chat/l.js";
const CRISP_WEBSITE_ID = "12f25100-81e4-4050-ab8d-6d41d0ee528e";

type CrispWindow = Window & {
  $crisp?: unknown[];
  CRISP_WEBSITE_ID?: string;
  $zoho?: unknown;
};

function isAdminPath(pathname: string | null) {
  return !!pathname && pathname.startsWith("/admin");
}

function removeLegacyWidgets() {
  // Zendesk leftovers
  document.getElementById("ze-snippet")?.remove();
  document
    .querySelectorAll(
      'iframe#launcher, iframe#webWidget, iframe[src*="zendesk"], iframe[src*="zdassets"]',
    )
    .forEach((el) => el.remove());

  // Zoho SalesIQ leftovers
  document.getElementById("zoho-salesiq-boot")?.remove();
  document.getElementById("zsiqscript")?.remove();
  document
    .querySelectorAll(
      '#zsiqwidget, .zsiq_floatmain, .zsiq-float, iframe[src*="salesiq"], iframe[src*="zoho"], [id^="zsiq"]',
    )
    .forEach((el) => el.remove());

  const win = window as CrispWindow;
  if (win.$zoho) {
    try {
      delete win.$zoho;
    } catch {
      win.$zoho = undefined;
    }
  }
}

function setCrispVisibility(visible: boolean) {
  const win = window as CrispWindow;
  const crisp = win.$crisp;

  if (Array.isArray(crisp)) {
    try {
      // Crisp queue API: ["do", "chat:show" | "chat:hide"]
      crisp.push(["do", visible ? "chat:show" : "chat:hide"]);
    } catch {
      /* ignore */
    }
  }

  document.documentElement.classList.toggle("hide-crisp-chat", !visible);
}

function ensureCrispLoaded(onReady?: () => void) {
  const win = window as CrispWindow;
  win.$crisp = win.$crisp || [];
  win.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

  if (document.getElementById(CRISP_SCRIPT_ID)) {
    onReady?.();
    return;
  }

  const script = document.createElement("script");
  script.id = CRISP_SCRIPT_ID;
  script.src = CRISP_SRC;
  script.async = true;
  script.addEventListener("load", () => onReady?.());
  document.getElementsByTagName("head")[0]?.appendChild(script);
}

/**
 * Loads Crisp chat once on public pages.
 * Hides it on /admin. Strips leftover Zendesk / Zoho markup.
 */
export default function PublicChatWidgets() {
  const pathname = usePathname();
  const loadedForPublic = useRef(false);

  useEffect(() => {
    removeLegacyWidgets();

    if (isAdminPath(pathname)) {
      setCrispVisibility(false);
      return;
    }

    if (loadedForPublic.current || document.getElementById(CRISP_SCRIPT_ID)) {
      loadedForPublic.current = true;
      setCrispVisibility(true);
      return;
    }

    let cancelled = false;
    let started = false;
    let idleId: number | null = null;
    const events: Array<keyof WindowEventMap> = [
      "click",
      "keydown",
    ];

    const load = () => {
      if (cancelled) return;
      ensureCrispLoaded(() => {
        loadedForPublic.current = true;
        setCrispVisibility(true);
      });
    };

    const removeListeners = () => {
      events.forEach((event) => window.removeEventListener(event, start));
    };

    const start = () => {
      if (started) return;
      started = true;
      removeListeners();
      idleId =
        typeof window.requestIdleCallback === "function"
          ? window.requestIdleCallback(load, { timeout: 1_500 })
          : window.setTimeout(load, 0);
    };

    // Chat remains available as soon as the visitor interacts, but its
    // third-party script no longer competes with initial rendering.
    events.forEach((event) =>
      window.addEventListener(event, start, { passive: true, once: true }),
    );
    const fallbackId = window.setTimeout(start, 120_000);

    return () => {
      cancelled = true;
      removeListeners();
      window.clearTimeout(fallbackId);
      if (idleId != null) {
        if (typeof window.cancelIdleCallback === "function") {
          window.cancelIdleCallback(idleId);
        } else {
          window.clearTimeout(idleId);
        }
      }
    };
  }, [pathname]);

  return null;
}