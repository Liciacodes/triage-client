"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";

type DemoResolutionButtonProps = {
  reference: string;
};

export default function DemoResolutionButton({
  reference,
}: DemoResolutionButtonProps) {
  const router = useRouter();
  const [isDemoTransaction, setIsDemoTransaction] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedReference = sessionStorage.getItem("triage-demo-reference");

    setIsDemoTransaction(savedReference === reference);
  }, [reference]);

  if (!isDemoTransaction) {
    return null;
  }

 const handleResolveDemo = async () => {
  setLoading(true);

  const now = new Date().toISOString();

  const response = await fetch(`${API_URL}/api/transactions/evaluate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: crypto.randomUUID(),
      reference,
      amount: 50000,
      currency: "NGN",
      customerEmail: "demo@triage.app",
      status: "success",
      expectedSettlement: 48750,
      actualSettlement: 48750,
      createdAt: now,
      updatedAt: now,
    }),
  });

  setLoading(false);

  if (!response.ok) {
    alert("Failed to correct demo settlement");
    return;
  }

  router.refresh();

  setTimeout(() => {
  sessionStorage.removeItem("triage-demo-reference");
  window.location.href = "/";
}, 3000);
};

  return (
    <div className="mt-5 rounded-lg border border-zinc-200 bg-white p-4">
      <p className="text-sm font-medium text-zinc-900">Demo controls</p>

      <p className="mt-1 text-sm text-zinc-500">
        Simulate the payment provider sending a corrected settlement update.
      </p>

      <button
        onClick={handleResolveDemo}
        disabled={loading}
        className="mt-3 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Correcting settlement..." : "Simulate corrected settlement"}
      </button>
    </div>
  );
}
