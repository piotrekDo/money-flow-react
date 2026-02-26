import { MENU_BASE_WIDTH } from '@/library'
import { VStack } from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export const BasePageContainer = ({ children }: Props) => {
    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: '-100px', opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                style={{
                    width: '99%',
                    height: '99%',
                }}
            >
                <VStack
                    minH="100vh"
                    bg="#F5F1EE"
                    color={'blackAlpha.800'}
                    gap={5}
                    py={10}
                    px={MENU_BASE_WIDTH}
                    border="solid 1px red"
                >
                    {children}
                </VStack>
            </motion.div>
        </AnimatePresence>
    )
}