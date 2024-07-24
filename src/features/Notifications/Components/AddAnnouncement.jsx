import {
  Box,
  ButtonGroup,
  Center,
  Checkbox,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
// import DoneModal from "../Popups/DonePopup";

import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { setEditAnnouncementFormData } from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading from "../../../components/FitnessComponents/FitnessTexts/Heading";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getAccouncementData,
  getUpdateAnnouncement,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

const AddAnnouncement = (props) => {
  const status = props?.dropdownText;

  const dispatch = useDispatch();
  const location = useLocation();

  const role = useSelector((state) => state?.profile?.selectedRole);
  const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);
  const userUUID = useSelector((state) => state?.profile?.userId);
  const token = useSelector((state) => state?.profile?.token);
  const message = useSelector((state) => state?.profile?.message);
  const loading = useSelector((state) => state.schoolAdmin.loading);
 
  const editAnnouncementFormData = useSelector(
    (state) => state?.districtAdmin?.editAnnouncementFormData
  );

  const code = useSelector((state) => state?.profile?.code);
  const previousPath = useSelector((state) => state?.profile?.previousPath);
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const role_obj = {
    "Super Administrator": "superAdmin",
    Student: "student",
    Teacher: "teacher",
    "School Administrator": "schoolAdmin",
    "District Administrator": "districtAdmin",
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = React.useRef(null);

  const roleBasedCheck = {
    schoolAdmin: [
      { value: "teacher", label: "Teacher" },
      { value: "student", label: "Student" },
    ],
    districtAdmin: [
      { value: "districtAdmin", label: "District Admin" },
      { value: "schoolAdmin", label: "School Admin" },
      { value: "teacher", label: "Teacher" },
      { value: "student", label: "Student" },
    ],
    superAdmin: [
      { value: "superAdmin", label: "Super Admin" },
      { value: "districtAdmin", label: "District Admin" },
      { value: "schoolAdmin", label: "School Admin" },
      { value: "teacher", label: "Teacher" },
      { value: "student", label: "Student" },
    ],
    teacher: [{ value: "student", label: "Student" }],
  };

  const initData = {
    announcement_title: "",
    desc: "",
    start_date: "",
    end_date: "",
    audience: [],
  };

  const [selectedRole, setSelectedRole] = useState(role);
  const [data, setData] = useState(initData);
  const [errors, setErrors] = useState({});
  const [selectAllCheckBox, setSelectAllCheckBox] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (name === "audience") {
      if (e.target.checked) {
        setData((prevState) => ({
          ...prevState,

          [name]: [...prevState[name], trimmedValue],
        }));
      } else {
        let audienceCopy = data.audience;
        let index = audienceCopy.indexOf(trimmedValue);
        audienceCopy.splice(index, 1);
        setData((prevState) => ({
          ...prevState,
          [name]: audienceCopy,
        }));
        selectAllCheckBox && setSelectAllCheckBox(false);
      }
    } else if (name == "announcement_title") {
      setData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
      }));
    }
    const validaionObj = validateFormData({
      [name]: trimmedValue,
    });

    if (Object.keys(validaionObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...validaionObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };

  const handleSelectAllCheckBox = (event) => {
    if (event.target.checked) {
      let audienceList = roleBasedCheck[selectedRole]?.map(
        (role) => role.value
      );
      setData((prevState) => ({
        ...prevState,
        audience: audienceList,
      }));
      setSelectAllCheckBox(true);
      setErrors((prevState) => ({
        ...prevState,
        audience: "",
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        audience: [],
      }));
      setSelectAllCheckBox(false);
      setErrors((prevState) => ({
        ...prevState,
        audience: "Please Select Audience",
      }));
    }
  };

  const handleCloseModal = () => {
    // setAddModal(false);
    dispatch(setEditAnnouncementFormData(null));
    setData(initData);
    setSelectAllCheckBox(false);
    setErrors({});
    dispatch(setPreviousPath(null));
    onClose();
  };

  useEffect(() => {
    if (data.audience?.length === roleBasedCheck[selectedRole]?.length) {
      setSelectAllCheckBox(true);
    } else {
      setSelectAllCheckBox(false);
    }
  }, [data.audience]);

  const onSubmit = (event) => {
    event.preventDefault();

    let validaionObj = validateFormData(data);

    if (Object.keys(validaionObj)?.length) {
      setErrors(validaionObj);
    } else {
      setErrors({});
      const { audience, ...rest } = data;
      const finalObj = {
        ...rest,
        audience: audience.toString(),
        creater_role: selectedRole,
        created_by: userUUID,
      };
      if (editAnnouncementFormData?.uuid) {
        dispatch(
          getUpdateAnnouncement({
            finalObj,
            uuid: editAnnouncementFormData?.uuid,
            token,
          })
        );
      } else {
        dispatch(getAccouncementData({ finalObj, token }));
      }
    }
  };

  useEffect(() => {
    if (code === 200) {
      handleCloseModal();
    }
  }, [code]);

  useEffect(() => {
    if (editAnnouncementFormData?.uuid?.length > 0) {
      const { announcement_title, desc, start_date, end_date, audience } =
        editAnnouncementFormData;
      setData({
        announcement_title,
        desc,
        start_date: start_date?.split("T")[0],
        end_date: end_date?.split("T")[0],
        // audience: audience?.split(","),
      });
      if (audience === "All") {
        let audienceList = roleBasedCheck[selectedRole]?.map(
          (role) => role.value
        );
        setData((prevState) => ({
          ...prevState,
          audience: audienceList,
        }));
        setSelectAllCheckBox(true);
      } else {
        let arr = audience?.split(",").map((item) => role_obj[item.trim()]);

        setData((prevState) => ({
          ...prevState,
          audience: arr,
        }));
        if (arr?.length === roleBasedCheck[selectedRole]?.length) {
          setSelectAllCheckBox(true);
        }
      }
    }
  }, [editAnnouncementFormData]);
  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
    dispatch(setPreviousPath(location?.pathname));
  }, [isOpen]);

  return (
    <>
      <Box
        color="black"
        mb={{ base: "0", md: "0.5", lg: "0" }}
        onClick={onOpen}
        role="button"
      >
        <TextIcon
          text={"Add Announcement"}
          icon={MdAddCircle}
          increaseTextSize="increaseTextSize"
        />
      </Box>

      <Modal
        isCentered
        onClose={() => {
          handleCloseModal();
        }}
        isOpen={
          isOpen ||
          ((rolesAndPrevilegesObject?.["Notification System Administration"]
            ?.edit ??
            true) &&
            editAnnouncementFormData?.uuid?.length)
        }
        borderRadius={4}
        size="5xl"
      >
        <ModalOverlay />
        <ModalContent m="2">
          <ModalCloseButton
            onClick={() => {
              handleCloseModal();
            }}
          />
          <ModalBody>
            <form onSubmit={onSubmit}>
              <>
                <Heading>ADD ANNOUNCEMENT</Heading>

                <Box mt="3">
                  <Inputs
                    id={"announcementTitle"}
                    label={"Annoucement Title*"}
                    placeholder="Write your title here"
                    name={"announcement_title"}
                    value={data?.announcement_title}
                    onBlur={handleBlur}
                    onChange={onChange}
                    error={
                      errors?.["announcement_title"] &&
                      errors?.["announcement_title"]
                    }
                  />
                </Box>
              </>

              <Box>
                <Box my="3">
                  <Label1 name="announcementDescription">Description*</Label1>
                </Box>

                <Box id="announcementDescription">
                  <JoditEditor
                    disabled={true}
                    setReadonly={true}
                    className="text-start content-start h-[100vh]"
                    name="desc"
                    value={data?.desc}
                    onBlur={(e) => {
                      setData({
                        ...data,
                        desc: e,
                      });
                    }}
                    onChange={() => {
                      setErrors((prevState) => ({
                        ...prevState,
                        desc: "",
                      }));
                    }}
                  />
                  {errors?.desc ? <ErrorText> {errors?.desc}</ErrorText> : null}
                </Box>
              </Box>

              <Grid templateColumns="repeat(2, 1fr)" gap={6} mt="5">
                <GridItem w="100%" h="100%" bg="">
                  <Box>
                    <NormalHeading changeTextColor="black">
                      When would you like the announcement to be displayed?
                    </NormalHeading>

                    <Box
                      display={{ base: "none", md: "block", lg: "block" }}
                      mt="3"
                    >
                      <Inputs
                        id="announcementStartDate"
                        label={"Start Date*:"}
                        type="date"
                        name={"start_date"}
                        value={data?.start_date}
                        onChange={onChange}
                        max={data?.end_date}
                        error={errors?.["start_date"] && errors?.["start_date"]}
                      />{" "}
                      <br></br>
                      <Inputs
                        id="announcementEndDate"
                        label={"End Date*:"}
                        type="date"
                        name={"end_date"}
                        value={data?.end_date}
                        min={data?.start_date}
                        onChange={onChange}
                        error={errors?.["end_date"] && errors?.["end_date"]}
                      />{" "}
                    </Box>
                    <Box
                      display={{ base: "block", md: "none", lg: "none" }}
                      mt="3"
                    >
                      <Inputs
                        id="announcementStartDate"
                        label={"Start Date*:"}
                        type="date"
                        name={"start_date"}
                        value={data?.start_date}
                        onChange={onChange}
                        max={data?.end_date}
                        error={errors?.["start_date"] && errors?.["start_date"]}
                      />{" "}
                      <br></br>
                      <Inputs
                        id="announcementEndDate"
                        label={"End Date*:"}
                        type="date"
                        name={"end_date"}
                        value={data?.end_date}
                        onChange={onChange}
                        min={data?.start_date}
                        error={errors?.["end_date"] && errors?.["end_date"]}
                      />{" "}
                    </Box>
                  </Box>
                </GridItem>
                <GridItem w="100%" h="100%">
                  <Box>
                    <Label1 name="audienceList" changeTextColor="black">
                      Announcement Intended Audience*:
                    </Label1>

                    <Flex
                      color="white"
                      display={{
                        base: "flex flex-row",
                        lg: "flex",
                        md: "flex",
                      }}
                      mt="3"
                      gap="3"
                    >
                      <Box
                        onChange={handleSelectAllCheckBox}
                        marginLeft={{ base: "3rem", md: "0" }}
                        id="audienceList"
                      >
                        <Checkbox color="black" isChecked={selectAllCheckBox}>
                          <NormalHeading changeTextColor="black">
                            Select All
                          </NormalHeading>
                        </Checkbox>
                      </Box>

                      <Box
                        marginLeft={{ base: "3rem", md: "0" }}
                        id="audienceList"
                      >
                        {roleBasedCheck[selectedRole]?.map((role, index) => {
                          return (
                            <Stack id="audienceList" key={"a" + index}>
                              <Checkbox
                                color="black"
                                name="audience"
                                value={role?.value}
                                isChecked={data?.audience?.includes(
                                  role?.value
                                )}
                                onChange={onChange}
                              >
                                <NormalHeading changeTextColor="black">
                                  {role?.label}
                                </NormalHeading>
                              </Checkbox>
                            </Stack>
                          );
                        })}
                        {errors?.["audience"] && (
                          <ErrorText>{errors?.["audience"]}</ErrorText>
                        )}
                      </Box>
                    </Flex>
                  </Box>
                </GridItem>
              </Grid>
              <Center mt="5">
                <Flex minWidth="max-content" alignItems="center">
                  <ButtonGroup gap="4">
                    <NegativeButton
                      onClick={() => {
                        handleCloseModal();
                      }}
                      text={"Cancel"}
                    />

                    <PositiveButton
                      text="Save"
                      type="submit"
                      isLoading={loading}
                    />
                  </ButtonGroup>
                </Flex>
              </Center>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddAnnouncement;
