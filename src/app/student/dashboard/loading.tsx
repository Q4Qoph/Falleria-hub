"use client";

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
import dashboardHero from "../../../../public/dashboard-hero.jpg";

// Utility for badge colors
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

export default function StudentDashboardSkeleton() {
  const metrics = [
    {
      title: "Total Applications",
      value: "—",
      icon: FileText,
      textColor: "text-primary",
    },
    {
      title: "Pending Applications",
      value: "—",
      icon: Clock,
      textColor: "text-yellow-600",
    },
    {
      title: "Successful Applications",
      value: "—",
      icon: CheckCircle2,
      textColor: "text-green-600",
    },
    {
      title: "Total Paid",
      value: "—",
      icon: DollarSign,
      textColor: "text-accent",
    },
  ];

  const placeholderApps = Array(3).fill({
    mainUniversityChoice: "Loading...",
    country: "—",
    courseName: "—",
    status: "Processing",
  });

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
            <div className="flex items-start justify-between animate-pulse">
              <div>
                <p className={`text-sm mb-2 ${metric.textColor}`}>
                  {metric.title}
                </p>
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
              </div>
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 shadow-sm ${metric.textColor}`}
              >
                <metric.icon className="w-5 h-5" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* ===== Recent Applications ===== */}
      <Card className="p-6 border-0 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Recent Applications</h2>
            <p className="text-sm text-muted-foreground mt-1">
              Track your latest submissions
            </p>
          </div>
          <Button variant="outline" className="gap-2 text-white" disabled>
            View All
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="space-y-4 animate-pulse">
          {placeholderApps.map((app, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center shadow-md">
                  <FileText className="w-6 h-6 text-white" />
                </div>

                <div>
                  <div className="w-40 h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                    <span>•</span>
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <Badge className={getStatusBadge(app.status)}>Loading...</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
