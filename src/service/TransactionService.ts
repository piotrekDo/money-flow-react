import type { FetchFinancialTransactionsResponse, FetchFinancialTransactionsResponseRaw, Transaction, TransactionRaw } from "@/model/Transaction";

export const mapTransaction = (raw: TransactionRaw): Transaction => ({
    ...raw,
    tranDate: new Date(raw.tranDate),
});

export const mapFetchTransactionsResponse = (raw: FetchFinancialTransactionsResponseRaw): FetchFinancialTransactionsResponse => ({
    ...raw,
    transactions: raw.transactions.map(mapTransaction)
});