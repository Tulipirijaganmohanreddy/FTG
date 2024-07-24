import React from "react";

import {
  Box,
  Button,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import Heading1 from "../../components/FitnessComponents/FitnessTexts/Heading1";
import Paragraph2new from "../../components/FitnessComponents/FitnessTexts/Paragraph2new";

const DisclaimerCardModal = (props) => {
  const {
    disclaimerPopUpOpened,
    setDisclaimerPopUpOpened,
    loginDetails,
    setLoginDetails,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Modal
        onClose={() => {
          setDisclaimerPopUpOpened(false);
          setLoginDetails({
            ...loginDetails,
            disclaimerAccepted: false,
          });

          onClose();
        }}
        isOpen={disclaimerPopUpOpened}
        isCentered
        size={{ base: "md", md: "md", lg: "lg", xl: "xl" }}
      >
        <ModalOverlay />
        <ModalContent
          margin="1rem"
          h={{ base: "auto", md: "auto" }}
          // overflow="scroll"
        >
          <ModalBody>
            <>
              <Center textColor="#0081C8">
                <Heading1 mt={{ base: "2", md: "2" }} mb="4">
                  Disclaimer
                </Heading1>
              </Center>

              <Box textAlign="center" whiteSpace="pre-wrap">
                <Paragraph2new textColor="black" decreaseMarginTop="0.10rem">
                  This system is restricted to authorized users in accordance
                  with the GreenLight Fitness End User License Agreement. Any
                  unauthorized access or use of the FitnessGram platform is a
                  violation of GreenLight Fitness policy and may be a violation
                  of law. The system may be monitored by the company for
                  administrative and security purposes.
                </Paragraph2new>
              </Box>

              <br />

              <Box textAlign="center" whiteSpace="pre-wrap">
                <Paragraph2new textColor="black" decreaseMarginTop="0.10rem">
                  By clicking "Accept", you acknowledge that you have read and
                  understand this notice and consent to the system monitoring
                  for these purposes, otherwise click "Decline"
                </Paragraph2new>
              </Box>

              <Flex
                justifyContent={{ base: "space-around", md: "center" }}
                gap={{ md: "5rem" }}
                mt="7"
                mb="4"
              >
                <Button
                  rounded="md"
                  border="1px solid #F5F5F5"
                  background="#F5F5F5"
                  textColor="#282828"
                  onClick={() => {
                    setLoginDetails({
                      ...loginDetails,
                      disclaimerAccepted: false,
                    });

                    setDisclaimerPopUpOpened(false);

                    onClose();
                  }}
                >
                  <Paragraph2new textColor="black" decreaseMarginTop="0.10rem">
                    Decline
                  </Paragraph2new>
                </Button>

                <Button
                  rounded="md"
                  border="1px solid #0081C8"
                  background="#0081C8"
                  textColor="#F5F5F5"
                  onClick={() => {
                    setLoginDetails({
                      ...loginDetails,
                      disclaimerAccepted: true,
                    });

                    setDisclaimerPopUpOpened(false);
                    onClose();
                  }}
                >
                  <Paragraph2new textColor="white">Accept</Paragraph2new>
                </Button>
              </Flex>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DisclaimerCardModal;
