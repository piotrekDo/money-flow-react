import type { AddNewMerchant, KnownMerchant } from '@/model/KnownMerchant';
import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';


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