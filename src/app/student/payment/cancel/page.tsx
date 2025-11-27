"use client";

import { XCircle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { motion } from "framer-motion";

export default function PaymentCancel() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="max-w-md w-full p-8 text-center bg-inherit shadow-none border-0">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6">
              <XCircle className="w-10 h-10 text-red-500" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Payment Cancelled
            </h1>
            <p className="text-gray-500 mb-8">
              Your payment wasn’t completed. Don’t worry — you can retry
              securely anytime from your dashboard.
            </p>

            <Link href="/student/payment">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to Payments
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
