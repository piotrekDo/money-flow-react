import type { FetchFinancialTransactionsResponse, FetchFinancialTransactionsResponseRaw } from '@/model/Transaction';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import { mapFetchTransactionsResponse } from './TransactionService';

export const fetchTransactionDateBetween = (startDate: string, endDate: string, signal?: AbortSignal): Promise<FetchFinancialTransactionsResponse> => {
    return ApiClient.get<FetchFinancialTransactionsResponseRaw>('transactions/date-between', {
        signal,
        params: {
            startDate,
            endDate
        }
    }).then((res: AxiosResponse<FetchFinancialTransactionsResponseRaw>) =>
        mapFetchTransactionsResponse(res.data)
    );
};

export const setKnownMerchantToTransaction = (tranSystemId: number, merchantId: number) => {
    return ApiClient.post<FetchFinancialTransactionsResponseRaw>('transactions/set-known-merchant', {} , {
        params: {
            tranSystemId,
            merchantId
        }
    }).then((res: AxiosResponse<FetchFinancialTransactionsResponseRaw>) =>
        mapFetchTransactionsResponse(res.data)
    );
}
