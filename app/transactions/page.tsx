import { Transaction } from "@/app/types/transaction";
import Link from "next/link";
import { formatCurrency } from "../utils/formatters";
import TransactionsTable from "../components/TransactionsTable";

type TransactionsResponse = {
  transactions: Transaction[];
};

export default async function TransactionsPage() {
  const response = await fetch("http://localhost:3000/api/transactions", {
    cache: "no-store",
  });
  if (!response.ok) {
    return (
      <main className="p-8">
        <p>Failed to fetch transactions</p>
      </main>
    );
  }

  const data: TransactionsResponse = await response.json();

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-semibold text-zinc-900">
          All Transactions
        </h1>

        <p className="mt-2 text-zinc-500">
          {data.transactions.length} transactions
        </p>

        <TransactionsTable transactions={data.transactions} />
      </div>
    </main>
  );
}
