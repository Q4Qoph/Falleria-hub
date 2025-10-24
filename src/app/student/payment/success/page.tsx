"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import apiClient from "@/lib/axios-client";

interface PaymentData {
  paymentId: number;
  applicationId: number;
  amount: string;
  paymentGatewayTransactionId: string;
  stripeSessionId: string;
  status: string;
  paymentDate: string;
}

interface VerifyResponse {
  status: string;
  payment: PaymentData;
}

export default function PaymentSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get("session_id");
  const [status, setStatus] = useState<"loading" | "success" | "invalid">(
    "loading"
  );
  const [data, setData] = useState<PaymentData | null>(null);

  useEffect(() => {
    if (!sessionId) {
      router.push("/student/payment/cancelled");
      return;
    }

    const verifySession = async () => {
      try {
        const res = await apiClient.get<VerifyResponse>(`/payments/verify/${sessionId}`);
        if (res.data.status === "paid" && res.data.payment.status === "success") {
          setData(res.data.payment);
          setStatus("success");
        } else {
          setStatus("invalid");
        }
      } catch (err) {
        console.error("Verification failed:", err);
        setStatus("invalid");
      }
    };

    verifySession();
  }, [sessionId, router]);

  useEffect(() => {
    if (status === "invalid") {
      router.push("/student/payment/cancelled");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center bg-gray-50">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-muted-foreground">Verifying your payment...</p>
      </div>
    );
  }

  if (status !== "success" || !data) {
    return null;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="max-w-md w-full p-8 text-center shadow-none bg-inherit border-0">
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-3xl font-bold text-gray-900 mb-3">
              Payment Successful!
            </h1>

            <p className="text-gray-500 mb-8">
              Your payment for{" "}
              has been verified and recorded successfully.
            </p>

            <div className="mb-8">
              <p className="text-2xl font-bold text-green-600">
                ${parseFloat(data.amount).toFixed(2)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">Amount Paid</p>
            </div>

            <Link href="/student/payment">
              <Button className="gap-2">
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
