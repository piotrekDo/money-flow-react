import { AddNewMerchantModal } from '@/components/known_merchant/add_merchant_modal/AddNewMerchantModal';
import { useRecalculateMerchants } from '@/hooks/useRecalculateMerchants';
import type { Transaction } from '@/model/Transaction';
import { Flex, Menu, Portal, Separator, Text, VStack } from '@chakra-ui/react';
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

interface Props {
  tran: Transaction
}

export const TopRightSide = ({ tran }: Props) => {
  const [open, setOpen] = useState(false)
  const recalculateMerchants = useRecalculateMerchants();

  const onRecalculatePossibleMerchants = () => {
    const tranSystemId = tran.systemId;
    recalculateMerchants.mutate({ tranSystemId })
  }
  return (
    <>
      <VStack w={'25%'} h={'100%'}>
        <Separator variant="solid" colorPalette={'red'} size={'lg'} />

        <VStack w={'100%'} h={'100%'}>
          <Flex w={'100%'} justifyContent={'flex-end'} alignItems={'flex-end'} marginTop={-2} >
            <Menu.Root>
              <Menu.Trigger asChild>
                <MoreHorizontal size={25} color='#A6A8AE' cursor={'pointer'} />
              </Menu.Trigger>
              <Portal>
                <Menu.Positioner bgColor={'#FEFAFE'}>
                  <Menu.Content bgColor={'#FEFAFE'} color={'blackAlpha.800'}>
                    <Menu.Item
                      value="recalc-merch"
                      color="blackAlpha.800"
                      cursor={'pointer'}
                      bgColor={'#FEFAFE'}
                      onClick={onRecalculatePossibleMerchants}
                      css={{
                        _hover: {
                          // bg: "#FEFAFE",
                          fontWeight: '600'
                        },
                        _focus: {
                          // bg: "#FEFAFE",
                        },
                      }}
                    >Sprawdź możliwych sprzedawców
                    </Menu.Item>
                    <Menu.Item
                      value="recalc-merch"
                      color="blackAlpha.800"
                      cursor={'pointer'}
                      bgColor={'#FEFAFE'}
                      onClick={() => setOpen(true)}
                      css={{
                        _hover: {
                          // bg: "#FEFAFE",
                          fontWeight: '600'
                        },
                        _focus: {
                          // bg: "#FEFAFE",
                        },
                      }}
                    >Dodaj merchanta
                    </Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu.Root>
          </Flex>
          <Flex justify={'center'} align={'center'} w={'100%'} h={'100%'} >
            <Text fontSize={'2xl'} fontWeight={'500'} color={tran.amount > 0 ? '#2D8C60' : '#cc5555'}>{tran.amount} zł</Text>
          </Flex>
        </VStack>
      </VStack>

      <AddNewMerchantModal
        open={open}
        onOpenChange={setOpen}
        transaction={tran}
      />
    </>
  )
}
