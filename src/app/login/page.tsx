"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"admin" | "student">("student");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { login, user } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Pass the selected tab to the login function
      await login(formData.email, formData.password, activeTab);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-primary flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-muted-foreground">Login to your account</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            type="button"
            onClick={() => setActiveTab("student")}
            className={`flex-1 py-4 text-base font-bold rounded-lg transition-all ${
              activeTab === "student"
                ? "bg-blue-50 text-primary"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Student Login
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("admin")}
            className={`flex-1 py-4 text-base font-bold rounded-lg transition-all ${
              activeTab === "admin"
                ? "bg-blue-50 text-primary"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Admin Login
          </button>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-80 py-3"
          >
            {loading ? "Logging in..." : `Login as ${activeTab === "admin" ? "Admin" : "Student"}`}
          </Button>
        </form>

        <div className="mt-6 space-y-3">
          <p className="text-center text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}