import { HStack } from '@chakra-ui/react';
import React, { useState } from 'react'
import { NavSelectedMonth } from './NavSelectedMonth';
import { NavSelectedYear } from './NavSelectedYear';

interface Props {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

export const CalendarNavigation = ({selectedDate, setSelectedDate}: Props) => {

    return (
        <HStack justify={'center'} color={'blackAlpha.800'} fontWeight={'700'} fontSize={'1.2rem'}>
            <NavSelectedMonth selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
            <NavSelectedYear selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
        </HStack>
    )
}
