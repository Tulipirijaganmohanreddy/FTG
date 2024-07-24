import { Box, HStack, Icon, Text } from "@chakra-ui/react";
import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import IconText from "../../src/components/FitnessComponents/FitnessTexts/IconText";

const TextIcon = (props) => {
  const {
    text,
    icon,
    onClick,
    increaseTextSize,
    changeIconColor,
    changeCursorPointer,
    isEditClicked,
  } = props;
  return (
    <HStack gap="1" alignItems="center" >
      <IconText
        increaseTextSize={increaseTextSize}
        onClick={onClick}
        changeCursorPointer={changeCursorPointer}
      >
        {text}
      </IconText>
      <Icon
        as={icon}
        // boxSize='1.8rem'

        boxSize={{ base: "18px", md: "20px", lg: "20px" }}
        color={
          (isEditClicked && changeIconColor !== undefined) ||
          changeIconColor !== undefined
            ? changeIconColor
            : "primary"
        }
        w={{ base: "5", md: "5.5", xl: "6" }}
        onClick={onClick}
        cursor={
          changeCursorPointer !== undefined ? changeCursorPointer : "pointer"
        }
      />
    </HStack>
  );
};

export default TextIcon;
