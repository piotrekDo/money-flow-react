import type { FetchFinancialTransactionsResponse } from '@/model/Transaction';
import { fetchTransactionDateBetween } from '@/service/TransactionHttpService';
import { useQuery } from '@tanstack/react-query';


export const useTransactions = (startDate: string, endDate: string) => {
  return useQuery<FetchFinancialTransactionsResponse, Error>({
    queryKey: ['transactions', startDate, endDate],
    queryFn: ({ queryKey, signal }) => {
      const [, start, end] = queryKey as [string, string, string];
      return fetchTransactionDateBetween(start, end, signal);
    },
  });
};