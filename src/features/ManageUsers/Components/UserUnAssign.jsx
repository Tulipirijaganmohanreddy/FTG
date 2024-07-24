import {
  Box,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAssignAndUnAssignUsers } from "../../../DistrictAdminApis/districtAdminSlice";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { userAssignmentData } from "../Config";

const UserUnAssign = (props) => {
  const { setUnAssignModel, unAssignModel, userAssignments, role } = props;

  const {
    negativeBtnText2,
    positiveBtnText2,
    unAssignText1,
    unAssignText2,
    unAssignTitle,
    unAssigndesc,
    schoolDesc,
    classUnAssign,
  } = userAssignmentData;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useParams();
  const dispatch = useDispatch();

  const manageUser = useSelector((state) => state.profile.manageUser);
  const token = useSelector((state) => state.profile.token);
  const loading = useSelector((state) => state.profile.upLoading2);

  const [data, setData] = useState({
    action: "Unassign",
    uuids: [params?.id],
    role: role ? role : manageUser?.userType,
    schools: userAssignments?.schoolId,
    classes: userAssignments?.classId ? userAssignments?.classId : "",
    removeFromCurrentClass: 1,
    removeFromBothClassAndSchool: 0,
  });
  const handleUnassign = () => {
    dispatch(getAssignAndUnAssignUsers({ token, body: data }));
  };

  const handleClose = () => {
    setData({
      action: "",
      uuids: "",
      role: "",
      schools: "",
      classes: "",
      removeFromCurrentClass: "",
      removeFromBothClassAndSchool: "",
    });
    setUnAssignModel(false);
  };
  return (
    <Box>
      <Modal
        isCentered
        isOpen={unAssignModel}
        onClose={() => {
          handleClose();
        }}
        size="2xl"
      >
        <ModalOverlay />
        <ModalContent m="3">
          <ModalBody p="0">
            <>
              <Stack spacing={"1"}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  background="#E7F1FF"
                  border="1px"
                  borderColor="#E7F1FF"
                  borderRadius="3"
                  w="100%"
                  px={{ base: "0", md: "2" }}
                  py="2"
                  alignItems="center"
                >
                  <Heading6 textTransform="capitalize" letterSpacing={"tight"}>
                    {role == "schoolAdmin" ||
                    manageUser?.userType == "schoolAdmin"
                      ? classUnAssign
                      : unAssignTitle}
                  </Heading6>
                  <Box>
                    <ModalCloseButton m="0" onClick={() => handleClose()} />
                  </Box>
                </Box>
                <Box px="4">
                  <Box
                    display={"flex"}
                    flexDirection={{ base: "column", md: "row" }}
                    alignItems={{ base: "", md: "center" }}
                    gap="2"
                    mt="2"
                  >
                    <Heading8>
                      {role == "schoolAdmin" ||
                      manageUser?.userType == "schoolAdmin"
                        ? schoolDesc
                        : unAssigndesc}
                    </Heading8>
                  </Box>
                  <Divider my="3" />

                  <HStack>
                    {" "}
                    <Heading8>
                      {unAssignText1}
                      <Text textDecoration="underline" as="span" color={"red"}>
                        {role == "schoolAdmin" ||
                        manageUser?.userType == "schoolAdmin"
                          ? userAssignments.school_name
                          : userAssignments.class_name}
                        {/* {`${userAssignments.class_name}`}. */}
                      </Text>

                      {role == "schoolAdmin" ||
                      manageUser?.userType == "schoolAdmin"
                        ? unAssignText2
                        : null}
                    </Heading8>
                  </HStack>

                  <Flex
                    gap="2"
                    my="5"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <PositiveButton
                      text={positiveBtnText2}
                      isLoading={loading}
                      onClick={handleUnassign}
                    />

                    <NegativeButton
                      text={negativeBtnText2}
                      onClick={() => handleClose()}
                    />
                  </Flex>
                </Box>
              </Stack>
            </>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserUnAssign;
