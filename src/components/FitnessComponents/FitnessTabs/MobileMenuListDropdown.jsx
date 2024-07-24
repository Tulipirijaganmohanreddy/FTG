import {
  Box,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { IoIosArrowDropdownCircle } from "react-icons/io";

const MobileMenuListDropdown = (props) => {
  const { tabNamesList, handleMobileDropdown, showDropdownActiveItem } = props;

  const dropDownClicked = (selectedItem) => {
    handleMobileDropdown(selectedItem);
  };

  return (
    <>
      <Menu>
        <Box
          display={{ base: "flex", md: "none", lg: "none" }}
          roundedRight={"4rem"}
          justifyContent={"space-between"}
          bg="#ECF4FF"
        >
          <MenuButton
            px={4}
            py={2}
            transition="all 0.2s"
            borderRadius="none"
            borderWidth="none"
            textAlign="left"
          >
            <Text
              textTransform={"uppercase"}
              // fontWeight={"bold"}
              display={"flex"}
              whiteSpace={"nowrap"}
              textStyle="heading2"
            >
              {showDropdownActiveItem}
            </Text>
          </MenuButton>
          <MenuButton>
            <Box marginRight={2}>
              <IoIosArrowDropdownCircle size="20" />
            </Box>
          </MenuButton>
        </Box>

        <MenuList
          border="none"
          w="95vw"
          m="2"
          shadow={"2xl"}
          p="2"
          display={{ base: "block", md: "none", lg: "none" }}
        >
          {tabNamesList?.map((item, index) => (
            <>
              <MenuItem
                rounded={"lg"}
                _hover={{ bg: "blue.500", color: " white" }}
                _focus={{ boxShadow: "outline" }}
                onClick={() => dropDownClicked(item)}
                textStyle="heading2"
                key={`ABCD${index}`}
              >
                {item?.tabTextName}
              </MenuItem>
              <MenuDivider border="0.5px solid gray" fontWeight={"thin"} />
            </>
          ))}
        </MenuList>
      </Menu>
    </>
  );
};

export default MobileMenuListDropdown;
