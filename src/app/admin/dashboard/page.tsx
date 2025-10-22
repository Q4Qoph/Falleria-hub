"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/axios-client";
import Link from "next/link";

interface DashboardStats {
  totalApplicationsThisMonth: number;
  applicationsAwaitingReview: number;
  totalRevenueThisMonth: number;
  newContactInquiries: number;
  recentApplications: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await apiClient.get("/dashboard/admin");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: "Applications This Month",
            value: stats?.totalApplicationsThisMonth || 0,
            icon: "📋",
            color: "bg-blue-50",
          },
          {
            label: "Awaiting Review",
            value: stats?.applicationsAwaitingReview || 0,
            icon: "⏳",
            color: "bg-yellow-50",
          },
          {
            label: "Revenue This Month",
            value: `$${stats?.totalRevenueThisMonth || 0}`,
            icon: "💰",
            color: "bg-green-50",
          },
          {
            label: "New Inquiries",
            value: stats?.newContactInquiries || 0,
            icon: "💬",
            color: "bg-purple-50",
          },
        ].map((metric, idx) => (
          <div
            key={idx}
            className={`${metric.color} p-6 rounded-lg border border-border`}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-secondary text-sm mb-2">{metric.label}</p>
                <p className="text-3xl font-bold text-foreground">
                  {metric.value}
                </p>
              </div>
              <span className="text-3xl">{metric.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Applications */}
      <div className="bg-white rounded-lg shadow border border-border">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold">Recent Applications</h2>
          <Link
            href="/admin/applications"
            className="text-primary hover:underline text-sm"
          >
            View All
          </Link>
        </div>

        {stats?.recentApplications && stats.recentApplications.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Student Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    University
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {stats.recentApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-border hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-semibold">
                      {app.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 text-sm">{app.university}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="text-primary hover:underline text-sm"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-12 text-center text-secondary">
            No recent applications
          </div>
        )}
      </div>
    </div>
  );
}
