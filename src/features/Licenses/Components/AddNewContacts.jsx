import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import SubHeading from "../../../components/FitnessComponents/FitnessTexts/SubHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  addContacts,
  getAllContactsApiCall,
  getAllContactsForFunderByID,
  getAllDistrictorSchoolsByRole,
  getDistrictAdminDistrictsOrSchoolSByRole,
  getPartnerDistrictsOrSchoolSByRole,
  getStateAdminDistrictsOrSchoolSByRole,
  getSuperAdminDistrictsOrSchoolSByRole,
  setAllDistrictorSchoolsByRole,
  setContacts,
  setDistrictAdminDistrictsOrSchoolSByRole,
  setPartnerDistrictsOrSchoolSByRole,
  setStateAdminDistrictsOrSchoolSByRole,
  setSuperAdminDistrictsOrSchoolSByRole,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { licenseContactsData } from "../Config";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import { debounce } from "../../../Utilities/utils";

const AddNewContacts = () => {
  const dispatch = useDispatch();
  const { onOpen, onClose } = useDisclosure();
  const params = useParams();

  const { optionsList, rolesListBasedOnFunderType } = licenseContactsData;

  const districtsSchoolsData = useSelector(
    (state) => state?.superAdmin?.districtsOrSchoolsByRole
  );
  const token = useSelector((state) => state?.profile?.token);
  const addContactResponse = useSelector(
    (state) => state?.superAdmin?.contactData
  );

  // const upLoading = useSelector((state) => state.superAdmin.upLoading);
  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const loading = useSelector((state) => state?.profile?.upLoading);

  const [rolesDropDown, setRolesDropDown] = useState([]);

  const superAdminDistrictsOrSchoolSByRole = useSelector(
    (state) => state?.superAdmin?.superAdminDistrictsOrSchoolSByRole
  );

  const districtAdminDistrictsOrSchoolSByRole = useSelector(
    (state) => state?.superAdmin?.districtAdminDistrictsOrSchoolSByRole
  );

  const stateAdminDistrictsOrSchoolSByRole = useSelector(
    (state) => state?.superAdmin?.stateAdminDistrictsOrSchoolSByRole
  );

  const partnerDistrictsOrSchoolSByRole = useSelector(
    (state) => state?.superAdmin?.partnerDistrictsOrSchoolSByRole
  );

  const organizationListObject = {
    schoolAdmin: superAdminDistrictsOrSchoolSByRole,
    districtAdmin: districtAdminDistrictsOrSchoolSByRole,
    stateAdmin: stateAdminDistrictsOrSchoolSByRole,
    partner: partnerDistrictsOrSchoolSByRole,
  };

  const apiCallObj = {
    schoolAdmin: (role, uuid, token, searchText) =>
      dispatch(
        getSuperAdminDistrictsOrSchoolSByRole({
          role: role,
          uuid: uuid,
          token: token,
          searchText: searchText,
        })
      ),
    districtAdmin: (role, uuid, token, searchText) =>
      dispatch(
        getDistrictAdminDistrictsOrSchoolSByRole({
          role: role,
          uuid: uuid,
          token: token,
          searchText: searchText,
        })
      ),
    stateAdmin: (role, uuid, token, searchText) =>
      dispatch(
        getStateAdminDistrictsOrSchoolSByRole({
          role: role,
          uuid: uuid,
          token: token,
          searchText: searchText,
        })
      ),
    partner: (role, uuid, token, searchText) =>
      dispatch(
        getPartnerDistrictsOrSchoolSByRole({
          role: role,
          uuid: uuid,
          token: token,
          searchText: searchText,
        })
      ),
  };

  const [role, setRole] = useState(0);
  const [rows, setRows] = useState([
    {
      first_name: "",
      last_name: "",
      email: "",
      role: "schoolAdmin",
      organization: "",
      school_admin_role: "",
      district_admin_role: "",
      state_admin_role: "",
      partner_role: "",
      funder_uuid: params ? params?.funderId : "",
      license_uuid: params ? params?.licenseId : "",
    },
  ]);

  const [organisationOptionsList, setOrganisationOptionsList] = useState([]);

  const [selectedOrganization, setSelectedOrganization] = useState({
    label: "Select..",
    value: "",
  });

  const [organizationList, setOrganizationList] = useState([{}]);

  const [organisationListObj, setOrganisationListObj] = useState({});

  const [districtAdminData, setDistrictAdminData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const initialRowErrorObj = {
    role: "",
    organization: "",
    first_name: "",
    last_name: "",
    email: "",
  };

  const [rowErrorList, setRowErrorList] = useState([initialRowErrorObj]);

  const handleOpenModal = () => {
    setIsOpen(true);

    setRows([
      {
        role: "",
        organization: "",
        first_name: "",
        last_name: "",
        email: "",
        school_admin_role: "",
        district_admin_role: "",
        state_admin_role: "",
        partner_role: "",
        funder_uuid: params ? params?.funderId : "",
        license_uuid: params ? params?.licenseId : "",
      },
    ]);

    // dispatch(setAllDistrictorSchoolsByRole([]));
  };

  const handleCloseModal = () => {
    setIsOpen(false);

    setRowErrorList([initialRowErrorObj]);

    setOrganizationList([{}]);
  };

  function organizationApiCallBasedOnRole(role, uuid, token, searchText) {
    dispatch(
      getSuperAdminDistrictsOrSchoolSByRole({
        role: role,
        uuid: uuid,
        token: token,
        searchText: searchText,
      })
    );
  }

  const handleRoleChange = (index, value) => {
    setRole(value);

    // apiCallObj[value](value, params?.funderId, token, '');

    organizationApiCallBasedOnRole(value, params?.licenseId, token, "");

    let errorObj = validateFormData({ role: value });

    handlingError(index, errorObj, "role");

    setRows((prevRows) => {
      const updatedRows = [...prevRows];

      updatedRows[index] = { ...updatedRows[index], role: value };
      if (value === "schoolAdmin") {
        updatedRows[index] = {
          ...updatedRows[index],
          school_admin_role: 1,
          organization: "",
          district_admin_role: 0,
          state_admin_role: 0,
          partner_role: 0,
        };
      } else if (value === "districtAdmin") {
        updatedRows[index] = {
          ...updatedRows[index],
          organization: districtAdminData?.uuid,
          district_admin_role: 1,
          school_admin_role: 0,
          state_admin_role: 0,
          partner_role: 0,
        };
      } else if (value === "stateAdmin") {
        updatedRows[index] = {
          ...updatedRows[index],
          organization: districtAdminData?.uuid,
          district_admin_role: 0,
          school_admin_role: 0,
          state_admin_role: 1,
          partner_role: 0,
        };
      } else if (value === "partner") {
        updatedRows[index] = {
          ...updatedRows[index],
          organization: districtAdminData?.uuid,
          district_admin_role: 0,
          school_admin_role: 0,
          state_admin_role: 0,
          partner_role: 1,
        };
      }

      return updatedRows;
    });
  };

  const handleInputChange = debounce((text, role, index) => {
    text?.length != 1 &&
      role?.length > 2 &&
      organizationApiCallBasedOnRole(role, params?.licenseId, token, text);
  }, 500);

  const onhandleChange = (organization, index) => {
    // setFormData((prevState) => ({
    //   ...prevState,
    //   district_name: teacher.value,
    //   skip: 1,
    // }));

    let errorObj = validateFormData({ organization: organization.label });

    handlingError(index, errorObj, "organization");

    setOrganizationList((prevState) => {
      const dataList = [...prevState];

      dataList[index] = organization;

      return dataList;
    });

    // setSelectedOrganization((prevState) => ({
    //   ...prevState,
    //   label: organization.label,
    //   value: organization.value,
    // }));

    setRows((prevRows) => {
      const updatedRows = [...prevRows];
      updatedRows[index] = {
        ...updatedRows[index],
        organization: organization.value,
      };
      return updatedRows;
    });
  };

  function handlingError(index, errorObj, name) {
    if (Object.keys(errorObj)?.length > 0) {
      setRowErrorList((prevState) => {
        const newArr = [...prevState];

        newArr[index] = { ...newArr[index], ...errorObj };

        return newArr;
      });
    } else {
      setRowErrorList((prevState) => {
        const newArr = [...prevState];

        newArr[index] = { ...newArr[index], [name]: "" };

        return newArr;
      });
    }
  }

  const handleChange = (index, name, value) => {
    const trimmedValue = value.trim();

    if (name == "first_name") {
      const data = [...rows];

      data[index][name] = value;

      setRows(data);
    } else {
      const data = [...rows];

      data[index][name] = trimmedValue;

      setRows(data);
    }

    let errorObj = validateFormData({ [name]: trimmedValue });

    handlingError(index, errorObj, name);
  };

  const handleBlur = (index, name, value) => {
    const trimmedValue = value.trim();

    const data = [...rows];

    data[index][name] = trimmedValue;

    setRows(data);
  };

  const handleOrgChange = (index, value) => {
    let errorObj = validateFormData({ organization: value });

    handlingError(index, errorObj, "organization");
  };

  const addRowTable = () => {
    setRows((prevRows) => [
      ...prevRows,
      {
        role: "",
        organization: "",
        first_name: "",
        last_name: "",
        email: "",
        funder_uuid: params ? params?.funderId : "",
        license_uuid: params ? params?.licenseId : "",
      },
    ]);

    setRowErrorList((prevState) => [
      ...prevState,
      {
        role: "",
        organization: "",
        first_name: "",
        last_name: "",
        email: "",
      },
    ]);

    setOrganizationList((prevState) => [...prevState, {}]);
  };

  const tableRowRemove = (index) => {
    const dataRow = [...rows];
    dataRow?.splice(index, 1);
    setRows(dataRow);

    setOrganizationList((prevState) => {
      const newArr = [...prevState];

      newArr?.splice(index, 1);

      return newArr;
    });

    setRowErrorList((prevState) => {
      const newArray = [...prevState];

      newArray?.splice(index, 1);

      return newArray;
    });
  };

  const AddContactsData = (event) => {
    event.preventDefault();
    let errorsList = [];

    rows?.forEach((payload, index) => {
      let errorObj = validateFormData(payload);

      if (Object.keys(errorObj)?.length > 0) {
        errorsList[index] = errorObj;
      } else {
        errorsList[index] = {};
      }
    });

    setRowErrorList(errorsList);

    const newObj = errorsList?.reduce((acc, curr) => {
      if (acc && Object.keys(curr).length > 0) {
        acc = null;
      }
      return acc || curr;
    }, {});

    if (Object.keys(newObj)?.length === 0) {
      dispatch(
        addContacts({
          token: token,
          body: rows,
        })
      );
    }
  };

  useEffect(() => {
    dispatch(setContacts([]));

    return () => {
      dispatch(setSuperAdminDistrictsOrSchoolSByRole([]));
      dispatch(setDistrictAdminDistrictsOrSchoolSByRole([]));
      dispatch(setStateAdminDistrictsOrSchoolSByRole([]));
      dispatch(setPartnerDistrictsOrSchoolSByRole([]));
    };
  }, []);

  useEffect(() => {
    if (addContactResponse?.data?.code === 200) {
      onClose();

      let body = {
        size: 20,
        skip: 1,
        search: "",
        role: "",
      };

      dispatch(
        getAllContactsApiCall({
          uuid: params?.funderId,
          license_uuid: params?.licenseId,
          paginationBody: body,
          token,
        })
      );

      setIsOpen(false);
    }
  }, [addContactResponse]);

  useEffect(() => {
    setDistrictAdminData(licenseByIdData?.district);
  }, [isOpen]);

  useEffect(() => {
    Object.keys(rolesListBasedOnFunderType)?.forEach((key) => {
      if (key === licenseByIdData?.funder_type) {
        setRolesDropDown(rolesListBasedOnFunderType?.[key]);

        // rolesListBasedOnFunderType?.[key]?.map((each) => {
        //   apiCallObj[each?.value](each?.value, params?.funderId, token);
        // })
      }
    });
  }, [licenseByIdData]);

  // useEffect(() => {
  //   let options = {};

  //   rolesDropDown?.map(
  //     (each) => (options[each?.value] = organizationListObject[each?.value])
  //   );

  //   setOrganisationListObj(options);
  // }, [rolesDropDown]);

  useEffect(() => {
    let organisationsList = [];

    if (superAdminDistrictsOrSchoolSByRole?.length) {
      superAdminDistrictsOrSchoolSByRole?.forEach((item) => {
        Object.keys(item)?.forEach((eachKey) => {
          if (eachKey?.includes("name")) {
            let obj = {
              label: item?.[eachKey],
              value: item?.["uuid"],
            };
            organisationsList.push(obj);
          }
        });
      });

      setOrganisationOptionsList(organisationsList);
    } else {
      setOrganisationOptionsList([]);
    }
  }, [superAdminDistrictsOrSchoolSByRole]);

  return (
    <div>
      <Box onClick={handleOpenModal} role="button">
        <TextIcon text="Add Contact" icon={MdAddCircle} />
      </Box>

      <Box>
        <Modal isOpen={isOpen} onClose={handleCloseModal} size="6xl">
          <ModalOverlay />
          <ModalContent m="3">
            <ModalCloseButton />
            <ModalBody p="0">
              <Heading
                size="md"
                background="#0081c8"
                height="4rem"
                color="white"
                p="5"
              >
                Add New License Contacts
              </Heading>
              <form onSubmit={AddContactsData}>
                <Box marginTop="4" p="4">
                  <TableContainer zIndex={-1} h="auto" pb="4rem" height="auto" maxH="400px" overflowY="auto">
                    <Table >
                      <Thead>
                        <Tr>
                          <Th w="12rem"> First Name</Th>
                          <Th w="12rem">Last Name</Th>
                          <Th w="12rem">E-mail</Th>
                          <Th w="12rem">Role</Th>
                          <Th w="12rem"> Organization</Th>
                          <Th w="1rem">Delete</Th>
                        </Tr>
                      </Thead>

                      <Tbody>
                        {rows?.map((row, index) => (
                          <Tr key={index}>
                            <Td>
                              <Inputs
                                aria-label="First Name"
                                type="text"
                                value={row?.first_name}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                onBlur={(e) =>
                                  handleBlur(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                bg={index % 2 !== 0 ? "white" : "input.100"}
                                border={
                                  index % 2 !== 0
                                    ? "1px solid gray"
                                    : "input.100"
                                }
                                name="first_name"
                                fontSize="xs"
                                // error={rowErrorList[index]?.first_name?.length > 2 ? rowErrorList[index]?.first_name : ""}
                              />

                              <Box h="2rem" w="5rem" mt="2">
                                {rowErrorList[index]?.first_name?.length >
                                  2 && (
                                  <ErrorText>
                                    {rowErrorList[index]?.first_name}
                                  </ErrorText>
                                )}
                              </Box>
                            </Td>

                            <Td>
                              <Inputs
                                aria-label="Last Name"
                                type="text"
                                value={row?.last_name}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                onBlur={(e) =>
                                  handleBlur(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                name="last_name"
                                fontSize="xs"
                                bg={index % 2 !== 0 ? "white" : "input.100"}
                                border={
                                  index % 2 !== 0
                                    ? "1px solid gray"
                                    : "input.100"
                                }
                                // error={rowErrorList[index]?.last_name?.length > 2 ? rowErrorList[index]?.last_name : ""}
                              />

                              <Box h="2rem" w="5rem" mt="2">
                                {rowErrorList[index]?.last_name?.length > 2 && (
                                  <ErrorText>
                                    {rowErrorList[index]?.last_name}
                                  </ErrorText>
                                )}
                              </Box>
                            </Td>

                            <Td>
                              <Inputs
                                aria-label="E-mail"
                                id={"contactEmail"}
                                type="text"
                                value={row?.email}
                                onChange={(e) =>
                                  handleChange(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                onBlur={(e) =>
                                  handleBlur(
                                    index,
                                    e.target.name,
                                    e.target.value
                                  )
                                }
                                name="email"
                                fontSize="xs"
                                bg={index % 2 !== 0 ? "white" : "input.100"}
                                border={
                                  index % 2 !== 0
                                    ? "1px solid gray"
                                    : "input.100"
                                }
                                // error={
                                //   rowErrorList[index]?.email?.length > 2
                                //     ? rowErrorList[index]?.email
                                //     : ""
                                // }
                              />

                              <Box h="2rem" w="5rem" mt="2">
                                {rowErrorList[index]?.email?.length > 2 && (
                                  <ErrorText>
                                    {rowErrorList[index]?.email}
                                  </ErrorText>
                                )}
                              </Box>
                            </Td>

                            <Td>
                              <SingleSelect2
                                aria-label="Role"
                                value={row?.role}
                                optionsProps={rolesDropDown}
                                displayKey={"label"}
                                optionValue={"value"}
                                bg={index % 2 !== 0 ? "white" : "head2"}
                                border={
                                  index % 2 !== 0
                                    ? "1px solid gray"
                                    : "input.100"
                                }
                                name="role"
                                onChange={(e) =>
                                  handleRoleChange(index, e.target.value)
                                }
                                placeholder="Select"
                              />

                              <Box h="2rem" w="5rem" mt="2">
                                {rowErrorList[index]?.role?.length > 2 && (
                                  <ErrorText>
                                    {rowErrorList[index]?.["role"]}
                                  </ErrorText>
                                )}
                              </Box>
                            </Td>

                            <Td>
                              {/* <Select
                                aria-label="Organization"
                                name="organization"
                                borderColor=""
                                textStyle={"p"}
                                rounded="md"
                                size="sm"
                                bg={index % 2 !== 0 ? "white" : "head2"}
                                border={
                                  index % 2 !== 0
                                    ? "1px solid gray"
                                    : "input.100"
                                }
                                value={row?.organization}
                                onChange={(e) =>
                                  handleOrgChange(index, e.target.value)
                                }
                                w={{ base: "100%", md: "90%", lg: "90%" }}
                              >
                                <option value="">Select Organization</option>

                                {organizationList?.length > 0
                                  ? organizationList?.map(
                                      (each, indexValue) =>
                                        index === indexValue &&
                                        each?.listItmes?.length > 0 &&
                                        each?.listItmes?.map((item) => (
                                          <option value={item?.uuid}>
                                            {item[optionsList[row?.role]]}
                                          </option>
                                        ))
                                    )
                                  : null}
                              </Select> */}

                              <ChakraSelect
                                id={`organisationlist+${1}`}
                                placeholder="Select"
                                // label={""}
                                name="organization"
                                onInputChange={(e) =>
                                  handleInputChange(e, row?.role, index)
                                }
                                onChange={(e) => onhandleChange(e, index)}
                                value={organizationList?.[index]}
                                options={organisationOptionsList}
                                mb="0.4px"
                                overflow="scroll"
                              />

                              <Box h="2rem" w="5rem" mt="2">
                                {rowErrorList[index]?.organization?.length >
                                  2 && (
                                  <ErrorText>
                                    {rowErrorList[index]?.["organization"]}
                                  </ErrorText>
                                )}
                              </Box>
                            </Td>

                            <Td>
                              <Box textAlign={"center"} mt="-1.8rem">
                                <DeleteIcon
                                  aria-label="Delete"
                                  onClick={() => tableRowRemove(index)}
                                  cursor="pointer"
                                  color={"red"}
                                />
                              </Box>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>

                  <Box
                    mt={{ base: "-10px", md: "0", lg: "0" }}
                    cursor={"pointer"}
                    role="button"
                    display={"flex"}
                    gap="2"
                    p="4"
                  >
                    <Text color="black" onClick={addRowTable}>
                      <SubHeading>Add Row</SubHeading>
                    </Text>
                    <AddIcon
                      onClick={addRowTable}
                      background="#0081c8"
                      color="white"
                      marginBottom="0.1rem"
                      borderRadius="2rem"
                      fontSize="1.1rem"
                      p={"0.3rem"}
                    />
                  </Box>

                  <Center>
                    <Flex gap="6">
                      <NegativeButton
                        text="Cancel"
                        onClick={handleCloseModal}
                      />
                      <PositiveButton
                        type="submit"
                        text="Save"
                        isLoading={loading}
                        onClick={AddContactsData}
                      />
                    </Flex>
                  </Center>
                </Box>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};

export default AddNewContacts;
