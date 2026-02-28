import { DynamicIcon } from "@/components/DynamicIcon";
import { useDashboardCategories } from "@/hooks/useDashboardCategories";
import useSelectedTimeState from "@/state/useSelectedTimeState";
import { HStack, Text, VStack, Badge } from "@chakra-ui/react";
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";

const formatDate = (date: Date) => {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

export const DashboardPage = () => {
    const { selectedDate, selectedMode, setSelectedDate } = useSelectedTimeState();
    const selectedDateString = formatDate(selectedDate)
    const { data: dashboardCategories, isFetching: isFetchingDashbordCategories } = useDashboardCategories(selectedDateString)

    const today = new Date();
    return (
        <VStack w={'100%'} px={10}>
            <HStack w={'100%'} >
                <Text fontSize={'3xl'} fontWeight={'600'}>{today.toLocaleDateString('pl-PL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</Text>
            </HStack>

            <HStack gapX={3} w={'100%'} overflowX={'auto'}>
                {dashboardCategories?.map(cat => {
                    const trend = cat.trendPercent ? cat.trendPercent : 0
                    return (
                        <VStack key={cat.id} flexShrink={0} w={'200px'} h={'150px'} justify={'start'} align={'start'}>
                            <DynamicIcon name={cat.icon} size={40} color={cat.color} />
                            <Text lineClamp={1}>{cat.name}</Text>
                            <HStack>
                                <Text>{cat.totalCurrentMonth != undefined && cat.totalCurrentMonth != null ? cat.totalCurrentMonth.toFixed(2) : '0'}</Text>
                                {!cat.isPositive && (
                                    <Badge variant="subtle" colorPalette={trend == 0 ? 'purple' : trend > 0 ? 'red' : 'green'}>
                                        <Text>{trend.toFixed(2)} %</Text>
                                        {trend > 0 && <FaArrowTrendUp />}
                                        {trend < 0 && <FaArrowTrendDown />}
                                    </Badge>
                                )}
                                {cat.isPositive && (
                                    <Badge variant="subtle" colorPalette={trend == 0 ? 'purple' : trend > 0 ? 'green' : 'red'}>
                                        <Text>{trend.toFixed(2)} %</Text>
                                        {trend > 0 && <FaArrowTrendUp />}
                                        {trend < 0 && <FaArrowTrendDown />}
                                    </Badge>
                                )}
                            </HStack>
                        </VStack>
                    )
                })}
            </HStack>
        </VStack>
    )
}
