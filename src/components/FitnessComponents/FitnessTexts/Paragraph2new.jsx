import { Text } from '@chakra-ui/react';
import React from 'react';

const Paragraph2new = ({
  children,
  textColor,
  increaseText,
  decreaseMarginTop,
}) => {
  return (
    <>
      <Text
        textStyle={increaseText !== undefined ? increaseText : 'paragraph2new'}
        color={textColor !== undefined ? textColor : 'black-2'}
        mb='0.5'
        mt={decreaseMarginTop !== undefined ? decreaseMarginTop : '0'}
      >
        {children}
      </Text>
    </>
  );
};

export default Paragraph2new;
