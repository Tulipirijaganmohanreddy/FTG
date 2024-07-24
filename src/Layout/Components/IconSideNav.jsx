import { Box, Img } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setActivatingID,
  setGlobalSearchResults,
  setHoveringID,
  setPreviousPath,
  setSearchData,
} from "../../store/slices/profileSlice";

import fitnessGramImg from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/FitnessGram.svg";

import activityGram from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ActivityGram.svg";

import activityLogo from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ActivityLogo.svg";

import administerTest from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ADMINISTERTEST.svg";

import reportsImg from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/Reports.svg";

import smartCoachImg2 from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/whistle-1@2x.png";
import smartCoachImg from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/whistle@2x.png";

import cmsImg from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/CMS.svg";

import districtIcon from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/DistrictIcon.svg";

import licenceImg from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/licenseicon.svg";

import notificationImg from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/Notifications.svg";

import ssoConfigurationImg from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/ssoIcon.svg";

import statesAndPartnersImg from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/states&partners.svg";

import systemAdminstrator from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/administrator-developer-icon (1).svg";
import dataManagementImg from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/DataManagement.svg";
import districtStatictics from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/DistrictStatistics.svg";
import systemUsage from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/systemUsage.svg";

import CMSLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/cmswhite.svg";
import DistrictsSchoolLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/districtIconWhite.svg";
import LicensesLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/licenseWhite.svg";
import NotificationsLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/notificationswhite.svg";
import SSOConfigurationLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/ssowhiteicon.svg";
import StatesPartnersLogo2 from "../../assets/Images/Navbar/SideNavBarImages/SuperAdminIcons/statespartnerswhite.svg";

import activitylog2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/activitylog2.png";

import adminIcon from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/admin.svg";

import ag2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/ag2.png";

import fitnessGramImg2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/Fitnessgram icon.svg";

import data_management from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/data_management.svg";
import data_management2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/data_management2.svg";

import dist_statistic2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/dist_statistic2.svg";
import districtStaticticsIcon from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/districtStatistics.svg";

import reports2 from "../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/reports2.png";

import system_icon2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/system_icon2.svg";

import systemUsageIcon from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/systemUsage.svg";

import adminstertest2 from "../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/Administer.svg";

const IconSideNav = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);
  const role = useSelector((state) => state.profile.selectedRole);

  const activatingID = useSelector((state) => state?.profile?.activatingID);
  const hoveringID = useSelector((state) => state?.profile?.hoveringID);

  const searchData = useSelector((state) => state.profile.searchData);

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const teacher_schoolAdministrator = [
    {
      id: "1",
      name: "FITNESSGRAM",
      img: fitnessGramImg,
      img2: fitnessGramImg2,

      isDisplay: rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true,
    },
    {
      id: "2",
      name: "ADMINISTER TEST",
      img: administerTest,
      img2: adminstertest2,

      isDisplay:
        rolesAndPrevilegesObject?.["FitnessGram Event"]?.enter_data ?? true,
    },
    {
      id: "3",
      name: "SMARTCOACH",
      img: smartCoachImg,
      img2: smartCoachImg2,

      isDisplay: true,
    },
    {
      id: "4",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },

    {
      id: "5",
      name: "ACTIVITYGRAM",
      img: activityGram,
      img2: ag2,

      isDisplay: true,
    },

    {
      id: "6",
      name: "ACTIVITYLOG",
      img: activityLogo,
      img2: activitylog2,

      isDisplay: true,
    },
  ];

  const student = [
    {
      id: "1",
      name: "FITNESSGRAM",
      img: fitnessGramImg,
      img2: fitnessGramImg2,

      isDisplay: rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true,
    },
    {
      id: "2",
      name: "ENTER TEST RESULTS",
      img: administerTest,
      img2: adminstertest2,

      isDisplay:
        rolesAndPrevilegesObject?.["FitnessGram Event"]?.enter_data ?? true,
    },
    {
      id: "3",
      name: "SMARTCOACH",
      img: smartCoachImg,
      img2: smartCoachImg2,

      isDisplay: true,
    },
    {
      id: "4",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },
    // {
    // 	id: "5",
    // 	name: "OTHERS",
    // 	img: othersImg,

    // },
    {
      id: "5",
      name: "ACTIVITYGRAM",
      img: activityGram,
      img2: ag2,

      isDisplay: true,
    },

    //   {
    //     id: "7",
    //     name: "ACTIVITYGRAMLITE",
    //     img: activityGramLite,
    //   },

    {
      id: "6",
      name: "ACTIVITYLOG ",
      img: activityLogo,
      img2: activitylog2,

      isDisplay: true,
    },
  ];
  const parent = [
    {
      id: "1",
      name: "FITNESSGRAM",
      img: fitnessGramImg,
      img2: fitnessGramImg2,

      isDisplay: rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true,
    },
    {
      id: "2",
      name: "VIEW TEST RESULTS",
      img: administerTest,
      img2: adminstertest2,

      isDisplay:
        rolesAndPrevilegesObject?.["FitnessGram Event"]?.enter_data ?? true,
    },
    {
      id: "3",
      name: "SMARTCOACH",
      img: smartCoachImg,

      isDisplay: true,
    },
    {
      id: "4",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },
    // {
    // 	id: "5",
    // 	name: "OTHERS",
    // 	img: othersImg,

    // },
    {
      id: "6",
      name: "ACTIVITYGRAM",
      img: activityGram,
      img2: ag2,

      isDisplay: true,
    },

    //   {
    //     id: "7",
    //     name: "ACTIVITYGRAMLITE",
    //     img: activityGramLite,
    //   },

    {
      id: "8",
      name: "ACTIVITYLOG ",
      img: activityLogo,
      img2: activitylog2,

      isDisplay: true,
    },
  ];

  const superAdmin = [
    {
      id: "1",
      name: "DISTRICT LOOKUP",
      img: districtIcon,
      img2: DistrictsSchoolLogo2,

      isDisplay: true,
    },
    {
      id: "2",
      name: "CMS",
      img: cmsImg,
      img2: CMSLogo2,

      isDisplay: true,
    },
    {
      id: "3",
      name: "LICENSES",
      img: licenceImg,
      img2: LicensesLogo2,

      isDisplay: true,
    },
    {
      id: "4",
      name: "NOTIFICATIONS",
      img: notificationImg,
      img2: NotificationsLogo2,

      isDisplay: true,
    },
    {
      id: "5",
      name: "SSO CONFIGURATIONS",
      img: ssoConfigurationImg,
      img2: SSOConfigurationLogo2,

      isDisplay: true,
    },
    {
      id: "6",
      name: "STATES & PARTNERS",
      img: statesAndPartnersImg,
      img2: StatesPartnersLogo2,

      isDisplay: true,
    },
    {
      id: "7",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },

    {
      id: "8",
      name: "Export Contacts",
	  img: licenceImg,
      img2: LicensesLogo2,

      isDisplay: true,
    },
  ];
  const partner = [
    // {
    //   id: "1",
    //   name: "SYSTEM ADMINISTRATOR",
    //   img: administerTest,

    //   isDisplay: true,
    // },

    {
      id: "1",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },

    // {
    //   id: "3",
    //   name: "SMARTCOACH",
    //   img: smartCoachImg,
    //   img2: smartCoachImg2,

    //   isDisplay: true,
    // },
  ];

  const districtAdmin = [
    {
      id: "1",
      name: "DATA MANAGEMENT",
      img: data_management,
      img2: data_management2,

      isDisplay: true,
    },
    {
      id: "2",
      name: "SYSTEM ADMINISTRATOR",
      img: adminIcon,
      img2: adminstertest2,

      isDisplay: true,
    },
    {
      id: "3",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },

    {
      id: "4",
      name: "SMARTCOACH",
      img: smartCoachImg,
      img2: smartCoachImg2,

      isDisplay: true,
    },
    {
      id: "5",
      name: "DISTRICT STATISTICS",
      img: districtStaticticsIcon,
      img2: dist_statistic2,

      isDisplay: true,
    },
    {
      id: "6",
      name: "SYSTEM USAGE",
      img: systemUsageIcon,
      img2: system_icon2,

      isDisplay: true,
    },

    {
      id: "7",
      name: "FITNESSGRAM",
      img: fitnessGramImg,
      img2: fitnessGramImg2,

      isDisplay: rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true,
    },

    {
      id: "8",
      name: "ADMINISTER TEST",
      img: administerTest,
      img2: adminstertest2,

      isDisplay:
        rolesAndPrevilegesObject?.["FitnessGram Event"]?.enter_data ?? true,
    },

    {
      id: "9",
      name: "ACTIVITYGRAM",
      img: activityGram,
      img2: ag2,

      isDisplay: true,
    },

    {
      id: "10",
      name: "ACTIVITYLOG",
      img: activityLogo,
      img2: activitylog2,

      isDisplay: true,
    },
  ];

  const stateAdmin = [
    {
      id: "1",

      name: "SYSTEM ADMINSTRATOR",
      img: systemAdminstrator,
      img2: adminstertest2,

      isDisplay: true,
    },
    {
      id: "2",
      name: "DATA MANAGEMENT",
      img: dataManagementImg,
      img2: data_management2,

      isDisplay: true,
    },
    {
      id: "3",
      name: "REPORTS",
      img: reportsImg,
      img2: reports2,

      isDisplay: true,
    },
    {
      id: "4",
      name: "SMARTCOACH",
      img: smartCoachImg,
      img2: smartCoachImg2,

      isDisplay: true,
    },
    {
      id: "5",
      name: "DISTRICT STATISTICS",
      img: districtStatictics,
      img2: dist_statistic2,

      isDisplay: true,
    },
    {
      id: "6",
      name: "SYSTEM USAGE",
      img: systemUsage,
      img2: system_icon2,

      isDisplay: true,
    },
  ];

  const obj = {
    teacher: teacher_schoolAdministrator,
    schoolAdmin: teacher_schoolAdministrator,
    student: student,
    Parent: parent,
    districtAdmin: districtAdmin,
    stateAdmin: stateAdmin,
    superAdmin: superAdmin,
    partner: partner,
  };

  const routingObj = {
    teacher: {
      1: () => {
        navigate("/role/teacher");
      },
      2: () => {
        navigate(`/role/${role}/adminTest`);
      },
      3: () => {
        navigate("/role/Teacher/SmartCoach");
      },
      4: () => {
        navigate("/role/Teacher/reports");
      },

      5: () => {
        navigate(`/role/${role}/ActivityGramEvent`);
      },

      6: () => {
        navigate(`/role/${role}/ActivityLog`);
      },
    },

    superAdmin: {
      1: () => {
        navigate("/role/SuperAdmin");
      },
      2: () => {
        navigate("/role/SuperAdmin/CMS");
      },
      3: () => {
        navigate("/role/SuperAdmin/Licenses");
      },
      4: () => {
        navigate("/role/SuperAdmin/Notifications");
      },
      5: () => {
        navigate("/role/SuperAdmin/SSOConfigMain");
      },
      6: () => {
        navigate("/role/SuperAdmin/StatesPartners");
      },

      7: () => {
        navigate("/role/SuperAdmin/metricsReports");
      },

      8: () => {
        navigate("/role/SuperAdmin/exportContacts");
      },
    },
    student: {
      1: () => {
        navigate("/role/Student");
      },

      2: () => {
        navigate("/role/Student/EnterTestResults");
      },

      3: () => {
        navigate("/role/Student/SmartCoach");
      },
      4: () => {
        navigate("/role/Student/reports");
      },

      5: () => {
        navigate("/role/Student/ActivityGramEvent");
      },

      6: () => {
        navigate("/role/Student/ActivityLog");
      },

      7: () => {
        navigate("/role/Student/ActivityGramLiteTestEvents");
      },
    },
    Parent: {},
    schoolAdmin: {
      1: () => {
        navigate("/role/schoolAdmin");
      },

      2: () => {
        navigate(`/role/${role}/adminTest`);
      },

      3: () => {
        navigate("/role/schoolAdmin/SmartCoach");
      },
      4: () => {
        navigate("/role/schoolAdmin/reports");
      },

      5: () => {
        navigate(`/role/${role}/ActivityGramEvent`);
      },

      6: () => {
        navigate(`/role/${role}/ActivityLog`);
      },
    },

    districtAdmin: {
      1: () => {
        navigate(`/role/${role}/data-management`);
      },
      2: () => {
        navigate(`/role/${role}/system-admin`);
      },
      3: () => {
        navigate(`/role/${role}/reports`);
      },
      4: () => {
        navigate(`/role/${role}/SmartCoach`);
      },
      5: () => {
        navigate(`/role/${role}/district-statistics`);
      },
      6: () => {
        navigate(`/role/${role}/system_usage`);
      },

      7: () => {
        navigate(`/role/${role}/fitnessgram`);
      },

      8: () => {
        navigate(`/role/${role}/adminTest`);
      },

      9: () => {
        navigate(`/role/${role}/ActivityGramEvent`);
      },

      10: () => {
        navigate(`/role/${role}/ActivityLog`);
      },
    },

    stateAdmin: {
      1: () => {
        navigate(`/role/${role}/system-admin`);
      },
      2: () => {
        navigate("/role/stateAdmin/data-management");
      },
      3: () => {
        navigate("/role/stateAdmin/reports");
      },
      4: () => {
        navigate("/role/stateAdmin/SmartCoach");
      },
      5: () => {
        navigate("/role/stateAdmin/district-statistics");
      },
      6: () => {
        navigate("/role/stateAdmin/system_usage");
      },
    },
    partner: {
      1: () => {
        navigate("/role/Partner");
      },
      2: () => {
        navigate("/role/Partner/Reports");
      },
      3: () => {
        navigate("/role/Partner/SmartCoach");
      },
    },
  };

  const [collapseOpen, setCollapseOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const sideNavRouting = (role, id, clickedNavItem) => {
    if (searchData?.search?.length) {
      dispatch(setSearchData({ search: "", category: "All" }));
      dispatch(setGlobalSearchResults(null));
    }
    dispatch(setActivatingID(id));
    dispatch(setPreviousPath(null));

    routingObj[selectedRole][id]();
  };

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
  });

  let width1 = windowSize.width - 280;
  let width2 = windowSize.width - 80;

  const openCollapse = () => {
    document.getElementById("collapse").style.width = "200px";
    document.getElementById("main").style.width = `${width1}px`;
    setCollapseOpen(false);
  };
  const closeCollapse = () => {
    document.getElementById("collapse").style.width = "0px";
    document.getElementById("main").style.width = `${width2}px`;
    setCollapseOpen(true);
  };

  const handleBar = (openBar) => {
    !openBar ? openCollapse : closeCollapse;
  };

  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
  }, [token]);

  return (
    <Box bg="white">
      <Box
        display={{ base: "none", md: "none", lg: "flex" }}
        flexDirection="column"
        alignItems="center"
        bg="white"
        w="5rem"
        zIndex="2"
        minHeight={"auto"}
        maxHeight="150vh"
      >
        {obj[selectedRole]?.map((item) => {
          if (item.isDisplay) {
            return (
              <Box
                w="8"
                h="8"
                p="1"
                my="5"
                cursor="pointer"
                rounded="md"
                transform="translateY(50%)"
                _hover={{ bg: "primary" }}
                bg={
                  activatingID == item.id || hoveringID == item.id
                    ? "primary"
                    : ""
                }
                onMouseEnter={() => {
                  dispatch(setHoveringID(item.id));
                }}
                onMouseLeave={() => {
                  dispatch(setHoveringID(null));
                }}
                onClick={() => {
                  sideNavRouting(selectedRole, item.id, item);
                }}
              >
                <Img
                  key={item.id}
                  w="full"
                  h="full"
                  src={
                    activatingID == item.id || hoveringID == item.id
                      ? item.img2
                      : item.img
                  }
                />
              </Box>
            );
          }

          return (
            <Box
              w="8"
              h="8"
              p="1"
              my="5"
              cursor="not-allowed"
              rounded="md"
              transform="translateY(50%)"
            >
              <Img
                key={item.id}
                w="full"
                h="full"
                objectFit={'fill'}
                src={item.img}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default IconSideNav;
