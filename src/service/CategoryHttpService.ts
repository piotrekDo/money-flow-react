import type { Category, Subcategory } from '@/model/Category';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';

export const fetchAllSubcategoriesNoMerchants = (signal?: AbortSignal) => {
    return ApiClient.get<Subcategory[]>('categories/subcategories-no-merchants', { signal })
        .then((res: AxiosResponse<Subcategory[]>) => res.data)
}

export const fetchAllCategories = (signal?: AbortSignal) => {
    return ApiClient.get<Category[]>('categories/categories-all', { signal })
        .then((res: AxiosResponse<Category[]>) => res.data)
}

export const changeSubcategoryCategory = (subCategoryId: number, categoryId: number) => {
    return ApiClient.post<Subcategory>('categories/change-subcategory-cat', {}, {
        params: {
            subCategoryId,
            categoryId
        }
    }).then((res: AxiosResponse<Subcategory>) => res.data)
}