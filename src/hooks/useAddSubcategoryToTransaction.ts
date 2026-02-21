import { QUERY_KEY_CATEGORIES, QUERY_KEY_MERCHANTS, QUERY_KEY_SUBCATEGORIES, QUERY_KEY_TRANSACTIONS } from '@/library';
import type { Transaction } from '@/model/Transaction';
import { addSubcategoryToTransaction } from '@/service/TransactionHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

type Payload = {
    tranSystemId: number;
    subcategoryId: number;
};

export const useAddSubcategoryToTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation<Transaction, Error, Payload>({
        mutationFn: ({ tranSystemId, subcategoryId }) => addSubcategoryToTransaction(tranSystemId, subcategoryId),

        onSuccess: (result: Transaction) => {
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
    });
};
