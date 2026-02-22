import type { KnownMerchantKeyWord } from "@/model/KnownMerchant"
import { Flex, HStack, Text } from "@chakra-ui/react"
import { MinusCircle, PlusCircle } from "lucide-react"
import { useState } from "react"

interface Props {
    kw: KnownMerchantKeyWord
    changeWeight: (id: number, delta: number) => void
}

export const Keyword = ({ kw, changeWeight }: Props) => {
    const [isHovering, setIsHovering] = useState(false);
    return (
        <HStack gap={2} justify={'space-between'} onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
            <Flex><Text>{kw.keyword}</Text></Flex>
            <Flex flexBasis={'1/4'} justify={'center'} align={'center'}>
                <Flex flexBasis={'1/3'} justify={'center'} align={'center'}>{isHovering && <MinusCircle size={'1.2rem'} onClick={() => changeWeight(kw.id, -1)}>+</MinusCircle>}</Flex>
                <Flex flexBasis={'1/3'} justify={'center'} align={'center'}>{(kw.weight > 0 || isHovering) && <Text>{kw.weight}</Text>}</Flex>
                <Flex flexBasis={'1/3'}>{isHovering && <PlusCircle size={'1.2rem'} onClick={() => changeWeight(kw.id, 1)}>-</PlusCircle>}</Flex>
            </Flex>
        </HStack>
    )
}
