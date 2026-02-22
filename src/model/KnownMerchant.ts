import type { Subcategory } from "./Category";

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