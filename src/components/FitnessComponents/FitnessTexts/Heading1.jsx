import { Text } from "@chakra-ui/react";
import React from "react";

const Heading1 = ({
  children,
  textTransform,
  letterSpacing,
  textColor,
  mt,
  mb,
  ...headingProps
}) => {
  return (
    <Text
      textStyle="heading1"
      textTransform={textTransform !== undefined && textTransform}
      mt={mt}
      mb={mb}
      letterSpacing={letterSpacing !== undefined && "tight"}
      textColor={textColor ? textColor : ""}
      as="h1"
      {...headingProps}
    >
      {children}
    </Text>
  );
};

export default Heading1;
