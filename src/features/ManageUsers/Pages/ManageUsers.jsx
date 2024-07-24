import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Select,
  Spacer,
  Spinner
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileExport } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import addCircleIcon from "../../../assets/Images/DistrictAdminContentImages/Icon ionic-ios-add-circle.svg";
import { ManageUsersData } from "../Config";

import {
  getAllUsersList,
  setAllUsers,
  setLoading,
  setTotalPages,
} from "../../teacher/teacherSlice";

import { getExportUsers } from "../../authentication/components/schoolAdmin/schoolAdminSlice";

import moment from "moment";
import "react-calendar/dist/Calendar.css";
import { MdAddCircle } from "react-icons/md";
import { debounce } from "../../../Utilities/utils";
import InputDate from "../../../components/FitnessComponents/FitnessSelect/InputDate";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import IconText from "../../../components/FitnessComponents/FitnessTexts/IconText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import SelectAction from "../../../components/GlobalComponents/SelectAction/Pages/SelectAction";
import TextIcon from "../../../components/TextIcon";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import ManageUsersAssignmentTextIcon from "../Components/ManageUsersAssignmentTextIcon";
import { TanstackTableVirtualized } from "../Components/TanstackTableVirtualized";

const ManageUsers = () => {
  const {
    title,
    userDetails,
    USERS_OBJ,
    searchPlaceholder,
    actionOptions,
    actionValues,
    exportUsers,
    districtAdminActionOptions,
    districtAdminActionValues,
    teacherActionOptions,
    teacherActionValues,
    fileName,
  } = ManageUsersData;

  const [userType, school, loginStatus, birthDate, assignmentStatus, grades] =
    userDetails;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchInputRef = useRef(null);
  const timerRef = useRef(null);

  const location = useLocation();

  const role = useSelector((state) => state.profile.selectedRole);

  const token = useSelector((state) => state.profile.token);

  const schoolsList = useSelector((state) => state.teacher.schools);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const manageUser = useSelector((state) => state?.profile?.manageUser);

  const userRolesList = useSelector(
    (state) => state?.schoolAdmin?.userRolesList
  );

  const loading = useSelector((state) => state?.schoolAdmin?.loading);

  const code = useSelector((state) => state?.profile?.code);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedSchools, setSelectedSchools] = useState();
  const [selectedUsersInfo, setSelectedUsersInfo] = useState([]);

  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role);

  const [formData, setFormData] = useState({
    schools: null,
    date_of_birth: "",
    search: "",
    login_status: "all",
    grade: "",
    user_type: manageUser?.userType ?? userRolesList?.[0],
    assigned: "all",
    size: 1000,
    skip: 1,
  });

  const birthDateRef = useRef("");

  const [schoolArray, setSchoolArray] = useState([]);

  const handleCalendarClick = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleChangeDateFromCalendar = (e) => {
    setSelectedDate(e);
    const date = moment(e).format("MM/DD/YYYY");

    // birthDateRef.current = date;
    setFormData((prevState) => ({
      ...prevState,
      date_of_birth: date,
      skip: 1,
    }));
  };

  const handleSchools = (selectedSchoolsList) => {
    formData.search && (searchInputRef.current.value = "");
    birthDateRef.current = formData.date_of_birth;

    if (
      selectedSchoolsList?.length > 1 &&
      selectedSchoolsList[0].label == "All"
    ) {
      setSelectedSchools([selectedSchoolsList?.[1]]);

      setFormData((prevState) => ({
        ...prevState,
        schools: [selectedSchoolsList[1]?.value],
        search: "",
        skip: 1,
      }));
    } else {
      let all_value = null;
      if (selectedSchoolsList?.length) {
        for (let school of selectedSchoolsList) {
          if (school.label == "All") {
            all_value = school;
            break;
          }
        }
      }

      if (all_value) {
        setSelectedSchools([all_value]);
        if (selectedRole !== "districtAdmin") {
          const schoolItemsList = schoolsList?.length
            ? schoolsList?.map((each) => each.uuid)
            : [];

          setFormData((prevState) => ({
            ...prevState,
            schools: schoolItemsList,
            search: "",
            skip: 1,
          }));
        } else {
          setFormData((prevState) => ({
            ...prevState,
            schools: all_value.value,
            search: "",
            skip: 1,
          }));
        }
      } else {
        setSelectedSchools(selectedSchoolsList);
        setFormData((prevState) => ({
          ...prevState,
          schools: selectedSchoolsList?.map((school) => school.value),
          search: "",
          skip: 1,
        }));
      }
    }
  };

  const handleChange = (event) => {
    if (event.target.name != "data_of_birth") {
      birthDateRef.current = formData.date_of_birth;
    }

    if (event.target.name === "user_type") {
      dispatch(setManageUser({ ...manageUser, userType: event.target.value }));
      formData.search && (searchInputRef.current.value = "");
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
        assigned: "all",
        grade: "",
        date_of_birth: "",
        search: "",
        login_status: "all",
        skip: 1,
      }));

      setUserIds([]);
      setIsAllChecked(false);
    } else if (event.target.name === "login_status") {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]:
          event.target.value === "all"
            ? "all"
            : event.target.value === "true"
            ? true
            : false,

        skip: 1,
      }));
    } else if (event.target.name === "date_of_birth") {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,

        skip: 1,
      }));
    } else if (event.target.name === "assigned") {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]:
          event.target.value === "all"
            ? "all"
            : event.target.value === "true"
            ? true
            : false,

        skip: 1,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,

        skip: 1,
      }));
    }
  };

  const searchHandleChange = debounce((event) => {
    setFormData((prevState) => ({
      ...prevState,
      skip: 1,
      [event.target.name]: event.target.value,
    }));
    birthDateRef.current = formData.date_of_birth;
  }, 500);

  const clickToNavigate = () => {
    if (selectedRole !== "districtAdmin") {
      if (selectedRole === "teacher" && manageUser?.userType === "student") {
        dispatch(
          setManageUser({
            formTitle: `Request to Add ${USERS_OBJ[manageUser?.userType]}`,
            userType: manageUser?.userType,
          })
        );
      } else if (selectedRole !== manageUser?.userType) {
        dispatch(
          setManageUser({
            formTitle: `Add ${USERS_OBJ[manageUser?.userType]}`,
            userType: manageUser?.userType,
          })
        );
      } else {
        dispatch(
          setManageUser({
            formTitle: `Request ${USERS_OBJ[manageUser?.userType]}`,
            userType: manageUser?.userType,
          })
        );
      }
    } else {
      dispatch(
        setManageUser({
          formTitle: `Add ${USERS_OBJ[manageUser?.userType]}`,
          userType: manageUser?.userType,
        })
      );
    }

    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${selectedRole}/AddUser`);
  };

  const handleTitleChange = () => {
    if (selectedRole !== "districtAdmin") {
      if (selectedRole === "teacher" && manageUser?.userType === "student") {
        return `Request to Add ${USERS_OBJ[manageUser?.userType]}`;
      }
      if (selectedRole !== manageUser?.userType) {
        return `Add ${USERS_OBJ[manageUser?.userType]}`;
      }
      return `Request ${USERS_OBJ[manageUser?.userType]}`;
    }
    return `Add ${USERS_OBJ[manageUser?.userType]}`;
  };

  const handleExportUsers = () => {
    let body = {
      ...formData,
      user_uuids: userIds,
    };
    dispatch(getExportUsers({ token, body }));
  };
  useEffect(() => {
    if (formData.schools) {
      let final_body = {
        ...formData,
      };
      if (formData?.search?.length != 1) {
        dispatch(setAllUsers([]));
        dispatch(setTotalPages(0));

        birthDateRef.current === formData.date_of_birth &&
          dispatch(getAllUsersList({ token, body: final_body }));
      }
    }

    isAllChecked && setIsAllChecked(false);
    userIds?.length && setUserIds([]);
  }, [formData]);

  useEffect(() => {
    if (code === 200) {
      let final_body = {
        ...formData,
      };

      formData?.user_type;
      dispatch(getAllUsersList({ token, body: final_body }));
    }
  }, [code]);

  useEffect(() => {
    if (!manageUser?.userType) {
      dispatch(setManageUser({ userType: userRolesList?.[0] }));
      setFormData((prevState) => ({
        ...prevState,
        user_type: userRolesList?.[0],
        skip: 1,
      }));
    }
  }, [userRolesList]);

  useEffect(() => {
    if (!userIds?.length) {
      setSelectedUsersInfo([]);
    }
  }, [userIds]);

  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);

    if (schoolsList?.length) {
      let schoolOptions = [];
      const schoolUuidArray =
        schoolsList?.length &&
        schoolsList.map((each) => {
          schoolOptions.push({ label: each.school_name, value: each.uuid });
          return each.uuid;
        });

      schoolOptions.unshift({ label: "All", value: "all" });
      setSelectedSchools([{ label: "All", value: "all" }]);
      setSchoolArray(schoolOptions);

      setFormData((prevState) => ({
        ...prevState,
        schools:
          selectedRole === "schoolAdmin" || selectedRole === "teacher"
            ? schoolUuidArray
            : "all",
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        schools:
          selectedRole === "schoolAdmin" || selectedRole === "teacher"
            ? []
            : "all",
      }));
      setSchoolArray([]);
    }

    return () => {
      dispatch(setAllUsers(null));
      dispatch(setTotalPages(0));
    };
  }, []);

  useEffect(() => {
    clearTimeout(timerRef.current); // clear previous timeout

    timerRef.current = setTimeout(() => {
      timerRef.current = null; // Reset timerRef when timer finally ends

      if (birthDateRef.current != formData.date_of_birth) {
        let final_body = {
          ...formData,
        };

        dispatch(getAllUsersList({ token, body: final_body }));

        isAllChecked && setIsAllChecked(false);
        userIds?.length && setUserIds([]);
      }
    }, 500);

    return () => clearTimeout(timerRef.current);
  }, [formData.date_of_birth]);

  return (
    <Flex gap="4" direction="column">
      <Heading1>{title}</Heading1>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{ base: "1", lg: 1, md: 1 }}
      >
        <GridItem colSpan="1">
          <Box key={userType.id}>
            <Label1 name={userType?.Id}>{userType.lable}</Label1>

            <Select
              id={userType.Id}
              size="sm"
              rounded="lg"
              w={{ base: "100%", md: "90%", lg: "90%" }}
              textStyle={"p"}
              onChange={(e) => handleChange(e)}
              name="user_type"
              value={formData?.user_type}
              border="none"
              bg="head2"
            >
              {userRolesList?.length &&
                userRolesList?.map((value, i) => {
                  return (
                    <option key={i} value={value}>
                      {USERS_OBJ[value]}{" "}
                    </option>
                  );
                })}
            </Select>
          </Box>
        </GridItem>

        <GridItem colSpan="1">
          <MultiSelector
            id={school?.Id}
            label={school?.lable}
            options={
              selectedSchools?.[0]?.label != "All" ? schoolArray : schoolArray
            }
            onChange={handleSchools}
            value={selectedSchools}
          />
        </GridItem>

        <GridItem colSpan="1">
          <SingleSelect2
            id={loginStatus.Id}
            label={loginStatus?.lable}
            onChange={(e) => handleChange(e)}
            name={loginStatus.name}
            optionsProps={loginStatus.options}
            displayKey={"lable"}
            optionValue={"value"}
            value={formData?.login_status}
          />
        </GridItem>

        {manageUser?.userType === "student" ? (
          <>
            <GridItem colSpan="1" position="relative">
              <InputDate
                label={"Birth Date"}
                id={birthDate.Id}
                name={birthDate.name}
                type={birthDate.type}
                top="4rem"
                translate={true}
                onClickDay={() => setIsCalendarOpen(false)}
                isCalendarOpen={isCalendarOpen}
                selectedDate={selectedDate}
                handleChangeDateFromCalendar={handleChangeDateFromCalendar}
                handleCalendarClick={handleCalendarClick}
                value={formData?.date_of_birth}
                onChange={(e) => {
                  handleChange(e);
                }}
                placeholder={birthDate.placeholder}
              />
            </GridItem>

            <GridItem colSpan="1">
              <SingleSelect2
                id={grades.Id}
                placeholder="Select Grade"
                label={grades?.lable}
                onChange={(e) => handleChange(e)}
                name={grades.name}
                optionsProps={grades.options}
                displayKey={"lable"}
                optionValue={"value"}
              />
            </GridItem>
          </>
        ) : null}

        {manageUser?.userType !== "districtAdmin" ? (
          <>
            <GridItem colSpan="1">
              <SingleSelect2
                id={assignmentStatus?.Id}
                name={assignmentStatus.name}
                onChange={handleChange}
                label={assignmentStatus.lable}
                optionsProps={assignmentStatus?.options}
                displayKey={"lable"}
                optionValue={"value"}
                value={formData?.assigned}
              />
            </GridItem>
          </>
        ) : null}
      </Grid>

      <Divider />

      <Box textTransform={"uppercase"}>
        <Heading2>{USERS_OBJ[manageUser?.userType]}</Heading2>
      </Box>

      <HStack>
        <HStack spacing={{ base: "2", md: "8", lg: "8" }}>
          <Box>
            <SearchComponent
              placeholder="Search by Alphabet,Names or User ID"
              id="searchUser"
              name="search"
              display={{ base: "flex", lg: "flex", md: "flex" }}
              onChange={(e) => searchHandleChange(e)}
              ref={searchInputRef}
              // value={formData.search}
            />
          </Box>

          <SelectAction
            role={USERS_OBJ[manageUser?.userType]}
            actionOptions={
              selectedRole !== "districtAdmin"
                ? teacherActionOptions
                : manageUser?.userType !== "districtAdmin"
                ? actionOptions
                : districtAdminActionOptions
            }
            actionValues={
              selectedRole !== "districtAdmin"
                ? teacherActionValues
                : manageUser?.userType !== "districtAdmin"
                ? actionValues
                : districtAdminActionValues
            }
            setUserIds={setUserIds}
            selectedUsersInfo={selectedUsersInfo}
            setSelectedUsersInfo={setSelectedUsersInfo}
            userIds={userIds}
            setIsAllChecked={setIsAllChecked}
            userType={manageUser?.userType}
            schoolUUID={selectedSchools && selectedSchools[0]?.value}
          />
        </HStack>

        <Spacer />

        <HStack spacing={{ base: "0", md: "8", lg: "5" }}>
          {rolesAndPrevilegesObject?.["Manage Users"]?.is_add ?? true ? (
            <HStack
              cursor="pointer"
              onClick={clickToNavigate}
              display={{ base: "none", md: "flex", lg: "flex" }}
              role="button"
            >
              <ManageUsersAssignmentTextIcon
                text={handleTitleChange()}
                icon={addCircleIcon}
                onClick={() => {
                  clickToNavigate;
                }}
              />
            </HStack>
          ) : (
            <HStack
              cursor="not-allowed"
              display={{ base: "none", md: "flex", lg: "flex" }}
            >
              <ManageUsersAssignmentTextIcon
                text={handleTitleChange()}
                icon={addCircleIcon}
              />
            </HStack>
          )}
          {loading ? (
            <Flex gap="2" display={{ base: "none", md: "flex", lg: "flex" }}>
              <IconText increaseTextSize="increaseTextSize">
                {" "}
                {exportUsers}{" "}
              </IconText>
              <Spinner color="primary" />
            </Flex>
          ) : (
            <Box
              onClick={handleExportUsers}
              role="button"
              display={{ base: "none", md: "flex" }}
            >
              <TextIcon
                text={exportUsers}
                icon={FaFileExport}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          )}
        </HStack>
      </HStack>

      <HStack
        display={{ base: "flex", md: "none", lg: "none" }}
        alignItems="center"
        justifyContent={"space-around"}
      >
        {rolesAndPrevilegesObject?.["Manage Users"]?.is_add ?? true ? (
          <HStack flexDirection="row" onClick={clickToNavigate}>
            <Box color="black" role="button">
              <TextIcon
                text={handleTitleChange()}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </HStack>
        ) : (
          <HStack flexDirection="row">
            <Box color="black">
              <TextIcon
                text={handleTitleChange()}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </HStack>
        )}
        {loading ? (
          <Flex gap="2">
            <IconText increaseTextSize="increaseTextSize">
              {" "}
              {exportUsers}{" "}
            </IconText>
            <Spinner color="primary" />
          </Flex>
        ) : (
          <Box onClick={handleExportUsers} role="button">
            <TextIcon
              text={exportUsers}
              icon={FaFileExport}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        )}
      </HStack>

      <TanstackTableVirtualized
        userIds={userIds}
        setUserIds={setUserIds}
        selectedUsersInfo={selectedUsersInfo}
        setSelectedUsersInfo={setSelectedUsersInfo}
        setIsAllChecked={setIsAllChecked}
        isAllChecked={isAllChecked}
        pageNumber={formData.skip}
        setFormData={setFormData}
        formData={formData}
        birthDateRef={birthDateRef}
      />

      {/* <ManageUsersTanstackTable  usersList={usersTableList}
        userIds={userIds}
        setUserIds={setUserIds}
        selectedUsersInfo={selectedUsersInfo}
        setSelectedUsersInfo={setSelectedUsersInfo}
        setIsAllChecked={setIsAllChecked}
        isAllChecked={isAllChecked}
        pageNumber={formData.skip}
        setFormData={setFormData}
        formData={formData}
        birthDateRef={birthDateRef}
        /> */}

      {/* <ManageUsersTable
        usersList={usersTableList}
        userIds={userIds}
        setUserIds={setUserIds}
        selectedUsersInfo={selectedUsersInfo}
        setSelectedUsersInfo={setSelectedUsersInfo}
        setIsAllChecked={setIsAllChecked}
        isAllChecked={isAllChecked}
        pageNumber={formData.skip}
        setFormData={setFormData}
        formData={formData}
        birthDateRef={birthDateRef}
      /> */}
    </Flex>
  );
};

export default ManageUsers;
