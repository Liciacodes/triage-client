import AcknowledgeAlertButton from "@/app/components/AcknowledgeAlertButton";
import { SeverityBadge } from "@/app/components/SeverityBadge";
import { StatusBadge } from "@/app/components/StatusBadge";
import {
  Issue,
  IssueSeverity,
  Transaction,
} from "@/app/types/transaction";
import {
  formatCurrency,
  formatIssueLabel,
} from "@/app/utils/formatters";

type Props = {
  params: Promise<{
    reference: string;
  }>;
};

type AlertStatus = "OPEN" | "ACKNOWLEDGED" | "RESOLVED";

type Alert = {
  id: string;
  type: string;
  severity: IssueSeverity;
  reason: string;
  status: AlertStatus;
  acknowledgedAt: string | null;
  resolvedAt: string | null;
};

type TransactionDetailsResponse = {
  transaction: Transaction;
  issues: Issue[];
  alerts: Alert[];
  needsAttention: boolean;
};

export default async function TransactionPage({
  params,
}: Props) {
  const { reference } = await params;

  const response = await fetch(
    `http://localhost:3000/api/transactions/${reference}`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    return (
      <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-xl border border-zinc-200 bg-white p-6">
            <p className="font-medium text-zinc-900">
              Transaction not found
            </p>

            <p className="mt-1 text-sm text-zinc-500">
              We couldn't find a transaction with this reference.
            </p>
          </div>
        </div>
      </main>
    );
  }

  const data: TransactionDetailsResponse =
    await response.json();

  const transaction = data.transaction;
  const issue = data.issues[0];

  const openAlert = data.alerts.find(
    (alert) => alert.status === "OPEN",
  );

  const acknowledgedAlerts = data.alerts.filter(
    (alert) => alert.status === "ACKNOWLEDGED",
  );

  const resolvedAlerts = data.alerts.filter(
    (alert) => alert.status === "RESOLVED",
  );

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold text-zinc-900">
          {transaction.reference}
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          {transaction.customerEmail}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">
              Amount
            </p>

            <p className="mt-2 font-medium">
              {formatCurrency(
                transaction.amount,
                transaction.currency,
              )}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">
              Status
            </p>

            <div className="mt-2">
              <StatusBadge status={transaction.status} />
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">
              Expected settlement
            </p>

            <p className="mt-2 font-medium">
              {formatCurrency(
                transaction.expectedSettlement,
                transaction.currency,
              )}
            </p>
          </div>

          <div className="rounded-xl border bg-white p-5">
            <p className="text-sm text-zinc-500">
              Actual settlement
            </p>

            <p className="mt-2 font-medium">
              {formatCurrency(
                transaction.actualSettlement,
                transaction.currency,
              )}
            </p>
          </div>
        </div>

        {data.needsAttention && issue && openAlert && (
          <div className="mt-8 rounded-xl border border-red-200 bg-red-50 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="font-semibold text-zinc-900">
                Needs attention
              </h2>

              <SeverityBadge
                severity={issue.severity}
              />
            </div>

            <p className="mt-4 font-medium text-zinc-900">
              {formatIssueLabel(issue.issue)}
            </p>

            <p className="mt-1 text-sm text-zinc-600">
              {issue.reason}
            </p>

            <div className="mt-5">
              <AcknowledgeAlertButton
                alertId={openAlert.id}
              />
            </div>
          </div>
        )}

        {acknowledgedAlerts.length > 0 && (
          <div className="mt-8 rounded-xl border border-blue-200 bg-blue-50 p-5">
            <h2 className="font-semibold text-zinc-900">
              Acknowledged alerts
            </h2>

            <div className="mt-4 space-y-4">
              {acknowledgedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg border border-blue-200 bg-white p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-zinc-900">
                      {formatIssueLabel(alert.type)}
                    </p>

                    <span className="text-sm font-medium text-blue-700">
                      Acknowledged
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-600">
                    {alert.reason}
                  </p>

                  {alert.acknowledgedAt && (
                    <p className="mt-2 text-xs text-zinc-500">
                      Acknowledged{" "}
                      {new Date(
                        alert.acknowledgedAt,
                      ).toLocaleString()}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-zinc-500">
                    The transaction may still require
                    monitoring until the underlying
                    condition changes.
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {resolvedAlerts.length > 0 && (
          <div className="mt-8 rounded-xl border border-zinc-200 bg-white p-5">
            <h2 className="font-semibold text-zinc-900">
              Resolved alerts
            </h2>

            <div className="mt-4 space-y-4">
              {resolvedAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="rounded-lg border border-zinc-200 bg-zinc-50 p-4"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <p className="font-medium text-zinc-900">
                      {formatIssueLabel(alert.type)}
                    </p>

                    <span className="text-sm font-medium text-green-700">
                      Resolved
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-zinc-600">
                    {alert.reason}
                  </p>

                  {alert.resolvedAt && (
                    <p className="mt-2 text-xs text-zinc-500">
                      Resolved{" "}
                      {new Date(
                        alert.resolvedAt,
                      ).toLocaleString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}