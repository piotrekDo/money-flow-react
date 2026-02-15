import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import type { KnownMerchant } from '@/model/KnownMerchant';


export const fetchAllKnownMerchants = (signal?: AbortSignal) => {
  return ApiClient.get<KnownMerchant[]>('merchants/all', {signal})
  .then((res: AxiosResponse<KnownMerchant[]>) => res.data);
};