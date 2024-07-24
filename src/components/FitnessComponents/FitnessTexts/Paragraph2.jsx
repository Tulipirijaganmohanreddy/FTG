import { Text } from "@chakra-ui/react";
import React from "react";

const Paragraph2 = ({
  children,
  textColor,
  increaseText,
  decreaseMarginTop,
  filter,
  changeCursorPointer,
  textDecoration,
  whiteSpace,
}) => {
  return (
    <>
      <Text
        textStyle={increaseText !== undefined ? increaseText : "paragraph2"}
        color={textColor !== undefined ? textColor : "black-2"}
        mb="0.5"
        mt={decreaseMarginTop !== undefined ? decreaseMarginTop : "0"}
        filter={filter !== undefined && filter}
        cursor={changeCursorPointer ? changeCursorPointer : ""}
        whiteSpace={whiteSpace ? whiteSpace : ""}
        textDecoration={textDecoration ? textDecoration : ""}
      >
        {children}
      </Text>
    </>
  );
};

export default Paragraph2;
