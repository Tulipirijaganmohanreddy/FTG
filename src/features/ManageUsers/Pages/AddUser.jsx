import { Button, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BasicUserInfoDistrictAdmin from "../Components/BasicUserInfoDistrictAdmin";
import BasicUserInfohelpDesk from "../Components/BasicUserInfoHelpDesk";
import BasicUserInfoSchoolAdmin from "../Components/BasicUserInfoSchoolAdmin";
import BasicUserInfoStudent from "../Components/BasicUserInfoStudent";
import BasicUserInfoSuperAdmin from "../Components/BasicUserInfoSuperAdmin";
import BasicUserInfoTeacher from "../Components/BasicUserInfoTeacher";
import ManageUserAssignments from "../Components/ManageUserAssignments";
import { addUserData } from "../Config";

import { useLocation, useParams } from "react-router-dom";
import { getStatesList } from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import { getUserData, setUserData } from "../../../store/slices/profileSlice";
import { setUniqueFields } from "../../../store/slices/superAdminSlice/superAdminSlice";
import BasicUserInfoPartner from "../Components/BasicUserInfoPartner";
import BasicUserInfoStateAdmin from "../Components/BasicUserInfoStateAdmin";

const RACE_OPTIONS = [
  { value: "White", label: "White" },
  {
    value: "Black or African American",
    label: "Black or African American",
  },
  {
    value: "American Indian or Alaska Native",
    label: "American Indian or Alaska Native",
  },
  { value: "Asian", label: "Asian" },
  {
    value: "Native Hawailian or Other Pacific",
    label: "Native Hawailian or Other Pacific",
  },
  { value: "Others", label: "Others" },
];

const AddUser = () => {
  const { buttonsList } = addUserData;

  const dispatch = useDispatch();
  const params = useParams();

  const location = useLocation();

  const token = useSelector((state) => state.profile.token);

  const manageUsers = useSelector((state) => state.profile.manageUser);
  const role = useSelector((state) => state?.profile?.selectedRole);

  const getStateUUID = useSelector((state) => state?.superAdmin?.stateId);
  const getStateName = useSelector((state) => state?.superAdmin?.stateName);
  const manageUser = useSelector((state) => state.profile.manageUser);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const { userType, formTitle } = manageUsers;

  const userData = useSelector((state) => state?.profile?.UserData);

  const getUser = useSelector((state) => state?.profile.loggedInUserDetails);

  //get school id for adding school admin to school ---- superAdmin
  const getSchoolDataBySchoolID = useSelector(
    (state) => state?.superAdmin?.schoolBySchoolId?.uuid
  );

  const uniqueFieldsError = useSelector(
    (state) => state?.superAdmin?.uniqueFieldsResponse
  );

  const statesList = useSelector((state) => state?.districtAdmin.statesList);

  const districtInfo = useSelector(
    (state) => state?.districtAdmin?.getDistrictForDistrictAdminResponse
  );

  const [selectedRole, setSelectedRole] = useState(role);

  const handleDistrictAdminState = () => {
    if (selectedRole === "superAdmin") {
      return districtInfo?.state;
    }
    return getUser?.state;

    // if (selectedRole === "superAdmin") {
    // 	if (duplicateRole) {
    // 		return getUser?.state;
    // 	}

    // 	return districtInfo?.state;
    // }
    // return getUser?.state;
  };

  const handleRoles = () => {
    if (
      selectedRole === "superAdmin" &&
      manageUser.userType === "districtAdmin"
    ) {
      return { school_admin_role: false, teacher_role: false };
    } else if (
      selectedRole === "superAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return { district_admin_role: false, teacher_role: false };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "districtAdmin"
    ) {
      return { school_admin_role: false, teacher_role: false };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return { district_admin_role: false, teacher_role: false };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return { district_admin_role: false, school_admin_role: false };
    } else if (
      selectedRole === "schoolAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return { teacher_role: false };
    } else if (
      selectedRole === "schoolAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return { school_admin_role: false };
    } else if (
      selectedRole === "teacher" &&
      manageUser.userType === "teacher"
    ) {
      return {};
    }
  };

  const handleEditRoles = () => {
    if (
      selectedRole === "superAdmin" &&
      manageUser.userType === "districtAdmin"
    ) {
      return {
        school_admin_role: userData?.school_admin_role,
        teacher_role: userData?.teacher_role,
      };
    } else if (
      selectedRole === "superAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return {
        district_admin_role: userData?.district_admin_role,
        teacher_role: userData?.teacher_role,
      };
    } else if (
      selectedRole === "superAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return {
        district_admin_role: userData?.district_admin_role,
        school_admin_role: userData?.school_admin_role,
      };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "districtAdmin"
    ) {
      return {
        school_admin_role: userData?.school_admin_role,
        teacher_role: userData?.teacher_role,
      };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return {
        district_admin_role: userData?.district_admin_role,
        teacher_role: userData?.teacher_role,
      };
    } else if (
      selectedRole === "districtAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return {
        district_admin_role: userData?.district_admin_role,
        school_admin_role: userData?.school_admin_role,
      };
    } else if (
      selectedRole === "schoolAdmin" &&
      manageUser.userType === "schoolAdmin"
    ) {
      return { teacher_role: userData?.teacher_role };
    } else if (
      selectedRole === "schoolAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return { school_admin_role: userData?.school_admin_role };
    } else if (
      selectedRole === "teacher" &&
      manageUser.userType === "teacher"
    ) {
      return {};
    }
  };

  const editUserDetails = {
    teacher: {
      user_id: userData?.user_id,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      user_name: userData?.user_name,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      password: "*********",
      re_enter_password: "*********",

      login_status: userData?.login_status,
      teacher_role: userData?.teacher_role,
      ...handleEditRoles(),
      state: userData?.state,
      phone: userData?.phone,
      nick_name: userData?.nick_name,
    },
    schoolAdmin: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      user_name: userData?.user_name,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      password: "*********",
      re_enter_password: "*********",
      user_id: userData?.user_id,
      login_status: userData?.login_status,
      school_admin_role: userData?.school_admin_role,
      ...handleEditRoles(),
      state: userData?.state,
      phone: userData?.phone,
      nick_name: userData?.nick_name,
    },
    student: {
      student_id: userData?.student_id,
      first_name: userData?.first_name,
      grade: ["K", "k", "KG", "kg", "Kg", "kG"].includes(userData?.grade)
        ? "K"
        : userData?.grade,
      email: userData?.email,
      user_name: userData?.user_name,
      last_name: userData?.last_name,
      date_of_birth: userData?.date_of_birth,
      parent_email_1: userData?.parent_email_1,
      password: "*********",
      re_enter_password: "*********",
      middle_initial: userData?.middle_initial,
      race: userData?.race,
      parent_email_2: userData?.parent_email_2,
      gender: userData?.gender,
      ethnicity: userData?.ethnicity,
      phone: userData?.phone,
      login_status: userData?.login_status,
      print_body_composition: userData?.print_body_composition,
      print_reports_in_spanish: userData?.print_reports_in_spanish,
      permanently_exempt: userData?.permanently_exempt,
      student_role: userData?.student_role,
      state: userData?.state,
      nick_name: userData?.nick_name,
    },
    districtAdmin: {
      user_id: userData?.user_id,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      user_name: userData?.user_name,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      password: "*********",
      re_enter_password: "*********",
      phone: userData?.phone,
      login_status: userData?.login_status,
      district_admin_role: userData?.district_admin_role,
      ...handleEditRoles(),
      role: userData?.role?.[0],
      state: userData?.state,
      sso_id: userData?.sso_id,
      nick_name: userData?.nick_name,
    },

    stateAdmin: {
      state: location.state?.state_code,
      user_id: userData?.user_id,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      user_name: userData?.user_name,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      password: "*********",
      re_enter_password: "*********",
      login_status: userData?.login_status,
      state_uuid: params?.id,

      // role: userData?.role?.[0],
      state_admin_role: userData?.state_admin_role,
      nick_name: userData?.nick_name,
      // school_admin_role: false,
      // teacher_role: false,
    },
    partner: {
      state: location.state?.state_code,
      user_id: userData?.user_id,
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      user_name: userData?.user_name,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      password: "*********",
      re_enter_password: "*********",
      login_status: userData?.login_status,
      state_uuid: params?.id,

      // role: userData?.role?.[0],
      partner_role: userData?.partner_role,
      nick_name: userData?.nick_name,
      // school_admin_role: false,
      // teacher_role: false,
    },
    admin: {
      user_name: userData?.user_name,
      password: "*********",
      re_enter_password: "*********",

      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      phone: userData?.phone,
      district_administrator_role: userData?.district_administrator_role,
      // state_administrator_role: userData?.state_administrator_role,
      teacher_role: userData?.teacher_role,
      login_status: userData?.login_status,
      super_admin_role: userData?.super_admin_role,
      nick_name: userData?.nick_name,
      //check admin for superadmin role
    },
    helpdesk: {
      user_name: userData?.user_name,
      password: "*********",
      re_enter_password: "*********",

      first_name: userData?.first_name,
      last_name: userData?.last_name,
      middle_initial: userData?.middle_initial,
      email: userData?.email,
      email_1: userData?.email_1,
      email_2: userData?.email_2,
      phone: userData?.phone,
      district_administrator_role: userData?.district_administrator_role,
      // state_administrator_role: userData?.state_administrator_role,
      teacher_role: userData?.teacher_role,
      login_status: userData?.login_status,
      help_desk_role: userData?.help_desk_role,
      nick_name: userData?.nick_name,
    },
  };

  const fullObjDetails = {
    teacher: {
      user_id: "",
      first_name: "",
      last_name: "",
      middle_initial: "",
      nick_name: "",
      user_name: "",
      email: "",
      email_1: "",
      email_2: "",
      phone: "",
      password: "",
      re_enter_password: "",
      login_status: "1",
      teacher_role: true,
      ...handleRoles(),
      state: handleDistrictAdminState(),
    },
    schoolAdmin: {
      user_id: "",
      first_name: "",
      last_name: "",
      nick_name: "",
      middle_initial: "",
      user_name: "",
      email: "",
      email_1: "",
      email_2: "",
      password: "",
      re_enter_password: "",
      phone: "",
      login_status: "1",
      ...handleRoles(),
      school_admin_role: true,
      state: handleDistrictAdminState(),
    },

    districtAdmin: {
      user_id: "",
      first_name: "",
      last_name: "",
      middle_initial: "",
      nick_name: "",
      user_name: "",
      email: "",
      email_1: "",
      email_2: "",
      password: "",
      re_enter_password: "",
      login_status: "1",
      ...handleRoles(),
      district_admin_role: true,
      state: handleDistrictAdminState(),
      sso_id: "",
    },

    student: {
      student_id: "",
      first_name: "",
      grade: "",
      email: "",
      user_name: "",
      last_name: "",
      nick_name: "",
      date_of_birth: "",
      parent_email_1: "",
      password: "",
      re_enter_password: "",
      middle_initial: "",
      race: [],
      parent_email_2: "",
      gender: "",
      ethnicity: "",
      phone: "",
      login_status: "1",
      print_body_composition: true,
      print_reports_in_spanish: false,
      permanently_exempt: false,
      student_role: true,
      state: getUser?.state,
    },

    stateAdmin: {
      user_id: "",
      first_name: "",
      last_name: "",
      middle_initial: "",
      nick_name: "",
      user_name: "",
      re_enter_password: "",
      email: "",
      email_1: "",
      email_2: "",
      password: "",
      login_status: "1",
      state_admin_role: true,
      school_admin_role: false,
      teacher_role: false,
      state_uuid: [location?.state?.state_uuid],
      state: location.state?.state_code,
    },
    partner: {
      user_id: "",
      first_name: "",
      last_name: "",
      middle_initial: "",
      nick_name: "",
      re_enter_password: "",
      user_name: "",
      email: "",
      email_1: "",
      email_2: "",
      password: "",
      login_status: "1",
      partner_role: true,
      teacher_role: false,
      state_uuid: [location?.state?.state_uuid],
      state: location.state?.state_code,
    },
    admin: {
      user_name: "",
      password: "",
      first_name: "",
      last_name: "",
      nick_name: "",
      middle_initial: "",
      re_enter_password: "",

      email: "",
      email_1: "",
      email_2: "",
      phone: "",
      teacher_role: false,
      district_administrator_role: false,
      super_admin_role: true,
      login_status: "1",
    },
    helpdesk: {
      user_name: "",
      password: "",
      re_enter_password: "",
      first_name: "",
      last_name: "",
      nick_name: "",
      middle_initial: "",
      email: "",
      email_1: "",
      email_2: "",
      phone: "",
      login_status: "1",
      teacher_role: false,
      district_administrator_role: false,
      help_desk_role: true,
    },
  };

  const [activeTab, setActiveTab] = useState(0);
  const [inputDetailsObj, setInputDetailsObj] = useState({});
  const [userAssignments, setUserAssignments] = useState([]);
  const [adminSchools, setAdminSchools] = useState([]);

  const [selectedRace, setSelectedRace] = useState([]);

  const [errors, setErrors] = useState({});

  const [uniqueErrors, setUniqueErrors] = useState({});

  const basicUserInfoObj = {
    teacher: (
      <BasicUserInfoTeacher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRace}
      />
    ),

    schoolAdmin: (
      <BasicUserInfoSchoolAdmin
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRace}
      />
    ),
    stateAdmin: (
      <BasicUserInfoStateAdmin
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
      />
    ),
    partner: (
      <BasicUserInfoPartner
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
      />
    ),
    districtAdmin: (
      <BasicUserInfoDistrictAdmin
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
      />
    ),
    student: (
      <BasicUserInfoStudent
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        selectedRace={selectedRace}
        setSelectedRace={setSelectedRace}
        errors={errors}
        setErrors={setErrors}
        uniqueErrors={uniqueErrors}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRace}
      />
    ),
    admin: (
      <BasicUserInfoSuperAdmin
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
      />
    ),
    helpdesk: (
      <BasicUserInfohelpDesk
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        inputDetailsObj={inputDetailsObj}
        setInputDetailsObj={setInputDetailsObj}
        errors={errors}
        setErrors={setErrors}
      />
    ),
  };

  useEffect(() => {
    if (params?.id) {
      setInputDetailsObj(editUserDetails[userType]);

      if (userType == "student" && userData?.race?.length) {
        let arr = RACE_OPTIONS.filter((race) => {
          let obj = null;
          userData?.race?.forEach((inputRace) => {
            if (inputRace == race.value) {
              obj = race;
            }
          });
          if (obj) {
            return obj;
          }
        });

        setSelectedRace(arr);
      }
      if (userType == "student" && userData?.UserSchool?.length) {
        setUserAssignments([...userData.UserSchool]);
      }

      if (userData?.schools?.length) {
        setAdminSchools([...userData.schools]);
      }

      if (userData?.teacher_schools?.length) {
        setUserAssignments([...userData.teacher_schools]);
      }
    }
  }, [userData]);

  useEffect(() => {
    setInputDetailsObj(fullObjDetails[userType]);
    if (location?.state?.assignment) {
      if (userType == "student" || userType == "teacher") {
        setUserAssignments([location?.state?.assignment]);
      } else if (userType == "schoolAdmin") {
        setAdminSchools([location?.state?.assignment]);
      }
    }

    return () => {
      dispatch(setUserData({}));
      // dispatch(setPreviousPath(""));
    };
  }, [selectedRole]);

  useEffect(() => {
    if (uniqueFieldsError) {
      const errorsCopy = { ...errors };
      const uniqueErrorsCopy = { ...uniqueErrors };

      if (uniqueFieldsError[Object.keys(uniqueFieldsError)[0]]) {
        setUniqueErrors((prevState) => ({
          ...prevState,
          ...uniqueFieldsError,
        }));
        return;
      }

      delete uniqueErrorsCopy[Object.keys(uniqueFieldsError)[0]];
      setUniqueErrors({ ...uniqueErrorsCopy });

      if (errorsCopy[Object.keys(uniqueFieldsError)[0]]?.includes("already")) {
        delete errorsCopy[Object.keys(uniqueFieldsError)[0]];
        setErrors({ ...errorsCopy });
      }
    }
  }, [uniqueFieldsError]);

  useEffect(() => {
    if (Object.keys(uniqueErrors)?.length) {
      setErrors((prevState) => ({ ...prevState, ...uniqueErrors }));
    }
  }, [uniqueErrors]);

  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
    !statesList?.length && dispatch(getStatesList({ token }));
    params?.id && dispatch(getUserData({ id: params?.id, token }));
    params?.id && setActiveTab(manageUser?.tab ? manageUser?.tab : 0);

    return () => {
      dispatch(setUniqueFields(null));
    };
  }, []);

  return (
    <Flex gap="4" direction="column">
      {/* <Text textStyle={"text"}>{formTitle}</Text> */}
      <Heading1>{formTitle}</Heading1>
      <Flex>
        {userType === "helpdesk" || userType === "admin"
          ? buttonsList?.map(
              (role, index) =>
                index === 0 && (
                  <Button
                    key={index}
                    color="white"
                    background={activeTab == index ? "primary" : "gray-1"}
                    rounded="full"
                    borderColor="gray"
                    w="15em"
                  >
                    <Text textStyle={"p"}>{role}</Text>
                  </Button>
                )
            )
          : buttonsList.map((role, index) => {
              return (
                <Button
                  key={index}
                  color={activeTab == index ? "white" : "black-2"}
                  background={activeTab == index ? "primary" : "gray-1"}
                  py="1"
                  borderLeftRadius={index == 0 && "full"}
                  borderRightRadius={index == buttonsList.length - 1 && "full"}
                  borderRightWidth={index != buttonsList.length - 1 && "1px"}
                  rounded="none"
                  borderColor="gray"
                  w="15em"
                  onClick={() => {
                    if (index === 1) {
                      if (userType === "student") {
                        const {
                          student_role,
                          permanently_exempt,
                          print_body_composition,
                          print_reports_in_spanish,
                          race,
                          ethnicity,
                          state,
                          gender,

                          ...payload
                        } = inputDetailsObj;

                        params?.id && delete payload["password"];
                        params?.id && delete payload["re_enter_password"];

                        const errorsObj = validateFormData(
                          payload,
                          manageUser?.userType
                        );
                        if (
                          inputDetailsObj["re_enter_password"] !==
                          inputDetailsObj["password"]
                        ) {
                          errorsObj["re_enter_password"] =
                            "Password and confirm password do not match";
                        } else {
                          let errorsCopy = errors;
                          delete errorsCopy["re_enter_password"];
                          setErrors(errorsCopy);
                        }

                        setErrors(errorsObj);

                        if (Object.keys(errorsObj).length === 0) {
                          setActiveTab(index);
                        }
                      }
                      if (userType === "teacher") {
                        const { teacher_role, state, ...payload } =
                          inputDetailsObj;
                        params?.id && delete payload["password"];

                        let errorObj = validateFormData(payload);
                        if (
                          inputDetailsObj["re_enter_password"] !==
                          inputDetailsObj["password"]
                        ) {
                          errorObj["re_enter_password"] =
                            "Password and confirm password do not match";
                        } else {
                          let errorsCopy = errors;
                          delete errorsCopy["re_enter_password"];
                          setErrors(errorsCopy);
                        }

                        setErrors({ ...errorObj });
                        if (Object.keys(errorObj).length === 0) {
                          setActiveTab(index);
                        }
                      }

                      if (userType === "districtAdmin") {
                        const {
                          district_admin_role,
                          teacher_role,
                          school_admin_role,
                          districts,
                          state,
                          role,

                          ...payload
                        } = inputDetailsObj;
                        params?.id && delete payload["password"];

                        let errorObj = validateFormData(payload);
                        if (
                          inputDetailsObj["re_enter_password"] !==
                          inputDetailsObj["password"]
                        ) {
                          errorObj["re_enter_password"] =
                            "Password and confirm password do not match";
                        } else {
                          let errorsCopy = errors;
                          delete errorsCopy["re_enter_password"];
                          setErrors(errorsCopy);
                        }

                        setErrors({ ...errorObj });
                        if (Object.keys(errorObj).length === 0) {
                          setActiveTab(index);
                        }
                      }

                      if (userType === "schoolAdmin") {
                        const {
                          teacher_role,
                          school_admin_role,
                          state,

                          ...payload
                        } = inputDetailsObj;
                        params?.id && delete payload["password"];

                        let errorObj = validateFormData(payload);
                        if (
                          inputDetailsObj["re_enter_password"] !==
                          inputDetailsObj["password"]
                        ) {
                          errorObj["re_enter_password"] =
                            "Password and confirm password do not match";
                        } else {
                          let errorsCopy = errors;
                          delete errorsCopy["re_enter_password"];
                          setErrors(errorsCopy);
                        }

                        setErrors({ ...errorObj });
                        if (Object.keys(errorObj).length === 0) {
                          setActiveTab(index);
                        }
                      }
                      if (userType === "stateAdmin") {
                        const {
                          state,
                          teacher_role,
                          school_admin_role,
                          re_enter_password,
                          state_uuid,

                          ...payload
                        } = inputDetailsObj;
                        params?.id && delete payload["password"];

                        let errorObj = validateFormData(payload);

                        setErrors({ ...errorObj });
                        if (Object.keys(errorObj).length === 0) {
                          setActiveTab(index);
                        }
                      }
                      if (userType === "partner") {
                        const {
                          state,
                          teacher_role,
                          school_admin_role,
                          re_enter_password,
                          state_uuid,

                          ...payload
                        } = inputDetailsObj;
                        params?.id && delete payload["password"];

                        let errorObj = validateFormData(payload);

                        setErrors({ ...errorObj });
                        if (Object.keys(errorObj).length === 0) {
                          setActiveTab(index);
                        }
                      }
                    } else {
                      setActiveTab(0);
                    }
                  }}
                >
                  <Text textStyle={"p"} whiteSpace="pre-line">
                    {role}
                  </Text>
                </Button>
              );
            })}
      </Flex>
      {activeTab == 0 ? inputDetailsObj && basicUserInfoObj[userType] : null}
      {userType !== "admin" && activeTab == 1 && (
        <ManageUserAssignments
          inputDetailsObj={inputDetailsObj}
          setInputDetailsObj={setInputDetailsObj}
          userAssignments={userAssignments}
          adminSchools={adminSchools}
          setAdminSchools={setAdminSchools}
          setUserAssignments={setUserAssignments}
        />
      )}
    </Flex>
  );
};

export default AddUser;
