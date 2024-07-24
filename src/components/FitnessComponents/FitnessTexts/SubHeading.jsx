import { Text } from '@chakra-ui/react';

function SubHeading({ children, color }) {
  return <Text textStyle={'subHead'} textColor={color ? color : ''}>{children}</Text>;
}

export default SubHeading;
