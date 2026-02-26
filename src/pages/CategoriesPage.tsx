import { SelectedSubcategoryPanel } from '@/components/categories/SelectedSubcategoryPanel';
import { SubcategoreisList } from '@/components/categories/SubcategoreisList';
import type { Subcategory } from '@/model/Category';
import {
    Flex
} from "@chakra-ui/react";
import { useState } from 'react';

export const CategoriesPage = () => {
    const [selectedSub, setSelectedSub] = useState<Subcategory | undefined>(undefined);

    return (
        <Flex bg="gray.50" p={5} gap={5} w={'80%'} maxW={'1200px'}>
            <SubcategoreisList selectedSub={selectedSub} setSelectedSub={setSelectedSub} />
            <SelectedSubcategoryPanel selectedSub={selectedSub} />
        </Flex>
    )
}
