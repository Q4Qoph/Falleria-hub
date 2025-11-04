"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  FileText,
  MapPin,
  Calendar,
  GraduationCap,
  ChevronRight,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import ApplicationForm from "./new/page";
import apiClient from "@/lib/axios-client";
import ApplicationsSkeleton from "./loading";
import Link from "next/link";

// 🔹 Fetch function
const fetchApplications = async () => {
  const { data } = await apiClient.get("/applications/student");
  return data;
};

const Applications = () => {
  const [open, setOpen] = useState(false);

  // 🔹 React Query call
  const {
    data: applications,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["studentApplications"],
    queryFn: fetchApplications,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Application created successfully!");
    setOpen(false);
  };

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
      default:
        return "bg-gray-300 text-gray-800";
    }
  };

  if (isLoading) {
    return <ApplicationsSkeleton />;
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load applications.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold mb-2">Applications</h1>
          <p className="text-muted-foreground">
            Manage and track all your university applications
          </p>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Application
            </Button>
          </DialogTrigger>

          <DialogContent
            className="
              w-full 
              max-w-4xl       
              sm:max-w-2xl      
              md:max-w-3xl      
              lg:max-w-4xl       
              max-h-[85vh] 
              overflow-y-auto 
              p-8 
              rounded-2xl 
              shadow-xl 
              bg-white
            "
          >
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-semibold">
                Submit New Application
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Start a new university application. Fill in the details below.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <ApplicationForm />
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-4">
        {applications && applications.length > 0 ? (
          applications?.map((app: any) => (
            <Link
              key={app.applicationId}
              href={`/student/application/${app.applicationId}`}
            >
              <Card className="p-6 hover:shadow-sm shadow-none rounded-sm transition-all duration-300 cursor-pointer hover:bg-muted/50">
                <div className="flex items-center justify-between">
                  {/* Left Content */}
                  <div className="flex-1">
                    {/* Student Name & University */}
                    <div className="mb-3">
                      {/* <h3 className="font-semibold text-sm text-muted-foreground">
                        {app.personalInfo?.fullName || "Unnamed Applicant"}
                      </h3> */}
                      <h2 className="text-xl font-bold text-foreground">
                        {app.coursePreferences?.preferredUniversities?.[0]
                          ?.universityName || "Unnamed University"}
                      </h2>
                    </div>

                    {/* Course Name */}
                    <p className="text-sm text-foreground mb-4">
                      {app.coursePreferences?.preferredUniversities?.[0]
                        ?.courseName || "Course not specified"}
                    </p>

                    {/* Quick Info Row */}
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{app.coursePreferences?.preferredCountry}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-muted-foreground" />
                        <span>{app.coursePreferences?.fieldOfStudy}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(app.submissionDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Status & Arrow */}
                  <div className="flex items-center gap-4 ml-6">
                    <Badge className={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </div>
              </Card>
            </Link>
          ))
        ) : (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg font-medium">No applications found.</p>
            <p className="mt-2 text-sm">
              You haven't submitted any applications yet. Click the button above
              to start one.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
