"use client";

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

// Mock utility for badge colors
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

export default function AdminDashboardSkeleton() {
  // Placeholder mock data
  const metrics = [
    {
      title: "Applications This Month",
      value: "—",
      icon: FileText,
      textColor: "text-primary",
    },
    {
      title: "Awaiting Review",
      value: "—",
      icon: Clock,
      textColor: "text-yellow-600",
    },
    {
      title: "Revenue This Month",
      value: "—",
      icon: DollarSign,
      textColor: "text-green-600",
    },
    {
      title: "New Inquiries",
      value: "—",
      icon: MessageSquare,
      textColor: "text-purple-600",
    },
  ];

  const placeholderApps = Array(3).fill({
    applicationId: "#",
    studentName: "Loading...",
    country: "—",
    mainUniversityChoice: "—",
    email: "—",
    status: "Processing",
  });

  return (
    <div className="space-y-8">
      {/* ===== Hero Section ===== */}
      <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={dashboardHero}
          alt="Admin Overview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-accent/70 flex items-center px-8">
          <div className="text-white">
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-lg text-white/90">
              Monitor applications, payments, and inquiries in real-time
            </p>
          </div>
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
              Latest student submissions and their progress
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
                  <div className="w-32 h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                  <div className="w-40 h-3 bg-gray-100 rounded mt-2"></div>
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
