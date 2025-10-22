"use client"

import { useEffect, useState } from "react"
import apiClient from "@/lib/axios-client"

interface Inquiry {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  dateReceived: string
  isRead: boolean
  isArchived: boolean
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const response = await apiClient.get("/inquiries")

        // Map backend data to frontend structure
        const formatted = response.data.map((inq: any) => ({
          id: inq.inquiryId.toString(),
          name: inq.name,
          email: inq.email,
          phone: inq.phone,
          subject: inq.subject,
          message: inq.message,
          dateReceived: inq.dateReceived,
          isRead: inq.isRead,
          isArchived: inq.isArchived,
        }))

        setInquiries(formatted)
      } catch (error) {
        console.error("Error fetching inquiries:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [])

  const handleMarkAsRead = async (id: string) => {
    try {
      await apiClient.put(`/admin/inquiries/${id}`, { isRead: true })
      setInquiries((prev) => prev.map((inq) => (inq.id === id ? { ...inq, isRead: true } : inq)))
    } catch (error) {
      console.error("Error updating inquiry:", error)
    }
  }

  const unreadCount = inquiries.filter((i) => !i.isRead).length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Contact Inquiries</h1>
        {unreadCount > 0 && (
          <span className="px-4 py-2 bg-red-100 text-red-800 rounded-full font-semibold">
            {unreadCount} Unread
          </span>
        )}
      </div>

      {/* Inquiries List */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading inquiries...</p>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-12 text-secondary">No inquiries found</div>
        ) : (
          inquiries.map((inquiry) => (
            <div
              key={inquiry.id}
              className={`bg-white rounded-lg shadow border border-border p-6 ${
                !inquiry.isRead ? "border-l-4 border-l-primary" : ""
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-foreground">{inquiry.name}</h3>
                  <p className="text-secondary text-sm">{inquiry.email}</p>
                  <p className="text-secondary text-sm">{inquiry.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  {!inquiry.isRead && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Unread
                    </span>
                  )}
                  <span className="text-secondary text-sm">
                    {new Date(inquiry.dateReceived).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="font-semibold mb-2">{inquiry.subject}</p>
              <p className="text-foreground mb-4">{inquiry.message}</p>

              {!inquiry.isRead && (
                <button
                  onClick={() => handleMarkAsRead(inquiry.id)}
                  className="text-primary hover:underline text-sm font-semibold"
                >
                  Mark as Read
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
