import { Flex, HStack, Text } from '@chakra-ui/react';
import type { IconType } from "react-icons";
import { NavLink } from 'react-router';

interface Props {
    menuExpanded: boolean
    redirectLink: string
    title: string
    Icon: IconType;
}

export const MenuElement = ({ menuExpanded, redirectLink, title, Icon }: Props) => {
    return (
        <NavLink to={`/${redirectLink}`} style={{ width: "100%" }}>
            {({ isActive }) => (
                <HStack
                    w="100%"
                    py={1}
                    borderRadius="md"
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    transition="background 0.2s ease"
                    color={isActive ? '#4c73f3aa' : ''}
                >
                    <Flex p={2} borderRadius="50%">
                        <Icon size={25} />
                    </Flex>

                    <Text
                        opacity={menuExpanded ? 1 : 0}
                        transition="opacity 0.3s ease 0.15s"
                        fontWeight={isActive ? "600" : "400"}
                    >
                        {title}
                    </Text>
                </HStack>
            )}
        </NavLink>
    )
}
