import { Text } from '@chakra-ui/react';

function Heading({ children }) {
  return (
    <Text textStyle={'heading'} whiteSpace='nowrap'>
      {children}
    </Text>
  );
}

export default Heading;
