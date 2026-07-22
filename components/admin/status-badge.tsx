import { cn } from "@/lib/utils";

const COLORS: Record<string, string> = {
  new: "bg-accent/15 text-accent",
  urgent: "bg-destructive/15 text-destructive",
  priority: "bg-amber-100 text-amber-700",
};

export default function StatusBadge({ status }: { status: string }) {
  const color = COLORS[status.toLowerCase()] || "bg-secondary text-muted-foreground";
  return (
    <span
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-medium capitalize",
        color,
      )}
    >
      {status}
    </span>
  );
}
