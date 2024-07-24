import {
  Box,
  ButtonGroup,
  Center,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { changePasswordDA } from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import InputPassword from "../../../components/FitnessComponents/FitnessSelect/InputPassword";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { changePassword } from "../Config";
import {
  postChangePassword,
  setContactsKey,
  setMessage,
} from "../../../store/slices/profileSlice";
import { handleShowPassword } from "./BasicUserInfoStudent";

const ChangePasswordDA = () => {
  const {
    passwordValidation1,
    passwordValidation2,
    changePasswordFields,
    title,
    negativeBtnText,
    positiveBtnText,
  } = changePassword;
  const { isOpen, onOpen, onClose } = useDisclosure();

  const params = useParams();

  const finalRef = React.useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const loading = useSelector((state) => state.profile.upLoading);
  const code = useSelector((state) => state.profile.code);
  const manageUser = useSelector((state) => state.profile.manageUser);
  const contactsKey = useSelector((state) => state.profile.contactsKey);

  const [data, setData] = useState({
    password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirm_password: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (errors.password) {
      const errorsObj = validateFormData({
        [event.target.name]: event.target.value,
      });

      if (Object.keys(errorsObj).length) {
        setErrors((prevState) => ({
          ...prevState,
          ...errorsObj,
        }));
      } else {
        let obj = { ...errors };
        delete obj[event.target.name];
        setErrors({ ...obj });
      }
    }

    if (event.target.name === "password" && data.confirm_password?.length) {
      if (event.target.value !== data.confirm_password) {
        setErrors((prevState) => ({
          ...prevState,
          confirm_password: "Password and confirm password do not match",
        }));
      } else {
        let obj = { ...errors };
        delete obj["confirm_password"];
        // delete obj[event.target.name];

        setErrors({ ...obj });
      }
    }

    if (
      event.target.name === "confirm_password" &&
      event.target.value?.length
    ) {
      if (event.target.value !== data.password) {
        setErrors((prevState) => ({
          ...prevState,
          confirm_password: "Password and confirm password do not match",
        }));
      } else {
        let obj = { ...errors };
        delete obj["confirm_password"];
        setErrors({ ...obj });
      }
    }
  };

  const formSubmitted = () => {
    // let errorObj = validateFormData(finalPayload, manageUser?.userType);
    let errorObj = validateFormData(data, manageUser?.userType);

    setErrors((prevState) => ({
      ...prevState,
      ...errorObj,
    }));

    if (Object.keys(errorObj)?.length === 0) {
      if (data.password === data.confirm_password) {
        if (contactsKey) {
          let finalBody = {
            type: "prompt",
            new_password: data.password,
          };
          dispatch(postChangePassword({ token, userId, body: finalBody }));
        } else {
          let finalBody = {
            new_password: data.password,
            uuid: params?.id,
          };

          dispatch(changePasswordDA({ token, body: finalBody }));
        }
      }
    }
  };

  const handlePassword = (name) => {
    setShowPassword((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };
  const handleClose = () => {
    setErrors({});
    onClose();
    setData({
      password: "",
      confirm_password: "",
    });
    setShowPassword({
      password: false,
      confirm_password: false,
    });
  };

  useEffect(() => {
    if (code) {
      contactsKey ? dispatch(setContactsKey(null)) : null;
      onClose();
    }
  }, [code]);

  return (
    <>
      <Box>
        {contactsKey ? null : (
          <Link background="none" border="none" onClick={onOpen}>
            <Text
              fontSize={{ base: "14px", md: "13px", lg: "16px" }}
              fontFamily={"body"}
              mt="1"
              textDecoration={"underline"}
            >
              {title}
            </Text>
          </Link>
        )}
      </Box>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen || contactsKey}
        onClose={() => handleClose()}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent p="5">
          {contactsKey ? null : (
            <ModalCloseButton onClick={() => handleClose()} />
          )}
          <ModalBody marginTop="3">
            <Stack spacing="3">
              <Center>
                <Heading size="md" color="#0081c8">
                  {title}
                </Heading>
              </Center>

              {changePasswordFields?.map((each, id) => {
                return (
                  <>
                    <Box maxW="100%" key={"a" + id}>
                      <InputPassword
                        type={!showPassword[each.name] ? "password" : "text"}
                        name={each?.name}
                        onChange={handleChange}
                        placeholder={each.placeholder}
                        spanprops={() => handlePassword(each.name)}
                        error={errors?.[each?.name] && errors?.[each?.name]}
                      >
                        {handleShowPassword(showPassword[each.name])}
                      </InputPassword>
                      {each.id === "1" && (
                        <Box m="2">
                          <Text fontSize="xs" p="1">
                            {manageUser?.userType === "student"
                              ? `${passwordValidation1}`
                              : `${passwordValidation2}`}
                          </Text>
                        </Box>
                      )}
                    </Box>
                  </>
                );
              })}
            </Stack>
            {contactsKey ? (
              <Center marginTop="5">
                <Box onClick={(event) => formSubmitted(event)}>
                  <PositiveButton text={"Reset"} isLoading={loading} />
                </Box>
              </Center>
            ) : (
              <>
                <Center>
                  <ButtonGroup gap="4" marginTop="5">
                    <Box onClick={() => handleClose()}>
                      <NegativeButton text={negativeBtnText} />
                    </Box>

                    <Box onClick={(event) => formSubmitted(event)}>
                      <PositiveButton
                        text={positiveBtnText}
                        isLoading={loading}
                      />
                    </Box>
                  </ButtonGroup>
                </Center>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordDA;