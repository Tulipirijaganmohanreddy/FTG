import { Text } from "@chakra-ui/react";
import React from "react";

const ParagraphWithColorPrimary = ({
  children,
  changeCursorPointer,
  filter,
}) => {
  return (
    <>
      <Text
        textStyle="paragraph2ColorPrimary"
        color="primary"
        filter={filter !== undefined && filter}
        cursor={
          changeCursorPointer !== undefined ? changeCursorPointer : "pointer"
        }
        mb="0.5"
      >
        {children}
      </Text>
    </>
  );
};

export default ParagraphWithColorPrimary;
