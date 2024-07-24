import { Text } from '@chakra-ui/react'
import React from 'react'

const Heading5 = ({children, changeTextColor, changeTextStyle}) => {
  return (
    <>

<Text textStyle={changeTextStyle ? changeTextStyle : "heading5"} color = {changeTextColor ? changeTextColor : ""} >
        {children}
    </Text>
    
    </>
  )
}

export default Heading5