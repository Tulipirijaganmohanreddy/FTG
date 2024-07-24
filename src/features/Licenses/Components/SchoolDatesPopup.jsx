import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { calculatePaginationLength, handleEndDate } from "../../../Utilities/utils";
import wrongmark from "../../../assets/Images/Success_ErrorImages/wrong.svg";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { addLicenseToSchool, getLicenseById } from "../../../store/slices/superAdminSlice/superAdminSlice";

const SchoolDatesPopup = (props) => {
  const school_uuid = props.schoolsList;
  const setSelectedSchools = props.setSelectedSchools;

  const {totalSchoolsList} = props

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { errorIsOpen, errorOnOpen, errorOnClose } = useDisclosure();
  const {
    isOpen: isOpenFirstModal,
    onOpen: onOpenFirstModal,
    onClose: onCloseFirstModal,
  } = useDisclosure();
  const {
    isOpen: isOpenSecondModal,
    onOpen: onOpenSecondModal,
    onClose: onCloseSecondModal,
  } = useDisclosure();

  const dispatch = useDispatch();

  const params = useParams();

  const finalRef = React.useRef(null);

  const funder_uuid = useSelector((state) => state?.superAdmin?.funderId);
  const code2 = useSelector((state) => state?.profile?.code2);
  const token = useSelector((state) => state?.profile?.token);
  const addedSchoolToLicenseResponse = useSelector(
    (state) => state?.superAdmin?.AddLicenseToSchool
  );

  console.log(addedSchoolToLicenseResponse, "AddLicenseToSchool");

  const schoolLimit = useSelector(
    (state) => state?.superAdmin?.licenseSchoolLimit
  );

  const assignedSchools = useSelector(
    (state) => state?.superAdmin?.schoolsAssignedToLicense
  );
  const licenseStartDate = useSelector(
    (state) => state?.superAdmin?.licenseStartDate
  );
  const licenseEndDate = useSelector(
    (state) => state?.superAdmin?.licenseEndDate
  );

  const loading = useSelector((state) => state?.superAdmin?.loading);
  const licenseId = useSelector((state) => state?.superAdmin?.storeLicenseId);
  const licensedSchoolData = useSelector(
    (state) => state?.superAdmin?.licensedSchools
  );

  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const licenseInformation = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const payload = {
    license_start_date: licenseByIdData?.start_date,
    license_end_date: licenseByIdData?.end_date,
  };
  const fields = [
    {
      id: "1",
      Id: "licenseStartDate",
      label: "Start Date:",
      placeholder: "",
      name: "license_start_date",
      inputType: "date",
    },
    {
      id: "2",
      Id: "licenseEndDate",
      label: "End Date:",
      placeholder: "",
      name: "license_end_date",
      inputType: "date",
    },
  ];

  const [inputFields, setInputFields] = useState(payload);
  const [checkErrorResponse, setCheckErrorResponse] = useState(false);
  const handleChange = (e) => {
    if (e.target.name === "license_start_date") {
      let endDate = handleEndDate(e.target.value);
      setInputFields({
        ...inputFields,
        [e.target.name]: e.target.value,
        license_end_date: endDate["end_date"],
      });
    } else {
      setInputFields({ ...inputFields, [e.target.name]: e.target.value });
    }
  };

  const handleSchoolLicenseAddition = (list, schoolLimit) => {
    if (list > schoolLimit) {
      setCheckErrorResponse(true);
      onCloseFirstModal();
      onOpenSecondModal();
    } else {
      onOpenFirstModal();
    }
  };

  const validateData = (event) => {
    event.preventDefault();

    const finalPayload = {
      school_uuid,
      funder_uuid: params?.funderId,
      license_uuid: params?.licenseId,
      ...inputFields,
    };



    // const remainingLengthForPagination = calculatePaginationLength(totalSchoolsList, school_uuid)

    // console.log(finalPayload, totalSchoolsList, remainingLengthForPagination, "final paytloadddd")

    dispatch(addLicenseToSchool({ body: finalPayload, token: token }));


  }



  console.log(totalSchoolsList, "final paytloadddd===")



  useEffect(() => {
    setSelectedSchools([]);
    setInputFields({
      ...inputFields,
      license_start_date: licenseByIdData
        ? licenseByIdData?.start_date
        : licenseInformation?.data?.response?.start_date,
      license_end_date: licenseByIdData
        ? licenseByIdData?.end_date
        : licenseInformation?.data?.response?.end_date,
    });
  }, []);

  // useEffect(() => {
  //   if (addedSchoolToLicenseResponse?.data?.code === 200) {
  //     onCloseFirstModal();
  //   }
  // }, [addedSchoolToLicenseResponse]);

  useEffect(() => {
    if (code2 === 200) {

      onCloseFirstModal();

    }
  }, [code2]);

  useEffect(() => {
    if (!school_uuid?.length) onCloseFirstModal();
  });

  return (
    <>
      <>
        <Flex>
          <Box>
            <Button
              color="white"
              borderRadius="3xl"
              type="submit"
              onClick={() =>
                handleSchoolLicenseAddition(
                  assignedSchools + school_uuid.length,
                  schoolLimit
                )
              }
              
            >
              <Heading4>
                {" "}
                Assigning {assignedSchools + school_uuid?.length}/{schoolLimit}{" "}
                Schools
              </Heading4>
            </Button>
          </Box>
        </Flex>
        <Modal
          finalFocusRef={finalRef}
          isOpen={isOpenFirstModal && school_uuid?.length}
          onClose={onCloseFirstModal}
          borderRadius={10}
          size="md"
          isCentered
        >
          <ModalOverlay />
          <ModalContent m="3">
            <ModalBody p="0">
              <Heading
                size="md"
                background="#0081c8"
                height="4rem"
                color="white"
                p="5"
              >
                Adding School
              </Heading>
              <Flex>
                <Spacer />
              </Flex>
              <form onSubmit={validateData}>
                <Grid gap="2" marginTop="2" p="5">
                  {fields?.map((item, index) => {
                    return (
                      <GridItem colSpan="1" key={`${index}hr`}>
                        {item.inputType === "date" && (
                          <Box>
                            <Inputs
                              label={item.label}
                              id={item.Id}
                              type="date"
                              border="0px"
                              bg="bg.100"
                              name={item?.name}
                              min={
                                item.name === "license_start_date"
                                  ? inputFields[item?.name]
                                  : null
                              }
                              max={
                                item.name === "license_end_date"
                                  ? inputFields[item?.name]
                                  : null
                              }
                              value={inputFields[item?.name]?.split("T")[0]}
                              onChange={handleChange}
                              textStyle={"textHead"}
                            />
                          </Box>
                        )}
                      </GridItem>
                    );
                  })}
                </Grid>

                <Center>
                  <Flex
                    minWidth="max-content"
                    alignItems="center"
                    padding="4"
                    gap="4"
                  >
                    <NegativeButton text="Cancel" onClick={onCloseFirstModal} />
                    <PositiveButton
                      type="submit"
                      text="Save"
                      isLoading={loading}
                    />
                  </Flex>
                </Center>
              </form>
            </ModalBody>
          </ModalContent>
        </Modal>

        {checkErrorResponse ? (
          <Modal
            onClose={onCloseSecondModal}
            isOpen={isOpenSecondModal}
            isCentered
            borderColor="transparent"
          >
            <ModalOverlay />
            <ModalContent
              w={{ lg: "16rem", md: "12rem", base: "12rem" }}
              borderRadius="xl"
            >
              <ModalBody>
                <Flex direction="column" alignItems="center">
                  <Box boxSize="10" mt="1.5rem">
                    <img src={wrongmark} />
                  </Box>
                  <Text textStyle="popup" mt="0.5rem" textAlign="center">
                    Error{" "}
                  </Text>
                  <Text
                    textStyle="message"
                    mt="0.5rem"
                    color="message"
                    textAlign="center"
                  >
                    {" "}
                    you have exceeded the school limit. Try Updating the school
                    limit to add more schools to a license
                  </Text>
                  <Box onClick={onCloseSecondModal}>
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
                      my="4"
                    >
                      OK
                    </Box>{" "}
                  </Box>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        ) : (
          ""
        )}
      </>
    </>
  );
};

export default SchoolDatesPopup;
