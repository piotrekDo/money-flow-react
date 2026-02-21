import { QUERY_KEY_SUBCATEGORIES_WITH_MERCHANTS } from '@/library';
import type { SubcategoryWithMerchants } from '@/model/Category';
import { fetchSubcategoryWithMerchantsById } from '@/service/CategoryHttpService';
import { useQuery } from '@tanstack/react-query';

export const useSubcategoryWithMerchants = (id?: number) => {
    return useQuery<SubcategoryWithMerchants, Error>({
        queryKey: [QUERY_KEY_SUBCATEGORIES_WITH_MERCHANTS, id],
        queryFn: ({ signal }) =>
            fetchSubcategoryWithMerchantsById(id!, signal),
        enabled: !!id,
    });
};
