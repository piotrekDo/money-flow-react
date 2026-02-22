import type { Subcategory } from "./Category";
import type { KnownMerchant, PossibleMerchant } from "./KnownMerchant";

export interface FetchFinancialTransactionsResponseRaw {
    startDate: Date;
    endDate: Date;
    transactions: TransactionRaw[];
    allTransactionCount: number;
    unknownMerchantTransactionCount: number;
    incomeTransactionCount: number;
    expenseTransactionCount: number;
    cashTransactionCount: number;
    missingDataTransactionCount: number;
    totals: number;
    totalExpense: number;
    totalIncome: number;
    totalCashIn: number;
    totalCashOut: number;
}

export type FetchFinancialTransactionsResponse = Omit<FetchFinancialTransactionsResponseRaw, 'transactions'> & {
    transactions: Transaction[];
}

export interface TransactionRaw {
    systemId: number;
    tranType: string;
    tranDate: string;
    amount: number;
    comment: string;
    bankTranNr: string;
    accountNr: string;
    merchantDataRaw: string;
    titleRaw: string;
    normalizedKeywords: string;
    possibleMerchants: PossibleMerchant[];
    knownMerchant: KnownMerchant;
    knownMerchantUnsure: boolean;
    subcategoryDto: Subcategory;
}

export type Transaction = Omit<TransactionRaw, "tranDate"> & {
    tranDate: Date;
};

export interface SetTransactionCommentRequest {
    tranSystemId: number;
    comment: string | null
};
