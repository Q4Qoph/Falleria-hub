"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import apiClient from "@/lib/axios-client"
import Link from "next/link"

interface ApplicationDetail {
  id: number
  studentName: string
  email: string
  status: string
  submissionDate: string
  personalInfo: any
  academicHistory: any
  coursePreferences: any
  documents: any[]
  adminNotes: string | null
}

const statuses = [
  "Awaiting Payment",
  "Processing",
  "Under Review",
  "Additional Documents Required",
  "Submitted to Institution",
  "Awaiting Institution Decision",
  "Offer Received",
  "Application Unsuccessful",
  "Completed / Closed",
]

export default function ApplicationDetail() {
  const params = useParams()
  const applicationId = params.id as string
  const [application, setApplication] = useState<ApplicationDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [newStatus, setNewStatus] = useState("")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await apiClient.get(`/applications/${applicationId}`)
        const app = response.data

        // ✅ Map structure to your component’s expected shape
        const mapped: ApplicationDetail = {
          id: app.applicationId,
          studentName: app.personalInfo?.fullName || "N/A",
          email: app.user?.email || "N/A",
          status: app.status,
          submissionDate: app.submissionDate,
          personalInfo: app.personalInfo,
          academicHistory: app.academicHistory,
          coursePreferences: app.coursePreferences,
          documents: app.documents || [],
          adminNotes: app.adminNotes,
        }

        setApplication(mapped)
        setNewStatus(app.status)
        setNotes(app.adminNotes || "")
      } catch (error) {
        console.error("Error fetching application:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [applicationId])

  const handleStatusUpdate = async () => {
    setUpdating(true)
    try {
      await apiClient.patch(`/applications/${applicationId}/status`, {
        status: newStatus,
        adminNotes: notes,
      })

      setApplication((prev) =>
        prev ? { ...prev, status: newStatus, adminNotes: notes } : null,
      )

      alert("Application updated successfully!")
    } catch (error) {
      console.error("Error updating application:", error)
      alert("Failed to update application")
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading application...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="p-8">
        <p className="text-secondary mb-4">Application not found</p>
        <Link href="/admin/applications" className="btn-primary inline-block">
          Back to Applications
        </Link>
      </div>
    )
  }

  return (
    <div className="p-8">
      <Link href="/admin/applications" className="text-primary hover:underline mb-6 inline-block">
        ← Back to Applications
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* MAIN CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header */}
          <div className="bg-white rounded-lg shadow border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold mb-2">{application.studentName}</h1>
                <p className="text-secondary">{application.email}</p>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                {application.status}
              </span>
            </div>
            <p className="text-secondary text-sm">
              Submitted: {new Date(application.submissionDate).toLocaleDateString()}
            </p>
          </div>

          {/* Personal Info */}
          <div className="bg-white rounded-lg shadow border border-border p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-secondary text-sm">Full Name</p>
                <p className="font-semibold">{application.personalInfo?.fullName}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Date of Birth</p>
                <p className="font-semibold">{application.personalInfo?.dateOfBirth}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Nationality</p>
                <p className="font-semibold">{application.personalInfo?.nationality}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Passport Number</p>
                <p className="font-semibold">{application.personalInfo?.passportNumber}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Phone</p>
                <p className="font-semibold">{application.personalInfo?.phone}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Address</p>
                <p className="font-semibold">{application.personalInfo?.currentAddress}</p>
              </div>
            </div>
          </div>

          {/* Academic History */}
          <div className="bg-white rounded-lg shadow border border-border p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Academic History</h2>

            <div className="space-y-4">
              {application.academicHistory?.highSchool && (
                <div>
                  <h3 className="font-semibold mb-2">High School</h3>
                  <p className="text-sm text-secondary">
                    {application.academicHistory.highSchool.schoolName} (
                    {application.academicHistory.highSchool.country}) — GPA:{" "}
                    {application.academicHistory.highSchool.gpa}
                  </p>
                </div>
              )}

              {Array.isArray(application.academicHistory?.higherEducation) &&
                application.academicHistory.higherEducation.map((edu: any, i: number) => (
                  <div key={i}>
                    <h3 className="font-semibold mb-2">Higher Education</h3>
                    <p className="text-sm text-secondary">
                      {edu.degree} from {edu.universityName} (Graduated {edu.graduationYear}) — GPA:{" "}
                      {edu.gpa}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          {/* Course Preferences */}
          <div className="bg-white rounded-lg shadow border border-border p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Course Preferences</h2>
            <div className="space-y-2">
              <p>
                <span className="font-semibold">Field of Study:</span>{" "}
                {application.coursePreferences?.fieldOfStudy}
              </p>
              <p>
                <span className="font-semibold">Preferred Country:</span>{" "}
                {application.coursePreferences?.preferredCountry}
              </p>
              <p>
                <span className="font-semibold">Preferred Universities:</span>{" "}
                {application.coursePreferences?.preferredUniversities
                  ?.map((u: any) => `${u.universityName} (${u.courseName})`)
                  .join(", ")}
              </p>
              <p>
                <span className="font-semibold">Intended Start Date:</span>{" "}
                {new Date(application.coursePreferences?.intendedStartDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Documents */}
          <div className="bg-white rounded-lg shadow border border-border p-6">
            <h2 className="text-2xl font-bold mb-4 text-primary">Documents</h2>
            {application.documents?.length > 0 ? (
              <div className="space-y-2">
                {application.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
                  >
                    <span className="font-semibold capitalize">{doc.documentType}</span>
                    <a
                      href={doc.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      Download
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-secondary">No documents uploaded</p>
            )}
          </div>
        </div>

        {/* SIDEBAR - Status Update */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow border border-border p-6 sticky top-8">
            <h3 className="text-xl font-bold mb-4">Update Status</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">New Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Admin Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this application..."
                  rows={6}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                onClick={handleStatusUpdate}
                disabled={updating}
                className="w-full btn-primary disabled:opacity-50"
              >
                {updating ? "Updating..." : "Update Application"}
              </button>
            </div>

            {application.adminNotes && (
              <div className="mt-6 pt-6 border-t border-border">
                <h4 className="font-semibold mb-2">Current Notes</h4>
                <p className="text-sm text-secondary bg-neutral-50 p-3 rounded-lg">
                  {application.adminNotes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
