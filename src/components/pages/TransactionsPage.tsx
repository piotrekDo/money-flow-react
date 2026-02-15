import { Flex, HStack, Text, VStack, Spinner } from '@chakra-ui/react'
import { useMemo, useState } from 'react'
import { TransactionCard } from '../transaction/card/TransactionCard'
import { CalendarNavigation } from '../CalendarNavigation'
import { useTransactions } from '@/hooks/useTransactions'

export const TransactionsPage = () => {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date())
    const [selectedFilter, setSelectedFilter] = useState<string>('Wszystkie')

    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const formatDayHeader = (date: Date) => {
        return date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })
    }

    const from = useMemo(
        () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
        [selectedDate]
    )

    const to = useMemo(
        () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
        [selectedDate]
    )

    const {
        data: transactions = [],
        isLoading,
        isError,
    } = useTransactions(formatDate(from), formatDate(to))

    const filters = useMemo(() => {
        const counts = {
            Wszystkie: transactions.length,
            Nieznane: 0,
            Przychody: 0,
            Wydatki: 0,
            Bankomat: 0,
        }

        transactions.forEach(t => {
            if (!t.knownMerchant) counts.Nieznane++
            if (t.tranType === 'INCOME') counts.Przychody++
            else if (t.tranType === 'EXPENSE') counts.Wydatki++
            else counts.Bankomat++
        })

        return Object.entries(counts).map(([name, count]) => ({
            name,
            count,
        }))
    }, [transactions])

    const filteredTransactions = useMemo(() => {
        switch (selectedFilter) {
            case 'Nieznane':
                return transactions.filter(t => !t.knownMerchant)
            case 'Przychody':
                return transactions.filter(t => t.tranType === 'INCOME')
            case 'Wydatki':
                return transactions.filter(t => t.tranType === 'EXPENSE')
            case 'Bankomat':
                return transactions.filter(
                    t => t.tranType !== 'INCOME' && t.tranType !== 'EXPENSE'
                )
            default:
                return transactions
        }
    }, [transactions, selectedFilter])

    return (
        <VStack minH="100vh" bg="#F5F1EE" gap={5} py={10}>
            <CalendarNavigation
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

            {isLoading && <Spinner size="lg" />}
            {isError && <Text color="red.500">Błąd ładowania danych</Text>}

            {!isLoading && !isError && (
                <>
                    <HStack
                        color="blackAlpha.800"
                        w="600px"
                        gap={0}
                        borderRadius={10}
                        overflow="hidden"
                    >
                        {filters.map(f => (
                            <Flex
                                key={f.name}
                                gap={2}
                                w="100%"
                                justify="center"
                                align="center"
                                bg={selectedFilter === f.name ? '#DAE5DC' : '#FEF6EC'}
                                cursor="pointer"
                                onClick={() => setSelectedFilter(f.name)}
                                py={2}
                                transition="background .2s"
                                borderRadius={selectedFilter === f.name ? '10px' : 0}
                            >
                                <Text>{f.name}</Text>
                                <Text
                                    fontWeight="600"
                                    bgColor={
                                        selectedFilter === f.name ? '#C3D8C9' : '#FCE8D2'
                                    }
                                    px={2}
                                    borderRadius="10px"
                                >
                                    {f.count}
                                </Text>
                            </Flex>
                        ))}
                    </HStack>

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
                                    <Text
                                        alignSelf="flex-start"
                                        color="blackAlpha.800"
                                        fontWeight="700"
                                        fontSize="md"
                                        mb={2}
                                    >
                                        {formatDayHeader(new Date(t.tranDate))}
                                    </Text>
                                )}

                                <TransactionCard tran={t} />
                            </div>
                        )
                    })}
                </>
            )}
        </VStack>
    )
}
