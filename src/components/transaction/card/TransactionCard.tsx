import type { Transaction } from '@/model/Transaction';
import { Flex, HStack, VStack } from '@chakra-ui/react';
import { CardBottom } from './CardBottom';
import { TopLeftSide } from './TopLeftSide';
import { TopRightSide } from './TopRightSide';

interface Props {
    tran: Transaction
}

export const TransactionCard = ({ tran }: Props) => {
    const height = 200;
    const width = height * 3;

    return (
        <VStack h={height} w={width} gap={0} bgColor={'#FEFCFC'} padding={2} borderRadius={10}>
            <HStack w={'100%'} h={'80%'} >
                <TopLeftSide tran={tran} />
                <TopRightSide tran={tran} />
            </HStack>
            <Flex bgColor={'blackAlpha.200'} w={'100%'} height={'1px'} />
            <CardBottom tran={tran} />
        </VStack>
    )
}
