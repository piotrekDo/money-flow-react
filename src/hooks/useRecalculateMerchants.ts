import { QUERY_KEY_TRANSACTIONS } from '@/library';
import type { Transaction } from '@/model/Transaction';
import { recalculatePossibleMerchants } from '@/service/TransactionHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useRecalculateMerchants = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tranSystemId }: { tranSystemId: number }) =>
            recalculatePossibleMerchants(tranSystemId),
        onMutate: (v: { tranSystemId: number }, context) => {

        },
        onSuccess: (updatedData: Transaction, variables) => {
            queryClient.invalidateQueries({
                queryKey: [QUERY_KEY_TRANSACTIONS],
                exact: false,
            });
        },
        onError: (error) => {
            console.log(error)
        },
    });
};