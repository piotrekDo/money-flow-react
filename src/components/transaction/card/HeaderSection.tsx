import { Tooltip } from "@/components/ui/tooltip";
import type { Transaction } from '@/model/Transaction';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";

interface Props {
    tran: Transaction
}

export const HeaderSection = ({ tran }: Props) => {
    const navigate = useNavigate();

    const handleMerchantClick = () => {
        const id = tran.knownMerchant?.merchantId;
        if (!id || id === 0) return; // brak znanego merchanta
        navigate(`/merchants/${id}`);
    };

    return (
        <HStack w={'100%'} justify={'space-between'} alignItems={'start'} >
            <Tooltip positioning={{ placement: 'bottom-start' }} content={tran.merchantDataRaw}>
                <HStack w={'80%'} mb={2} cursor={'pointer'} onClick={handleMerchantClick}>
                    <img
                        src={`/merchant_icons/${tran.knownMerchant?.merchantCode || 'UNKNOWN'}.png`}
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/merchant_icons/GENERIC.png';
                        }}
                        style={{
                            height: '30px',
                            objectFit: 'contain',
                            borderRadius: '50px',
                        }}
                        referrerPolicy='no-referrer'
                    />
                    <Text
                        lineClamp={1}
                        maxW={'250px'}
                        alignSelf={'flex-start'}
                        fontSize={''}
                        fontWeight={'600'}
                        color={!tran.knownMerchant || tran.knownMerchant.merchantId == 0 ? 'orange.400' : 'blackAlpha.800'}
                    >
                        {tran.knownMerchant?.merchantName && tran.knownMerchant.merchantId != 0 ? tran.knownMerchant.merchantName : tran.merchantDataRaw}
                    </Text>
                </HStack>
            </Tooltip>
            <Flex align={'start'} >
                <Text color={'blackAlpha.700'}> ID: {tran.systemId}</Text>
            </Flex>
        </HStack>
    )
}
