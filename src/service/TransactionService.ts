import type { Transaction, TransactionRaw } from "@/model/Transaction";

export const mapTransaction = (raw: TransactionRaw): Transaction => ({
    ...raw,
    tranDate: new Date(raw.tranDate),
});