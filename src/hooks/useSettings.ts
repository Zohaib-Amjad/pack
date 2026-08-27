import { useQuery } from "@tanstack/react-query";
import { createPublicClient } from "@/utils/supabase/public-client";
import { withAbortableTimeout } from "@/lib/fetch-utils";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export interface SiteSettings {
  general: {
    siteName: string;
    seoDescription: string;
    logo_url?: string;
    showAboutInNav?: boolean;
    showContactInNav?: boolean;
    showProcessInNav?: boolean;
    showPortfolioInNav?: boolean;
    showAboutInFooter?: boolean;
    showBrandGuideInFooter?: boolean;
    showCompanyProfileInFooter?: boolean;
    showGetQuoteInFooter?: boolean;
    showHelpFaqInFooter?: boolean;
    showTermsInFooter?: boolean;
    showPrivacyInFooter?: boolean;
    showSitemapInFooter?: boolean;
    showProcessInFooter?: boolean;
    showPortfolioInFooter?: boolean;
  };
  contact: {
    email: string;
    phone: string;
    address: string;
    whatsapp: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    tiktok?: string;
    pinterest?: string;
  };
}

const defaultSettings: SiteSettings = {
  general: {
    siteName: "HofPack",
    seoDescription: "Premium custom packaging for luxury brands.",
    showAboutInNav: true,
    showContactInNav: true,
    showProcessInNav: true,
    showPortfolioInNav: true,
    showAboutInFooter: true,
    showBrandGuideInFooter: true,
    showCompanyProfileInFooter: true,
    showGetQuoteInFooter: true,
    showHelpFaqInFooter: true,
    showTermsInFooter: true,
    showPrivacyInFooter: true,
    showSitemapInFooter: true,
    showProcessInFooter: true,
    showPortfolioInFooter: true,
  },
  contact: {
    email: "info@hofpack.com",
    phone: "+1 (888) 429 4881",
    address: "USA Based, Ships Worldwide",
    whatsapp: WHATSAPP_NUMBER,
  },
  social: {},
};

async function fetchSettings(): Promise<SiteSettings> {
  try {
    const supabase = createPublicClient();
    const { data, error } = await withAbortableTimeout((signal) =>
      (supabase
        .from("site_settings" as any)
        .select("key, value")
        .in("key", ["general", "contact", "social"])
        .abortSignal(signal) as any)
    ) as any;

    if (!data || error) return defaultSettings;

    const mapped = data.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});

    return {
      general: { ...defaultSettings.general, ...(mapped.general || {}) },
      contact: { ...defaultSettings.contact, ...(mapped.contact || {}) },
      social: { ...defaultSettings.social, ...(mapped.social || {}) },
    };
  } catch {
    return defaultSettings;
  }
}

export function useSettings() {
  const { data, isLoading } = useQuery({
    queryKey: ["public", "site-settings"],
    queryFn: fetchSettings,
    staleTime: Infinity,   // settings don't change during a session
    placeholderData: defaultSettings,
  });

  return {
    settings: data ?? defaultSettings,
    loading: isLoading,
  };
}
