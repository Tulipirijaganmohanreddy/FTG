import React from "react";

import {
  Box,
  Button,
  Flex,
  HStack,
  Img,
  Input,
  Spacer,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

const SubParagraph = (props) => {
  const { textName } = props;

  return (
    <>
      <Text textStyle="smallText">{textName}</Text>
    </>
  );
};

export default SubParagraph;
