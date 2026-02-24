import { useKnownMerchantById } from '@/hooks/useKnownMerchantById';
import type { Subcategory } from '@/model/Category';
import type { KnownMerchant } from '@/model/KnownMerchant';
import useSelectedTimeState from '@/state/useSelectedTimeState';
import { Flex, HStack, Spinner, Table, Text, VStack } from "@chakra-ui/react";
import { useMemo } from 'react';
import { CalendarNavigation } from '../CalendarNavigation';
import { DynamicIcon } from '../DynamicIcon';
import { MerchantCategoryModal } from './MerchantCategoryModal';


interface Props {
    selectedMerchant: KnownMerchant | undefined;
    subcategories: Subcategory[]
}

export const SelectedMerchantPanel = ({ selectedMerchant, subcategories }: Props) => {
    const { selectedDate, selectedMode, setSelectedDate } = useSelectedTimeState();

    const from = useMemo(() => {
        if (selectedMode === 'YEAR') {
            return new Date(selectedDate.getFullYear(), 0, 1);
        }

        return new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1);
    }, [selectedDate, selectedMode]);

    const to = useMemo(() => {
        if (selectedMode === 'YEAR') {
            return new Date(selectedDate.getFullYear(), 11, 31);
        }

        return new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0);
    }, [selectedDate, selectedMode]);
    const formatDate = (date: Date) => {
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        return `${year}-${month}-${day}`
    }

    const { data: fetchedMerchant, isFetching, isFetched } = useKnownMerchantById(selectedMerchant?.merchantId || 0, formatDate(from), formatDate(to));

    return (
        <VStack flex="1" align="stretch" gap={3} minW={'1000px'} >
            {selectedMerchant && (
                <VStack w={'100%'} >
                    <HStack w={'100%'} justify={'space-between'} >
                        <HStack>
                            <Flex>
                                <img
                                    src={`/merchant_icons/${isFetched ? fetchedMerchant?.merchantCode : selectedMerchant.merchantCode || 'UNKNOWN'}.png`}
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
                            <HStack justify={'start'} align={'center'} gap={10} w={'100%'} maxW={'500px'}>
                                <Text fontWeight={'600'} fontSize={'3xl'}>{isFetched ? fetchedMerchant?.merchantName : selectedMerchant.merchantName}</Text>
                                {isFetching && <Spinner />}
                            </HStack>
                        </HStack>
                        <Flex >
                            <Text fontSize={'xl'} fontWeight={'700'} color={'blackAlpha.800'}>ID: {selectedMerchant.merchantId}</Text>
                        </Flex>
                    </HStack>

                    <HStack w={'100%'}>
                        {isFetched && fetchedMerchant?.subcategories.map(s => (
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
                            >
                                <DynamicIcon name={s.icon} color={s.color} />
                                <Text>{s.name}</Text>
                            </Flex>
                        ))}
                        {!selectedMerchant.subcategories || selectedMerchant.subcategories.length == 0 && (<Text>Brak przypisanych podkategorii</Text>)}
                        {isFetched && <MerchantCategoryModal selectedMerchant={selectedMerchant} subcategories={subcategories} />}
                    </HStack>
                </VStack>
            )}

            <HStack>
                <CalendarNavigation selectedDate={selectedDate} mode={selectedMode} setSelectedDate={setSelectedDate} />
            </HStack>

            <Table.ScrollArea maxW="xl">
                <Table.Root size={'sm'} variant={'line'} interactive>
                    {/* <Table.Caption>Lista transakcji</Table.Caption> */}

                    <Table.Header >
                        <Table.Row>
                            <Table.ColumnHeader >Data</Table.ColumnHeader>
                            <Table.ColumnHeader >Kwota</Table.ColumnHeader>
                            <Table.ColumnHeader >Komentarz</Table.ColumnHeader>
                            <Table.ColumnHeader >Kategoria</Table.ColumnHeader>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body color={'whiteAlpha.700'}>
                        {isFetched && fetchedMerchant?.transactions.map((t) => (
                            <Table.Row key={t.systemId}>
                                <Table.Cell>{t.tranDate.toLocaleDateString()}</Table.Cell>
                                <Table.Cell>{t.amount.toFixed(2)}</Table.Cell>
                                <Table.Cell>{t.comment}</Table.Cell>
                                <Table.Cell>
                                    <Flex
                                        key={t?.subcategoryDto?.id}
                                        w={'fit-content'}
                                        justify={'center'}
                                        align={'center'}
                                        spaceX={2}
                                        borderRadius={'10px'}
                                        px={2}
                                    >
                                        <DynamicIcon name={t?.subcategoryDto?.icon} color={t?.subcategoryDto?.color} />
                                        <Text>{t?.subcategoryDto?.name}</Text>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                    <Table.Footer color={'whiteAlpha.900'}>
                        <Table.Row>
                            <Table.Cell>Razem:</Table.Cell>
                            <Table.Cell>
                                {isFetched && fetchedMerchant?.transactions
                                    .reduce((sum, t) => sum + t.amount, 0)
                                    .toFixed(2)}
                            </Table.Cell>
                            <Table.Cell></Table.Cell>
                            <Table.Cell></Table.Cell>
                        </Table.Row>
                    </Table.Footer>
                </Table.Root>
            </Table.ScrollArea>
        </VStack>
    )
}
