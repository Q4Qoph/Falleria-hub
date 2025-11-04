"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  BookOpen,
  GraduationCap,
  Upload,
  ArrowDownToLine,
  CheckCircle2,
  Circle,
  AlertCircle,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import apiClient from "@/lib/axios-client";
import { useState } from "react";
import { format } from "date-fns";
import StatusTimeline from "@/app/student/application/(components)/StatusTimeline";

const fetchApplicationDetails = async (id: string) => {
  const { data } = await apiClient.get(`/applications/${id}`);
  return data;
};

const statuses = [
  // "Awaiting Payment",
  "Processing",
  "Under Review",
  "Additional Documents Required",
  "Submitted to Institution",
  "Awaiting Institution Decision",
  "Offer Received",
  "Application Unsuccessful",
  "Completed / Closed",
];

// Reusable Status Badge Color
const getStatusColor = (status: string) => {
  const colors: Record<string, string> = {
    "Awaiting Payment": "bg-yellow-500 text-white",
    Processing: "bg-primary text-white",
    "Under Review": "bg-blue-500 text-white",
    "Additional Documents Required": "bg-orange-500 text-white",
    "Submitted to  to Institution": "bg-indigo-500 text-white",
    "Awaiting Institution Decision": "bg-cyan-500 text-white",
    "Offer Received": "bg-green-500 text-white",
    "Application Unsuccessful": "bg-red-500 text-white",
    "Completed / Closed": "bg-gray-500 text-white",
  };
  return colors[status] || "bg-gray-300 text-gray-800";
};

export default function AdminApplicationDetails() {
  const params = useParams();
  const id = params.id as string;
  const queryClient = useQueryClient();

  const [newStatus, setNewStatus] = useState("");
  const [notes, setNotes] = useState(""); // Not preloaded
  const [uploading, setUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const {
    data: app,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["admin-application", id],
    queryFn: () => fetchApplicationDetails(id),
  });

  const updateMutation = useMutation({
    mutationFn: async () => {
      return apiClient.patch(`/applications/${id}/status`, {
        status: newStatus,
        adminNotes: notes,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-application", id] });
      setNotes(""); // Clear after submit
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return apiClient.post(`/documents/${id}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-application", id] });
      setFile(null);
    },
  });

  const handleStatusUpdate = async () => {
    if (!newStatus || newStatus === app?.status) return;
    try {
      await updateMutation.mutateAsync();
      alert("Status updated successfully!");
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  // Set initial status once data loads
  if (app && !newStatus) {
    setNewStatus(app.status);
  }

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
        <Link href="/admin/applications">
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
        {/* LEFT: Timeline + Actions */}
        <div className="lg:col-span-1 space-y-6">
          {/* Status Timeline */}
          <StatusTimeline
            history={app.statusHistory}
            currentStatus={app.status}
          />

          {/* Admin Status Update */}
          <Card className="p-5">
            <h3 className="font-semibold text-lg mb-4">Update Status</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">New Status</label>
                <Select value={newStatus} onValueChange={setNewStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add  notes..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button
                onClick={handleStatusUpdate}
                disabled={updateMutation.isPending || newStatus === app.status}
                className="w-full"
              >
                {updateMutation.isPending ? "Updating..." : "Update Status"}
              </Button>
            </div>
          </Card>
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
              Preferred Universities
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

          {/* Uploaded Documents - Viewable */}
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
                      {/* Image Preview */}
                      {doc.mimeType.startsWith("image/") ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <img
                            src={doc.fileUrl}
                            alt={doc.fileName}
                            className="w-12 h-12 object-cover rounded border cursor-pointer hover:opacity-80"
                          />
                        </a>
                      ) : doc.mimeType === "application/pdf" ? (
                        <a
                          href={doc.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="w-12 h-12 bg-red-100 border-2 border-dashed rounded flex items-center justify-center">
                            <span className="text-xs font-bold text-red-600">
                              PDF
                            </span>
                          </div>
                        </a>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 border-2 border-dashed rounded flex items-center justify-center">
                          <Upload className="w-5 h-5 text-gray-500" />
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-sm">{doc.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(
                            new Date(doc.createdAt),
                            "MMM d, yyyy 'at' h:mm a"
                          )}
                        </p>
                      </div>
                    </div>

                    {/* Open in New Tab */}
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
