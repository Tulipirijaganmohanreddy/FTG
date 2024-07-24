import { Text } from "@chakra-ui/react";
import React from "react";

const TableHeading = ({ children }) => {
  return (
    <>
      <Text textStyle={"theading"} color="primary">
        {children}
      </Text>
    </>
  );
};

export default TableHeading;
