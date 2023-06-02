import { Box, Stack, Text, VStack } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box
        bgColor={'blackAlpha.900'}
        color={'whiteAlpha.700'}
        minH={'48'}
        h={'12'}
        px={'16'}
        py={['16','8']}
    >
    <Stack alignItems={'center'} justifyContent={'center'} h={'full'} direction={['column','row']}>
        <VStack></VStack>
        <VStack>
            <Text>Made with 🤍</Text>
        </VStack>
    </Stack>
    </Box>
  )
}

export default Footer