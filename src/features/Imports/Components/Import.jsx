import {
  Box,
  Flex,
  HStack,
  Input,
  Progress,
  Stack,
  Text,
} from "@chakra-ui/react";
import Papa from "papaparse";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { FaBookReader } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { RiInformationFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  completeUpload,
  initiateUpload,
  uploadCsv,
} from "../../../DistrictAdminApis/district.service";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setCode, setMessage } from "../../../store/slices/profileSlice";
import {
  getSearchMappings,
  setSearchedMappings,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { importData } from "../Config";
import ErrorsPage from "./ErrorsPage";
import FTPUser from "./FTPUser";
import InstructionsModal from "./InstructionsModal";
import SettingsModal from "./SettingsModal";
import UnavailablePage from "../../../components/Unavailable";

const Import = (props) => {
  const { setActiveTab } = props;
  const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
  const {
    subTitle,
    errorText,
    fileErrorText,
    ftpText,
    subText,
    subText2,
    visit,
    link,
    text,
  } = importData;
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);

  const mappingData = useSelector(
    (state) => state.schoolAdmin.searchedMappings
  );

  const fileInputRef = useRef(null);

  const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB chunk size

  const [settingsModal, setSettingsModal] = useState(false);

  const [instructionsModal, setInstructionsModal] = useState(false);

  const [checkErrorPage, setCheckErrorPage] = useState(false);

  const [csvFile, setCsvFile] = useState(null);

  const [disable, setDisable] = useState(true);

  const [loading, setLoading] = useState(false);

  const [selectedMappingObj, setSelectedMappingObj] = useState(null);

  const [uploadProgress, setUploadProgress] = useState(0);

  const mappingOptions = useMemo(() => {
    if (mappingData?.mapping_details?.length) {
      let _mappingOptions = mappingData?.mapping_details?.map((item) => ({
        label: item.name,
        value: item.uuid,
      }));

      if (mappingData?.recently_used_mapping_Exit) {
        setSelectedMappingObj(_mappingOptions[0]);
      }
      return _mappingOptions;
    } else {
      setSelectedMappingObj(null);
      return [];
    }
  }, [mappingData]);

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (selectedFile && selectedFile.type === "text/csv") {
        Papa.parse(selectedFile, {
          header: true, // Assumes the first row contains headers
          dynamicTyping: true, // Converts numeric values to numbers
          skipEmptyLines: true,
          complete: (result) => {
            result.data.length <= 100000
              ? setCsvFile(selectedFile)
              : dispatch(
                  setMessage(
                    "Please Select a file having not more than 100,000 rows"
                  )
                )

            e.target.value = null;

          },
          error: (error) => {
            console.error("CSV parsing error:", error.message);
          },
        });
      }
    } else {
      setCsvFile(null);
    }
  };

  const handleFileInputClick = () => {
    fileInputRef.current.click();
  };

  const handleInputChange = debounce((searchTerm) => {
    !mappingData?.mapping_details?.length &&
      dispatch(getSearchMappings({ token, searchTerm }));
  }, 500);

  const handleChangeMapping = (mapping) => {
    setSelectedMappingObj(mapping);
  };

  const handleImport = async () => {
    try {
      // Start the timer
      setLoading(true);

      const startTime = new Date();
      const fileName = Date.now().toString() + "_" + csvFile.name;
      const totalChunks = Math.ceil(csvFile.size / CHUNK_SIZE);
      // Initiate multipart upload
      const body = { fileName };
      const uploadId = await initiateUpload({ body, token });

      // Send file chunks
      const uploadPromises = [];
      let uploadedChunks = 0;
      let start = 0,
        end;
      for (let i = 0; i < totalChunks; i++) {
        end = start + CHUNK_SIZE;
        const chunk = csvFile.slice(start, end);
        const formData = new FormData();
        formData.append("index", i);
        formData.append("totalChunks", totalChunks);
        formData.append("fileName", fileName);
        formData.append("file", chunk);
        const uploadPromise = uploadCsv({
          token,
          body: formData,
          uploadId,
        })
          .then(() => {
            uploadedChunks++;
            const progress = Math.floor((uploadedChunks / totalChunks) * 100);

            setUploadProgress(progress);
          })
          .catch((err) => {
            throw err.response.data;
          });

        uploadPromises.push(uploadPromise);
        start = end;
      }

      await Promise.all(uploadPromises);

      // Complete multipart upload
      const completeRes = await completeUpload({
        data: { fileName, uploadId, mappingUUID: selectedMappingObj?.value },
        token,
      });
      const { code, message } = completeRes;

      const endTime = new Date();
      const timeElapsed = (endTime - startTime) / 1000;
      console.log("Time elapsed:", timeElapsed, "seconds");
      if (code === 200) {
        dispatch(setCode(200));
        dispatch(setMessage(message));
        setCsvFile(null)
      }
    } catch (err) {
      dispatch(setMessage(err?.message));
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  useEffect(() => {
    dispatch(getSearchMappings({ token, searchTerm: "" }));
    return () => {
      dispatch(setSearchedMappings([]));
    };
  }, [token]);

  return (
    <>
    {
      underTexas ? <UnavailablePage /> :<>
       <HStack
        display={"flex"}
        //gap={{ lg: '30rem', md: '5rem', base: '1px' }}
        justifyContent={"space-between"}
        alignItems="flex-start"
        mr={{ base: "0", md: "3rem", lg: "3rem" }}
      >
        <>
          <Box whiteSpace={"nowrap"}>
            <Heading2>
              {checkErrorPage ? "IMPORT PREVIEW" : "IMPORT A FILE"}
            </Heading2>
          </Box>
          <Box display={"flex"} gap="4">
            <Box onClick={() => setSettingsModal(true)} role="button">
              <TextIcon
                text={"Settings"}
                icon={IoSettingsSharp}
                increaseTextSize="increaseTextSize"
              />
            </Box>
            <Box
              role="button"
              onClick={() => {
                setInstructionsModal(true);
              }}
            >
              <TextIcon
                text={"Instructions"}
                icon={FaBookReader}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </Box>
        </>
      </HStack>
      {checkErrorPage ? (
        <ErrorsPage
          setCheckErrorPage={setCheckErrorPage}
          setDisable={setDisable}
        />
      ) : (
        <Flex
          direction="column"
          color="black-2"
          gap="2"
          // pl="2"
          px={{ base: "1px", md: "10px" }}
        >
          <Box w={{ base: "100%", md: "20rem", "2xl": "25rem" }}>
            <ChakraSelect
              id="mappingName"
              onInputChange={handleInputChange}
              name="user_uuid"
              onChange={handleChangeMapping}
              options={mappingOptions}
              value={selectedMappingObj}
              error={!selectedMappingObj?.value && errorText}
            />
          </Box>

          <Box w="sm">
            <Label1 name={"importFile"}></Label1>
            <Input
              id="importFile"
              accept=".csv"
              type="file"
              hidden={true}
              onChange={handleChange}
              ref={fileInputRef}
            />
            <Box
              border="2px solid gray"
              px="2"
              py="1"
              w="max-content"
              cursor="pointer"
              onClick={handleFileInputClick}
            >
              Choose File
            </Box>
            {csvFile ? (
              <Paragraph2>{csvFile.name}</Paragraph2>
            ) : (
              <Text>No file Choosen</Text>
            )}
            {!csvFile && (
              <ErrorText color="red" textStyle={"textHead"}>
                {fileErrorText}
              </ErrorText>
            )}
          </Box>

          {loading ? (
            <HStack>
              <Box w="20rem" border="1px solid gray">
                <Progress
                  hasStripe
                  size="md"
                  value={uploadProgress}
                  isAnimated
                />
              </Box>

              <Heading8>{`${uploadProgress}%`}</Heading8>
            </HStack>
          ) : (
            <PositiveButton
              text={"Import"}
              type="submit"
              onClick={handleImport}
              // isLoading={loading}
              isDisabled={!(selectedMappingObj?.value && csvFile)}
            />
          )}
        </Flex>
      )}
      <Flex direction={"column"} mt="auto" justifyContent={"flex-end"}>
        <Stack color="black-2" spacing="2">
          <NormalHeading role="button">{ftpText}</NormalHeading>
          <FTPUser />
          <Box display="flex" flexDirection="column">
            <Label marginTopText={"0"}>{subText}</Label>
            <Label marginTopText={"0"}>{subText2}</Label>
          </Box>
          <Box display="flex" alignItems="center" gap="1">
            <TextIcon
              text=""
              icon={RiInformationFill}
              display={{ base: "block", md: "block", lg: "block" }}
            ></TextIcon>

            <Label marginTopText={"0"}>
              {visit}
              <Text as="a" href={link} target="_blank" ml="1" mr="1">
                {link}
              </Text>
              {text}
            </Label>
          </Box>
        </Stack>
      </Flex>

      {settingsModal && (
        <SettingsModal
          settingsModal={settingsModal}
          setSettingsModal={setSettingsModal}
        />
      )}
      <InstructionsModal
        instructionsModal={instructionsModal}
        setInstructionsModal={setInstructionsModal}
      />
      </>
    }
     
    </>
  );
};

export default Import;
