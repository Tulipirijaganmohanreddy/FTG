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
  Flex,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircle } from "react-icons/io";
import successTick from "../../../src/assets/Images/Success_ErrorImages/tick.svg";

import {
  setDistrictsByZipCode,
  setForgotPassword,
  setForgotUserName,
} from "../../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import Label from "../../components/FitnessComponents/FitnessTexts/Label";

function SuccessCardPopUp(props) {
  const {
    success,
    setSuccess,
    setIsPopUpShow,
    setIsPopUpShowPwd,
    message,
    showPopUp,
    setShowPopUp,
    setIsPopUpShowCode,
    isPopUpShowCode,
  } = props;

  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const forgotUserName = useSelector((state) => state?.profile?.forgotUserName);
  const forgotPassword = useSelector((state) => state?.profile?.forgotPassword);

  const finalRef = React.useRef(null);

  return (
    <>
      <Modal
        size="sm"
        isOpen={forgotUserName === 200 || forgotPassword === 200 || showPopUp}
        onClose={() => {
          setSuccess(false);
          onClose;
        }}
        isCentered
        useInert={true}
        borderColor="transparent"
      >
        <ModalOverlay />
        <ModalContent borderRadius="xl">
          <ModalBody>
            <Flex direction="column" alignItems="center">
              <Box boxSize="10" mt="1.5rem">
                <img src={successTick} />
              </Box>

              <Text textStyle="popup" mt="0.5rem" textAlign="center">
                Done
              </Text>
              <Text
                textStyle="message"
                mt="0.5rem"
                color="message"
                textAlign="center"
              >
                {message}
                <Text textAlign={"center"}>
                  <Label marginTopText={"2"}>
                    If you do not receive an email from {" "}
                    <Text
                      as="a"
                      href="mailto:noreply@fitnessgram.net"
                      target="_blank"
                      ml="1"
                      mr="1"
                    >
                      noreply@fitnessgram.net
                    </Text>
                    please ask your IT staff to whitelist the
                    <Text
                      as="a"
                      href={"https://fitnessgram.net/"}
                      target="_blank"
                      ml="1"
                      mr="1"
                    >
                      fitnessgram.net
                    </Text>
                    domain
                  </Label>
                </Text>
              </Text>

              <Box
                onClick={() => {
                  if (forgotPassword == 200) {
                    setIsPopUpShowPwd(false);
                  }
                  if (forgotUserName === 200) {
                    setIsPopUpShow(false);
                  }
                  setShowPopUp && setShowPopUp(false);
                  setIsPopUpShowCode && setIsPopUpShowCode(false);
                  dispatch(setForgotUserName({}));
                  dispatch(setForgotPassword({}));
                  dispatch(setDistrictsByZipCode({}));
                }}
              >
                <Box
                  as="button"
                  rounded="md"
                  height="36px"
                  width="130px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  fontSize="14px"
                  fontWeight="normal"
                  bg="primary"
                  color="white"
                  fontFamily="poppins"
                  my="3"
                >
                  OK
                </Box>{" "}
              </Box>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default SuccessCardPopUp;
