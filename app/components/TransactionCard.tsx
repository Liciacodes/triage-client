import Link from "next/link";
import type { Transaction } from "../types/transaction";
import { formatIssueLabel } from "../utils/formatters";
import { SeverityBadge } from "./SeverityBadge";

type TransactionCardProps = {
  transaction: Transaction;
};

export default function TransactionCard({
  transaction,
}: TransactionCardProps) {
  const issue = transaction.issues[0];

  return (
    <Link
      href={`/transactions/${transaction.reference}`}
      className="block rounded-xl border border-zinc-200 bg-white p-5 transition hover:border-zinc-300 hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-zinc-900">
            {transaction.reference}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {transaction.customerEmail}
          </p>
        </div>

        {issue && <SeverityBadge severity={issue.severity} />}
      </div>

      <div className="mt-4">
        <p className="font-medium text-zinc-900">
          {issue && formatIssueLabel(issue.issue)}
        </p>

        <p className="mt-1 text-sm text-zinc-600">
          {issue?.reason}
        </p>
      </div>
    </Link>
  );
}