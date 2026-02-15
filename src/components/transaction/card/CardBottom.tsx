import { Tooltip } from "@/components/ui/tooltip";
import { useSetKnownMerchant } from "@/hooks/useSetKnownMerchant";
import type { Transaction } from "@/model/Transaction";
import { Flex, HStack, Text } from '@chakra-ui/react';
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";

interface Props {
    tran: Transaction
}

export const CardBottom = ({ tran }: Props) => {
    const setKnownMerchant = useSetKnownMerchant();

    const isKnownMerchant = !!tran.knownMerchant;
    const isKnownMerchantUnsure = tran.knownMerchantUnsure;
    const missingCategory = !tran.subcategoryDto;

    const onClickHandle = (merchantId: number) => {
        const tranSystemId = tran.systemId;
        setKnownMerchant.mutate({ tranSystemId, merchantId });
    }


    return (
        <HStack w={'100%'} h={'20%'} justify={'space-between'}>
            <AiFillQuestionCircle size={25} color='#EFA444' />
            <HStack w={'90%'} gap={1}>
                {!isKnownMerchant && tran.possibleMerchants.map(pm => (
                    <Tooltip key={pm.id} content={
                        <>
                            <div>{pm.knownMerchantDto.merchantId }</div>
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
                ))}
            </HStack>
            <FaChevronDown size={20} color='#A6A8AE' cursor={'pointer'} />
        </HStack>
    )
}
