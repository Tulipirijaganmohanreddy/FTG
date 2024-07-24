import { Text } from '@chakra-ui/react'
import React from 'react'

const ParagraphWithColorBlack = ({children, increaseTextSize, changeTextColor, mb}) => {
  return (
    <>
     <Text textStyle={increaseTextSize !== undefined ? increaseTextSize : "paragraph2ColorPrimary"} color={changeTextColor !== undefined ? changeTextColor : "black-1"} cursor="pointer" mb={mb ? mb : "0.5"}>
        {children}
    </Text>
    </>
  )
}

export default ParagraphWithColorBlack