import { QUERY_KEY_MERCHANTS } from '@/library';
import type { KnownMerchant } from '@/model/KnownMerchant';
import { fetchAllKnownMerchants } from '@/service/KnownMerchantHttpService';
import { useQuery } from '@tanstack/react-query';

export const useKnownMerchants = () => {
    return useQuery<KnownMerchant[], Error>({
        queryKey: [QUERY_KEY_MERCHANTS],
        queryFn: ({ queryKey, signal }) => {
            return fetchAllKnownMerchants(signal);
        },
    })
}