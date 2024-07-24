import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
  Text,
  Box,
  Image,
} from "@chakra-ui/react";

import { useDisclosure } from "@chakra-ui/react";
import ADMINISTERTEST from "../../../../src/assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ADMINISTERTEST.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setFromEvent, setResponse } from "../../teacher/teacherSlice";
import { setActivatingID } from "../../../store/slices/profileSlice";

function EventSuccessPopUp(props) {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { code, successModal, setSuccessModal, message } = props;

  const responseCode = useSelector((state) => state?.teacher?.response?.code);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  // const editedResponseCode = useSelector(
  //   (state) => state?.teacher?.updatedResponse?.code
  // );
  const eventId = useSelector(
    (state) => state?.teacher?.response?.response?.uuid
  );

  // const editedEventId = useSelector(
  //   (state) => state?.teacher?.updatedResponse?.response?.uuid
  // );

  // const [eventId, setEventId] = useState("");

  // useEffect(() => {
  //   if (editedResponseCode === 200) {
  //     setEventId(editedEventId);
  //   } else
  //   setEventId(createdEventId);
  // }, [editedResponseCode, responseCode]);

  const role = useSelector((state) => state?.profile?.selectedRole);
  const [selectedRole, setSelectedRole] = useState(role);

  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (responseCode === 200) {
      duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
    }
  }, [responseCode]);

  return (
    <>
      <Modal
        isOpen={responseCode == 200}
        onClose={() => {
          setSuccessModal(false);
          dispatch(setResponse(null));
        }}
      >
        <ModalOverlay />
        <ModalContent marginTop="300">
          <Center margin="5">
            <Image
              src={ADMINISTERTEST}
              w="8"
              h="8"
              color="primary"
              textAlign={"center"}
            />
          </Center>
          <Center>
            <Text>ADMINISTER TEST?</Text>
          </Center>

          <ModalBody padding="10">
            <Center>
              <Box display="flex" justifyContent="space-between">
                <Box
                  as="button"
                  height="36px"
                  width="96px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  borderRadius="18px"
                  fontSize="14px"
                  fontWeight="normal"
                  bg="#F5F5F5"
                  color="#808080"
                  fontFamily="poppins"
                  onClick={() => {
                    if (role == "districtAdmin" || duplicateRole) {
                      navigate(`/role/${selectedRole}/fitnessgram`);
                      dispatch(setActivatingID(7));
                    } else {
                      navigate(`/role/${selectedRole}`);
                      dispatch(setActivatingID(1));
                    }
                    dispatch(setResponse(null));
                  }}
                >
                  Save & Exit{" "}
                </Box>

                <Box
                  as="button"
                  height="36px"
                  width="96px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  borderRadius="18px"
                  fontSize="14px"
                  marginLeft="1rem"
                  fontWeight="normal"
                  bg="primary"
                  color="white"
                  fontFamily="poppins"
                  onClick={() => {
                    dispatch(setFromEvent(true));
                    navigate(`/role/${selectedRole}/adminTest/${eventId}`);
                    if (role == "districtAdmin" || duplicateRole) {
                      dispatch(setActivatingID(8));
                    } else {
                      dispatch(setActivatingID(2));
                    }

                    dispatch(setResponse(null));
                  }}
                >
                  Proceed
                </Box>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default EventSuccessPopUp;
