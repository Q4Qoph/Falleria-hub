"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import apiClient from "@/lib/axios-client"
import Link from "next/link"

interface ApplicationDetail {
  id: string
  status: string
  submissionDate: string
  personalInfo: any
  academicHistory: any
  coursePreferences: any
  documents: any[]
  adminNotes: string
}

export default function ApplicationDetail() {
  const params = useParams()
  const applicationId = params.id as string
  const [application, setApplication] = useState<ApplicationDetail | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const response = await apiClient.get(`/applications/${applicationId}`)
        setApplication(response.data.application)
      } catch (error) {
        console.error("Error fetching application:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplication()
  }, [applicationId])

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-secondary">Loading application details...</p>
        </div>
      </div>
    )
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-secondary mb-4">Application not found</p>
          <Link href="/student/dashboard" className="btn-primary inline-block">
            Back to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-neutral-50 py-12">
      <div className="container-custom max-w-3xl">
        <Link href="/student/dashboard" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Dashboard
        </Link>

        <div className="bg-white rounded-lg shadow-lg p-8">
          {/* Header */}
          <div className="mb-8 pb-8 border-b border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Application Details</h1>
                <p className="text-secondary">ID: {application.id}</p>
              </div>
              <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full font-semibold">
                {application.status}
              </span>
            </div>
            <p className="text-secondary">Submitted: {new Date(application.submissionDate).toLocaleDateString()}</p>
          </div>

          {/* Personal Information */}
          <div className="mb-8">
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
                <p className="font-semibold">{application.personalInfo?.address}</p>
              </div>
            </div>
          </div>

          {/* Academic History */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="text-2xl font-bold mb-4 text-primary">Academic History</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3">High School</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-secondary text-sm">School Name</p>
                    <p className="font-semibold">{application.academicHistory?.highSchool?.schoolName}</p>
                  </div>
                  <div>
                    <p className="text-secondary text-sm">Country</p>
                    <p className="font-semibold">{application.academicHistory?.highSchool?.country}</p>
                  </div>
                  <div>
                    <p className="text-secondary text-sm">Graduation Year</p>
                    <p className="font-semibold">{application.academicHistory?.highSchool?.graduationYear}</p>
                  </div>
                  <div>
                    <p className="text-secondary text-sm">GPA</p>
                    <p className="font-semibold">{application.academicHistory?.highSchool?.gpa}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Course Preferences */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="text-2xl font-bold mb-4 text-primary">Course Preferences</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-secondary text-sm">Field of Study</p>
                <p className="font-semibold">{application.coursePreferences?.fieldOfStudy}</p>
              </div>
              <div>
                <p className="text-secondary text-sm">Preferred Country</p>
                <p className="font-semibold">{application.coursePreferences?.preferredCountry}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-secondary text-sm">Preferred Universities</p>
                <p className="font-semibold">
                  {application.coursePreferences?.universities?.filter((u: string) => u).join(", ")}
                </p>
              </div>
              <div>
                <p className="text-secondary text-sm">Intended Start Date</p>
                <p className="font-semibold">{application.coursePreferences?.startDate}</p>
              </div>
            </div>
          </div>

          {/* Documents */}
          <div className="mb-8 pb-8 border-b border-border">
            <h2 className="text-2xl font-bold mb-4 text-primary">Uploaded Documents</h2>
            {application.documents && application.documents.length > 0 ? (
              <div className="space-y-2">
                {application.documents.map((doc: any, idx: number) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                    <span className="font-semibold">{doc.documentType}</span>
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
              <p className="text-secondary">No documents uploaded yet</p>
            )}
          </div>

          {/* Admin Notes */}
          {application.adminNotes && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Admin Notes</h3>
              <p className="text-blue-800">{application.adminNotes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
