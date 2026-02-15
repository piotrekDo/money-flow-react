import { useTransactions } from '@/hooks/useTransactions';
import type { Transaction } from '@/model/Transaction';
import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

export type TransactionFilter = {
    name: string;
    count: number;
}

export type Totals = {
    totals: number;
    totalExpense: number;
    totalIncome: number;
    totalCashIn: number;
    totalCashOut: number;
}

export const useTransactionsPageData = (initialDate: Date = new Date(2025, 11, 1)) => {
    const queryClient = useQueryClient();
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

    const filters: TransactionFilter[] = useMemo(() => {
        if (!data) return [
            { name: 'Wszystkie', count: 0 },
            { name: 'Nieznane', count: 0 },
            { name: 'Przychody', count: 0 },
            { name: 'Wydatki', count: 0 },
            { name: 'Bankomat', count: 0 },
        ]
        const counts = {
            Wszystkie: data.allTransactionCount,
            Nieznane: data.unknownMerchantTransactionCount,
            Przychody: data.incomeTransactionCount,
            Wydatki: data.expenseTransactionCount,
            Bankomat: data.cashTransactionCount,
        }

        return Object.entries(counts).map(([name, count]) => ({ name, count }))
    }, [data])

    const totals: Totals = useMemo(() => {
        return {
            totals: data?.totals || 0,
            totalExpense: data?.totalExpense || 0,
            totalIncome: data?.totalIncome || 0,
            totalCashIn: data?.totalCashIn || 0,
            totalCashOut: data?.totalCashOut || 0
        }
    }, [data]);

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


    return {
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
    }
}
