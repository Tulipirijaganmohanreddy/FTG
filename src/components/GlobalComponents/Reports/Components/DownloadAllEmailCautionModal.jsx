import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import Heading4new from "../../../FitnessComponents/FitnessTexts/Heading4new";
import NegativeButton from "../../../NegativeButton";
import PositiveButton from "../../../PositiveButton";

const DownloadAllEmailCautionModal = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const totalCountOfReports = useSelector(
    (state) => state?.districtAdmin?.totalCountOfReports
  );

  const {
    isShowPopUp,
    setIsShowPopUp,
    action,
    SPECIFIC_ACTION_OBJ,
    setSendEmailTo,
    handleSpecificAction,
  } = props;

  return (
    <Modal
      p="0"
      size="xs"
      isOpen={isShowPopUp}
      isCentered
      useInert={true}
      borderColor="transparent"
    >
      <ModalOverlay />
      <ModalContent w="16rem" borderRadius="xl">
        <ModalBody>
          <Flex direction="column" gap={2} alignItems="center">
            <Heading4new>Note :</Heading4new>
            <Text
              textStyle="message"
              color="message"
              textAlign="center"
              textTransform="capitalize"
            >
              {`If you have already submitted this request, please refrain from doing so again. 
             `}
            </Text>

            <Text
              textStyle="message"
              color="message"
              textAlign="center"
              textTransform="capitalize"
            >
              {`Would you like to proceed with sending the request now?`}
            </Text>
            <Text textTransform="capitalize" textStyle={"message"}>
              Count of Students : {totalCountOfReports ? totalCountOfReports : 0}
            </Text>
            <Flex gap="3">
              <Box
                onClick={() => {
                  setIsShowPopUp(null);
                  setSendEmailTo(null);
                }}
              >
                <NegativeButton text={"No"} />
              </Box>

              <Box
                onClick={() => {
                  SPECIFIC_ACTION_OBJ[action](isShowPopUp);
                  setIsShowPopUp(null);
                }}
              >
                <PositiveButton text="Yes" bg="#65a30d" />
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default DownloadAllEmailCautionModal;
