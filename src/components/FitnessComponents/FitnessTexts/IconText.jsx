import { HStack, Text } from '@chakra-ui/react';

function IconText({ children,onClick, increaseTextSize, changeCursorPointer }) {
  return (
    <>
      <Text
        textStyle={increaseTextSize !== undefined ? "textHead" : 'textHead1'}
        textDecoration='underline'
        whiteSpace={'nowrap'}
        onClick={onClick}
        cursor={changeCursorPointer !== undefined ? changeCursorPointer :'pointer'}
        
 
      >
        {children}
      </Text>
    </>
  );
}

export default IconText;
