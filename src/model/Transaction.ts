import type { Subcategory } from "./Category";
import type { KnownMerchant, PossibleMerchant } from "./KnownMerchant";

export interface TransactionRaw {
    systemId: number;
    tranType: string;
    tranDate: string;
    amount: number;
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
