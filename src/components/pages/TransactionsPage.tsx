import { Flex, HStack, VStack } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { TransactionCard } from '../transaction/card/TransactionCard'
import type { Transaction } from '@/model/Transaction'
import { fetchTransactionDateBetween } from '@/service/TransactionHttpService'

export const TransactionsPage = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        fetchTransactionDateBetween('2025-12-06', '2025-12-06')
            .then(t => {
                console.log(t)
                setTransactions(t)
            })
    }, []);

    return (
        <VStack h={'100%'} justifyContent={'center'} bgColor={'#F5F1EE'} gap={5} py={10}>

        <HStack color={'blackAlpha.800'}>
            <Flex>Wszystkie</Flex>
            <Flex>Nieznane</Flex>
            <Flex>Wydatki</Flex>
            <Flex>Przychody</Flex>
            <Flex>Bankomat</Flex>
        </HStack>

            {transactions.map(t => <TransactionCard key={t.systemId} tran={t} />)}
        </VStack>
    )
}
