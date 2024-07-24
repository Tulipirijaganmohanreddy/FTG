import { Box, Flex, Stack } from "@chakra-ui/react";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import MobileMenuListDropdown from "../../../components/FitnessComponents/FitnessTabs/MobileMenuListDropdown";
import LicenseSchoolList from "./LicenseSchoolList";
import LicenseHistory from "./LicenseHistory";
import LicenseEmailHistory from "./LicenseEmailHistory";
import LicenseContacts from "./LicenseContacts";

const tabNamesList = [
  {
    id: 1,
    tabTextName: "SCHOOLS",
  },

  {
    id: 2,
    tabTextName: "LICENSE HISTORY",
  },

  {
    id: 3,
    tabTextName: "CONTACTS",
  },
  {
    id: 4,
    tabTextName: "EMAIL HISTORY",
  },
];

const LicenseTabs = React.memo((props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  // const [activeTab, setActiveTab] = useState(
  //   location?.state !== undefined && location?.state !== null
  //     ? location?.state
  //     : 1
  // );

  const tabObj = {
    1: (
      <LicenseSchoolList
        setActiveTab={props.activeTab}
        setSchools={props.setSchools}
        setMassUpdate={props.setMassUpdate}
        massUpdate={props.massUpdate}
      />
    ),
    2: <LicenseHistory activeTab={props.activeTab} />,
    3: <LicenseContacts />,
    4: <LicenseEmailHistory />,
  };

  const [mobileDropdownActiveItem, setMobileDropdownActiveItem] = useState(
    tabNamesList?.[0]?.tabTextName
  );

  const handleMobileDropdown = (selectedItem) => {
    setMobileDropdownActiveItem(selectedItem?.tabTextName);

    setActiveTab(selectedItem?.id);
  };

  return (
    <Flex direction="column" mr={{ base: "0rem", md: "0" }} mt="3">
      <>
        <Flex display={{ base: "none", md: "flex" }}>
          <GloabalTab
            activeTab={props.activeTab}
            DisplayLicensedDistrictsData
            setActiveTab={props.setActiveTab}
            tabNamesList={tabNamesList}
            increasePaddingX="0.4rem"
          />
        </Flex>
        <Box display={{ base: "block", md: "none" }}>
          <MobileMenuListDropdown
            tabNamesList={tabNamesList}
            handleMobileDropdown={handleMobileDropdown}
            showDropdownActiveItem={mobileDropdownActiveItem}
          />
        </Box>
      </>

      {tabObj[props.activeTab]}
    </Flex>
  );
});
export default LicenseTabs;
