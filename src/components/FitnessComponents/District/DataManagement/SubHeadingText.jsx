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
import SubParagraph from "./SubParagraph";

const SubHeadingText = (props) => {
  const { headingName, textName, increaseTextSize } = props;

  return (
    <>
      <Box
       
        display="flex"
        alignItems="center"
        gap="1"
      >
        <Text textStyle={increaseTextSize !== undefined ? "boldMainHead" : "subHeadText"}>{headingName}</Text>
        {textName !== undefined && <SubParagraph textName={textName} />}
      </Box>
    </>
  );
};

export default SubHeadingText;
