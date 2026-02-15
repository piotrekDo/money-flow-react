import { HStack, SkeletonCircle, SkeletonText, VStack } from '@chakra-ui/react';

export const TransactionCardSkeleton = () => {
    const height = 200;
    const width = height * 3;

    return (
        <VStack h={height} w={width} gap={0} bgColor={'whiteAlpha.500'} padding={2} borderRadius={10} justify={'start'} align={'start'}>
            <HStack w={'60%'} justify={'center'} align={'center'}>
                <SkeletonCircle size="10" />
                <SkeletonText noOfLines={1} />
            </HStack>
            <VStack mt={8} w={'70%'} justify={'center'} align={'center'}>
                <SkeletonText noOfLines={3} />
            </VStack>
        </VStack>
    );
};
