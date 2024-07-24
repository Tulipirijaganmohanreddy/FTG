import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Checkbox,
  Flex,
  Grid,
  HStack,
  IconButton,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useToken,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import {
  deleteContact,
  getAllContactsApiCall,
  setAllContactsList,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import collapasableIcon from "../../../assets/Images/SuperAdminContentImages/Polygon3.svg";

import collapasableIcon1 from "../../../assets/Images/SuperAdminContentImages/Polygon7.svg";

import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";

import { setTotalPages } from "../../teacher/teacherSlice";

import {
  debounce,
  handleCheckAllIds,
  handleSelectedIds,
} from "../../../Utilities/utils";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";

import { licenseContactsData } from "../Config";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const ContactsList = ({ ContactsCC, errorObjValues, setErrors }) => {
  const { districtStateNamesObj, roleValuesObj, roleObj, filterRolesDropdown } =
    licenseContactsData;
  const dispatch = useDispatch();

  const params = useParams();

  const token = useSelector((state) => state?.profile?.token);
  const loading = useSelector((state) => state?.superAdmin?.loading);
  const code = useSelector((state) => state?.profile?.code);

  const totalPages = useSelector((state) => state.teacher.totalPages);

  const allContactsList = useSelector(
    (state) => state?.superAdmin?.allContactsList
  );

  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const getAllContactsData = useSelector(
    (state) => state?.superAdmin?.ContactsList
  );

  const tableHeaders = ["Name", "District", "Email", "Role", "Delete"];

  const [isCollapseOpen, setIsCollapseOpen] = useState([]);

  const [parentCheckBoxList, setParentCheckBoxList] = useState([]);

  const [childCheckBoxList, setChildCheckBoxList] = useState({});

  const [selectedUUIDsList, setSelectedUUIDsList] = useState([]);

  const [tableDataArray, setTableDataArray] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState("");

  const [pageNumber, setPageNumber] = useState(1);

  const [deletePopUp, setDeletePopUp] = useState(false);

  const [initialRendering, setInitialRendering] = useState(true);

  const [paginationBody, setPaginationBody] = useState({
    size: 20,
    skip: pageNumber,
    search: "",
    role: "",
  });

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const checkbox = useRef();

  const toggleBodyVisibility = (index) => {
    setIsCollapseOpen((prevState) => {
      const newArr = [...prevState];

      newArr[index] = !prevState[index];

      return newArr;
    });
  };

  const handleDeleteContact = () => {
    let role = [];

    Object.keys(selectedSchool)?.forEach((key) => {
      if (key?.includes("_role")) {
        if (selectedSchool[key]) {
          role.push(roleValuesObj[key]);
        }
      }
    });

    dispatch(
      deleteContact({
        body: { uuid: selectedSchool?.uuid, role: role },
        token: token,
      })
    );
  };

  useEffect(() => {
    paginationBody?.search?.length != 1 &&
      dispatch(
        getAllContactsApiCall({
          uuid: params?.funderId,
          license_uuid: params?.licenseId,
          paginationBody,
          token,
        })
      );
  }, [paginationBody]);

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
      tableDataArray,

      "admins"
    );
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
      tableDataArray,

      "admins"
    );
  };

  const getMergedContactsList = () => {
    let schoolsAdminsList = [];
    const adminDistrictsData = getAllContactsData?.AdminDistrict;
    getAllContactsData?.schools?.map((adminSchools, key) => {
      if (adminSchools?.AdminSchool?.length > 0) {
        adminSchools?.AdminSchool?.map((item, key) => {
          schoolsAdminsList.push(item);
        });
      }
    });
    if (adminDistrictsData && schoolsAdminsList) {
      const contactsData = [];
      adminDistrictsData?.length && contactsData.push(...adminDistrictsData);
      schoolsAdminsList?.length && contactsData.push(...schoolsAdminsList);
    }
  };

  const handleDistrictStateNames = (item) => {
    return (
      <>
        {Object.keys(item)?.map(
          (key) =>
            key?.includes("_name") &&
            `${districtStateNamesObj[key]} ${item[key]}`
        )}
      </>
    );
  };

  const showingRoles = (item) => {
    return (
      <Td>
        {Object.keys(item)?.map(
          (key) => key?.includes("_role") && item[key] && roleObj[key]
        )}
      </Td>
    );
  };

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);

    setPaginationBody((prevState) => ({
      ...prevState,
      skip: event.selected + 1,
    }));
  };

  const handleSearch = debounce((text) => {
    setPaginationBody((prevState) => ({
      ...prevState,
      search: text,
      skip: 1,
    }));
  }, 500);

  const handleChange = (event) => {
    setPaginationBody((prevState) => ({
      ...prevState,
      role: event.target.value,
    }));
  };

  useEffect(() => {
    getMergedContactsList();
    dispatch(setTotalPages(""));

    dispatch(setAllContactsList([]));

    return () => {
      setChildCheckBoxList({});
      setParentCheckBoxList([]);

      setSelectedUUIDsList([]);
    };
  }, []);

  useEffect(() => {
    setTableDataArray(allContactsList);

    const checkedList =
      allContactsList?.length > 0 &&
      allContactsList?.map((each, index) => {
        setChildCheckBoxList((prevState) => ({
          ...prevState,
          [index]: [],
        }));

        return false;
      });

    setParentCheckBoxList(checkedList);

    setIsCollapseOpen(checkedList);
  }, [allContactsList]);

  useEffect(() => {
    let selectedEmails = [];

    allContactsList?.length > 0 &&
      allContactsList?.forEach((each) => {
        if (each?.admins?.length > 0) {
          each?.admins?.forEach((item) => {
            if (selectedUUIDsList?.includes(item?.uuid)) {
              selectedEmails.push(item?.email);
            }
          });
        }
      });

    ContactsCC(selectedEmails);

    if (!initialRendering && selectedUUIDsList?.length === 0) {
      setErrors((prevState) => ({
        ...prevState,

        sendTo: "Please select any of the below email",
      }));
    } else {
      setErrors((prevState) => ({
        ...prevState,

        sendTo: "",
      }));
    }
  }, [selectedUUIDsList]);

  useEffect(() => {
    ContactsCC([]);
    getMergedContactsList();

    if (code === 200) {
      const checkedList =
        allContactsList?.length > 0
          ? allContactsList?.map((each, index) => {
              setChildCheckBoxList((prevState) => ({
                ...prevState,
                [index]: [],
              }));

              return false;
            })
          : setChildCheckBoxList({ 0: [] });

      setParentCheckBoxList([]);

      setSelectedUUIDsList([]);
    }
  }, [code]);

  return (
    <Box marginTop="4">
      <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}>
        <Box
          display="flex"
          flexDirection={{ base: "column", md: "row" }}
          gap={{ base: "3" }}
          justifyContent={{
            base: "space-between",
            md: "flex-start",
            lg: "space-between",
          }}
        >
          <Box inlineSize={{ base: "100%", lg: "25em", md: "25em" }}>
            <SearchComponent
              id="searchName"
              name="search"
              display={{ base: "flex", lg: "flex", md: "flex" }}
              onChange={(event) => handleSearch(event.target.value)}
            />
          </Box>

          <Box w={{ base: "100%", md: "20rem", lg: "20rem" }}>
            <SingleSelect2
              id="searchByRole"
              onChange={handleChange}
              name="role"
              value={paginationBody?.role}
              optionsProps={filterRolesDropdown[licenseByIdData?.funder_type]}
              displayKey={"label"}
              optionValue={"value"}
            />
          </Box>
        </Box>
      </Grid>

      {loading ? (
        <LoadingComponent />
      ) : (
        <TableContainer
          height="auto"
          maxH="calc(100vh - 10rem)"
          overflowY="auto"
        >
          <Table>
            <Thead>
              <Tr>
                {tableHeaders.map((item, key) => (
                  <Th>{item}</Th>
                ))}
              </Tr>
            </Thead>

            {errorObjValues?.sendTo ? (
              <ErrorText textStyle="p" mx="2">
                Please select any of the below email
              </ErrorText>
            ) : null}

            <Tbody>
              {tableDataArray?.length > 0 &&
                tableDataArray?.map((item, indexVal) => (
                  <React.Fragment key={indexVal}>
                    <Tr>
                      <Td colSpan={tableHeaders?.length}>
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
                                onClick={() => toggleBodyVisibility(indexVal)}
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
                                  mr="1"
                                  isChecked={parentCheckBoxList?.[indexVal]}
                                  onChange={(event) =>
                                    handleCheckAll(event, indexVal)
                                  }
                                />
                                {handleDistrictStateNames(item)}
                              </Text>
                            </Box>
                          </Flex>
                        </div>
                      </Td>
                    </Tr>

                    {!isCollapseOpen?.[indexVal]
                      ? item?.admins?.map((admin, index) => (
                          <Tr key={index}>
                            <Td style={{ width: "25%" }}>
                              <HStack>
                                <Checkbox
                                  isChecked={selectedUUIDsList?.includes(
                                    admin?.uuid
                                  )}
                                  onChange={(e) => [
                                    handleUserIds(e, admin?.uuid, indexVal),
                                  ]}
                                  ref={checkbox}
                                ></Checkbox>
                                <Text color="primary" cursor={"pointer"}>
                                  {`${admin?.last_name} ${admin?.first_name}` ||
                                    "NA"}
                                </Text>
                              </HStack>
                            </Td>
                            <Td>{admin?.district_name || "NA"}</Td>
                            <Td>{admin?.email}</Td>

                            <Td>{showingRoles(admin)}</Td>

                            <Td role="button">
                              <DeleteIcon
                                color="red"
                                cursor="pointer"
                                onClick={() => {
                                  setSelectedSchool(admin);
                                  setDeletePopUp(true);
                                }}
                              />
                            </Td>
                          </Tr>
                        ))
                      : null}
                  </React.Fragment>
                ))}
            </Tbody>
          </Table>

          {tableDataArray?.length === 0 && !loading && (
            <NoDataFoundText>No Data Found</NoDataFoundText>
          )}
        </TableContainer>
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

      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the contact?"}
          onClick={handleDeleteContact}
        />
      )}
    </Box>
  );
};

export default ContactsList;
