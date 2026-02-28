export interface CategorySpendingDto {
    id: number;
    color: string;
    imageUrl: string;
    name: string;
    icon: string;
    isPositive: boolean;
    totalCurrentMonth: number;
    transactionsCountCurrentMonth: number;
    averageLastThreeMonths: number;
    trendPercent: number;
}

