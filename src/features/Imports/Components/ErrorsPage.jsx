import {
  Box,
  Flex,
  Image,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import Papa from "papaparse";

import React, { useEffect, useRef, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { exportData } from "../../../Utilities/utils";
import successTick from "../../../assets/Images/Success_ErrorImages/success-tick.svg";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import ParagraphWithColorBlack from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorBlack";
import TextIcon from "../../../components/TextIcon";
import {
  getExportErrors,
  setPreviewCsv,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import IconText from "../../../components/FitnessComponents/FitnessTexts/IconText";

const ErrorsPage = (props) => {
  const { setCheckErrorPage, setDisable } = props;
  const dispatch = useDispatch();
  const tableRef = useRef(null);
  const errorElements = useRef([]);
  const [currentRedCellIndex, setCurrentRedCellIndex] = useState(null);

  const token = useSelector((state) => state.profile.token);
  const exportLoading = useSelector((state) => state.schoolAdmin.loading);
  const previewData = useSelector((state) => state?.schoolAdmin?.previewCsv);

  const previewHeadersList = previewData?.exportData?.exportHeaders;

  const previewDataContent = previewData?.previewData;

  const exportUserData = previewData?.exportData;

  const clickToReUpload = () => {
    dispatch(setPreviewCsv(null));
    setDisable(false);
    setCheckErrorPage(false);
  };

  const handleNextError = () => {
    if (errorElements.current.length === 0) return;

    const nextIndex = getNextIndex();
    if (currentRedCellIndex !== null) {
      const previousRedCell = errorElements.current[currentRedCellIndex];
      previousRedCell.style.border = "none";
    }
    setCurrentRedCellIndex(nextIndex);
    scrollToRedCell(nextIndex);
  };

  const getNextIndex = () => {
    if (currentRedCellIndex === null) {
      return 0;
    } else {
      return (currentRedCellIndex + 1) % errorElements.current.length;
    }
  };

  const scrollToRedCell = (index) => {
    if (tableRef.current && errorElements.current.length > 0) {
      const redCell = errorElements.current[index];
      if (redCell) {
        redCell.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "center",
        });
        redCell.style.border = "1px solid #ff4040";
      }
    }
  };
  const handleExportErrors = () => {
    // Convert data to CSV format
    // const csvData = Papa.unparse(exportUserData?.exportContent);
    // exportData(csvData, "errors.csv", "text/csv;charset=utf-8;");
    dispatch(getExportErrors({ token }));
  };

  useEffect(() => {
    errorElements.current = Array.from(
      tableRef.current.querySelectorAll(".red-cell")
    );
  }, []);

  return (
    <>
      <Box>
        <Flex
          direction="column"
          // color="black-2"
          gap="2"
          mt="4"
          pl="2"
          mb="4"
        >
          <Label marginTopText={"0"}>
            The Grid Below shows a preview of data in this CSV file. If no
            errors found ,click the Import Button to begin the import process.
          </Label>

          <Label marginTopText={"0"}>
            If there are any validation errors, please correct and re-upload
            your import file.
          </Label>

          <Box mt="5">
            <Heading2 changeTextColor="#0081c8">VALIDATION</Heading2>
          </Box>

          <Box>
            <Box display="flex">
              <Image src={successTick} w={4} />

              <Box display="flex" pl="2">
                <Box>
                  <Label marginTopText={"0"} changeTextColor="red">
                    {`${previewData?.errorCount} Errors Found in your file. please correct these items and
										re-upload your file . Visit`}
                  </Label>
                </Box>
                <Box pl="2">
                  <Label marginTopText={"0"} changeTextColor="#0081c8">
                    https://help.fitnessgram.net/
                  </Label>
                </Box>
              </Box>
            </Box>

            <Box pl="1.5rem">
              <Label marginTopText={"0"} changeTextColor="red">
                {` for more information on importing.${previewData.errormessage}.`}
              </Label>
            </Box>

            <Box pl="2" mt="3">
              <Box
                py="2.5"
                bg="primary"
                w="10rem"
                color="white"
                textAlign="center"
                borderLeftRadius="2xl"
                borderRightRadius="2xl"
                cursor="pointer"
                onClick={() => handleNextError()}
              >
                <Heading4new>View Next Error</Heading4new>
              </Box>
            </Box>

            <Box mt="3">
              <Label marginTopText={"0"} changeTextColor="red">
                {errorElements?.current?.[currentRedCellIndex]?.getAttribute(
                  "name"
                )
                  ? `Error : ${errorElements?.current?.[
                      currentRedCellIndex
                    ]?.getAttribute("name")}`
                  : null}
              </Label>
            </Box>

            <Flex mt="6" gap="3" alignItems="center">
              <Box>
                <ParagraphWithColorBlack
                  increaseTextSize="paragraph2ColorBlackIncreaseText"
                  changeTextColor="black"
                >
                  click here to
                </ParagraphWithColorBlack>
              </Box>
              <Box onClick={() => clickToReUpload()} cursor="pointer">
                <Label
                  marginTopText={"0"}
                  changeTextColor="#0081c8"
                  textDecorationStyle="underline"
                >
                  re-upload
                </Label>
              </Box>

              <Spacer />

              {exportLoading ? (
                <Flex gap="2">
                  <IconText increaseTextSize="increaseTextSize">
                    Export Errors
                  </IconText>
                  <Spinner color="primary" />
                </Flex>
              ) : (
                <Box onClick={handleExportErrors}>
                  <TextIcon
                    text={"Export Errors"}
                    icon={FaFileExport}
                    increaseTextSize="increaseTextSize"
                  />
                </Box>
              )}
            </Flex>
          </Box>

          {/* overflow="auto" */}
          {/* <Box height="auto" maxH="25rem" pb="10" overflow="scroll"> */}
          <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
            <Table ref={tableRef}>
              <Thead
              // display="table"
              // width="100%"
              // table-layout="fixed"
              //  position="sticky" top="0" zIndex="docked"

              // bg="white"
              >
                <Tr>
                  {previewHeadersList?.map((columnName, index) => {
                    return <Th>{columnName.actualFieldName}</Th>;
                  })}
                </Tr>
              </Thead>

              <Tbody>
                {previewDataContent?.map((item, i) => (
                  <Tr>
                    {previewHeadersList?.map((header, id) => {
                      return (
                        <Td
                          textAlign="center"
                          key={id}
                          name={
                            item[`${header.key}ErrorMessage`]
                              ? item[`${header.key}ErrorMessage`]
                              : ""
                          }
                          color={item[`${header.key}Error`] == 1 ? "red" : ""}
                          className={
                            item[`${header.key}Error`] == 1 ? "red-cell" : ""
                          }
                        >
                          {item[`${header.key}Error`]
                            ? item[header.key]
                            : !item[header.key] &&
                              item[`${header.key}ErrorMessage`]
                            ? "Required"
                            : item[header.key]}
                        </Td>
                      );
                    })}
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          {/* </Box> */}
        </Flex>
      </Box>
    </>
  );
};

export default ErrorsPage;
