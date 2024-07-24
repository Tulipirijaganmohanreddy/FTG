import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  getGetImportHistory,
  getRollBackImportData,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

const RollBackModal = (props) => {
  const { roleBackModal, setRoleBackModal, historyData } = props;
  const { onClose } = useDisclosure();

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);
  const loading = useSelector((state) => state?.schoolAdmin?.loading);

  const clickToSave = () => {
    dispatch(getRollBackImportData({ importId: historyData.uuid, token }));
    setRoleBackModal(false);
    setTimeout(() => {
      dispatch(getGetImportHistory({ token, skip: 1 }));
    }, "2000");
  };

  return (
    <>
      <Modal
        size="4xl"
        onClose={onClose}
        isOpen={roleBackModal}
        isCentered
        useInert={true}
        borderColor="transparent"
      >
        <ModalOverlay />
        <ModalContent p="4">
          <Flex pl="1.5rem">
            <Heading1>CONFIRM IMPORT ROLLBACK</Heading1>
          </Flex>

          <ModalCloseButton onClick={() => setRoleBackModal(false)} />
          <ModalBody>
            <Flex direction="column" gap="6">
              <Stack spacing={4}>
                <Label marginTopText={"0"}>
                  This option allows you to delete all students, teachers,
                  classes, and assignments that were created during this report
                  <Text as="b"> EXCEPT FOR </Text>any records that have
                  associated test event data. This will{" "}
                  <Text as="b"> NOT </Text>undo only updates the import made to
                  existing records, with the exception of reactivating records
                  that were marked for deletion.
                </Label>
                <Label>Only your most recent import may be rolled back.</Label>

                <Flex justify="center">
                  <Text color="red" as="b" textStyle={"textHead"}>
                    Are you sure want to continue?
                  </Text>
                </Flex>
              </Stack>
            </Flex>
          </ModalBody>
          <ModalFooter>
            <Flex justify="center" gap={8} width={"full"}>
              <Box onClick={() => setRoleBackModal(false)}>
                <NegativeButton text={"Canel"} />
              </Box>
              <Box onClick={clickToSave}>
                <PositiveButton
                  text="Rollback Import"
                  px="4rem"
                  isLoading={loading}
                />
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default RollBackModal;
