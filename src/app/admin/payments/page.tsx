"use client"

import { useEffect, useState } from "react"
import apiClient from "@/lib/axios-client"

interface Payment {
  id: string
  studentName: string
  amount: number
  date: string
  status: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await apiClient.get("/payments")
        // Safely handle API response
        const paymentData = Array.isArray(response.data?.payments)
          ? response.data.payments
          : []

        setPayments(paymentData)
      } catch (error) {
        console.error("Error fetching payments:", error)
        setPayments([]) // ensure defined state
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [])

  // Safely calculate total revenue
  const totalRevenue = Array.isArray(payments)
    ? payments.reduce((sum, p) => sum + (p.amount || 0), 0)
    : 0

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Payments</h1>

      {/* Summary */}
      <div className="bg-white rounded-lg shadow border border-border p-6 mb-8">
        <p className="text-secondary text-sm mb-2">Total Revenue</p>
        <p className="text-4xl font-bold text-primary">
          ${totalRevenue.toLocaleString()}
        </p>
      </div>

      {/* Payments Table */}
      <div className="bg-white rounded-lg shadow border border-border overflow-hidden">
        {loading ? (
          <div className="p-12 text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-secondary">Loading payments...</p>
          </div>
        ) : payments.length === 0 ? (
          <div className="p-12 text-center text-secondary">
            No payments found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-border">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Student Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-border hover:bg-neutral-50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-mono text-secondary">
                      {payment.id?.slice(0, 8)}...
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold">
                      {payment.studentName}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">
                      ${payment.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-secondary">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                        {payment.status}
                      </span>
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
