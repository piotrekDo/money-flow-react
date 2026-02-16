import { BADGE_ICON_SIZE, BADGE_TEXT_SIZE } from '@/library';
import { Flex, Text } from '@chakra-ui/react';
import { IoStorefront } from "react-icons/io5";

export const UnknownMerchantBadge = () => {
    return (
        <Flex
            justify="flex-start"
            align="center"
            gap={2}
            padding={1}
            borderRadius={5}
            background="linear-gradient(to right, #f39d9d, #fcb9b9)"
        >
            <IoStorefront size={BADGE_ICON_SIZE} color="#b82626" />
            <Text fontSize={BADGE_TEXT_SIZE} fontWeight="500" color='#061e33'>
                Nieznany sprzedawca
            </Text>
        </Flex>
    )
}
