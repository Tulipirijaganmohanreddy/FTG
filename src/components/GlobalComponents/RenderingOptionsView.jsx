import React from "react";

import { SearchIcon } from "@chakra-ui/icons";
import { BiEdit } from "react-icons/bi";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuLayoutGrid } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";
import { Box, Flex, Spacer, Tooltip } from "@chakra-ui/react";

const eventsGridList = [
  {
    id: 1,
    icon: <LuLayoutGrid size={15} fill="white" />,
    iconText: "GridView",
    tickIcon: <TiTick size={25} fill="white" />,
  },

  {
    id: 2,
    icon: <GiHamburgerMenu size={15} fill={"black" || "white"} />,
    iconText: "ListView",
    tickIcon: <TiTick size={25} fill="white" />,
  },
];

const RenderingOptionsView = ({ onClick, selectedView }) => {
  const handleClick = (selectedView) => {
    onClick(selectedView);
  };

  return (
    <Flex border="1px solid gray" borderLeftRadius={50} borderRightRadius={50}>
      {eventsGridList?.map((each, index) => {
        return (
          <>
            <Tooltip
              hasArrow
              label={index === 0 ? "Grid layout" : "List layout"}
              bg="primary"
              color="white"
              borderRadius={"md"}
            >
              <Flex
                gap={2}
                key={`${each?.id} + ${each?.iconText} + ${index}`}
                onClick={() => handleClick(each?.iconText)}
                bg={selectedView === each?.iconText ? "primary" : null}
                alignItems={"center"}
                px="2"
                py="0.3rem"
                cursor={"pointer"}
                borderLeftRadius={
                  index === 0 && selectedView === each?.iconText ? 50 : 0
                }
                borderRightRadius={
                  index === 1 && selectedView === each?.iconText ? 50 : 0
                }
              >
                <Box>{each?.icon}</Box>
              </Flex>
            </Tooltip>

            {index === 0 && <Spacer border="1px solid primary" bg="primary" />}
          </>
        );
      })}
    </Flex>
  );
};

export default RenderingOptionsView;
