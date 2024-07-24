import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Heading9 = ({children}) => {
  return (
    <>
    <Box
       
       display="flex"
       alignItems="center"
       gap="1"
     >
       <Text textStyle="heading9">{children}</Text>
     </Box>
    </>
  )
}

export default Heading9