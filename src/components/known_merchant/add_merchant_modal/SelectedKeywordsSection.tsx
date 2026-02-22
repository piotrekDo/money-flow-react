import type { KnownMerchantKeyWord } from "@/model/KnownMerchant"
import { Flex, HStack, Text } from "@chakra-ui/react"

interface Props {
    selectedKeywords: KnownMerchantKeyWord[]
}

export const SelectedKeywordsSection = ({ selectedKeywords }: Props) => {
    return (
        <HStack w="100%"
            flexWrap="wrap"
            justifyContent={'start'}
            alignContent="flex-start"
            gapX={3}
            gapY={1}
            h="3.2rem"
            minH="3.2rem"
            maxH="300px"
            overflow="auto"
            resize="vertical">
            {selectedKeywords.filter(k => k.weight > 0).map(k => (
                <Flex key={k.id} gapX={2}>
                    <Text>{k.keyword}</Text>
                    <Text>{k.weight}</Text>
                </Flex>
            ))}
        </HStack>
    )
}
