import type { KnownMerchantKeyWord } from "@/model/KnownMerchant"
import { Grid, Text, VStack } from "@chakra-ui/react"
import { Keyword } from "./Keyword"

interface Props {
    selectedKeywords: KnownMerchantKeyWord[],
    setSelectedKeywords: (value: React.SetStateAction<KnownMerchantKeyWord[]>) => void
}

export const KeywordSelector = ({ selectedKeywords, setSelectedKeywords }: Props) => {

    const changeWeight = (id: number, delta: number) => {
        setSelectedKeywords((prev) =>
            prev.map((kw) =>
                kw.id === id
                    ? { ...kw, weight: Math.max(0, kw.weight + delta) }
                    : kw
            )
        );
    };

    const half = Math.ceil(selectedKeywords.length / 2);
    const col1 = selectedKeywords.slice(0, half);
    const col2 = selectedKeywords.slice(half);
    return (
        <VStack w={'100%'} flexWrap={'wrap'}>
            <VStack align="stretch" gap={2} w={'100%'}>
                <Text fontWeight="600">Słowa kluczowe</Text>

                <Grid templateColumns="1fr 1fr" gapX={10} w={'100%'} >
                    {[col1, col2].map((col) =>
                        col.map((kw) => <Keyword key={kw.id} kw={kw} changeWeight={changeWeight} />)
                    )}
                </Grid>
            </VStack>
        </VStack>
    )
}
