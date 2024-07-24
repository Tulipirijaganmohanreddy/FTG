import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spinner,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setCheckLicenseStatus } from "../../../store/slices/superAdminSlice/superAdminSlice";

const LicenseExistPopup = (props) => {
  const {
    deletePopUp,
    setDeletePopUp,
    text,
    selectedSchool,
    setSelectedSchool,
    onClick,
    action,
    setAction,
  } = props;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const errorResponse = useSelector((state) => state?.profile?.message);
  const loading = useSelector((state) => state.profile.upLoading2);
  const code = useSelector((state) => state.profile.code);
  const code2 = useSelector((state) => state.profile.code2);

  const checkLicenseStatus = useSelector(
    (state) => state.superAdmin.checkLicenseStatus?.code
  );

  return (
    <Modal
      isOpen={checkLicenseStatus == 400}
      onClose={() => {
        dispatch(setCheckLicenseStatus(null));
      }}
      isCentered
      useInert={true}
      borderColor="transparent"
    >
      <ModalOverlay />
      <ModalContent
        w={{ lg: "20rem", md: "20rem", base: "20rem" }}
        borderRadius="xl"
        m="2"
      >
        <ModalBody>
          <Flex direction="column" alignItems="center">
            <Text textStyle="message" mt="0.5rem" textAlign="center">
              {" "}
              The new funder you have selected is already associated with one or
              more licenses. Are you sure you want to select this funder?
            </Text>
            <Flex my="3" gap="3" display={"flex"}>
              <Box
                onClick={() => {
                  dispatch(setCheckLicenseStatus(null));
                  // setAction("action");
                  // setSelectedSchool("")
                }}
              >
                <Box
                  as="button"
                  rounded="md"
                  height="36px"
                  width="100px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  fontSize="14px"
                  fontWeight="normal"
                  color="white"
                  fontFamily="poppins"
                  my="3"
                  bg="#ACACAC"
                >
                  Cancel
                </Box>{" "}
              </Box>

              <Box onClick={onClick}>
                <Box
                  as="button"
                  rounded="md"
                  height="36px"
                  width="100px"
                  lineHeight="1.2"
                  transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                  fontSize="14px"
                  fontWeight="normal"
                  color="white"
                  fontFamily="poppins"
                  bg="primary"
                  my="3"
                >
                  {loading ? <Spinner /> : "Ok"}
                </Box>{" "}
              </Box>
            </Flex>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LicenseExistPopup;
