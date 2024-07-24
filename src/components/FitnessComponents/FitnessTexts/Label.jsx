import { Text } from '@chakra-ui/react';

function Label({ children, marginTopText, changeTextColor, textDecorationStyle,  onClick, changeTextStyle }) {
  return (
    <Text
      textStyle={changeTextStyle !== undefined ? changeTextStyle : 'labelHead'}
      mt={marginTopText !== undefined ? marginTopText : '3'}
      onClick={onClick}
      color={changeTextColor !== undefined && changeTextColor}
      textDecoration={textDecorationStyle !== undefined && textDecorationStyle}
    >
      {children}
    </Text>
  );
}

export default Label;
