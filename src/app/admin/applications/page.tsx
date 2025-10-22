"use client"

import { useEffect, useState } from "react"
import apiClient from "@/lib/axios-client"
import Link from "next/link"

interface Application {
  id: number
  studentName: string
  email: string
  university: string
  submissionDate: string
  status: string
}

export default function ApplicationsManagement() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await apiClient.get("/applications/all")

        // ✅ Adapt structure
        const mappedData: Application[] = response.data.data.map((app: any) => ({
          id: app.applicationId,
          studentName: app.personalInfo.fullName,
          email: app.user?.email || "N/A",
          university:
            app.coursePreferences?.preferredUniversities?.[0]?.universityName || "N/A",
          submissionDate: app.submissionDate,
          status: app.status,
        }))

        setApplications(mappedData)
      } catch (error) {
        console.error("Error fetching applications:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [])

  const filtered = applications.filter((app) => {
    const matchesSearch =
      app.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || app.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statuses = [
    "all",
    "Awaiting Payment",
    "Processing",
    "Under Review",
    "Submitted to Institution",
    "Offer Received",
  ]

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Applications Management</h1>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow border border-border p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>
                {status === "all" ? "All Statuses" : status}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-lg shadow border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-secondary">No applications found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">App ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">University</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date Submitted</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-border hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-secondary">{app.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold">{app.studentName}</td>
                    <td className="px-6 py-4 text-sm text-secondary">{app.email}</td>
                    <td className="px-6 py-4 text-sm">{app.university}</td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {new Date(app.submissionDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                        {app.status}
                      </span>
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
        )}
      </div>
    </div>
  )
}
