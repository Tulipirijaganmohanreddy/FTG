import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRolesAndPrivilagesByRole } from "../../../DistrictAdminApis/districtAdminSlice";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import MobileMenuListDropdown from "../../../components/FitnessComponents/FitnessTabs/MobileMenuListDropdown";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import PrivilagesTable from "../Components/PrivilegesTable";
import { rolesPrevilagesData } from "../Config";

const RolesAndPrivilegesDashboard = () => {
  const {
    title,
    text,
    rolesList,
    superAdminRolesList,
  } = rolesPrevilagesData;

  const role_obj = {
    ADMIN: "superAdmin",
    "HELP DESK": "helpDesk",
    STUDENT: "student",
    TEACHER: "teacher",
    PARENT: "parent",
    "SCHOOL ADMINISTRATOR": "schoolAdmin",
    "DISTRICT ADMINISTRATOR": "districtAdmin",
  };
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.profile.loading);


  const token = useSelector((state) => state?.profile?.token);
  const userRole = useSelector((state) => state?.profile?.selectedRole);
  const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);
  const district_uuid = useSelector(
    (state) => state?.profile?.loggedInUserDetails?.district_uuid
  );

  const [activeTab, setActiveTab] = useState(1);

  const [selectedRole, setSelectedRole] = useState("student");

  const [mobileDropdownActiveItem, setMobileDropdownActiveItem] = useState(
    userRole === "superAdmin" && duplicateRole
      ? superAdminRolesList?.[0]?.tabTextName
      : rolesList?.[0]?.tabTextName
  );

  const handleMobileDropdown = (selectedItem) => {
    setMobileDropdownActiveItem(selectedItem?.tabTextName);

    setActiveTab(selectedItem?.id);

    setSelectedRole(role_obj[selectedItem?.tabTextName]);

    handleGetPrevilages(role_obj[selectedItem?.tabTextName]);
  };

  const onClickFunctionHandlingRoles = (role) => {
    setSelectedRole(role_obj[role]);

    handleGetPrevilages(role_obj[role]);
  };

  const handleGetPrevilages = (selectedRole) => {
    dispatch(
      getRolesAndPrivilagesByRole({
        token,
        selectedRole,
        district_uuid: userRole === "districtAdmin" ? district_uuid : "",
      })
    );
  };

  useEffect(() => {
    dispatch(
      getRolesAndPrivilagesByRole({
        token,
        selectedRole,
        district_uuid: userRole === "districtAdmin" ? district_uuid : "",
      })
    );
  }, []);
  useEffect(() => {
    handleGetPrevilages(selectedRole);
  }, [userRole]);

  return (
    <Flex direction="column" gap="4" m={{ base: "0", md: "4" }}>
      <Heading1>{title}</Heading1>
      <Box color="black-2">
        <Label marginTopText={"0"}>{text}</Label>
      </Box>

      <Flex display={{ base: "none", md: "flex", lg: "flex" }}>
        {userRole === "superAdmin" && !duplicateRole ? (
          <GloabalTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabNamesList={superAdminRolesList}
            increasePaddingX="0.4rem"
            onClickFunctionHandlingRoles={onClickFunctionHandlingRoles}
          />
        ) : (
          <GloabalTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabNamesList={rolesList}
            increasePaddingX="0.4rem"
            onClickFunctionHandlingRoles={onClickFunctionHandlingRoles}
          />
        )}
      </Flex>
      <>
        <Box display={{ base: "block", md: "none" }}>
          <MobileMenuListDropdown
            tabNamesList={
              userRole === "superAdmin" && !duplicateRole
                ? superAdminRolesList
                : rolesList
            }
            handleMobileDropdown={handleMobileDropdown}
            showDropdownActiveItem={mobileDropdownActiveItem}
          />
        </Box>
      </>

      <PrivilagesTable role={selectedRole} />
    </Flex>
  );
};

export default RolesAndPrivilegesDashboard;
