// components/StatusTimeline.tsx
import { Badge } from "@/components/ui/badge";
import { Circle, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { format } from "date-fns";

interface StatusEntry {
  id: number;
  status: string;
  description?: string;
  createdAt: string;
}

interface StatusTimelineProps {
  history: StatusEntry[];
  currentStatus: string;
}

const getStatusColor = (status: string): string => {
  const map: Record<string, string> = {
    Accepted: "bg-green-500 text-white",
    "Awaiting Payment": "bg-yellow-500 text-white",
    "In Review": "bg-blue-500 text-white",
    Submitted: "bg-indigo-500 text-white",
    "Additional Documents Required": "bg-orange-500 text-white",
    Processing: "bg-primary text-white",
    Rejected: "bg-red-500 text-white",
  };
  return map[status] || "bg-gray-400 text-white";
};

const getStatusIcon = (status: string, isCurrent: boolean) => {
  const size = "w-3.5 h-3.5";
  if (isCurrent) return <Circle className={`${size} fill-current`} />;
  switch (status) {
    case "Accepted": return <CheckCircle2 className={size} />;
    case "Additional Documents Required": return <AlertCircle className={size} />;
    case "Awaiting Payment": return <Clock className={size} />;
    default: return <Circle className={size} />;
  }
};

export default function StatusTimeline({ history, currentStatus }: StatusTimelineProps) {
  if (!history?.length) return null;

  return (
    <div className="space-y-5">
      <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-1.5">
        <Clock className="w-4 h-4 text-blue-600" />
        Status Journey
      </h3>

      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute left-5 top-8 bottom-8 w-0.5 bg-gray-200 hidden md:block" />

        <div className="space-y-6">
          {history.map((entry, idx) => {
            const isCurrent = entry.status === currentStatus;
            const isLast = idx === history.length - 1;

            return (
              <div key={entry.id} className="flex gap-3 relative">
                {/* Icon + Line */}
                <div className="flex flex-col items-center z-10">
                  <div
                    className={`p-1.5 rounded-full transition-all duration-200 ${
                      isCurrent
                        ? "ring-4 ring-blue-100 ring-offset-2 scale-110"
                        : "ring-2 ring-gray-200"
                    } ${getStatusColor(entry.status)}`}
                  >
                    {getStatusIcon(entry.status, isCurrent)}
                  </div>
                  {!isLast && <div className="w-0.5 h-12 bg-gray-200 mt-1" />}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0 pb-6">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge
                      className={`text-xs font-medium px-2 py-0.5 ${getStatusColor(
                        entry.status
                      )}`}
                    >
                      {entry.status}
                    </Badge>
                    {isCurrent && (
                      <span className="text-xs font-medium text-blue-600 animate-pulse">
                        ← Current
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-1">
                    {format(new Date(entry.createdAt), "MMM d, yyyy 'at' h:mm a")}
                  </p>

                  {entry.description && (
                    <p className="text-xs text-gray-600 mt-1.5 italic line-clamp-2">
                      {entry.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}