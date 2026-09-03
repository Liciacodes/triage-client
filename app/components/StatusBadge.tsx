import { TransactionStatus } from "../types/transaction";

 type StatusBadgeProps = {
   status: TransactionStatus;
 };

export const StatusBadge = ({status}: StatusBadgeProps) => {

    const statusStyles: Record<TransactionStatus, string> = {
        success: "bg-green-100 text-green-800",
        pending: "bg-yellow-100 text-yellow-800",
        failed: "bg-red-100 text-red-800",
        reversed:"bg-blue-100 text-blue-800",
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
    )
}