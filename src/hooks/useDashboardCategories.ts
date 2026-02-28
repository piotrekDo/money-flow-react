import { QUERY_KEY_DASHBOARD_CATEGORIES } from '@/library';
import type { CategorySpendingDto } from '@/model/Dashboard';
import { fetchCategorySpending } from '@/service/DashboardHttpService';
import { useQuery } from '@tanstack/react-query';

export const useDashboardCategories = (date: string) => {
    return useQuery<CategorySpendingDto[], Error>({
        queryKey: [QUERY_KEY_DASHBOARD_CATEGORIES, date],
        queryFn: ({ signal }) => fetchCategorySpending(date, signal),
        staleTime: 0,
        enabled: !!date
    })
}