import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import type { Subcategory } from '@/model/Category';

export const fetchAllSubcategoriesNoMerchants = (signal?: AbortSignal) => {
    return ApiClient.get<Subcategory[]>('categories/subcategories-no-merchants', {signal})
        .then((res: AxiosResponse<Subcategory[]>) => res.data)
}