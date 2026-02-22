import { DynamicIcon } from "@/components/DynamicIcon"
import type { Subcategory } from "@/model/Category"
import { Flex, HStack, Text } from "@chakra-ui/react"

interface Props {
    selectedSubcategories: Subcategory[],
    addSubcategory: (sub: Subcategory) => void
}

export const SelectedSubcategoriesSection = ({ selectedSubcategories, addSubcategory }: Props) => {
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
            resize="vertical" >
            {[...selectedSubcategories].reverse().map((s) => (
                <Flex
                    key={s.id}
                    cursor="pointer"
                    w="fit-content"
                    justify="center"
                    align="center"
                    spaceX={2}
                    border="solid 1px"
                    borderRadius="10px"
                    px={2}
                    onClick={() => addSubcategory(s)}
                    userSelect="none"
                >
                    <DynamicIcon name={s.icon} color={s.color} />
                    <Text>{s.name}</Text>
                </Flex>
            ))}
        </HStack>
    )
}
