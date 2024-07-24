import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Heading2 = ({ children, changeTextColor }) => {
  return (
    <>
      <Box display="flex" alignItems="center" gap="1">
        <Text
          textStyle="heading2"
          as="h2"
          color={changeTextColor ? changeTextColor : ""}
        >
          {children}
        </Text>
      </Box>
    </>
  );
};

export default Heading2;
