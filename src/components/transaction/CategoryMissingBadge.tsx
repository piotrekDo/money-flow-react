import { BADGE_ICON_SIZE, BADGE_TEXT_SIZE } from '@/library';
import { Flex, Text } from '@chakra-ui/react'
import { BsFillBagPlusFill } from "react-icons/bs";

export const CategoryMissingBadge = () => {
    return (
        <Flex bgColor={'#FEF2E2'} justify={''} align={'center'} gap={2} padding={1} borderRadius={5}>
            <BsFillBagPlusFill size={BADGE_ICON_SIZE} color='#EFA444' />
            <Text fontSize={BADGE_TEXT_SIZE} fontWeight={'500'} color={'#845D32'}> Kategoria nieprzypisana</Text>
        </Flex>
    )
}
