import ResolveAlertButton from "@/app/components/ResolveAlertButton";
import { Issue, Transaction } from "@/app/types/transaction";
import { formatCurrency, formatIssueLabel } from "@/app/utils/formatters";

type Props = {
  params: Promise<{
    reference: string;
  }>;
};

type Alert = {
  id: string;
  type: string;
  severity: string;
  reason: string;
  resolved: boolean;
  resolvedAt: string | null;
}

type TransactionDetailsResponse = {
  transaction: Transaction;
  issues: Issue[];
  alerts: Alert[];
  needsAttention: boolean;
};

export default async function TransactionPage({ params }: Props) {
  const { reference } = await params;

  const response = await fetch(
    `http://localhost:3000/api/transactions/${reference}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return (
      <main className="p-8">
        <p>Transaction not found</p>
      </main>
    );
  }

  const data: TransactionDetailsResponse = await response.json();
  const transaction = data.transaction;
  const issue = data.issues[0];

  const unresolvedAlert = data.alerts.find((alert) => !alert.resolved)

  return (
    <main className="min-h-screen bg-zinc-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold text-zinc-900">
          {transaction.reference}
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          {transaction.customerEmail}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">Amount</p>
            <p className="mt-2 font-medium">
              {formatCurrency(transaction.amount, transaction.currency)}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">Status</p>
            <p className="mt-2 font-medium">{transaction.status}</p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">Expected settlement</p>
            <p className="mt-2 font-medium">
              {formatCurrency(transaction.expectedSettlement, transaction.currency)}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">Actual settlement</p>
            <p className="mt-2 font-medium">
              {formatCurrency(transaction.actualSettlement, transaction.currency)}
            </p>
          </div>
        </div>

        {data.needsAttention && issue && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-zinc-900">Needs attention</h2>

              <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-medium text-red-700">
                {issue.severity}
              </span>
            </div>

            <p className="mt-4 font-medium text-zinc-900">{formatIssueLabel(issue.issue)}</p>

            <p className="mt-1 text-sm text-zinc-600">{issue.reason}</p>
            {unresolvedAlert && (
              <div className="mt-5">
                <ResolveAlertButton alertId={unresolvedAlert.id} />
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
