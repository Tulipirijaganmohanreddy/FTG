import {
  Box,
  Flex,
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
import NegativeButton from "../../../components/NegativeButton";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getListOfImportErrors,
  setTotalNoOfPages,
} from "../../../DistrictAdminApis/districtAdminSlice";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";

const ImportErrors = (props) => {
  const { setHideTable, historyData } = props;


  const dispatch = useDispatch();
  const [pageNumber, setPageNumber] = useState(1);
  const errorObj = {
    studentErrors: "Student Errors",
    teacherErrors: "Teacher Errors",
    classErrors: "Class Errors",
    schoolErrors: "School Errors",
    adminErrors:'Admin Errors'
  };

  const listOfImportErrors = useSelector(
    (state) => state?.districtAdmin?.listOfImportErrors?.errors
  );
  const csvImportErrors = useSelector(
    (state) => state?.districtAdmin?.listOfImportErrors
  );
  const token = useSelector((state) => state?.profile?.token);

  const totalPages = useSelector(
    (state) => state?.districtAdmin?.totalNoOfPages
  );

  const errorTableHeaders = useSelector(
    (state) => state?.districtAdmin?.listOfImportErrors?.headers
  );
  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;
  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
    dispatch(
      getListOfImportErrors({
        token,
        uuid: historyData.uuid,
        type: historyData.import_type ?? 1,
        skip: event.selected + 1,
      })
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setTotalNoOfPages(null));
    };
  }, []);
  return (
    <div>
      {listOfImportErrors?.length && (
        <>
          <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
            <Table>
              <Thead>
                <Tr>
                  {historyData.import_type == 3 ? (
                    <>
                      <Th>Description</Th>
                      <Th>Message</Th>
                    </>
                  ) : (
                    errorTableHeaders?.map((each, index) => (
                      <Th key={`abcd${index}`}>{each}</Th>
                    ))
                  )}
                </Tr>
              </Thead>

              <Tbody>
                {listOfImportErrors?.map((rowData, index) => (
                  <Tr key={"ab" + index}>
                    {historyData.import_type == 3 ? (
                      <>
                        <Td>Error:Invalid record</Td>
                        <Td display="flex" flexDirection="column" as="p">
                          File: enrollments.csv, Row: {rowData?.rowNo}{" "}
                          {Object.keys(rowData)
                            .filter((keyName) => keyName != "rowNo")
                            .map((key, index) => (
                              <Flex
                                direction={"row"}
                                mt="2"
                                key={"ab" + index}
                                gap="2"
                              >
                                <Heading6>{errorObj[key]}:</Heading6>
                                <Text as="p" whiteSpace={"wrap"}>
                                  {rowData[key]}
                                </Text>
                              </Flex>
                            ))}
                          <Label marginTopText={"2"}>
                            Visit
                            <Text
                              as="a"
                              href="https://myhealthyzone.fitnessgram.net/ContactUs`,"
                              target="_blank"
                              ml="1"
                              mr="1"
                            >
                              https://myhealthyzone.fitnessgram.net/ContactUs
                            </Text>
                            for FitnessGram Support.
                          </Label>
                        </Td>
                      </>
                    ) : (
                      errorTableHeaders.map((header, index) => (
                        <Td key={"ed" + index}>{rowData[header] ?? ""}</Td>
                      ))
                    )}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {totalPages > 1 && (
            <Box mt="3">
              <PaginationComponent
                onPageChange={handlePageNumber}
                pageCount={totalPages}
                forcePage={pageNumber - 1}
                isNextButton={isNextButtonDisabled}
                isPreviousButton={isPreviousButtonDisabled}
              />
            </Box>
          )}

          <Box
            w="100%"
            mt="10"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Box onClick={() => setHideTable(false)}>
              <NegativeButton text={"Go Back"} />
            </Box>
          </Box>
        </>
       )}
    </div>
  );
};

export default ImportErrors;
