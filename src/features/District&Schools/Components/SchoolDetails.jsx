import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { IoIosAddCircle } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getUserData,
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";

import { FaRegEdit } from "react-icons/fa";
import { getStatesList } from "../../../DistrictAdminApis/districtAdminSlice";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NavbarCardIcon from "../../../components/FitnessComponents/FitnessTexts/NavbarCardIcon";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { getRemovedSchool } from "../../../store/slices/superAdminSlice/superAdminSlice";
import {
  getRemoveSchoolAdminFromSchool,
  getSchoolWithSchoolAdmin,
  getUpdateSchool,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { schoolData } from "../Config";
import AddSchoolAdministrator from "./AddSchoolAdministrator";
import SchoolFields from "./SchoolFields";

const SchoolDetails = () => {
  const {
    details,
    superAdminFields,
    positiveBtnText,
    negativeBtnText,
    administrators,
  } = schoolData;

  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schoolUuid = params.schoolId;

  const getSchoolWithSchoolAdminData = useSelector(
    (state) => state?.schoolAdmin?.SchoolWithSchoolAdmin
  );
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const loading = useSelector((state) => state?.profile?.upLoading);

  const role = useSelector((state) => state?.profile?.selectedRole);
  const userId = useSelector((state) => state.profile.userId);
  const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);
  const code = useSelector((state) => state.profile.code);

  const token = useSelector((state) => state.profile.token);
  const statesList = useSelector((state) => state?.districtAdmin?.statesList);
  const previousPath = useSelector((state) => state.profile.previousPath);

  const [addAdminModal, setAddAdminModal] = useState(false);
  const [dataSet, setDataSet] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputs, setInputs] = useState({});

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteSchoolPopUp, setDeleteSchoolPopUp] = useState(false);

  const [selectedUser, setSelectedUser] = useState("");

  const [selectedRole, setSelectedRole] = useState(role);

  const onClickToSave = (event) => {
    event.preventDefault();

    if (Object.keys(errors)?.length === 0) {
      dispatch(getUpdateSchool({ token, inputs, schoolId: schoolUuid }));
    }
  };

  const onClickToBack = () => {
    if (selectedRole === "superAdmin") {
      navigate(
        `/role/superAdmin/Districts/DistrictDetails/${getSchoolWithSchoolAdminData?.district_uuid}`
      );
    } else {
      navigate(`/role/${selectedRole}/schools`);
    }
    dispatch(setPreviousPath(null));
    // setDisable(false);
  };

  const handleDeleteSchool = () => {
    dispatch(
      setPreviousPath(
        `/role/SuperAdmin/Districts/DistrictDetails/${getSchoolWithSchoolAdminData?.district_uuid}`
      )
    );

    let body = {
      updated_by: userId,
      updater_role: selectedRole,
    };
    dispatch(
      getRemovedSchool({
        uuid: params?.schoolId,
        token: token,
        body: body,
      })
    );
  };

  const handleEdit = (schoolAdminId) => {
    dispatch(getUserData({ id: schoolAdminId, token }));

    dispatch(
      setManageUser({
        formTitle: `Edit School Administrator`,
        userType: "schoolAdmin",
        // previousPath: location.pathname,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${selectedRole}/edit/schoolAdmin/${schoolAdminId}`);
  };

  const handleDelete = (uuid) => {
    const finalPayload = {
      user_uuid: selectedUser,
      updater_role: selectedRole,
      updated_by: userId,
    };

    dispatch(
      getRemoveSchoolAdminFromSchool({
        token,
        schoolId: schoolUuid,
        finalPayload,
      })
    );
  };

  const clickToNavigate = (item) => {
    const formTitle = "Request to Add School Administrator";
    dispatch(
      setManageUser({
        formTitle,
        userType: "schoolAdmin",
        // previousPath: location.pathname,
      })
    );

    dispatch(setPreviousPath(location.pathname));
    navigate(`/role/${selectedRole}/AddUser`);
    dispatch(setGreenLitePath(location.pathname));
  };

  useEffect(() => {
    if (selectedRole === "superAdmin") {
      setInputs({
        school_name: getSchoolWithSchoolAdminData?.school_name,
        school_id: getSchoolWithSchoolAdminData?.school_id,
        address_1: getSchoolWithSchoolAdminData?.address_1,
        phone_1: getSchoolWithSchoolAdminData?.phone_1,
        local_identifier: getSchoolWithSchoolAdminData?.local_identifier,
        address_2: getSchoolWithSchoolAdminData?.address_2,
        phone_2: getSchoolWithSchoolAdminData?.phone_2,
        sso_id: getSchoolWithSchoolAdminData?.sso_id,
        city: getSchoolWithSchoolAdminData?.city,
        zipcode: getSchoolWithSchoolAdminData?.zipcode,
        email: getSchoolWithSchoolAdminData?.email,
        state: getSchoolWithSchoolAdminData?.state,
        updated_by: userId,
      });
    } else {
      setInputs({
        school_name: getSchoolWithSchoolAdminData?.school_name,
        address_1: getSchoolWithSchoolAdminData?.address_1,
        phone_1: getSchoolWithSchoolAdminData?.phone_1,
        local_identifier: getSchoolWithSchoolAdminData?.local_identifier,
        address_2: getSchoolWithSchoolAdminData?.address_2,
        phone_2: getSchoolWithSchoolAdminData?.phone_2,
        sso_id: getSchoolWithSchoolAdminData?.sso_id,
        city: getSchoolWithSchoolAdminData?.city,
        zipcode: getSchoolWithSchoolAdminData?.zipcode,
        email: getSchoolWithSchoolAdminData?.email,
        state: getSchoolWithSchoolAdminData?.state,
        updated_by: userId,
      });
    }
  }, [getSchoolWithSchoolAdminData]);

  useEffect(() => {
    schoolUuid &&
      dispatch(getSchoolWithSchoolAdmin({ schoolId: schoolUuid, token }));
  }, []);

  useEffect(() => {
    if (code === 200) {
      dispatch(getSchoolWithSchoolAdmin({ schoolId: schoolUuid, token }));
    }
  }, [code]);
  useEffect(() => {
    !statesList?.length && dispatch(getStatesList({ token }));
    if (selectedRole === "superAdmin" && !duplicateRole) {
      setDataSet(superAdminFields);
    } else {
      setDataSet(details);
    }
  }, []);

  useEffect(() => {
    if (token) {
      duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
    }
  }, [token]);
  return (
    <>
      <Flex direction="column" gap="4">
        <Flex alignItems="center">
          <Heading1>
            {getSchoolWithSchoolAdminData &&
              getSchoolWithSchoolAdminData?.school_name}
          </Heading1>
          <Spacer />
          {selectedRole === "superAdmin" && !duplicateRole ? (
            <>
              <Flex
                direction={{ base: "column", md: "row" }}
                justifyContent={{ base: "flex-start" }}
                alignItems={{ base: "flex-end" }}
                gap={{ base: "1", md: "4", lg: "5" }}
              >
                {selectedRole === "superAdmin" && !duplicateRole && (
                  <HStack
                    role="button"
                    onClick={() => {
                      setDeleteSchoolPopUp(true);
                    }}
                    cursor="pointer"
                  >
                    <Box textDecoration={"underline"}>
                      <TextIcon
                        text="Delete"
                        icon={RiDeleteBin6Line}
                        changeIconColor="red"
                        increaseTextSize="increaseTextSize"
                      />
                    </Box>
                  </HStack>
                )}

                <AddSchoolAdministrator />
              </Flex>
            </>
          ) : (
            <>
              {selectedRole !== "schoolAdmin" ? (
                <AddSchoolAdministrator />
              ) : (
                <Flex mt="5">
                  <Button
                    role="button"
                    textDecoration="underline"
                    onClick={clickToNavigate}
                  >
                    Request a new user
                  </Button>
                  <Box marginTop={2}>
                    <IoIosAddCircle size={25} fill={"#0081c8"} />
                  </Box>
                </Flex>
              )}
            </>
          )}
        </Flex>

        <form onSubmit={onClickToSave}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={"2"}
            h="auto"
            pb="1rem"
          >
            <SchoolFields
              dataSet={dataSet}
              inputs={inputs}
              
              setInputs={setInputs}
              errors={errors}
              setErrors={setErrors}
            />
            <GridItem h="auto">
              <Flex direction="column">
                <Paragraph2>{administrators}:</Paragraph2>
                {selectedRole != "schoolAdmin" ? (
                  getSchoolWithSchoolAdminData?.AdminSchool?.length ? (
                    getSchoolWithSchoolAdminData?.AdminSchool?.map(
                      (item, index) => {
                        return (
                          <Box
                            key={"a" + index}
                            display={"flex"}
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Box
                              role="button"
                              onClick={() => {
                                handleEdit(item.uuid);
                              }}
                              cursor="pointer"
                            >
                              <Box color="primary">
                                <Paragraph1 decreaseMarginTop="1">
                                  {`${item.last_name}, ${item.first_name}`}
                                </Paragraph1>
                              </Box>
                            </Box>

                            <Flex gap="2">
                              <HStack
                                role="button"
                                onClick={() => {
                                  handleEdit(item.uuid);
                                }}
                                cursor="pointer"
                                alignItems="center"
                              >
                                <Box mt="0.5">
                                  <Heading8>Edit</Heading8>
                                </Box>

                                <NavbarCardIcon
                                  elementIcon={FaRegEdit}
                                  changeIconColor={"primary"}
                                />
                              </HStack>
                              <HStack
                                role="button"
                                onClick={
                                  () => {
                                    setSelectedUser(item.uuid);
                                    setDeletePopUp(true);
                                  }
                                  // handleDelete(item.uuid)
                                }
                                cursor="pointer"
                              >
                                <Box mt="0.5">
                                  <Heading8>Delete</Heading8>
                                </Box>

                                <NavbarCardIcon
                                  elementIcon={RiDeleteBin6Line}
                                  changeIconColor={"red"}
                                />
                              </HStack>
                            </Flex>
                          </Box>
                        );
                      }
                    )
                  ) : (
                    <>
                      <Paragraph1>No Administrators Found</Paragraph1>
                    </>
                  )
                ) : (
                  getSchoolWithSchoolAdminData?.AdminSchool?.map(
                    (item, key) => (
                      <Box color="primary" key={"ab" + key}>
                        <Paragraph1>
                          {`${item?.last_name}, ${item?.first_name}`}
                        </Paragraph1>
                      </Box>
                    )
                  )
                )}
              </Flex>
            </GridItem>
          </Grid>
          <Flex justifyContent={"center"} justify={"space-between"} gap="5">
            <NegativeButton
              text={negativeBtnText}
              onClick={() => onClickToBack()}
            />
            {selectedRole !== "stateAdmin" ? (
              rolesAndPrevilegesObject?.["Manage District and Schools"]?.edit ??
              true ? (
                <PositiveButton
                  type="submit"
                  text={positiveBtnText}
                  // onClick={onClickToSave}
                  isLoading={loading}
                />
              ) : (
                <PositiveButton text={positiveBtnText} isDisabled={true} />
              )
            ) : (
              <PositiveButton text={positiveBtnText} isDisabled={true} />
            )}
          </Flex>
        </form>
      </Flex>
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the User?"}
          onClick={handleDelete}
        />
      )}{" "}
      {deleteSchoolPopUp && (
        <DeletePopUp
          setDeletePopUp={setDeleteSchoolPopUp}
          deletePopUp={deleteSchoolPopUp}
          text={"Are you sure you want to delete the school?"}
          onClick={handleDeleteSchool}
        />
      )}{" "}
    </>
  );
};

export default SchoolDetails;
