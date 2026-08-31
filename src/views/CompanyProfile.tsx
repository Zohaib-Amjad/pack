"use client";

import { useCallback } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import {
  Download, Users, Factory, Globe, Truck, Leaf, Shield, Printer,
  DollarSign, HeadphonesIcon, CheckCircle, Award, Package, Palette,
  Sparkles, Target, Mail, Phone, MapPin, Star
} from "lucide-react";

import logo from "@/assets/logo-hofpack.png";
import heroImg from "@/assets/hero-packaging-new.jpg";
import aboutFactory from "@/assets/about-factory.jpg";
import aboutTeam from "@/assets/about-team.jpg";
import ecoPackaging from "@/assets/eco-packaging.jpg";
import processDesign from "@/assets/process-design.jpg";
import processProduction from "@/assets/process-production.jpg";
import processDelivery from "@/assets/process-delivery.jpg";
import processPrototype from "@/assets/process-prototype.jpg";
import customBoxes from "@/assets/custom-boxes.jpg";
import mailerBoxes from "@/assets/mailer-boxes.jpg";
import retailPackaging from "@/assets/retail-packaging.jpg";
import productPackaging from "@/assets/product-packaging.jpg";
import badgeBbb from "@/assets/badge-bbb.png";
import badgeFsc from "@/assets/badge-fsc.png";
import badgeSsl from "@/assets/badge-ssl.png";
import logoUsps from "@/assets/logo-usps.png";
import logoFedex from "@/assets/logo-fedex.png";
import logoUps from "@/assets/logo-ups.png";
import logoDhl from "@/assets/logo-dhl.png";
import indCosmetics from "@/assets/ind-cosmetics.jpg";
import indFood from "@/assets/ind-food.jpg";
import indFashion from "@/assets/ind-fashion.jpg";
import indEcommerce from "@/assets/ind-ecommerce.jpg";
import indTech from "@/assets/ind-tech.jpg";

/* ─── Section wrapper for print page breaks ─── */
const Section = ({ children, className = "", id }: { children: React.ReactNode; className?: string; id?: string }) => (
  <section id={id} className={`section-padding print:break-before-page ${className}`}>
    <div className="container-max">{children}</div>
  </section>
);

const SectionLabel = ({ label }: { label: string }) => (
  <p className="ds-eyebrow text-accent mb-2">{label}</p>
);

/* ─── Data ─── */
const stats = [
  { value: "5,000+", label: "Happy Customers", icon: Users },
  { value: "50+", label: "Certified Facilities", icon: Factory },
  { value: "15+", label: "Countries Shipped To", icon: Globe },
  { value: "99%", label: "On Time Delivery", icon: Truck },
  { value: "A+", label: "BBB Rating", icon: Award },
  { value: "4.9/5", label: "Trust Score", icon: Star },
];

const values = [
  { icon: Leaf, title: "Planet First", desc: "Recycled materials, sustainable sourcing, and packaging that does not end up in a landfill." },
  { icon: Shield, title: "Quality Obsessed", desc: "Multi point inspection at every stage. If it is not perfect, it does not ship." },
  { icon: Printer, title: "Print That Pops", desc: "Digital and inkjet presses that deliver sharp, vibrant, color accurate results, box after box." },
  { icon: DollarSign, title: "Honest Pricing", desc: "No hidden fees. No inflated quotes. We will match any comparable price, guaranteed." },
  { icon: HeadphonesIcon, title: "Dedicated Manager", desc: "One person who knows your project, answers your calls, and makes sure things run smooth." },
  { icon: Truck, title: "Early, Not Late", desc: "We build buffer into every timeline. Your boxes show up before the deadline, not after." },
];

const products = [
  { img: customBoxes, title: "Custom Folding Cartons", desc: "SBS, kraft, and chipboard options with matte, gloss, soft touch, and spot UV finishes. Add foil stamping, embossing, or die cut windows." },
  { img: mailerBoxes, title: "Corrugated Mailer Boxes", desc: "Single, double, or triple wall options built for maximum strength. Full color printing inside and out for unboxing impact." },
  { img: retailPackaging, title: "Luxury Rigid Boxes", desc: "Magnetic closures, embossing, foil stamping, and specialty papers. Premium unboxing experiences your customers will remember." },
  { img: productPackaging, title: "Custom Inserts and Packaging", desc: "Foam, molded pulp, cardboard, and more. Designed to fit your items exactly and keep them protected during shipping." },
];

const customizationOptions = [
  { title: "Premium Materials", items: ["SBS", "Kraft", "Chipboard", "Corrugated", "Rigid Board", "Molded Pulp"] },
  { title: "Print Methods", items: ["Offset", "Digital UV", "Flexography", "Screen Printing", "Gravure"] },
  { title: "Luxury Finishes", items: ["Embossing", "Foil Stamping", "Soft Touch", "Spot UV", "Matte Lamination", "Gloss Lamination"] },
  { title: "Eco Friendly Inks", items: ["Soy Based", "Water Based", "Vegetable Based"] },
];

const industries = [
  { img: indCosmetics, title: "Cosmetics and Beauty" },
  { img: indFood, title: "Food and Beverage" },
  { img: indFashion, title: "Fashion and Apparel" },
  { img: indEcommerce, title: "Ecommerce and Retail" },
  { img: indTech, title: "Tech and Electronics" },
];

const processSteps = [
  { img: processDesign, title: "Consultation and Design", desc: "Packaging audits, strategy, cost optimization, artwork, and 3D mockups tailored to your brand." },
  { img: processPrototype, title: "Prototyping", desc: "Free 3D digital mockups for quality, functionality, and aesthetics before production begins." },
  { img: processProduction, title: "Production and QC", desc: "Managed manufacturing with multi point quality checks at every stage. Scalable from 100 to 100,000 units." },
  { img: processDelivery, title: "Delivery", desc: "Global delivery with route optimization. Standard turnaround of 8 to 12 business days." },
];

const shippingTiers = [
  { tier: "Express", timeline: "8 to 12 days", desc: "Priority production and air freight for urgent orders." },
  { tier: "Standard", timeline: "15 to 20 days", desc: "Our most popular option. Balanced speed and cost." },
  { tier: "Economy", timeline: "25 to 35 days", desc: "Sea freight for larger orders where budget matters most." },
];

const CompanyProfile = () => {
  const handleDownloadPDF = useCallback(() => {
    window.print();
  }, []);

  return (
    <Layout>
      {/* ─── COVER / HERO ─── */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden print:min-h-0 print:pb-8">
        <div className="absolute inset-0">
          <Image 
            src={heroImg} 
            alt="HOF Pack packaging" 
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/75 to-foreground/40" />
        </div>
        <div className="relative container-max px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="relative h-16 sm:h-20 w-48 mb-6 brightness-0 invert">
              <Image 
                src={logo} 
                alt="HOF Pack" 
                fill
                className="object-contain"
              />
            </div>
            <h1 className="font-display font-bold text-white [text-wrap:balance] max-w-4xl" style={{ fontSize: "clamp(26px, 4.5vw, 48px)", lineHeight: 1.12 }}>
              Your Reliable <span className="text-accent">Packaging Partner</span>
            </h1>
            <p className="mt-4 text-white/70 text-lg font-sans leading-relaxed">
              Custom packaging for brands that care about quality. Eco friendly, cruelty free, made in the USA and shipped worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-8">
              <div className="flex items-center gap-2 text-white/80 text-sm font-sans">
                <Star size={16} className="text-accent fill-accent" /> 4.9/5 Trust Score
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-sans">
                <Star size={16} className="text-accent fill-accent" /> 4.8/5 Google Reviews
              </div>
              <div className="flex items-center gap-2 text-white/80 text-sm font-sans">
                <Award size={16} className="text-accent" /> A+ BBB Rating
              </div>
            </div>

            <Button variant="cta" size="lg" className="mt-8 print:hidden" onClick={handleDownloadPDF}>
              <Download className="mr-2 h-5 w-5" />
              Download as PDF
            </Button>
          </div>
        </div>
      </section>

      {/* ─── STATS BAR ─── */}
      <section className="relative -mt-10 z-10 px-4 print:mt-4">
        <div className="container-max">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 bg-card rounded-2xl shadow-xl border border-border p-6 md:p-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10 mb-2">
                  <stat.icon size={18} className="text-accent" />
                </div>
                <p className="font-display text-xl sm:text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground font-sans mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <Section id="about">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionLabel label="Who We Are" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Where Quality Meets <span className="text-accent">Packaging</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans text-base lg:text-lg">
              HOF Pack has been helping brands look their best since 2018 with eco friendly materials, expert design help, and packaging that actually shows up on time. We combine creative design, advanced printing technology, and a global production network to deliver packaging that goes beyond expectations.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans">
              We act as an extension of your team to deliver precision, creativity, and consistency every time. From startups finding their voice to established brands scaling their image, we have helped over 5,000 businesses worldwide.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Dedicated specialists for every stage of your project",
                "Transparent pricing with no surprises",
                "Stress free packaging experience from concept to delivery",
                "Global support with a local, personal approach",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-sans">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle size={14} className="text-accent" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg aspect-auto relative h-80 lg:h-[28rem]">
              <Image 
                src={aboutTeam} 
                alt="HOF Pack team" 
                fill
                className="object-cover" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── WHY CHOOSE US ─── */}
      <Section className="bg-muted/30" id="values">
        <div className="text-center mb-14">
          <SectionLabel label="Why Choose HOF Pack" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            What Sets Us <span className="text-accent">Apart</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 mb-4">
                <v.icon size={22} className="text-accent" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground">{v.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── PRODUCTION FACILITY ─── */}
      <Section id="facility">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg h-80 lg:h-[28rem] relative">
              <Image 
                src={aboutFactory} 
                alt="HOF Pack production facility" 
                fill
                className="object-cover" 
                loading="lazy" 
              />
            </div>
          </div>
          <div>
            <SectionLabel label="Our Production Facility" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Where Your Boxes <span className="text-accent">Come to Life</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans">
              We run production in the USA and China. Same standards, same quality checks, wherever we print. Every box goes through multi point inspection before it leaves the floor.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { label: "CMYK and Digital Printing", icon: Printer },
                { label: "Multi Point QC", icon: Shield },
                { label: "8 to 12 Day Turnaround", icon: Sparkles },
                { label: "Ships Worldwide", icon: Globe },
                { label: "FSC Certified Materials", icon: Leaf },
                { label: "Scalable Production", icon: Factory },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <item.icon size={16} className="text-accent" />
                  </div>
                  <span className="text-sm font-sans font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ─── PRODUCT RANGE ─── */}
      <Section className="bg-muted/30" id="products">
        <div className="text-center mb-14">
          <SectionLabel label="Our Product Range" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Packaging Solutions for <span className="text-accent">Every Need</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">
            From folding cartons to luxury rigid boxes, we create packaging that protects your products and makes your brand stand out.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {products.map((p, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="relative h-48 w-full">
                <Image 
                  src={p.img} 
                  alt={p.title} 
                  fill
                  className="object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-6">
                <h3 className="font-display text-xl font-bold text-foreground">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CUSTOMIZATION OPTIONS ─── */}
      <Section id="customization">
        <div className="text-center mb-14">
          <SectionLabel label="Customization at Your Fingertips" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            50+ Customization <span className="text-accent">Choices</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">
            We understand packaging is an extension of your brand. That is why we offer endless customization to create something uniquely yours.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {customizationOptions.map((cat, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card">
              <h3 className="font-display text-lg font-bold text-foreground mb-4">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.items.map((item, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
                    <CheckCircle size={14} className="text-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── INDUSTRIES ─── */}
      <Section className="bg-muted/30" id="industries">
        <div className="text-center mb-14">
          <SectionLabel label="Industries We Serve" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Packaging for <span className="text-accent">Every Industry</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">
            From cosmetics to food and beverage, we make packaging that fits your industry&apos;s needs perfectly.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {industries.map((ind, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden text-center">
              <div className="relative h-32 w-full">
                <Image 
                  src={ind.img} 
                  alt={ind.title} 
                  fill
                  className="object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-4">
                <h3 className="font-display text-sm font-semibold text-foreground">{ind.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── OUR PROCESS ─── */}
      <Section id="process">
        <div className="text-center mb-14">
          <SectionLabel label="Our 360° Service Approach" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            From Concept to <span className="text-accent">Delivery</span>
          </h2>
          <p className="mt-3 text-muted-foreground font-sans max-w-2xl mx-auto">
            We do not just deliver boxes. We deliver a stress free, expertly managed process from start to finish.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, i) => (
            <div key={i} className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="relative h-40 w-full">
                <Image 
                  src={step.img} 
                  alt={step.title} 
                  fill
                  className="object-cover" 
                  loading="lazy" 
                />
              </div>
              <div className="p-5">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-accent text-accent-foreground font-display font-bold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-display text-base font-bold text-foreground">{step.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 font-sans leading-relaxed">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── SUSTAINABILITY ─── */}
      <Section className="bg-muted/30" id="sustainability">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <SectionLabel label="Sustainability Commitment" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Eco First Packaging That <span className="text-accent">Speaks for Your Brand</span>
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed font-sans">
              We believe sustainability is the future of packaging. Every material, every ink, and every process is chosen with the planet in mind.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "FSC certified and recycled materials",
                "Soy based and water based printing inks",
                "Packaging engineered to reduce material waste",
                "Energy conscious production methods",
                "100% recyclable packaging options",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-sans">
                  <span className="w-6 h-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Leaf size={14} className="text-accent" />
                  </span>
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative group">
            <div className="overflow-hidden rounded-2xl border border-border shadow-lg h-80 lg:h-[28rem] relative">
              <Image 
                src={ecoPackaging} 
                alt="Eco friendly packaging" 
                fill
                className="object-cover" 
                loading="lazy" 
              />
            </div>
          </div>
        </div>
      </Section>

      {/* ─── DELIVERY AND LOGISTICS ─── */}
      <Section id="delivery">
        <div className="text-center mb-14">
          <SectionLabel label="Swift Delivery" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Global Shipping <span className="text-accent">Solutions</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {shippingTiers.map((tier, i) => (
            <div key={i} className="p-6 rounded-2xl border border-border bg-card text-center">
              <h3 className="font-display text-lg font-bold text-foreground">{tier.tier}</h3>
              <p className="text-2xl font-display font-bold text-accent mt-2">{tier.timeline}</p>
              <p className="text-sm text-muted-foreground mt-2 font-sans">{tier.desc}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap items-center justify-center gap-8">
          <p className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-wider">Shipping Partners</p>
          {[
            { src: logoUsps, alt: "USPS" },
            { src: logoDhl, alt: "DHL" },
            { src: logoFedex, alt: "FedEx" },
            { src: logoUps, alt: "UPS" },
          ].map((p) => (
            <div key={p.alt} className="relative h-10 w-24">
              <Image 
                src={p.src} 
                alt={p.alt} 
                fill
                className="object-contain opacity-70" 
              />
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CERTIFICATIONS ─── */}
      <Section className="bg-muted/30" id="certifications">
        <div className="text-center mb-12">
          <SectionLabel label="Certifications and Trust" />
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
            Verified and <span className="text-accent">Trusted</span>
          </h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { img: badgeBbb, title: "BBB Accredited", desc: "A+ Rating from the Better Business Bureau. Real accountability, not just a logo.", rating: "A+" },
            { img: badgeFsc, title: "FSC Certified", desc: "Our materials come from responsibly managed forests. Verified, not assumed." },
            { img: badgeSsl, title: "SSL Secured", desc: "256 bit encryption on every page. Your data is safe with us." },
          ].map((cert, i) => (
            <div key={i} className="text-center p-8 rounded-2xl border border-border bg-card">
              <div className="relative h-16 w-32 mx-auto mb-4">
                <Image 
                  src={cert.img} 
                  alt={cert.title} 
                  fill
                  className="object-contain" 
                />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground">{cert.title}</h3>
              {cert.rating && (
                <span className="inline-block mt-1 px-3 py-0.5 rounded-full bg-accent/10 text-accent text-xs font-bold font-sans">{cert.rating} Rating</span>
              )}
              <p className="mt-3 text-sm text-muted-foreground font-sans leading-relaxed">{cert.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ─── CONTACT / CTA ─── */}
      <section className="bg-primary text-primary-foreground section-padding print:break-before-page">
        <div className="container-max text-center">
          <div className="relative h-16 w-48 mx-auto mb-6 brightness-0 invert">
            <Image 
              src={logo} 
              alt="HOF Pack" 
              fill
              className="object-contain"
            />
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-primary-foreground">
            Ready to Get Started?
          </h2>
          <p className="mt-3 text-primary-foreground/70 font-sans max-w-xl mx-auto">
            Get in touch with our team for a free quote and 3D mockup. No commitments, no hidden fees. Just great packaging.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm font-sans text-primary-foreground/80">
            <a href="mailto:info@hofpack.com" className="flex items-center gap-2">
              <Mail size={16} className="text-accent" /> info@hofpack.com
            </a>
            <a href="tel:+1234567890" className="flex items-center gap-2">
              <Phone size={16} className="text-accent" /> +1 (234) 567 890
            </a>
            <span className="flex items-center gap-2">
              <MapPin size={16} className="text-accent" /> USA Based, Ships Worldwide
            </span>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-primary-foreground/50 font-sans">
            <span>www.hofpack.com</span>
            <span>·</span>
            <span>© {new Date().getFullYear()} HOF Pack. All rights reserved.</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CompanyProfile;