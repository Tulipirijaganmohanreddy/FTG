import {
  Box,
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tooltip,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import UseResize from "../../../CustomHooks/UseResize";

const tableHeaders = [
  "S.No",
  "Class Id",
  "Class Name",
  "Start Date",
  "End Date",
  "Students",
  "Status",
];

const ListViewOfClasses = ({
  userIds,
  setUserIds,
  setIsAllChecked,
  handleRedirectOfViewClass,
  formData,
  onPageChange,
}) => {
  const location = useLocation();

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const manageClassesList = useSelector(
    (state) => state.teacher.manageClasses?.response
  );

  const isPreviousButtonDisabled = formData?.skip === 1;
  const isNextButtonDisabled = formData?.skip === totalPages;

  const handleViewClass = (item) => {
    handleRedirectOfViewClass(item, location.pathname);
  };

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setUserIds((prevState) => {
        manageClassesList.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);

        return [...prevState, userId];
      });
    } else {
      let dummyUserIds = userIds.slice();
      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);
      manageClassesList.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  const screenDimensions = UseResize();

  return (
    <TableContainer h="auto" maxH="calc(100vh - 13rem)" overflowY={"auto"}>
      <Table>
        <Thead>
          <Tr>
            {tableHeaders?.map((each, index) => (
              <Th key={`class-list-${index}`}>{each}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {manageClassesList?.map((each, index) => (
            <Tr
              key={`class-list-body-${index}`}
              // bg={each?.students === 0 ? "#d3ded6" : "red"}
              // backgroundColor={each?.students === 0 ? "#d3ded6" : "red"}

              style={{
                backgroundColor: each?.students === 0 ? "#d3ded6" : "none",
              }}
            >
              <Td>
                <Checkbox
                  colorScheme="blue"
                  mt="1"
                  left="3"
                  rounded={"lg"}
                  isChecked={userIds.includes(each?.uuid)}
                  onChange={(e) => [handleUserIds(e, each.uuid)]}
                />
              </Td>

              <Td color="#1890ff" maxWidth={"150px"} overflow="hidden">
                <Tooltip
                  hasArrow
                  label={each?.local_identifier}
                  bg="primary"
                  color="white"
                  borderRadius={"md"}
                  placement="top-start"
                >
                  <Box
                    role="button"
                    onClick={() => handleViewClass(each)}
                    size="sm"
                    cursor={"pointer"}
                    isTruncated
                  >
                    {each?.local_identifier}
                  </Box>
                </Tooltip>
              </Td>

              <Td color="#1890ff" maxWidth={"150px"} overflow="hidden">
                <Tooltip
                  hasArrow
                  label={each?.class_name}
                  bg="primary"
                  color="white"
                  borderRadius={"md"}
                  placement="top-start"
                >
                  <Box
                    role="button"
                    onClick={() => handleViewClass(each)}
                    size="sm"
                    cursor={"pointer"}
                    isTruncated
                  >
                    {each?.class_name}
                  </Box>
                </Tooltip>
              </Td>

              <Td>{each?.start_date}</Td>
              <Td>{each?.end_date}</Td>
              <Td>{each?.students}</Td>
              <Td color={!each?.school_status ? "red" : ""}>
                {!each?.school_status ? "Inactive" : each?.status}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListViewOfClasses;
