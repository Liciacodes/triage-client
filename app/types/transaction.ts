export type IssueSeverity = 'low' | "medium" | "high";

export interface Issue {
    issue: string;
    severity: IssueSeverity;
    reason: string;
}

export interface Transaction {
    id: string;
    reference: string;
    amount: number;
    currency: string;
    customerEmail: string;
    status: 'pending' | "success" | "failed" | "reversed" ;
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