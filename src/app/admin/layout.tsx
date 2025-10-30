"use client";

import { ReactNode, useEffect } from "react";
import { useAuth } from "@/context/auth-context";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  MessageSquare,
  LogOut,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { isAuthenticated, isLoading: loading, user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "admin")) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, user, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.role !== "admin") {
    return null;
  }

  const handleLogout = () => {
    logout();
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/admin/applications", icon: FileText },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-900">
      {/* ===== FIXED SIDEBAR ===== */}
      <aside
        className="
          fixed 
          left-0 
          top-0 
          h-screen 
          w-64 
          flex 
          flex-col 
          bg-white 
          border-r 
          border-gray-200 
          shadow-lg
        "
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg overflow-hidden flex items-center justify-center">
              <Image
                src="/logo.png"
                alt=""
                width={70}
                height={70}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="font-bold text-lg">FALLERIA </h2>
              <p className="text-sm text-gray-500">Hub International</p>
            </div>
          </div>
        </div>
        {/* Logo / Header */}
        {/* <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold">
              G
            </div>
            <div>
              <h1 className="font-bold text-lg">Global Gateway</h1>
              <p className="text-xs text-gray-500">Admin Portal</p>
            </div>
          </div>
        </div> */}

        {/* Nav Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 hover:bg-gray-100",
                  isActive
                    ? "bg-[#0BF48E] text-white font-semibold"
                    : "text-gray-800"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-4 py-3 rounded-xl bg-gray-50">
            <p className="text-xs font-medium text-gray-500">Admin Portal</p>
            <p className="text-sm font-semibold mt-1 text-gray-800">
              {user?.firstName || "Admin"}
            </p>
          </div>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="ghost"
            className="
              w-full 
              justify-start 
              gap-2 
              text-gray-700 
              hover:text-red-600 
              hover:bg-red-50 
              transition-colors 
              font-medium
            "
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </aside>

      {/* ===== MAIN CONTENT ===== */}
      <main
        className="
          flex-1 
          ml-64 
          p-8
          h-screen 
          overflow-y-auto 
          bg-gray-50 
        "
      >
        {/* Page Content */}
        <div>{children}</div>
      </main>
    </div>
  );
}
