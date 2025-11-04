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
  ArrowRight,
  Circle,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowDownToLine,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import apiClient from "@/lib/axios-client";
import { useState } from "react";
import { format } from "date-fns";
import StatusTimeline from "../(components)/StatusTimeline";

const fetchApplicationDetails = async (id: string) => {
  const { data } = await apiClient.get(`/applications/${id}`);
  return data;
};

// Reusable Status Badge Color
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    Accepted: "bg-green-500 text-white",
    "Awaiting Payment": "bg-yellow-500 text-white",
    "In Review": "bg-blue-500 text-white",
    Submitted: "bg-indigo-500 text-white",
    "Additional Documents Required": "bg-orange-500 text-white",
    Processing: "bg-primary text-white",
    Rejected: "bg-red-500 text-white",
  };
  return colors[status] || "bg-gray-300 text-gray-800";
};

// Status Icon
const getStatusIcon = (status: string, isCurrent: boolean) => {
  const cls = "w-3.5 h-3.5";
  if (isCurrent) return <Circle className={`${cls} fill-current`} />;
  switch (status) {
    case "Accepted":
      return <CheckCircle2 className={cls} />;
    case "Additional Documents Required":
      return <AlertCircle className={cls} />;
    case "Awaiting Payment":
      return <Clock className={cls} />;
    default:
      return <Circle className={cls} />;
  }
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
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      await uploadMutation.mutateAsync(formData);
      alert("Document uploaded successfully!");
    } catch (err) {
      alert("Failed to upload document.");
    } finally {
      setUploading(false);
    }
  };

  const checkoutMutation = useMutation({
    mutationFn: async () => {
      const checkoutResponse = await apiClient.post("/payments/checkout", {
        appId: app.applicationId,
      });
      if (!checkoutResponse.data.url) {
        throw new Error("No checkout URL received");
      }
      return checkoutResponse.data.url;
    },
    onSuccess: (url) => {
      window.location.href = url;
    },
    onError: (err: any) => {
      alert(err?.message ?? "Failed to start payment");
    },
  });

  if (isLoading) return <div className="p-8 text-center">Loading...</div>;
  if (isError || !app)
    return <div className="p-8 text-center text-red-500">Failed to load.</div>;

  const personalInfo = app.personalInfo || {};
  const academicHistory = app.academicHistory || {};
  const coursePreferences = app.coursePreferences || {};
  const hasHistory = app.statusHistory?.length > 0;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/student/application">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </Link>
        <Badge className={`text-lg px-4 py-2 ${getStatusColor(app.status)}`}>
          {app.status}
        </Badge>
      </div>

      {/* Two-Column Layout */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <StatusTimeline
            history={app.statusHistory}
            currentStatus={app.status}
          />

          {/* Upload Section */}
          {app.status === "Additional Documents Required" && (
            <Card className="p-5 border border-dashed border-orange-300 bg-orange-50">
              <h3 className="font-semibold text-orange-700 flex items-center gap-2 mb-3">
                <Upload className="w-5 h-5" />
                Upload Documents
              </h3>
              <div className="flex gap-2">
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="flex-1 text-sm border rounded-lg p-2 bg-white"
                />
                <Button
                  onClick={handleUpload}
                  disabled={uploading || !file}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </Button>
              </div>
              <p className="text-xs text-orange-700 mt-2">
                Upload missing or corrected documents.
              </p>
            </Card>
          )}
          {app.status === "Awaiting Payment" && (
            <Card className="p-5 border border-dashed border-yellow-300 bg-yellow-50">
              <h3 className="font-semibold text-yellow-700 flex items-center gap-2 mb-3">
                <Clock className="w-5 h-5" />
                Payment Required
              </h3>
              <p className="text-sm text-yellow-700 mb-3">
                Your application is awaiting payment to proceed.
              </p>
              <Button
                onClick={() => checkoutMutation.mutate()}
                disabled={checkoutMutation.isPending}
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
              >
                {checkoutMutation.isPending ? "Preparing…" : "Pay Now"}
              </Button>
            </Card>
          )}
        </div>

        {/* RIGHT: Application Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-muted-foreground">Full Name</p>
                <p className="font-semibold">{personalInfo.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="font-semibold">
                  {personalInfo.dateOfBirth
                    ? new Date(personalInfo.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Nationality</p>
                <p className="font-semibold">{personalInfo.nationality}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Passport</p>
                <p className="font-mono">{personalInfo.passportNumber}</p>
              </div>
            </div>
          </Card>

          {/* Contact */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{app.user?.email || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{personalInfo.phone || "N/A"}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 sm:col-span-2">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="font-medium whitespace-pre-line">
                    {personalInfo.currentAddress || "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* Course Preferences */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Course Preferences</h3>
            <div className="grid sm:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Field</p>
                  <p className="font-medium">
                    {coursePreferences.fieldOfStudy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Country</p>
                  <p className="font-medium">
                    {coursePreferences.preferredCountry}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:col-span-2">
                <Calendar className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">
                    {coursePreferences.intendedStartDate
                      ? new Date(
                          coursePreferences.intendedStartDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>

            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Universities
            </h4>
            <div className="grid gap-3">
              {coursePreferences.preferredUniversities?.length > 0 ? (
                coursePreferences.preferredUniversities.map(
                  (uni: any, i: number) => (
                    <div key={i} className="p-3 bg-muted rounded-lg">
                      <p className="font-medium">{uni.universityName}</p>
                      <p className="text-sm text-muted-foreground">
                        {uni.courseName}
                      </p>
                    </div>
                  )
                )
              ) : (
                <p className="text-muted-foreground">None selected</p>
              )}
            </div>
          </Card>

          {/* Academic History */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-4">Academic History</h3>
            {academicHistory.highSchool?.schoolName ? (
              <div>
                <p className="font-semibold">
                  {academicHistory.highSchool.schoolName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {academicHistory.highSchool.country} • Graduated{" "}
                  {academicHistory.highSchool.graduationYear}
                </p>
              </div>
            ) : (
              <p className="text-muted-foreground">No history provided</p>
            )}
          </Card>

          {/* Application Meta */}
          <Card className="p-6 bg-muted/30">
            <h3 className="text-xl font-bold mb-4">Application Info</h3>
            <div className="grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">ID</p>
                <p className="font-mono font-semibold">{app.applicationId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Submitted</p>
                <p>{new Date(app.submissionDate).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Updated</p>
                <p>{new Date(app.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>
          </Card>

          {/* Uploaded Documents */}
          {app.documents?.length > 0 && (
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Upload className="w-5 h-5 text-primary" />
                Uploaded Documents
              </h3>
              <div className="space-y-3">
                {app.documents.map((doc: any) => (
                  <div
                    key={doc.documentId}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {/* Image Preview or File Icon */}
                      {doc.mimeType.startsWith("image/") ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <img
                            src={doc.fileUrl}
                            alt={doc.fileName}
                            className="w-12 h-12 object-cover rounded border"
                          />
                        </a>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 border-2 border-dashed rounded flex items-center justify-center">
                          <Upload className="w-5 h-5 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-sm">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          Uploaded{" "}
                          {format(
                            new Date(doc.createdAt),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Download Button */}
                    <Button variant="outline" size="sm" asChild>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1"
                      >
                        <ArrowDownToLine className="w-4 h-4" />
                        Open
                      </a>
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
