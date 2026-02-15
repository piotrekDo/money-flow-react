import type { Totals, TransactionFilter } from '@/hooks/useTransactionsPageData'
import { Flex, HStack, SkeletonCircle, Text } from '@chakra-ui/react'

interface Props {
    isBusy: boolean,
    totals: Totals,
    filters: TransactionFilter[],
    selectedFilter: string,
    setSelectedFilter: React.Dispatch<React.SetStateAction<string>>
}

export const FiltersSection = ({ isBusy, totals, filters, selectedFilter, setSelectedFilter }: Props) => {
    return (
        <HStack color="blackAlpha.800" w="600px" gap={0} borderRadius={10} overflow="hidden">
            {filters.map((f, index) => (
                <Flex
                    key={f.name}
                    gap={2}
                    w="100%"
                    justify="center"
                    align="center"
                    bg={selectedFilter === f.name ? '#DAE5DC' : '#FEF6EC'}
                    cursor="pointer"
                    onClick={() => setSelectedFilter(f.name)}
                    py={2}
                    transition="background .2s"
                    borderRadius={selectedFilter === f.name ? '10px' : 0}
                >
                    <Text>{f.name}</Text>
                    {!isBusy ? (
                        <Text
                            fontWeight="600"
                            bgColor={selectedFilter === f.name ? '#C3D8C9' : '#FCE8D2'}
                            px={2}
                            borderRadius="10px"
                        >
                            {f.count}
                        </Text>
                    ) : <SkeletonCircle size="5" />}
                </Flex>
            ))}
        </HStack>
    )
}
