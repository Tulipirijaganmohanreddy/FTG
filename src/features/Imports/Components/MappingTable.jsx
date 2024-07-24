import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
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

import loadingImg from "../../../assets/Images/FitnessGramEventImages/loading.gif";

import moment from "moment";
import { FaDownload } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import TableHeading from "../../../components/FitnessComponents/FitnessTexts/TableHeading";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import {
  getViewResource,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getGetMappingObjectList,
  getRemoveMappingObjects,
  setGetMappingObj,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { mappingData } from "../Config";
import ImportRollBackModal from "./ImportRollBackModal";
import PaginationComponent from "../../../components/PaginationComponent";
import EditMapping from "./EditMapping";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const MappingTable = (props) => {
  const {
    setActiveTab,
    setSelectedMappingId,
    selectedMappingId,
    setEditMapping,
    editMapping,
  } = props;

  const { columnNames } = mappingData;
  const [importRollBackModal, setImportRollBackModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const token = useSelector((state) => state?.profile?.token);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const mappingTableData = useSelector(
    (state) => state?.schoolAdmin?.getMappingObjectList
  );
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const loading = useSelector((state) => state?.schoolAdmin?.loading);
  const code = useSelector((state) => state?.profile?.code);

  const [pageNumber, setPageNumber] = useState(1);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedMapping, setSelectedMapping] = useState("");

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const dataSetObj = {
    1: "School, Teacher, Class, Student",
    2: "School, Teacher, Class",
    3: "School, Student",
    4: "School, Administrator",
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  const clickToDelete = (uuid) => {
    dispatch(getRemoveMappingObjects({ uuid: selectedMapping, token }));
  };

  const handleMappingDownload = (url) => {
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

  const clickToEdit = (id) => {
    setSelectedMappingId(id);
    setEditMapping(true);

    // dispatch(setPreviousPath(location.pathname));

    // navigate(`/role/${selectedRole}/edit/mapping/${id}`);
  };

  const getMappingId = (item) => {
    dispatch(
      setGetMappingObj({
        mappingId: item.uuid,
        dataSet: item.data_set,
      })
    );
  };

  useEffect(() => {
    dispatch(getGetMappingObjectList({ token, skip: pageNumber }));
  }, [pageNumber]);

  useEffect(() => {
    if (code === 200) {
      dispatch(getGetMappingObjectList({ token, skip: pageNumber }));
    }
  }, [code]);

  useEffect(() => {
    dispatch(setTotalPages(""));
  }, []);

  return (
    <Flex direction="column" gap="4" ml={{ base: "0", lg: "3" }}>
      {loading ? (
        <Center justify="center">
          <Image src={loadingImg} />
        </Center>
      ) : (
        <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                {columnNames.map((columnName, index) => {
                  return (
                    <Th key={"ab" + index}>
                      <TableHeading>{columnName}</TableHeading>
                    </Th>
                  );
                })}
              </Tr>
            </Thead>
            <Tbody>
              {mappingTableData?.mappingsList?.length ? (
                mappingTableData?.mappingsList?.map((item, i) => {
                  return (
                    <Tr>
                      {rolesAndPrevilegesObject["Import"]?.edit ? (
                        <>
                          <Td
                            cursor="pointer"
                            color="primary"
                            role="button"
                            key={"a" + i}
                          >
                            <Text onClick={() => clickToEdit(item?.uuid)}>
                              {" "}
                              {item?.name}
                            </Text>
                          </Td>
                        </>
                      ) : (
                        <>
                          <Td cursor="not-allowed">{item?.name}</Td>
                        </>
                      )}

                      <Td>{dataSetObj[item?.data_set]}</Td>
                      <Td>
                        {moment(item?.updatedAt).format(
                          navigator.language === "en-GB"
                            ? "DD-MM-YYYY"
                            : "MM-DD-YYYY"
                        )}

                        {moment(item?.updatedAt).format("LTS")}
                      </Td>
                      <Td>
                        <Stack>
                          <Center
                            role="button"
                            onClick={() =>
                              handleMappingDownload(item?.csv_path)
                            }
                          >
                            <FaDownload
                              size={12}
                              fill="#0081c8"
                              cursor="pointer"
                              onClick={() => getMappingId(item)}
                            />
                          </Center>
                        </Stack>
                      </Td>

                      {!rolesAndPrevilegesObject["Import"]?.is_delete ? (
                        <Td textStyle={"p"}>
                          <Center>
                            {mappingTableData?.createMapping ?? true ? (
                              <Box
                                role="button"
                                onClick={() => {
                                  {
                                    setSelectedMapping(item?.uuid);
                                    setDeletePopUp(true);
                                  }
                                }}
                              >
                                <RiDeleteBin6Line
                                  size={16}
                                  fill="red"
                                  cursor="pointer"
                                />
                              </Box>
                            ) : (
                              <Box>
                                <RiDeleteBin6Line
                                  size={16}
                                  fill="grey"
                                  cursor="not-allowed"
                                  filter={"grayscale(50%)"}
                                />
                              </Box>
                            )}
                          </Center>
                        </Td>
                      ) : (
                        <Td textStyle={"p"}>
                          <Center>
                            <Button isDisabled={true}>
                              <RiDeleteBin6Line
                                size={16}
                                fill="red"
                                cursor="not-allowed"
                              />
                            </Button>
                          </Center>
                        </Td>
                      )}
                    </Tr>
                  );
                })
              ) : (
                <NoDataFoundText>No Records Found</NoDataFoundText>
              )}
            </Tbody>
          </Table>
        </TableContainer>
      )}
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the mapping object?"}
          onClick={clickToDelete}
        />
      )}{" "}
      <ImportRollBackModal
        importRollBackModal={importRollBackModal}
        setImportRollBackModal={setImportRollBackModal}
      />
      {totalPages > 1 ? (
        <PaginationComponent
          onPageChange={handlePageNumber}
          pageCount={totalPages}
          forcePage={pageNumber - 1}
          isNextButton={isNextButtonDisabled}
          isPreviousButton={isPreviousButtonDisabled}
        />
      ) : null}
    </Flex>
  );
};

export default MappingTable;
