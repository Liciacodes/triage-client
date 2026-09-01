"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { Transaction } from "@/app/types/transaction";
import { formatCurrency } from "@/app/utils/formatters";

type TransactionsTableProps = {
  transactions: Transaction[];
};

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.reference.toLowerCase().includes(search.toLowerCase()) ||
      transaction.customerEmail.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "all" || transaction.status === status;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="mt-8 overflow-hidden rounded-xl border border-zinc-200 bg-white">
      {/* Search and filter controls */}
      <div className="flex flex-col gap-3 border-b border-zinc-200 p-4 sm:flex-row sm:items-center sm:gap-4">
        <input
          type="text"
          placeholder="Search reference or customer..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          className="w-full flex-1 rounded-lg border border-zinc-200 px-4 py-2 text-sm outline-none focus:border-zinc-400"
        />

        <div className="relative w-full sm:w-48">
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className="w-full appearance-none rounded-lg border border-zinc-200 bg-white px-4 py-2 pr-10 text-sm outline-none focus:border-zinc-400"
          >
            <option value="all">All statuses</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
            <option value="reversed">Reversed</option>
          </select>

          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500"
          />
        </div>
      </div>

      {/* Desktop table header */}
      <div className="hidden border-b border-zinc-200 bg-zinc-50 px-5 py-3 text-sm font-medium text-zinc-500 md:grid md:grid-cols-5">
        <span>Reference</span>
        <span>Customer</span>
        <span>Amount</span>
        <span>Status</span>
        <span>Created</span>
      </div>

      {/* Transactions */}
      {filteredTransactions.length === 0 ? (
        <div className="px-4 py-12 text-center">
          <p className="font-medium text-zinc-900">
            {transactions.length === 0
              ? "No transactions yet"
              : status !== "all"
                ? `No ${status} transactions found`
                : "No transactions found"}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {transactions.length === 0
              ? "Transactions will appear here once they are received."
              : "Try changing your search or status filter."}
          </p>
        </div>
      ) : (
        filteredTransactions.map((transaction) => (
          <Link
            key={transaction.id}
            href={`/transactions/${transaction.reference}`}
            className="block border-b border-zinc-100 p-4 hover:bg-zinc-50 md:grid md:grid-cols-5 md:items-center md:px-5"
          >
            <div>
              <p className="break-words font-medium text-zinc-900">
                {transaction.reference}
              </p>

              <p className="mt-1 text-sm text-zinc-500 md:hidden">
                {transaction.customerEmail}
              </p>
            </div>

            <span className="hidden text-zinc-600 md:block">
              {transaction.customerEmail}
            </span>

            <span className="mt-3 block text-sm md:mt-0">
              {formatCurrency(
                transaction.amount,
                transaction.currency,
              )}
            </span>

            <span className="mt-2 block text-sm capitalize md:mt-0">
              {transaction.status}
            </span>

            <span className="mt-2 block text-sm text-zinc-500 md:mt-0">
              {new Date(transaction.createdAt).toLocaleDateString()}
            </span>
          </Link>
        ))
      )}
    </div>
  );
}