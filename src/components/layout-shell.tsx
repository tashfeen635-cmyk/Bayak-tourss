"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/back-to-top";
import { SocialBar } from "@/components/social-bar";

export function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const isPortfolio = pathname.startsWith("/tashfeenbinriaz");

  return (
    <>
      {!isAdmin && !isPortfolio && <Navbar />}
      <main className="flex-1">{children}</main>
      {!isAdmin && !isPortfolio && <Footer />}
      {!isAdmin && !isPortfolio && <BackToTop />}
      {!isAdmin && !isPortfolio && <SocialBar />}
    </>
  );
}
