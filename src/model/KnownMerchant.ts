import type { Subcategory } from "./Category";
import type { Transaction, TransactionRaw } from "./Transaction";

export interface KnownMerchantKeyWord {
    id: number,
    keyword: string,
    weight: number
}

export interface KnownMerchant {
    merchantId: number,
    merchantCode: string,
    merchantName: string,
    imageUrl: string,
    keywords: KnownMerchantKeyWord[],
    subcategories: Subcategory[]
}

export interface PossibleMerchant {
    id: number;
    knownMerchantDto: KnownMerchant,
    points: number;
    matchedKeywords: string[]
}

export interface AddNewMerchant {
    merchantCode: string,
    merchantName: string,
    imageUrl?: string,
    keywords: KnownMerchantKeyWord[],
    subcategories: number[],
    tranId?: number
}

export interface KnownMerchantWitchTransactionsRaw {
    merchantId: number,
    merchantCode: string,
    merchantName: string,
    imageUrl: string,
    keywords: KnownMerchantKeyWord[],
    subcategories: Subcategory[],
    transactions: TransactionRaw[]
}

export interface KnownMerchantWitchTransactions {
    merchantId: number,
    merchantCode: string,
    merchantName: string,
    imageUrl: string,
    keywords: KnownMerchantKeyWord[],
    subcategories: Subcategory[],
    transactions: Transaction[]
}