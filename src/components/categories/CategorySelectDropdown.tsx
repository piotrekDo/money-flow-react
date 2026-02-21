import { useCategories } from '@/hooks/useCategories';
import { useChangeSubcategoryCategory } from '@/hooks/useChangeSubcategoryCategory';
import type { Subcategory } from '@/model/Category';
import {
    Flex,
    Portal,
    Select,
    Text,
    createListCollection
} from "@chakra-ui/react";
import { useMemo } from 'react';
import { DynamicIcon } from '../DynamicIcon';

interface Props {
    selectedSub: Subcategory;
}

export const CategorySelectDropdown = ({ selectedSub }: Props) => {
    const changeCategory = useChangeSubcategoryCategory();
    const { data: categories } = useCategories();

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
    )
}
