import { HStack } from '@chakra-ui/react';
import { NavSelectedMonth } from './NavSelectedMonth';
import { NavSelectedYear } from './NavSelectedYear';
import type { Mode } from '@/state/useSelectedTimeState';

interface Props {
    selectedDate: Date;
    setSelectedDate: (newDate: Date, newMode: Mode | null) => void
}

export const CalendarNavigation = ({ selectedDate, setSelectedDate }: Props) => {
    return (
        <HStack justify={'center'} color={'blackAlpha.800'} fontWeight={'700'} fontSize={'1.2rem'}>
            <NavSelectedMonth selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <NavSelectedYear selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </HStack>
    )
}
