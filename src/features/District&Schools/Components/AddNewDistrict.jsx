import {
  Box,
  Center,
  Flex,
  Grid,
  GridItem,
  Radio,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatesList } from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { getNewDistrict } from "../../../store/slices/superAdminSlice/superAdminSlice";

import parse from "html-react-parser";
import moment from "moment";
import "react-calendar/dist/Calendar.css";
import InputDate from "../../../components/FitnessComponents/FitnessSelect/InputDate";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { districtData, districtListData } from "../Config";

const initialState = {
  district_name: "",
  state: "",
  zipcode: "",
  school_start_date: "01 July",
  address_1: "",
  address_2: "",
  email: "",
  local_identifier: "",
  district_identifier: "",
  phone_1: "",
  phone_2: "",
  sso_id: "",
  city: "",
  sis_vendor: "",
  district_sso_id: "",
  is_school: false,
  sso_identify_field: "",
};

const AddNewDistrict = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { addNewDistrictData } = districtListData;
  const { sis_vendor_options } = districtData;

  const {
    addNewDistrictFields,
    title,
    subHead,
    radioBtnText1,
    radioBtnText2,
    positiveBtnText,
    negativeBtnText,
  } = addNewDistrictData;

  const loading = useSelector((state) => state.profile.upLoading);
  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const statesList = useSelector((state) => state?.districtAdmin?.statesList);
  const previousPath = useSelector((state) => state.profile.previousPath);

  const token = useSelector((state) => state?.profile?.token);
  const userId = useSelector((state) => state?.profile?.userId);

  const [schoolIdentifier, setSchoolIdentifier] = useState(true);

  const [errors, setErrors] = useState({});

  const [newDistrict, setNewDistrict] = useState(initialState);
  const d = new Date().getFullYear();

  const [selectedDate, setSelectedDate] = useState("01 July".d);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleChangeDateFromCalendar = (e, text = "") => {
    setSelectedDate(e);
    const date = moment(e).format("DD MMMM");
    setNewDistrict((prevState) => ({ ...prevState, school_start_date: date }));

    if (e.getFullYear()) {
      let obj = { ...errors };
      delete obj["school_start_date"];
      setErrors({ ...obj });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (
      [
        "district_name",
        "city",
        "address_1",
        "address_2",
        "zipcode",
        "phone_1",
        "phone_2",
      ].includes(name)
    ) {
      setNewDistrict({ ...newDistrict, [name]: value });
    } else {
      setNewDistrict({ ...newDistrict, [name]: trimmedValue });
    }

    let errorsObj = {};

    if (
      ![
        "sis_vendor",
        "sso_identify_field",
        "address_1",
        "address_2",
        "district_sso_id",
      ].includes(name)
    ) {
      errorsObj = validateFormData({
        [name]: trimmedValue,
      });
    }

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
    if (
      (name === "email" || name == "district_identifier") &&
      !trimmedValue?.length
    ) {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    setNewDistrict({ ...newDistrict, [name]: trimmedValue });
  };
  const handleDistrictChange = (e) => {
    if (e.target.value === "addDistrict") {
      setSchoolIdentifier(true);
      setNewDistrict({ ...initialState, is_school: false });

      setErrors({});
    } else if (e.target.value === "addDistrictSchool") {
      setSchoolIdentifier(false);
      setNewDistrict({ ...initialState, is_school: true });
      setErrors({});
    }
  };

  const validateData = (event) => {
    event.preventDefault();

    const {
      address_1,
      address_2,
      email,
      local_identifier,
      district_identifier,
      phone_1,
      phone_2,
      sso_id,
      city,
      sis_vendor,
      district_sso_id,
      is_school,
      sso_identify_field,

      ...payload
    } = newDistrict;

    let errorObj = validateFormData(payload);
    setErrors((prevState) => ({
      ...prevState,
      ...errorObj,
    }));
    if (
      Object.keys(errorObj)?.length === 0 &&
      Object.keys(errors)?.length === 0
    ) {
      const finalPayload = {
        ...newDistrict,
        created_by: userId,
        creater_role: selectedRole,
      };
      dispatch(getNewDistrict({ body: finalPayload, token }));
    }
  };

  useEffect(() => {
    !statesList?.length && dispatch(getStatesList({ token }));
  }, []);

  return (
    <Box maxW="full" maxH="full" className="example">
      <Flex>
        <Box>
          <Heading1>{title}</Heading1>

          <Label>{parse(subHead)}</Label>
        </Box>
        <Spacer />
      </Flex>

      <Flex m="3">
        <Label1 name={"addAsDistrict"}></Label1>

        <Stack spacing={5} direction="row">
          <Radio
            id={"addAsDistrict"}
            name={"is_school"}
            onChange={handleDistrictChange}
            isChecked={schoolIdentifier == true ? true : false}
            value={"addDistrict"}
          >
            <NormalHeading>{radioBtnText1}</NormalHeading>
          </Radio>
          <Radio
            id={"addAsDistrict"}
            name={"is_school"}
            onChange={handleDistrictChange}
            isChecked={schoolIdentifier == false ? true : false}
            value={"addDistrictSchool"}
          >
            <NormalHeading>{radioBtnText2}</NormalHeading>
          </Radio>
        </Stack>
      </Flex>

      <form onSubmit={validateData}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            lg: "repeat(3, 1fr)",
            md: "repeat(3, 1fr)",
          }}
          gap="2"
          marginTop="5"
        >
          {addNewDistrictFields?.map((item, index) => {
            return (
              <GridItem colSpan="1" key={"a" + index}>
                {item.inputType !== "select" && (
                  <Box>
                    {item.id === "7" ? (
                      <Inputs
                        id={item.Id}
                        label={item.label}
                        type={item.inputType}
                        name={item?.name}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        isDisabled={schoolIdentifier}
                        error={errors?.[item?.name] && errors?.[item?.name]}
                      />
                    ) : (
                      item.name !== "school_start_date" && (
                        <Inputs
                          id={item.Id}
                          label={item.label}
                          type={item.inputType}
                          value={newDistrict?.[item.name]}
                          onBlur={handleBlur}
                          name={item?.name}
                          onChange={handleChange}
                          isDisabled={item?.isDisabled}
                          error={errors?.[item?.name] && errors?.[item?.name]}
                        />
                      )
                    )}
                  </Box>
                )}
                {item.inputType === "select" && item?.name !== "sis_vendor" && (
                  <Box>
                    <SingleSelect2
                      id={item.Id}
                      placeholder="Select State"
                      label={item?.label}
                      name={item?.name}
                      onChange={handleChange}
                      optionsProps={statesList}
                      displayKey={"state"}
                      optionValue={"code"}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}

                {item.name == "sis_vendor" && (
                  <Box>
                    <SingleSelect2
                      id={item.Id}
                      placeholder="Select "
                      label={item?.label}
                      name={item?.name}
                      optionsProps={sis_vendor_options}
                      displayKey={"label"}
                      optionValue={"value"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}
                {item.name == "school_start_date" && (
                  <InputDate
                    label={item.label}
                    id={item.Id}
                    name={item.name}
                    type="text"
                    error={errors?.[item?.name] && errors?.[item?.name]}
                    onClickDay={() => setIsCalendarOpen(false)}
                    isCalendarOpen={isCalendarOpen}
                    selectedDate={selectedDate}
                    handleChangeDateFromCalendar={handleChangeDateFromCalendar}
                    handleCalendarClick={handleCalendarClick}
                    value={newDistrict?.["school_start_date"]}
                    top="4rem"
                    translate={true}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  />
                )}
              </GridItem>
            );
          })}
        </Grid>

        <Center mt={{ base: "5", md: "10" }} gap="6">
          <Box>
            <NegativeButton
              text={negativeBtnText}
              onClick={() => {
                previousPath
                  ? navigate(previousPath)
                  : navigate("/role/SuperAdmin/Districts/DistrictLookup");
              }}
            />
          </Box>
          <PositiveButton
            type="submit"
            text={positiveBtnText}
            bg="#65a30d"
            isLoading={loading}
          />
        </Center>
      </form>
    </Box>
  );
};

export default AddNewDistrict;
