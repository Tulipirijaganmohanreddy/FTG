import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { FaClipboardList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEnterTestResultsResponse, setUpdateStudentResponse } from "../../../store/slices/studentSlice/studentSlice";

const DataSentForApproval = () => {
  const dispatch = useDispatch();


  const responseCode = useSelector(
    (state) => state?.student?.updateStudentResponse?.code
  );

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  return (
    <>
      <Modal isOpen={responseCode == 200} >
        <ModalOverlay />
        <ModalContent marginTop="300" w="50">
        <Center margin="5">
            <FaClipboardList fill="#0081c8" size={40} />
          </Center>
          <Box px ="10">
            <Text marginTop="3">Data Sent for Approval</Text>
          </Box>

          <ModalBody padding="15" marginTop="1rem">
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
                  marginLeft="1rem"
                  fontWeight="normal"
                  bg="primary"
                  color="white"
                  fontFamily="poppins"
                  onClick={() => {
                    dispatch(setEnterTestResultsResponse(null));
                    dispatch(setUpdateStudentResponse(null));


                    navigate(`/role/Student/EnterTestResults`);


                  }}
                >
                  Ok{" "}
                </Box>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DataSentForApproval;
