import { Tooltip } from "@/components/ui/tooltip";
import { useSetTransactionComment } from "@/hooks/useSetTransactionComment";
import type { Transaction } from '@/model/Transaction';
import { Flex, HStack, Input, InputGroup, Span, Text, VStack } from '@chakra-ui/react';
import { CheckIcon, MinusIcon } from "lucide-react";
import { useState } from "react";
import { BadgesSection } from './BadgesSection';
import { HeaderSection } from './HeaderSection';

interface Props {
    tran: Transaction
}

export const TopLeftSide = ({ tran }: Props) => {
    const { mutate: setComment } = useSetTransactionComment();
    const [isCommentEditig, setIsCommentEditing] = useState(false)
    const [value, setValue] = useState("")

    const MAX_CHARACTERS = 100;

    const onStartEditingHandle = () => {
        setIsCommentEditing(true);
        setValue(tran.comment ? tran.comment : '');
    }

    const onCancelhandle = () => {
        setValue(tran.comment ? tran.comment : '');
        setIsCommentEditing(false);
    }

    const onAccepthandle = () => {
        tran.comment = value;
        setIsCommentEditing(false)
        setComment({
            tranSystemId: tran.systemId,
            comment: value ? value : null
        })
    }

    return (
        <VStack w={'75%'} h={'100%'}>
            <HeaderSection tran={tran} />
            <BadgesSection tran={tran} />

            <Tooltip positioning={{ placement: 'bottom-start' }} content={tran.titleRaw}>
                <Flex w={'100%'}>
                    <Text lineClamp={1} maxW={'300px'} color={'blackAlpha.600'}>{tran.titleRaw}</Text>
                </Flex>
            </Tooltip>
            <Flex w={'100%'}>
                <Text fontWeight={'500'} color={'blackAlpha.900'}>{tran.tranDate.toLocaleDateString('pl-PL', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                })}</Text>
            </Flex>
            <Flex
                w={'100%'}
                h={'2rem'}
                color={tran.comment ? 'blackAlpha.700' : 'blackAlpha.300'}
                cursor={'pointer'}
                onClick={onStartEditingHandle}
            >
                {!isCommentEditig && <Text fontStyle={'italic'}>{tran.comment ? tran.comment : ' umieść komentarz'}</Text>}
                {isCommentEditig && (
                    <HStack w={'100%'} position={'relative'}>
                        <InputGroup
                            endElement={
                                <Span color="fg.muted" textStyle="xs">
                                    {value.length} / {MAX_CHARACTERS}
                                </Span>
                            }
                        >
                            <Input
                                placeholder="Enter your message"
                                value={value}
                                maxLength={MAX_CHARACTERS}
                                onChange={(e) => {
                                    setValue(e.currentTarget.value.slice(0, MAX_CHARACTERS))
                                }}
                            />
                        </InputGroup>
                        <HStack position={'absolute'} right={'-80px'}>
                            <MinusIcon onClick={(e) => {
                                e.stopPropagation();
                                onCancelhandle();
                            }} />
                            <CheckIcon onClick={(e) => {
                                e.stopPropagation();
                                onAccepthandle();
                            }} />
                        </HStack>
                    </HStack>
                )}
            </Flex>
        </VStack>
    )
}
