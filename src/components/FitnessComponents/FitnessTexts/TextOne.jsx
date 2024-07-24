import { HStack, Text } from '@chakra-ui/react';

function TextOne({ children, onClick, increaseTextSize }) {
  return (
    <Text
      textStyle={increaseTextSize !== undefined ? 'tabText' : 'innerText'}
      color='primary'
      onClick={onClick}
      // whiteSpace='nowrap'
    >
      {children}
    </Text>
  );
}

export default TextOne;
