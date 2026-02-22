import type { KnownMerchant } from '@/model/KnownMerchant';
import {
    CloseButton,
    Flex,
    HStack,
    Input, InputGroup,
    SkeletonCircle,
    SkeletonText,
    Text,
    VStack
} from "@chakra-ui/react";
import { useMemo, useRef, useState } from 'react';

interface Props {
    isMerchantsLoading: boolean;
    merchants: KnownMerchant[];
    selectedMerchant: KnownMerchant | undefined;
    setSelectedMerchant: (value: React.SetStateAction<KnownMerchant | undefined>) => void
}

export const KnownMerchantsList = ({ isMerchantsLoading,merchants, selectedMerchant, setSelectedMerchant }: Props) => {
    const [searchTerm, setSearchTerm] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null)

    const merchantsFiltered = useMemo(() => {
        if (!merchants) return [];

        return merchants
            .filter(mer => mer.merchantName.toLowerCase().includes(searchTerm.toLowerCase()));

    }, [merchants, searchTerm]);

    const endElement = searchTerm ? (
        <CloseButton
            size="xs"
            color={'blackAlpha.600'}
            _hover={{ bgColor: 'blackAlpha.200' }}
            onClick={() => {
                setSearchTerm('')
                inputRef.current?.focus()
            }}
            me="-2"
        />
    ) : undefined

    return (
        <VStack>
            <InputGroup endElement={endElement}>
                <Input
                    ref={inputRef}
                    placeholder="Email"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.currentTarget.value)
                    }}
                />
            </InputGroup>
            <VStack
                w="250px"
                h={'80vh'}
                overflowY={'scroll'}
                align="stretch"
                gap={3}
                bg="white"
                p={3}
                borderRadius="md"
                shadow="sm"
                justify={'start'}
                alignItems={'start'}
                gapY={2}
            >
                {isMerchantsLoading && (
                    <VStack gap="4" w={'100%'}>
                        {Array.from({ length: 10 }).map((_, index) => (
                            <HStack key={index} bg="gray.100" p="3" rounded="md" w="100%" gap="5">
                                <SkeletonCircle size="6" />
                                <SkeletonText noOfLines={1} w={'60%'} />
                            </HStack>
                        ))}
                    </VStack>

                )}
                {merchantsFiltered?.map(merchant => (
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
                                    height: '20px',
                                    objectFit: 'contain',
                                    borderRadius: '50px',
                                }}
                                referrerPolicy='no-referrer'
                            />
                        </Flex>
                        <VStack justify={'start'} align={'start'} gap={0}>
                            <Text fontWeight={'500'} fontSize={'sm'}>{merchant.merchantName}</Text>
                        </VStack>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    )
}
