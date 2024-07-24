import {
  Box,
  Button,
  Flex,
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
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
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
  getRequestToAddAdminForSchool,
  getTeachersBySchool,
  setGreenLitePath,
  setRequestToAddAdmin,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

function AddSchoolAdministrator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const schoolID = params?.schoolId;

  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const getSchoolWithSchoolAdminData = useSelector(
    (state) => state?.schoolAdmin?.SchoolWithSchoolAdmin
  );
  const administrators = getSchoolWithSchoolAdminData?.AdminSchool;

  const token = useSelector((state) => state?.profile?.token);
  const loading = useSelector((state) => state.profile.upLoading2);

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const teachersBySchool = useSelector(
    (state) => state.schoolAdmin.TeachersBySchool
  );
  const code = useSelector((state) => state?.profile?.code);
  const [formData, setFormData] = useState({
    user_uuid: "",
  });
  const [teacherOptions, setTeacherOptions] = useState([]);

  const handleChange = (teacher) => {
    setFormData((prevState) => ({ ...prevState, user_uuid: teacher.value }));
  };

  const toClickToSave = (event) => {
    event.preventDefault();

    const payloadBody = {
      user_uuid: formData?.user_uuid,
      schools: [schoolID],
    };

    formData?.user_uuid
      ? dispatch(getRequestToAddAdminForSchool({ token, payloadBody }))
      : dispatch(setMessage("Please select user"));
  };

  const clickToNavigate = (item) => {
    const formTitle =
      selectedRole === "schoolAdmin"
        ? "Request to Add School Administrator"
        : "Add School Administrator";
    dispatch(setRequestToAddAdmin(true));
    dispatch(
      setManageUser({
        formTitle,
        userType: "schoolAdmin",
        // previousPath: location.pathname,
      })
    );

    dispatch(setPreviousPath(location.pathname));
    navigate(`/role/${selectedRole}/AddUser`, {
      state: {
        assignment: {
          uuid: getSchoolWithSchoolAdminData?.uuid,
          school_name: getSchoolWithSchoolAdminData?.school_name,
        },
      },
    });
    dispatch(setGreenLitePath(location.pathname));
  };

  const handleInputChange = debounce((searchText) => {
    if (searchText?.length > 2) {
      dispatch(
        getTeachersBySchool({
          token,
          schoolId: schoolID,
          body: { search_text: searchText, skip: 1, size: "50" },
        })
      );
    }
  }, 500);
  const handleClose = () => {
    setFormData({
      user_uuid: "",
    });
    onClose();
  };

  useEffect(() => {
    if (teachersBySchool?.length) {
      const existingTeacherIds =
        administrators?.length && administrators?.map((admin) => admin.uuid);
      let arr = [];

      teachersBySchool?.forEach((teacher) => {
        if (
          existingTeacherIds?.length &&
          !existingTeacherIds?.includes(teacher?.uuid)
        ) {
          let obj = { label: teacher.last_name, value: teacher.uuid };

          arr.push(obj);
        } else if (!existingTeacherIds?.length) {
          let obj = { label: teacher.last_name, value: teacher.uuid };
          arr.push(obj);
        }
      });

      setTeacherOptions([...arr]);
    } else {
      setTeacherOptions([]);
    }
  }, [teachersBySchool]);

  useEffect(() => {
    if (isOpen) {
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
      handleClose();
    }
  }, [code]);

  return (
    <>
      <Box
        color="black"
        mb={{ base: "0", md: "0.5", lg: "0" }}
        onClick={onOpen}
        role="button"
      >
        <TextIcon
          text={"Add Administrator"}
          icon={MdAddCircle}
          increaseTextSize="increaseTextSize"
        />
      </Box>

      <Modal
        size="md"
        onClose={() => handleClose()}
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
                <Text color="primary" whiteSpace="nowrap">
                  {selectedRole !== "schoolAdmin"
                    ? "Add School Administrator"
                    : "Request to Add Admin"}
                </Text>
                <Flex mt="5">
                  <Button
                    textDecoration="underline"
                    role="button"
                    onClick={clickToNavigate}
                  >
                    {selectedRole !== "schoolAdmin"
                      ? "Add a new user"
                      : "Request a new user"}
                  </Button>
                  <Box marginTop={2}>
                    <IoIosAddCircle size={25} fill={"#0081c8"} />
                  </Box>
                </Flex>
              </Flex>
              <form onSubmit={toClickToSave}>
                <ChakraSelect
                  id={"userLastName"}
                  label={"User Last Name"}
                  onInputChange={handleInputChange}
                  name="user_uuid"
                  onChange={handleChange}
                  options={teacherOptions}
                />
                <Box mt="5">
                  <Inputs
                    id={"schoolName"}
                    label={"This Role"}
                    value={"School Admin"}
                    isDisabled
                  />
                </Box>
                <Box mt="5">
                  <Inputs
                    id={"schoolName"}
                    label={"At School"}
                    value={getSchoolWithSchoolAdminData?.school_name}
                    isDisabled
                  />
                </Box>

                <Flex justify="center" gap="8" mt="5">
                  <NegativeButton
                    text={"Cancel"}
                    onClick={() => handleClose()}
                  />
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

export default AddSchoolAdministrator;
