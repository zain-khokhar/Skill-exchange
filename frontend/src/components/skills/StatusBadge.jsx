import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function StatusBadge({ status }) {
  const config = {
    pending: { label: "Pending", className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    approved: { label: "Approved", className: "bg-green-500/10 text-green-500 border-green-500/20" },
    rejected: { label: "Rejected", className: "bg-red-500/10 text-red-500 border-red-500/20" },
  };

  const { label, className } = config[status] || config.pending;

  return (
    <Badge variant="outline" className={cn(className)}>
      {label}
    </Badge>
  );
}
