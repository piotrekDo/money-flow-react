import { DynamicIcon } from "@/components/DynamicIcon"
import type { Subcategory } from "@/model/Category"
import { Flex, HStack, Text } from "@chakra-ui/react"

interface Props {
    subcats: Subcategory[],
    selectedSubcategories: Subcategory[],
    addSubcategory: (sub: Subcategory) => void
}

export const SubcategoriesSelector = ({ subcats, selectedSubcategories, addSubcategory }: Props) => {
    return (
        <HStack w={'100%'} flexWrap={'wrap'} mt={5}>
            {subcats && subcats.map(s => (
                <Flex
                    key={s.id}
                    cursor={'pointer'}
                    w={'fit-content'}
                    justify={'center'}
                    align={'center'}
                    spaceX={2}
                    border={'solid 1px'}
                    borderRadius={'10px'}
                    px={2}
                    bg={selectedSubcategories.some((sel) => sel.id === s.id) ? "blue.500" : "transparent"}
                    onClick={() => addSubcategory(s)}
                    userSelect='none'
                >
                    <DynamicIcon name={s.icon} color={s.color} />
                    <Text>{s.name}</Text>
                </Flex>
            ))}
        </HStack>
    )
}
