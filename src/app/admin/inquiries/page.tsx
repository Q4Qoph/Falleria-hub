"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "@/lib/axios-client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Archive, CheckCircle2 } from "lucide-react";

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  dateReceived: string;
  isRead: boolean;
  isArchived: boolean;
}

export default function InquiriesPage() {
  const queryClient = useQueryClient();

  // Fetch inquiries with React Query
  const { data: inquiries = [], isLoading } = useQuery<Inquiry[]>({
    queryKey: ["inquiries"],
    queryFn: async () => {
      const response = await apiClient.get("/inquiries");
      return response.data.map((inq: any) => ({
        id: inq.inquiryId.toString(),
        name: inq.name,
        email: inq.email,
        phone: inq.phone,
        subject: inq.subject,
        message: inq.message,
        dateReceived: inq.dateReceived,
        isRead: inq.isRead,
        isArchived: inq.isArchived,
      }));
    },
  });

  // Mark as read mutation
  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.patch(`/inquiries/${id}/read`, { isRead: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });

  // Archive mutation
  const archiveMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiClient.put(`/admin/inquiries/${id}`, { isArchived: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inquiries"] });
    },
  });

  const unreadCount = inquiries.filter((i) => !i.isRead).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Contact Inquiries</h1>
          <p className="text-muted-foreground mt-1">
            Manage and respond to student messages
          </p>
        </div>
        {unreadCount > 0 && (
          <span className="px-4 py-2 bg-red-100 text-red-700 rounded-full font-semibold text-sm">
            {unreadCount} Unread
          </span>
        )}
      </div>

      {/* Inquiries List */}
      {isLoading ? (
        <div className="text-center py-16">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading inquiries...</p>
        </div>
      ) : inquiries.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Mail className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          No inquiries found
        </div>
      ) : (
        <div className="space-y-4">
          {inquiries
            .filter((inq) => !inq.isArchived)
            .map((inquiry) => (
              <Card
                key={inquiry.id}
                className={`p-6 border transition-all duration-200 hover:shadow-lg ${
                  !inquiry.isRead
                    ? "border-l-4 border-l-primary bg-white"
                    : "bg-gray-50"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {inquiry.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {inquiry.email} • {inquiry.phone}
                    </p>
                    <p className="text-sm text-gray-400 mt-1">
                      {new Date(inquiry.dateReceived).toLocaleString()}
                    </p>
                  </div>
                  {!inquiry.isRead && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                      Unread
                    </span>
                  )}
                </div>

                <div className="mb-4">
                  <p className="font-semibold">{inquiry.subject}</p>
                  <p className="text-sm text-gray-700 mt-1">{inquiry.message}</p>
                </div>

                <div className="flex gap-3">
                  {!inquiry.isRead && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => markAsReadMutation.mutate(inquiry.id)}
                      disabled={markAsReadMutation.isPending}
                      className="flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Mark as Read
                    </Button>
                  )}
                </div>
              </Card>
            ))}
        </div>
      )}
    </div>
  );
}
