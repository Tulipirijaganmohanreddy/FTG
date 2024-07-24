import { Button, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const PositiveButton = (props) => {
  const {
    text,
    isLoading,
    isDisabled,
    bg,
    px,
    py,
    mt,
    disabled,
    ...buttonprops
  } = props;

  return (
    <Button
      {...buttonprops}
      bg={bg ? bg : "primary"}
      width={{ base: "6rem", md: "6.5rem", lg: "7rem" }}
      size="sm"
      color="white"
      borderRadius="3xl"
      px={px ? px : "px"}
      p={py ? py : "py"}
      fontSize={{ base: "xs", md: "13px", lg: "13px" }}
      fontWeight="normal"
      mt={"mt"}
      isDisabled={isLoading || isDisabled}
    >
      {isLoading ? <Spinner /> : text}
    </Button>
  );
};

export default PositiveButton;
