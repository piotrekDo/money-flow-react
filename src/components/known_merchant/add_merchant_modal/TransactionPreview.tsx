import type { Transaction } from "@/model/Transaction"
import { Box, Flex, Text, VStack } from "@chakra-ui/react"

interface Props {
    transaction: Transaction
}

export const TransactionPreview = ({ transaction }: Props) => {
    return (
        <VStack gap={5} align="stretch">
            <Box p={4} borderWidth="1px" rounded="lg">
                <Text fontWeight={'600'} fontSize={'md'} fontStyle={'italic'} color="gray.300">
                    Podgląd transakcji
                </Text>

                <Flex justify="space-between" mt={4}>
                    <Text fontWeight="600">
                        {transaction.amount} zł
                    </Text>
                    <Text fontSize="sm">
                        {transaction.tranDate.toLocaleDateString()}
                    </Text>
                </Flex>

                <Text fontSize="sm" mt={2}>
                    {transaction.titleRaw}
                </Text>

                <Text fontSize="sm" color="gray.300" mt={1}>
                    {transaction.merchantDataRaw}
                </Text>
            </Box>
        </VStack>
    )
}
