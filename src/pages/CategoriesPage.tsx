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
                    width: '100wv',
                    height: '99%',
                }}
            >
                <VStack h="100vh" bg="#F5F1EE" gap={5} py={10} color={'blackAlpha.900'} w={'100%'}>
                    <Flex bg="gray.50" p={5} gap={5} w={'80%'} maxW={'1200px'}>
                        <SubcategoreisList selectedSub={selectedSub} setSelectedSub={setSelectedSub} />
                        <SelectedSubcategoryPanel selectedSub={selectedSub} />
                    </Flex>
                </VStack>
            </motion.div>
        </AnimatePresence>
    )
}
