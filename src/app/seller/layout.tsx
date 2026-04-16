"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/context/AuthContext";
import { Sidebar, sellerLinks } from "@/components/layout/Sidebar";
import { PageLoader } from "@/components/common/LoadingSpinner";

export default function SellerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, isLoading, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (user?.role !== "SELLER" && user?.role !== "ADMIN") {
        router.push("/home");
      }
    }
  }, [isLoading, isAuthenticated, user, router]);

  if (isLoading) {
    return <PageLoader />;
  }

  if (!isAuthenticated || (user?.role !== "SELLER" && user?.role !== "ADMIN")) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar links={sellerLinks} title="Seller Portal" />
      <main className="pt-16 lg:pl-64 lg:pt-0">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
