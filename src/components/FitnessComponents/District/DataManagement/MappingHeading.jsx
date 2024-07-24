import { Text } from '@chakra-ui/react'
import React from 'react'

const MappingHeading = (props) => {


    const {textName, changeTextColor} = props
  return (
    <>
    <Text textStyle="boldSubHead" color = {changeTextColor !== undefined && changeTextColor}>{textName}</Text>
    </>
  )
}

export default MappingHeading