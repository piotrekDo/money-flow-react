import type { Transaction } from '@/model/Transaction';
import { VStack, IconButton, HStack, Box, Flex, Text, Badge, } from '@chakra-ui/react'
import { Tooltip } from "@/components/ui/tooltip"
import { BsFillBagPlusFill } from "react-icons/bs";
import { CategoryMissingBadge } from '../CategoryMissingBadge';
import { MerchantAnsureBadge } from '../MerchantAnsureBadge';
import { BadgesSection } from './BadgesSection';

interface Props {
    tran: Transaction
}

export const HeaderSection = ({ tran }: Props) => {
    return (
        <Tooltip positioning={{ placement: 'bottom-start' }} content={tran.merchantDataRaw}>
            <HStack w={'100%'} mb={2}>
                <img
                    src={`/merchant_icons/${tran.knownMerchant?.merchantCode || 'UNKNOWN'}.png`}
                    onError={(e) => {
                        e.currentTarget.onerror = null; // zapobiega pętli, jeśli GENERIC też nie istnieje
                        e.currentTarget.src = '/merchant_icons/GENERIC.png';
                    }}
                    style={{
                        height: '30px',
                        objectFit: 'contain',
                        borderRadius: '50px',
                    }}
                    referrerPolicy='no-referrer'
                />
                <Text lineClamp={1} maxW={'250px'} alignSelf={'flex-start'} fontSize={''} fontWeight={'600'} color={tran.knownMerchant ? 'blackAlpha.800' : 'orange.400'}>{tran.knownMerchant?.merchantName || tran.merchantDataRaw}</Text>
            </HStack>
        </Tooltip>
    )
}
