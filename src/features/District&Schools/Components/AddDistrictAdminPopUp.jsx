import {
  Box,
  ButtonGroup,
  Center,
  Flex,
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  setManageUser,
  setMessage,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getAdminToDistrict,
  getDistrictAdminUsers,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setManageUsersSelectedDropdownText } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { addAdministrator } from "../Config";

const AddDistrictAdminPopUp = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const {
    title,
    popUpTitle,
    addNewUserText,
    negativeBtnText,
    positiveBtnText,
  } = addAdministrator;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const location = useLocation();
  const finalRef = React.useRef(null);

  const distrcitIDForDistrict = useSelector(
    (state) => state?.superAdmin?.distrcitIDForDistrict
  );

  const loading = useSelector((state) => state.profile.upLoading);
  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const userId = useSelector((state) => state?.profile?.userId);
  const token = useSelector((state) => state?.profile?.token);
  const code = useSelector((state) => state.profile.code);

  const districtAdminUsers = useSelector(
    (state) => state.superAdmin.districtAdminUsers
  );

  const districtAdmins = useSelector(
    (state) =>
      state?.districtAdmin?.getDistrictForDistrictAdminResponse?.AdminDistrict
  );

  const [districtAdminOptions, setDistrictAdminOptions] = useState([]);
  const [data, setData] = useState({
    user_uuid: "",
  });

  const districtId = distrcitIDForDistrict?.uuid;

  const handleChange = (e) => {
    setData((prevState) => ({ ...prevState, user_uuid: e.value }));
  };

  const handleInputChange = debounce((searchText) => {
    // setData((prevState) => ({ ...prevState, user_uuid: searchText }));
    if (searchText?.length > 2)
      dispatch(
        getDistrictAdminUsers({
          token: token,
          district_uuid: params?.districtId,
          body: { search: searchText },
        })
      );
  }, 1000);

  const handleUserAddition = () => {
    if (selectedRole === "stateAdmin") {
      dispatch(
        setManageUser({
          userType: "districtAdmin",
          formTitle: `Add District Administrator`,
          previousPath: location.pathname,
        })
      );

      navigate(`/role/${selectedRole}/AddUser`, {
        state: { role: "districtAdmin" },
      });

      dispatch(setManageUsersSelectedDropdownText(""));
    } else {
      dispatch(
        setManageUser({
          userType: "districtAdmin",
          formTitle: `Add District Administrator`,
          previousPath: location.pathname,
        })
      );

      navigate("/role/SuperAdmin/Districts/AddUser", {
        state: {
          districtId: districtId,
        },
      });
      dispatch(setPreviousPath(location.pathname));
    }
  };

  const handleClose = () => {
    onClose();
    setData({
      user_uuid: "",
    });
  };
  const handleOpen = () => {
    onOpen();
    setData({
      user_uuid: "",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const finalData = {
      user_uuid: data?.user_uuid,
      updated_by: userId,
      updater_role: selectedRole,
    };
    data?.user_uuid
      ? dispatch(
          getAdminToDistrict({
            body: finalData,
            token,
            districtId: params?.districtId,
          })
        )
      : dispatch(setMessage("Please select user"));
  };

  useEffect(() => {
    if (districtAdminUsers?.length) {
      const existingUserIds =
        districtAdmins?.length && districtAdmins?.map((user) => user.uuid);

      let arr = [];

      districtAdminUsers?.forEach((user) => {
        if (existingUserIds?.length && !existingUserIds?.includes(user?.uuid)) {
          let obj = { label: user.email, value: user.uuid };
          arr.push(obj);
        } else if (!existingUserIds?.length) {
          let obj = { label: user.email, value: user.uuid };
          arr.push(obj);
        }
      });

      setDistrictAdminOptions([...arr]);
    } else {
      setDistrictAdminOptions([]);
    }
  }, [districtAdminUsers]);

  useEffect(() => {
    if (isOpen && selectedRole === "superAdmin" && !duplicateRole) {
      dispatch(
        getDistrictAdminUsers({
          token: token,
          district_uuid: params?.districtId,
          body: { search: "" },
        })
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (code === 200) {
      handleClose();
    }
  }, [code]);

  return (
    <>
      <Box role="button">
        <TextIcon
          text={title}
          icon={MdAddCircle}
          onClick={() => handleOpen()}
          increaseTextSize="increaseTextSize"
        />
      </Box>

      <Modal
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={() => handleClose()}
        borderRadius={4}
        isCentered
      >
        <ModalOverlay />
        <ModalContent p="4">
          <ModalCloseButton />
          <ModalBody p={{ base: "0", lg: "2" }}>
            <Box ml="4" mt={{ base: "1rem", md: "1rem" }}>
              <Heading1 textColor="primary">{popUpTitle}</Heading1>
            </Box>

            <Flex mt="2" justifyContent="flex-end" alignItems="center" mr="5">
              <Spacer display={{ base: "none", md: "block" }} />
              <Box role="button">
                <TextIcon
                  text={addNewUserText}
                  icon={MdAddCircle}
                  onClick={handleUserAddition}
                  increaseTextSize="increaseTextSize"
                />
              </Box>
            </Flex>

            <form onSubmit={handleSubmit}>
              <Box px={{ base: "5", md: "2" }}>
                <Box mb={{ base: "2", md: "5" }}>
                  <ChakraSelect
                    label={"User Email"}
                    id="userEmail"
                    name="uuid"
                    onChange={handleChange}
                    onInputChange={handleInputChange}
                    options={districtAdminOptions}
                  />
                </Box>
                <Inputs
                  label={"At District"}
                  id="districtName"
                  value={props?.district_name}
                  isDisabled
                />

                <Spacer />

                <Center mt="5" mb="5">
                  <ButtonGroup gap="4">
                    <NegativeButton
                      text={negativeBtnText}
                      onClick={() => handleClose()}
                    />
                    <PositiveButton
                      type="submit"
                      text={positiveBtnText}
                      isLoading={loading}
                    />
                  </ButtonGroup>
                </Center>
              </Box>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddDistrictAdminPopUp;
