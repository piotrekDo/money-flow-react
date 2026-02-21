import { useSubcategories } from '@/hooks/useSubcategories';
import type { Subcategory } from '@/model/Category';
import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { DynamicIcon } from '../DynamicIcon';

interface Props {
    selectedSub: Subcategory | undefined;
    setSelectedSub: React.Dispatch<React.SetStateAction<Subcategory | undefined>>
}

export const SubcategoreisList = ({ selectedSub, setSelectedSub }: Props) => {
    const { data: subs } = useSubcategories();

    return (
        <VStack
            w="250px"
            maxH={'90vh'}
            overflowY={'scroll'}
            align="stretch"
            gap={3}
            bg="white"
            p={3}
            borderRadius="md"
            shadow="sm"
            justify={'start'}
            alignItems={'start'}
            gapY={1}
        >
            {subs?.map(sub => (
                <HStack
                    w={'100%'}
                    key={sub.name}
                    p={3}
                    bg={sub.id == selectedSub?.id ? 'gray.300' : 'gray.100'}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: 'gray.200' }}
                    justify={'start'}
                    alignItems={'start'}
                    gap={3}
                    onClick={() => setSelectedSub(sub)}
                >
                    <Flex>
                        <DynamicIcon name={sub.icon} size={40} color={sub.color} />
                    </Flex>
                    <VStack justify={'start'} align={'start'} gap={0}>
                        <Text fontWeight={'600'} fontSize={'md'}>{sub.name}</Text>
                        <Text fontWeight={'500'} fontSize={'xs'} fontStyle={'italic'}>{sub.categoryName || 'Brak przypisanej kategorii'}</Text>
                    </VStack>
                </HStack>
            ))}
        </VStack>
    )
}
