import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Center,
  Flex,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Radio,
  Select,
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
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  deleteCMSSubject,
  getAllSubjects,
  getCMSSubjectStatus,
  getUpdatedCMSSubject,
  setAllSubjects,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { addCMSData } from "../Config";

import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import AddNewSubjectPopup from "./AddNewSubjectPopup";

const SubjectPopUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const location = useLocation();
  const finalRef = React.useRef(null);

  const { title, label, status, status2, btnText, negativeBtnText } =
    addCMSData;

  const authToken = useSelector((state) => state?.profile?.token);
  const subjectsResponse = useSelector(
    (state) => state?.superAdmin?.getSubjects
  );
  const loading = useSelector((state) => state.profile.upLoading);
  const [newSubjectPopup, setNewSubjectPopup] = useState(false);

  const code = useSelector((state) => state?.profile?.code);
  const code2 = useSelector((state) => state?.profile?.code2);
  const userId = useSelector((state) => state?.profile?.userId);

  const [subjectData, setSubjectData] = useState({
    uuid: "",
    name: "",
    is_active: null,
  });
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const values = e.target.value;

    if (e.target.name === "uuid") {
      setSubjectData({
        ...subjectData,
        [e.target.name]: values.split("||")[0],
        name: values.split("||")[1],
        is_active: values.split("||")[2],
      });
    } else if (e.target.name === "is_active") {
      setSubjectData({
        ...subjectData,
        [e.target.name]: e.target.value === "active" ? "true" : "false",
      });
    } else {
      setSubjectData({
        ...subjectData,
        [e.target.name]: e.target.value,
      });
    }
  };
  const handleDelete = () => {
    dispatch(deleteCMSSubject({ token: authToken, uuid: subjectData?.uuid }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const obj = {
      name: subjectData.name,
      is_active: subjectData?.is_active,
    };

    const errorObj = validateFormData(obj);
    setErrors(errorObj);
    if (Object.keys(errorObj)?.length === 0) {
      dispatch(
        getUpdatedCMSSubject({
          body: { name: subjectData?.name, updated_by: userId },
          token: authToken,
          uuid: subjectData?.uuid,
        })
      );
    }
  };

  const handleModalClose = () => {
    setSubjectData({});
    onClose();
    setErrors({});
  };

  useEffect(() => {
    if (code === 200) {
      onClose();
    }
  }, [code]);

  useEffect(() => {
    setSubjectData({
      uuid: "",
      name: "",
      is_active: null,
    });
  }, [code2]);

  const handleModalOpen = () => {
    dispatch(setPreviousPath(location.pathname));

    onOpen();
  };
  useEffect(() => {
    setSubjectData({});
  }, [isOpen]);

  return (
    <>
      <Box role="button">
        <TextIcon
          text="Add/Remove CMS Subject"
          icon={MdAddCircle}
          onClick={handleModalOpen}
        ></TextIcon>
      </Box>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={handleModalClose}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent m="3">
          <ModalCloseButton
            onClick={() => {
              handleModalClose();
            }}
          />
          <ModalBody py="9">
            <Heading1>{title}</Heading1>
            <Flex>
              <Spacer />
              <AddNewSubjectPopup
                setNewSubjectPopup={setNewSubjectPopup}
                newSubjectPopup={newSubjectPopup}
              />
            </Flex>
            <form onSubmit={handleSubmit}>
              <Stack spacing="2" marginTop="3">
                <Label1 name={"selectSubject"}> </Label1>
                <Select
                  id="selectSubject"
                  bg="head2"
                  borderColor=""
                  placeholder="Select Subject"
                  textStyle={"p"}
                  //size={{ base: 'sm', md: 'md', lg: 'sm' }}
                  // maxW={'100%'}
                  rounded="md"
                  size="sm"
                  border="none"
                  onChange={handleChange}
                  name="uuid"
                  value={subjectData?.uuid}
                >
                  {subjectsResponse?.length &&
                    subjectsResponse.map((item, key) => (
                      <option
                        key={"abc" + key}
                        value={
                          item?.uuid + "||" + item.name + "||" + item.is_active
                        }
                      >
                        {item.name}
                      </option>
                    ))}
                </Select>

                {errors?.name && (
                  <ErrorText> Please Select the Subject</ErrorText>
                )}

                <Label1 name="subjectName">{label}</Label1>

                <InputGroup bg="head2" rounded="md" id="subjectName">
                  <Inputs
                    type="text"
                    name="name"
                    value={subjectData?.name}
                    onChange={handleChange}
                  />
                  <InputRightElement>
                    <DeleteIcon
                      color="red"
                      cursor="pointer"
                      onClick={() => {
                        setDeletePopUp(true);
                        dispatch(setPreviousPath(null));
                      }}
                    />
                  </InputRightElement>
                </InputGroup>
                {errors?.name && <ErrorText> {errors?.name}</ErrorText>}

                <Box>
                  <Label1 name={"subjectStatus"}>Status</Label1>

                  <Stack spacing="1">
                    <Radio
                      id="subjectStatus"
                      name="is_active"
                      value="active"
                      isChecked={
                        subjectData?.is_active == "true" ? true : false
                      }
                      onChange={handleChange}
                    >
                      <Label1> {status} </Label1>
                    </Radio>
                    <Radio
                      name="is_active"
                      id="subjectStatus"
                      value="inactive"
                      isChecked={
                        subjectData?.is_active == "false" ? true : false
                      }
                      onChange={handleChange}
                    >
                      <Label1> {status2} </Label1>
                    </Radio>
                  </Stack>
                </Box>

                {errors?.is_active && (
                  <ErrorText> {errors?.is_active}</ErrorText>
                )}

                <Spacer />

                <Center>
                  <Flex gap="4">
                    <NegativeButton
                      text={negativeBtnText}
                      onClick={handleModalClose}
                    />
                    <PositiveButton
                      type="submit"
                      text={btnText}
                      isLoading={loading}
                    />
                  </Flex>
                </Center>
              </Stack>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the subject?"}
          onClick={handleDelete}
        />
      )}{" "}
    </>
  );
};

export default SubjectPopUp;
