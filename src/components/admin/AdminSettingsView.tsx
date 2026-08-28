"use client";

import React, { useState, useEffect } from "react";
import {
  Save,
  Mail,
  Phone,
  MessageCircle,
  MapPin,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { createDataClient } from "@/utils/supabase/data-client";
import { createPublicClient } from "@/utils/supabase/public-client";

interface VisibilitySettings {
  aboutHeader: boolean;
  sitemapFooter: boolean;
  contactHeader: boolean;
  processHeader: boolean;
  portfolioHeader: boolean;
  aboutUsFooter: boolean;
  brandGuideFooter: boolean;
  companyProfileFooter: boolean;
  getQuoteFooter: boolean;
  helpFaqFooter: boolean;
  termsFooter: boolean;
  privacyFooter: boolean;
  processFooter: boolean;
  portfolioFooter: boolean;
}

export default function AdminSettingsView() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<
    "all" | "branding" | "contact_social"
  >("all");

  // General Branding
  const [siteTitle, setSiteTitle] = useState("HOF Pack");
  const [siteDescription, setSiteDescription] = useState(
    "Premium custom packaging for luxury brands. Eco-friendly, cruelty-free, and made to make an impression."
  );

  // Visibility Checkboxes
  const [visibility, setVisibility] = useState<VisibilitySettings>({
    aboutHeader: false,
    sitemapFooter: true,
    contactHeader: true,
    processHeader: false,
    portfolioHeader: false,
    aboutUsFooter: true,
    brandGuideFooter: false,
    companyProfileFooter: false,
    getQuoteFooter: false,
    helpFaqFooter: false,
    termsFooter: true,
    privacyFooter: true,
    processFooter: false,
    portfolioFooter: false,
  });

  // Contact Details
  const [email, setEmail] = useState("info@hofpack.com");
  const [phone, setPhone] = useState("+1 (888) 429 4881");
  const [whatsapp, setWhatsapp] = useState("15204271110");
  const [address, setAddress] = useState(
    "3700 W TYBOLT Dr, Tucson, AZ 85746, USA"
  );

  // Social Media
  const [instagram, setInstagram] = useState(
    "https://www.instagram.com/hofpack/?hl=en"
  );
  const [facebook, setFacebook] = useState(
    "https://www.facebook.com/people/HOF-Pack/61583706969172/"
  );
  const [tiktok, setTiktok] = useState("https://www.tiktok.com/@hofpack");
  const [pinterest, setPinterest] = useState(
    "https://www.pinterest.com/hofpack/"
  );

  const [savingBranding, setSavingBranding] = useState(false);
  const [savingContact, setSavingContact] = useState(false);
  const [savingSocial, setSavingSocial] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      try {
        const supabase = createPublicClient();
        const { data } = await supabase
          .from("site_settings" as any)
          .select("value")
          .eq("key", "site_global_settings")
          .maybeSingle();

        if (data?.value) {
          const val = data.value as any;
          if (val.siteTitle) setSiteTitle(val.siteTitle);
          if (val.siteDescription) setSiteDescription(val.siteDescription);
          if (val.visibility) setVisibility((prev) => ({ ...prev, ...val.visibility }));
          if (val.email) setEmail(val.email);
          if (val.phone) setPhone(val.phone);
          if (val.whatsapp) setWhatsapp(val.whatsapp);
          if (val.address) setAddress(val.address);
          if (val.instagram) setInstagram(val.instagram);
          if (val.facebook) setFacebook(val.facebook);
          if (val.tiktok) setTiktok(val.tiktok);
          if (val.pinterest) setPinterest(val.pinterest);
        }
      } catch {
        // Fallback to initial defaults
      }
    }
    loadSettings();
  }, []);

  const saveToSupabase = async (updatedFields: Record<string, any>) => {
    try {
      const supabase = createDataClient();
      const payload = {
        siteTitle,
        siteDescription,
        visibility,
        email,
        phone,
        whatsapp,
        address,
        instagram,
        facebook,
        tiktok,
        pinterest,
        ...updatedFields,
      };

      await supabase.from("site_settings" as any).upsert(
        {
          key: "site_global_settings",
          value: payload,
          updated_at: new Date().toISOString(),
        } as any,
        { onConflict: "key" }
      );
    } catch {
      // Offline fallback
    }
  };

  const toggleVisibility = (key: keyof VisibilitySettings) => {
    setVisibility((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveToSupabase({ visibility: next });
      return next;
    });
  };

  const handleSaveBranding = async () => {
    setSavingBranding(true);
    await saveToSupabase({ siteTitle, siteDescription, visibility });
    setSavingBranding(false);
    toast({
      title: "Branding Settings Saved",
      description: "Site title, meta description, and navigation links updated in Supabase.",
    });
  };

  const handleSaveContact = async () => {
    setSavingContact(true);
    await saveToSupabase({ email, phone, whatsapp, address });
    setSavingContact(false);
    toast({
      title: "Contact Details Saved",
      description: "Global email, phone, and address updated in Supabase.",
    });
  };

  const handleSaveSocial = async () => {
    setSavingSocial(true);
    await saveToSupabase({ instagram, facebook, tiktok, pinterest });
    setSavingSocial(false);
    toast({
      title: "Social Links Saved",
      description: "Instagram, Facebook, TikTok, and Pinterest URLs updated in Supabase.",
    });
  };

  return (
    <div className="flex flex-col flex-1 min-h-0 min-w-0">
      {/* Subtabs Bar */}
      <div className="ptabs bg-white/70 backdrop-blur-sm border-b border-[#e0ddd6]/60 flex px-5 sm:px-6 shrink-0 overflow-x-auto gap-4 [scrollbar-width:thin]">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "all"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          All Settings
          {activeTab === "all" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "branding"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          General &amp; Branding
          {activeTab === "branding" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("contact_social")}
          className={`ptab relative px-0.5 py-2 text-[12px] font-semibold cursor-pointer transition-colors whitespace-nowrap inline-flex items-center gap-1.5 ${
            activeTab === "contact_social"
              ? "text-[#2d5c3e]"
              : "text-[#aaa6a0] hover:text-[#1a1a1a]"
          }`}
        >
          Contact &amp; Social
          {activeTab === "contact_social" && (
            <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#e8732a] rounded-t-[1px]" />
          )}
        </button>
      </div>

      {/* Main View Area */}
      <div className="flex-1 overflow-y-auto p-8 scroll-smooth">
        <div className="max-w-[1440px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex flex-col gap-[20px] max-w-[1200px] mx-auto w-full animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[20px]">
              {/* Left Column: General Branding */}
              {(activeTab === "all" || activeTab === "branding") && (
                <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                  <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                    <div className="ch-l flex-1">
                      <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                        General Branding
                      </div>
                      <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                        Configure your site identity, SEO, and header/footer visibility
                      </div>
                    </div>
                    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                      <button
                        type="button"
                        onClick={handleSaveBranding}
                        disabled={savingBranding}
                        className="h-[32px] px-4 bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold text-[11px] rounded-[8px] transition-all flex items-center gap-2 shadow-[0_4px_12px_rgba(232,115,42,0.15)] active:scale-95 disabled:opacity-50 cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        {savingBranding ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>

                  <div className="cb p-6">
                    <div className="flex flex-col gap-6">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                          Site Title
                        </label>
                        <input
                          className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                          placeholder="e.g., HOFPack"
                          value={siteTitle}
                          onChange={(e) => setSiteTitle(e.target.value)}
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                          Site Description (SEO)
                        </label>
                        <textarea
                          className="w-full min-h-[140px] p-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] resize-none placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                          placeholder="Premium custom packaging for luxury brands..."
                          value={siteDescription}
                          onChange={(e) => setSiteDescription(e.target.value)}
                        />
                      </div>

                      <div className="pt-1 space-y-3">
                        <div className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest">
                          Header / Footer visibility
                        </div>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.aboutHeader}
                            onChange={() => toggleVisibility("aboutHeader")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;About&rdquo; in header
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;About&rdquo; menu item.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.sitemapFooter}
                            onChange={() => toggleVisibility("sitemapFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Sitemap&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the bottom &ldquo;Sitemap&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.contactHeader}
                            onChange={() => toggleVisibility("contactHeader")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Contact&rdquo; in header
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Contact&rdquo; menu item.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.processHeader}
                            onChange={() => toggleVisibility("processHeader")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Process&rdquo; in header
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Process&rdquo; menu item.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.portfolioHeader}
                            onChange={() => toggleVisibility("portfolioHeader")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Portfolio&rdquo; in header
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Portfolio&rdquo; menu item.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.aboutUsFooter}
                            onChange={() => toggleVisibility("aboutUsFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;About Us&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;About Us&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.brandGuideFooter}
                            onChange={() => toggleVisibility("brandGuideFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Brand Guide&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Brand Guide&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.companyProfileFooter}
                            onChange={() => toggleVisibility("companyProfileFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Company Profile&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Company Profile&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.getQuoteFooter}
                            onChange={() => toggleVisibility("getQuoteFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Get a Quote&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Get a Quote&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.helpFaqFooter}
                            onChange={() => toggleVisibility("helpFaqFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Help &amp; FAQ&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Help &amp; FAQ&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.termsFooter}
                            onChange={() => toggleVisibility("termsFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Terms &amp; Conditions&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Terms &amp; Conditions&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.privacyFooter}
                            onChange={() => toggleVisibility("privacyFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Privacy Policy&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Privacy Policy&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.processFooter}
                            onChange={() => toggleVisibility("processFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Our Process&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Our Process&rdquo; link.
                            </p>
                          </div>
                        </label>

                        <label className="flex cursor-pointer items-center gap-3 rounded-[12px] border border-[#e0ddd6] bg-[#f5f3ee]/40 px-4 py-3">
                          <input
                            className="h-4 w-4 accent-[#2d5c3e] cursor-pointer"
                            type="checkbox"
                            checked={visibility.portfolioFooter}
                            onChange={() => toggleVisibility("portfolioFooter")}
                          />
                          <div>
                            <span className="text-[12px] font-bold text-[#1a1a1a]">
                              Show &ldquo;Portfolio&rdquo; in footer
                            </span>
                            <p className="text-[10px] text-[#aaa6a0] mt-0.5">
                              Hide the &ldquo;Portfolio&rdquo; link.
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Right Column: Contact Details & Social Media */}
              {(activeTab === "all" || activeTab === "contact_social") && (
                <div className="space-y-[20px]">
                  {/* Contact Details Card */}
                  <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                      <div className="ch-l flex-1">
                        <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                          Contact Details
                        </div>
                        <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                          Global contact info for the brand
                        </div>
                      </div>
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <button
                          type="button"
                          onClick={handleSaveContact}
                          disabled={savingContact}
                          className="h-[32px] px-4 bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold text-[11px] rounded-[8px] transition-all flex items-center gap-2 shadow-[0_4px_12px_rgba(232,115,42,0.15)] active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {savingContact ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>

                    <div className="cb p-6">
                      <div className="flex flex-col gap-5">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                            <input
                              className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30 pl-11"
                              placeholder="info@hofpack.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Phone Number
                          </label>
                          <div className="relative">
                            <Phone className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                            <input
                              className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30 pl-11"
                              placeholder="+1 (888) 429-4881"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            WhatsApp Number
                          </label>
                          <div className="relative">
                            <MessageCircle className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                            <input
                              className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30 pl-11"
                              placeholder="15204271110"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                            />
                          </div>
                          <p className="text-[10px] text-[#aaa6a0] pl-1 mt-1">
                            Digits only, with country code (e.g. 15204271110)
                          </p>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Business Address
                          </label>
                          <div className="relative">
                            <MapPin className="absolute z-10 left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#aaa6a0]" />
                            <input
                              className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30 pl-11"
                              placeholder="123 Packaging Way, NY 10001"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Social Media Card */}
                  <div className="card bg-white/80 backdrop-blur-md border border-[#e0ddd6]/80 rounded-[16px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="ch p-[18px_24px] border-b border-[#e0ddd6]/60 flex items-center justify-between bg-[#f5f3ee]/30">
                      <div className="ch-l flex-1">
                        <div className="ct font-display text-[14px] font-bold text-[#1a1a1a] tracking-tight">
                          Social Media
                        </div>
                        <div className="cs text-[11px] text-[#aaa6a0] mt-[2px] font-medium uppercase tracking-wider">
                          Manage your social presence
                        </div>
                      </div>
                      <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                        <button
                          type="button"
                          onClick={handleSaveSocial}
                          disabled={savingSocial}
                          className="h-[32px] px-4 bg-[#e8732a] hover:bg-[#c45a18] text-white font-bold text-[11px] rounded-[8px] transition-all flex items-center gap-2 shadow-[0_4px_12px_rgba(232,115,42,0.15)] active:scale-95 disabled:opacity-50 cursor-pointer"
                        >
                          <Save className="w-3.5 h-3.5" />
                          {savingSocial ? "Saving..." : "Save Changes"}
                        </button>
                      </div>
                    </div>

                    <div className="cb p-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Instagram
                          </label>
                          <input
                            className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                            placeholder="@username"
                            value={instagram}
                            onChange={(e) => setInstagram(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Facebook
                          </label>
                          <input
                            className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                            placeholder="@username"
                            value={facebook}
                            onChange={(e) => setFacebook(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            TikTok
                          </label>
                          <input
                            className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                            placeholder="@username"
                            value={tiktok}
                            onChange={(e) => setTiktok(e.target.value)}
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-[#aaa6a0] uppercase tracking-widest pl-1 mb-1.5 block">
                            Pinterest
                          </label>
                          <input
                            className="w-full h-[44px] px-[16px] text-[13px] bg-[#f5f3ee]/50 backdrop-blur-sm border border-[#e0ddd6] rounded-[10px] focus:outline-none focus:border-[#e8732a] focus:ring-4 focus:ring-[#e8732a]/10 transition-all outline-none text-[#1a1a1a] placeholder:text-[#aaa6a0]/40 shadow-sm hover:border-[#e8732a]/30"
                            placeholder="@username"
                            value={pinterest}
                            onChange={(e) => setPinterest(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
