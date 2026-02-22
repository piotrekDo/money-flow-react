import { DynamicIcon } from "@/components/DynamicIcon";
import { Tooltip } from "@/components/ui/tooltip";
import { useAddSubcategoryToTransaction } from "@/hooks/useAddSubcategoryToTransaction";
import { useSetKnownMerchant } from "@/hooks/useSetKnownMerchant";
import type { Subcategory } from "@/model/Category";
import type { Transaction } from "@/model/Transaction";
import { Flex, HStack, VStack } from '@chakra-ui/react';
import { useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { PossibleMerchantSelector } from "./PossibleMerchantSelector";
import { UnknownMerchantConfirmSelector } from "./UnknownMerchantConfirmSelector";

interface Props {
    tran: Transaction;
    subcategories: Subcategory[];

}

export const CardBottom = ({ tran, subcategories }: Props) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const setKnownMerchant = useSetKnownMerchant();
    const addSubcategory = useAddSubcategoryToTransaction();

    const isKnownMerchant = !!tran.knownMerchant;
    const isKnownMerchantUnsure = tran.knownMerchantUnsure;
    const missingCategory = !tran.subcategoryDto;

    const onClickHandle = (merchantId: number) => {
        const tranSystemId = tran.systemId;
        setKnownMerchant.mutate({ tranSystemId, merchantId });
    }

    const onSetSubcategory = (subcategoryId: number) => {
        const tranSystemId = tran.systemId;
        addSubcategory.mutate({ tranSystemId, subcategoryId })
    }

    return (
        <HStack w={'100%'} h={!isExpanded ? '30px' : ''} justify={'space-between'} overflow={'hidden'} align={'start'} py={1} >
            <AiFillQuestionCircle size={25} color='#EFA444' />
            <HStack w={'90%'} gap={1} align={'start'} >
                {!isKnownMerchant && tran.possibleMerchants.map(pm => <PossibleMerchantSelector key={pm.id} pm={pm} onClickHandle={onClickHandle} />)}
                {!isKnownMerchant && (!tran.possibleMerchants || tran.possibleMerchants.length == 0) && <UnknownMerchantConfirmSelector onClickHandle={onClickHandle} />}
                {isKnownMerchant && missingCategory && tran.knownMerchant.subcategories.length > 0 && (
                    <VStack justify={'start'} align={'start'}>
                        <HStack gap={4} ml={5}>
                            {
                                tran.knownMerchant.subcategories.map(s => {
                                    return (
                                        <Tooltip key={s.id} content={
                                            <>
                                                <div>{s.name}</div>
                                            </>
                                        }>
                                            <Flex cursor={'pointer'} onClick={() => onSetSubcategory(s.id)}>
                                                <DynamicIcon name={s.icon} color={s.color} size={25} />
                                            </Flex>
                                        </Tooltip>
                                    )
                                })
                            }
                        </HStack>
                        <HStack gap={4} ml={5} flexWrap={'wrap'} justify={'start'} align={'start'} >
                            {subcategories.map(s => {
                                return (
                                    <Tooltip key={s.id} content={
                                        <>
                                            <div>{s.name}</div>
                                        </>
                                    }>
                                        <Flex cursor={'pointer'} onClick={() => onSetSubcategory(s.id)}>
                                            <DynamicIcon name={s.icon} color={s.color} size={25} />
                                        </Flex>
                                    </Tooltip>
                                )
                            })}
                        </HStack>
                    </VStack>
                )}
                {isKnownMerchant && missingCategory && tran.knownMerchant.subcategories.length == 0 && (
                    <HStack gap={4} ml={5} flexWrap={'wrap'} justify={'start'} align={'start'} >
                        {subcategories.map(s => {
                            return (
                                <Tooltip key={s.id} content={
                                    <>
                                        <div>{s.name}</div>
                                    </>
                                }>
                                    <Flex cursor={'pointer'} onClick={() => onSetSubcategory(s.id)}>
                                        <DynamicIcon name={s.icon} color={s.color} size={25} />
                                    </Flex>
                                </Tooltip>
                            )
                        })}
                    </HStack>
                )}
            </HStack>
            <FaChevronDown size={20} color='#A6A8AE' cursor={'pointer'} onClick={() => setIsExpanded(s => !s)} />
        </HStack>
    )
}
