"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type ResolveAlertButtonProps = {
  alertId: string;
};

export default function ResolveAlertButton({
  alertId,
}: ResolveAlertButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleResolve = async () => {
    setLoading(true);

    const response = await fetch(
      `http://localhost:3000/api/alerts/${alertId}/resolve`,
      {
        method: "PATCH",
      },
    );

    setLoading(false);

    if(!response.ok) {
      alert("Failed to resolve alert");
      return;
    }

    setSuccess(true);

    setTimeout(() => {
        router.refresh();
    }, 800);
  
  };

  return (
    <button
      onClick={handleResolve}
    disabled={loading || success}
      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
    >
      {loading ? "Resolving..." : success ? "Resolved ✓" : "Mark as resolved"}
    </button>

  )
}
