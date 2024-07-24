import { SearchIcon } from "@chakra-ui/icons";
import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaFileExport } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import addCircleIcon from "../../../assets/Images/DistrictAdminContentImages/Icon ionic-ios-add-circle.svg";
import { ManageUsersData } from "../Config";

import { BsFillPlusCircleFill } from "react-icons/bs";
import { setTotalPages } from "../../teacher/teacherSlice";

import "react-calendar/dist/Calendar.css";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading5 from "../../../components/FitnessComponents/FitnessTexts/Heading5";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import TextIcon from "../../../components/TextIcon";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import ManageUsersAssignmentTextIcon from "../Components/ManageUsersAssignmentTextIcon";
import SuperAdminTable from "../Components/SuperAdminTable";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import SelectAction from "../../../components/GlobalComponents/SelectAction/Pages/SelectAction";
import { debounce } from "../../../Utilities/utils";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";

const initialFormData = {
  user_type: "admin",
  login_status: "all",
  search: "",
  skip: 1,
  size: 20,
};

const SuperAdminDashboard = () => {
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
    users,
  } = ManageUsersData;

  const [userType, school, loginStatus, birthDate, assignmentStatus, grades] =
    userDetails;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();

  const manageUser = useSelector((state) => state?.profile?.manageUser);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const [formData, setFormData] = useState(initialFormData);

  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const [selectedUser, setSelectedUser] = useState("admin");

  const handleChange = (event) => {

    if (event.target.value === "all") {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value === "true" ? true : false,
        skip: 1,
      }));
    }
  };

  const handleSelectChange = (event) => {
    setSelectedUser(event.target.value);
    dispatch(setManageUser({ ...manageUser, userType: event.target.value }));

    dispatch(setTotalPages(null));

    setFormData({
      ...initialFormData,
      [event.target.name]: event.target.value,
    });
  };

  const clickToNavigate = () => {
    dispatch(
      setManageUser({
        formTitle: manageUser?.userType
          ? `Add ${USERS_OBJ[manageUser?.userType]}`
          : `Add ${USERS_OBJ[selectedUser]} `,
        userType: manageUser?.userType ? manageUser?.userType : selectedUser,
      })
    );

    dispatch(setPreviousPath(location.pathname));

    manageUser?.userType
      ? navigate(`/role/SuperAdmin/AddUser`, {
          state: { role: manageUser?.userType },
        })
      : navigate(`/role/SuperAdmin/AddUser`, {
          state: { role: "admin" },
        });
  };

  const handleSearch = debounce((name, value) => {
   if(value.length != 1){
    setFormData((prevstate) => ({
      ...prevstate,
      [name]: value,
      skip: 1,
    }));
   }
  }, 500);

  useEffect(() => {
    dispatch(setManageUser({ ...manageUser, userType: selectedUser }));
    dispatch(setPreviousPath(location.pathname));

    return () => {
      setFormData(initialFormData);
    };
  }, []);

  return (
    <Flex gap="4" direction="column" m={{ base: "0", lg: "2" }}>
      <Heading1>{title}</Heading1>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={{ base: "1", lg: 2, md: 1 }}
      >
        <GridItem colSpan="1">
          <Box>
            <SingleSelect2
              id={"userType"}
              label={"User Type"}
              optionsProps={users}
              displayKey={"lable"}
              optionValue={"value"}
              name={userType?.name}
              // value={manageUser?.userType ?? selectedUser}
              value={formData?.user_type}
              onChange={handleSelectChange}
            />
          </Box>
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
      </Grid>

      <Divider />

      <Box textTransform={"uppercase"}>
        <Heading2>{USERS_OBJ[manageUser?.userType]}</Heading2>
      </Box>

      <HStack>
        <HStack spacing={{ base: "10", md: "8", lg: "8" }}>
          <Box inlineSize={{ base: "8em", lg: "25em", md: "10em" }}>
            <SearchComponent
              id="search"
              name="search"
              display={{ base: "flex", lg: "flex", md: "flex" }}
              onChange={(event) =>
                handleSearch(event.target.name, event.target.value)
              }
              // value={formData?.search}
            />
          </Box>

          {/* <SelectAction
            role={USERS_OBJ[manageUser?.userType]}
            actionOptions={districtAdminActionOptions}
            actionValues={districtAdminActionValues}
            setUserIds={setUserIds}
            userIds={userIds}
            setIsAllChecked={setIsAllChecked}
            userType={"admin"}
          /> */}
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
                text={
                  manageUser?.userType
                    ? `Add ${USERS_OBJ[manageUser?.userType]}`
                    : `Add ${USERS_OBJ[selectedUser]} `
                }
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
                text={
                  manageUser?.userType
                    ? `Add ${USERS_OBJ[manageUser?.userType]}`
                    : `Add ${USERS_OBJ[selectedUser]} `
                }
                icon={addCircleIcon}
              />
            </HStack>
          )}

          <Box role="button">
            <TextIcon
              text={exportUsers}
              icon={FaFileExport}
              increaseTextSize="increaseTextSize"
            />
          </Box>
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
                text={
                  manageUser?.userType
                    ? `Add ${USERS_OBJ[manageUser?.userType]}`
                    : `Add ${USERS_OBJ[selectedUser]} `
                }
                icon={BsFillPlusCircleFill}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </HStack>
        ) : (
          <HStack flexDirection="row">
            <Box color="black">
              <TextIcon
                text={
                  manageUser?.userType
                    ? `Add ${USERS_OBJ[manageUser?.userType]}`
                    : `Add ${USERS_OBJ[selectedUser]} `
                }
                icon={BsFillPlusCircleFill}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </HStack>
        )}

        <Box role="button">
          <TextIcon
            text={exportUsers}
            icon={FaFileExport}
            increaseTextSize="increaseTextSize"
          />
        </Box>
      </HStack>

      <SuperAdminTable
        userIds={userIds}
        setUserIds={setUserIds}
        setIsAllChecked={setIsAllChecked}
        isAllChecked={isAllChecked}
        formData={formData}
        setFormData={setFormData}
      />
    </Flex>
  );
};

export default SuperAdminDashboard;
