import { useCategories } from '@/hooks/useCategories';
import { useChangeSubcategoryCategory } from '@/hooks/useChangeSubcategoryCategory';
import { useSubcategories } from '@/hooks/useSubcategories';
import type { Subcategory } from '@/model/Category';
import {
    Flex,
    HStack,
    Portal,
    Select,
    Text,
    VStack,
    createListCollection
} from "@chakra-ui/react";
import { useMemo, useState } from 'react';
import { DynamicIcon } from '../DynamicIcon';

export const CategoriesPage = () => {
    const changeCategory = useChangeSubcategoryCategory();
    const { data: subs } = useSubcategories();
    const { data: categories } = useCategories();
    const [selectedSub, setSelectedSub] = useState<Subcategory | undefined>(undefined);

    const categoryCollection = useMemo(() => {
        return createListCollection({
            items: (categories ?? []).map(cat => ({
                value: String(cat.id),
                label: cat.name,
                icon: cat.icon,
                color: cat.color,
            })),
        })
    }, [categories])

    const onChangeCategory = (categoryId: number) => {
        if (!selectedSub) return;
        const subCategoryId = selectedSub?.id;
        changeCategory.mutate({ subCategoryId, categoryId })
    }


    return (
        <VStack minH="100vh" bg="#F5F1EE" gap={5} py={10} color={'blackAlpha.900'}>
            <Flex bg="gray.50" p={5} gap={5}>
                <VStack
                    w="300px"
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
                                <DynamicIcon name={sub.icon} size={50} color={sub.color} />
                            </Flex>
                            <VStack justify={'start'} align={'start'} gap={0}>
                                <Text fontWeight={'600'}>{sub.name}</Text>
                                <Text fontWeight={'500'} fontSize={'.8rem'} fontStyle={'italic'}>{sub.categoryName || 'Brak przypisanej kategorii'}</Text>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>

                <VStack flex="1" align="stretch" gap={3} minW={'1000px'}>
                    {selectedSub && (
                        <VStack w={'100%'}  >
                            <HStack w={'100%'} >
                                <Flex>
                                    <DynamicIcon name={selectedSub.icon} size={80} color={selectedSub.color} />
                                </Flex>
                                <VStack justify={'start'} align={'start'} gap={0} w={'100%'} maxW={'500px'}>
                                    <Text fontWeight={'600'} fontSize={'3xl'}>{selectedSub.name}</Text>

                                    <Select.Root
                                        key={selectedSub?.id}
                                        collection={categoryCollection}
                                        defaultValue={[String(selectedSub.categoryId)]}
                                        onValueChange={(val) => {
                                            onChangeCategory(+val.items[0].value)
                                        }}
                                    >
                                        <Select.HiddenSelect />
                                        <Select.Control>
                                            <Select.Trigger>
                                                <Select.ValueText placeholder={'Brak przypisanej kategorii'} />
                                            </Select.Trigger>
                                            <Select.IndicatorGroup>
                                                <Select.Indicator />
                                            </Select.IndicatorGroup>
                                        </Select.Control>
                                        <Portal>
                                            <Select.Positioner>
                                                <Select.Content>
                                                    {categoryCollection.items.map(item => (
                                                        <Select.Item key={item.value} item={item}>
                                                            <Flex align="center" gap={2}>
                                                                <DynamicIcon name={item.icon} color={item.color} size={20} />
                                                                <Text>{item.label}</Text>
                                                            </Flex>
                                                            <Select.ItemIndicator />
                                                        </Select.Item>
                                                    ))}
                                                </Select.Content>
                                            </Select.Positioner>
                                        </Portal>
                                    </Select.Root>
                                </VStack>
                            </HStack>
                        </VStack>
                    )}
                </VStack>
            </Flex>
        </VStack>
    )
}
