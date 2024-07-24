import {
  Box,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Radio,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import InputPassword from "../../../components/FitnessComponents/FitnessSelect/InputPassword";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { checkUniqueFields } from "../../../store/slices/superAdminSlice/superAdminSlice";
import ChangePasswordDA from "./ChangePasswordDA.jsx";
import { addUserData } from "../Config";
import { handleShowPassword } from "./BasicUserInfoStudent";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const BasicUserInfoDistrictAdmin = (props) => {
  const navigate = useNavigate();
  const {
    districtAdminInputFields,
    login,
    negativeBtnText,
    positiveBtnText,
    DistrictAdminRolesList,
    rolesLabel,
  } = addUserData;
  const [loginStatus] = login;

  const {
    setActiveTab,
    inputDetailsObj,
    setInputDetailsObj,
    errors,
    setErrors,
    uniqueErrors,
  } = props;

  const params = useParams();

  const id = params.id;
  const timerRef = useRef(null);

  const userIdRef = useRef(null);

  const userEmailRef = useRef(null);

  const userNameRef = useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile.token);

  const manageUser = useSelector((state) => state.profile.manageUser);

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const uniqueFieldsError = useSelector(
    (state) => state?.superAdmin?.uniqueFieldsResponse
  );

  const getUser = useSelector((state) => state?.profile.loggedInUserDetails);
  const previousPath = useSelector((state) => state?.profile?.previousPath);

  const loading = useSelector((state) => state?.profile?.loading);
  const userData = useSelector((state) => state?.profile?.UserData);

  const ssoId = useSelector(
    (state) => state.profile.loggedInUserDetails?.district_sso_id
  );
  const districtForDistrictAdmin = useSelector(
    (state) => state?.districtAdmin?.getDistrictForDistrictAdminResponse
  );

  const statesList = useSelector((state) => state?.districtAdmin.statesList);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  // const [errors, setErrors] = useState({});

  //useState declared for role selection in superAdmin
  const [selectedRoleOption, setSelectedRoleOption] = useState([]);
  const [inputName, setInputName] = useState(null);
  const [updateValidationCode, setValidationCode] = useState("");

  const handleDistrictSsoId = () => {
    if (selectedRole === "superAdmin") {
      if (duplicateRole) {
        return ssoId;
      }

      return districtForDistrictAdmin?.district_sso_id;
    }
    return ssoId;
  };

  const [showPassword, setShowPassword] = useState({
    password: false,
    re_enter_password: false,
  });

  //handle function for superAdmin role selection
  const handleMultiSelectRoleOption = (role) => {
    setSelectedRoleOption(role);
    setInputDetailsObj({ ...inputDetailsObj, role: role[0].value });
  };

  const handlePassword = (name) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const handleReEnterPassword = (e) => {
    const { type, name, value } = e.target;
    const trimmedValue = value.trim();

    setInputDetailsObj({
      ...inputDetailsObj,
      [name]: trimmedValue,
    });
    if (trimmedValue !== inputDetailsObj.password) {
      setErrors((prevState) => ({
        ...prevState,
        [name]: "Password and confirm password do not match",
      }));
    } else {
      let errorsCopy = errors;
      delete errorsCopy["re_enter_password"];
      setErrors(errorsCopy);
    }
  };

  const handleChange = (event) => {
    const { type, name, value } = event.target;
    const trimmedValue = value.trim();
    setInputName(name);
    if (event.target.type === "checkbox") {
      setInputDetailsObj((prevState) => ({
        ...prevState,
        [name]: event.target.checked,
      }));
    } else if (name === "email" && !params?.id) {
      setInputDetailsObj((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
        user_id: trimmedValue,
        user_name: trimmedValue,
      }));
      if (errors.email) {
        setErrors((prevState) => ({
          ...prevState,
          user_name: "Username is Required",
          user_id: "User ID is Required",
        }));
      }
      if (trimmedValue?.length) {
        let obj = { ...errors };
        delete obj["user_id"];
        delete obj["user_name"];
        setErrors({ ...obj });
      }
    } else if (event.target.type === "radio") {
      setInputDetailsObj((prevState) => ({
        ...prevState,
        login_status: trimmedValue,
      }));
    } else if (name == "password") {
      setInputDetailsObj({
        ...inputDetailsObj,
        [name]: trimmedValue,
      });
      if (
        inputDetailsObj.re_enter_password &&
        inputDetailsObj["re_enter_password"] !== trimmedValue
      ) {
        setErrors((prevState) => ({
          ...prevState,
          re_enter_password: "Password and confirm password do not match",
        }));
      } else {
        let errorsCopy = errors;

        delete errorsCopy["re_enter_password"];
        setErrors(errorsCopy);
      }
    } else if (
      [
        "first_name",
        "phone",
        "last_name",
        "middle_initial",
        "nick_name",
      ].includes(name)
    ) {
      setInputDetailsObj({
        ...inputDetailsObj,
        [name]: value,
      });
    } else {
      setInputDetailsObj({
        ...inputDetailsObj,
        [name]: trimmedValue,
      });
    }

    if (name !== "state") {
      const errorsObj = validateFormData(
        { [name]: trimmedValue },
        manageUser?.userType
      );

      if (Object.keys(errorsObj).length) {
        setErrors((prevState) => ({
          ...prevState,
          ...errorsObj,
        }));
      } else {
        let obj = { ...errors };
        delete obj[name];
        setErrors({ ...obj, ...uniqueErrors });
      }
    }
  };

  const clickToNext = (event) => {
    event.preventDefault();
    const {
      district_admin_role,
      teacher_role,
      school_admin_role,
      districts,
      state,
      role,
      ...payload
    } = inputDetailsObj;
    params?.id && delete payload["password"];
    params?.id && delete payload["re_enter_password"];

    let errorObj = validateFormData(payload);

    if (inputDetailsObj["re_enter_password"] !== inputDetailsObj["password"]) {
      errorObj["re_enter_password"] =
        "Password and confirm password do not match";
    } else {
      let errorsCopy = errors;
      delete errorsCopy["re_enter_password"];
      setErrors(errorsCopy);
    }

    setErrors((prevState) => ({ ...prevState, ...errorObj }));
    if (Object.keys(errorObj).length === 0) {
      setActiveTab(1);
    }
  };

  useEffect(() => {
    clearTimeout(userIdRef.current); // clear previous timeout

    userIdRef.current = setTimeout(() => {
      userIdRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.user_id?.length >= 2 &&
        userData?.user_id != inputDetailsObj.user_id
      ) {
        const payload = {
          user_id: inputDetailsObj.user_id,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(userIdRef.current);
  }, [inputDetailsObj.user_id]);

  useEffect(() => {
    clearTimeout(userEmailRef.current); // clear previous timeout

    userEmailRef.current = setTimeout(() => {
      userEmailRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.email?.length >= 2 &&
        userData?.email != inputDetailsObj.email
      ) {
        const payload = {
          email: inputDetailsObj.email,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(userEmailRef.current);
  }, [inputDetailsObj.email]);

  useEffect(() => {
    clearTimeout(userNameRef.current); // clear previous timeout

    userNameRef.current = setTimeout(() => {
      userNameRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.user_name?.length >= 2 &&
        userData?.user_name != inputDetailsObj.user_name
      ) {
        const payload = {
          user_name: inputDetailsObj.user_name,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(userNameRef.current);
  }, [inputDetailsObj.user_name]);
  return (
    <form onSubmit={clickToNext}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          lg: "repeat(4, 1fr)",
          md: "repeat(3, 1fr)",
        }}
        gap={{ base: "2", md: "2" }}
      >
        {districtAdminInputFields?.map((item, index) => {
          return (
            <GridItem key={item.id} colSpan="1">
              {item.inputType != "password" && item.inputType != "select" && (
                <Inputs
                  id={item.Id}
                  type={item.inputType}
                  label={item?.lable}
                  name={item?.name}
                  value={inputDetailsObj[item?.name]}
                  onChange={handleChange}
                  error={errors?.[item?.name] ? errors?.[item?.name] : ""}
                  placeholder={
                    item.name === "district_sso_id"
                      ? handleDistrictSsoId()
                      : item?.placeholder
                  }
                  isDisabled={item?.isDisabled}
                />
              )}
              {item.inputType == "select" && (
                <SingleSelect2
                  id={item.Id}
                  placeholder="Select "
                  label={item.lable}
                  onChange={handleChange}
                  name={item?.name}
                  value={inputDetailsObj[item?.name]}
                  optionsProps={statesList}
                  displayKey={"state"}
                  optionValue={"code"}
                  error={errors?.[item?.name] ? errors?.[item?.name] : ""}
                  // increaseMarginTop="2"
                />
              )}

              {item.inputType == "password" && (
                <>
                  <InputPassword
                    id={item.Id}
                    label={item.lable}
                    type={!showPassword[item?.name] ? item.inputType : "text"}
                    value={inputDetailsObj[item?.name]}
                    name={item?.name}
                    onChange={
                      item.name === "password"
                        ? handleChange
                        : handleReEnterPassword
                    }
                    isDisabled={params.id ? true : false}
                    spanprops={() => handlePassword(item?.name)}
                    error={errors?.[item?.name] ? errors?.[item?.name] : ""}
                  >
                    {handleShowPassword(showPassword[item?.name])}{" "}
                  </InputPassword>
                  {item.name === "password" && params?.id && (
                    <ChangePasswordDA />
                  )}
                </>
              )}
            </GridItem>
          );
        })}

        <Box>
          <Paragraph2> {rolesLabel} </Paragraph2>

          {DistrictAdminRolesList.map((role) => {
            return (
              <HStack mt="1">
                <Checkbox
                  id={role.Id}
                  value={inputDetailsObj?.[role.name]}
                  name={role.name}
                  isChecked={inputDetailsObj?.[role.name]}
                  onChange={handleChange}
                />
                <Label1 decreaseMarginTop="0.5" name={role.Id} textStyle={"p"}>
                  {role.lable}
                </Label1>{" "}
                {errors?.[role?.name] && (
                  <ErrorText color="red" textStyle={"p"}>
                    {errors?.[role?.name]}
                  </ErrorText>
                )}
              </HStack>
            );
          })}
        </Box>

        <GridItem>
          <>
            <Paragraph2>{loginStatus.label}</Paragraph2>

            <Stack spacing="1">
              <Radio
                id={loginStatus?.Id1}
                name={loginStatus.name}
                onChange={handleChange}
                isChecked={inputDetailsObj?.login_status == "1" ? true : false}
                value="1"
              >
                <Label1
                  name={loginStatus?.Id1}
                  decreaseMarginTop="0"
                  decreaseMarginBottom="0"
                >
                  {loginStatus.options[0]}
                </Label1>
              </Radio>
              <Radio
                id={loginStatus?.Id2}
                name={loginStatus.name}
                onChange={handleChange}
                isChecked={inputDetailsObj?.login_status == "0" ? true : false}
                value="0"
              >
                <Label1
                  name={loginStatus?.Id2}
                  decreaseMarginTop="0"
                  decreaseMarginBottom="0"
                >
                  {loginStatus.options[1]}
                </Label1>
              </Radio>
            </Stack>
          </>
          {errors?.[loginStatus.name] && (
            <ErrorText>{errors?.[loginStatus.name]}</ErrorText>
          )}
        </GridItem>
      </Grid>

      <Flex justify="center" gap="8" mt="4">
        
          <NegativeButton
            text={negativeBtnText}
            onClick={() => {
              navigate(previousPath);
            }}
          />
        

        <PositiveButton text={positiveBtnText} type="submit" />
      </Flex>
    </form>
  );
};

export default BasicUserInfoDistrictAdmin;
