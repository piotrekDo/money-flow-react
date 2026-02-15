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
  'Sierpień',
  'Wrzesień',
  'Październik',
  'Listopad',
  'Grudzień',
];

export const NavSelectedMonth = ({ selectedDate, setSelectedDate }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex
      position="relative"
      minW="135px"
      w="100%"
      justify="center"
      align="center"
      p={1}
      borderRadius="10px 10px 0 0"
      cursor="pointer"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      bg={isOpen ? '#FEFCFC' : 'transparent'}
      transition="background .2s ease"
    >
      {selectedDate
        .toLocaleString('pl-PL', { month: 'long' })
        .toLocaleUpperCase('pl-PL')}

      <VStack
        position="absolute"
        top="100%"
        left={0}
        w="100%"
        zIndex={10}
        gap={0}
        opacity={isOpen ? 1 : 0}
        visibility={isOpen ? 'visible' : 'hidden'}
        pointerEvents={isOpen ? 'auto' : 'none'}
        transition="opacity .2s ease"
        bg="#FEFCFC"
        boxShadow="md"
      >
        {monthNames.map((name, index) => (
          <Button
            key={index}
            w="100%"
            borderRadius={0}
            variant="ghost"
            onClick={() => {
              setSelectedDate(
                date => new Date(date.getFullYear(), index, 1)
              );
              setIsOpen(false);
            }}
          >
            {name}
          </Button>
        ))}
      </VStack>
    </Flex>
  );
};
