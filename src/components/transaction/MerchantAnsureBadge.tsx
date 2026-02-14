import { BADGE_ICON_SIZE, BADGE_SHADOW, BADGE_TEXT_SIZE } from '@/library';
import { Flex, Text } from '@chakra-ui/react'
import { IoStorefront } from "react-icons/io5";

export const MerchantAnsureBadge = () => {
    return (
        <Flex
            justify="flex-start"
            align="center"
            gap={2}
            padding={1}
            borderRadius={5}
            background="linear-gradient(to right, #DFFFE2, #FEF2E2)"
        >
            <IoStorefront size={BADGE_ICON_SIZE} color="#2B8D63" />
            <Text fontSize={BADGE_TEXT_SIZE} fontWeight="500" color="#845D32">
                Niepewne rozpoznanie
            </Text>
        </Flex>
    )
}
