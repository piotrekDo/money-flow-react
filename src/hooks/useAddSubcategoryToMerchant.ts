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
                queryKey: ['subcategories'],
            });

            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
            queryClient.invalidateQueries({
                queryKey: ['merchants'],
            });

            variables.selectedMerchant.subcategories = result.subcategories
        },

        onError: (error) => {
            console.error(error);
        },
    });
};
