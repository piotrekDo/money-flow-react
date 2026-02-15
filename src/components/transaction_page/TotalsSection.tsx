import type { Totals } from '@/hooks/useTransactionsPageData'
import { Flex, HStack, Text, VStack } from '@chakra-ui/react'

interface Props {
    totals: Totals
}

export const TotalsSection = ({ totals }: Props) => {
    return (
        <VStack w={'600px'} color={'blackAlpha.900'} gap={0} align={'end'}>
            <HStack width={'200px'} justify={'space-between'}>
                <Text>Przychód:</Text>
                <Text>{totals.totalIncome.toFixed(2)} zł</Text>
            </HStack>
            <HStack width={'200px'} justify={'space-between'}>
                <Text>Wydatki:</Text>
                <Text>{totals.totalExpense.toFixed(2)} zł</Text>
            </HStack>
            <Flex bgColor={'blackAlpha.200'} w={'250px'} height={'1px'} />
            <HStack width={'200px'} justify={'space-between'}>
                <Text>Razem: </Text>
                <Text>{totals.totals.toFixed(2)} zł</Text>
            </HStack>
        </VStack>
    )
}
