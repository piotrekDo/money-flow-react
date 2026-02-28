import type { CategorySpendingDto } from '@/model/Dashboard';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';

export const fetchCategorySpending = (date: string, signal?: AbortSignal) => {
    return ApiClient.get<CategorySpendingDto[]>('dashboard/category-month', {
        signal,
        params: {
            date
        }
    }).then((res: AxiosResponse<CategorySpendingDto[]>) => res.data)
}