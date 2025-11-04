"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  GraduationCap,
  Info,
  Upload,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import apiClient from "@/lib/axios-client";
import { useState } from "react";

const fetchApplicationDetails = async (id: string) => {
  const { data } = await apiClient.get(`/applications/${id}`);
  return data;
};

export default function ApplicationDetails() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    data: app,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["application", id],
    queryFn: () => fetchApplicationDetails(id),
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiClient.post(`/documents/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["application", id] });
      setFile(null);
    },
  });

  const handleUpload = async () => {
    if (!file) return alert("Please select a document to upload.");
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      await uploadMutation.mutateAsync(formData);
      alert("Document uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-center">Loading application details...</div>
    );
  }

  if (isError || !app) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load application details.
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Accepted":
        return "bg-green-500 text-white";
      case "Awaiting Payment":
        return "bg-yellow-500 text-white";
      case "In Review":
        return "bg-blue-500 text-white";
      case "Submitted":
        return "bg-indigo-500 text-white";
      case "Additional Documents Required":
        return "bg-orange-500 text-white";
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  const personalInfo = app.personalInfo || {};
  const academicHistory = app.academicHistory || {};
  const coursePreferences = app.coursePreferences || {};

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <Link href="/student/application">
          <Button variant="ghost" className="cursor-pointer gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Applications
          </Button>
        </Link>
        <Badge className={`text-lg px-4 py-2 ${getStatusColor(app.status)}`}>
          {app.status}
        </Badge>
      </div>

      {/* ✅ Admin Notes section */}
      {app.adminNotes && (
        <Card className="p-4 bg-blue-50 border border-blue-200 rounded-md flex gap-3 items-start">
          <Info className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="font-semibold text-blue-800">Admin Notes</p>
            <p className="text-blue-700 text-sm whitespace-pre-line">
              {app.adminNotes}
            </p>
          </div>
        </Card>
      )}

      {/* ✅ Upload documents if status = "Additional Documents Required" */}
      {app.status === "Additional Documents Required" && (
        <Card className="p-6 border border-dashed border-orange-300 bg-orange-50">
          <h3 className="text-lg font-semibold mb-3 text-orange-700 flex items-center gap-2">
            <Upload className="w-5 h-5" /> Upload Additional Documents
          </h3>
          <div className="flex items-center gap-3">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="block w-full border border-border rounded-lg p-2 text-sm bg-white"
            />
            <Button
              onClick={handleUpload}
              disabled={uploading || !file}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {uploading ? "Uploading..." : "Upload"}
            </Button>
          </div>
          <p className="text-sm text-orange-700 mt-2">
            Please upload the missing or corrected documents as requested by the
            admin.
          </p>
        </Card>
      )}

      <Card className="p-8 rounded-sm shadow-none">
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Full Name</p>
            <p className="text-lg font-semibold">{personalInfo.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Date of Birth</p>
            <p className="text-lg font-semibold">
              {personalInfo.dateOfBirth
                ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Nationality</p>
            <p className="text-lg font-semibold">{personalInfo.nationality}</p>
          </div>
        </div>
      </Card>

      <Card className="p-6 rounded-sm shadow-none">
        <h3 className="text-xl font-bold mb-4">Contact Information</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">
                {personalInfo.email || "Not provided"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">
                {personalInfo.phone || "Not provided"}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 md:col-span-2">
            <MapPin className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="text-sm text-muted-foreground">Current Address</p>
              <p className="font-medium">
                {personalInfo.currentAddress || "Not provided"}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 rounded- shadow-none">
        <h3 className="text-xl font-bold mb-4">Course Preferences</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Field of Study</p>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {coursePreferences.fieldOfStudy}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">
              Preferred Country
            </p>
            <div className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {coursePreferences.preferredCountry}
              </span>
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="text-sm text-muted-foreground mb-2">
              Intended Start Date
            </p>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="font-medium">
                {coursePreferences.intendedStartDate
                  ? new Date(
                      coursePreferences.intendedStartDate
                    ).toLocaleDateString()
                  : "Not specified"}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Selected Universities
          </h4>
          <div className="space-y-3">
            {coursePreferences.preferredUniversities?.length > 0 ? (
              coursePreferences.preferredUniversities.map(
                (uni: any, idx: number) => (
                  <div key={idx} className="p-4 bg-muted rounded-lg">
                    <p className="font-semibold">{uni.universityName}</p>
                    <p className="text-sm text-muted-foreground">
                      {uni.courseName}
                    </p>
                  </div>
                )
              )
            ) : (
              <p className="text-muted-foreground">No universities selected</p>
            )}
          </div>
        </div>
      </Card>

      <Card className="p-6 shadow-none rounded-sm">
        <h3 className="text-xl font-bold mb-4">Academic History</h3>
        {academicHistory.highSchool?.schoolName ? (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">High School</p>
              <p className="font-semibold">
                {academicHistory.highSchool.schoolName}
              </p>
              <p className="text-sm text-muted-foreground">
                {academicHistory.highSchool.country} • Graduated{" "}
                {academicHistory.highSchool.graduationYear}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">No academic history provided</p>
        )}
      </Card>

      <Card className="p-6 bg-muted/50 shadow-none rounded-sm">
        <h3 className="text-xl font-bold mb-4">Application Details</h3>
        <div className="grid md:grid-cols-3 gap-6 text-sm">
          <div>
            <p className="text-muted-foreground mb-1">Application ID</p>
            <p className="font-mono font-semibold">{app.applicationId}</p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Submitted On</p>
            <p className="font-medium">
              {new Date(app.submissionDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground mb-1">Last Updated</p>
            <p className="font-medium">
              {new Date(app.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </Card>

      {(app.documents?.length > 0 || app.payments?.length > 0) && (
        <Card className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {app.documents?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Documents</h4>
                <p className="text-sm text-muted-foreground">
                  {app.documents.length} document(s) uploaded
                </p>
              </div>
            )}
            {app.payments?.length > 0 && (
              <div>
                <h4 className="font-semibold mb-3">Payments</h4>
                <p className="text-sm text-muted-foreground">
                  {app.payments.length} payment(s) recorded
                </p>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* <div className="flex gap-3 pb-8">
        <Button variant="outline" className="bg-transparent">
          Edit Application
        </Button>
        <Button>Download Summary</Button>
      </div> */}
    </div>
  );
}
