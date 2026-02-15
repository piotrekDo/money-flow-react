import type { FetchFinancialTransactionsResponse, FetchFinancialTransactionsResponseRaw, Transaction, TransactionRaw } from '@/model/Transaction';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import { mapFetchTransactionsResponse, mapTransaction } from './TransactionService';

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

export const setKnownMerchantToTransaction = (tranSystemId: number, merchantId: number): Promise<Transaction> => {
    return ApiClient.post<TransactionRaw>('transactions/set-known-merchant', {} , {
        params: {
            tranSystemId,
            merchantId
        }
    }).then((res: AxiosResponse<TransactionRaw>) =>
        mapTransaction(res.data)
    );
}

export const recalculatePossibleMerchants = (systemId: number): Promise<Transaction> => {
    return ApiClient.post<TransactionRaw>('transactions/recalculate-possible-merchants-by-id', {} , {
        params: {
            systemId,
        }
    }).then((res: AxiosResponse<TransactionRaw>) =>
        mapTransaction(res.data)
    );
}
