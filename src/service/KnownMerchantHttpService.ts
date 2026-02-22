import type { AddNewMerchant, KnownMerchant, KnownMerchantWitchTransactions, KnownMerchantWitchTransactionsRaw } from '@/model/KnownMerchant';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import { mapTransactions } from './TransactionService';

export const fetchKnownMerchantByIdWithTransactions = (merchantId: number, startDate: string, endDate: string, signal?: AbortSignal): Promise<KnownMerchantWitchTransactions> => {
  return ApiClient.get<KnownMerchantWitchTransactionsRaw>('merchants/by-id-witch-transactions', {
    signal,
    params: {
      merchantId,
      startDate,
      endDate
    }
  }).then((res: AxiosResponse<KnownMerchantWitchTransactionsRaw>) => {
    const mappedTransactions = mapTransactions(res.data.transactions)
    return {
      ...res.data,
      transactions: mappedTransactions
    }
  })
}

export const fetchAllKnownMerchants = (signal?: AbortSignal) => {
  return ApiClient.get<KnownMerchant[]>('merchants/all', { signal })
    .then((res: AxiosResponse<KnownMerchant[]>) => res.data);
};

export const addSubcategoryToMerchant = (merchantId: number, subcategoryId: number) => {
  return ApiClient.post<KnownMerchant>('merchants/add-subcategory', {}, {
    params: {
      merchantId,
      subcategoryId
    }
  }).then((res: AxiosResponse<KnownMerchant>) => res.data)
}

export const addNewKnownMerchant = (merchant: AddNewMerchant) => {
  return ApiClient.post<KnownMerchant>('merchants/add-new', merchant)
    .then(res => res.data)
}