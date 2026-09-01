import Link from "next/link";
import type { Transaction } from "../types/transaction";
import { formatIssueLabel } from "../utils/formatters";

type TransactionCardProps = {
    transaction: Transaction;
}

export default function TransactionCard({ transaction }:  TransactionCardProps)  {
const issue = transaction.issues[0]

return (
  <Link href={`/transactions/${transaction.reference}`}>
     <div className="rounded-xl border border-zinc-200 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-medium text-zinc-900">
            {transaction.reference}
          </p>

          <p className="mt-1 text-sm text-zinc-500">
            {transaction.customerEmail}
          </p>
        </div>

        <span className="rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700">
          {issue?.severity}
        </span>
      </div>

      <div className="mt-4">
        <p className="font-medium text-zinc-900">
          {issue && formatIssueLabel(issue.issue)}
        </p>

        <p className="mt-1 text-sm text-zinc-600">
          {issue?.reason}
        </p>
      </div>
    </div>
    </Link>
)
}