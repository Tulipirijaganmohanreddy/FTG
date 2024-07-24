import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Portal,
  Radio,
  Select,
  Spacer,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  useDisclosure,
  useToken,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setPreviousPath } from "../../../store/slices/profileSlice";

import moment from "moment";
import {
  debounce,
  handleEndDate,
  handleCheckAllIds,
  handleSelectedIds,
  handleToggleBodyVisibility,
} from "../../../Utilities/utils";
import collapasableIcon from "../../../assets/Images/SuperAdminContentImages/Polygon3.svg";
import collapasableIcon1 from "../../../assets/Images/SuperAdminContentImages/Polygon7.svg";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import NegativeButton from "../../../components/NegativeButton";
import PaginationComponent from "../../../components/PaginationComponent";
import PositiveButton from "../../../components/PositiveButton";
import {
  deleteSchoolLicenseById,
  getLicenseById,
  getLicensedSchoolInfo,
  getUpdatedSchoolDate,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";

import AddLicenseToSchool from "./AddLicenseToSchool";
import { licenseSchoolData } from "../Config";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import { TbArrowsSort } from "react-icons/tb";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { BsSortNumericDownAlt, BsSortNumericUp } from "react-icons/bs";

const statusOptions = [
  {
    id: 1,
    label: "Active",
    value: "Active",
  },

  {
    id: 2,
    label: "Inactive",
    value: "Inactive",
  },
];

const LicenseSchoolList = React.memo((props) => {
  const { setSchools, setMassUpdate, massUpdate, activeTab, setActiveTab } =
    props;

  const { tableHeaders, schoolDatesFields, statePartnersTable } =
    licenseSchoolData;

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const licensedSchoolData = useSelector(
    (state) => state?.superAdmin?.licensedSchools
  );
  const licenceData = useSelector((state) => state.superAdmin.licenseData);
  const bg = useToken("colors", "white.500");

  const payload = {
    license_start_date: "",
    license_end_date: "",
  };

  const loading = useSelector((state) => state?.superAdmin?.loading);
  const upLoading = useSelector((state) => state.profile.upLoading);
  const token = useSelector((state) => state?.profile?.token);
  const codeUpdate = useSelector((state) => state.superAdmin.codeUpdate);

  const totalPages = useSelector((state) => state.teacher.totalPages);
  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const code = useSelector((state) => state.profile.code2);
  const message = useSelector((state) => state.profile.message);

  const [data, setData] = useState([]);
  const [isCollapseOpen, setIsCollapseOpen] = useState([]);
  const [inputFields, setInputFields] = useState(payload);
  const [uuid, setSchoolUUID] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState("");
  const [searchText, setSearchText] = useState("");

  const [status, setStatus] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const [parentCheckBoxList, setParentCheckBoxList] = useState([]);

  const [childCheckBoxList, setChildCheckBoxList] = useState({});

  const [selectedUUIDsList, setSelectedUUIDsList] = useState([]);

  const checkbox = useRef();

  const toggleBodyVisibility = (index) => {
    handleToggleBodyVisibility(index, setIsCollapseOpen);
  };

  const handleChange = (e) => {
    if (e.target.name === "license_start_date") {
      let endDate = handleEndDate(e.target.value);
      setInputFields({
        ...inputFields,
        [e.target.name]: e.target.value,
        license_end_date: endDate["end_date"],
      });
    } else {
      setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }
  };

  const handleUserIds = (e, schoolId, index) => {
    handleSelectedIds(
      e,
      schoolId,
      index,
      selectedUUIDsList,
      setSelectedUUIDsList,
      childCheckBoxList,
      setChildCheckBoxList,
      parentCheckBoxList,
      setParentCheckBoxList,
      licensedSchoolData,

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
      licensedSchoolData,

      "schools"
    );
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  const validateData = (event) => {
    event.preventDefault();

    const finalPayload = { uuid, ...inputFields };

    dispatch(getUpdatedSchoolDate({ body: finalPayload, token: token }));
  };

  useEffect(() => {
    setData(licensedSchoolData);

    const checkedList =
      licensedSchoolData?.length > 0 &&
      licensedSchoolData?.map((each, index) => {
        setChildCheckBoxList((prevState) => ({
          ...prevState,
          [index]: [],
        }));

        return false;
      });

    setParentCheckBoxList(checkedList);

    setIsCollapseOpen(checkedList);
  }, [licensedSchoolData]);

  const handleSchoolLicenseDeletion = (id) => {
    dispatch(setPreviousPath(location.pathname));

    const body = {
      uuid: selectedSchool,
      license_uuid: params?.licenseId,
    };

    dispatch(deleteSchoolLicenseById({ body: body, token: token }));
  };

  const handleSchoolData = (schoolInfo) => {
    onOpen();

    setInputFields({
      ...inputFields,
      license_start_date: schoolInfo?.license_start_date.split("T")[0],
      license_end_date: schoolInfo?.license_end_date.split("T")[0],
      uuid: schoolInfo?.uuid,
      license_uuid: params?.licenseId,
    });
  };

  const handleSearch = debounce((text) => {
    let finalPayload = {
      size: 50,
      skip: 1,
      search: text,
      status: status,
    };
    setSearchText(text);
    text?.length != 1
      ? dispatch(
          getLicensedSchoolInfo({
            body: finalPayload,
            uuid: params?.licenseId,
            token: token,
          })
        )
      : null;
  }, 500);

  const handleStatus = (event) => {
    setPageNumber(1);
    setStatus(event.target.value);

    setChildCheckBoxList({});
    setParentCheckBoxList([]);

    setSelectedUUIDsList([]);




  };


  useEffect(() => {
    dispatch(setTotalPages(""));

    return () => {
      setChildCheckBoxList({});
      setParentCheckBoxList([]);

      setSelectedUUIDsList([]);
    };
  }, []);

  useEffect(() => {
    setSchools(selectedUUIDsList);
  }, [selectedUUIDsList]);

  useEffect(() => {
    onClose();
    if (code === 200 && message !== "Deleted School Successfully") {
      const finalPayload = {
        size: 50,
        skip: pageNumber,
        search: "",
        status: status,
      };

      dispatch(
        getLicensedSchoolInfo({
          body: finalPayload,
          uuid: params?.licenseId,
          token: token,
        })
      );
      onClose();
    }
    setInputFields({
      ...inputFields,
      license_start_date: licenceData?.start_date,
      license_end_date: licenceData?.end_date,
    });

    setSchoolUUID([]);
  }, [code]);

  useEffect(() => {
    if (code == 200) {
      setSelectedUUIDsList([]);
      setSchools([]);
      setMassUpdate(false);
    }
  }, [code]);

  useEffect(() => {
    const finalPayload = {
      size: 50,
      skip: pageNumber,
      search: searchText,
      status: status,
    };

    dispatch(
      getLicensedSchoolInfo({
        body: finalPayload,
        uuid: params?.licenseId,
        token: token,
      })
    );
  }, [pageNumber, status]);

  return (
    <>
      <Flex justifyContent="space-between" alignItems="center" mt="4">
        <Flex gap={5} alignItems={"center"}>
          <Box inlineSize={{ base: "100%", lg: "25em", md: "25em" }}>
            <SearchComponent
              id="searchSchool"
              name="search"
              display={{ base: "flex", lg: "flex", md: "flex" }}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </Box>

          <Box>
            <Select
              rounded="full"
              borderWidth="2px"
              borderColor="white"
              bg="primary"
              color="white"
              value={status}
              onChange={handleStatus}
              _selected={{
                color: "white",
              }}
              cursor="pointer"
            >
              <option style={{ color: "black" }} value={""}>
                Select Status
              </option>

              {statusOptions?.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item?.value}
                    style={{ color: "black" }}
                  >
                    {item?.label}
                  </option>
                );
              })}
            </Select>
          </Box>
        </Flex>

        <Box>
          <AddLicenseToSchool />
        </Box>
      </Flex>
      <Box>
        {loading ? (
          <LoadingComponent />
        ) : (
          <TableContainer
            height="auto"
            maxH="calc(100vh - 12rem)"
            overflowY="auto"
          >
            <Table>
              {["state", "partner"].includes(licenseByIdData?.funder_type) ? (
                <Thead>
                  <Tr>
                    <Th>
                      <Flex gap={5}>
                        <Checkbox
                          size="md"
                          onChange={() => {
                            setMassUpdate(!massUpdate);
                          }}
                        />
                        School
                      </Flex>
                    </Th>
                    {statePartnersTable?.map((item, index) => {
                      return (
                        <>
                          <Th key={"a" + index}>{item}</Th>
                        </>
                      );
                    })}
                  </Tr>
                </Thead>
              ) : (
                <Thead>
                  <Tr>
                    {tableHeaders?.map((item, key) => (
                      <Th>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
              )}

              <Tbody>
                {data?.length > 0
                  ? data?.map((item, indexVal) => (
                      <React.Fragment key={indexVal}>
                        <Tr>
                          <Td colSpan={tableHeaders.length}>
                            <div style={{ width: "100%" }}>
                              <Flex mt="2" ml="2">
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
                                <Box marginTop="2" marginLeft="-2">
                                  <Text textStyle="h4">
                                    <Checkbox
                                      mt="0.5"
                                      mr="1"
                                      isChecked={parentCheckBoxList?.[indexVal]}
                                      onChange={(event) =>
                                        handleCheckAll(event, indexVal)
                                      }
                                    />
                                    District :
                                    {item?.district_name
                                      ? item?.district_name
                                      : "NA"}
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
                                    <Text
                                      role="button"
                                      color="primary"
                                      cursor={"pointer"}
                                      onClick={() => handleSchoolData(school)}
                                    >
                                      {school?.school_name || "NA"}
                                    </Text>
                                  </HStack>
                                </Td>
                                <Td>{item?.district_name || "NA"}</Td>
                                <Td>{school?.state}</Td>
                                <Td>{school?.license_status || "NA"}</Td>
                                <Td>
                                  {moment
                                    .utc(school?.license_start_date)
                                    .format("MM-DD-YYYY")}
                                </Td>
                                <Td>
                                  {moment
                                    .utc(school?.license_end_date)
                                    .format("MM-DD-YYYY")}
                                </Td>
                                <Td role="button">
                                  <DeleteIcon
                                    color="red"
                                    cursor="pointer"
                                    onClick={() => {
                                      setSelectedSchool(school?.uuid);
                                      setDeletePopUp(true);
                                    }}
                                  />
                                </Td>
                              </Tr>
                            ))
                          : null}
                      </React.Fragment>
                    ))
                  : null}
              </Tbody>
            </Table>

            {data?.length === 0 && !loading && (
              <NoDataFoundText>No Data Found</NoDataFoundText>
            )}
          </TableContainer>
        )}

        {totalPages > 1 ? (
          <Flex
            justifyContent={{ base: "flex-end", lg: "flex-end" }}
            marginRight={{ base: "5px", md: "20px" }}
            my={{ base: "2rem", md: "3rem" }}
          >
            <PaginationComponent
              onPageChange={handlePageNumber}
              pageCount={totalPages}
              forcePage={pageNumber - 1}
              isNextButton={isNextButtonDisabled}
              isPreviousButton={isPreviousButtonDisabled}
            />
          </Flex>
        ) : null}
      </Box>
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the school ?"}
          onClick={handleSchoolLicenseDeletion}
        />
      )}{" "}
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        borderRadius={10}
        size={{ base: "xs", md: "md" }}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalBody p="0">
            <Heading
              size="md"
              background="#0081c8"
              height="4rem"
              color="white"
              p="5"
            >
              Adding School
            </Heading>

            <Flex>
              <Spacer />
            </Flex>
            <form onSubmit={validateData}>
              <Grid gap="2" p="5">
                {schoolDatesFields?.map((item, index) => {
                  return (
                    <GridItem colSpan="1" key={"a" + index}>
                      {item.inputType === "date" && (
                        <Box>
                          <Inputs
                            label={item.label}
                            id={item.Id}
                            type="date"
                            border="0px"
                            bg="bg.100"
                            min={
                              item.name === "license_start_date"
                                ? licenceData?.start_date
                                : null
                            }
                            max={
                              item.name === "license_end_date"
                                ? licenceData?.end_date
                                : null
                            }
                            name={item?.name}
                            value={inputFields?.[item.name]}
                            onChange={handleChange}
                            textStyle={"textHead"}
                          />
                        </Box>
                      )}
                    </GridItem>
                  );
                })}
              </Grid>

              <Center>
                <Flex gap="4" my="4">
                  <NegativeButton text="Cancel" onClick={onClose} />
                  <PositiveButton
                    text="Save"
                    type="submit"
                    isLoading={upLoading}
                  />
                </Flex>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
});
export default LicenseSchoolList;
