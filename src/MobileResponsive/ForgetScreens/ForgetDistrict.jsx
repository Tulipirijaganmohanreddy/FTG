import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  Stack,
  Center,
  Heading,
  ButtonGroup,
  Input,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import Heading5 from "../../components/FitnessComponents/FitnessTexts/Heading5";
import Inputs from "../../components/FitnessComponents/FitnessSelect/Inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllDistrictsByZipCode,
  getForgotDistrictCode,
  setDistrictsByZipCode,
} from "../../store/slices/profileSlice";
import MultiSelector from "../../components/FitnessComponents/FitnessSelect/MultiSelector";
import ChakraSelect from "../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import ErrorText from "../../components/FitnessComponents/FitnessTexts/ErrorText";
import SuccessCardPopUp from "./SuccessCardPopUp";
import NegativeButton from "../../components/NegativeButton";
import PositiveButton from "../../components/PositiveButton";
import { validateFormData } from "../../Utilities/FormValidation";

function ForgetDistrict(props) {
  const { isPopUpShowCode, setIsPopUpShowCode } = props;

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const message = useSelector((state) => state.profile.forgotMessage);
  const loading = useSelector((state) => state.profile.upLoading);

  const [errors, setErrors] = useState(false);

  const [data, setData] = useState({
    email: "",
    user_name: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setData({ ...data, [name]: trimmedValue });

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

  const handleClose = () => {
    setData({ email: "", user_name: "" });
    setIsPopUpShowCode(false);
    setErrors({});
    onClose();
  };
  const handleDistrictCode = () => {
    let errorObj = validateFormData(data);

    setErrors(errorObj);
    if (Object.keys(errorObj)?.length === 0) {
      dispatch(getForgotDistrictCode({ data }));
    }
  };

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isPopUpShowCode}
        onClose={() => handleClose()}
        onClick={onOpen}
        borderRadius={4}
        isCentered
        mt="10"
      >
        <ModalOverlay />

        <ModalContent p="5">
          <ModalCloseButton onClick={() => handleClose()} />

          <ModalBody marginTop="3">
            <Stack spacing="3">
              <Center color="#0081c8">
                <Heading5>Forgot District Code?</Heading5>
              </Center>

              <Inputs
                type={"text"}
                name={"email"}
                placeholder="Enter Email"
                value={data.email}
                onChange={handleChange}
                error={errors?.email && errors?.email}
              />

              <Inputs
                type={"text"}
                name={"user_name"}
                placeholder="Enter Username"
                value={data.user_name}
                onChange={handleChange}
                error={errors?.user_name && errors?.user_name}
              />
            </Stack>

            <Center gap="3" mt="4">
              <NegativeButton
                text={"Cancel"}
                type="button"
                onClick={() => {
                  handleClose();
                }}
              />
              <Box>
                <PositiveButton
                  text={"Send"}
                  onClick={handleDistrictCode}
                  isLoading={loading}
                />
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SuccessCardPopUp
        setIsPopUpShowPwd={setIsPopUpShowCode}
        message={message}
      />
    </>
  );
}

export default ForgetDistrict;
