import { Tooltip } from "@/components/ui/tooltip";
import { Flex, Text } from '@chakra-ui/react';

interface Props {
    onClickHandle: (merchantId: number) => void
}

export const UnknownMerchantConfirmSelector = ({ onClickHandle }: Props) => {
    return (
        <Tooltip content={
            <>
                <div>Sprzedawca nieznany</div>
            </>
        }>
            <Flex bgColor={'#EFA444'} borderRadius={'10px'} px={2} justify={'center'} align={'center'} cursor={'pointer'}
                onClick={() => onClickHandle(0)}>
                <Text lineClamp={1} maxW={'80px'} color={'whiteAlpha.800'} textAlign={'center'}>Nieznany</Text>
            </Flex>
        </Tooltip>
    )
}
