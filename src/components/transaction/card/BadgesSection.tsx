import type { Transaction } from '@/model/Transaction';
import { VStack, IconButton, HStack, Box, Flex, Text, Badge, } from '@chakra-ui/react'
import { Tooltip } from "@/components/ui/tooltip"
import { BsFillBagPlusFill } from "react-icons/bs";
import { CategoryMissingBadge } from '../CategoryMissingBadge';
import { MerchantAnsureBadge } from '../MerchantAnsureBadge';
import { UnknownMerchantBadge } from '../UnknownMerchantBadge';

interface Props {
    tran: Transaction
}

export const BadgesSection = ({ tran }: Props) => {
    const isKnownMerchant = !!tran.knownMerchant;
    const isKnownMerchantUnsure = tran.knownMerchantUnsure;
    const missingCategory = !tran.subcategoryDto;

    return (
        <HStack w={'100%'}>
            {!isKnownMerchant && <UnknownMerchantBadge />}
            {isKnownMerchant && isKnownMerchantUnsure && <MerchantAnsureBadge />}
            {missingCategory && <CategoryMissingBadge />}
        </HStack>
    )
}
