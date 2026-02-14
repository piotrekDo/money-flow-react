import type { Transaction } from '@/model/Transaction';
import { VStack, IconButton, HStack, Stack, Text, Separator, Flex } from '@chakra-ui/react'
import { MoreHorizontal } from "lucide-react";
import { TopRightSide } from './TopRightSide';
import { TopLeftSide } from './TopLeftSide';
import { CardBottom } from './CardBottom';

interface Props {
    tran: Transaction
}

export const TransactionCard = ({ tran }: Props) => {
    const height = 200;
    const width = height * 2.5;

    return (
        <VStack h={height} w={width} gap={0} bgColor={'#FEFCFC'} padding={2} borderRadius={10}>
            <HStack w={'100%'} h={'80%'} >
                <TopLeftSide tran={tran} />
                <TopRightSide tran={tran} />
            </HStack>
            <Flex bgColor={'blackAlpha.200'} w={'100%'} height={'1px'} />
            <CardBottom />
        </VStack>
    )
}
