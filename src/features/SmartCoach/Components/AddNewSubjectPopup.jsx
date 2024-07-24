import {
  Box,
  ButtonGroup,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  Spacer,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  AddNewSubject,
  getAllSubjects,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { addCMSData } from "../Config";

const AddNewSubjectPopup = (props) => {
  const { setNewSubjectPopup, newSubjectPopup } = props;
  const { newSubjectTitle, label2, status, status2, btnText, negativeBtnText } =
    addCMSData;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation();
  const token = useSelector((state) => state?.profile?.token);
  const loading = useSelector((state) => state.profile.upLoading2);
  const userId = useSelector((state) => state?.profile?.userId);
  const code = useSelector((state) => state?.profile?.code2);

  const [errors, setErrors] = useState({});

  const [newSubjectData, setNewSubjectData] = useState({
    name: "",
    created_by: "",
    is_active: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setNewSubjectData({
      ...newSubjectData,
      [name]: value,
      created_by: userId,
    });
    const errorsObj = validateFormData({
      [name]: trimmedValue,
    });

    if (Object.keys(errorsObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorsObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setNewSubjectData({
      ...newSubjectData,
      [name]: trimmedValue,
    });
  };
  const handleRadioStatus = (event) => {
    setNewSubjectData({
      ...newSubjectData,
      [event.target.name]: event.target.value === "active" ? "true" : "false",
    });
  };

  const validateData = (event) => {
    event.preventDefault();

    const obj = {
      name: newSubjectData.name,
      is_active: newSubjectData?.is_active,
    };

    const errorObj = validateFormData(obj);
    setErrors(errorObj);

    if (Object.keys(errorObj)?.length === 0) {
      dispatch(AddNewSubject({ body: newSubjectData, token: token }));
    }
  };
  const handleModalClose = () => {
    setNewSubjectData({});
    setNewSubjectPopup(false);
    setErrors({});
  };

  const handleModalOpen = () => {
    // dispatch(setPreviousPath(location.pathname));
    setNewSubjectPopup(true);
  };

  useEffect(() => {
    if (code === 200) {
      onClose();
      setNewSubjectPopup(false);

      setNewSubjectData({ name: "", is_active: "", created_by: "" });
      dispatch(getAllSubjects({ token: token }));
    }
  }, [code]);

  return (
    <>
      <Box role="button">
        <TextIcon
          text="Add a new Subject"
          icon={MdAddCircle}
          onClick={handleModalOpen}
        />
      </Box>

      <Modal
        isOpen={newSubjectPopup}
        onClose={handleModalClose}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent m="3">
          <ModalCloseButton />
          <ModalBody py="9">
            <Heading1>{newSubjectTitle}</Heading1>

            <Flex>
              <Spacer />
            </Flex>
            <form onSubmit={validateData}>
              <Stack spacing="2" mt="3">
                <Label1 name="subjectName">{label2}</Label1>

                <Inputs
                  id="subjectName"
                  type="text"
                  name="name"
                  onBlur={handleBlur}
                  value={newSubjectData.name}
                  onChange={handleInputChange}
                />
                {errors?.name && <ErrorText> {errors?.name}</ErrorText>}

                <Box>
                  <Label1 name={"subjectStatus"}>Status</Label1>

                  <Stack spacing="1">
                    <Radio
                      name="is_active"
                      id="subjectStatus"
                      value="active"
                      isChecked={
                        newSubjectData?.is_active == "true" ? true : false
                      }
                      onChange={handleRadioStatus}
                    >
                      <Label1>{status}</Label1>
                    </Radio>
                    <Radio
                      name="is_active"
                      id="subjectStatus"
                      value="inactive"
                      isChecked={
                        newSubjectData?.is_active == "false" ? true : false
                      }
                      onChange={handleRadioStatus}
                    >
                      <Label1>{status2}</Label1>
                    </Radio>
                  </Stack>
                </Box>
                <Spacer />
                {errors?.is_active && (
                  <ErrorText> {errors?.is_active}</ErrorText>
                )}

                <Center>
                  <ButtonGroup gap="4">
                    <NegativeButton
                      text={negativeBtnText}
                      onClick={handleModalClose}
                    />
                    <PositiveButton
                      type="submit"
                      text={btnText}
                      isLoading={loading}
                    />
                  </ButtonGroup>
                </Center>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddNewSubjectPopup;
