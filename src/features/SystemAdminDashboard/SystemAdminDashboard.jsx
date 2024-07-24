import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import schoolsIcon from "../../assets/Images/DistrictAdminContentImages/District and schools icon.svg";
import manageMandatesIcon from "../../assets/Images/DistrictAdminContentImages/Manage Mandates (2).svg";
import notificationsIcon from "../../assets/Images/DistrictAdminContentImages/Notificationis.svg";
import rolesIcon from "../../assets/Images/DistrictAdminContentImages/Roles & privileges.svg";

import GlobalButtonsWithIcons from "../../components/FitnessComponents/FitnessButtons/GlobalButtonsWithIcons";
import MobileMenuListDropdown from "../../components/FitnessComponents/FitnessTabs/MobileMenuListDropdown";
import Heading from "../../components/FitnessComponents/FitnessTexts/Heading";
import DistrictStatistics from "../Usage&Statistics/Pages/DistrictStatistics";
import SystemUsage from "../Usage&Statistics/Pages/SystemUsage";
import { getDistrictsBySearchInDistrcitLookUp } from "../../store/slices/superAdminSlice/superAdminSlice";
import Heading1 from "../../components/FitnessComponents/FitnessTexts/Heading1";
const tabNamesList = [
  {
    id: 1,
    tabTextName: "District & Schools",
  },

  {
    id: 2,
    tabTextName: "Manage Mandates",
  },

  {
    id: 3,
    tabTextName: "Notifications",
  },

  {
    id: 4,
    tabTextName: "Roles & Privileges",
  },
];

const SystemAdminDashboard = () => {
  const dispatch = useDispatch();

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const token = useSelector((state) => state?.profile?.token);
  const role = useSelector((state) => state?.profile?.selectedRole);
  const subFields = [
    {
      icon: schoolsIcon,
      name: "District & Schools",
      stateAdminName: "District & Schools",
      is_display:
        rolesAndPrevilegesObject?.["District Information"]?.view ?? true,
    },
    {
      icon: manageMandatesIcon,
      name: "Manage Mandates",
      stateAdminName: "Manage Mandates",
      is_display: rolesAndPrevilegesObject?.["Manage Mandates"]?.view ?? true,
    },
    {
      icon: notificationsIcon,
      name: "Notifications",
      stateAdminName: "Notification System",
      is_display:
        rolesAndPrevilegesObject?.["Notification System Administration"]
          ?.view ?? true,
    },
    {
      icon: rolesIcon,
      name: "Roles & Privileges",
      stateAdminName: "Roles & Privileges",
      is_display:
        rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true,
    },
  ];

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const basepath = `/role/${selectedRole}`;

  const routingObj = {
    0:
      basepath +
      `${
        selectedRole === "stateAdmin" ? "/Districts/DistrictLookup" : "/schools"
      }`,
    1: basepath + "/manage-mandates",
    2: basepath + "/notifications",
    3: basepath + "/roles-privileges",
  };

  const navigate = useNavigate();

  const [mobileDropdownActiveItem, setMobileDropdownActiveItem] = useState(
    "SYSTEM ADMINISTRATOR"
  );

  const onClickFunction = (index) => {
    navigate(routingObj[index]);
  };

  const handleMobileDropdown = (selectedItem) => {
    setMobileDropdownActiveItem(selectedItem?.tabTextName);

    navigate(routingObj[selectedItem?.id - 1]);
  };

  useEffect(() => {
    role === "stateAdmin"
      &&
      dispatch(
          getDistrictsBySearchInDistrcitLookUp({ token, body: { search: "" } })
        )
  }, []);

  return (
    <Flex direction="column" gap="4">
      <Heading1  display={{ base: "none", md: "flex", lg: "flex" }}>
        SYSTEM ADMINISTRATOR
      </Heading1>

      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent="space-between"
        mr={{ base: "0", xl: "4rem" }}
        alignItems="center"
      >
        {subFields.map((item, index) => {
          {
            return item?.is_display ? (
              <GlobalButtonsWithIcons
                key={"a" + index}
                item={item}
                index={index}
                onClickFunction={onClickFunction}
                buttonsList={subFields}
              />
            ) : (
              <>
                <Box>
                  <GlobalButtonsWithIcons
                    key={"a" + index}
                    item={item}
                    index={index}
                    disabled={true}
                    // onClickFunction={onClickFunction}
                    buttonsList={subFields}
                  />
                </Box>
              </>
            );
          }
        })}
      </Box>

      <>
        <Box display={{ base: "block", md: "none" }}>
          <MobileMenuListDropdown
            tabNamesList={tabNamesList}
            handleMobileDropdown={handleMobileDropdown}
            showDropdownActiveItem={mobileDropdownActiveItem}
          />
        </Box>
      </>

      <Grid
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
        gap={6}
      >
        <GridItem>
          <DistrictStatistics />
        </GridItem>
        <GridItem>
          <SystemUsage />
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default SystemAdminDashboard;
