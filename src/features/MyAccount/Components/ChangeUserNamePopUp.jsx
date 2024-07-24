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
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  postChangeUserName,
  setMessage,
} from "../../../store/slices/profileSlice";
import { MyAccount } from "../Config";

const ChangeUserNamePopUp = () => {
  const { title2, changeUsernameFields, btnText1, btnText2 } = MyAccount;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const loading = useSelector((state) => state.profile.upLoading);
  const code = useSelector((state) => state.profile.code);

  const [data, setData] = useState({
    old_user_name: "",
    new_user_name: "",
    confirm_user_name: "",
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
  };

  const formSubmitted = (event) => {
    event.preventDefault();
    let errorObj = validateFormData(data);

    setErrors(errorObj);

    if (Object.keys(errorObj)?.length === 0) {
      if (data.new_user_name === data.confirm_user_name) {
        let finalBody = {
          old_user_name: data.old_user_name,
          user_name: data.new_user_name,
        };
        dispatch(postChangeUserName({ token, userId, body: finalBody }));
      } else {
        dispatch(setMessage("Username and Confirm UserName is not matching "));
      }
    }
  };

  const handleClose = () => {
    setErrors({});
    onClose();
    setData({
      old_user_name: "",
      new_user_name: "",
      confirm_user_name: "",
    });
  };

  useEffect(() => {
    if (code) {
      onClose();
    }
  }, [code]);

  return (
    <>
      <Box>
        <Link
          background="none"
          border="none"
          onClick={onOpen}
          fontSize="sm"
          textDecoration="underline"
          role="button"
        >
          <Text
            whiteSpace="nowrap"
            mt="5"
            fontSize={{ base: "14px", md: "13px", lg: "16px" }}
            fontFamily={"body"}
            mb="3"
            textDecoration={"underline"}
          >
            {title2}
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
                    {title2}
                  </Heading>
                </Center>

                {changeUsernameFields?.map((each, id) => {
                  return (
                    <Box maxW="100%" key={"a" + id}>
                      <Inputs
                        id={each?.Id}
                        type={each.inputType}
                        name={each?.name}
                        onChange={handleChange}
                        value={data?.[each.name]}
                        placeholder={each.placeholder}
                        error={errors?.[each?.name] && errors?.[each?.name]}
                      />
                    </Box>
                  );
                })}
              </Stack>

              <Center>
                <ButtonGroup gap="4" marginTop="5">
                  <NegativeButton
                    onClick={() => handleClose()}
                    text={btnText1}
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

export default ChangeUserNamePopUp;
