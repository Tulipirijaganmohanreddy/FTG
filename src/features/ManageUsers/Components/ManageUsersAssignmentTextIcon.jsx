import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { IoAddCircleSharp } from "react-icons/io5";

const ManageUsersAssignmentTextIcon = (props) => {
  return (
    <>
      <Text
        textStyle="textHead"
        as="span"
        textDecoration="underline"
        whiteSpace="nowrap"
      >
        {props.text}
      </Text>
      <Box width={{ base: "4", md: "6", lg: "6" }}>
        <IoAddCircleSharp fill="#0081c8" size={"21"} />
      </Box>
    </>
  );
};

export default ManageUsersAssignmentTextIcon;
