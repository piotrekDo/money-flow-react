import { useAddSubcategoryToMerchant } from '@/hooks/useAddSubcategoryToMerchant';
import { useKnownMerchants } from '@/hooks/useKnownMerchants';
import { useSubcategories } from '@/hooks/useSubcategories';
import type { KnownMerchant } from '@/model/KnownMerchant';
import {
  CloseButton,
  Dialog,
  Flex,
  HStack,
  Portal,
  Text,
  VStack
} from "@chakra-ui/react";
import { PlusCircleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DynamicIcon } from '../DynamicIcon';

export const KnownMerchantsPage = () => {
  const addSubcategoryToMerchant = useAddSubcategoryToMerchant();
  const { data: subcategories } = useSubcategories();
  const { data: merchants } = useKnownMerchants();
  const [selectedMerchant, setSelectedMerchant] = useState<KnownMerchant | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const subsFiltered = useMemo(() => {
    if (!subcategories) return [];

    if (!selectedMerchant) return subcategories;

    const assignedIds = new Set(
      selectedMerchant.subcategories.map(s => s.id)
    );

    return subcategories
      .filter(sub => !assignedIds.has(sub.id))
      .filter(sub => sub.name.toLowerCase().includes(searchTerm.toLowerCase()));

  }, [subcategories, selectedMerchant, searchTerm]);


  const onAddSubcategoryToMerchant = (subcategoryId: number) => {
    if (!selectedMerchant) return;
    const merchantId = selectedMerchant?.merchantId;
    addSubcategoryToMerchant.mutate({ merchantId, subcategoryId, selectedMerchant })
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
          {merchants?.map(merchant => (
            <HStack
              w={'100%'}
              key={merchant.merchantId}
              p={3}
              bg={merchant.merchantId == selectedMerchant?.merchantId ? 'gray.300' : 'gray.100'}
              borderRadius="md"
              cursor="pointer"
              _hover={{ bg: 'gray.200' }}
              justify={'start'}
              alignItems={'start'}
              gap={3}
              onClick={() => setSelectedMerchant(merchant)}
            >
              <Flex>
                <img
                  src={`/merchant_icons/${merchant.merchantCode || 'UNKNOWN'}.png`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = '/merchant_icons/GENERIC.png';
                  }}
                  style={{
                    height: '30px',
                    objectFit: 'contain',
                    borderRadius: '50px',
                  }}
                  referrerPolicy='no-referrer'
                />
              </Flex>
              <VStack justify={'start'} align={'start'} gap={0}>
                <Text fontWeight={'600'}>{merchant.merchantName}</Text>
              </VStack>
            </HStack>
          ))}
        </VStack>

        <VStack flex="1" align="stretch" gap={3} minW={'1000px'} >
          {selectedMerchant && (
            <VStack w={'100%'}  >
              <HStack w={'100%'} justify={'space-between'}>
                <HStack >
                  <Flex>
                    <img
                      src={`/merchant_icons/${selectedMerchant.merchantCode || 'UNKNOWN'}.png`}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = '/merchant_icons/GENERIC.png';
                      }}
                      style={{
                        height: '30px',
                        objectFit: 'contain',
                        borderRadius: '50px',
                      }}
                      referrerPolicy='no-referrer'
                    />
                  </Flex>
                  <VStack justify={'start'} align={'start'} gap={0} w={'100%'} maxW={'500px'}>
                    <Text fontWeight={'600'} fontSize={'3xl'}>{selectedMerchant.merchantName}</Text>
                  </VStack>
                </HStack>
                <Flex>
                  <Text fontSize={'xl'} fontWeight={'700'}>ID: {selectedMerchant.merchantId}</Text>
                </Flex>
              </HStack>

              <HStack w={'100%'} >
                {selectedMerchant.subcategories.map(s => (
                  <Flex key={s.id}>{s.name}</Flex>
                ))}
                {!selectedMerchant.subcategories || selectedMerchant.subcategories.length == 0 && (<Text>Brak przypisanych podkategorii</Text>)}


                <Dialog.Root
                  key={selectedMerchant.merchantId}
                  placement={'center'}
                  motionPreset="slide-in-bottom"
                  onOpenChange={(open) => {
                    setSearchTerm('');
                  }}
                >
                  <Dialog.Trigger asChild>
                    <PlusCircleIcon cursor={'pointer'} />
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content>
                        <Dialog.Header>
                          <Dialog.Title>Dodaj podkategorię</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          <input
                            type="text"
                            placeholder="Szukaj podkategorii..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border: '1px solid #ccc',
                              marginBottom: '10px',
                            }}
                          />
                          <HStack w={'100%'} flexWrap={'wrap'}>
                            {subsFiltered?.map(s => (
                              <Flex
                                key={s.id}
                                cursor={'pointer'}
                                w={'fit-content'}
                                justify={'center'}
                                align={'center'}
                                spaceX={2}
                                border={'solid 1px'}
                                borderRadius={'10px'}
                                px={2}
                                onClick={() => {
                                  onAddSubcategoryToMerchant(s.id);
                                  setSearchTerm('')
                                }}
                              >
                                <DynamicIcon name={s.icon} color={s.color} />
                                <Text>{s.name}</Text>
                              </Flex>
                            ))}
                          </HStack>
                        </Dialog.Body>
                        <Dialog.CloseTrigger asChild>
                          <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                      </Dialog.Content>
                    </Dialog.Positioner>
                  </Portal>
                </Dialog.Root>


              </HStack>
            </VStack>
          )}
        </VStack>
      </Flex>




    </VStack>
  )
}
