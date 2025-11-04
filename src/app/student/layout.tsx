"use client";

import { ReactNode, useEffect } from "react";
import { LayoutDashboard, FileText, CreditCard, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useAuth } from "@/context/auth-context";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isAuthenticated, isLoading: loading, user, logout } = useAuth();

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!isAuthenticated || user?.role !== "student")) {
      router.push("/login");
    }
  }, [isAuthenticated, loading, user, router]);

  const navigation = [
    { name: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { name: "Applications", href: "/student/application", icon: FileText },
    { name: "Payments", href: "/student/payment", icon: CreditCard },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* ===== SIDEBAR ===== */}
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
          shadow-sm
          border-r 
          border-gray-200
        "
      >
        {/* Logo Section */}
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

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive =
              pathname === item.href || pathname.startsWith(item.href + "/");

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                  "hover:bg-gray-100"
                )}
                style={{
                  backgroundColor: isActive ? "#E8E6FF" : "transparent",
                  color: isActive ? "#1A0BF4" : "#111827",
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <div className="px-4 py-3 rounded-lg bg-gray-100">
            <p className="text-xs font-medium text-gray-600">Student Portal</p>
            <p className="text-sm font-bold mt-1">Welcome Back!</p>
          </div>

          {/* 🔹 Logout Button */}
          {/* 🔹 Logout Button */}
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
          overflow-y-auto 
          h-screen 
          bg-gray-50
        "
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
