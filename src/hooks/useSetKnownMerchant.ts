import { QUERY_KEY_TRANSACTIONS } from '@/library';
import type { Transaction } from '@/model/Transaction';
import { setKnownMerchantToTransaction } from '@/service/TransactionHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSetKnownMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tranSystemId, merchantId }: { tranSystemId: number; merchantId: number }) =>
            setKnownMerchantToTransaction(tranSystemId, merchantId),
        onMutate: (v: { tranSystemId: number; merchantId: number }, context) => {

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