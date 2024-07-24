import { Text } from '@chakra-ui/react';
import React from 'react';

const Heading4new = ({ children, textTransform, letterSpacing,  changeTextColor}) => {
  return (
    <>
      <Text
        textStyle={'heading4new'}
        textTransform={textTransform !== undefined && textTransform}
        letterSpacing={letterSpacing !== undefined && 'tight'}
        color = {changeTextColor !== undefined && changeTextColor}
      >
        {children}
      </Text>
    </>
  );
};

export default Heading4new;
