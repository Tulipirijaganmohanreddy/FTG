import { Text } from '@chakra-ui/react'
import React from 'react'

const Heading4 = ({children, textTransform, letterSpacing}) => {
  return (
    <>
    <Text textStyle={"heading4"} textTransform = {textTransform !== undefined && textTransform} letterSpacing={letterSpacing !== undefined && "tight"}>
        {children}
    </Text>
    </>
  )
}

export default Heading4