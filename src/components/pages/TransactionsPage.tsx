import { useTransactionsPageData } from '@/hooks/useTransactionsPageData'
import { Flex, HStack, Text, VStack } from '@chakra-ui/react'
import { CalendarNavigation } from '../CalendarNavigation'
import { TransactionCardSkeleton } from '../transaction/TransactionCardSkeleton'
import { FiltersSection } from '../transaction_page/FiltersSection'
import { TransactionsList } from '../transaction_page/TransactionsList'
import { TotalsSection } from '../transaction_page/TotalsSection'
import { useSubcategories } from '@/hooks/useSubcategories'

export const TransactionsPage = () => {
    const {
        selectedDate,
        setSelectedDate,
        selectedFilter,
        setSelectedFilter,
        filters,
        totals,
        filteredTransactions,
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

            <FiltersSection
                isBusy={isBusy}
                totals={totals}
                filters={filters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />

            {isLoading && <>
                <TransactionCardSkeleton />
                <TransactionCardSkeleton />
                <TransactionCardSkeleton />
                <TransactionCardSkeleton />

            </>}
            {isError && <Text color="red.500">Błąd ładowania danych</Text>}

            {!isLoading && !isError && (
                <>
                    <TotalsSection totals={totals}/>
                    <TransactionsList filteredTransactions={filteredTransactions} isFetching={isFetching}/>
                </>
            )}
        </VStack>
    )
}
