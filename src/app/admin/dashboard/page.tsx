"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  DollarSign,
  MessageSquare,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dashboardHero from "../../../../public/dashboard-hero.jpg";
import AdminDashboardSkeleton from "./loading";

// Utility function for status badge colors
const getStatusBadge = (status: string) => {
  const map: Record<string, string> = {
    "Awaiting Payment": "bg-yellow-400 text-white",
    Processing: "bg-blue-500 text-white",
    "Under Review": "bg-amber-500 text-white",
    "Additional Documents Required": "bg-orange-500 text-white",
    "Submitted to Institution": "bg-indigo-500 text-white",
    "Awaiting Institution Decision": "bg-purple-500 text-white",
    "Offer Received": "bg-green-600 text-white",
    "Conditional Offer": "bg-emerald-500 text-white",
    "Application Unsuccessful": "bg-red-500 text-white",
    Completed: "bg-gray-700 text-white",
  };
  return map[status] || "bg-gray-300 text-gray-700";
};

export default function AdminDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["adminDashboard"],
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/admin");
      return res.data;
    },
  });

  if (isLoading) {
    return <AdminDashboardSkeleton />;
  }

  if (isError || !stats) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  const metrics = [
    {
      title: "Applications This Month",
      value: stats.keyMetrics.totalApplicationsThisMonth || 0,
      icon: FileText,
      textColor: "text-primary",
    },
    {
      title: "Awaiting Review",
      value: stats.keyMetrics.applicationsAwaitingReview || 0,
      icon: Clock,
      textColor: "text-yellow-600",
    },
    {
      title: "Revenue This Month",
      value: `$${stats.keyMetrics.totalRevenueThisMonth || 0}`,
      icon: DollarSign,
      textColor: "text-green-600",
    },
    {
      title: "New Inquiries",
      value: stats.keyMetrics.newContactInquiries || 0,
      icon: MessageSquare,
      textColor: "text-purple-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ===== Hero Section ===== */}

      <div className="flex items-center">
        <div className="">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Monitor applications, payments, and inquiries in real-time
          </p>
        </div>
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card
            key={idx}
            className="p-6 shadow-none rounded-sm hover:shadow-sm  transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-sm mb-2 ${metric.textColor}`}>
                  {metric.title}
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {metric.value}
                </p>
              </div>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-50 shadow-sm ${metric.textColor}`}
              >
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ===== Recent Applications ===== */}
      <Card className="p-6 shadow-none hover:shadow-sm ">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Latest student submissions and their progress
            </p>
          </div>
          <Link href="/admin/applications">
            <Button variant="outline" className="gap-2">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {stats.recentApplications?.length ? (
          <div className="space-y-4">
            {stats.recentApplications.map((app: any) => (
              <div
                key={app.applicationId}
                className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center shadow-md">
                    <FileText className="w-6 h-6 text-white" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">
                      {app.studentName}
                    </h3>
                    <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <p className="text-sm">{app.country}</p>
                      <span>•</span>
                      <p className="text-sm">{app.mainUniversityChoice}</p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {app.email}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <Badge className={getStatusBadge(app.status)}>
                    {app.status}
                  </Badge>
                  <Link
                    href={`/admin/applications/${app.applicationId}`}
                    className="text-primary hover:underline text-sm font-medium"
                  >
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center text-muted-foreground">
            No recent applications found.
          </div>
        )}
      </Card>
    </div>
  );
}
