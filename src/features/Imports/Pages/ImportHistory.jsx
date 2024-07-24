import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  getListOfImportErrors,
  setListOfImportErrors,
} from "../../../DistrictAdminApis/districtAdminSlice";
import TableSkeleton from "../../../components/GlobalComponents/TableSkeleton";
import TextIcon from "../../../components/TextIcon";
import {
  getExportImportHistory,
  getGetImportHistory,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import RollBackModal from "../Components/RollBackModal";
import { HistoryTableData } from "../Config";

import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";

import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getViewResource,
  setMessage,
} from "../../../store/slices/profileSlice";
import ImportErrors from "../Components/ImportErrors";
import IconText from "../../../components/FitnessComponents/FitnessTexts/IconText";
import { useNavigate } from "react-router-dom";

const History = () => {
  const { columnNames, subHead } = HistoryTableData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const mapHistory = useSelector(
    (state) => state?.schoolAdmin?.getImportHistory
  );

  const exportLoading = useSelector((state) => state?.profile?.upLoading);
  const fileLoading = useSelector((state) => state?.profile?.loading2);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const errorsTotalPages = useSelector((state) => state?.teacher?.totalPages);


  const listOfImportErrors = useSelector(
    (state) => state?.districtAdmin?.listOfImportErrors
  );



  const token = useSelector((state) => state?.profile?.token);

  const loading = useSelector((state) => state?.schoolAdmin?.loading);

  const [roleBackModal, setRoleBackModal] = useState(false);

  const [pageNumber, setPageNumber] = useState(1);

  const [hideTable, setHideTable] = useState(false);

  const [historyData, setHistoryData] = useState(null);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const MESSAGES_OBJ = {
    "ON IMPORTS QUEUE": `Your report is being generated as it is in queue.
    Please revisit later.`,
    INPROGRESS: `Your report is being generated. 
    Please revisit later.`,
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
    dispatch(getGetImportHistory({ token, skip: event.selected + 1 }));
  };

  const clickToNavigate = (importId) => {
    setHistoryData(importId);
    // setRoleBackModal(true);
  };

  const showErrors = (item) => {
    setHistoryData(item);


    dispatch(
      getListOfImportErrors({
        token,
        uuid: item.uuid,
        type: item.import_type ?? 1,
        skip: 1,
      })
    );

    setHideTable(true);
  };

  const handleExportDownload = (url) => {
    // window.open(url, "_blank");
    const filePath = encodeURIComponent(url?.split(".com/")[1]);

    dispatch(
      getViewResource({
        token,
        filePath,
        isDownload: "true",
        module: "imports",
      })
    );
  };
  const handleExportImportHistory = () => {
    dispatch(getExportImportHistory({ token }));
  };

  

  useEffect(() => {
    dispatch(getGetImportHistory({ token, skip: pageNumber }));

    dispatch(setListOfImportErrors(null));
  }, []);

  return (
    <Flex direction="column" gap="4">
      <Flex alignItems="center">
        <Heading2>{subHead}</Heading2>

        <Spacer />
        {exportLoading ? (
          <Flex gap="2">
            <IconText increaseTextSize="increaseTextSize">
              EXPORT HISTORY
            </IconText>
            <Spinner color="primary" />
          </Flex>
        ) : hideTable ? (
          <Box
            role="button"
            display={{ md: "block", lg: "block", base: "none" }}
            onClick={() => handleExportDownload(listOfImportErrors?.error_file_link)}
          >
            <TextIcon
              text={"EXPORT ERRORS"}
              icon={FaFileExport}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        ) : (
          <Box
            role="button"
            display={{ md: "block", lg: "block", base: "none" }}
            onClick={handleExportImportHistory}
          >
            <TextIcon
              text={"EXPORT HISTORY"}
              icon={FaFileExport}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        )}
      </Flex>
      {loading ? (
        <TableSkeleton />
      ) : !hideTable ? (
        <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                {columnNames?.map((columnName, index) => {
                  return (
                    <Th key={"ab" + index}>
                      <Text>{columnName}</Text>
                      {[
                        "Students",
                        "Teachers",
                        "Admins",
                        "Deactivations",
                        "Classes",
                      ].includes(columnName) ? (
                        <Text>(inserted-updated)</Text>
                      ) : null}
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {mapHistory?.length ? (
                mapHistory?.map((item, i) => {
                  return (
                    <Tr>
                      {item?.status !== "Roll Back Completed" ? (
                        <Td
                          color="primary"
                          textTransform={"capitalize"}
                          cursor="pointer"
                          onClick={() => clickToNavigate(item?.uuid)}
                          textStyle={"p"}
                          role="button"
                        >
                          {item?.file_name}
                        </Td>
                      ) : (
                        <Td textStyle={"p"}>{item?.file_name}</Td>
                      )}

                      <Td
                        textTransform={"capitalize"}
                        cursor="pointer"
                        role="button"
                        color={"primary"}
                        onClick={() => {
                          if (
                            ["ON IMPORTS QUEUE", "INPROGRESS"].includes(
                              item?.status
                            )
                          ) {
                            dispatch(setMessage(MESSAGES_OBJ[item?.status]));
                          } else {
                            handleExportDownload(item.file_download);
                          }
                        }}
                      >
                        {item.file_name}
                      </Td>
                      <Td>{item?.import_history_id}</Td>
                      <Td>
                        {item?.start_date
                          ? moment(item?.start_date).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )
                          : null}
                      </Td>
                      <Td>
                        {item?.end_date
                          ? moment(item?.end_date).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )
                          : null}
                      </Td>
                      <Td>{item?.status}</Td>
                      <Td
                        color={item?.errors > 0 && "red"}
                        cursor={item?.errors > 0 && "pointer"}
                        role="button"
                        onClick={() => showErrors(item)}
                      >
                        {item?.errors}
                      </Td>
                      <Td>{item?.students}</Td>
                      <Td>{item?.teachers}</Td>
                      <Td>{item?.admins}</Td>
                      <Td>{item?.deactivations}</Td>
                      <Td>{item?.classes}</Td>
                    </Tr>
                  );
                })
              ) : (
                <NoDataFoundText>No Records Found</NoDataFoundText>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <ImportErrors setHideTable={setHideTable} historyData={historyData} />
      )}

      {!hideTable && (
        <PaginationComponent
          onPageChange={handlePageNumber}
          pageCount={totalPages}
          forcePage={pageNumber - 1}
          isNextButton={isNextButtonDisabled}
          isPreviousButton={isPreviousButtonDisabled}
        />
      )}

      <RollBackModal
        roleBackModal={roleBackModal}
        setRoleBackModal={setRoleBackModal}
        historyData={historyData}
      />
    </Flex>
  );
};

export default History;
