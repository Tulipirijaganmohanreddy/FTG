import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SchoolAdminAssignmentsModal from "./SchoolAdminAssignmentsModal";
import StudentAssignmentsModal from "./StudentAssignmentsModal";
import TeacherAssignmentsModal from "./TeacherAssignmentsModal";
import AssginedSchools from "./AssginedSchools";
import AssginedSchoolsClasses from "./AssginedSchoolsClasses";

import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";

import addCircleIcon from "../../../assets/Images/DistrictAdminContentImages/Icon ionic-ios-add-circle.svg";

import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { setMessage } from "../../../store/slices/profileSlice";
import {
  getAddUsers,
  getUpdateUsers,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import {
  getClassesList,
  getSuperAdminSchoolsList,
} from "../../teacher/teacherSlice";
import ManageUsersAssignmentTextIcon from "./ManageUsersAssignmentTextIcon";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";

const ManageUserAssignments = (props) => {
  const {
    setInputDetailsObj,
    inputDetailsObj,
    userAssignments,
    setUserAssignments,
    adminSchools,
    setAdminSchools,
  } = props;
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userId = useSelector((state) => state.profile.userId);
  const role = useSelector((state) => state.profile.selectedRole);
  const token = useSelector((state) => state.profile.token);
  const loading = useSelector((state) => state.profile.upLoading);
  const distrcitIDForDistrictAdmin = useSelector(
    (state) => state?.superAdmin?.distrcitIDForDistrict?.uuid
  );
  const districtIdFromUserData = useSelector(
    (state) => state?.profile?.loggedInUserDetails?.district_uuid
  );
  const districtInfo = useSelector(
    (state) => state?.districtAdmin?.getDistrictForDistrictAdminResponse
  );

  const schoolsList = useSelector((state) => state.teacher.schools);
  const classesList = useSelector((state) => state.teacher.classes);

  //superadmin schools response
  const schoolsResponse = useSelector(
    (state) => state?.superAdmin?.districtsSchools
  );

  const duplicateRole = useSelector((state) => state.profile?.duplicateRole);

  const manageUser = useSelector((state) => state.profile.manageUser);

  const [selectedRole, setSelectedRole] = useState(role);

  const previousPath = useSelector((state) => state?.profile?.previousPath);
  const Loading = useSelector((state) => state.profile.loading);

  const [userAssignmentsModal, setUserAssignmentsModal] = useState(false);

  const [schools, setSchools] = useState([]);
  const [classes, setClasses] = useState([]);

  const [selectedSchoolsList, setSelectedSchoolsList] = useState([]);

  const handleSubmit = () => {

    if (inputDetailsObj?.school_admin_role && !adminSchools?.length) {
      dispatch(
        setMessage(
          "Please Select atleast one school for School Administrator Role"
        )
      );
    } else if (inputDetailsObj?.teacher_role && !userAssignments?.length) {
      dispatch(
        setMessage(
          "Please Select atleast one school and class for Teacher Role"
        )
      );
    }
    
    // else if (
    //   inputDetailsObj?.teacher_role &&
    //   userAssignments?.length &&
    //   !userAssignments[0]?.classes?.length
    // ) {
    //   dispatch(
    //     setMessage("Please Select atleast one  class  for Teacher Role")
    //   );
    // } 
    
    
    else if (inputDetailsObj?.student_role && !userAssignments?.length) {
      dispatch(
        setMessage(
          "Please Select atleast one school and class for Student Role"
        )
      );
    } else {
      const userUuid = params.id;

      const schools = [];
      const classes = [];
      const _adminSchools = adminSchools?.map((school) => school?.uuid);

      userAssignments?.forEach((school) => {
        schools?.push(school?.uuid);
        school?.classes?.forEach((clas) => {
          if (clas?.class_name && clas?.uuid) {
            classes?.push(clas.uuid);
          }
        });
      });

      const finalPayload = {
        ...inputDetailsObj,
        updated_by: userId,
        creater_role: selectedRole,
        classes,
      };

      if (inputDetailsObj?.teacher_role) {
        finalPayload["teacher_schools"] = schools;
      }

      if (inputDetailsObj?.school_admin_role) {
        finalPayload["schools"] = _adminSchools;
      } else {
        finalPayload["schools"] = schools;
      }

      if (userUuid) {
        finalPayload["updated_by"] = userId;
        dispatch(getUpdateUsers({ finalPayload, token, UserId: userUuid }));
      } else {
        finalPayload["created_by"] = userId;
        if (inputDetailsObj?.district_admin_role) {
          finalPayload["districts"] = [
            selectedRole === "superAdmin"
              ? districtInfo?.uuid
              : districtIdFromUserData,
          ];
        }
        dispatch(getAddUsers({ finalPayload, token }));
      }
    }
  };

  const textObj = {
    student: (
      <ManageUsersAssignmentTextIcon text={"Add Class"} icon={addCircleIcon} />
    ),
    teacher: (
      <ManageUsersAssignmentTextIcon
        text={"Add School/Class"}
        icon={addCircleIcon}
      />
    ),
    schoolAdmin: (
      <ManageUsersAssignmentTextIcon text={"Add School"} icon={addCircleIcon} />
    ),
  };

  useEffect(() => {
    schoolsList?.length && setSchools(schoolsList);
    classesList?.length && setClasses(classesList);
  }, [schoolsList, classesList]);

  useEffect(() => {
    if (!duplicateRole && ["superAdmin", "stateAdmin"].includes(role)) {
      dispatch(
        getSuperAdminSchoolsList({
          userId,
          token,
          districtId:
            role === "superAdmin" && !duplicateRole ? districtInfo?.uuid : "",
        })
      );
    }
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
  }, []);

  useEffect(() => {
    dispatch(getClassesList({ body: { schools: selectedSchoolsList }, token }));
  }, [selectedSchoolsList]);

  return (
    <>
      {Loading ? (
        <>
          <Center h={"50vh"}>
            <Image src={loading_img} />
          </Center>
        </>
      ) : (
        <>
          <Stack mt="4" gap="8">
            {inputDetailsObj?.district_admin_role ? (
              <Stack>
                <Heading2 textStyle={"textHead"}>
                  DISTRICT ADMINISTRATOR
                </Heading2>
                <Divider />
                <Text textStyle={"textHead"}>
                  This user is a District Administrator and has access to all
                  schools and classes
                </Text>
              </Stack>
            ) : null}

            {inputDetailsObj?.state_admin_role ? (
              <Stack>
                <Heading2 textStyle={"textHead"}>
                  DISTRICT ADMINISTRATOR
                </Heading2>
                <Divider />
                <Text textStyle={"textHead"}>
                  This user is a State Administrator and has access to all
                  districts , schools and classes
                </Text>
              </Stack>
            ) : null}
            {inputDetailsObj?.partner_role ? (
              <Stack>
                <Heading2 textStyle={"textHead"}>PARTNER</Heading2>
                <Divider />
                <Text textStyle={"textHead"}>
                  This user is a Partner and has access to all districts ,
                  schools.
                </Text>
              </Stack>
            ) : null}
            {inputDetailsObj?.school_admin_role ? (
              <Stack>
                <HStack>
                  <Heading2 textStyle={"textHead"}>
                    SCHOOL ADMINISTRATOR
                  </Heading2>
                  <Spacer />
                  <SchoolAdminAssignmentsModal
                    schools={schools}
                    adminSchools={adminSchools}
                    setAdminSchools={setAdminSchools}
                  />
                </HStack>
                <Divider />
                <AssginedSchools
                  adminSchools={adminSchools}
                  setAdminSchools={setAdminSchools}
                />
              </Stack>
            ) : null}
            {inputDetailsObj?.teacher_role ? (
              <Stack>
                <HStack>
                  <Heading2 textStyle={"textHead"}>TEACHER</Heading2>
                  <Spacer />
                  <TeacherAssignmentsModal
                    schools={schools}
                    userAssignments={userAssignments}
                    setUserAssignments={setUserAssignments}
                  />
                </HStack>
                <Divider />
                <AssginedSchoolsClasses
                  userAssignments={userAssignments}
                  setUserAssignments={setUserAssignments}
                />
              </Stack>
            ) : null}
            {manageUser?.userType === "student" ? (
              <Stack>
                <Stack>
                  <HStack>
                    <Heading2 textStyle={"textHead"}>STUDENT</Heading2>
                    <Spacer />
                    <StudentAssignmentsModal
                      schools={schools}
                      userAssignments={userAssignments}
                      setUserAssignments={setUserAssignments}
                      userAssignmentsModal={userAssignmentsModal}
                      setUserAssignmentsModal={setUserAssignmentsModal}
                    />
                  </HStack>
                  <Divider />
                  <AssginedSchoolsClasses
                    userAssignments={userAssignments}
                    setUserAssignments={setUserAssignments}
                  />
                </Stack>
              </Stack>
            ) : null}

            <Flex mt="8" justify="center" gap="8">
              <Box
                onClick={() => {
                  navigate(previousPath);
                }}
              >
                <NegativeButton text={"Cancel"} />
              </Box>
              <Box onClick={handleSubmit}>
                <PositiveButton text={"Submit"} isLoading={loading} />
              </Box>
            </Flex>
          </Stack>
        </>
      )}
    </>
  );
};

export default ManageUserAssignments;
