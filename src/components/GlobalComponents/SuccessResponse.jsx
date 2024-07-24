import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import React from "react";
import successTick from "../../assets/Images/Success_ErrorImages/tick.svg";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
  setCode,
  setCode2,
  setMessage,
  setPreviousPath,
} from "../../store/slices/profileSlice";
import {
  SetCodeUpdate,
  setUpdateLicenceByIdCode,
} from "../../store/slices/superAdminSlice/superAdminSlice";

const SuccessResponse = (props) => {
  const { message } = props;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const response = useSelector((state) => state?.profile?.message);
  const uuid = useSelector(
    (state) => state.superAdmin.newDistrict?.uuid
  );

  const manageUser = useSelector((state) => state.profile.manageUser);

  const code = useSelector((state) => state.profile.code);

  const previousPath = useSelector((state) => state?.profile?.previousPath);
  return (
    <Modal
      p="0"
      size="xs"
      isOpen={response}
      onClose={() => {
        navigate(previousPath)
        dispatch(setPreviousPath(null));
      }}
      // [200, 201].includes(code) && code
      isCentered
      useInert={true}
      borderColor="transparent"
    >
      <ModalOverlay />
      <ModalContent w="16rem" borderRadius="xl">
        <ModalBody>
          <Flex direction="column" alignItems="center" wrap="wrap">
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
              textTransform="capitalize"
              maxW="100%"
            >
              {response}!
            </Text>
           
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
                onClick={() => {
                  dispatch(setMessage(null));
                  dispatch(setCode(null));
                  dispatch(setUpdateLicenceByIdCode(null));
                  dispatch(setCode2(null));
                  dispatch(SetCodeUpdate(null));
                  if (location.pathname.includes("AddNewDistrict")) {
                    navigate(
                      `/role/superAdmin/Districts/DistrictDetails/${uuid}`
                    );
                  }
                  if (previousPath) {
                    navigate(previousPath);
                  }
                  if (location.pathname.includes("reset")) {
                    navigate("/");
                  }
  
                  dispatch(setPreviousPath(null));
                }}
              >
                OK
              </Box>{" "}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SuccessResponse;
