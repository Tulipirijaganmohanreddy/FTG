import { Box, Flex, Grid, GridItem, HStack, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { districtData } from "../Config";

import { FaRegEdit } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  getStatesList,
  getUpdateDistrictForDistrictAdminApiCall,
} from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NavbarCardIcon from "../../../components/FitnessComponents/FitnessTexts/NavbarCardIcon";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import NegativeButton from "../../../components/NegativeButton";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getDeletedDistrict,
  getDistrictsAdminById,
  getUpdateDistrict,
  setAddSchoolRequirements,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { getRemoveAdminFromDistrict } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import AddDistrictAdminPopUp from "./AddDistrictAdminPopUp";
import DistrictFields from "./DistrictFields";
import AutoPromote from '../../../components/AutoPromote';

const DistrictDetails = () => {
  const { title, details, administrators, superAdminDistrictDetails } =
    districtData;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const userId = useSelector(
    (state) => state?.profile?.loggedInUserDetails?.district_uuid
  );

  const loading = useSelector((state) => state.districtAdmin.loading);

  const token = useSelector((state) => state?.profile?.token);
  const statesList = useSelector((state) => state?.districtAdmin?.statesList);
  const userRole = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const userID = useSelector((state) => state?.profile?.userId);

  const code = useSelector((state) => state.profile.code);

  const isLoading = useSelector((state) => state.profile.upLoading);

  const districtForDistrictAdmin = useSelector(
    (state) => state?.districtAdmin?.getDistrictForDistrictAdminResponse
  );

  const districtAdmins = districtForDistrictAdmin?.AdminDistrict;

  const [errors, setErrors] = useState({});
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [deleteDistrictPopUp, setDeleteDistrictPopUp] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");

  const [distcrictForm, setDistcrictForm] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();
    const requiredKeys = [
      "district_name",
      "state",
      "zipcode",
      "school_start_date",
    ];
    const validationPayload = {};
    requiredKeys.forEach(
      (key) => (validationPayload[key] = distcrictForm[key])
    );
    const _errors = validateFormData(validationPayload);
    if (
      Object.keys(_errors)?.length === 0 &&
      Object.keys(errors)?.length === 0
    ) {
      if (userRole === "districtAdmin" || duplicateRole) {
        let finalObj = {
          ...distcrictForm,
          updater_role: userRole,
          updated_by: userID,
        };

        const UUID = districtForDistrictAdmin?.uuid;

        dispatch(
          getUpdateDistrictForDistrictAdminApiCall({
            body: finalObj,
            token,
            UUID,
          })
        );
      } else if (userRole === "superAdmin") {
        dispatch(getUpdateDistrict({ body: distcrictForm, token }));
      }
    } else {
      setErrors((prevState) => ({
        ...prevState,
        ..._errors,
      }))
    }
  };
  const clickToNavigate = (disAdminId) => {
    dispatch(
      setManageUser({
        formTitle: `Edit District Administrator`,
        userType: "districtAdmin",
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/districtAdmin/${disAdminId}`);
  };

  const handleDelete = (uuid) => {
    const finalPayload = {
      user_uuid: selectedUser,
      updater_role: userRole,
      updated_by: userID,
    };

    const districtUUID = districtForDistrictAdmin?.uuid;

    dispatch(getRemoveAdminFromDistrict({ token, districtUUID, finalPayload }));
  };
  const handleDistrictDelete = () => {
    dispatch(setPreviousPath("/role/SuperAdmin/Districts/DistrictLookup"));

    let body = {
      updated_by: userID,
      updater_role: userRole,
    };
    dispatch(
      getDeletedDistrict({
        uuid: params.districtId,
        body: body,
        token: token,
      })
    );
  };

  const handleAddAdmin = () => {
    dispatch(
      setManageUser({
        userType: "districtAdmin",
        formTitle: `Add District Administrator`,
        previousPath: location.pathname,
      })
    );

    navigate("/role/SuperAdmin/Districts/AddUser");
    dispatch(setPreviousPath(location.pathname));
  };
  useEffect(() => {
    dispatch(
      getDistrictsAdminById({
        districtId: params?.districtId ? params?.districtId : userId,
        token: token,
      })
    );

    return () => {
      dispatch(setAddSchoolRequirements());
    };
  }, []);

  useEffect(() => {
    if (code === 200) {
      dispatch(
        getDistrictsAdminById({
          districtId: params?.districtId ? params?.districtId : userId,
          token: token,
        })
      );
    }
  }, [code]);

  useEffect(() => {
    !statesList?.length && dispatch(getStatesList({ token }));

    if (userRole === "superAdmin") {
      let districtFormCopy = { ...distcrictForm };

      setDistcrictForm({
        ...districtFormCopy,
        district_name: districtForDistrictAdmin?.district_name,
        email: districtForDistrictAdmin?.email || "",
        district_sso_id: districtForDistrictAdmin?.district_sso_id || "",
        phone_1: districtForDistrictAdmin?.phone_1 || "",
        phone_2: districtForDistrictAdmin?.phone_2 || "",
        address_1: districtForDistrictAdmin?.address_1 || "",
        address_2: districtForDistrictAdmin?.address_2 || "",
        zipcode: districtForDistrictAdmin?.zipcode || "",
        state: districtForDistrictAdmin?.state || "",
        city: districtForDistrictAdmin?.city || "",
        internal_id: districtForDistrictAdmin?.internal_id || "",
        local_identifier: districtForDistrictAdmin?.local_identifier || "",
        sso_user_id_property:
          districtForDistrictAdmin?.sso_user_id_property || "",
        sso_identify_field: districtForDistrictAdmin?.sso_identify_field || "",
        sso_id: districtForDistrictAdmin?.sso_id || "",
        school_start_date: districtForDistrictAdmin?.school_start_date || "",
        updater_role: userRole,
        updated_by: userID,
        uuid: params?.districtId,
        sis_vendor: districtForDistrictAdmin?.sis_vendor || "",
      });
    } else {
      setDistcrictForm({
        district_name: districtForDistrictAdmin?.district_name,
        local_identifier: districtForDistrictAdmin?.local_identifier || "",
        sso_id: districtForDistrictAdmin?.sso_id || "",

        district_sso_id: districtForDistrictAdmin?.district_sso_id || "",
        email: districtForDistrictAdmin?.email || "",
        phone_1: districtForDistrictAdmin?.phone_1 || "",
        phone_2: districtForDistrictAdmin?.phone_2 || "",
        address_1: districtForDistrictAdmin?.address_1 || "",
        address_2: districtForDistrictAdmin?.address_2 || "",

        city: districtForDistrictAdmin?.city || "",

        state: districtForDistrictAdmin?.state || "",

        zipcode: districtForDistrictAdmin?.zipcode || "",
        school_start_date: districtForDistrictAdmin?.school_start_date || "",

        sis_vendor: districtForDistrictAdmin?.sis_vendor || "",
      });
    }
    dispatch(
      setAddSchoolRequirements({
        state: districtForDistrictAdmin?.state,
        zipcode: districtForDistrictAdmin?.zipcode,
        district_uuid: districtForDistrictAdmin?.uuid,
      })
    );
  }, [districtForDistrictAdmin]);

  return (
    <>
      <Flex direction="column" gap="2">
        <Flex justifyContent="space-between" alignItems="center">
          <Heading1>{districtForDistrictAdmin?.district_name}</Heading1>

          <Spacer />
          {userRole === "districtAdmin" || duplicateRole ? <AutoPromote/> : null}
          
          {userRole === "superAdmin" ? (
            <Flex
              direction={{ base: "column", md: "row" }}
              justifyContent={{ base: "flex-end" }}
              alignItems={{ base: "flex-end" }}
              gap={{ base: "1", md: "4", lg: "10" }}
            >
              {userRole === "superAdmin" && !duplicateRole ? (
                <>
                  <HStack
                    role="button"
                    onClick={() => {
                      setDeleteDistrictPopUp(true);
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
                  <AddDistrictAdminPopUp
                    district_name={districtForDistrictAdmin?.district_name}
                  />
                </>
              ) : (
                <Box role="button">
                  <TextIcon
                    text="Add Administrator"
                    icon={MdAddCircle}
                    onClick={handleAddAdmin}
                    increaseTextSize="increaseTextSize"
                  />
                </Box>
              )}
            </Flex>
          ) : (
            <>
              <Box
                role="button"
                onClick={() => {
                  dispatch(
                    setManageUser({
                      formTitle: `Add District Administrator`,
                      userType: "districtAdmin",
                    })
                  );
                  dispatch(setPreviousPath(location.pathname));

                  navigate(`/role/${userRole}/AddUser`);
                }}
                display={{ md: "block", lg: "block", base: "none" }}
              >
                <TextIcon
                  text={"Add Administrator"}
                  icon={MdAddCircle}
                  increaseTextSize="increaseTextSize"
                />
              </Box>
              <HStack
                role="'button"
                display={{ md: "none", lg: "none", base: "flex" }}
                onClick={() => {
                  dispatch(
                    setManageUser({
                      formTitle: `Add District Administrator`,
                      userType: "districtAdmin",
                    })
                  );
                  dispatch(setPreviousPath(location.pathname));

                  navigate(`/role/${userRole}/AddUser`);
                }}
              >
                <Box color="black" onClick={() => setAddClassModal(true)}>
                  <TextIcon
                    text={"Add Administrator"}
                    icon={MdAddCircle}
                    increaseTextSize="increaseTextSize"
                  />
                </Box>
              </HStack>
            </>
          )}
        </Flex>
        <form onSubmit={handleSubmit}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(2, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            mt={{ base: "1", lg: "4" }}
            gap={{ base: "2", md: "5", lg: "3" }}
            h="auto"
            // pb="2rem"
          >
            <DistrictFields
              data={
                userRole === "superAdmin" && !duplicateRole
                  ? superAdminDistrictDetails
                  : details
              }
              distcrictForm={distcrictForm}
              setDistcrictForm={setDistcrictForm}
              errors={errors}
              setErrors={setErrors}
            />
            <GridItem h="auto">
              <Flex direction="column">
                <Paragraph2>{administrators}:</Paragraph2>
                {districtAdmins?.length ? (
                  districtAdmins?.map((admin, index) => {
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
                            clickToNavigate(admin.uuid);
                          }}
                          cursor="pointer"
                        >
                          <Box color="primary">
                            <Paragraph1 decreaseMarginTop="1">
                              {admin.last_name}, {admin.first_name}
                            </Paragraph1>
                          </Box>
                        </Box>

                        <Flex  gap="2">
                          <HStack
                            role="button"
                            onClick={() => {
                              clickToNavigate(admin.uuid);
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
                            onClick={() => {
                              setSelectedUser(admin.uuid);

                              setDeletePopUp(true);
                            }}
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
                  })
                ) : (
                  <>
                    <Paragraph1>No Administrators Found</Paragraph1>
                  </>
                )}
              </Flex>
            </GridItem>
          </Grid>
          <Flex
            justify="center"
            width={"full"}
            mt={{ base: "2", md: "4", lg: "2" }}
            gap="8"
          >
            <Box
              onClick={() => {
                if (userRole !== "superAdmin" || duplicateRole) {
                  navigate(`/role/${userRole}/system-admin`);
                } else {
                  navigate("/role/SuperAdmin/Districts/DistrictLookup");
                }
              }}
            >
              <NegativeButton text={"Cancel"} isLoading={loading} />
            </Box>
            <PositiveButton text={"Save"} type="submit" isLoading={isLoading} />
          </Flex>
        </form>
        {deletePopUp && (
          <DeletePopUp
            setDeletePopUp={setDeletePopUp}
            deletePopUp={deletePopUp}
            text={"Are you sure you want to delete the user?"}
            onClick={handleDelete}
          />
        )}
        {deleteDistrictPopUp && (
          <DeletePopUp
            setDeletePopUp={setDeleteDistrictPopUp}
            deletePopUp={deleteDistrictPopUp}
            text={"Are you sure you want to delete the district?"}
            onClick={handleDistrictDelete}
          />
        )}{" "}
      </Flex>
    </>
  );
};

export default DistrictDetails;
