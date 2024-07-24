import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    useDisclosure
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import { getFTPDetails } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { FTPData } from "../Config";

const FTPUser = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const{title,subTitle} =FTPData

  const token = useSelector(state=>state.profile.token)

  const FTPDetails = useSelector((state) => state.schoolAdmin.FTPDetails);

  useEffect(() => {
  isOpen && dispatch(getFTPDetails({ token }));
  }, [isOpen]);


  return (
    <>
      <Box onClick={onOpen}>
        <Text as="a" textStyle={"p"} href="#">
            {title}
        </Text>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose} isCentered size="sm">
        <ModalOverlay />

        <ModalContent>
          <Box bg="gray-4" p="2">
            <Heading6 textTransform="capitalize" letterSpacing={"tight"}>
                {subTitle}
            </Heading6>

            <ModalCloseButton size={"sm"} />
          </Box>

          <ModalBody p="0">
            <Box p="2">
              <Flex>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Host:
                </Box>
                <Box
                  border="1px"
                  borderLeft="none"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                  textStyle={"heading9"}
                >
                  {FTPDetails?.host ?? "NA"}
                </Box>
              </Flex>
              <Flex>
                <Box
                  borderLeft="1px"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Username:
                </Box>
                <Box
                  borderLeft="1px"
                  borderRight="1px"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                >
                  {FTPDetails?.user ?? "NA"}
                </Box>
              </Flex>
              <Flex>
                <Box
                  border="1px"
                  borderBottom="none"
                  borderRight="none"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Password:
                </Box>
                <Box
                  border="1px"
                  borderBottom="none"
                  borderColor="gray-2"
                  p={2}
                  flex="1"
                >
                  {FTPDetails?.password ?? " NA"}
                </Box>
              </Flex>
              <Flex>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  borderRight="none"
                  borderBottom="none"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Port:
                </Box>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  borderBottom="none"
                  p={2}
                  flex="1"
                >
                  {FTPDetails?.port ?? "NA"}
                </Box>
              </Flex>
              <Flex>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  borderRight="none"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Transfer Mode:
                </Box>
                <Box border="1px" borderColor="gray-2" p={2} flex="1">
                  {FTPDetails?.transfer ?? "NA"}
                </Box>
              </Flex>
              <Flex>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  borderTop="none"
                  p={2}
                  flex="1"
                  textStyle={"heading2"}
                >
                  Security:
                </Box>
                <Box
                  border="1px"
                  borderColor="gray-2"
                  borderTop="none"
                  borderLeft="none"
                  p={2}
                  flex="1"
                >
                  {FTPDetails?.security ?? "NA"}
                </Box>
              </Flex>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default FTPUser;
