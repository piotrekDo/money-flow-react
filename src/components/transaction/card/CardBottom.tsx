import { AiFillQuestionCircle } from "react-icons/ai";
import { VStack, IconButton, HStack, Stack, Text, Separator, Flex } from '@chakra-ui/react'
import { FaChevronDown } from "react-icons/fa";

export const CardBottom = () => {
    return (
        <HStack w={'100%'} h={'20%'} justify={'space-between'}>
            <AiFillQuestionCircle size={25} color='#EFA444' />
            <FaChevronDown size={20} color='#A6A8AE' />
        </HStack>
    )
}
