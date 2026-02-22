import { Tooltip } from "@/components/ui/tooltip";
import type { Transaction } from '@/model/Transaction';
import { Flex, Text, VStack } from '@chakra-ui/react';
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
