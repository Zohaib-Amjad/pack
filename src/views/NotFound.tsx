"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", pathname);
  }, [pathname]);

  return (
    <Layout>
      <section className="section-padding bg-background min-h-[60vh] flex items-center">
        <div className="container-max text-center">
          <p className="font-display text-8xl sm:text-9xl font-bold text-accent/20">404</p>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mt-4">
            Page Not Found
          </h1>
          <p className="mt-4 text-muted-foreground font-sans max-w-md mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
          </p>
          <div className="flex flex-wrap gap-3 justify-center mt-8">
            <Button variant="cta" size="lg" asChild>
              <Link href="/"> <Home size={18} /> Back to Home</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={() => window.history.back()}>
              <ArrowLeft size={18} /> Go Back
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default NotFound;