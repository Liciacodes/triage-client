export type IssueSeverity = 'low' | "medium" | "high";

export interface Issue {
    issue: string;
    severity: IssueSeverity;
    reason: string;
}

export type TransactionStatus = 'pending' | "success" | "failed" | "reversed";

export interface Transaction {
    id: string;
    reference: string;
    amount: number;
    currency: string;
    customerEmail: string;
    status: TransactionStatus;
    expectedSettlement: number | null;
    actualSettlement: number | null;
    createdAt: string;
    updatedAt: string;
    issues: Issue[];
}

export interface AttentionResponse {
    count: number;
    transactions: Transaction[]
}