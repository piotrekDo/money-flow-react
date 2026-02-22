import { useKnownMerchants } from '@/hooks/useKnownMerchants';
import { useSubcategories } from '@/hooks/useSubcategories';
import type { KnownMerchant } from '@/model/KnownMerchant';
import {
  Flex,
  VStack
} from "@chakra-ui/react";
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { KnownMerchantsList } from '../components/known_merchant/KnownMerchantsList';
import { SelectedMerchantPanel } from '../components/known_merchant/SelectedMerchantPanel';

export const KnownMerchantsPage = () => {
  const { data: subcategories } = useSubcategories();
  const { data: merchants, isLoading: merchantsLoading, isFetching: merchantsFetching } = useKnownMerchants();
  const [selectedMerchant, setSelectedMerchant] = useState<KnownMerchant | undefined>(undefined);

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
        <VStack minH="100vh" bg="#F5F1EE" gap={5} py={10} color={'blackAlpha.900'} w={'100%'}>
          <Flex bg="gray.50" p={5} gap={5} w={'80%'} maxW={'1200px'}>
            <KnownMerchantsList isMerchantsLoading={merchantsLoading || merchantsFetching} merchants={merchants || []} selectedMerchant={selectedMerchant} setSelectedMerchant={setSelectedMerchant} />
            <SelectedMerchantPanel selectedMerchant={selectedMerchant} subcategories={subcategories || []} />
          </Flex>
        </VStack>
      </motion.div>
    </AnimatePresence>
  )
}
