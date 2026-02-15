import type { FetchFinancialTransactionsResponse } from '@/model/Transaction';
import { setKnownMerchantToTransaction } from '@/service/TransactionHttpService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useSetKnownMerchant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ tranSystemId, merchantId }: { tranSystemId: number; merchantId: number }) =>
            setKnownMerchantToTransaction(tranSystemId, merchantId),
        onSuccess: (updatedData: FetchFinancialTransactionsResponse, variables) => {
            queryClient.setQueriesData<FetchFinancialTransactionsResponse>(
                { queryKey: ['transactions'], exact: false },
                (oldData) => {
                    if (!oldData) return oldData;

                    const updatedTransactions = oldData.transactions.map(t => {
                        const updated = updatedData.transactions.find(u => u.systemId === t.systemId);
                        return {
                            ...t,
                            knownMerchant: updated?.knownMerchant || t.knownMerchant, // fallback
                        };
                    });

                    return { ...oldData, unknownMerchantTransactionCount: oldData.unknownMerchantTransactionCount -1, transactions: updatedTransactions };
                }
            );
        },

    });
};
