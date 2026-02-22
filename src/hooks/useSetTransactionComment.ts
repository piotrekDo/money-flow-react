import { QUERY_KEY_TRANSACTIONS } from '@/library';
import type { SetTransactionCommentRequest, Transaction } from '@/model/Transaction';
import { setTransactionComment } from '@/service/TransactionHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSetTransactionComment = () => {
    const queryClient = useQueryClient();

    return useMutation<Transaction, Error, SetTransactionCommentRequest>({
        mutationFn: (request) => setTransactionComment(request),

        onSuccess: (result) => {
            // queryClient.invalidateQueries({
            //     queryKey: [QUERY_KEY_TRANSACTIONS],
            // });
            // queryClient.removeQueries({
            //     queryKey: [QUERY_KEY_TRANSACTIONS]
            // })
        },

        onError: (error) => {
            console.error(error);
        },
    })
}