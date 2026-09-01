import SummaryCard from "./components/SummaryCard";
import TransactionCard from "./components/TransactionCard";
import type { AttentionResponse } from "./types/transaction";

export default async function Home() {
  const response = await fetch(
    "http://localhost:3000/api/transactions/attention",
    {
      cache: "no-store",
    }
  );

  const data: AttentionResponse = await response.json();

  const highSeverityCount = data.transactions.filter((transaction) => transaction.issues.some((issue) => issue.severity === 'high')).length;

  const stuckPendingCount = data.transactions.filter((transaction) => transaction.issues.some((issue) => issue.issue === 'stuck_pending')).length

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-semibold text-zinc-900">Triage</h1>

        <p className="mt-2 text-zinc-600">
          Transactions that need your attention
        </p>

        <div className="mt-8">
          <p className="text-sm text-zinc-500">
            {data.count} transaction{data.count === 1 ? "" : "s"} need attention
          </p>

          <div className="mt-8 flex flex-col gap-4">
            {data.transactions.map((transaction) => (
             <TransactionCard 
             key={transaction.id}
             transaction={transaction}/>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <SummaryCard label='Needs attention' value={data.count}/>
            <SummaryCard label='High severity' value={highSeverityCount}/>
            <SummaryCard label='Pending too long' value={stuckPendingCount}/>
          </div>
        </div>
      </div>
    </main>
  );
}