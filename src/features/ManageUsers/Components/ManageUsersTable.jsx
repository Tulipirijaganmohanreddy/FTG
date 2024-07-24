import {
  Box,
  Center,
  Checkbox,
  Flex,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import loadingImg from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { ManageUsersData } from "../Config";

const ManageUsersTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { tableHeaders, noUsers } = ManageUsersData;

  const {
    userIds,
    setUserIds,
    setIsAllChecked,
    isAllChecked,
    pageNumber,
    setFormData,
    selectedUsersInfo,
    setSelectedUsersInfo,
    userType,
    schoolUUID,
    birthDateRef,
    formData,
  } = props;

  const usersList = useSelector((state) => state.teacher.allUsers);

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const loading = useSelector((state) => state.teacher.loading);
  const loading2 = useSelector((state) => state.districtAdmin?.loading);

  const manageUser = useSelector((state) => state?.profile?.manageUser);

  const DropdownText = useSelector(
    (state) => state?.profile?.manageUser?.userType
  );

  const previousValuesOfAddUser = useSelector(
    (state) => state?.schoolAdmin?.previousValuesOfAddUser
  );

  const userRole = useSelector((state) => state?.profile?.selectedRole);

  const token = useSelector((state) => state?.profile?.token);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const tableData = {
    student: [
      // "Student Name",
      "Student ID",
      "Birth Date",
      "Grade",
      "Sex Assigned At Birth",
      "Login Status",
      "Assigned to Class",
    ],

    teacher: [
      // "Teacher Name",
      "Teacher ID",
      "Login Status",
      "Assigned to Class",
    ],

    schoolAdmin: [
      "School Administrator ID ",
      "Login Status",
      "Assigned to School",
    ],

    districtAdmin: [
      // "District Administrator Name",
      "District Administrator ID",
      "Login Status",
    ],
  };

  const USERS_OBJ = {
    student: "Student",
    teacher: "Teacher",
    parent: "Parent",
    schoolAdmin: "School Administrator",
    districtAdmin: "District Administrator",
  };

  const clickOnUser = (id) => {
    dispatch(
      setManageUser({
        formTitle: `Edit ${USERS_OBJ[manageUser?.userType]}`,
        userType: manageUser?.userType,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/${DropdownText}/${id}`);
  };

  const clickOnAssigned = (id) => {
    dispatch(
      setManageUser({
        formTitle: `Edit ${USERS_OBJ[manageUser?.userType]}`,
        userType: manageUser?.userType,
        tab: 1,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/${DropdownText}/${id}`);
  };

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setUserIds((prevState) => {
        usersList.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);
        return [...prevState, userId];
      });

      let userData = usersList.filter((userData) => userData?.uuid === userId);

      setSelectedUsersInfo((prevState) => [...prevState, ...userData]);
    } else {
      setSelectedUsersInfo((prevState) => {
        return prevState?.filter((each) => each?.uuid !== userId);
      });

      let dummyUserIds = userIds.slice();

      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);

      usersList.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  //
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = usersList.map((user) => user.uuid);
      setUserIds(arr);
      setSelectedUsersInfo(usersList);
    } else {
      setIsAllChecked(false);
      setUserIds([]);
      setSelectedUsersInfo([]);
    }
  };

  const handlePageNumber = (event) => {
    birthDateRef.current = formData.date_of_birth;

    setFormData((prevState) => ({ ...prevState, skip: event.selected + 1 }));
  };

  return (
    <>
      {loading || loading2 ? (
        <Flex direction="column" alignItems="center">
          <Image src={loadingImg} />
        </Flex>
      ) : usersList?.length ? (
        <>
          <TableContainer
            height="auto"
            maxH="calc(100vh - 12rem)"
            overflowY="auto"
          >
            <Table>
              <Thead>
                <Tr>
                  {DropdownText === "student" ? (
                    <>
                      <Th>
                        <Flex gap={5}>
                          <Checkbox
                            isChecked={isAllChecked}
                            onChange={handleCheckAll}
                          />
                          <Text>{tableHeaders[0]}</Text>
                        </Flex>
                      </Th>
                    </>
                  ) : (
                    <>
                      {DropdownText === "teacher" ? (
                        <>
                          <Th>
                            <Flex gap={5}>
                              <Checkbox
                                isChecked={isAllChecked}
                                onChange={handleCheckAll}
                              />
                              <Text>{tableHeaders[1]}</Text>
                            </Flex>
                          </Th>
                        </>
                      ) : (
                        <>
                          {DropdownText === "schoolAdmin" ? (
                            <>
                              <Th>
                                <Flex gap={5}>
                                  <Checkbox
                                    isChecked={isAllChecked}
                                    onChange={handleCheckAll}
                                  />
                                  <Text>{tableHeaders[2]}</Text>
                                </Flex>
                              </Th>
                            </>
                          ) : (
                            <>
                              {DropdownText === "districtAdmin" ? (
                                <>
                                  <Th>
                                    <Flex gap={5}>
                                      <Checkbox
                                        isChecked={isAllChecked}
                                        onChange={handleCheckAll}
                                      />
                                      <Text>{tableHeaders[3]}</Text>
                                    </Flex>
                                  </Th>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}

                  {tableData[DropdownText]?.map((columnName, index) => {
                    return <Th key={"a" + index}>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>

              <Tbody>
                {usersList?.length
                  ? usersList.map((item, index) => {
                      return (
                        <Tr key={index}>
                          {DropdownText === "student" ? (
                            <>
                              <Td>
                                <Flex gap={5}>
                                  <Checkbox
                                    name="studentId"
                                    isChecked={userIds.includes(item?.uuid)}
                                    onChange={(e) => [
                                      handleUserIds(e, item.uuid),
                                    ]}
                                  />
                                  {rolesAndPrevilegesObject?.["Manage Users"]
                                    ?.edit ?? true ? (
                                    <Box
                                      role="button"
                                      onClick={() => {
                                        clickOnUser(item.uuid);
                                      }}
                                      cursor="pointer"
                                    >
                                      <Paragraph2
                                        textColor={"primary"}
                                        increaseText="paragraph2IncreaseText"
                                      >
                                        {`${item.last_name}, ${item.first_name}`}
                                      </Paragraph2>
                                    </Box>
                                  ) : (
                                    <Box cursor="not-allowed">
                                      <Paragraph2
                                        textColor={"primary"}
                                        increaseText="paragraph2IncreaseText"
                                        filter="grayscale(50%)"
                                      >
                                        {`${item.last_name}, ${item.first_name}`}
                                      </Paragraph2>
                                    </Box>
                                  )}
                                </Flex>
                              </Td>
                              <Td>{item.student_id}</Td>
                              <Td>
                                {moment(item?.date_of_birth).format(
                                  navigator.language === "en-GB"
                                    ? "MM-DD-YYYY"
                                    : "MM-DD-YYYY"
                                )}
                              </Td>
                              <Td>{item?.grade || "NA"}</Td>
                              <Td>{item.gender}</Td>
                              <Td>
                                {item.login_status == "1"
                                  ? "Active"
                                  : "Inactive"}
                              </Td>
                              <Td cursor="pointer">
                                <Box
                                  role="button"
                                  onClick={() => {
                                    clickOnAssigned(item.uuid);
                                  }}
                                >
                                  <Paragraph2
                                    textColor={"primary"}
                                    increaseText="paragraph2IncreaseText"
                                  >
                                    {item?.assignedToClass === true
                                      ? "Assigned"
                                      : "Unassigned"}
                                  </Paragraph2>
                                </Box>
                              </Td>
                            </>
                          ) : (
                            <>
                              {DropdownText === "teacher" ? (
                                <>
                                  <Td>
                                    <Flex gap={5}>
                                      <Checkbox
                                        name="teacherId"
                                        isChecked={userIds.includes(item?.uuid)}
                                        onChange={(e) => [
                                          handleUserIds(e, item.uuid),
                                        ]}
                                      />

                                      {userRole !== "teacher" &&
                                      (rolesAndPrevilegesObject?.[
                                        "Manage Users"
                                      ]?.edit ??
                                        true) ? (
                                        <Box
                                          role="button"
                                          onClick={() => {
                                            clickOnUser(item.uuid);
                                          }}
                                          cursor="pointer"
                                        >
                                          <Paragraph2
                                            textColor={"primary"}
                                            increaseText="paragraph2IncreaseText"
                                          >
                                            {`${item.last_name}, ${item.first_name}`}
                                          </Paragraph2>
                                        </Box>
                                      ) : (
                                        <Box cursor="not-allowed">
                                          <Paragraph2
                                            textColor={"primary"}
                                            increaseText="paragraph2IncreaseText"
                                            filter="grayscale(50%)"
                                          >
                                            {`${item.last_name}, ${item.first_name}`}
                                          </Paragraph2>
                                        </Box>
                                      )}
                                    </Flex>
                                  </Td>
                                  <Td>{item.user_id}</Td>
                                  <Td>
                                    {item.login_status == "1"
                                      ? "Active"
                                      : "Inactive"}
                                  </Td>
                                  {userRole === "teacher" ? (
                                    <Td cursor="not-allowed">
                                      <Box>
                                        <Paragraph2
                                          textColor={"primary"}
                                          increaseText="paragraph2IncreaseText"
                                          filter="grayscale(50%)"
                                        >
                                          {item?.assignedToClass === true
                                            ? "Assigned"
                                            : "Unassigned"}{" "}
                                        </Paragraph2>
                                      </Box>
                                    </Td>
                                  ) : (
                                    <Td cursor="pointer">
                                      <Box
                                        role="button"
                                        onClick={() => {
                                          clickOnAssigned(item.uuid);
                                        }}
                                      >
                                        <Paragraph2
                                          textColor={"primary"}
                                          increaseText="paragraph2IncreaseText"
                                        >
                                          {item?.assignedToClass === true
                                            ? "Assigned"
                                            : "Unassigned"}{" "}
                                        </Paragraph2>
                                      </Box>
                                    </Td>
                                  )}
                                </>
                              ) : (
                                <>
                                  {DropdownText === "schoolAdmin" ? (
                                    <>
                                      <Td>
                                        <Flex gap={5}>
                                          <Checkbox
                                            name="schoolAdminId"
                                            isChecked={userIds.includes(
                                              item?.uuid
                                            )}
                                            onChange={(e) => [
                                              handleUserIds(e, item.uuid),
                                            ]}
                                          />

                                          {rolesAndPrevilegesObject?.[
                                            "Manage Users"
                                          ]?.edit ?? true ? (
                                            <Box
                                              role="button"
                                              onClick={() => {
                                                clickOnUser(item.uuid);
                                              }}
                                              cursor="pointer"
                                            >
                                              <Paragraph2
                                                textColor={"primary"}
                                                increaseText="paragraph2IncreaseText"
                                              >
                                                {`${item.last_name}, ${item.first_name}`}
                                              </Paragraph2>
                                            </Box>
                                          ) : (
                                            <Box cursor="not-allowed">
                                              <Paragraph2
                                                textColor={"primary"}
                                                increaseText="paragraph2IncreaseText"
                                                filter="grayscale(50%)"
                                              >
                                                {`${item.last_name}, ${item.first_name}`}
                                              </Paragraph2>
                                            </Box>
                                          )}
                                        </Flex>
                                      </Td>
                                      <Td>
                                        {item?.user_id?.length
                                          ? item.user_id
                                          : "NA"}
                                      </Td>
                                      <Td>
                                        {item.login_status == "1"
                                          ? "Active"
                                          : "Inactive"}
                                      </Td>

                                      <Td cursor="pointer">
                                        <Box
                                          role="button"
                                          onClick={() => {
                                            clickOnAssigned(item.uuid);
                                          }}
                                        >
                                          <Paragraph2
                                            textColor={"primary"}
                                            increaseText="paragraph2IncreaseText"
                                          >
                                            {item?.admin_assigned_to_school ===
                                            true
                                              ? "Assigned"
                                              : "Unassigned"}{" "}
                                          </Paragraph2>
                                        </Box>
                                      </Td>
                                    </>
                                  ) : (
                                    <>
                                      {DropdownText === "districtAdmin" ? (
                                        <>
                                          <Td>
                                            <Flex gap={5}>
                                              <Checkbox
                                                name="districtAdminId"
                                                isChecked={userIds.includes(
                                                  item?.uuid
                                                )}
                                                onChange={(e) => [
                                                  handleUserIds(e, item.uuid),
                                                ]}
                                              />

                                              {rolesAndPrevilegesObject?.[
                                                "Manage Users"
                                              ]?.edit ?? true ? (
                                                <Box
                                                  role="button"
                                                  onClick={() => {
                                                    clickOnUser(item.uuid);
                                                  }}
                                                  cursor="pointer"
                                                >
                                                  <Paragraph2
                                                    textColor={"primary"}
                                                    increaseText="paragraph2IncreaseText"
                                                  >
                                                    {`${item.last_name}, ${item.first_name}`}
                                                  </Paragraph2>
                                                </Box>
                                              ) : (
                                                <Box cursor="not-allowed">
                                                  <Paragraph2
                                                    textColor={"primary"}
                                                    increaseText="paragraph2IncreaseText"
                                                    filter="grayscale(50%)"
                                                  >
                                                    {`${item.last_name}, ${item.first_name}`}
                                                  </Paragraph2>
                                                </Box>
                                              )}
                                            </Flex>
                                          </Td>
                                          <Td>
                                            {item?.user_id?.length
                                              ? item.user_id
                                              : "NA"}
                                          </Td>
                                          <Td>
                                            {item.login_status == "1"
                                              ? "Active"
                                              : "Inactive"}
                                          </Td>
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          )}
                        </Tr>
                      );
                    })
                  : null}
              </Tbody>
            </Table>
          </TableContainer>

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
      ) : (
        <NoDataFoundText>{noUsers}</NoDataFoundText>
      )}
    </>
  );
}

export default ManageUsersTable;
