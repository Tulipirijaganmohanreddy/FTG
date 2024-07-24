import { Box, Card, CardBody, Flex, Img, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import pendingImage from "../../../assets/Images/ActivityGramEventImages/clock-rotate-right-icon.svg";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import { getStudentFitnessGramList } from "../../../store/slices/studentSlice/studentSlice";
import { getFgEventsList } from "../../teacher/teacherSlice";

import { debounce } from "../../../Utilities/utils";
import tickImage from "../../../assets/Images/ActivityGramEventImages/tick-icon.svg";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import {
  setActivatingID,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import { getEventsList } from "../../teacher/teacherSlice";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";

const StudentEnterDataDashboard = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  //using the user varibale from profileslice

  const loginResponse = useSelector((state) => state?.profile?.user);

  const token = useSelector((state) => state?.profile?.token);

  const userRole = useSelector((state) => state.profile.selectedRole);

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const studentEventsList = useSelector((state) => state?.teacher?.eventsList);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const activatingId = useSelector((state) => state.profile.activatingID);

  const [data, setData] = useState({
    pageNumber: 1,
    sortCondition: "event_start_date_ASC",
    searchTerm: "",
  });

  const isPreviousButtonDisabled = data.pageNumber === 1;
  const isNextButtonDisabled = data.pageNumber === totalPages;

  const studentResultSelectedItem = (item) => {
    dispatch(setPreviousPath(location.pathname));
    navigate(`/role/Student/EnterStudentDataTable/${item.uuid}`);
  };

  const handlePageNumber = (event) => {
    setData((prevState) => ({ ...prevState, pageNumber: event.selected + 1 }));

    dispatch(
      getEventsList({
        token,
        data: { ...data, pageNumber: event.selected + 1 },
      })
    );
  };

  const searchEvents = debounce((text) => {
    setData((prevState) => ({ ...prevState, searchTerm: text, pageNumber: 1 }));
    text?.length != 1 &&
      dispatch(
        getEventsList({
          token,
          data: { ...data, searchTerm: text, pageNumber: 1 },
        })
      );
  }, 1500);

  useEffect(() => {
    const data = {
      pageNumber: 1,
      sortCondition: "event_start_date_ASC",
      searchTerm: "",
    };
    dispatch(getEventsList({ token, data }));

    if (activatingId == 5 || activatingId == 6) {
      dispatch(setActivatingID(2));
    }
  }, []);

  return (
    <Flex direction="column" gap="4">
      <Flex justifyContent={"space-between"} alignItems={"center"}>
        <Heading1>ENTER TEST RESULTS</Heading1>

        <Box>
          <SearchComponent
            name="searchTerm"
            id="eventSearch"
            display={{ base: "flex" }}
            onChange={(e) => {
              searchEvents(e.target.value);
            }}
          />
        </Box>
      </Flex>

      {studentEventsList?.length > 0 ? (
        rolesAndPrevilegesObject?.["FitnessGram Data Entry"]?.view ?? true ? (
          studentEventsList?.map((each) => (
            <Card
              role="button"
              bg="#f5f5f5"
              boxShadow="sm"
              h="14"
              border="1"
              borderColor="yellow.600"
              mt="3"
              cursor={"pointer"}
            >
              <CardBody
                css={{ paddingLeft: "8px !important" }}
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                onClick={() => {
                  studentResultSelectedItem(each);
                }}
              >
                <Box>
                  <Heading4>{each.event_name}</Heading4>
                </Box>

                <Flex gap="1" cursor="pointer" paddingLeft="3">
                  <Img
                    src={each.results ? tickImage : pendingImage}
                    alt="image"
                  />

                  <Box mt="0.5">
                    <NormalHeading
                      changeTextColor={each.results ? "fit" : "red"}
                    >
                      {each.results ? "Validated" : "Pending"}
                    </NormalHeading>
                  </Box>
                </Flex>
              </CardBody>
            </Card>
          ))
        ) : (
          <Text>NO ACCESS TO VIEW DATA</Text>
        )
      ) : (
        <Text>NO DATA FOUND</Text>
      )}

      {totalPages > 1 && (
        <Flex
          justifyContent={{ base: "flex-end", lg: "flex-end" }}
          marginRight={{ base: "5px", md: "20px" }}
          my={{ base: "2rem", md: "3rem" }}
        >
          <PaginationComponent
            onPageChange={handlePageNumber}
            pageCount={totalPages}
            forcePage={data?.pageNumber - 1}
            isNextButton={isNextButtonDisabled}
            isPreviousButton={isPreviousButtonDisabled}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default StudentEnterDataDashboard;
