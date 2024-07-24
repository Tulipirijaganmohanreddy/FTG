import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Radio,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssignAndUnAssignUsers } from "../../../../DistrictAdminApis/districtAdminSlice";
import { debounce } from "../../../../Utilities/utils";
import SingleSelect2 from "../../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Label1 from "../../../../components/FitnessComponents/FitnessTexts/Lable1";
import Paragraph1 from "../../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import TableHeading from "../../../../components/FitnessComponents/FitnessTexts/TableHeading";
import NegativeButton from "../../../../components/NegativeButton";
import PositiveButton from "../../../../components/PositiveButton";
import { getClassesList } from "../../../../features/teacher/teacherSlice";
import ChakraSelect from "../../../FitnessComponents/FitnessSelect/ChakraSelect";

const Assign = (props) => {
  const dispatch = useDispatch();
  const {
    action,
    isPopUpShow,
    setIsPopUpShow,
    userIds,
    setUserIds,
    title,
    unAssignmentType2,
    unAssignmentType1,
    setAction,
    user_type,
    setIsAllChecked,
  } = props;

  const token = useSelector((state) => state.profile.token);
  const schoolsList = useSelector((state) => state.teacher.schools);
  const classesList = useSelector((state) => state.teacher.classes);

  const manageUser = useSelector((state) => state?.profile?.manageUser);
  const loading = useSelector((state) => state.profile.upLoading2);

  const code = useSelector((state) => state.profile.code);
  const [classOptions, setClassOptions] = useState([]);


  const { isOpen, onOpen, onClose } = useDisclosure();

  const [data, setData] = useState({
    action: action,
    uuids: userIds,
    role: manageUser?.userType ? manageUser?.userType : user_type,
    schools: "",
    classes: "",
    removeFromCurrentClass: 0,
    removeFromBothClassAndSchool: 1,
  });
  const handleSchool = (e) => {
    const body = {
      schools: [e.target.value],
    };

    setData((prevState) => ({
      ...prevState,
      schools: e.target.value,
    }));

    let payLoad = {
      schools: e.target.value ? [e.target.value] : [],
      search: '',
    };
    dispatch(getClassesList({ body: payLoad, token }));

  };

  const handleClass = (classData) => {
    setData((prevState) => ({
      ...prevState,
      classes: classData.value,
    }));
  };

  const handleInputClasses = debounce((searchText) => {
    if (searchText.length != 1) {
      let payLoad = {
        schools: data.schools ? [data.schools] : [],
        search: searchText,
      };
      dispatch(getClassesList({ body: payLoad, token }));
    }
  }, 500);

  const handleChange = (event) => {
    if (event.target.type === "radio") {
      setData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      setData({
        ...data,
        [event.target.name]: event.target.value,
      });
    }
  };

  const handleSubmit = () => {
    const validation_obj = {
      action: action,
      uuids: userIds,
      role: manageUser?.userType ? manageUser?.userType : user_type,
      schools: data.schools,
      classes: data.classes,
      removeFromCurrentClass: data.removeFromCurrentClass === "1" ? 1 : 0,
      removeFromBothClassAndSchool:
        data.removeFromBothClassAndSchool === "0" ? 0 : 1,
    };

    dispatch(getAssignAndUnAssignUsers({ token, body: validation_obj }));
  };

  const handleClose = () => {
    setIsPopUpShow(false);
    setAction("");
  };

  useEffect(() => {
    if (code === 200) {
      handleClose();
      setUserIds("");
      setIsAllChecked(false);
      setClassOptions([])
      setData((prevState) => ({
        ...prevState,
        action: action,
        uuids: userIds,
        role: "student",
        schools: "",
        classes: "",
        removeFromCurrentClass: 0,
        removeFromBothClassAndSchool: 1,
      }));
    }
  }, [code]);

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


  return (
    <>
      <Modal
        isCentered
        isOpen={isPopUpShow}
        onClose={() => {
          handleClose();
        }}
        onClick={onOpen}
        size="sm"
      >
        <ModalOverlay />
        <ModalContent p="4" m="2">
          <ModalBody>
            <Box
              mt="0.5"
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                w="100%"
                display="flex"
                flexDirection="column"
                alignItems="center"
              >
                <TableHeading>{title}</TableHeading>
              </Box>

              <Box mt="5" w="100%">
                <SingleSelect2
                  placeholder="Select School"
                  label={"School*"}
                  name={"schools"}
                  optionsProps={schoolsList}
                  displayKey={"school_name"}
                  optionValue={"uuid"}
                  onChange={(e) => handleSchool(e)}
                />
              </Box>
              {manageUser.userType !== "schoolAdmin" ? (
                <>
                  <Box mt="5" w="100%">
                    <ChakraSelect
                      id={"studentClaas"}
                      label={"Add Class"}
                      onInputChange={handleInputClasses}
                      name="classes"
                      onChange={handleClass}
                      options={data.schools ? classOptions :[]}
                      placeholder="Select Class"
                    />
                  </Box>

                  <Box mt="5" w="100%">
                    {action !== "Assign" ? (
                      <>
                        <Label1 name="removeFromBothClassAndSchool"></Label1>
                        <Stack spacing="1">
                          <Radio
                            id="removeFromBothClassAndSchool"
                            type="radio"
                            name="removeFromBothClassAndSchool"
                            onChange={handleChange}
                            isChecked={
                              data?.removeFromBothClassAndSchool == "0"
                                ? true
                                : false
                            }
                            value={0}
                          >
                            <Paragraph1
                              decreaseMarginTop="0"
                              decreaseMarginBottom="0"
                            >
                              {unAssignmentType1}
                            </Paragraph1>
                          </Radio>
                          <Radio
                            id="removeFromBothClassAndSchool"
                            type="radio"
                            name="removeFromBothClassAndSchool"
                            onChange={handleChange}
                            isChecked={
                              data?.removeFromBothClassAndSchool == "1"
                                ? true
                                : false
                            }
                            value={1}
                          >
                            <Paragraph1
                              decreaseMarginTop="0"
                              decreaseMarginBottom="0"
                            >
                              {unAssignmentType2}{" "}
                            </Paragraph1>
                          </Radio>
                        </Stack>
                      </>
                    ) : (
                      <>
                        <Label1 name="removeFromCurrentClass"></Label1>

                        <Stack spacing="1">
                          <Radio
                            id="removeFromCurrentClass"
                            type="radio"
                            name="removeFromCurrentClass"
                            onChange={handleChange}
                            isChecked={
                              data?.removeFromCurrentClass == "1" ? true : false
                            }
                            value={1}
                          >
                            <Paragraph1
                              decreaseMarginTop="0"
                              decreaseMarginBottom="0"
                            >
                              {unAssignmentType1}
                            </Paragraph1>
                          </Radio>
                          <Radio
                            id="removeFromCurrentClass"
                            type="radio"
                            name="removeFromCurrentClass"
                            onChange={handleChange}
                            isChecked={
                              data?.removeFromCurrentClass == "0" ? true : false
                            }
                            value={0}
                          >
                            <Paragraph1
                              decreaseMarginTop="0"
                              decreaseMarginBottom="0"
                            >
                              {unAssignmentType2}{" "}
                            </Paragraph1>
                          </Radio>
                        </Stack>
                      </>
                    )}
                  </Box>
                </>
              ) : null}
            </Box>

            <Flex justify="center" gap="8" w="100%" mt="5">
              <Box
                onClick={() => {
                  setIsPopUpShow(false);
                  setAction("");
                }}
              >
                <NegativeButton text={"Cancel"} />
              </Box>

              <Box onClick={handleSubmit}>
                <PositiveButton
                  isLoading={loading}
                  text={action === "Assign" ? "Assign" : "Unassign"}
                />
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Assign;
