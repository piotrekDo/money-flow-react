import { useSubcategories } from '@/hooks/useSubcategories'
import type { Transaction } from '@/model/Transaction'
import { Box, HStack, Text } from '@chakra-ui/react'
import { useMemo, useRef } from 'react'
import { GroupedVirtuoso } from 'react-virtuoso'
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

export const TransactionsList = ({ filteredTransactions, isFetching, }: Props) => {
  const virtuoso = useRef<any>(null)

  const { data: subcategories } = useSubcategories()

  const { sorted, groups, groupCounts, firstItemIndexes } = useMemo(() => {
    const sorted = [...filteredTransactions].sort(
      (a, b) => new Date(b.tranDate).getTime() - new Date(a.tranDate).getTime()
    )

    type Group = { date: Date; count: number; sum: number }

    const map = new Map<string, Group>()
    for (const t of sorted) {
      const d = new Date(t.tranDate)
      const key = d.toDateString()
      if (!map.has(key)) map.set(key, { date: d, count: 0, sum: 0 })
      const g = map.get(key)!
      g.count += 1
      g.sum += t.amount
    }

    const groups = Array.from(map.values())
    const groupCounts = groups.map(g => g.count)

    const firstItemIndexes = groupCounts.reduce(
      ({ firsts, offset }, count) => ({
        firsts: [...firsts, offset],
        offset: offset + count,
      }),
      { firsts: [] as number[], offset: 0 }
    ).firsts

    return { sorted, groups, groupCounts, firstItemIndexes }
  }, [filteredTransactions])

  return (
    <HStack justify={'start'} h="70vh" align={'start'} position={'relative'}>
      <Box w={'700px'} h="70vh" color={'blackAlpha.800'} 
     >
        <GroupedVirtuoso
          ref={virtuoso}
          style={{ height: '100%' }}
          groupCounts={groupCounts}
          groupContent={groupIndex => {
            const group = groups[groupIndex]
            if (!group) return <div style={{ height: 32 }} />

            return (
              <Box key={groupIndex} px={3} py={2} bg='#F5F1EE'>
                <Text fontWeight="700">
                  {formatDayHeader(group.date)} {group.count} transakcje — {group.sum.toFixed(2)} zł
                </Text>
              </Box>
            )
          }}

          itemContent={(itemIndex, groupIndex) => {
            const group = groups[groupIndex]
            if (!group) return <div style={{ height: 80 }} />
            const t = sorted[itemIndex]
            if (!t) return <div style={{ height: 250, backgroundColor: '' }} >{itemIndex} g: {groupIndex}</div>

            return (
              <Box key={itemIndex + ' ' + groupIndex} px={2} py={2}>
                <TransactionCard
                  tran={t}
                  isFetching={isFetching}
                  subcategories={subcategories || []}
                />
              </Box>
            )
          }}
        />
      </Box>

      <Box position={'absolute'} right={'-300px'} h="70vh" overflowY="auto"   >
        {groups.map((group, index) => (
          <Box key={index} py={1}>
            <Text
              cursor="pointer"
              color="blue.500"
              onClick={() => {
                virtuoso.current?.scrollToIndex({ index: firstItemIndexes[index] })
              }}
            >
              {formatDayHeader(group.date)}
            </Text>
          </Box>
        ))}
      </Box>
    </HStack>
  )
}
