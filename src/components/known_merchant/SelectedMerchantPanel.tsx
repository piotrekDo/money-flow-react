import type { Subcategory } from '@/model/Category';
import type { KnownMerchant } from '@/model/KnownMerchant';
import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { MerchantCategoryModal } from './MerchantCategoryModal';

interface Props {
    selectedMerchant: KnownMerchant | undefined;
    subcategories: Subcategory[]
}

export const SelectedMerchantPanel = ({ selectedMerchant, subcategories }: Props) => {

    return (
        <VStack flex="1" align="stretch" gap={3} minW={'1000px'} >
            {selectedMerchant && (
                <VStack w={'100%'}  >
                    <HStack w={'100%'} justify={'space-between'} >
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

                    <HStack w={'100%'}
                    >
                        {selectedMerchant.subcategories.map(s => (
                            <Flex key={s.id}>{s.name}</Flex>
                        ))}
                        {!selectedMerchant.subcategories || selectedMerchant.subcategories.length == 0 && (<Text>Brak przypisanych podkategorii</Text>)}
                        <MerchantCategoryModal selectedMerchant={selectedMerchant} subcategories={subcategories} />
                    </HStack>
                </VStack>
            )}
        </VStack>
    )
}
