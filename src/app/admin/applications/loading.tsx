"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, FileText, MapPin, Calendar, GraduationCap } from "lucide-react";

export default function AdminApplicationsSkeleton() {
  const placeholders = Array(3).fill(null);

  return (
    <div className="space-y-8 animate-pulse">
      {/* ===== Applications Grid ===== */}
      <div className="gap-6 space-y-4">
        {placeholders.map((_, idx) => (
          <Card
            key={idx}
            className="p-6 border-0 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              {/* Left Side (Icon + Info) */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gray-300 flex items-center justify-center shadow-md">
                  <GraduationCap className="w-6 h-6 text-white/70" />
                </div>
                <div>
                  <div className="h-5 w-48 bg-gray-200 rounded mb-2"></div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                    <MapPin className="w-3 h-3 text-gray-300" />
                    <div className="h-3 w-24 bg-gray-100 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Status Badge Placeholder */}
              <Badge className="bg-gray-300 text-transparent">Loading</Badge>
            </div>

            {/* Details Section */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4 text-gray-300" />
                <div className="h-3 w-40 bg-gray-200 rounded"></div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-300" />
                <div className="h-3 w-56 bg-gray-100 rounded"></div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-300" />
                <div className="h-3 w-52 bg-gray-100 rounded"></div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
