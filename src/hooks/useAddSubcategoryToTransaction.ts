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
                queryKey: ['transactions'],
            });
            queryClient.invalidateQueries({
                queryKey: ['subcategories'],
            });
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            });
            queryClient.invalidateQueries({
                queryKey: ['merchants'],
            });

        },

        onError: (error) => {
            console.error(error);
        },
    });
};
