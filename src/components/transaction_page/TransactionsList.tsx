import { useMemo } from 'react'
import { useSubcategories } from '@/hooks/useSubcategories'
import type { Transaction } from '@/model/Transaction'
import { Text, VStack } from '@chakra-ui/react'
import { TransactionCard } from '../transaction/card/TransactionCard'

interface Props {
  filteredTransactions: Transaction[]
  isFetching: boolean
}

export const formatDayHeader = (date: Date) =>
  date.toLocaleDateString('pl-PL', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

export const TransactionsList = ({
  filteredTransactions,
  isFetching,
}: Props) => {
  const { data: subcategories } = useSubcategories()

  const groupedTransactions = useMemo(() => {
    const map = new Map<
      string,
      {
        date: Date
        transactions: Transaction[]
        sum: number
      }
    >()

    for (const t of filteredTransactions) {
      const dateObj = new Date(t.tranDate)
      const key = dateObj.toDateString()

      if (!map.has(key)) {
        map.set(key, {
          date: dateObj,
          transactions: [],
          sum: 0,
        })
      }

      const group = map.get(key)!
      group.transactions.push(t)
      group.sum += t.amount
    }

    return Array.from(map.values())
  }, [filteredTransactions])

  return (
    <VStack align="stretch" gap={5}>
      {groupedTransactions.map(group => (
        <VStack key={group.date.toDateString()} align="stretch" gap={2}>
          <Text
            alignSelf="flex-start"
            color="blackAlpha.800"
            fontWeight="700"
            fontSize="md"
          >
            {formatDayHeader(group.date)} — {group.sum.toFixed(2)} zł
          </Text>

          {group.transactions.map(t => (
            <TransactionCard
              key={t.systemId}
              tran={t}
              isFetching={isFetching}
              subcategories={subcategories || []}
            />
          ))}
        </VStack>
      ))}
    </VStack>
  )
}
