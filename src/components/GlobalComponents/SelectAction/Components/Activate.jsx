import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
  
  import React, { useEffect } from "react";
import { HiExclamationCircle } from "react-icons/hi";
import PositiveButton from "../../../../components/PositiveButton";
  
  import { useDispatch, useSelector } from "react-redux";
import NegativeButton from "../../../../components/NegativeButton";
import {
  setMessage
} from "../../../../store/slices/profileSlice";
import { getUsersAction } from "../../../../features/authentication/components/schoolAdmin/schoolAdminSlice";
  
  function Activate(props) {
    const {
      isPopUpShow,
      setIsPopUpShow,
      title,
      button,
      text,
      userIds,
      action,
      setUserIds,
      setAction,
      user_type,
      setIsAllChecked,
    } = props;
  
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const finalRef = React.useRef(null);
    const manageUser = useSelector((state) => state?.profile?.manageUser);
    const token = useSelector((state) => state.profile.token);
    const code = useSelector((state) => state.profile.code);
    const loading = useSelector((state) => state.profile.upLoading);
  
    const handleChangeAction = () => {
      const body = {
        user_type: manageUser?.userType ? manageUser?.userType : user_type,
        action: action,
        uuids: userIds,
      };
      userIds?.length
        ? dispatch(getUsersAction({ token, body }))
        : dispatch(setMessage("Please select atleast one user"));
    };
  
    useEffect(() => {
      if (code === 200) {
        setUserIds("");
        setIsAllChecked(false);
        handleClose();
      }
    }, [code]);
    const handleClose = () => {
      setIsPopUpShow(false);
      setAction("");
    };
  
    return (
      <>
        <Modal
          isCentered
          finalFocusRef={finalRef}
          isOpen={isPopUpShow}
          onClose={() => {
            handleClose();
          }}
          onClick={onOpen}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalBody p="0">
              <Box
                w={["100%"]}
                borderRadius="15"
                p="0"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                marginBottom="5"
              >
                <Stack>
                  <Flex
                    background="#0081C8"
                    border="1px"
                    borderColor="#0081C8"
                    borderTopRadius={5}
                    w="100%"
                    px="2"
                    py="2"
                    justify="center"
                  >
                    <Text color="white" textStyle={"h4"}>
                      {title}
                    </Text>
                  </Flex>
  
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Flex alignItems="center" direction="column">
                      <HiExclamationCircle size={35} fill="red" />
                      <Text marginTop="1" color="red">
                        {" "}
                        WARNING
                      </Text>
  
                      <Text textStyle="p" marginTop="2">
                        {text}
                      </Text>
                    </Flex>
  
                    <Flex marginTop="5" gap="2">
                      <Box
                        onClick={() => {
                          setIsPopUpShow(false);
                          setAction("");
                        }}
                      >
                        <NegativeButton text={"Cancel"} type="button" />
                      </Box>
                      <Box onClick={handleChangeAction}>
                        <PositiveButton text={button} isLoading={loading} />
                      </Box>
                    </Flex>
                  </Flex>
                </Stack>
              </Box>
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  export default Activate;
  