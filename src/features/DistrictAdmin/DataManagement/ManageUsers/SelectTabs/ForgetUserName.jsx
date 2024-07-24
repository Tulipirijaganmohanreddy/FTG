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
import SuccessCardPopUp from "../../../../../MobileResponsive/ForgetScreens/SuccessCardPopUp";
import { useDispatch, useSelector } from "react-redux";
import {
  getForgotUserName,
  setForgotUserName,
} from "../../../../../store/slices/profileSlice";
import PositiveButton from "../../../../../components/PositiveButton";
import NegativeButton from "../../../../../components/NegativeButton";
import Heading5 from "../../../../../components/FitnessComponents/FitnessTexts/Heading5";
import Inputs from "../../../../../components/FitnessComponents/FitnessSelect/Inputs";
import { validateFormData } from "../../../../../Utilities/FormValidation";

function ForgetUserName(props) {
  const { isPopUpShow, setIsPopUpShow } = props;
  const dispatch = useDispatch();

  const loading = useSelector((state) => state?.profile?.upLoading);
  const message = useSelector((state) => state.profile.forgotMessage);

  const [success, setSuccess] = useState(false);

  const { onOpen } = useDisclosure();
  const finalRef = React.useRef(null);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setEmail(trimmedValue);

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
  const handleForgot = (event) => {
    setIsPopUpShow(true);

    let errorObj = validateFormData({ email });

    setErrors(errorObj);
    if (Object.keys(errorObj)?.length === 0) {
      let body = {
        email: email,
      };
      dispatch(getForgotUserName(body));
    }
  };

  useEffect(() => {
    dispatch(setForgotUserName({}));
  }, []);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isPopUpShow}
        onClose={() => {
          setIsPopUpShow(false);
        }}
        onClick={onOpen}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent p="5">
          {/* <ModalCloseButton /> */}
          <ModalBody marginTop="3">
            <Stack spacing="3">
              <Center color="#0081c8">
                <Heading5>Forgot Username?</Heading5>
              </Center>

              <Inputs
                type="email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={handleChange}
                error={errors?.email && errors?.email}
              />
            </Stack>

            <Center>
              <ButtonGroup gap="4" marginTop="5">
                <Box
                  onClick={() => {
                    setIsPopUpShow(false);
                  }}
                >
                  <NegativeButton text={"Cancel"} />
                </Box>

                <Box onClick={handleForgot}>
                  <PositiveButton text={"Send"} isLoading={loading} />
                </Box>
              </ButtonGroup>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>

      <SuccessCardPopUp
        success={success}
        setSuccess={setSuccess}
        setIsPopUpShow={setIsPopUpShow}
        message={message}
      />
    </>
  );
}

export default ForgetUserName;
