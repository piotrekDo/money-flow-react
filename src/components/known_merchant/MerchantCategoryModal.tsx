import { useAddSubcategoryToMerchant } from '@/hooks/useAddSubcategoryToMerchant';
import type { Subcategory } from '@/model/Category';
import type { KnownMerchant } from '@/model/KnownMerchant';
import {
    CloseButton,
    Dialog,
    Flex,
    HStack,
    Portal,
    Text
} from "@chakra-ui/react";
import { PlusCircleIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import { DynamicIcon } from '../DynamicIcon';
interface Props {
    selectedMerchant: KnownMerchant | undefined;
    subcategories: Subcategory[]
}
export const MerchantCategoryModal = ({ selectedMerchant, subcategories }: Props) => {
    if (!selectedMerchant) return null;
    const addSubcategoryToMerchant = useAddSubcategoryToMerchant();

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
    )
}
