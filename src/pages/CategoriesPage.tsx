import { SelectedSubcategoryPanel } from '@/components/categories/SelectedSubcategoryPanel';
import { SubcategoreisList } from '@/components/categories/SubcategoreisList';
import type { Subcategory } from '@/model/Category';
import {
    Flex,
    VStack
} from "@chakra-ui/react";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';

export const CategoriesPage = () => {
    const [selectedSub, setSelectedSub] = useState<Subcategory | undefined>(undefined);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '-100px', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    width: '99%',
                    height: '99%',
                }}
            >
                <VStack minH="100vh" bg="#F5F1EE" gap={5} py={10} color={'blackAlpha.900'}>
                    <Flex bg="gray.50" p={5} gap={5}>
                        <SubcategoreisList selectedSub={selectedSub} setSelectedSub={setSelectedSub} />
                        <SelectedSubcategoryPanel selectedSub={selectedSub} />
                    </Flex>
                </VStack>
            </motion.div>
        </AnimatePresence>
    )
}
