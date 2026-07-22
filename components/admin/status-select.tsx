"use client";

import { useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function StatusSelect({
  currentStatus,
  options,
  action,
}: {
  currentStatus: string;
  options: string[];
  action: (status: string) => Promise<void>;
}) {
  const [status, setStatus] = useState(currentStatus);
  const [isPending, startTransition] = useTransition();

  return (
    <Select
      value={status}
      onValueChange={(value) => {
        if (!value) return;
        setStatus(value);
        startTransition(() => action(value));
      }}
      disabled={isPending}
    >
      <SelectTrigger className="w-44 capitalize">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option} value={option} className="capitalize">
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
