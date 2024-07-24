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
import { Link } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import { handleShowPassword } from "../../ManageUsers/Components/BasicUserInfoStudent";
import {
  postChangePassword,
  setMessage,
} from "../../../store/slices/profileSlice";
import InputPassword from "../../../components/FitnessComponents/FitnessSelect/InputPassword";
import PositiveButton from "../../../components/PositiveButton";
import NegativeButton from "../../../components/NegativeButton";
import { MyAccount } from "../Config";

const ChangePasswordPopUp = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title3, passwordText, changePasswordFields, btnText1, btnText2 } =
    MyAccount;

  const finalRef = React.useRef(null);

  const dispatch = useDispatch();

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const loading = useSelector((state) => state.profile.upLoading);
  const code = useSelector((state) => state.profile.code);

  const [data, setData] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPassword, setShowPassword] = useState({
    old_password: false,
    new_password: false,
    confirm_password: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setData({ ...data, [name]: trimmedValue });

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
    if (name === "new_password" && data.confirm_password?.length) {
      if (trimmedValue !== data.confirm_password) {
        setErrors((prevState) => ({
          ...prevState,
          confirm_password: "Password and confirm password do not match",
        }));
      } else {
        let obj = { ...errors };
        delete obj["confirm_password"];
        // delete obj[name];

        setErrors({ ...obj });
      }
    }
    if (name === "confirm_password" && trimmedValue?.length) {
      if (trimmedValue !== data.new_password) {
        setErrors((prevState) => ({
          ...prevState,
          confirm_password: "Password and confirm password do not match",
        }));
      }
    }
  };

  const formSubmitted = (event) => {
    event.preventDefault();

    let errorObj = validateFormData(data);

    setErrors(errorObj);

    if (Object.keys(errorObj)?.length === 0) {
      if (data.new_password === data.confirm_password) {
        let finalBody = {
          old_password: data.old_password,
          new_password: data.new_password,
        };
        dispatch(postChangePassword({ token, userId, body: finalBody }));
      } else {
        dispatch(
          setMessage("New Password and Confirm Password is not matching ")
        );
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
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setShowPassword({
      old_password: false,
      new_password: false,
      confirm_password: false,
    });
  };

  useEffect(() => {
    if (code) {
      handleClose();
    }
  }, [code]);

  return (
    <>
      <Box>
        <Link background="none" border="none" onClick={onOpen}>
          <Text
            fontSize={{ base: "14px", md: "13px", lg: "16px" }}
            fontFamily={"body"}
            mt="5"
            mb="3"
            textDecoration={"underline"}
          >
            {title3}
          </Text>
        </Link>
      </Box>
      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => handleClose()}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent p="5">
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody marginTop="3">
            <form onSubmit={formSubmitted}>
              <Stack spacing="3">
                <Center>
                  <Heading size="md" color="#0081c8">
                    {title3}
                  </Heading>
                </Center>
                {changePasswordFields?.map((each, id) => {
                  return (
                    <>
                      <Box maxW="100%" key={"a" + id}>
                        <InputPassword
                          id={each?.Id}
                          type={!showPassword[each.name] ? "password" : "text"}
                          name={each?.name}
                          onChange={handleChange}
                          placeholder={each.placeholder}
                          value={data?.[each.name]}
                          spanprops={() => handlePassword(each.name)}
                          error={errors?.[each?.name] && errors?.[each?.name]}
                        >
                          {handleShowPassword(showPassword[each.name])}
                        </InputPassword>
                        {each.id === "2" && (
                          <Box m="2">
                            <Text fontSize="xs">{passwordText}</Text>
                          </Box>
                        )}
                      </Box>
                    </>
                  );
                })}
              </Stack>

              <Center>
                <ButtonGroup gap="4" marginTop="5">
                  <NegativeButton
                    text={btnText1}
                    onClick={() => handleClose()}
                  />

                  <PositiveButton
                    text={btnText2}
                    isLoading={loading}
                    type="submit"
                  />
                </ButtonGroup>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordPopUp;
