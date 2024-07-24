import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getStudentsListForReportsApiCall,
  setSelectedStudentUUIDForReport,
} from "../../../../DistrictAdminApis/districtAdminSlice";
import { academicYear } from "../../../../Utilities/utils";
import { setTotalPages } from "../../../../features/teacher/teacherSlice";
import { getStudentReportApiCall } from "../../../../store/slices/profileSlice";
import NoDataFoundText from "../../../FitnessComponents/FitnessTexts/NoDataFoundText";
import PaginationComponent from "../../../PaginationComponent";
import LoadingComponent from "../../LoadingComponent";
import Report from "../Components/Report";

const StudentReportsDashboardList = ({ searchInputRef }) => {
  const dispatch = useDispatch();

  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const loading = useSelector((state) => state.profile.loading);

  const veiwReportLoading = useSelector((state) => state.profile.upLoading);

  const studentsListForReports = useSelector(
    (state) => state?.districtAdmin?.studentsListForReports
  );

  const reportPayload = useSelector(
    (state) => state.districtAdmin.initialPayloadForReports
  );

  const selectedStudentUUIDForReport = useSelector(
    (state) => state?.districtAdmin?.selectedStudentUUIDForReport
  );

  const token = useSelector((state) => state?.profile?.token);

  const totalPages = useSelector((state) => state.teacher.totalPages);

  const [pageNumber, setPageNumber] = useState(1);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const [studentUuid, setStudentUuid] = useState("");

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);

    const finalObj = {
      ...reportPayload,
      skip: event.selected + 1,
      search: searchInputRef?.current?.value,
    };

    dispatch(getStudentsListForReportsApiCall({ finalObj, token }));
  };

  const handleClick = (studentDetails) => {
    dispatch(setSelectedStudentUUIDForReport(studentDetails.uuid));

    const finalObj = {
      ...reportPayload,
      school_uuids: reportPayload?.schools,
      student_uuid: studentDetails?.uuid,
    };

    dispatch(getStudentReportApiCall({ body: finalObj, token }));
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedStudentUUIDForReport(null));
      dispatch(setTotalPages(""));
    };
  }, []);

  useEffect(() => {
    setPageNumber(1);
  }, [reportPayload]);

  return (
    <>
      <Flex direction="column" gap="4">
        {loading ? (
          <Box
            h="100%"
            w="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <LoadingComponent />
          </Box>
        ) : (
          <Accordion key={"student"} allowToggle>
            {studentsListForReports?.length ? (
              studentsListForReports?.map((each, id) => (
                <AccordionItem
                  border="none"
                  display={{ base: "block", md: "block" }}
                  key={"student" + id}
                  mb="4"
                >
                  <AccordionButton
                    px="2"
                    background={"#F5F9FF"}
                    _hover={{ bg: "#F5F9FF", color: "black" }}
                    roundedTop={"2xl"}
                    _focus={{
                      boxShadow: "none",
                      bg: "primary",
                      color: "white",
                    }}
                    _active={{ bg: "primary", color: "white" }}
                    py={4}
                    onClick={(e) => {
                      each?.uuid !== selectedStudentUUIDForReport &&
                        handleClick(each);
                    }}
                    position={"relative"}
                  >
                    <SimpleGrid templateColumns="repeat(24, 1fr)" gap="2">
                      <GridItem
                        colSpan="5"
                        display={"flex"}
                        overflow="hidden"
                        textAlign="start"
                        whiteSpace="nowrap"
                      >
                        <Box marginRight={2} >
                          <FaUser
                            display={{ base: "none", md: "inline-block" }}
                            size={20}
                          />
                        </Box>

                        <Tooltip
                          label={`${each?.last_name} ${each?.first_name}`}
                          aria-label="A tooltip"
                          bg="black"
                          placement="bottom-start"
                        >
                          {`${each?.last_name}, ${each?.first_name}`}
                        </Tooltip>
                      </GridItem>

                      <GridItem colSpan="2" textAlign="start">
                        <Text
                          whiteSpace={"nowrap"}
                        >{`Age : ${each?.age}`}</Text>
                      </GridItem>

                      <GridItem colSpan="2" textAlign="start">
                        <Text
                          whiteSpace={"nowrap"}
                        >{`Grade : ${each?.grade}`}</Text>
                      </GridItem>

                      <GridItem
                        colSpan="3"
                        textAlign="start"
                        overflow="hidden"
                        whiteSpace="nowrap"
                      >
                        <Tooltip
                          label={`DOB : ${each?.date_of_birth}`}
                          aria-label="A tooltip"
                          bg="black"
                          placement="bottom-start"
                        >
                          {`DOB : ${each?.date_of_birth}`}
                        </Tooltip>
                      </GridItem>

                      <GridItem
                        colSpan="3"
                        overflow="hidden"
                        textAlign="start"
                        whiteSpace="nowrap"
                      >
                        <Tooltip
                          label={`Teacher : ${
                            each?.teachers?.split(" ")?.[1] !== undefined
                              ? each?.teachers?.split(" ")?.[1]
                              : "N/A"
                          }`}
                          aria-label="A tooltip"
                          bg="black"
                          placement="bottom-start"
                        >
                          {`Teacher : ${
                            each?.teachers?.split(" ")?.[1] !== undefined
                              ? each?.teachers?.split(" ")?.[1]
                              : "N/A"
                          }`}
                        </Tooltip>
                      </GridItem>

                      <GridItem
                        colSpan="4"
                        overflow="hidden"
                        textAlign="start"
                        whiteSpace="nowrap"
                      >
                        <Tooltip
                          label={`Student ID : ${each?.student_id}`}
                          aria-label="A tooltip"
                          bg="black"
                          placement="bottom-start"
                        >
                          {`Student ID : ${each?.student_id}`}
                        </Tooltip>
                      </GridItem>

                      <GridItem
                        colSpan="5"
                        overflow="hidden"
                        textAlign="start"
                        whiteSpace="nowrap"
                      >
                        <Tooltip
                          label={`School : ${each?.school_name}`}
                          aria-label="A tooltip"
                          bg="black"
                          placement="bottom-start"
                        >
                          {`School : ${each?.school_name}`}
                        </Tooltip>
                      </GridItem>
                    </SimpleGrid>

                    <Box position={"absolute"} right="5">
                      <AccordionIcon />
                    </Box>
                  </AccordionButton>

                  <AccordionPanel pb={4} textAlign="center">
                    {selectedStudentUUIDForReport === each?.uuid ? (
                      <Report />
                    ) : null}
                  </AccordionPanel>
                </AccordionItem>
              ))
            ) : (
              <NoDataFoundText>No Data Found</NoDataFoundText>
            )}
          </Accordion>
        )}

        {totalPages > 1 && !loading && (
          <PaginationComponent
            onPageChange={handlePageNumber}
            pageCount={totalPages}
            forcePage={pageNumber - 1}
            isNextButton={isNextButtonDisabled}
            isPreviousButton={isPreviousButtonDisabled}
          />
        )}
      </Flex>
    </>
  );
};

export default StudentReportsDashboardList;
