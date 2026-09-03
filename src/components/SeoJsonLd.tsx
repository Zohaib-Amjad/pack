import JSONLD from "@/components/JSONLD";
import { getSeoSettings, getSiteContactAndSocial } from "@/lib/seo-server";
import { publicSiteUrl } from "@/lib/seo-metadata";

/** Server component: emits JSON-LD based on SEO advanced toggles. */
export default async function SeoJsonLd() {
  const [seo, { contact, social }] = await Promise.all([
    getSeoSettings(),
    getSiteContactAndSocial(),
  ]);
  const base = publicSiteUrl();

  const scripts: { key: string; data: object }[] = [];

  if (seo.advanced.schemaOrganization) {
    const sameAs = [
      social.facebook,
      social.instagram,
      social.linkedin,
      social.twitter,
    ].filter((v): v is string => !!v && v.startsWith("http"));

    const orgName = seo.advanced.orgName?.trim() || "HofPack";
    const rawLogoUrl = seo.advanced.orgLogoUrl?.trim();
    const logoUrl = rawLogoUrl
      ? rawLogoUrl.startsWith("http")
        ? rawLogoUrl
        : `${base}${rawLogoUrl.startsWith("/") ? rawLogoUrl : `/${rawLogoUrl}`}`
      : `${base}/hofpack-logo.png`;

    const orgData: Record<string, unknown> = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "@id": base,
      name: orgName,
      url: base,
      logo: logoUrl,
      description:
        "Premium custom packaging boxes, mylar bags, and mailer boxes with low MOQ and free design support. Ships across the USA.",
      priceRange: "$0.50 - $50",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3700 W Tybolt Dr, Tucson, AZ 85746, USA",
        addressLocality: "Tucson",
        addressRegion: "Arizona",
        postalCode: "85746",
        addressCountry: "US",
      },
    };

    if (contact.email) {
      orgData.email = contact.email;
    }

    if (contact.phone) {
      orgData.telephone = contact.phone;
    }

    if (sameAs.length > 0) {
      orgData.sameAs = sameAs;
    }

    scripts.push({ key: "org", data: orgData });
  }

  if (seo.advanced.schemaWebSiteSearch) {
    const siteName = seo.advanced.orgName?.trim() || "HofPack";
    scripts.push({
      key: "website",
      data: {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: base,
        name: siteName,
        potentialAction: {
          "@type": "SearchAction",
          target: `${base}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
    });
  }

  return (
    <>
      {scripts.map((s) => (
        <JSONLD key={s.key} data={s.data} />
      ))}
    </>
  );
}
