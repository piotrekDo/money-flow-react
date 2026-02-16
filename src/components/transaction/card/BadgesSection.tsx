import { DynamicIcon } from '@/components/DynamicIcon';
import type { Transaction } from '@/model/Transaction';
import { Flex, HStack, Text } from '@chakra-ui/react';
import { CategoryMissingBadge } from '../CategoryMissingBadge';
import { MerchantAnsureBadge } from '../MerchantAnsureBadge';
import { UnknownMerchantBadge } from '../UnknownMerchantBadge';
import { BADGE_SHADOW } from '@/library';

interface Props {
    tran: Transaction
}

export const BadgesSection = ({ tran }: Props) => {
    const isKnownMerchant = !!tran.knownMerchant;
    const isKnownMerchantUnsure = tran.knownMerchantUnsure;
    const missingCategory = !tran.subcategoryDto;

    return (
        <HStack w={'100%'}>
            {!isKnownMerchant && <UnknownMerchantBadge />}
            {isKnownMerchant && isKnownMerchantUnsure && <MerchantAnsureBadge />}
            {missingCategory && <CategoryMissingBadge />}
            {!missingCategory && (
                <Flex justify={'center'} align={'center'} color={'blackAlpha.800'} px={2} gap={2}  borderRadius={'10px'} shadow={'sm'}>
                    <DynamicIcon name={tran.subcategoryDto.icon} color={tran.subcategoryDto.color} />
                    <Text>{tran.subcategoryDto.name}</Text>
                </Flex>
            )}
        </HStack>
    )
}
