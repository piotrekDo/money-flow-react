import type { Transaction } from '@/model/Transaction';
import { VStack, IconButton, HStack, Separator, Flex, Text } from '@chakra-ui/react'
import { MoreHorizontal } from "lucide-react";

interface Props {
  tran: Transaction
}

export const TopRightSide = ({ tran }: Props) => {
  return (
    <VStack w={'25%'} h={'100%'}>
      <Separator variant="solid" colorPalette={'red'} size={'lg'} />

      <VStack w={'100%'} h={'100%'}>
        <Flex w={'100%'} justifyContent={'flex-end'} alignItems={'flex-end'}>
          <MoreHorizontal size={25} color='#A6A8AE' />
        </Flex>
        <Flex justify={'center'} align={'center'} w={'100%'} h={'100%'} >
          <Text fontSize={'2xl'} fontWeight={'500'} color={tran.amount > 0 ? '#2D8C60' : '#cc5555'}>{tran.amount} zł</Text>
        </Flex>
      </VStack>
    </VStack>
  )
}
