import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteMandate,
  getMandateData,
  setMandateData,
} from "../../../DistrictAdminApis/districtAdminSlice";
import loadingimg from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import SingleSelect from "../../../components/FitnessComponents/FitnessSelect/SingleSelect";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import PaginationComponent from "../../../components/PaginationComponent";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { ManageMandatesData } from "../Config";

const MandatesList = () => {
  const {
    title,
    text,
    selectLable,
    selectOptions,
    addMandate,
    tableColumns,
    noMandatesText,
  } = ManageMandatesData;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const mandateData = useSelector((state) => state?.districtAdmin?.mandateData);
  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const token = useSelector((state) => state.profile.token);
  const code = useSelector((state) => state.profile.code);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const loading = useSelector((state) => state?.districtAdmin?.loading);

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedMandate, setSelectedMandate] = useState("");

  const [status, setStatus] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };
  const handleDelete = () => {
    dispatch(deleteMandate({ token, mandateId: selectedMandate?.uuid }));
  };
  useEffect(() => {
    let body = {
      skip: pageNumber,
      status: status,
      size: 20,
    };
    dispatch(getMandateData({ token, body }));
  }, [pageNumber, status]);

  useEffect(() => {
    if (code === 200) {
      let body = {
        skip: pageNumber,
        status: status,
        size: 20,
      };
      dispatch(getMandateData({ token, body }));
    }
  }, [code]);
  useEffect(() => {
    return () => {
      dispatch(setMandateData(null));
    };
  }, []);

  return (
    <Flex direction="column" gap="4" m={{ base: "0", md: "4" }}>
      <Heading1>{title}</Heading1>
      <Box color="gray-2">
        <Label marginTopText={"0"}>{text}</Label>
      </Box>
      <HStack justifyContent="space-between" alignItems="center">
        <Box w={{ base: "55%", lg: "45%" }}>
          <SingleSelect
            id={"mandateStatus"}
            label={selectLable}
            onChange={(e) => {
              setStatus(e.target.value);
            }}
            value={status === "All" ? "" : status}
            optionprops={selectOptions}
          />
        </Box>
        {rolesAndPrevilegesObject?.["Manage Mandates"]?.is_add ?? true ? (
          <HStack
            cursor="pointer"
            onClick={() => {
              dispatch(setPreviousPath(location.pathname));
              navigate(`/role/${selectedRole}/add-mandates`);
            }}
          >
            <Box
              color="black"
              mt={{ base: "0.8rem", md: "1rem" }}
              role="button"
            >
              <TextIcon
                text={addMandate}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </HStack>
        ) : (
          <HStack cursor="not-allowed">
            <Box color="black" mt={{ base: "0.8rem", md: "1rem" }}>
              <TextIcon
                text={addMandate}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
                changeCursorPointer="not-allowed"
              />
            </Box>
          </HStack>
        )}
      </HStack>
      {loading ? (
        <Flex justify="center">
          <Image src={loadingimg} />
        </Flex>
      ) : mandateData?.length ? (
        <>
          <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
            <Table>
              <Thead>
                <Tr>
                  {tableColumns.map((columnName, index) => {
                    return <Th key={"ab" + index}>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {mandateData &&
                  mandateData?.length > 0 &&
                  mandateData.map((item, index) => {
                    return (
                      <>
                        <Tr key={"a" + index}>
                          <Td>{item.title}</Td>
                          <Td>
                            {moment(item?.start_date).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )}
                          </Td>
                          <Td>
                            {moment(item?.end_date).format(
                              navigator.language === "en-GB"
                                ? "DD-MM-YYYY"
                                : "MM-DD-YYYY"
                            )}
                          </Td>

                          <Td>District</Td>
                          <Td>{item.status}</Td>

                          <Td>
                            {rolesAndPrevilegesObject?.["Manage Mandates"]
                              ?.edit ?? true ? (
                              <Button
                                size="xs"
                                cursor="pointer"
                                onClick={() => {
                                  dispatch(setPreviousPath(location.pathname));
                                  navigate(
                                    `/role/${selectedRole}/edit-mandates`,
                                    {
                                      state: { mandate: item },
                                    }
                                  );
                                }}
                              >
                                {" "}
                                <FiEdit color="#0081C8" />
                              </Button>
                            ) : (
                              <Button size="xs" cursor="not-allowed">
                                {" "}
                                <FiEdit color="#0081C8" />
                              </Button>
                            )}
                          </Td>

                          <Td alignContent="center">
                            {" "}
                            {rolesAndPrevilegesObject?.["Manage Mandates"]
                              ?.delete ?? true ? (
                              <Button
                                size="xs"
                                cursor="pointer"
                                onClick={() => {
                                  setSelectedMandate(item);
                                  setDeletePopUp(true);
                                }}
                              >
                                <RiDeleteBin6Line color="red" />
                              </Button>
                            ) : (
                              <Button size="xs" cursor="not-allowed">
                                {" "}
                                <RiDeleteBin6Line color="red" />
                              </Button>
                            )}
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
              </Tbody>
            </Table>
          </TableContainer>{" "}
        </>
      ) : (
        <></>
      )}
      {mandateData && mandateData?.length == 0 && (
        <NoDataFoundText>{noMandatesText}</NoDataFoundText>
      )}
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the mandate?"}
          onClick={handleDelete}
        />
      )}{" "}
      {mandateData?.length > 0 && totalPages > 1 ? (
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

export default MandatesList;
