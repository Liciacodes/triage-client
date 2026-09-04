"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { API_URL } from "../utils/api";

export default function DemoControls() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [demoReference, setDemoReference] = useState<string | null>(null);

  useEffect(() => {
    const savedReference = sessionStorage.getItem("triage-demo-reference");

    if (savedReference) {
      setDemoReference(savedReference);
    }
  }, []);

  const createDemoMismatch = async () => {
    setLoading(true);

    const reference = `TRG-DEMO-${crypto
      .randomUUID()
      .slice(0, 8)
      .toUpperCase()}`;

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
        actualSettlement: 43750,
        createdAt: now,
        updatedAt: now,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      alert("Failed to create demo transaction");
      return;
    }

    sessionStorage.setItem("triage-demo-reference", reference);
    setDemoReference(reference);

    router.refresh();
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <h2 className="font-semibold text-zinc-900">
        Try Triage
      </h2>

      <p className="mt-1 text-sm text-zinc-500">
        Simulate a settlement mismatch to see how Triage detects and manages an
        operational issue.
      </p>

      <div className="mt-4 flex flex-wrap gap-3">
        {!demoReference ? (
          <button
            onClick={createDemoMismatch}
            disabled={loading}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading
              ? "Creating demo..."
              : "Simulate settlement mismatch"}
          </button>
        ) : (
          <button
            onClick={() =>
              router.push(`/transactions/${demoReference}`)
            }
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
          >
            View demo transaction
          </button>
        )}
      </div>

      {demoReference && (
        <p className="mt-3 text-xs text-zinc-500">
          Demo transaction: {demoReference}
        </p>
      )}
    </div>
  );
}