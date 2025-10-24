"use client";

import { useEffect, useState } from "react";
import apiClient from "@/lib/axios-client";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  MapPin,
  Calendar,
  ArrowRight,
  Filter,
  Search,
} from "lucide-react";
import ApplicationsSkeleton from "../../student/application/loading";
import AdminApplicationsSkeleton from "./loading";

interface Application {
  id: number;
  studentName: string;
  email: string;
  university: string;
  country: string;
  submissionDate: string;
  status: string;
  courseLevel?: string;
}

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

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get("/applications/all");
        const mappedData: Application[] = response.data.data.map(
          (app: any) => ({
            id: app.applicationId,
            studentName: app.personalInfo.fullName,
            email: app.user?.email || "N/A",
            university:
              app.coursePreferences?.preferredUniversities?.[0]
                ?.universityName || "N/A",
            country:
              app.personalInfo?.country ||
              app.coursePreferences?.preferredCountry ||
              "N/A",
            submissionDate: app.submissionDate,
            status: app.status,
            courseLevel: app.coursePreferences?.courseLevel || "N/A",
          })
        );
        setApplications(mappedData);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  const statuses = [
    "all",
    "Awaiting Payment",
    "Processing",
    "Under Review",
    "Additional Documents Required",
    "Submitted to Institution",
    "Awaiting Institution Decision",
    "Offer Received",
    "Conditional Offer",
    "Application Unsuccessful",
    "Completed",
  ];

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.university.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Applications Management</h1>
          <p className="text-lg text-muted-foreground">
            Manage and review all student applications
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-primary">{filtered.length}</p>
          <p className="text-sm text-muted-foreground">Total Applications</p>
        </div>
      </div>

      {/* Filters Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, email, or university..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white shadow-sm transition-all"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full pl-11 pr-10 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none bg-white shadow-sm cursor-pointer transition-all"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 0.75rem center",
              backgroundSize: "1.25rem",
            }}
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications List */}
      {loading ? (
        <AdminApplicationsSkeleton />
      ) : filtered.length === 0 ? (
        <div className="p-12 text-center text-muted-foreground">
          No applications found matching your criteria.
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((app) => (
            <div
              key={app.id}
              className="flex items-center justify-between p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200"
            >
              {/* Left: Icon + Info */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#3aacde] shadow-md">
                  <FileText className="w-6 h-6 text-white " />
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">
                    {app.studentName}
                  </h3>
                  <div className="flex items-center gap-2 mt-1 text-muted-foreground">
                    <MapPin className="w-3 h-3" />
                    <p className="text-sm">{app.country}</p>
                    <span>•</span>
                    <p className="text-sm">{app.university}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-xs text-muted-foreground">{app.email}</p>
                    {app.courseLevel && app.courseLevel !== "N/A" && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <p className="text-xs text-muted-foreground">
                          {app.courseLevel}
                        </p>
                      </>
                    )}
                    <span className="text-xs text-muted-foreground">•</span>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <p className="text-xs">
                        {new Date(app.submissionDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Badge + Link */}
              <div className="flex flex-col items-end gap-2">
                <Badge className={getStatusBadge(app.status)}>
                  {app.status}
                </Badge>
                <Link
                  href={`/admin/applications/${app.id}`}
                  className="text-primary hover:underline text-sm font-medium flex items-center gap-1"
                >
                  Review
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
