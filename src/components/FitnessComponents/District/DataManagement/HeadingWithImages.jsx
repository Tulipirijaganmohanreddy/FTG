import React from "react";

import {
  Flex,
  Img
} from "@chakra-ui/react";
import Heading2 from "../../FitnessTexts/Heading2";

const HeadingWithImages = (props) => {
  const { image, textName } = props;

  return (
    <>
      <Flex gap="4" alignItems="center">
        <Img src={image} w="8" h="8" />
        <Flex mt="2">
          <Heading2>{textName}</Heading2>
        </Flex>
      </Flex>
    </>
  );
};

export default HeadingWithImages;
