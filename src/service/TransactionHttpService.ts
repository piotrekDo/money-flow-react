import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import type { TransactionRaw, Transaction } from '@/model/Transaction';
import { mapTransaction } from './TransactionService';

export const fetchTransactionDateBetween = (startDate: string, endDate: string, signal?: AbortSignal): Promise<Transaction[]> => {
    return ApiClient.get<TransactionRaw[]>('transactions/date-between', {
        signal,
        params: {
            startDate,
            endDate
        }
    })
        .then((res: AxiosResponse<TransactionRaw[]>) =>
            res.data.map(mapTransaction)
        );
};
