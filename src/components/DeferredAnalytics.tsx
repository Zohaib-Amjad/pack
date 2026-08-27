"use client";

import { useEffect } from "react";

const GTM_ID = "GTM-TBXBHVCV";
const META_PIXEL_ID = "1318311059971693";
const CLARITY_ID = "wnd2ahg5iz";

function runInlineOnce(id: string, code: string) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.id = id;
  script.text = code;
  document.head.appendChild(script);
}

function loadAnalytics() {
  runInlineOnce(
    "deferred-gtm",
    `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;d.head.appendChild(j);})(window,document,'script','dataLayer','${GTM_ID}');`,
  );

  runInlineOnce(
    "deferred-meta-pixel",
    `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL_ID}');fbq('track','PageView');`,
  );

  runInlineOnce(
    "deferred-clarity",
    `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src='https://www.clarity.ms/tag/'+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,'clarity','script','${CLARITY_ID}');`,
  );
}

/**
 * Third-party analytics is non-render-critical. Load it after the visitor's
 * first interaction, with a fallback for passive sessions. Existing
 * dataLayer events stay queued and are consumed when GTM becomes available.
 */
export default function DeferredAnalytics() {
  useEffect(() => {
    let started = false;
    let idleId: number | null = null;

    const events: Array<keyof WindowEventMap> = [
      "click",
      "keydown",
    ];

    const removeListeners = () => {
      events.forEach((event) => window.removeEventListener(event, start));
    };

    const start = () => {
      if (started) return;
      started = true;
      removeListeners();
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(loadAnalytics, { timeout: 1_500 });
      } else {
        idleId = window.setTimeout(loadAnalytics, 0);
      }
    };

    events.forEach((event) =>
      window.addEventListener(event, start, { passive: true, once: true }),
    );
    const fallbackId = window.setTimeout(start, 120_000);

    return () => {
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
  }, []);

  return null;
}