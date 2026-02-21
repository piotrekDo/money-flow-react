import { QUERY_KEY_CATEGORIES, QUERY_KEY_MERCHANTS, QUERY_KEY_SUBCATEGORIES } from '@/library';
import type { KnownMerchant } from '@/model/KnownMerchant';
import { addSubcategoryToMerchant } from '@/service/KnownMerchantHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Payload = {
    merchantId: number;
    subcategoryId: number;
    selectedMerchant: KnownMerchant
};

export const useAddSubcategoryToMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation<KnownMerchant, Error, Payload>({
        mutationFn: ({ merchantId, subcategoryId }) => addSubcategoryToMerchant(merchantId, subcategoryId),

        onSuccess: (result: KnownMerchant, variables: {selectedMerchant: KnownMerchant}) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_SUBCATEGORIES],
            });

            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_CATEGORIES],
            });
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_MERCHANTS],
            });

            variables.selectedMerchant.subcategories = result.subcategories
        },

        onError: (error) => {
            console.error(error);
        },
    });
};
