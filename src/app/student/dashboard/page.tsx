"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import dashboardHero from "../../../../public/dashboard-hero.jpg";
import StudentDashboardSkeleton from "./loading";

// Utility function for status badge colors
const getStatusBadge = (status: string) => {
  const map: Record<string, string> = {
    Processing: "bg-blue-500 text-white",
    Pending: "bg-yellow-400 text-white",
    Accepted: "bg-green-600 text-white",
    Rejected: "bg-red-500 text-white",
    Completed: "bg-gray-700 text-white",
  };
  return map[status] || "bg-gray-300 text-gray-700";
};

export default function StudentDashboard() {
  const {
    data: stats,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentDashboard"],
    queryFn: async () => {
      const res = await apiClient.get("/dashboard/student");
      return res.data;
    },
  });

  if (isLoading) {
    return <StudentDashboardSkeleton />;
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
      title: "Total Applications",
      value: stats.summary.totalApplications || 0,
      icon: FileText,
      textColor: "text-primary",
    },
    {
      title: "Pending Applications",
      value: stats.summary.pendingApplications || 0,
      icon: Clock,
      textColor: "text-yellow-600",
    },
    {
      title: "Successful Applications",
      value: stats.summary.successfulApplications || 0,
      icon: CheckCircle2,
      textColor: "text-green-600",
    },
    {
      title: "Total Paid",
      value: `$${stats.summary.totalPaid || 0}`,
      icon: DollarSign,
      textColor: "text-secondary-100",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ===== Hero Section ===== */}
      <div className="flex items-center">
        <div className="">
          <h1 className="text-4xl font-bold mb-2">Student Dashboard</h1>
          <p className="text-lg text-muted-foreground ">
            Track your applications and payments in real-time
          </p>
        </div>
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, idx) => (
          <Card
            key={idx}
            className="p-6 shadow-md border-0 hover:shadow-lg transition-all duration-300"
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
      <Card className="p-6  shadow-none rounded-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track your latest submissions
            </p>
          </div>
          <Link href="/student/application">
            <Button variant="outline" className="gap-2 text-">
              View All
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {stats.applications?.length ? (
          <div className="space-y-4">
            {stats.applications.map((app: any) => (
              <Link
                key={app.applicationId}
                href={`/student/application/${app.applicationId}`}
              >
                <div
                  key={app.applicationId}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#1A0BF4] flex items-center justify-center shadow-md">
                      <FileText className="w-6 h-6 text-white" />
                    </div>

                    <div>
                      <h3 className="font-semibold text-foreground">
                        {app.mainUniversityChoice}
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                        <MapPin className="w-3 h-3" />
                        <p className="text-sm">{app.country}</p>
                        <span>•</span>
                        <p className="text-sm">{app.courseName}</p>
                      </div>
                    </div>
                  </div>

                  <Badge className={getStatusBadge(app.status)}>
                    {app.status}
                  </Badge>
                </div>
              </Link>
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
