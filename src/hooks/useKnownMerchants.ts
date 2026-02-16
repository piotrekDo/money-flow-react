import type { KnownMerchant } from '@/model/KnownMerchant';
import { fetchAllKnownMerchants } from '@/service/KnownMerchantHttpService';
import { useQuery } from '@tanstack/react-query';

export const useKnownMerchants = () => {
    return useQuery<KnownMerchant[], Error>({
        queryKey: ['merchants'],
        queryFn: ({ queryKey, signal }) => {
            return fetchAllKnownMerchants(signal);
        },
    })
}