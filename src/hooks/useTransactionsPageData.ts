// hooks/useTransactionsPageData.ts
import { useMemo, useState } from 'react'
import { useTransactions } from '@/hooks/useTransactions'
import type { Transaction } from '@/model/Transaction'

export const useTransactionsPageData = (initialDate: Date = new Date()) => {
    const [selectedDate, setSelectedDate] = useState<Date>(initialDate)
    const [selectedFilter, setSelectedFilter] = useState<string>('Wszystkie')

    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const from = useMemo(
        () => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1),
        [selectedDate]
    )
    const to = useMemo(
        () => new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0),
        [selectedDate]
    )

    const { data, isLoading, isFetching, isError } = useTransactions(
        formatDate(from),
        formatDate(to)
    )

    const filters = useMemo(() => {
        if (!data) return []
        const counts = {
            Wszystkie: data.allTransactionCount,
            Nieznane: data.unknownMerchantTransactionCount,
            Przychody: data.incomeTransactionCount,
            Wydatki: data.expenseTransactionCount,
            Bankomat: data.cashTransactionCount,
        }

        return Object.entries(counts).map(([name, count]) => ({ name, count }))
    }, [data])

    const filteredTransactions = useMemo<Transaction[]>(() => {
        if (!data?.transactions) return []

        switch (selectedFilter) {
            case 'Nieznane':
                return data.transactions.filter(t => !t.knownMerchant)
            case 'Przychody':
                return data.transactions.filter(t => t.tranType === 'INCOME')
            case 'Wydatki':
                return data.transactions.filter(t => t.tranType === 'EXPENSE')
            case 'Bankomat':
                return data.transactions.filter(
                    t => t.tranType !== 'INCOME' && t.tranType !== 'EXPENSE'
                )
            default:
                return data.transactions
        }
    }, [data?.transactions, selectedFilter])

    const formatDayHeader = (date: Date) =>
        date.toLocaleDateString('pl-PL', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        })

    return {
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
    }
}
