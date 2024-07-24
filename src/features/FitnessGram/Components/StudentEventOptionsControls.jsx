import React, { useEffect, useState } from "react";
import girlImg from "../../../assets/Images/FitnessGramEventImages/Group 3776@2x.png";
import calendarImg from "../../../assets/Images/FitnessGramEventImages/Icon awesome-calendar-alt@2x.png";
import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import noEvents_teacher from "../../../assets/Images/FitnessGramEventImages/noEvents_teacher.svg";
import sort from "../../../assets/Images/FitnessGramEventImages/sort.svg";

import pendingImage from "../../../assets/Images/ActivityGramEventImages/clock-rotate-right-icon.svg";
import tickImage from "../../../assets/Images/ActivityGramEventImages/tick-icon.svg";
import excerciseImg from "../../../assets/Images/FitnessGramEventImages/exerciseIcon.svg";
import run from "../../../assets/Images/FitnessGramEventImages/undraw_fitness_stats_sht6 (1)@2x.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Center,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Img,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Radio,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import moment from "moment";
import {
  BsSortAlphaDown,
  BsSortAlphaUpAlt,
  BsSortNumericDownAlt,
  BsSortNumericUp,
} from "react-icons/bs";
import { debounce } from "../../../Utilities/utils";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import Paragraph2new from "../../../components/FitnessComponents/FitnessTexts/Paragraph2new";
import ParagraphWithColorBlack from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorBlack";
import ParagraphWithColorPrimary from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorPrimary";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";
import { getEventsList } from "../../teacher/teacherSlice";
import StudentEventPopup from "../Components/StudentEventPopup";
import StudentEventDataCard from "../Components/StudentEventDataCard";

const StudentEventOptionsControls = ({ data, handleChange, searchEvents }) => {
  return (
    <>
      <HStack>
        <Box display={{ base: "none", lg: "block", md: "block" }}>
          <Flex alignItems={"center"}>
            <Heading1>FITNESS</Heading1>
            <Box>
              <ParagraphWithColorBlack
                increaseTextSize="paragraph2ColorBlackIncreaseText"
                mb={-0.5}
              >
                GRAM
              </ParagraphWithColorBlack>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <SearchComponent
          id="eventSearch"
          name="searchTerm"
          display={{ base: "none", md: "flex", lg: "flex " }}
          onChange={(e) => {
            searchEvents(e.target.value);
          }}
          inlineSize="48"
        />

        <Popover placement="bottom" isLazy>
          <PopoverTrigger cursor="pointer">
            <Flex
              gap="2"
              border={"1px solid gray"}
              cursor="pointer"
              px="4"
              py="0.2rem"
              rounded="3xl"
              display={{ base: "none", md: "flex", lg: "flex " }}
              alignItems="center"
              as="button"
            >
              <Text textStyle={"textHead"}>Sort By</Text>
              <Image src={sort} />
            </Flex>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              // position="absolute"
              borderWidth="1px"
              boxShadow="lg"
              w="auto"
              zIndex={401} // So it can go above the map.
              // right={{ base: "-3rem", md: "-6.5rem", lg: "-6.9rem" }}
            >
              <PopoverArrow
                borderTop="1px solid gray"
                borderLeft="1px solid gray"
              />
              <PopoverBody userSelect="none" whiteSpace="nowrap">
                <Label1 name={"eventSort"}></Label1>

                <Stack>
                  <HStack>
                    <Icon as={BsSortNumericUp} boxSize="4" />
                    <Text>Event Start Date</Text>
                    <Spacer />
                    <Radio
                      id="eventSort"
                      onChange={handleChange}
                      name="sortCondition"
                      value="event_start_date_ASC"
                      isChecked={data.sortCondition === "event_start_date_ASC"}
                    ></Radio>
                  </HStack>
                  <HStack>
                    <Icon as={BsSortNumericDownAlt} boxSize="4" />
                    <Text>Event Start Date</Text>
                    <Spacer />
                    <Radio
                      id="eventSort"
                      onChange={handleChange}
                      name="sortCondition"
                      value="event_start_date_DESC"
                      isChecked={data.sortCondition === "event_start_date_DESC"}
                    ></Radio>
                  </HStack>

                  <HStack>
                    <Icon as={BsSortAlphaDown} boxSize="4" />
                    <Text> A to Z</Text>
                    <Spacer />
                    <Radio
                      id="eventSort"
                      onChange={handleChange}
                      name="sortCondition"
                      value="alphabetic_ASC"
                      isChecked={data.sortCondition === "alphabetic_ASC"}
                    ></Radio>
                  </HStack>

                  <HStack>
                    <Icon as={BsSortAlphaUpAlt} boxSize="4" />
                    <Text>Z to A</Text>
                    <Spacer />

                    <Radio
                      id="eventSort"
                      onChange={handleChange}
                      name="sortCondition"
                      value="alphabetic_DESC"
                      isChecked={data.sortCondition === "alphabetic_DESC"}
                    ></Radio>
                  </HStack>
                </Stack>
              </PopoverBody>
            </PopoverContent>
          </Portal>
        </Popover>
      </HStack>

      <HStack display={{ base: "block", md: "none", lg: "none" }} mb="5">
        <Box
          display={{ base: "flex" }}
          justifyContent={{ base: "space-between" }}
          alignItems="center"
          gap="2"
          mt="2"
          mb="4"
          px="1"
        >
          <Flex alignItems={"center"}>
            <Heading1>FITNESS</Heading1>
            <Box>
              <ParagraphWithColorBlack mb="-0.25">GRAM</ParagraphWithColorBlack>
            </Box>
          </Flex>

          <Popover placement="bottom" isLazy>
            <PopoverTrigger cursor="pointer">
              <Flex
                gap="2"
                border={"1px solid gray"}
                cursor="pointer"
                px="4"
                py="0.2rem"
                rounded="3xl"
                display={{ base: "flex", md: "flex", lg: "flex " }}
                alignItems="center"
                as="button"
              >
                <Text textStyle={"textHead"}>Sort By</Text>
                <Image src={sort} />
              </Flex>
            </PopoverTrigger>
            <Portal>
              <PopoverContent
                // position="absolute"
                borderWidth="1px"
                boxShadow="lg"
                w="auto"
                zIndex={401} // So it can go above the map.
                // right={{ base: "-3rem", md: "-6.5rem", lg: "-6.9rem" }}
              >
                <PopoverArrow
                  borderTop="1px solid gray"
                  borderLeft="1px solid gray"
                />
                <PopoverBody userSelect="none" whiteSpace="nowrap">
                  <Label1 name={"eventSort"}></Label1>

                  <Stack>
                    <HStack>
                      <Icon as={BsSortNumericUp} boxSize="4" />
                      <Text>Event Start Date</Text>
                      <Spacer />
                      <Radio
                        id="eventSort"
                        onChange={handleChange}
                        name="sortCondition"
                        value="event_start_date_ASC"
                        isChecked={
                          data.sortCondition === "event_start_date_ASC"
                        }
                      ></Radio>
                    </HStack>
                    <HStack>
                      <Icon as={BsSortNumericDownAlt} boxSize="4" />
                      <Text>Event Start Date</Text>
                      <Spacer />
                      <Radio
                        id="eventSort"
                        onChange={handleChange}
                        name="sortCondition"
                        value="event_start_date_DESC"
                        isChecked={
                          data.sortCondition === "event_start_date_DESC"
                        }
                      ></Radio>
                    </HStack>

                    <HStack>
                      <Icon as={BsSortAlphaDown} boxSize="4" />
                      <Text> A to Z</Text>
                      <Spacer />
                      <Radio
                        id="eventSort"
                        onChange={handleChange}
                        name="sortCondition"
                        value="alphabetic_ASC"
                        isChecked={data.sortCondition === "alphabetic_ASC"}
                      ></Radio>
                    </HStack>

                    <HStack>
                      <Icon as={BsSortAlphaUpAlt} boxSize="4" />
                      <Text>Z to A</Text>
                      <Spacer />

                      <Radio
                        id="eventSort"
                        onChange={handleChange}
                        name="sortCondition"
                        value="alphabetic_DESC"
                        isChecked={data.sortCondition === "alphabetic_DESC"}
                      ></Radio>
                    </HStack>
                  </Stack>
                </PopoverBody>
              </PopoverContent>
            </Portal>
          </Popover>
        </Box>
        <Box>
          <SearchComponent
            name="searchTerm"
            id="eventSearch"
            display={{ base: "flex", lg: "none", md: "none" }}
            onChange={(e) => {
              searchEvents(e.target.value);
            }}
          />
        </Box>
      </HStack>
    </>
  );
};

export default StudentEventOptionsControls;
