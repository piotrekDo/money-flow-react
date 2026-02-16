import type { Category } from '@/model/Category';
import { fetchAllCategories } from '@/service/CategoryHttpService';
import { useQuery } from '@tanstack/react-query';

export const useCategories = () => {
    return useQuery<Category[], Error>({
        queryKey: ['categories'],
        queryFn: ({ queryKey, signal }) => {
            return fetchAllCategories(signal);
        },
    })
}