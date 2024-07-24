import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStatesList } from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  getDistrictsForStateOrPartnerApiCall,
  getSchool,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { schoolList } from "../Config";

const AddSchool = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { pageNumber } = props;

  const { addSchoolFields, addSchoolTitle, negativeBtnText, positiveBtnText } =
    schoolList;
  const dispatch = useDispatch();

  const params = useParams();

  const statesList = useSelector((state) => state?.districtAdmin?.statesList);

  const loading = useSelector((state) => state.profile.upLoading);
  const code = useSelector((state) => state?.profile?.code);
  const token = useSelector((state) => state?.profile?.token);
  const role = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const addSchoolRequirements = useSelector(
    (state) => state?.superAdmin?.addSchoolRequirements
  );

  const licenseByIdData = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  const districts = useSelector(
    (state) => state?.superAdmin?.districtsForStateOrPartner
  );

  const [selectedDistrict, setSelectedDistrict] = useState({
    label: "Select..",
    value: "",
  });

  const [districtsList, setDistrictsList] = useState([]);

  const [selectedRole, setSelectedRole] = useState(role);

  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const onhandleChange = (teacher) => {
    const stateAndZipcode =
      districts?.length > 0 &&
      districts?.filter((each) => each?.uuid === teacher.value);

    setFormData((prevState) => ({
      ...prevState,
      district_uuid: teacher.value,

      state: stateAndZipcode?.[0]?.state,
      zipcode: "",
    }));

    setSelectedDistrict((prevState) => ({
      ...prevState,
      label: teacher.label,
      value: teacher.value,
    }));

    const errorsObj = validateFormData({
      district_uuid: teacher.value,
    });

    if (Object.keys(errorsObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorsObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj["district_uuid"];
      setErrors({ ...obj });
    }
  };

  const handleInputChange = debounce((text) => {
    let payload = {
      funder_uuid: params?.funderId,
      funder_type: licenseByIdData?.funder_type,
      search: text,
    };
    if (text?.length > 2 && isOpen == true) {
      dispatch(getDistrictsForStateOrPartnerApiCall({ body: payload, token }));
    }
  }, 500);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (
      [
        "school_name",
        "address_1",
        "address_2",
        "local_identifier",
        "city",
        "zipcode",
        "phone_1",
        "phone_2"
      ].includes(name)
    ) {
      setFormData({ ...formData, [name]: value });
    } else {
      setFormData({ ...formData, [name]: trimmedValue });
    }
    let errorsObj = {};

    // if (!["local_identifier"].includes(name)) {
    errorsObj = validateFormData({
      [name]: trimmedValue,
    });
    // }

    if (Object.keys(errorsObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorsObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
    if (name === "email" || name == "local_identifier") {
      if (!trimmedValue?.length) {
        let obj = { ...errors };
        delete obj[name];
        setErrors({ ...obj });
      }
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setFormData({ ...formData, [name]: trimmedValue });
  };
  const validateData = (event) => {
    event.preventDefault();
    const {
      local_identifier,
      phone1,
      email,
      phone2,
      address_1,
      address_2,
      sso_id,
      city,
      ...payload
    } = formData;
    let errorObj = validateFormData(payload);
    setErrors((prevState) => ({
      ...prevState,
      ...errorObj,
    }));

    if (
      Object.keys(errorObj)?.length === 0 &&
      Object.keys(errors)?.length === 0
    ) {
      const finalObj = {
        ...formData,
        district_uuid: formData?.district_uuid
          ? formData?.district_uuid
          : addSchoolRequirements?.district_uuid,
        created_by: selectedRole,
      };

      dispatch(getSchool({ body: finalObj, token }));
    }
  };

  const handleOnOpen = () => {
    onOpen();
    setFormData({
      ...formData,
      school_name: "",
      email: "",
      local_identifier: "",
      phone_1: "",
      phone_2: "",
      address_1: "",
      address_2: "",
      sso_id: "",
      city: "",
      state: addSchoolRequirements?.state,
      zipcode: addSchoolRequirements?.zipcode,
    });
    setErrors({});
  };

  useEffect(() => {
    if (code) {
      onClose();
    }
  }, [code]);

  useEffect(() => {
    if (isOpen == true) {
      !statesList?.length && dispatch(getStatesList({ token }));

      duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);

      let finalPayload = {
        funder_uuid: params?.funderId,
        funder_type: licenseByIdData?.funder_type,
        search: "",
      };
      ["state", "partner"].includes(licenseByIdData?.funder_type) &&
        dispatch(
          getDistrictsForStateOrPartnerApiCall({ body: finalPayload, token })
        );
    }
  }, [isOpen]);

  useEffect(() => {
    if (districts?.length) {
      let arr = districts.map((district) => ({
        label: district?.district_name,
        value: district?.uuid,
      }));
      setDistrictsList(arr);
    } else {
      setDistrictsList([]);
    }
  }, [districts]);

  return (
    <>
      <Box onClick={handleOnOpen} role="button">
        <TextIcon
          text="Add School"
          icon={MdAddCircle}
          increaseTextSize="increaseTextSize"
        />
      </Box>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        borderRadius={4}
        isCentered
        // size="2xl"
      >
        <ModalOverlay />
        <ModalContent m="3">
          <ModalCloseButton />
          <ModalBody px="8" py="8">
            <Heading1>{addSchoolTitle}</Heading1>
            <Flex>
              <Spacer />
            </Flex>
            <form onSubmit={validateData}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  lg: "repeat(2, 1fr)",
                  md: "repeat(2, 1fr)",
                }}
                gap="2"
                marginTop="5"
                h="auto"
                maxH={{ base: "25rem", md: "auto" }}
                overflowY="auto"
              >
                {addSchoolFields?.map((item, index) => {
                  const isFunderTypePartnerOrState =
                    licenseByIdData?.funder_type === "partner" ||
                    licenseByIdData?.funder_type === "state";

                  const shouldRender =
                    !(
                      item.inputType === "select" &&
                      item.name === "district_uuid"
                    ) || isFunderTypePartnerOrState;

                  return shouldRender ? (
                    <GridItem colSpan="1" key={"a" + index}>
                      {item?.inputType === "select" &&
                        item?.name === "district_uuid" &&
                        (licenseByIdData?.funder_type === "partner" ||
                          licenseByIdData?.funder_type === "state") && (
                          <>
                            <ChakraSelect
                              id={item.Id}
                              placeholder="Select"
                              label={"District Name*"}
                              name={"district_uuid"}
                              onInputChange={handleInputChange}
                              onChange={onhandleChange}
                              value={selectedDistrict}
                              options={districtsList}
                              mb="0.4px"
                            />

                            {errors?.[item?.name] && (
                              <ErrorText> {errors?.[item?.name]}</ErrorText>
                            )}
                          </>
                        )}

                      {item.inputType !== "select" && (
                        <Inputs
                          id={item.Id}
                          label={item.label}
                          type={item.inputType}
                          name={item?.name}
                          value={formData[item?.name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={errors?.[item?.name] && errors?.[item?.name]}
                        />
                      )}

                      {item.inputType === "select" &&
                        item.name !== "district_uuid" && (
                          <Box>
                            <SingleSelect2
                              id={item.Id}
                              placeholder="Select State"
                              label={item?.label}
                              name={item?.name}
                              value={formData[item?.name]}
                              onChange={handleChange}
                              optionsProps={statesList}
                              displayKey={"state"}
                              optionValue={"code"}
                              error={
                                errors?.[item?.name] && errors?.[item?.name]
                              }
                            />
                          </Box>
                        )}
                    </GridItem>
                  ) : null;
                })}
              </Grid>

              <Center>
                <Flex minWidth="max-content" alignItems="center" mt="5" gap="4">
                  <NegativeButton text={negativeBtnText} onClick={onClose} />
                  <PositiveButton
                    type="submit"
                    text={positiveBtnText}
                    bg="green"
                    isLoading={loading}
                  />
                </Flex>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSchool;
