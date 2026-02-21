import type { KnownMerchant } from "./KnownMerchant";

export interface Subcategory {
    id: number;
    name: string;
    imageUrl: string;
    icon: string;
    color: string;
    categoryId: number;
    categoryName: string;
    categoryImageUrl: string;
    categoryIcon: string;
    categoryColor: string;
}

export interface Category {
    id: number;
    name: string;
    imageUrl: string;
    icon: string;
    color: string;
    subcategories: Subcategory[];
}

export interface SubcategoryWithMerchants {
    id: number;
    name: string;
    imageUrl: string;
    icon: string;
    color: string;
    categoryId: number;
    categoryName: string;
    categoryImageUrl: string;
    categoryIcon: string;
    categoryColor: string;
    merchants: KnownMerchant[]
}