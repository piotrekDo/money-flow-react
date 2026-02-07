import type { AxiosResponse } from 'axios';
import ApiClient from './ApiClient';
import type { KnownMerchant } from '@/model/KnownMerchant';


export const fetchAllKnownMerchants = () => {
  return ApiClient.get<KnownMerchant[]>('merchants/all', {})
  .then((res: AxiosResponse<KnownMerchant[]>) => res.data);
};