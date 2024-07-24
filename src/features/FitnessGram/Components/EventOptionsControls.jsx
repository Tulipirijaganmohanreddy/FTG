import {
  Box,
  Button,
  Circle,
  Flex,
  HStack,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Radio,
  Spacer,
  Spinner,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import ParagraphWithColorBlack from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorBlack";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../Utilities/utils";

import {
  deleteEventData,
  getEventsList,
  setEventsList,
  setTotalPages,
} from "../../teacher/teacherSlice";

import { SearchIcon } from "@chakra-ui/icons";
import { BiEdit } from "react-icons/bi";
import { BsSortAlphaDown, BsSortAlphaUpAlt } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { RxHamburgerMenu } from "react-icons/rx";
import { LuLayoutGrid } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { GiHamburgerMenu } from "react-icons/gi";

import {
  BsPlusCircleFill,
  BsSortNumericDownAlt,
  BsSortNumericUp,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import sort from "../../../assets/Images/FitnessGramEventImages/sort.svg";
import {
  getTeachersBySchoolsApiCall,
  getTeachersForLoginUserApiCall,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { TbArrowsSort } from "react-icons/tb";
import RenderingOptionsView from "../../../components/GlobalComponents/RenderingOptionsView";

const EventOptionsControls = (props) => {
  const { data, setData, handleEventsView, eventsView } = props;

  const eventsGridList = [
    {
      id: 1,
      icon: <LuLayoutGrid size={15} fill="white" />,
      iconText: "GridView",
      tickIcon: <TiTick size={25} fill="white" />,
    },

    {
      id: 2,
      icon: (
        <GiHamburgerMenu
          size={15}
          fill={eventsView === "ListView" ? "white" : ""}
        />
      ),
      iconText: "ListView",
      tickIcon: <TiTick size={25} fill="white" />,
    },
  ];

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchTeacherRef = useRef(null);

  const role = useSelector((state) => state.profile.selectedRole);

  const token = useSelector((state) => state.profile.token);

  const userId = useSelector((state) => state?.profile?.userId);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const teachersListForEvents = useSelector(
    (state) => state.schoolAdmin.teachersListForEvents
  );

  const [teachers, setTeachers] = useState([]);

  const [selectedTeachers, setSelectedTeachers] = useState([
    { label: "All Teachers", value: [] },
  ]);

  const searchEvents = debounce((text) => {
    setData((prevState) => ({ ...prevState, searchTerm: text, pageNumber: 1 }));
    text?.length != 1 &&
      dispatch(
        getEventsList({
          token,
          data: { ...data, searchTerm: text, pageNumber: 1 },
        })
      );
  }, 500);

  const handleTeachers = (selectedTeachersList) => {
    if (selectedTeachersList?.length) {
      if (
        selectedTeachersList?.length > 1 &&
        selectedTeachersList[0].label === "All Teachers"
      ) {
        if (selectedTeachersList[1].label === "All Teachers") {
          return;
        }
        setSelectedTeachers([selectedTeachersList?.[1]]);

        setData((prevState) => ({
          ...prevState,
          teacherUUIDs: [selectedTeachersList[1]?.value],
        }));
      } else {
        let all_value = null;

        if (selectedTeachersList?.length) {
          for (let clas of selectedTeachersList) {
            if (clas.label == "All Teachers") {
              all_value = clas;
              break;
            }
          }
        }

        if (all_value) {
          setSelectedTeachers([all_value]);

          setData((prevState) => ({
            ...prevState,
            teacherUUIDs: all_value.value,
          }));
        } else {
          setSelectedTeachers(selectedTeachersList);

          setData((prevState) => ({
            ...prevState,
            teacherUUIDs: selectedTeachersList?.map((item) => item?.value),
          }));
        }
      }
    } else {
      setSelectedTeachers([]);

      setData((prevState) => ({
        ...prevState,
        teacherUUIDs: [],
      }));
    }
  };

  const handleInputTeachers = debounce((text) => {
    if (text?.length != 1 && searchTeacherRef.current !== text) {
      const body = {
        search: text,
      };
      dispatch(getTeachersForLoginUserApiCall({ body, token }));

      searchTeacherRef.current = text;
    }
  }, 500);

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const editButtonClicked = (item) => {
    navigate("CreateEvent");
  };

  useEffect(() => {
    if (teachersListForEvents?.length) {
      let teacherOptions = [];
      const teacherUuidArr = teachersListForEvents.map((each) => {
        teacherOptions.push({
          label: `${each.last_name} ${each.first_name}`,
          value: each.uuid,
        });
        return each.uuid;
      });

      teacherOptions.unshift({ label: "All Teachers", value: [] });

      setTeachers(teacherOptions);
    } else {
      setTeachers([]);
    }
  }, [teachersListForEvents]);

  return (
    <>
      {/* Header with search, sort and Heading for medium and large devices */}

      <HStack display={{ base: "none", md: "flex" }}>
        <Box display={{ base: "none", lg: "block", md: "block" }}>
          <Flex alignItems={"center"}>
            <Heading1>FITNESS</Heading1>
            <Box mt={{ md: "0.3rem", lg: "0.25rem" }}>
              <ParagraphWithColorBlack increaseTextSize="paragraph2ColorBlackIncreaseText">
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

        {!["student", "teacher"].includes(role) ? (
          <Box display={{ base: "none", md: "flex", lg: "flex " }}>
            <MultiSelector
              id="schoolTeachers"
              label={""}
              value={selectedTeachers}
              placeholder={
                teachersListForEvents?.length == 0
                  ? "No Teachers"
                  : "Select Teacher(s)"
              }
              options={teachers}
              onChange={handleTeachers}
              onInputChange={handleInputTeachers}
              width={{ md: "12rem", lg: "12rem" }}
            ></MultiSelector>
          </Box>
        ) : null}

        <Popover placement="bottom" isLazy>
          <PopoverTrigger cursor="pointer">
            <Flex as="button">
              <Tooltip
                hasArrow
                label="Sort By"
                bg="primary"
                color="white"
                borderRadius={"md"}
              >
                <Box
                  bg="primary"
                  color="white"
                  border="1px solid gray"
                  px="4"
                  borderRadius={"full"}
                  py="0.3rem"
                >
                  <span>
                    <TbArrowsSort fill="white" size={15} />
                  </span>
                </Box>
              </Tooltip>
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

        <Tooltip
          hasArrow
          label="Create Event"
          bg="primary"
          color="white"
          borderRadius={"md"}
        >
          {rolesAndPrevilegesObject?.["FitnessGram Event"]?.is_add ?? true ? (
            <Box
              bg="green"
              color="white"
              border="1px solid gray"
              px="4"
              borderRadius={"full"}
              py="0.3rem"
              cursor={"pointer"}
              role="button"
              onClick={editButtonClicked}
            >
              <span>
                <BsPlusCircleFill fill="white" size={15} />
              </span>
            </Box>
          ) : (
            <Box
              bg="green"
              color="white"
              border="1px solid gray"
              px="4"
              borderRadius={"full"}
              py="0.35rem"
              cursor={"not-allowed"}
            >
              <span>
                <BsPlusCircleFill fill="white" size={15} />
              </span>
            </Box>
          )}
        </Tooltip>

       

        <Box>
          <RenderingOptionsView
            onClick={handleEventsView}
            selectedView={eventsView}
          />
        </Box>
      </HStack>

      {/* mobile device  view */}

      <Flex
        display={{ base: "flex", md: "none", lg: "none" }}
        flexDirection="column"
        gap={3}
      >
        <Box
          display={{ base: "flex" }}
          justifyContent={{ base: "space-between" }}
          alignItems="center"
          gap="2"
          mt="2"
          // mb="4"
          px="1"
        >
          <Flex alignItems={"center"}>
            <Heading1>FITNESS</Heading1>
            <Box mt="0.5">
              <ParagraphWithColorBlack>GRAM</ParagraphWithColorBlack>
            </Box>
          </Flex>
          <Popover
            cursor="pointer"
            trigger="click"
            placement="bottom-start"
            isLazy
          >
            <PopoverTrigger>
              <Flex
                gap="2"
                border={{ base: "1px solid gray" }}
                cursor="pointer"
                px={{ base: "1.5rem", md: "6" }}
                // py="0.2rem"
                rounded="3xl"
                display={{ base: "flex", md: "none", lg: "none " }}
                role="button"
              >
                <Text
                  textStyle={"text"}
                  display={{ base: "flex" }}
                  whiteSpace={"nowrap"}
                >
                  Sort By
                </Text>
                <Image src={sort} w="4" />
              </Flex>
            </PopoverTrigger>

            <Portal>
              <PopoverContent
                position="absolute"
                borderWidth="0"
                boxShadow="lg"
                w="auto"
                zIndex={401} // So it can go above the map.
                right={{ base: "-6rem", md: "0rem", lg: "-6.9rem" }}
              >
                {/* <PopoverArrow /> */}
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
          <Flex
            border="1px solid gray"
            borderLeftRadius={50}
            borderRightRadius={50}
          >
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
                      onClick={() => handleEventsView(each?.iconText)}
                      bg={eventsView === each?.iconText ? "primary" : null}
                      alignItems={"center"}
                      px="2"
                      py="0.2rem"
                      cursor={"pointer"}
                      borderLeftRadius={
                        index === 0 && eventsView === each?.iconText ? 50 : 0
                      }
                      borderRightRadius={
                        index === 1 && eventsView === each?.iconText ? 50 : 0
                      }
                    >
                      <Box>{each?.icon}</Box>
                    </Flex>
                  </Tooltip>

                  {index === 0 && (
                    <Spacer border="1px solid primary" bg="primary" />
                  )}
                </>
              );
            })}
          </Flex>
        </Box>

        <Box w="100%" display={{ base: "flex", md: "none" }}>
          {!["student", "teacher"].includes(role) ? (
            <MultiSelector
              id="schoolTeachers"
              label={""}
              value={selectedTeachers}
              placeholder={
                teachersListForEvents?.length == 0
                  ? "No Teachers for the selected school(s)"
                  : "Select Teacher(s)"
              }
              options={teachers}
              onChange={handleTeachers}
              onInputChange={handleInputTeachers}
              // width={{ base: "100%"}}
            >
              {" "}
            </MultiSelector>
          ) : null}
        </Box>

        <Box display={{ base: "block", md: "none", lg: "none" }}>
          {rolesAndPrevilegesObject?.["FitnessGram Event"]?.is_add ?? true ? (
            role && role !== "student" ? (
              <Box
                cursor={"pointer"}
                display={"flex"}
                gap="2"
                rounded="3xl"
                bg="green"
                // px='4.5rem'
                w="full"
                justifyContent="center"
                py="1"
                onClick={editButtonClicked}
                role="button"
              >
                <Text color="white" textAlign={"center"}>
                  Create Event
                </Text>
                <Box mt="0.2rem">
                  <BsPlusCircleFill fill="white" />
                </Box>
              </Box>
            ) : null
          ) : role && role !== "student" ? (
            <Box
              cursor={"not-allowed"}
              display={"flex"}
              gap="2"
              rounded="3xl"
              bg="green"
              // px='4.5rem'
              w="full"
              justifyContent="center"
              py="1"
            >
              <Text color="white" textAlign={"center"}>
                Create Event
              </Text>
              <Box mt="0.2rem">
                <BsPlusCircleFill fill="white" />
              </Box>
            </Box>
          ) : null}
        </Box>

        <Box>
          <SearchComponent
            id="eventSearch"
            name="searchTerm"
            display={{ base: "flex", lg: "none", md: "none" }}
            onChange={(e) => {
              searchEvents(e.target.value);
            }}
          />
        </Box>
      </Flex>
    </>
  );
};

export default EventOptionsControls;
