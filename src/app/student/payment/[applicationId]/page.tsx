"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, useParams } from "next/navigation"
import apiClient from "@/lib/axios-client"

export default function PaymentPage() {
  const [cardData, setCardData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const params = useParams()
  const applicationId = params.applicationId as string

  const processingFee = 299

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    try {
      await apiClient.post(`/payments`, {
        applicationId,
        amount: processingFee,
        cardData,
      })

      setSuccess(true)
      setTimeout(() => {
        router.push("/student/dashboard")
      }, 2000)
    } catch (err: any) {
      setError(err.response?.data?.message || "Payment failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center py-12 px-4">
        <div className="text-center text-white">
          <div className="text-6xl mb-4">✓</div>
          <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
          <p className="text-primary-light mb-4">Your application has been submitted and is now being processed.</p>
          <p className="text-sm text-primary-light">Redirecting to your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Payment</h1>
        <p className="text-secondary mb-8">Complete your application by paying the processing fee</p>

        {/* Fee Summary */}
        <div className="bg-neutral-50 p-4 rounded-lg mb-8">
          <div className="flex justify-between mb-2">
            <span className="text-secondary">Processing Fee:</span>
            <span className="font-bold">${processingFee}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-bold">Total:</span>
            <span className="text-xl font-bold text-primary">${processingFee}</span>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="cardholderName"
            placeholder="Cardholder Name"
            value={cardData.cardholderName}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={cardData.cardNumber}
            onChange={handleChange}
            maxLength="16"
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="expiryDate"
              placeholder="MM/YY"
              value={cardData.expiryDate}
              onChange={handleChange}
              maxLength="5"
              required
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              value={cardData.cvv}
              onChange={handleChange}
              maxLength="4"
              required
              className="px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50 py-3">
            {loading ? "Processing..." : `Pay $${processingFee}`}
          </button>
        </form>

        <p className="text-center text-secondary text-xs mt-6">Your payment information is secure and encrypted.</p>
      </div>
    </div>
  )
}
