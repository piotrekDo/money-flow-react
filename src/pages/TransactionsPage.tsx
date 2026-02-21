import { useTransactionsPageData } from '@/hooks/useTransactionsPageData'
import { Text, VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarNavigation } from '../components/CalendarNavigation'
import { TransactionCardSkeleton } from '../components/transaction/TransactionCardSkeleton'
import { FiltersSection } from '../components/transaction_page/FiltersSection'
import { TotalsSection } from '../components/transaction_page/TotalsSection'
import { TransactionsList } from '../components/transaction_page/TransactionsList'

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
        <AnimatePresence>
            <motion.div
                initial={{ x: '-100px', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    width: '99%',
                    height: '99%',
                }}
            >
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
                            <TotalsSection totals={totals} />
                            <TransactionsList filteredTransactions={filteredTransactions} isFetching={isFetching} />
                        </>
                    )}
                </VStack>
            </motion.div>
        </AnimatePresence>
    )
}
