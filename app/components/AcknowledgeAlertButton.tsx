"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { API_URL } from "../utils/api";

type AcknowledgeAlertButtonProps = {
  alertId: string;
};

export default function AcknowledgeAlertButton({
  alertId,
}: AcknowledgeAlertButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAcknowledge = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${API_URL}/api/alerts/${alertId}/acknowledge`,
        {
          method: "PATCH",
        },
      );

      if (!response.ok) {
        alert("Failed to acknowledge alert");
        return;
      }

      router.refresh();
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleAcknowledge}
      disabled={loading}
      className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {loading ? "Acknowledging..." : "Acknowledge"}
    </button>
  );
}