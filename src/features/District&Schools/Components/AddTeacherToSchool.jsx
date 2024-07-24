import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

import { IoIosAddCircle } from "react-icons/io";
import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  setManageUser,
  setMessage,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getAddTeacherToClass,
  getTeachersBySchool,
  setAddTeacherToClass,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { getClassesList } from "../../teacher/teacherSlice";
import { debounce } from "../../../Utilities/utils";

function AddTeacherToSchool(props) {
  const { addTeacherModal, setAddTeacherModal } = props;

  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const schoolID = params?.schoolId;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSchoolWithSchoolAdminData = useSelector(
    (state) => state?.schoolAdmin?.SchoolWithSchoolAdmin
  );
  const loading = useSelector((state) => state?.profile?.upLoading);

  const manageSchoolsData = useSelector(
    (state) => state?.schoolAdmin?.SchoolsForAdmin
  );
  const schoolId = manageSchoolsData[0]?.uuid;
  const token = useSelector((state) => state?.profile?.token);
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const userUUID = useSelector((state) => state?.profile?.userId);

  const classesList = useSelector((state) => state.teacher.classes);

  const teachersBySchool = useSelector(
    (state) => state.schoolAdmin.TeachersBySchool
  );
  const code = useSelector((state) => state?.profile?.code);

  const [isDropdownClick, setIsDropdownClick] = useState(false);
  const [formData, setFormData] = useState({
    user_uuid: "",
    classId: "",
  });
  const [teacherOptions, setTeacherOptions] = useState([]);
  const [classOptions, setClassOptions] = useState([]);

  const body = {
    schools: [schoolId],
  };

  const onhandleChange = (teacher) => {
    setFormData((prevState) => ({ ...prevState, user_uuid: teacher.value }));
  };

  const onhandleChangeClass = (classData) => {
    setFormData((prevState) => ({ ...prevState, classId: classData.value }));
  };

  const toClickToSave = (event) => {
    event.preventDefault();
    const payloadBody = {
      user_uuid: formData?.user_uuid,
      classes: [formData?.classId],
      schools: [schoolId ? schoolID : params?.schoolId],
      assigner_role: selectedRole,
      assigner_uuid: userUUID,
    };

    formData?.user_uuid && formData?.classId
      ? dispatch(getAddTeacherToClass({ token, payloadBody }))
      : !formData?.user_uuid
      ? dispatch(setMessage("Please select user"))
      : !formData?.classId
      ? dispatch(setMessage("Please select class"))
      : dispatch(setMessage("Please select user"));
  };

  const handleNewTeacher = () => {
    dispatch(
      setManageUser({
        formTitle: `Add Teacher`,
        userType: "teacher",
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${selectedRole}/AddUser`, {
      state: {
        assignment: {
          uuid: getSchoolWithSchoolAdminData?.uuid,
          school_name: getSchoolWithSchoolAdminData?.school_name,
          classes: [],
        },
      },
    });
  };
  const clickToCancle = () => {
    onClose();
    setIsDropdownClick(false);
    setFormData({
      user_uuid: "",
      classId: "",
    });
    dispatch(setAddTeacherToClass(null));
  };

  const handleInputChange = debounce((searchText) => {
    searchText.length >= 3 &&
      dispatch(
        getTeachersBySchool({
          token,
          schoolId: schoolID,
          body: { search_text: searchText, skip: 1, size: "50" },
        })
      );
  }, 500);
  const handleInputClasses = debounce((searchText) => {
    if (searchText.length != 1) {
      let payLoad = {
        schools: params.schoolId ? [params.schoolId] : [],
        search: searchText,
      };
      dispatch(getClassesList({ body: payLoad, token }));
    }
  }, 500);

  useEffect(() => {
    if (teachersBySchool?.length) {
      let arr = [];
      teachersBySchool.forEach((teacher) => {
        let obj = { label: teacher.last_name, value: teacher.uuid };
        arr.push(obj);
      });
      setTeacherOptions([...arr]);
    } else {
      setTeacherOptions([]);
    }
  }, [teachersBySchool]);

  useEffect(() => {
    if (classesList?.length) {
      let arr = [];
      classesList.forEach((classData) => {
        let obj = { label: classData.class_name, value: classData.uuid };
        arr.push(obj);
      });
      setClassOptions([...arr]);
    } else {
      setClassOptions([]);
    }
  }, [classesList]);

  useEffect(() => {
    if (isOpen) {
      let payLoad = {
        schools: params.schoolId ? [params.schoolId] : [],
        search: "",
      };
      dispatch(getClassesList({ body: payLoad, token }));
      dispatch(
        getTeachersBySchool({
          token,
          schoolId: schoolID,
          body: { search_text: "", skip: 1, size: "50" },
        })
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (code === 200) {
      onClose();
    }
  }, [code]);

  return (
    <>
      <HStack
        spacing="12"
        justifyContent="space-between"
        px={{ base: "2", md: "0" }}
      >
        <Box color="black" onClick={() => onOpen()} role="button">
          <TextIcon
            text={"Add Teacher"}
            icon={IoAddCircleSharp}
            increaseTextSize="increaseTextSize"
          />
        </Box>
      </HStack>
      <Modal
        size="md"
        onClose={() => {
          setAddTeacherModal(false);
          onClose;
        }}
        isOpen={isOpen}
        isCentered
        useInert={true}
        borderColor="transparent"
      >
        <ModalOverlay />
        <ModalContent p="4">
          <ModalBody>
            <Stack spacing="4">
              <Flex justifyContent={"space-between"}>
                <Text color="primary">Add Teacher</Text>
                <Flex alignItems={"center"}>
                  <Button textDecoration="underline" onClick={handleNewTeacher}>
                    Add a new teacher
                  </Button>
                  <Box>
                    <IoIosAddCircle size={25} fill={"#0081c8"} />
                  </Box>
                </Flex>
              </Flex>
              <form onSubmit={toClickToSave}>
                <Flex flexDirection={"column"} gap="3">
                  <ChakraSelect
                    label={"User Last Name"}
                    id="userLastName"
                    onInputChange={handleInputChange}
                    name="user_uuid"
                    onChange={onhandleChange}
                    options={teacherOptions}
                  />
                  <Inputs
                    id="teacherRole"
                    label={"This Role"}
                    value={"Teacher"}
                    isDisabled
                  />

                  <Inputs
                    id="schoolName"
                    label={"At School"}
                    value={getSchoolWithSchoolAdminData?.school_name}
                    isDisabled
                  />

                  <ChakraSelect
                    id="className"
                    label={"Add Class"}
                    onInputChange={handleInputClasses}
                    name="classId"
                    onChange={onhandleChangeClass}
                    options={classOptions}
                  />
                </Flex>

                <Flex justify="center" gap="8" mt="5">
                  <NegativeButton text={"Cancel"} onClick={clickToCancle} />
                  <PositiveButton
                    type="submit"
                    text={"Submit"}
                    isLoading={loading}
                  />
                </Flex>
              </form>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AddTeacherToSchool;
