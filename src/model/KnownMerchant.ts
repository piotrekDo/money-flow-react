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
    keywords: KnownMerchantKeyWord[]
}