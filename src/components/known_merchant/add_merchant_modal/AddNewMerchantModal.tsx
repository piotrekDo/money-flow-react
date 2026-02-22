import { useSubcategories } from "@/hooks/useSubcategories"
import type { Subcategory } from "@/model/Category"
import type { AddNewMerchant, KnownMerchantKeyWord } from "@/model/KnownMerchant"
import type { Transaction } from "@/model/Transaction"
import { Button, CloseButton, Dialog, Input, Portal, Spinner, Text, VStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { KeywordSelector } from "./KeywordSelector"
import { SelectedKeywordsSection } from "./SelectedKeywordsSection"
import { SelectedSubcategoriesSection } from "./SelectedSubcategoriesSection"
import { SubcategoriesSelector } from "./SubcategoriesSelector"
import { TransactionPreview } from "./TransactionPreview"
import { useAddNewMerchant } from "@/hooks/useAddNewMerchant"

interface Props {
    open: boolean
    onOpenChange: (open: boolean) => void
    transaction: Transaction
}

export const AddNewMerchantModal = ({ open, onOpenChange, transaction }: Props) => {
    const { mutate: addnewMerchant, isPending, isSuccess, reset } = useAddNewMerchant();
    const { data: subcats } = useSubcategories();
    const [merchantName, setMerchantName] = useState("")
    const [merchantCode, setMerchantCode] = useState("")
    const [selectedKeywords, setSelectedKeywords] = useState<KnownMerchantKeyWord[]>([]);
    const [selectedSubcategories, setSelectedSubcategories] = useState<Subcategory[]>([]);

    const isFormValid = !!merchantName && !!merchantCode && selectedKeywords.filter(k => k.weight > 0).length > 0;

    useEffect(() => {
        if (isSuccess) {
            onOpenChange(false);
        }
    }, [isSuccess, onOpenChange]);

    // ✅ reset ZAWSZE gdy modal się zamknie
    useEffect(() => {
        if (!open) {
            reset();
        }
    }, [open, reset]);

    useEffect(() => {
        const keywordList = transaction.normalizedKeywords
            ?.split(" ")
            .map((k) => k.trim())
            .filter(Boolean)
            .sort((a, b) => b.length - a.length) ?? [];

        const initKeywords = keywordList.map((kw, idx) => ({
            id: idx,
            keyword: kw,
            weight: 0,
        }));
        setSelectedKeywords(initKeywords);
    }, [transaction]);

    const addSubcategory = (sub: Subcategory) => {
        setSelectedSubcategories((prev) => {
            const exists = prev.some((s) => s.id === sub.id);
            if (exists) {
                return prev.filter((s) => s.id !== sub.id);
            } else {
                return [...prev, sub];
            }
        });
    };

    const onSaveHandler = () => {
        if (!isFormValid) return;

        const newMerchant: AddNewMerchant = {
            merchantCode,
            merchantName,
            imageUrl: undefined,
            keywords: selectedKeywords.filter(k => k.weight > 0),
            subcategories: selectedSubcategories.map(s => s.id),
            tranId: transaction.systemId
        };

        addnewMerchant(newMerchant)
    }


    return (
        <Dialog.Root
            lazyMount
            open={open}
            size={'lg'}
            onOpenChange={(e) => onOpenChange(e.open)}
        >
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>
                                Dodaj Merchanta
                            </Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <TransactionPreview transaction={transaction} />

                            <VStack gap={3} align="stretch" borderWidth="1px" rounded="lg" p={3} mt={10}>
                                <Text fontWeight={'600'} fontSize={'md'} fontStyle={'italic'} color="gray.300">Merchant</Text>

                                <VStack>
                                    <Input
                                        placeholder="Nazwa merchanta"
                                        value={merchantName}
                                        onChange={(e) => setMerchantName(e.target.value)}
                                    />

                                    <Input
                                        placeholder="Merchant code"
                                        value={merchantCode}
                                        onChange={(e) => setMerchantCode(e.target.value)}
                                    />

                                    {/* <Input
                                    placeholder="Image URL"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                /> */}
                                </VStack>

                                <SelectedSubcategoriesSection selectedSubcategories={selectedSubcategories} addSubcategory={addSubcategory} />
                                <SelectedKeywordsSection selectedKeywords={selectedKeywords} />
                                <KeywordSelector selectedKeywords={selectedKeywords} setSelectedKeywords={setSelectedKeywords} />
                                <SubcategoriesSelector subcats={subcats || []} selectedSubcategories={selectedSubcategories} addSubcategory={addSubcategory} />
                            </VStack>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button w={'100%'} onClick={onSaveHandler} disabled={!isFormValid}>
                                {isFormValid && isPending && <Spinner />}
                                {!isPending && 'Wyślij'}
                            </Button>
                        </Dialog.Footer>

                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    )
}

