import { AiFillQuestionCircle } from "react-icons/ai";
import { VStack, IconButton, HStack, Stack, Text, Separator, Flex } from '@chakra-ui/react'
import { FaChevronDown } from "react-icons/fa";
import type { Transaction } from "@/model/Transaction";

interface Props {
    tran: Transaction
}

export const CardBottom = ({tran}: Props) => {
    const isKnownMerchant = !!tran.knownMerchant;
    const isKnownMerchantUnsure = tran.knownMerchantUnsure;
    const missingCategory = !tran.subcategoryDto;
    

    return (
        <HStack w={'100%'} h={'20%'} justify={'space-between'}>
            <AiFillQuestionCircle size={25} color='#EFA444' />
            <HStack>
                {!isKnownMerchant && tran.possibleMerchants.map(pm => (
                    <Flex key={pm.id}>
                        <Text color={'blackAlpha.800'}>{pm.knownMerchantDto.merchantName}</Text>
                    </Flex>
                ))}
            </HStack>
            <FaChevronDown size={20} color='#A6A8AE' cursor={'pointer'}/>
        </HStack>
    )
}
