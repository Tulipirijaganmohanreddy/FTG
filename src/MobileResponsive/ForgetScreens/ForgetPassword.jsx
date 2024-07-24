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
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import {
  getForgotPassword,
  setForgotUserName,
} from "../../store/slices/profileSlice";
import SuccessCardPopUp from "./SuccessCardPopUp";
import { useDispatch, useSelector } from "react-redux";
import PositiveButton from "../../components/PositiveButton";
import NegativeButton from "../../components/NegativeButton";
import Heading5 from "../../components/FitnessComponents/FitnessTexts/Heading5";
import Inputs from "../../components/FitnessComponents/FitnessSelect/Inputs";
import { validateFormData } from "../../Utilities/FormValidation";

function ForgetPassword(props) {
  const { isPopUpShowPwd, setIsPopUpShowPwd } = props;

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.profile.upLoading);
  const message = useSelector((state) => state.profile.forgotMessage);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const [data, setData] = useState({
    user_name: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
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
    setIsPopUpShowPwd(false);

    setData({
      user_name: "",
      email: "",
    });
    setErrors({});
    onClose();
  };

  const handleReset = (event) => {
    let errorObj = validateFormData(data);

    setErrors(errorObj);
    if (Object.keys(errorObj)?.length === 0) {
      dispatch(getForgotPassword(data));
    }
  };

  useEffect(() => {
    dispatch(setForgotUserName({}));
  }, []);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isPopUpShowPwd}
        onClose={() => {
          handleClose();
        }}
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
              <Center color={"primary"}>
                <Heading5>Forgot Password?</Heading5>
              </Center>
              <Inputs
                type={"text"}
                name="email"
                value={data.email}
                placeholder="Enter Email"
                onChange={handleChange}
                error={errors?.email && errors?.email}
              />{" "}
              <Inputs
                type={"text"}
                name="user_name"
                value={data.user_name}
                placeholder="Enter UserName"
                onChange={handleChange}
                error={errors?.user_name && errors?.user_name}
              />
            </Stack>

            <Center>
              <ButtonGroup gap="4" marginTop="5">
                <Box
                  onClick={() => {
                    setData({
                      user_name: "",
                      email: "",
                    });
                    setErrors({});

                  }}
                >
                  <NegativeButton text={"Enter Again"} type="button" />
                </Box>

                <Box onClick={(event) => handleReset(event)}>
                  <PositiveButton text={"Reset"} isLoading={loading} />
                </Box>
              </ButtonGroup>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
      <SuccessCardPopUp
        setIsPopUpShowPwd={setIsPopUpShowPwd}
        message={message}
      />
    </>
  );
}

export default ForgetPassword;
