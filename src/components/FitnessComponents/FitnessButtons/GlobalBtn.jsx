import { Button } from '@chakra-ui/react';
import React from 'react';

const GlobalBtn = ({ onClick, children }) => {
  <>
    <Button
      color='black'
      borderRadius='3xl'
      background='#EEEEEE'
      w={{ base: '5rem', md: '7rem', lg: '7rem' }}
      onClick={onClick}
      size='sm'
    >
      <Text textStyle={'textHead'}>{children}</Text>
    </Button>
  </>;
};

export default GlobalBtn;
