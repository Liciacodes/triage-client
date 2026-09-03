import SummaryCard from "./components/SummaryCard";
import TransactionCard from "./components/TransactionCard";
import type { AttentionResponse } from "./types/transaction";

export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/transactions/attention",
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl">
        <div className="rounded-xl border border-red-200 bg-red-50 p-6">
          <p className="font-medium text-red-900">
            Unable to load transactions
          </p>

          <p className="mt-1 text-sm text-red-700">
            Something went wrong while loading transactions that need attention.
          </p>
        </div>
      </div>
    </main>
  );
}

  const data: AttentionResponse = await response.json();

  const highSeverityCount = data.transactions.filter((transaction) =>
    transaction.issues.some((issue) => issue.severity === "high"),
  ).length;

  const stuckPendingCount = data.transactions.filter((transaction) =>
    transaction.issues.some((issue) => issue.issue === "stuck_pending"),
  ).length;

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl">
        <p className="mt-2 text-zinc-600">
          Transactions that need your attention
        </p>

        <div className="mt-8">
          <p className="text-sm text-zinc-500">
            {data.count} transaction{data.count === 1 ? "" : "s"} need attention
          </p>

          <div className="mt-8">
            {data.transactions.length === 0 ? (
              <div className="rounded-xl border border-zinc-200 bg-white px-6 py-12 text-center">
                <p className="font-medium text-zinc-900">All clear</p>

                <p className="mt-1 text-sm text-zinc-500">
                  No transactions currently need attention.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {data.transactions.map((transaction) => (
                  <TransactionCard
                    key={transaction.id}
                    transaction={transaction}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard label="Needs attention" value={data.count} />
            <SummaryCard label="High severity" value={highSeverityCount} />
            <SummaryCard label="Pending too long" value={stuckPendingCount} />
          </div>
        </div>
      </div>
    </main>
  );
}
