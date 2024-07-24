import React from "react";

import {
  Text,
  Button,
  Box,
  Grid,
  GridItem,
  Center,
  Container,
  Flex,
} from "@chakra-ui/react";

const GlobalButtonsWithIcons = (props) => {
  const { item, index, onClickFunction, buttonsList ,disabled} = props;

  const buttonClicked = (index) => {
    onClickFunction(index);
  };

  return (
    <>
      <Button
        key={index}
        rounded="full"
        bg="primary"
        w={{base:"10em", md:"13em", lg:"14em"}}
        size="sm"
        color="white"
        isDisabled={disabled}
        gap="2"
        onClick={() => buttonClicked(index)}
      >
        <Box display="flex" w="full" justifyContent="center"  gap={buttonsList?.length >= 4 ? {base:"2%", md:"2%", lg: "10%"} : {base:"2%", md:"14%", lg: "10%"}}  alignItems="center">
          <Box boxSize={{base:"3", md:"5", lg:"5"}}  ml={{base:"0", lg:"1"  }}>
            <img src={item.icon} />
          </Box>
          <Text textStyle="p" >{item.name}</Text>
        </Box>
      </Button>
    </>
  );
};

export default GlobalButtonsWithIcons;
