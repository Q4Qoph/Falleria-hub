"use client";

import { useQuery } from "@tanstack/react-query";
import apiClient from "@/lib/axios-client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle2, Clock, CreditCard } from "lucide-react";
import StatCard from "@/components/StatCard";
import PaymentsSkeleton from "./loading";

interface Application {
  applicationId: number;
  coursePreferences: {
    preferredUniversities: { universityName: string; courseName: string }[];
  };
}

interface Payment {
  paymentId: number;
  applicationId: number;
  amount: string;
  paymentGatewayTransactionId: string;
  stripeSessionId: string;
  status: "success" | "pending" | string;
  paymentDate: string;
  application: Application;
}

interface UIPayment {
  id: number;
  university: string;
  amount: number;
  type: string;
  date: string;
  status: "Completed" | "Pending";
  method: string;
}

export default function Payments() {
  // Fetch payments
  const {
    data: payments,
    isLoading,
    isError,
  } = useQuery<Payment[]>({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await apiClient.get("/payments");
      return res.data;
    },
  });

  if (isLoading) return <PaymentsSkeleton />;
  if (isError || !payments)
    return (
      <p className="p-8 text-center text-red-500">Failed to load payments.</p>
    );

  // Map API to UI-friendly type
  const paymentHistory: UIPayment[] = payments.map((p) => ({
    id: p.paymentId,
    university:
      p.application.coursePreferences.preferredUniversities?.[0]
        ?.universityName || "N/A",
    amount: parseFloat(p.amount),
    type: "Application Fee",
    date: p.paymentDate,
    status: p.status === "success" ? "Completed" : "Pending",
    method: "Stripe",
  }));

  const totalPaid = paymentHistory
    .filter((p) => p.status === "Completed")
    .reduce((sum, p) => sum + p.amount, 0);

  const totalPending = paymentHistory
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + p.amount, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground">
          Track all your application fees and transactions
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Paid"
          value={`$${totalPaid}`}
          icon={CheckCircle2}
          trend={`Across ${
            paymentHistory.filter((p) => p.status === "Completed").length
          } payments`}
          variant="success"
        />
        <StatCard
          title="Pending Payments"
          value={`$${totalPending}`}
          icon={Clock}
          trend={`${
            paymentHistory.filter((p) => p.status === "Pending").length
          } payment(s) pending`}
          variant="warning"
        />
        <StatCard
          title="Total Transactions"
          value={paymentHistory.length}
          icon={DollarSign}
          trend="All time"
          variant="accent"
        />
      </div>

      {/* Payment History */}
      <Card className="p-6 shadow-none rounded-sm">
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Payment History</h2>
          <p className="text-sm text-muted-foreground mt-1">
            View all your transaction records
          </p>
        </div>

        <div className="space-y-4">
          {paymentHistory.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-5 rounded-lg bg-secondary/50 hover:bg-secondary transition-all duration-200 animate-fade-in"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-12 h-12 rounded-lg flex items-center justify-center shadow-md ${
                    payment.status === "Completed"
                      ? "bg-green-500"
                      : "bg-yellow-400"
                  }`}
                >
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">
                    {payment.university}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm text-muted-foreground">
                      {payment.type}
                    </p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">
                      {payment.method}
                    </p>
                    <span className="text-muted-foreground">•</span>
                    <p className="text-sm text-muted-foreground">
                      {new Date(payment.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xl font-bold text-foreground">
                    ${payment.amount}
                  </p>
                  <Badge
                    className={
                      payment.status === "Completed"
                        ? "bg-green-500 text-white"
                        : "bg-yellow-400 text-white"
                    }
                  >
                    {payment.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Summary Card */}
      {/* <Card className="p-6 border-0 shadow-md gradient-accent text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white/80 text-sm font-medium mb-1">
              Total Investment
            </p>
            <p className="text-4xl font-bold">${totalPaid + totalPending}</p>
            <p className="text-white/80 text-sm mt-2">
              {paymentHistory.filter((p) => p.status === "Completed").length}{" "}
              completed payments
            </p>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <DollarSign className="w-10 h-10" />
          </div>
        </div>
      </Card> */}
    </div>
  );
}
