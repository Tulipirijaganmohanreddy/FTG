import { Text } from '@chakra-ui/react'
import React from 'react'

const NormalHeading = ({children, changeTextColor}) => {
  return (
    <>
    <Text textStyle={"normalHeading"} color={changeTextColor !== undefined ? changeTextColor : "black-2"}>
        {children}
    </Text>
    </>
  )
}

export default NormalHeading