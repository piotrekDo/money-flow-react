import { Flex, HStack, Text, VStack, Spinner } from '@chakra-ui/react'
import { TransactionCard } from '../transaction/card/TransactionCard'
import { CalendarNavigation } from '../CalendarNavigation'
import { useTransactionsPageData } from '@/hooks/useTransactionsPageData'

export const TransactionsPage = () => {
    const {
        selectedDate,
        setSelectedDate,
        selectedFilter,
        setSelectedFilter,
        filters,
        filteredTransactions,
        formatDayHeader,
        isLoading,
        isFetching,
        isError,
    } = useTransactionsPageData();

    const isBusy = isLoading || isFetching;

    return (
        <VStack minH="100vh" bg="#F5F1EE" gap={5} py={10}>
            <CalendarNavigation
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
            />

            {isBusy && <Spinner size="lg" />}
            {isError && <Text color="red.500">Błąd ładowania danych</Text>}

            {!isBusy && !isError && (
                <>
                    <HStack color="blackAlpha.800" w="600px" gap={0} borderRadius={10} overflow="hidden">
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
                                    bgColor={selectedFilter === f.name ? '#C3D8C9' : '#FCE8D2'}
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
                                    <Text alignSelf="flex-start" color="blackAlpha.800" fontWeight="700" fontSize="md" mb={2}>
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
