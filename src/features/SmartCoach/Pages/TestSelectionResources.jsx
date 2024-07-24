import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Grid,
  GridItem,
  Icon,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { BsFileEarmark } from "react-icons/bs";
import { IoMdStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getRecentResourcesByTest,
  getViewResource,
  setRecentResourcesByTest,
} from "../../../store/slices/profileSlice";
import { getFgEventsList, setTotalPages } from "../../teacher/teacherSlice";
import { SmartCoach } from "../Config";

const TestSelectionResources = () => {
  const { notAvailableText } = SmartCoach;

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const refArray = ["districtAdmin", "stateAdmin"];

  const userId = useSelector((state) => state?.profile?.userId);
  const role = useSelector((state) => state.profile.selectedRole);
  const eventsList = useSelector((state) => state?.teacher?.fgEventsList);
  const loading = useSelector((state) => state?.profile?.loading);

  const token = useSelector((state) => state?.profile?.token);
  const totalPages = useSelector((state) => state.teacher.totalPages);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchTerm, setSearchTerm] = useState(null);

  const requiredOptions = [
    { value: "all", option: "All" },
    { option: "FitnessGram", value: "fitnessGram" },
    { option: "ActivityGram", value: "activityGram" },
    { option: "ActivityLog", value: "activityGramLog" },
  ];

  const [eventType, setEventType] = useState("");
  const [eventId, setEventId] = useState("");

  const recentRecommendedList = useSelector(
    (state) => state?.profile?.recentResourcesByTest
  );

  const [recentRecommendedListItems, setRecentRecommendedListItems] = useState(
    recentRecommendedList
  );

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const handleViewResource = (url) => {
    const filePath = encodeURIComponent(url?.split(".com/")[1]);

    dispatch(
      getViewResource({ token, filePath, isDownload: "false", module: "cms" })
    );
  };
  const handleUrlDocumentView = (url) => {
    window.open(url, "_blank");
  };

  const onChange = (e) => {
    setSearchTerm(e.target.value);
    setPageNumber(1);
  };

  useEffect(() => {
    refArray.includes(role) &&
      dispatch(getFgEventsList({ userId, token, role }));
  }, []);

  useEffect(() => {
    if (params?.eventId) {
      setEventId(params?.eventId);
      setEventType(params?.eventType);
    }
  }, [params?.eventId]);

  useEffect(() => {
    if (eventType === "fitnessGram" || params?.eventId || eventId?.length) {
      dispatch(setRecentResourcesByTest([]));
      let body = {
        event_uuid: params?.eventId ? params.eventId : eventId,
        assessment_name: params?.eventType ? params.eventType : eventType,
        skip: pageNumber,
        search: searchTerm,
      };
      (eventId?.length || params?.eventId) &&
        dispatch(getRecentResourcesByTest({ token, body }));
    } else {
      let body = {
        // event_uuid: '',
        assessment_name: eventType?.length ? eventType : "all",
        skip: pageNumber,
        search: searchTerm,
      };
      dispatch(getRecentResourcesByTest({ token, body }));
    }
  }, [eventType, params?.eventType, eventId, pageNumber, searchTerm]);

  useEffect(() => {
    setRecentRecommendedListItems(recentRecommendedList);
  }, [recentRecommendedList]);

  useEffect(() => {
    dispatch(getFgEventsList({ token }));
  }, []);
  useEffect(() => {
    dispatch(setRecentResourcesByTest([]));
    setRecentRecommendedListItems(recentRecommendedList);
  }, []);

  return (
    <>
      <Grid
        templateColumns={{ base: "repeat(1,1fr)", md: "repeat(3,1fr)" }}
        gap={{ base: "1", md: "6" }}
        my={{ base: "2", md: "7" }}
      >
        <GridItem>
          {" "}
          <Stack>
            <SingleSelect2
              id="assessmentType"
              label={"Select the Assessment"}
              onChange={(e) => {
                setEventType(e.target.value);
                dispatch(setTotalPages(""));
                setSearchTerm("");
                setSearchResources([]);
                setFilteredList([]);
                !params?.eventType && setEventId("");
                params?.eventType ? navigate(`/role/${role}/SmartCoach`) : null;
              }}
              value={eventType?.length ? eventType : "all"}
              optionsProps={requiredOptions}
              displayKey={"option"}
              optionValue={"value"}
            />
          </Stack>
        </GridItem>
        {eventType === "fitnessGram" || params?.eventType ? (
          <GridItem>
            {" "}
            <SingleSelect2
              id="eventName"
              placeholder="Select Event"
              label={"Select the Event Name"}
              onChange={(e) => {
                setEventId(e.target.value), setSearchTerm("");

                params?.eventId ? navigate(`/role/${role}/SmartCoach`) : null;
              }}
              value={eventId}
              optionsProps={eventsList}
              displayKey={"event_name"}
              optionValue={"uuid"}
            />
          </GridItem>
        ) : null}

        <GridItem>
          <>
            <Inputs
              id="resourcesSearch"
              label={"Search"}
              onChange={onChange}
              type="text"
              name="search"
              placeholder="Search"
              value={searchTerm}
            />
          </>
        </GridItem>
      </Grid>

      <Flex direction="column">
        {loading ? (
          <Center h="80vh">
            <Spinner color="gray-3" />
          </Center>
        ) : recentRecommendedListItems !== undefined &&
          recentRecommendedListItems?.length > 0 ? (
          recentRecommendedListItems?.map((each) => (
            <Card
              role="button"
              bg="#f5f5f5"
              boxShadow="sm"
              h="12"
              border="1"
              mb="2"
              borderColor="yellow.600"
            >
              <CardBody
                display="flex"
                alignItems="center"
                justifyContent="flex-start"
                m="0"
                p="0"
                cursor={"pointer"}
                onClick={() =>
                  each?.file_url
                    ? handleViewResource(each?.file_url)
                    : handleUrlDocumentView(each?.url)
                }
              >
                <Icon as={IoMdStarOutline} w={8} h={6} color="#FECE50" />
                <Icon as={BsFileEarmark} w={6} h={6} color="#EE373E" />
                <Text px="5" textStyle={"p"}>
                  {each?.title}
                </Text>
              </CardBody>
            </Card>
          ))
        ) : (
          <Box
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            fontWeight={"bold"}
          >
            {eventType === "fitnessGram" && !eventsList?.length
              ? "No Events Found for the user "
              : !eventId?.length && eventType === "fitnessGram"
              ? "Please Select the Event"
              : !recentRecommendedListItems?.length
              ? `${notAvailableText}`
              : ""}
          </Box>
        )}
      </Flex>
      {totalPages > 1 && (
        <Flex
          justifyContent={{ base: "flex-end", lg: "flex-end" }}
          marginRight={{ base: "5px", md: "20px" }}
          my={{ base: "2rem", md: "3rem" }}
        >
          <PaginationComponent
            onPageChange={handlePageNumber}
            pageCount={totalPages}
            forcePage={pageNumber - 1}
            isNextButton={isNextButtonDisabled}
            isPreviousButton={isPreviousButtonDisabled}
          />
        </Flex>
      )}
    </>
  );
};

export default TestSelectionResources;
