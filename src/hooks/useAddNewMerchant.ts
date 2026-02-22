import { QUERY_KEY_CATEGORIES, QUERY_KEY_MERCHANTS, QUERY_KEY_SUBCATEGORIES, QUERY_KEY_TRANSACTIONS } from '@/library';
import type { AddNewMerchant, KnownMerchant } from '@/model/KnownMerchant';
import { addNewKnownMerchant } from '@/service/KnownMerchantHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useAddNewMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation<KnownMerchant, Error, AddNewMerchant>({
        mutationFn: (newMerchant) => addNewKnownMerchant(newMerchant),

        onSuccess: (result: KnownMerchant) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_TRANSACTIONS],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_SUBCATEGORIES],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_CATEGORIES],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_MERCHANTS],
            });

        },

        onError: (error) => {
            console.error(error);
        },
    })
}