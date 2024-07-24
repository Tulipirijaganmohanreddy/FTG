import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoAddCircleSharp } from "react-icons/io5";
import { classTableData } from "../config";

import { useDispatch, useSelector } from "react-redux";
import TextIcon from "../../../components/TextIcon";
import AddStudentModal from "./AddStudentModal";

import moment from "moment";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import loadingimg from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import SelectAction from "../../../components/GlobalComponents/SelectAction/Pages/SelectAction";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getUserData,
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getSchoolAdminStudentByClassesCall,
  getUsersAction,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";

const ClassTable = () => {
  const {
    tableName,
    actions,
    addStudentoClass,
    tableColumns,
    rows,
    actionValues,
  } = classTableData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const loading = useSelector((state) => state?.schoolAdmin?.loading);
  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const userRole = useSelector((state) => state.profile.selectedRole);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const code = useSelector((state) => state?.profile?.code);

  const studentRoaster = useSelector(
    (state) => state.schoolAdmin.schoolAdminStudentByClasses
  );

  const [addStudentModal, setAddStudentModal] = useState(false);
  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const [selectedUsersInfo, setSelectedUsersInfo] = useState([]);

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
    // dispatch(setCurrentPageNumber(event.selected+1))
  };

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setUserIds((prevState) => {
        studentRoaster?.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);

        return [...prevState, userId];
      });

      const filetredList = studentRoaster?.filter((each) => {
        return each?.uuid === userId;
      });

      setSelectedUsersInfo((prevState) => [...prevState, ...filetredList]);
    } else {
      setSelectedUsersInfo((prevState) => {
        return prevState?.filter((each) => each?.uuid !== userId);
      });

      let dummyUserIds = userIds.slice();
      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);
      studentRoaster?.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = studentRoaster?.map((user) => user.uuid);
      setUserIds(arr);
    } else {
      setIsAllChecked(false);
      setUserIds([]);
    }
  };

  const handleEditStudent = (item) => {
    dispatch(getUserData({ id: item.uuid, token }));
    dispatch(
      setManageUser({
        formTitle: `Edit Student`,
        userType: "student",
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/student/${item.uuid}`);
  };

  useEffect(() => {
    dispatch(
      getSchoolAdminStudentByClassesCall({
        token,
        classId: params.classId,
        skip: pageNumber,
      })
    );
  }, [pageNumber]);

  useEffect(() => {
    if (code === 200) {
      dispatch(
        getSchoolAdminStudentByClassesCall({
          token,
          classId: params.classId,
          skip: pageNumber,
        })
      );
      setAddStudentModal(false);
      setUserIds([]);
      setIsAllChecked(false);
    }
  }, [code]);

  useEffect(() => {
    dispatch(setTotalPages(""));
  }, []);

  return (
    <>
      <Divider />

      {loading ? (
        <Flex justify="center">
          <Image src={loadingimg} />
        </Flex>
      ) : (
        <>
          <Flex
            justify="space-between"
            w={{ base: "auto" }}
            display={{ lg: "flex", base: "flex flex-col", md: "flex" }}
            alignItems="center"
          >
            <Flex
              justifyContent="space-between"
              gap={{ base: "2", md: "8" }}
              alignItems="center"
            >
              <Box whiteSpace="nowrap">
                <Heading2 increaseTextSize="boldSubHead">Class Roster</Heading2>
              </Box>

              {userRole !== "teacher" ? (
                <Box
                  inlineSize={{ base: "auto", lg: "12em", md: "11em" }}
                  onClick={() => {
                    dispatch(
                      setManageUser({
                        userType: "student",
                      })
                    );
                  }}
                  size="sm"
                >
                  <SelectAction
                    role={"Student"}
                    actionOptions={actions}
                    actionValues={actionValues}
                    setUserIds={setUserIds}
                    userIds={userIds}
                    setIsAllChecked={setIsAllChecked}
                    isAllChecked={isAllChecked}
                    selectedUsersInfo={selectedUsersInfo}
                    setSelectedUsersInfo={setSelectedUsersInfo}
                    userType="student"
                  />
                </Box>
              ) : null}
            </Flex>
            {userRole !== "teacher" ? (
              <Box
                onClick={() => {
                  dispatch(setPreviousPath(location.pathname));
                  setAddStudentModal(true);
                }}
                role="button"
                mt={{ base: "2", md: "0" }}
              >
                <TextIcon
                  text={addStudentoClass}
                  icon={IoAddCircleSharp}
                  increaseTextSize="increaseTextSize"
                />
              </Box>
            ) : null}
          </Flex>
          <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
            <Table>
              <Thead>
                <Tr>
                  {userRole !== "teacher" ? (
                    <Th>
                      <Checkbox
                        isChecked={isAllChecked}
                        onChange={handleCheckAll}
                      />
                    </Th>
                  ) : null}

                  {tableColumns.map((columnName, index) => {
                    return <Th key={"ab" + index}>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {studentRoaster.map((row, index) => {
                  return (
                    <>
                      {userRole !== "teacher" ? (
                        <Tr key={index}>
                          <Td>
                            <Checkbox
                              isChecked={userIds.includes(row?.uuid)}
                              onChange={(e) => handleUserIds(e, row.uuid)}
                            />
                          </Td>
                          <Td
                            color="primary"
                            onClick={() => handleEditStudent(row)}
                            cursor={"pointer"}
                            role="button"
                          >
                            {`${row.last_name}, ${row.first_name}`}
                          </Td>
                          <Td>{row.student_id}</Td>
                          <Td>
                            {moment(row.date_of_birth).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )}
                          </Td>{" "}
                          <Td>{row.grade}</Td>
                          <Td>{row.gender}</Td>
                          <Td>
                            {row.login_status == "1" ? "Active" : "Inactive"}
                          </Td>
                        </Tr>
                      ) : (
                        <Tr key={index}>
                          <Td
                            color="primary"
                            onClick={() => handleEditStudent(row)}
                            cursor={"pointer"}
                            role="button"
                          >
                            {`${row.last_name} ${row.first_name} `}
                          </Td>

                          <Td>{row.student_id}</Td>
                          <Td>
                            {moment(row.date_of_birth).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )}
                          </Td>
                          <Td>{row.grade}</Td>
                          <Td>{row.gender}</Td>
                          <Td>
                            {row.login_status == "1" ? "Active" : "Inactive"}
                          </Td>
                        </Tr>
                      )}
                    </>
                  );
                })}
              </Tbody>
            </Table>

            {studentRoaster && studentRoaster?.length == 0 && (
              <NoDataFoundText>No Records Found</NoDataFoundText>
            )}
          </TableContainer>

          {addStudentModal && (
            <AddStudentModal
              addStudentModal={addStudentModal}
              setAddStudentModal={setAddStudentModal}
            />
          )}
        </>
      )}
      {totalPages > 1 ? (
     
          <PaginationComponent
            onPageChange={handlePageNumber}
            pageCount={totalPages}
            forcePage={pageNumber - 1}
            isNextButton={isNextButtonDisabled}
            isPreviousButton={isPreviousButtonDisabled}
          />
      ) : null}
    </>
  );
};

export default ClassTable;
