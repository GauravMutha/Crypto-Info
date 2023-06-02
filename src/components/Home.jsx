import React from 'react'
import { Box, Image, Text } from '@chakra-ui/react'
import {motion} from 'framer-motion'
import btcImage from '../assets/btc.png'
const Home = () => {
  return (
    <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
      <motion.div
        style={{
          height:'70vh',
        }}
        animate={{
          translateY:'20px',
        }}
        transition={{
          duration:2,
          repeat:Infinity,
          repeatType:'reverse'
        }}
      >
      <Image w={'full'} h={'full'} objectFit={'contain'} src={btcImage}/>
      </motion.div>
      <Text
        fontSize={'6xl'}
        textAlign={'center'}
        fontWeight={'thin'}
        color={'whiteAlpha.700'}
        mt={'-20'}
      >
      CryptoInfo
      </Text>
    </Box>    
  )
}

export default Home