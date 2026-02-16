import type { Subcategory } from '@/model/Category';
import { fetchAllSubcategoriesNoMerchants } from '@/service/CategoryHttpService';
import { useQuery } from '@tanstack/react-query';

export const useSubcategories = () => {
    return useQuery<Subcategory[], Error>({
        queryKey: ['subcategories'],
        queryFn: ({ queryKey, signal }) => {
            return fetchAllSubcategoriesNoMerchants(signal);
        },
    })
}