import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Radio,
  RadioGroup,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SubHeadingText from "../../../components/FitnessComponents/District/DataManagement/SubHeadingText";
import Heading10 from "../../../components/FitnessComponents/FitnessTexts/Heading10";
import Heading5 from "../../../components/FitnessComponents/FitnessTexts/Heading5";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import TextOne from "../../../components/FitnessComponents/FitnessTexts/TextOne";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  getAddUpdateImportSettings,
  getGetImportSettings,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { settingsData } from "../Config";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const SettingsModal = (props) => {
  const { title, heading, update, typeOfImport, modalTitle } = settingsData;

  const dispatch = useDispatch();
  const token = useSelector((state) => state?.profile?.token);
  const importsSettingsData = useSelector(
    (state) => state?.schoolAdmin?.getImportSettings
  );

  const loading = useSelector((state) => state.profile.upLoading);
  const code = useSelector((state) => state.profile.code);
  const { settingsModal, setSettingsModal } = props;
  const { onClose } = useDisclosure();

  const [importSettings, setImportSettings] = useState({});

  const clickToSave = () => {
    const finalBody = {
      update_details_status:
        importSettings?.updateStatus === "true" ? true : false,
      Type_of_import_status:
        importSettings?.typeOfImports === "true" ? true : false,
    };

    dispatch(getAddUpdateImportSettings({ finalBody, token }));
  };

  const handleClose = () => {
    setSettingsModal(false);
    // dispatch(setGetImportSettings({}));
  };

  useEffect(() => {
    setImportSettings({
      updateStatus: importsSettingsData?.update_details_status
        ? "true"
        : "false",
      typeOfImports: importsSettingsData?.Type_of_import_status
        ? "true"
        : "false",
    });
  }, [importsSettingsData]);

  useEffect(() => {
    dispatch(getGetImportSettings({ token }));
  }, [settingsModal, dispatch]);

  useEffect(() => {
    if (code === 200) {
      handleClose();
    }
  }, [code]);

  return (
    <>
      <Modal
        size={{ base: "md", md: "4xl", lg: "5xl" }}
        onClose={() => {
          handleClose();
        }}
        isOpen={settingsModal}
        isCentered
        useInert={true}
        borderColor="transparent"
      >
        <ModalOverlay />
        <ModalContent
          p="4"
          h={{ base: "60vh", md: "70vh", lg: "auto" }}
          overflow={"scroll"}
          className="example"
          m="2"
        >
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody>
            <Flex direction="column" gap="6">
              <Heading5>{modalTitle}</Heading5>

              <Box>
                <TextOne increaseTextSize={"increaseTextSize"}>
                  {heading}
                </TextOne>
              </Box>

              <Stack spacing={4}>
                <SubHeadingText
                  headingName={update.name}
                  textName=""
                  increaseTextSize={"increaseTextSize"}
                />
                <Label1 name={"updateStatus"}></Label1>

                <Stack pl={4}>
                  <Radio
                    id="updateStatus"
                    alignItems={"flex-start"}
                    name="update_details_status"
                    value="true"
                    onChange={(e) =>
                      setImportSettings((prevState) => ({
                        ...prevState,
                        updateStatus: e.target.value,
                      }))
                    }
                    isChecked={
                      importSettings?.updateStatus == "true" ? true : false
                    }
                  >
                    <Box mt="-4px">
                      <Heading8>{update.type1.boolean}</Heading8>

                      <NormalHeading>{update.type1.text}</NormalHeading>
                    </Box>
                  </Radio>

                  <Radio
                    id="updateStatus"
                    alignItems={"flex-start"}
                    mt={4}
                    name="update_details_status"
                    value="false"
                    onChange={(e) =>
                      setImportSettings((prevState) => ({
                        ...prevState,
                        updateStatus: e.target.value,
                      }))
                    }
                    isChecked={
                      importSettings?.updateStatus == "false" ? true : false
                    }
                  >
                    <Box mt="-4px">
                      <Heading8>{update.type2.boolean}</Heading8>

                      <NormalHeading>{update.type2.text}</NormalHeading>
                    </Box>
                  </Radio>
                </Stack>
              </Stack>
              <Stack spacing={4}>
                <SubHeadingText
                  headingName={typeOfImport.name}
                  increaseTextSize={"increaseTextSize"}
                />
                <Label1 name={"importTypeStatus"}></Label1>

                <Stack pl={4}>
                  <Radio
                    id="importTypeStatus"
                    alignItems={"flex-start"}
                    name="Type_of_import_status"
                    value="false"
                    onChange={(e) =>
                      setImportSettings((prevState) => ({
                        ...prevState,
                        typeOfImports: e.target.value,
                      }))
                    }
                    isChecked={
                      importSettings?.typeOfImports == "false" ? true : false
                    }
                  >
                    <Box mt="-4px">
                      <Heading8>{typeOfImport.type1.boolean}</Heading8>

                      <NormalHeading>{typeOfImport.type1.text}</NormalHeading>
                    </Box>
                  </Radio>

                  <Radio
                    id="importTypeStatus"
                    alignItems={"flex-start"}
                    mt={4}
                    name="Type_of_import_status"
                    value="true"
                    onChange={(e) =>
                      setImportSettings((prevState) => ({
                        ...prevState,
                        typeOfImports: e.target.value,
                      }))
                    }
                    isChecked={
                      importSettings?.typeOfImports == "true" ? true : false
                    }
                  >
                    <Box mt="-4px">
                      <Heading8>{typeOfImport.type2.boolean}</Heading8>

                      <NormalHeading>{typeOfImport.type2.text}</NormalHeading>
                    </Box>
                  </Radio>
                </Stack>
              </Stack>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Flex justify="center" gap={8} width={"full"}>
              <Box onClick={() => handleClose()}>
                <NegativeButton text={"Cancel"} />
              </Box>
              <Box onClick={clickToSave}>
                <PositiveButton text={"Save"} isLoading={loading} />
              </Box>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SettingsModal;
