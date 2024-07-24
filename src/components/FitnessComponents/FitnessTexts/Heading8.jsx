import { Box, Text } from "@chakra-ui/react";
import React from "react";

const Heading8 = ({
  children,
  increaseTextSize,
  textColor,
  ...headingProps
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" gap="1">
        <Text
          textStyle={
            increaseTextSize !== undefined ? increaseTextSize : "heading8"
          }
          color={textColor ? textColor : ""}
          {...headingProps}
        >
          {children}
        </Text>
      </Box>
    </>
  );
};

export default Heading8;
