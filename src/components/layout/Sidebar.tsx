"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/context/AuthContext";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarLink {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
}

export function Sidebar({ links, title }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              collapsed && !mobile && "justify-center px-2"
            )}
          >
            <link.icon className="size-5 shrink-0" />
            {(!collapsed || mobile) && <span>{link.label}</span>}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <div className="fixed left-0 top-0 z-40 flex h-16 w-full items-center border-b bg-background px-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64">
            <SheetHeader>
              <SheetTitle>{title}</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <NavLinks mobile />
            </div>
            <div className="absolute bottom-6 left-6 right-6">
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive"
                onClick={logout}
              >
                <LogOut className="mr-2 size-5" />
                Logout
              </Button>
            </div>
          </SheetContent>
        </Sheet>
        <span className="ml-4 font-semibold">{title}</span>
      </div>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-30 hidden h-screen border-r bg-card transition-all duration-300 lg:block",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={cn(
              "flex h-16 items-center border-b px-4",
              collapsed ? "justify-center" : "justify-between"
            )}
          >
            {!collapsed && (
              <Link href="/" className="flex items-center gap-2">
                <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
                  <span className="text-sm font-bold text-background">S</span>
                </div>
                <span className="font-bold">{title}</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className={collapsed ? "" : ""}
            >
              <ChevronLeft
                className={cn(
                  "size-5 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </Button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 overflow-auto p-4">
            <NavLinks />
          </div>

          {/* Footer */}
          <div className="border-t p-4">
            <Button
              variant="ghost"
              className={cn(
                "w-full text-destructive hover:text-destructive",
                collapsed ? "justify-center px-2" : "justify-start"
              )}
              onClick={logout}
            >
              <LogOut className="size-5" />
              {!collapsed && <span className="ml-2">Logout</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}

export const sellerLinks: SidebarLink[] = [
  { href: "/seller/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/seller/products", label: "Products", icon: Package },
  { href: "/seller/orders", label: "Orders", icon: ShoppingCart },
  { href: "/seller/settings", label: "Settings", icon: Settings },
];

export const adminLinks: SidebarLink[] = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
