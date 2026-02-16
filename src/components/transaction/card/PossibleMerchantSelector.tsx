import { Tooltip } from "@/components/ui/tooltip";
import type { PossibleMerchant } from "@/model/KnownMerchant";
import { Flex, Text } from '@chakra-ui/react';

interface Props {
    pm: PossibleMerchant;
    onClickHandle: (merchantId: number) => void
}

export const PossibleMerchantSelector = ({ pm, onClickHandle }: Props) => {
    return (
        <Tooltip content={
            <>
                <div>{pm.knownMerchantDto.merchantId}</div>
                <div>{pm.knownMerchantDto.merchantName}</div>
                <div>Dopasowania: {pm.matchedKeywords}</div>
                <div>Punkty: {pm.points}</div>
            </>
        }>
            <Flex bgColor={'#2B8D63'} borderRadius={'10px'} px={2} justify={'center'} align={'center'} cursor={'pointer'}
                onClick={() => onClickHandle(pm.knownMerchantDto.merchantId)}>
                <Text lineClamp={1} maxW={'80px'} color={'whiteAlpha.800'} textAlign={'center'}>{pm.knownMerchantDto.merchantName}</Text>
            </Flex>
        </Tooltip>
    )
}
