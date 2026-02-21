import { useSubcategoryWithMerchants } from '@/hooks/useSubcategoryWithMerchants';
import type { Subcategory } from '@/model/Category';
import {
    Flex,
    HStack,
    Text,
    VStack
} from "@chakra-ui/react";
import { DynamicIcon } from '../DynamicIcon';
import { CategorySelectDropdown } from './CategorySelectDropdown';

interface Props {
    selectedSub: Subcategory | undefined;
}

export const SelectedSubcategoryPanel = ({ selectedSub }: Props) => {
    const { data: subcatFetched } = useSubcategoryWithMerchants(selectedSub?.id)
    return (
        <VStack flex="1" align="stretch" gap={3} minW={'1000px'}>
            {selectedSub && (
                <VStack w={'100%'}  >
                    <HStack w={'100%'} >
                        <Flex>
                            <DynamicIcon name={subcatFetched ? subcatFetched.icon : selectedSub.icon} size={80} color={subcatFetched ? subcatFetched.color : selectedSub.color} />
                        </Flex>
                        <VStack justify={'start'} align={'start'} gap={0} w={'100%'} maxW={'500px'}>
                            <Text fontWeight={'600'} fontSize={'3xl'}>{selectedSub.name}</Text>
                            <CategorySelectDropdown selectedSub={selectedSub} />
                        </VStack>

                    </HStack>
                    <HStack w={'100%'} mt={10} flexWrap={'wrap'} >
                        {subcatFetched && subcatFetched.merchants.map(m => (
                            <Flex key={m.merchantId} border={'solid 1px'} px={3} py={2} borderRadius={'20px'}>
                                <Flex>
                                    <img
                                        src={`/merchant_icons/${m.merchantCode || 'UNKNOWN'}.png`}
                                        onError={(e) => {
                                            e.currentTarget.onerror = null;
                                            e.currentTarget.src = '/merchant_icons/GENERIC.png';
                                        }}
                                        style={{
                                            height: '20px',
                                            objectFit: 'contain',
                                            borderRadius: '50px',
                                        }}
                                        referrerPolicy='no-referrer'
                                    />
                                </Flex>
                                <Text>{m.merchantName}</Text>
                            </Flex>
                        ))}
                    </HStack>
                </VStack>
            )}
        </VStack>
    )
}
