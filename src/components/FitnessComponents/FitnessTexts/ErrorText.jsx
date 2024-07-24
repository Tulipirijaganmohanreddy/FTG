import { Text } from '@chakra-ui/react';

function ErrorText({ children }) {
  return (
    <Text textStyle={'p'} mt='0.3rem' color={'red'}>
      {children}
    </Text>
  );
}

export default ErrorText;
