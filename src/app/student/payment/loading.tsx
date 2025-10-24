"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, CheckCircle2, Clock, CreditCard } from "lucide-react";
import StatCard from "@/components/StatCard";

export default function PaymentsSkeleton() {
  const statPlaceholders = [
    { title: "Total Paid", icon: CheckCircle2, variant: "success" },
    { title: "Pending Payments", icon: Clock, variant: "warning" },
    { title: "Total Transactions", icon: DollarSign, variant: "accent" },
  ];

  const placeholderPayments = Array(3).fill(null);

  return (
    <div className="space-y-8">
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Payments</h1>
        <p className="text-muted-foreground">
          Track all your application fees and transactions
        </p>
      </div>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statPlaceholders.map((stat, idx) => (
          <Card
            key={idx}
            className="p-6 shadow-md border-0 flex flex-row justify-between animate-pulse"
          >
            <div className="">
              <p className="text-sm text-gray-400 mb-2">{stat.title}</p>
              <div className="w-24 h-6 bg-gray-200 rounded mb-1"></div>
              <div className="w-32 h-3 bg-gray-100 rounded"></div>
            </div>
            <div className="w-10 h-10 rounded-lg bg-gray-200 flex items-center justify-center">
              <stat.icon className="w-5 h-5 text-gray-400" />
            </div>
          </Card>
        ))}
      </div>

      {/* ===== Payment History ===== */}
      <Card className="p-6 border-0 shadow-md">
        <div className="mb-6 animate-pulse">
          <div className="h-6 w-60 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 w-72 bg-gray-100 rounded"></div>
        </div>

        <div className="space-y-4">
          {placeholderPayments.map((_, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-5 rounded-lg bg-secondary/50 animate-pulse"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-300 flex items-center justify-center shadow-md">
                  <CreditCard className="w-6 h-6 text-white/70" />
                </div>

                <div>
                  <div className="w-40 h-5 bg-gray-200 rounded mb-2"></div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                    <span className="text-gray-300">•</span>
                    <div className="w-20 h-3 bg-gray-200 rounded"></div>
                    <span className="text-gray-300">•</span>
                    <div className="w-16 h-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-2">
                <div className="w-16 h-5 bg-gray-200 rounded"></div>
                <Badge className="bg-gray-300 text-transparent">Loading</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ===== Summary Card ===== */}
      <Card className="p-6 border-0 shadow-md bg-gradient-to-r from-primary to-accent text-white animate-pulse">
        <div className="flex items-center justify-between">
          <div>
            <div className="h-4 w-32 bg-white/40 rounded mb-2"></div>
            <div className="h-10 w-44 bg-white/60 rounded mb-3"></div>
            <div className="h-4 w-56 bg-white/40 rounded"></div>
          </div>
          <div className="w-20 h-20 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
            <DollarSign className="w-10 h-10 text-white/70" />
          </div>
        </div>
      </Card>
    </div>
  );
}
