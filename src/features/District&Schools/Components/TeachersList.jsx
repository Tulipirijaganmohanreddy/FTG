import {
  Box,
  Checkbox,
  Divider,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getUserData,
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import { ManageUsersData } from "../../ManageUsers/Config";
import { teachersTableData } from "../Config";
// import AddTeacherPop from "./GreenLite/AddTeacherPop";

import { debounce } from "../../../Utilities/utils";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import TableSkeleton from "../../../components/GlobalComponents/TableSkeleton";
import PaginationComponent from "../../../components/PaginationComponent";
import { getTeachersBySchool } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import AddTeacherToSchool from "./AddTeacherToSchool";
import SelectAction from "../../../components/GlobalComponents/SelectAction/Pages/SelectAction";
const TeachersList = () => {
  const { title, tableColumns } = teachersTableData;

  const { actionOptions, actionValues } = ManageUsersData;

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const token = useSelector((state) => state?.profile?.token);

  const schoolUUID = params.schoolId;

  const userRole = useSelector((state) => state?.profile?.selectedRole);

  const getTeachersBySchoolData = useSelector(
    (state) => state?.schoolAdmin?.TeachersBySchool
  );

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const editTeacherCode = useSelector(
    (state) => state?.schoolAdmin?.EditTeacher?.data
  );

  const code = useSelector((state) => state?.profile?.code);

  const manageSchoolsData = useSelector(
    (state) => state?.schoolAdmin?.SchoolsForAdmin
  );

  const loading = useSelector((state) => state?.schoolAdmin?.loading);

  const [pageNumber, setPageNumber] = useState(1);
  const [addTeacherModal, setAddTeacherModal] = useState(false);
  const [selectedUsersInfo, setSelectedUsersInfo] = useState([]);
  const [teacherId, setTeacherId] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [search, setSearch] = useState("");

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const handleSearch = debounce((text) => {
    setSearch(text);
    setPageNumber(1);
    text?.length != 1 &&
      dispatch(
        getTeachersBySchool({
          schoolId: schoolUUID,
          token,
          body: { search_text: text, skip: 1, size: "20" },
        })
      );
  }, 1000);

  const clickOnAssigned = (id) => {
    dispatch(
      setManageUser({
        formTitle: `Edit Teacher`,
        userType: "teacher",
        tab: 1,
        // previousPath: location.pathname,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/teacher/${id}`);
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setTeacherId((prevState) => {
        getTeachersBySchoolData?.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);

        return [...prevState, userId];
      });

      const filetredList = getTeachersBySchoolData?.filter((each) => {
        return each?.uuid === userId;
      });

      setSelectedUsersInfo((prevState) => [...prevState, ...filetredList]);
    } else {
      setSelectedUsersInfo((prevState) => {
        return prevState?.filter((each) => each?.uuid !== userId);
      });

      let dummyUserIds = teacherId.slice();

      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);

      dummyUserIds.splice(userIdIndex, 1);

      setIsAllChecked(false);

      setTeacherId([...dummyUserIds]);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = getTeachersBySchoolData.map((user) => user.uuid);

      setTeacherId(arr);

      let body = {
        class_uuid: arr,
      };
    } else {
      setIsAllChecked(false);
      setTeacherId([]);
    }
  };

  const clickToNavigate = (teacherId) => {
    dispatch(
      setManageUser({
        formTitle: `Edit Teacher`,
        userType: "teacher",
        // previousPath: location.pathname,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/teacher/${teacherId}`);
  };

  useEffect(() => {
    dispatch(
      getTeachersBySchool({
        schoolId: schoolUUID,
        token,
        body: {
          search_text: search?.length ? search : "",
          skip: pageNumber,
          size: "20",
        },
      })
    );
  }, [pageNumber, code]);
  return (
    <>
      <Flex direction="column" gap="4">
        <Divider paddingTop={4} />

        <Heading2>{title}</Heading2>

        <Box
          display={{ base: "flex", lg: "flex" }}
          justifyContent={{ base: "space-between", md: "space-between" }}
          gap={{ base: "0", md: "14" }}
        >
          <HStack gap="2">
            <SearchComponent
              id="searchTeacher"
              name="search"
              placeholder="Search with user lastname"
              display={{ base: "none", md: "flex", lg: "flex " }}
              onChange={(e) => handleSearch(e.target.value)}
            />

            <Box
              onClick={() => {
                dispatch(
                  setManageUser({
                    userType: "teacher",
                  })
                );
              }}
              w={{ base: "80%", md: "50%" }}
            >
              <SelectAction
                role={"Teacher"}
                actionOptions={actionOptions}
                actionValues={actionValues}
                selectedUsersInfo={selectedUsersInfo}
                setSelectedUsersInfo={setSelectedUsersInfo}
                userIds={teacherId}
                userType="teacher"
                setIsAllChecked={setIsAllChecked}
                setUserIds={setTeacherId}
              />
            </Box>
          </HStack>

          <AddTeacherToSchool
            addTeacherModal={addTeacherModal}
            setAddTeacherModal={setAddTeacherModal}
          />
        </Box>
        <Box>
          <SearchComponent
            id="searchTeacher"
            display={{ base: "flex", md: "none", lg: "none " }}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </Box>

        <>
          {loading ? (
            <TableSkeleton />
          ) : (
            <TableContainer
              height="auto"
              maxH="calc(100vh - 12rem)"
              overflowY="auto"
            >
              <Table>
                <Thead>
                  <Tr>
                    <Th>
                      <Flex gap={5}>
                        <Checkbox
                          isChecked={isAllChecked}
                          onChange={handleCheckAll}
                          size="md"
                        />
                        Teacher Name
                      </Flex>
                    </Th>
                    {tableColumns?.map((item, index) => {
                      return (
                        <>
                          <Th key={"a" + index}>{item}</Th>
                        </>
                      );
                    })}
                  </Tr>
                </Thead>
                <Tbody>
                  {getTeachersBySchoolData?.map((item, index) => {
                    return (
                      <>
                        <Tr key={"a" + index}>
                          <Td color={"primary"} cursor={"pointer"}>
                            <Flex gap={5}>
                              <Checkbox
                                isChecked={teacherId.includes(item?.uuid)}
                                onChange={(e) => handleUserIds(e, item.uuid)}
                                size="md"
                              />
                              <Text
                                onClick={() => clickToNavigate(item.uuid)}
                                role="button"
                              >
                                {`${item?.last_name},  ${item?.first_name}`}
                              </Text>
                            </Flex>
                          </Td>
                          <Td>{item?.user_id}</Td>
                          <Td>
                            {item?.login_status == "1" ? "Active" : "Inactive"}
                          </Td>

                          <Td
                            color={"primary"}
                            cursor={"pointer"}
                            textDecoration={"underline"}
                          >
                            <Box
                              role="button"
                              onClick={() => {
                                clickOnAssigned(item.uuid);
                              }}
                            >
                              {" "}
                              {item?.assignedToClass === true
                                ? "Assigned"
                                : "Unassigned"}
                            </Box>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </Table>

              {!getTeachersBySchoolData?.length && (
                <NoDataFoundText>No Records Found</NoDataFoundText>
              )}
            </TableContainer>
          )}

          {totalPages > 1 && (
            <PaginationComponent
              onPageChange={handlePageNumber}
              pageCount={totalPages}
              forcePage={pageNumber - 1}
              isNextButton={isNextButtonDisabled}
              isPreviousButton={isPreviousButtonDisabled}
            />
          )}
        </>
      </Flex>
    </>
  );
};

export default TeachersList;
