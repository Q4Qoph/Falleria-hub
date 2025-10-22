"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/context/auth-context"
import apiClient from "@/lib/axios-client"
import Link from "next/link"

interface Application {
  id: string
  universityChoice: string
  submissionDate: string
  status: string
  statusColor: string
}

const statusColors: Record<string, string> = {
  "Awaiting Payment": "bg-yellow-100 text-yellow-800",
  Processing: "bg-blue-100 text-blue-800",
  "Under Review": "bg-purple-100 text-purple-800",
  "Additional Documents Required": "bg-orange-100 text-orange-800",
  "Submitted to Institution": "bg-indigo-100 text-indigo-800",
  "Awaiting Institution Decision": "bg-cyan-100 text-cyan-800",
  "Offer Received": "bg-green-100 text-green-800",
  "Application Unsuccessful": "bg-red-100 text-red-800",
  "Completed / Closed": "bg-gray-100 text-gray-800",
}

export default function StudentDashboard() {
  const { user } = useAuth()
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get("/applications/my-applications")
        const apps = response.data.applications.map((app: any) => ({
          id: app.id,
          universityChoice: app.coursePreferences?.universities?.[0] || "Not specified",
          submissionDate: new Date(app.submissionDate).toLocaleDateString(),
          status: app.status,
          statusColor: statusColors[app.status] || "bg-gray-100 text-gray-800",
        }))
        setApplications(apps)
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <div className="bg-primary text-white py-8">
        <div className="container-custom">
          <h1 className="text-3xl font-bold mb-2">Welcome, {user?.firstName}!</h1>
          <p className="text-primary-light">Track your application status and manage your profile</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-secondary text-sm mb-2">Total Applications</p>
            <p className="text-3xl font-bold text-primary">{applications.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-secondary text-sm mb-2">Under Review</p>
            <p className="text-3xl font-bold text-primary">
              {applications.filter((a) => a.status === "Under Review").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-secondary text-sm mb-2">Offers Received</p>
            <p className="text-3xl font-bold text-primary">
              {applications.filter((a) => a.status === "Offer Received").length}
            </p>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Applications</h2>
              <Link href="/student/application" className="btn-primary text-sm">
                New Application
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
              <p className="text-secondary">Loading applications...</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="p-12 text-center">
              <p className="text-secondary mb-4">You haven't submitted any applications yet.</p>
              <Link href="/student/application" className="btn-primary inline-block">
                Start Your First Application
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-neutral-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Application ID</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">University</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Submission Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr key={app.id} className="border-b border-border hover:bg-neutral-50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-secondary">{app.id.slice(0, 8)}...</td>
                      <td className="px-6 py-4 text-sm text-foreground">{app.universityChoice}</td>
                      <td className="px-6 py-4 text-sm text-secondary">{app.submissionDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${app.statusColor}`}>
                          {app.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <Link href={`/student/application/${app.id}`} className="text-primary hover:underline text-sm">
                          View Details
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Status Guide */}
        <div className="mt-12 bg-white rounded-lg shadow p-6">
          <h3 className="text-xl font-bold mb-6">Application Status Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                status: "Awaiting Payment",
                description: "Your application form has been submitted. Please complete the payment to proceed.",
              },
              {
                status: "Processing",
                description: "Payment confirmed. Your application is in our queue for initial review.",
              },
              {
                status: "Under Review",
                description: "Our team is actively reviewing your application and documents.",
              },
              {
                status: "Additional Documents Required",
                description: "We need more information. Please check your email for details.",
              },
              {
                status: "Submitted to Institution",
                description: "Your application has been sent to the university.",
              },
              {
                status: "Offer Received",
                description: "Congratulations! You have received an offer from the university.",
              },
            ].map((item, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg">
                <p className="font-semibold text-primary mb-2">{item.status}</p>
                <p className="text-sm text-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
