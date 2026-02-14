import type { Transaction } from '@/model/Transaction';
import { VStack, IconButton, HStack, Box, Flex, Text, Badge, } from '@chakra-ui/react'
import { Tooltip } from "@/components/ui/tooltip"
import { BsFillBagPlusFill } from "react-icons/bs";
import { CategoryMissingBadge } from '../CategoryMissingBadge';
import { MerchantAnsureBadge } from '../MerchantAnsureBadge';
import { BadgesSection } from './BadgesSection';
import { HeaderSection } from './HeaderSection';

interface Props {
    tran: Transaction
}

export const TopLeftSide = ({ tran }: Props) => {


    return (
        <VStack w={'75%'} h={'100%'}>
            <HeaderSection tran={tran} />
            <BadgesSection tran={tran} />

            <Tooltip positioning={{ placement: 'bottom-start' }} content={tran.titleRaw}>
                <Flex w={'100%'}>
                    <Text lineClamp={1} maxW={'300px'} color={'blackAlpha.600'}>{tran.titleRaw}</Text>
                </Flex>
            </Tooltip>
            <Flex w={'100%'}>
                <Text fontWeight={'500'} color={'blackAlpha.900'}>{tran.tranDate.toLocaleDateString('pl-PL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</Text>
            </Flex>
        </VStack>
    )
}
