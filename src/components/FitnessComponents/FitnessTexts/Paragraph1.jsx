import { Text } from '@chakra-ui/react';
import React from 'react';

const Paragraph1 = ({ children, decreaseMarginTop, decreaseMarginBottom, changeTextColor }) => {
  return (
    <>
      <Text textStyle='paragraph1' mt={decreaseMarginTop !== undefined ? decreaseMarginTop : '4' } mb={decreaseMarginBottom !== undefined ? decreaseMarginBottom : '1'} color={changeTextColor !== undefined ? changeTextColor : '#6F6F6F'}>
        {children}
      </Text>
    </>
  );
};

export default Paragraph1;
