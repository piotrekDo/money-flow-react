import { HStack, VStack } from '@chakra-ui/react';
import { keyframes } from "@emotion/react";
import { useState } from 'react';
import { FaFolderTree, FaMoneyCheckDollar } from "react-icons/fa6";
import { IoMdHome } from "react-icons/io";
import { IoStorefront } from "react-icons/io5";
import { RiMenu2Line } from "react-icons/ri";
import { MenuElement } from './MenuElement';
import { MENU_BASE_WIDTH, ROUTE_CATEGORIES, ROUTE_MERCHANTS, ROUTE_TRANSACTIONS } from '@/library';


const spinOnce = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

export const MainMenu = () => {
    const [menuExpanded, setMenuExpanded] = useState<boolean>(false);

    const onExpandMenuHandler = () => {
        setMenuExpanded(e => !e)
    }

    return (
        <VStack
            w={menuExpanded ? '250px' : MENU_BASE_WIDTH}
            justify={'start'}
            align={'start'}
            pl={'8px'}
            transition="width 0.25s ease"
            h={'100vh'}
            borderRadius={'0 20px 20px 0'}
            position={'fixed'}
            py={5}
            top={0}
            left={0}
            bgColor={'#FEFCFC'}
            color={'blackAlpha.600'}
            overflow={'hidden'}
            zIndex={999}
        >
            <HStack
                onClick={onExpandMenuHandler}
                spaceX={2}
                borderRadius="50%"
                p={2}
                cursor="pointer"
                _hover={{
                    bgColor: 'gray.100',
                    animation: `${spinOnce} 0.2s ease-in-out`
                }}
            >
                <RiMenu2Line size={25} />
            </HStack>

            <VStack mt={10} w={'100%'} align={'start'}>
                <MenuElement
                    menuExpanded={menuExpanded}
                    redirectLink=''
                    title='Home'
                    Icon={IoMdHome}
                />
                <MenuElement
                    menuExpanded={menuExpanded}
                    redirectLink={ROUTE_TRANSACTIONS}
                    title='Transakcje'
                    Icon={FaMoneyCheckDollar}
                />
                <MenuElement
                    menuExpanded={menuExpanded}
                    redirectLink={ROUTE_MERCHANTS}
                    title='Sprzedawcy'
                    Icon={IoStorefront}
                />

                <MenuElement
                    menuExpanded={menuExpanded}
                    redirectLink={ROUTE_CATEGORIES}
                    title='Podkategorie'
                    Icon={FaFolderTree}
                />


            </VStack>

        </VStack>
    )
}
