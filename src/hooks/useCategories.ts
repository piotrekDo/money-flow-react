import { QUERY_KEY_CATEGORIES } from '@/library';
import type { Category } from '@/model/Category';
import { fetchAllCategories } from '@/service/CategoryHttpService';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
    return useQuery<Category[], Error>({
        queryKey: [QUERY_KEY_CATEGORIES],
        queryFn: ({ queryKey, signal }) => {
            return fetchAllCategories(signal);
        },
    })
}