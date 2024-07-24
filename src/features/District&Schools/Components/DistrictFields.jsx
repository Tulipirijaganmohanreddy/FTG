import {
  Box,
  GridItem,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";

import moment from "moment";
import "react-calendar/dist/Calendar.css";
import InputDate from "../../../components/FitnessComponents/FitnessSelect/InputDate";
import { districtData } from "../Config";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Calendar from "react-calendar";
import { FaCalendarAlt } from "react-icons/fa";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const DistrictFields = (props) => {
  const { sis_vendor_options } = districtData;

  const { data, distcrictForm, setDistcrictForm, setErrors, errors } = props;

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const statesList = useSelector((state) => state?.districtAdmin?.statesList);

  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const duplicateRole = useSelector((state) => state.profile.duplicateRole)

  const getCurrentYear = new Date().getFullYear()

  const [selectedDate, setSelectedDate] = useState(new Date(`${distcrictForm?.school_start_date}, ${getCurrentYear}`));

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);



  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleChangeDateFromCalendar = (e) => {
    setSelectedDate(e);
    const date = moment(e).format("DD MMMM");

    setDistcrictForm((prevState) => ({
      ...prevState,
      school_start_date: date,
    }));

    if (e?.getFullYear()) {
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
        "address_1",
        "address_2",
        "city",
        "zipcode",
        "phone_1",
        "phone_2",
      ].includes(name)
    ) {
      setDistcrictForm({
        ...distcrictForm,
        [name]: value,
      });
    } else {
      setDistcrictForm({
        ...distcrictForm,
        [name]: trimmedValue,
      });
    }

    const errorsObj = validateFormData({
      [name]: trimmedValue,
    });

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
    setDistcrictForm({
      ...distcrictForm,
      [name]: trimmedValue,
    });
  };

  useEffect(() => {
    if (distcrictForm?.school_start_date) {
      setDistcrictForm({
        ...distcrictForm,
        school_start_date: distcrictForm?.school_start_date,
      });

      setSelectedDate(new Date(`${distcrictForm?.school_start_date}, ${getCurrentYear}`))

      // setDateValue(distcrictForm?.school_start_date);
      distcrictForm?.school_start_date?.length;
    } else {
      setDistcrictForm({
        ...distcrictForm,
        school_start_date: distcrictForm?.school_start_date,
      });
    }
  }, [distcrictForm?.school_start_date]);

  return (
    <>
      {selectedRole === "superAdmin" && !duplicateRole ? (
        <>
          {data?.map((item, index) => {
            return (
              <GridItem key={"a" + index}>
                {item?.inputType === "select" && item.name !== "sis_vendor" && (
                  <Box>
                    <SingleSelect2
                      id={item?.Id}
                      type={item?.inputType}
                      label={item?.lable}
                      name={item?.name}
                      value={distcrictForm && distcrictForm[item?.name]}
                      optionsProps={statesList}
                      displayKey={"state"}
                      optionValue={"code"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                      placeholder="Select"
                    />
                  </Box>
                )}

                {item.name == "sis_vendor" && (
                  <Box>
                    <SingleSelect2
                      id={item?.Id}
                      placeholder="Select "
                      type={item?.inputType}
                      label={item?.lable}
                      name={item?.name}
                      value={distcrictForm && distcrictForm[item?.name]}
                      optionsProps={sis_vendor_options}
                      displayKey={"label"}
                      optionValue={"value"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}

                {item?.inputType === "date" && (
                  <InputDate
                    label={item.lable}
                    id={item.Id}
                    name={item.name}
                    type="text"
                    value={distcrictForm && distcrictForm[item?.name]}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    top="4rem"
                    translate={true}
                    error={errors?.[item?.name] && errors?.[item?.name]}
                    onClickDay={() => setIsCalendarOpen(false)}
                    isCalendarOpen={isCalendarOpen}
                    selectedDate={selectedDate}
                    handleChangeDateFromCalendar={handleChangeDateFromCalendar}
                    handleCalendarClick={handleCalendarClick}
                  />
                )}

                {item.inputType !== "select" && item.inputType !== "date" && (
                  <Box>
                    <Inputs
                      id={item?.Id}
                      type={item?.inputType}
                      label={item.lable}
                      name={item?.name}
                      onBlur={handleBlur}
                      value={distcrictForm && distcrictForm[item?.name]}
                      onChange={handleChange}
                      // max={item?.name === "sso_id" ? 100 : null}

                      isDisabled={
                        item.name === "district_sso_id" ||
                        item.name === "internal_id"
                          ? true
                          : false
                      }
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}
              </GridItem>
            );
          })}{" "}
        </>
      ) : (
        <>
          {data?.map((item, index) => {
            return (
              <GridItem colSpan="1" position="relative">
                {item?.name === "state" && (
                  <Box>
                    <SingleSelect2
                      label={item?.lable}
                      name={item?.name}
                      value={distcrictForm && distcrictForm[item?.name]}
                      optionsProps={statesList}
                      displayKey={"state"}
                      optionValue={"code"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                      disabled={
                        selectedRole !== "superAdmin" ||
                        !rolesAndPrevilegesObject["District Information"]?.edit
                          ? true
                          : false
                      }
                    />
                  </Box>
                )}

                {item.inputType === "date" && (
                  <>
                    <InputDate
                      label={item.lable}
                      id={item.Id}
                      name={item.name}
                      type="text"
                      value={distcrictForm && distcrictForm[item?.name]}
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                      onClickDay={() => setIsCalendarOpen(false)}
                      isCalendarOpen={isCalendarOpen}
                      selectedDate={selectedDate}
                      handleChangeDateFromCalendar={
                        handleChangeDateFromCalendar
                      }
                      handleCalendarClick={handleCalendarClick}
                    />
                  </>
                )}

                {item.name == "sis_vendor" && (
                  <Box>
                    <SingleSelect2
                      placeholder="Select "
                      label={item?.lable}
                      name={item?.name}
                      value={distcrictForm && distcrictForm[item?.name]}
                      optionsProps={sis_vendor_options}
                      displayKey={"label"}
                      optionValue={"value"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                      disabled={
                        !rolesAndPrevilegesObject?.["District Information"]
                          ?.edit
                      }
                    />
                  </Box>
                )}

                {item.inputType !== "select" && item.inputType !== "date" && (
                  <Box>
                    <Inputs
                      type={item?.inputType}
                      label={item.lable}
                      name={item?.name}
                      value={distcrictForm && distcrictForm[item?.name]}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                      isDisabled={
                        selectedRole !== "superAdmin" ||
                        !rolesAndPrevilegesObject?.["District Information"]
                          ?.edit
                          ? item.name === "district_name" ||
                            item.name === "district_sso_id" ||
                            item.name === "zipcode"
                            ? true
                            : false
                          : false
                      }
                    />
                  </Box>
                )}
              </GridItem>
            );
          })}
        </>
      )}
    </>
  );
};

export default DistrictFields;
