import { QUERY_KEY_MERCHANTS } from "@/library"
import type { KnownMerchantWitchTransactions } from "@/model/KnownMerchant"
import { fetchKnownMerchantByIdWithTransactions } from "@/service/KnownMerchantHttpService"
import { useQuery } from "@tanstack/react-query"

export const useKnownMerchantById = (merchantId: number, from: string, to: string) => {
    return useQuery<KnownMerchantWitchTransactions, Error>({
        queryKey: [QUERY_KEY_MERCHANTS, merchantId, from, to],
        queryFn: ({ signal }) => fetchKnownMerchantByIdWithTransactions(merchantId, from, to, signal),
        enabled: !!merchantId
    })
}