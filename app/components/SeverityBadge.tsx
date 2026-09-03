import type { IssueSeverity } from '../types/transaction';

 type SeverityBadgeProps = {
   severity: IssueSeverity;
 };

export const SeverityBadge = ({severity}: SeverityBadgeProps) => {

    const severityStyles: Record<IssueSeverity, string> = {
        low: "bg-green-100 text-green-800",
        medium: "bg-yellow-100 text-yellow-800",
        high: "bg-red-100 text-red-800",
    }

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severityStyles[severity]}`}>
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
        </span>
    )
}