import {
  Box,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  HStack,
  Radio,
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
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { checkUniqueFields } from "../../../store/slices/superAdminSlice/superAdminSlice";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import { addUserData } from "../Config";
import { handleShowPassword } from "./BasicUserInfoStudent";
import ChangePasswordDA from "./ChangePasswordDA";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";

const BasicUserInfoTeacher = (props) => {
  const {
    teacherInputFields,
    rolesLabel,
    login,
    negativeBtnText,
    positiveBtnText,
  } = addUserData;
  const [loginStatus] = login;
  const navigate = useNavigate();

  const role = useSelector((state) => state?.profile.selectedRole);
  const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);

  const manageUser = useSelector((state) => state.profile.manageUser);
  const userData = useSelector((state) => state?.profile?.UserData);

  const {
    setActiveTab,
    inputDetailsObj,
    setInputDetailsObj,
    errors,

    setErrors,
    uniqueErrors,
  } = props;

  // const [errors, setErrors] = useState({});

  const params = useParams();

  const timerRef = useRef(null);
  const dispatch = useDispatch();

  const statesList = useSelector((state) => state?.districtAdmin.statesList);

  const token = useSelector((state) => state?.profile.token);

  const previousPath = useSelector((state) => state?.profile?.previousPath);

  const [rolesList, setRolesList] = useState([]);
  const [selectedRole, setSeletedRole] = useState(role);

  const [showPassword, setShowPassword] = useState({
    password: false,
    re_enter_password: false,
  });
  const handleRolesList = () => {
    if (
      (selectedRole === "districtAdmin" || selectedRole === "superAdmin") &&
      manageUser.userType === "teacher"
    ) {
      return [
        {
          name: "district_admin_role",
          lable: "District Administrator",
          Id: "districtAdminRole",
        },
        {
          name: "school_admin_role",
          lable: "School Administrator",
          Id: "schoolAdminRole",
        },
      ];
    } else if (
      selectedRole === "schoolAdmin" &&
      manageUser.userType === "teacher"
    ) {
      return [
        {
          name: "school_admin_role",
          lable: "School Administrator",
          Id: "schoolAdminRole",
        },
      ];
    }
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

    if (event.target.type === "checkbox") {
      setInputDetailsObj((prevState) => ({
        ...prevState,
        [name]: event.target.checked,
      }));
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
          ...uniqueErrors,
        }));
      } else {
        let obj = { ...errors };
        delete obj[name];
        setErrors({ ...obj });
      }
    }
  };
  const clickToNext = (event) => {
    event.preventDefault();

    const { teacher_role, state, ...payload } = inputDetailsObj;

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
    const _rolesList = handleRolesList();
    setRolesList(_rolesList);
  }, [selectedRole]);

  useEffect(() => {
    duplicateRole ? setSeletedRole(duplicateRole) : setSeletedRole(role);
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current); // clear previous timeout

    timerRef.current = setTimeout(() => {
      timerRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.user_id?.length >= 3 &&
        userData?.user_id != inputDetailsObj.user_id
      ) {
        const payload = {
          user_id: inputDetailsObj.user_id,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [inputDetailsObj.user_id]);

  useEffect(() => {
    clearTimeout(timerRef.current); // clear previous timeout

    timerRef.current = setTimeout(() => {
      timerRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.email?.length >= 3 &&
        userData?.email != inputDetailsObj.email
      ) {
        const payload = {
          email: inputDetailsObj.email,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [inputDetailsObj.email]);

  useEffect(() => {
    clearTimeout(timerRef.current); // clear previous timeout

    timerRef.current = setTimeout(() => {
      timerRef.current = null; // Reset timerRef when timer finally ends

      if (
        inputDetailsObj.user_name?.length >= 3 &&
        userData?.user_name != inputDetailsObj.user_name
      ) {
        const payload = {
          user_name: inputDetailsObj.user_name,
        };
        dispatch(checkUniqueFields({ body: payload, token }));
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [inputDetailsObj.user_name]);
  return (
    <>
      <form onSubmit={clickToNext}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(4, 1fr)" }}
          gap="3"
        >
          {teacherInputFields?.map((item, index) => {
            return (
              <GridItem key={item.id} colSpan="1">
                {item.inputType != "password" && item.inputType != "select" && (
                  <Inputs
                    id={item?.Id}
                    type={item.inputType}
                    label={item?.lable}
                    name={item?.name}
                    value={inputDetailsObj[item?.name]}
                    onChange={handleChange}
                    error={errors?.[item?.name] ? errors?.[item?.name] : ""}
                  />
                )}
                {item.inputType == "select" && (
                  <SingleSelect2
                    id={item?.Id}
                    placeholder="Select "
                    label={item.lable}
                    onChange={handleChange}
                    name={item?.name}
                    value={inputDetailsObj[item?.name]}
                    optionsProps={statesList}
                    displayKey={"state"}
                    optionValue={"code"}
                    error={errors?.[item?.name] ? errors?.[item?.name] : ""}
                  />
                )}
                {item.inputType == "password" && (
                  <>
                    <InputPassword
                      id={item?.Id}
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
                    {selectedRole === "districtAdmin" &&
                      item.name === "password" &&
                      params?.id && <ChangePasswordDA />}
                  </>
                )}
              </GridItem>
            );
          })}
          <GridItem>
            {rolesList?.length ? (
              <Box>
                <Paragraph2 textStyle={"p"}>{rolesLabel}</Paragraph2>
                {rolesList?.map((role) => {
                  return (
                    <HStack textAlign={"center"}>
                      <Checkbox
                        id={role.Id}
                        value={inputDetailsObj?.[role.name]}
                        name={role.name}
                        isChecked={inputDetailsObj?.[role.name]}
                        onChange={handleChange}
                      />
                      <Label1
                        decreaseMarginTop="0.5"
                        name={role.Id}
                        textStyle={"p"}
                      >
                        {role.lable}
                      </Label1>
                      {errors?.[role?.name] && (
                        <ErrorText color="red" textStyle={"p"}>
                          {errors?.[role?.name]}
                        </ErrorText>
                      )}
                    </HStack>
                  );
                })}
              </Box>
            ) : null}
          </GridItem>
          <GridItem>
            <>
              <Paragraph2>{loginStatus.label}</Paragraph2>

              <Stack spacing="1">
                <Radio
                  id={loginStatus?.Id1}
                  name={loginStatus.name}
                  onChange={handleChange}
                  isChecked={
                    inputDetailsObj?.login_status == "1" ? true : false
                  }
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
                  isChecked={
                    inputDetailsObj?.login_status == "0" ? true : false
                  }
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
    </>
  );
};

export default BasicUserInfoTeacher;
