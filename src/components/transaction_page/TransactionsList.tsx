import type { Transaction } from '@/model/Transaction'
import { Text, VStack } from '@chakra-ui/react'
import { TransactionCard } from '../transaction/card/TransactionCard'

interface Props {
    filteredTransactions: Transaction[],
}

export const formatDayHeader = (date: Date) =>
    date.toLocaleDateString('pl-PL', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    })

export const TransactionsList = ({ filteredTransactions }: Props) => {
    return (
        <VStack align="stretch" gap={3}>
            {filteredTransactions.map((t, index) => {
                const currentDate = new Date(t.tranDate).toDateString()
                const prevDate =
                    index > 0
                        ? new Date(filteredTransactions[index - 1].tranDate).toDateString()
                        : null

                const showHeader = currentDate !== prevDate

                return (
                    <div key={t.systemId}>
                        {showHeader && (
                            <Text alignSelf="flex-start" color="blackAlpha.800" fontWeight="700" fontSize="md" mb={2}>
                                {formatDayHeader(new Date(t.tranDate))}
                            </Text>
                        )}
                        <TransactionCard tran={t} />
                    </div>
                )
            })}
        </VStack>
    )
}
