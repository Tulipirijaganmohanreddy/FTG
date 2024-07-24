import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import importIcon from "../../../assets/Images/DistrictAdminContentImages/Import (1).svg";
import manageClasses from "../../../assets/Images/DistrictAdminContentImages/Manage Classes (1).svg";
import manageusers from "../../../assets/Images/DistrictAdminContentImages/Manage Users1.svg";

import GlobalButtonsWithIcons from "../../../components/FitnessComponents/FitnessButtons/GlobalButtonsWithIcons";
import MobileMenuListDropdown from "../../../components/FitnessComponents/FitnessTabs/MobileMenuListDropdown";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import { setManageUser } from "../../../store/slices/profileSlice";
import DistrictStatistics from "../../Usage&Statistics/Pages/DistrictStatistics";
import SystemUsage from "../../Usage&Statistics/Pages/SystemUsage";

const tabNamesList = [
  {
    id: 1,
    tabTextName: "Import",
  },

  {
    id: 2,
    tabTextName: "Manage Classes",
  },

  {
    id: 3,
    tabTextName: "Manage Users",
  },
];

const DataManagementDashboard = () => {
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const subFields = [
    {
      icon: importIcon,
      name: "Import",
      is_display: rolesAndPrevilegesObject?.["Import"]?.view ?? true,
    },
    {
      icon: manageClasses,
      name: "Manage Classes",
      is_display: rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true,
    },
    {
      icon: manageusers,
      name: "Manage Users",
      is_display: rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true,
    },
    // {
    // 	icon: importIcon,
    // 	name: "End of Term Process",
    // },
  ];

  const basepath = `/role/${selectedRole}`;
  const routingObj = {
    0: basepath + "/import",
    1: basepath + "/manage-classes",
    2: basepath + "/manage-users",
    3: basepath + "/end-of-term-process",
  };

  const navigate = useNavigate();

  const token = useSelector((state) => state?.profile?.token);
  const userId = useSelector((state) => state?.profile?.userId);

  const dispatch = useDispatch();

  const onClickFunction = (index) => {
    navigate(routingObj[index]);
    if (index === 2) {
      dispatch(
        setManageUser({
          userType: "student",
          formTitle: "",
          previousPath: "",
          tab: "",
        })
      );
    }
  };

  const [mobileDropdownActiveItem, setMobileDropdownActiveItem] =
    useState("DATA MANAGEMENT");

  const handleMobileDropdown = (selectedItem) => {
    setMobileDropdownActiveItem(selectedItem?.tabTextName);

    navigate(routingObj[selectedItem?.id - 1]);
  };

  return (
    <Flex direction="column" gap="4">
      <Heading1 display={{ base: "none", md: "flex", lg: "flex" }}>
        DATA MANAGEMENT
      </Heading1>

      <Box
        display={{ base: "none", md: "flex" }}
        justifyContent="space-between"
        // mr={{ base: "0", xl: "4rem" }}
        alignItems="center"
      >
        {selectedRole === "stateAdmin"
          ? subFields.map(
              (item, index) =>
                index === 0 && (
                  <Flex direction={"column"}>
                    <GlobalButtonsWithIcons
                      item={item}
                      index={index}
                      onClickFunction={onClickFunction}
                      buttonsList={subFields}
                    />
                  </Flex>
                )
            )
          : subFields.map((item, index) => {
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

export default DataManagementDashboard;
