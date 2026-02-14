import { Flex, VStack, Button } from '@chakra-ui/react';
import React, { useState } from 'react';

interface Props {
    selectedDate: Date;
    setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const monthNames = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Spierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
];

export const NavSelectedMonth = ({ selectedDate, setSelectedDate }: Props) => {
    const [isMonthHovering, setIsMonthHovering] = useState<boolean>(false);
    return (
        <Flex
            pos={'relative'}
            onMouseEnter={e => setIsMonthHovering(true)}
            onMouseLeave={e => setIsMonthHovering(false)}
            p={1}
            minW={'135px'}
            w={'100%'}
            color={isMonthHovering ? 'blackAlpha.900' : 'blackAlpha.900'}
            borderRadius={'10px 10px 0 0'}
            background={isMonthHovering ? '#FEFCFC' : 'transparent'}
            transition={'color .25s'}
            justify={'center'}
        >
            {selectedDate.toLocaleString('pl-PL', { month: 'long' }).toLocaleUpperCase('pl-PL')}
            <VStack
                pos={'absolute'}
                top={'100%'}
                left={0}
                w={'100%'}
                fontSize={isMonthHovering ? 1.2 : 1}
                opacity={isMonthHovering ? 1 : 0}
                transition={'opacity .25s'}
                zIndex={2}
                gap={0}
                pointerEvents={isMonthHovering ? "auto" : "none"} // 🔥 KLUCZOWE

            >
                {monthNames.map((name, index) => (
                    <Button
                        key={index}
                        w={'100%'}
                        borderRadius={0}
                        color={'blackAlpha.900'}
                        fontSize={index === 9 ? '.9rem' : '1rem'}
                        onClick={e => {
                            setSelectedDate(date => new Date(date.getFullYear(), index, 1));
                        }}
                    >
                        {name}
                    </Button>
                ))}
            </VStack>
        </Flex>
    )
}
