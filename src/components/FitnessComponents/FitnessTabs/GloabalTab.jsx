import React from "react";

import {
  Box,
  Text
} from "@chakra-ui/react";

function GloabalTab(props) {
  const {
    tabNamesList,
    activeTab,
    setActiveTab,
    width,
    increasePaddingX,
    onClickFunctionHandlingRoles,
  } = props;

  return tabNamesList?.map((each, index) => (
    <Box
      key={index}
      color={activeTab === each.id ? "white" : "black-2"}
      background={activeTab === each.id ? "primary" : "gray-1"}
      borderLeftRadius={each.id === 1 && "2xl"}
      borderRightRadius={each.id === tabNamesList.length && "2xl"}
      borderRightWidth={each.id !== tabNamesList.length && "1px"}
      borderColor="gray"
      cursor="pointer"
      py="0.6rem"
      px={increasePaddingX !== undefined ? increasePaddingX : "0"}
      w={width !== undefined ? width : "15rem"}
      onClick={() => {
        setActiveTab(each.id);

        if (
          typeof onClickFunctionHandlingRoles !== undefined &&
          typeof onClickFunctionHandlingRoles === "function"
        ) {
          onClickFunctionHandlingRoles(each?.tabTextName);
        }
    
      }}
    >
      <Text textStyle="tabText" textAlign="center" whiteSpace="nowrap">
        {each?.tabTextName}
      </Text>
    </Box>
  ));
}

export default GloabalTab;
