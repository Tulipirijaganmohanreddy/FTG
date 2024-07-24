import { DeleteIcon } from "@chakra-ui/icons";
import React from "react";

import {
  Box,
  Checkbox,
  Flex,
  HStack,
  IconButton,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
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
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getRemovedSchool,
  getSchoolsToAddLicense,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import collapasableIcon from "../../../assets/Images/SuperAdminContentImages/Polygon3.svg";
import collapasableIcon1 from "../../../assets/Images/SuperAdminContentImages/Polygon7.svg";

import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import AddSchool from "../../District&Schools/Components/AddSchool";

import {
  calculatePaginationLength,
  debounce,
  handleCheckAllIds,
  handleSelectedIds,
} from "../../../Utilities/utils";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";
import { setTotalPages2 } from "../../teacher/teacherSlice";
import SchoolDatesPopup from "./SchoolDatesPopup";
import { licenseSchoolData } from "../Config";

const AddLicenseToSchool = () => {
  const { schoolTableHeaders } = licenseSchoolData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const bg = useToken("colors", "white.500");

  const funderId = useSelector((state) => state?.superAdmin?.funderId);
  const token = useSelector((state) => state?.profile?.token);
  const code2 = useSelector((state) => state?.profile?.code2);
  const code = useSelector((state) => state?.profile?.code);
  const updated_by = useSelector((state) => state?.profile?.userId);

  const loading = useSelector((state) => state?.profile?.loading2);

  const totalPages2 = useSelector((state) => state.teacher.totalPages2);

  const licensedSchoolData = useSelector(
    (state) => state?.superAdmin?.licensedSchools
  );

  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const schoolsList = useSelector(
    (state) => state?.superAdmin?.schoolsToAddLicense
  );

  const updater_role = useSelector((state) => state?.profile?.selectedRole);
  const districtId = useSelector(
    (state) => state?.superAdmin?.distrcitIDForDistrict
  );

  const licenseId = useSelector((state) => state?.superAdmin?.storeLicenseId);

  const districtState = useSelector(
    (state) => state?.superAdmin?.districtState
  );
  // const
  const [data, setData] = useState([]);
  const [isCollapseOpen, setIsCollapseOpen] = useState([]);

  const [parentCheckBoxList, setParentCheckBoxList] = useState([]);

  const [childCheckBoxList, setChildCheckBoxList] = useState({});

  const [selectedUUIDsList, setSelectedUUIDsList] = useState([]);

  const [pageNumber, setPageNumber] = useState(1);

  const [deletePopUp, setDeletePopUp] = useState(false);

  const [selectedSchool, setSelectedSchool] = useState("");

  const checkbox = useRef();

  const searchInput = useRef(null);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages2;

  const toggleBodyVisibility = (index) => {
    setIsCollapseOpen((prevState) => {
      const newArr = [...prevState];

      newArr[index] = !prevState[index];

      return newArr;
    });
  };

  const handleUserIds = (e, userId, index) => {
    handleSelectedIds(
      e,
      userId,
      index,
      selectedUUIDsList,
      setSelectedUUIDsList,
      childCheckBoxList,
      setChildCheckBoxList,
      parentCheckBoxList,
      setParentCheckBoxList,
      data,

      "schools"
    );
  };

  const handleCheckAll = (e, index) => {
    handleCheckAllIds(
      e,
      index,
      selectedUUIDsList,
      setSelectedUUIDsList,
      childCheckBoxList,
      setChildCheckBoxList,
      parentCheckBoxList,
      setParentCheckBoxList,
      data,

      "schools"
    );
  };

  const handleDeleteSchool = (uuid) => {
    dispatch(
      getRemovedSchool({
        uuid: selectedSchool,
        token: token,
        body: { updated_by, updater_role },
      })
    );
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  useEffect(() => {
    // dispatch(setTotalPages2(""));

    return () => {
      setChildCheckBoxList({});
      setParentCheckBoxList([]);
      dispatch(setTotalPages2(""));

      setSelectedUUIDsList([]);
    };
  }, []);

  useEffect(() => {
    if (isOpen) {
      setData([]);

      let finalPayload = {
        funder_uuid: params?.funderId,
        funder_type: licenseByIdData?.funder_type,
        search: "",
        size: 50,
        skip: pageNumber,

        // school_name: schoolName?.school_name ? schoolName?.school_name : "",
      };

      dispatch(
        getSchoolsToAddLicense({
          body: finalPayload,
          token: token,
        })
      );
      dispatch(setPreviousPath(location.pathname));
    } else {
      // dispatch(setTotalPages(""));
    }
  }, [isOpen, pageNumber]);

  const handleSearchChange = debounce((searchText) => {
    let finalPayload = {
      funder_uuid: params?.funderId,
      funder_type: licenseByIdData?.funder_type,
      search: searchText,
      size: 50,
      skip: 1,
    };

    searchText?.length != 1 &&
      dispatch(
        getSchoolsToAddLicense({
          body: finalPayload,
          token: token,
        })
      );
  }, 500);

  useEffect(() => {
    setData(schoolsList);

    const checkedList =
      schoolsList?.length > 0 &&
      schoolsList?.map((each, index) => {
        setChildCheckBoxList((prevState) => ({
          ...prevState,
          [index]: [],
        }));

        return false;
      });

    setParentCheckBoxList(checkedList);

    setIsCollapseOpen(checkedList);
  }, [schoolsList]);

  useEffect(() => {
    if (isOpen && (code === 200 || code2 === 200)) {
      // let finalPayload = {
      //   uuid: params?.funderId,
      //   search: search ? search : "",
      // };

      searchInput.current.value = "";

      const remainingLengthForPagination = calculatePaginationLength(
        data,
        selectedUUIDsList
      );

      let newPageNum = pageNumber;

      if (pageNumber < totalPages2 || remainingLengthForPagination?.length) {
        newPageNum = pageNumber;
      } else {
        newPageNum = 1;
      }

      let finalPayload = {
        funder_uuid: params?.funderId,
        funder_type: licenseByIdData?.funder_type,
        search: "",
        size: 50,
        skip: newPageNum,
      };

      dispatch(
        getSchoolsToAddLicense({
          body: finalPayload,
          token: token,
        })
      );
    }
    setSelectedUUIDsList([]);
  }, [code, code2]);

  return (
    <>
      <Box
        onClick={() => {
          setChildCheckBoxList({});
          setParentCheckBoxList([]);

          setSelectedUUIDsList([]);
          onOpen();
        }}
        role="button"
      >
        <TextIcon text="Add Schools to License" icon={MdAddCircle} />
      </Box>

      <Box>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setPageNumber(1);
            onClose();
          }}
          size="5xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalCloseButton />
            <ModalBody p="5">
              <Heading1>Add School To District Name </Heading1>
              <Flex marginTop="12">
                <Flex direction="column">
                  <Box color="white" borderRadius="3xl" background="#65a30d">
                    {
                      <SchoolDatesPopup
                        schoolsList={selectedUUIDsList}
                        setSelectedSchools={setSelectedUUIDsList}
                        totalSchoolsList={data}
                      />
                    }
                  </Box>
                  {!selectedUUIDsList?.length ? (
                    <ErrorText textStyle="p" mx="2" text>
                      Please select schools
                    </ErrorText>
                  ) : null}
                </Flex>

                <Box ml="4" mt="1">
                  <SearchComponent
                    id="searchSchool"
                    name="searchText"
                    display={{ base: "flex", lg: "flex", md: "flex" }}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    ref={searchInput}
                  />
                </Box>

                <Spacer />
                <Box>
                  <AddSchool pageNumber={pageNumber} />
                </Box>
              </Flex>

              <Box marginTop="4">
                {loading ? (
                  <Box textAlign={"center"} mt="5">
                    <Spinner color="primary" />
                  </Box>
                ) : (
                  <TableContainer height="auto" maxH="300px" overflowY="auto">
                    <Table>
                      <Thead>
                        <Tr>
                          {schoolTableHeaders.map((item, key) => (
                            <Th>
                              <Text
                                textStyle={"theading"}
                                borderBottomColor={"#00000029"}
                                color=""
                                textTransform={"capitalize"}
                                letterSpacing={"tight"}
                              >
                                {item}
                              </Text>
                            </Th>
                          ))}
                        </Tr>
                      </Thead>

                      <Tbody>
                        {data?.length > 0 ? (
                          data?.map((item, indexVal) => (
                            <React.Fragment key={indexVal}>
                              <Tr>
                                <Td colSpan={schoolTableHeaders.length}>
                                  <div style={{ width: "100%" }}>
                                    <Flex marginTop="3" alignItems="center">
                                      <Box>
                                        <IconButton
                                          icon={
                                            isCollapseOpen?.[indexVal] ? (
                                              <Image src={collapasableIcon1} />
                                            ) : (
                                              <Image src={collapasableIcon} />
                                            )
                                          }
                                          variant="ghost"
                                          onClick={() =>
                                            toggleBodyVisibility(indexVal)
                                          }
                                          aria-label={
                                            isCollapseOpen?.[indexVal]
                                              ? "Hide data"
                                              : "Show data"
                                          }
                                        />
                                      </Box>
                                      <Box marginLeft="-2">
                                        <Text textStyle="h4">
                                          <Checkbox
                                            mt="0.5"
                                            mr="1"
                                            isChecked={
                                              parentCheckBoxList?.[indexVal]
                                            }
                                            onChange={(event) =>
                                              handleCheckAll(event, indexVal)
                                            }
                                          />
                                          District :{" "}
                                          {item?.district_name
                                            ? item?.district_name
                                            : null}
                                        </Text>
                                      </Box>
                                    </Flex>
                                  </div>
                                </Td>
                              </Tr>

                              {!isCollapseOpen?.[indexVal]
                                ? item?.schools?.map((school, index) => (
                                    <Tr key={index}>
                                      <Td style={{ width: "25%" }}>
                                        <HStack>
                                          <Checkbox
                                            marginRight="2"
                                            isChecked={selectedUUIDsList?.includes(
                                              school?.uuid
                                            )}
                                            onChange={(e) => [
                                              handleUserIds(
                                                e,
                                                school?.uuid,
                                                indexVal
                                              ),
                                            ]}
                                            ref={checkbox}
                                          ></Checkbox>
                                          <Text textStyle={"p"}>
                                            {" "}
                                            {school?.school_name}
                                          </Text>
                                        </HStack>
                                      </Td>
                                      <Td>
                                        {" "}
                                        <Text textStyle={"p"}>
                                          {" "}
                                          {item?.district_name}{" "}
                                        </Text>
                                      </Td>
                                      <Td>
                                        <Text textStyle={"p"}>
                                          {school?.state}
                                        </Text>
                                      </Td>
                                      {/* <Td role="button">
                                        <DeleteIcon
                                          color="red"
                                          cursor="pointer"
                                          onClick={() => {
                                            setSelectedSchool(school?.uuid);
                                            setDeletePopUp(true);
                                          }}
                                        />
                                      </Td> */}
                                    </Tr>
                                  ))
                                : null}
                            </React.Fragment>
                          ))
                        ) : (
                          <Text>No Schools Found </Text>
                        )}
                      </Tbody>
                    </Table>
                  </TableContainer>
                )}

                {totalPages2 > 1 ? (
                  <Flex
                    justifyContent={{ base: "flex-end", lg: "flex-end" }}
                    marginRight={{ base: "5px", md: "20px" }}
                    my={{ base: "1rem", md: "1rem" }}
                  >
                    <PaginationComponent
                      onPageChange={handlePageNumber}
                      pageCount={totalPages2}
                      forcePage={pageNumber - 1}
                      isNextButton={isNextButtonDisabled}
                      isPreviousButton={isPreviousButtonDisabled}
                    />
                  </Flex>
                ) : null}
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
        {deletePopUp && (
          <DeletePopUp
            setDeletePopUp={setDeletePopUp}
            deletePopUp={deletePopUp}
            text={"Are you sure you want to delete the school ?"}
            onClick={handleDeleteSchool}
          />
        )}{" "}
      </Box>
    </>
  );
};

export default AddLicenseToSchool;
