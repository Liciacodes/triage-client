export const formatIssueLabel = (issue: string) => {
    return issue
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); 
}

export const formatCurrency = (
    amount: number | null, currency: string) => {
if (amount === null) return 'N/A';

return new Intl.NumberFormat('en', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0}).format(amount);
   
}