import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Select,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import SingleSelect2 from "../../../FitnessComponents/FitnessSelect/SingleSelect2";

import { reportFilterData } from "../Config/config";
import Inputs from "../../../FitnessComponents/FitnessSelect/Inputs";

import {useState} from 'react'
import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";

import { FcClearFilters } from "react-icons/fc";



const ReportFilterModal = () => {

  
  const { isOpen, onOpen, onClose } = useDisclosure();

  const date = new Date();

  const year = date.getFullYear();

  const [assessments, setAssessments] = useState({
    "Last 30 Days": false,
    "Last 3 Months": false,
    "Last 6 Months": false,
    "This Year": true,
  });

  const [reportOutputButtons, setReportOutputButtons] = useState({
    View: true,
    Email: false,
    Scedule: false,
  });

  const [isViewMoreButtonClicked, setIsViewMoreButtonClicked] = useState(false);

  const [data, setData] = useState({
    schoolYear: `${year - 1} - ${year}`,
    printComposition: true,
  });

  const handlechange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleAssesments = (selectedItem) => {
    setAssessments((prevState) => {
      const updatedAssesments = {};

      Object.keys(prevState)?.map((key) => {
        updatedAssesments[key] = key === selectedItem;
      });

      return updatedAssesments;
    });
  };

  const handleReportOptions = (selectedItem) => {
    setReportOutputButtons((prevState) => {
      const updatedButtons = {};

      Object.keys(prevState)?.map((key) => {
        updatedButtons[key] = key === selectedItem;
      });

      return updatedButtons;
    });
  };

  const handleView = () => {
    setIsViewMoreButtonClicked(!isViewMoreButtonClicked);
  };

  return (
    <Popover placement="bottom-end" isLazy>
      <PopoverTrigger cursor="pointer">
        <HStack
          bg="fit"
          p="2"
          rounded={"lg"}
          display={{ base: "none", lg: "flex", md: "flex" }}
          cursor={"pointer"}
          onClick={onOpen}
        >
          <Paragraph2 textColor="white">Report filters</Paragraph2>

          <FcClearFilters color="white" size={20} />
        </HStack>
      </PopoverTrigger>

      <PopoverContent
        position="absolute"
        borderWidth="0"
        w="20rem"
        bg="white"
        zIndex={401} // So it can go above the map.
        right="0"
      >
        {/* <PopoverArrow /> */}
        <PopoverBody
          userSelect="none"
          whiteSpace="nowrap"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          gap="4"
          boxShadow="2xl"
        >
          <Text textColor="#1890ff" mt="4">
            Report Filters
          </Text>

          <Grid templateColumns={{ base: "repeat(1, 1fr)" }} gap="3">
            {reportFilterData?.inputFilesList?.map((item) =>
              item.type === "select" ? (
                <GridItem>
                  <SingleSelect2
                    placeholder={item?.placeholder}
                    label={item.lable}
                    // onChange={handleChange}
                    name={item?.name}
                    optionsProps={
                      item?.name === "state" ? statesList : item?.options
                    }
                    displayKey={item?.name === "state" ? "state" : "lable"}
                    optionValue={item?.name === "state" ? "code" : "value"}
                  />
                </GridItem>
              ) : item?.name === "assesments" ? (
                <GridItem>
                  <Box>
                    <Paragraph2 textColor="black">
                      SELECT ASSESSMENTS
                    </Paragraph2>
                  </Box>
                  <Flex
                    flexGrow={"1"}
                    flexWrap={{ base: "wrap", md: "wrap" }}
                    gap={3}
                    justifyContent={{ base: "space-between", md: "flex-start" }}
                    fontFamily={"body"}
                    fontSize={{ base: "sm", md: "md", lg: "sm" }}
                  >
                    {Object.keys(assessments)?.map((each) => (
                      <>
                        <Box
                          background="white"
                          cursor="pointer"
                          w="7.5rem"
                          py="2"
                          textAlign="center"
                          borderRadius="md"
                          border={
                            assessments[each]
                              ? "1px solid  #0081C8"
                              : "1px solid rgb(134, 133, 133)"
                          }
                          marginRight="3"
                          bg={assessments[each] ? "#0081C8" : "white"}
                          onClick={() => handleAssesments(each)}
                        >
                          <Paragraph2
                            textColor={assessments[each] ? "white" : "black"}
                          >
                            {each}
                          </Paragraph2>
                        </Box>
                      </>
                    ))}
                  </Flex>
                </GridItem>
              ) : item?.type === "text" ? (
                <GridItem>
                  <Inputs
                    type={item.type}
                    label={item.lable}
                    name={item.name}

                    // onChange={handleChange}
                  />
                </GridItem>
              ) : null
            )}
          </Grid>

          <Box>
            <Paragraph2 textColor="black">REPORT OPTIONS</Paragraph2>
            <Flex justifyContent={"flex-start"} alignItems={"center"}>
              <Box marginTop="1" marginRight="2">
                <Paragraph2 textColor="black">
                  PRINT BODY COMPOSITION
                </Paragraph2>
              </Box>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                onChange={(prevState) => {
                  setData((prevState) => ({
                    ...data,
                    printComposition: !prevState["printComposition"],
                  }));
                }}
              >
                <Checkbox isChecked={data["printComposition"]} />
              </Box>
            </Flex>
          </Box>

          <Center>
            <Button
              background="#1890ff"
              color="white"
              borderRadius="3xl"
              py="4"
              size="sm"
            >
              Run Report
            </Button>
          </Center>

          {/* {isViewMoreButtonClicked ? (
            <Box>
              <Paragraph2 textColor="black">REPORT OUTPUT</Paragraph2>
	@@ -274,10 +277,10 @@ const ReportFilterModal = () => {
              </Flex>
            </Box>
          ) : null} */}
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default ReportFilterModal;
