import React, { useEffect, useState } from "react";

import { Box } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Heading4new from "../components/FitnessComponents/FitnessTexts/Heading4new";
import { setActivatingID, setHoveringID } from "../store/slices/profileSlice";

import fitnessGramImg from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/FitnessGram.svg";

import activityGram from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ActivityGram.svg";

import activityLogo from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ActivityLogo.svg";

import administerTest from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/ADMINISTERTEST.svg";

import reportsImg from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/Reports.svg";
import smartCoachImg2 from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/whistle-1@2x.png";
import smartCoachImg from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/whistle@2x.png";

import cmsImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/CMS.svg";

import districtsAndSchoolsImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Districts & Schools.svg";

import licenceImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Licenses.svg";

import notificationImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Notifications.svg";

import ssoConfigurationImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/SSO Configuration.svg";

import statesAndPartnersImg from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/States & Partners.svg";

import systemAdminstrator from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/administrator-developer-icon (1).svg";
import dataManagementImg from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/DataManagement.svg";
import districtStatictics from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/DistrictStatistics.svg";
import systemUsage from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/systemUsage.svg";

import CMSLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/CMS@2x.png";
import DistrictsSchoolLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Districts & Schools@2x.png";
import LicensesLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Licenses@2x.png";
import NotificationsLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/Notifications@2x.png";
import SSOConfigurationLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/SSO Configuration@2x.png";
import StatesPartnersLogo2 from "../assets/Images/Navbar/SideNavBarImages/SuperAdminImages/States & Partners@2x.png";

import activitylog2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/activitylog2.png";
import adminIcon from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/admin.svg";
import ag2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/ag2.png";
import data_management from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/data_management.svg";
import data_management2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/data_management2.svg";
import dist_statistic2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/dist_statistic2.svg";
import districtStaticticsIcon from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/districtStatistics.svg";

import reports2 from "../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/reports2.png";

import system_icon2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/system_icon2.svg";
import systemUsageIcon from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/systemUsage.svg";

import adminstertest2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/Administer.svg";
import fitnessGramImg2 from "../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/Fitnessgram icon.svg";

const MainHoveringSideNav = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const role = useSelector((state) => state?.profile?.selectedRole);
	const token = useSelector((state) => state?.profile?.token);

	const activatingID = useSelector((state) => state?.profile?.activatingID);
	const hoveringID = useSelector((state) => state?.profile?.hoveringID);

	const openSideBar = useSelector((state) => state?.profile?.openSideBar);

	const duplicateRole = useSelector((state) => state.profile.duplicateRole);

	const [selectedRole, setSelectedRole] = useState(role);

	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
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
			img: districtsAndSchoolsImg,
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
	];
	const partner = [
		{
			id: "1",
			name: "SYSTEM ADMINISTRATOR",
			img: adminIcon,
			img2: adminstertest2,

			isDisplay: true,
		},

		{
			id: "2",
			name: "REPORTS",
			img: reportsImg,
			img2: reports2,

			isDisplay: true,
		},

		{
			id: "3",
			name: "SMARTCOACH",
			img: smartCoachImg,
			img2: smartCoachImg2,

			isDisplay: true,
		},
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
		parent: parent,
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
				navigate("/role/SuperAdmin/Districts/DistrictLookup");
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

			6: () => {
				navigate("/role/Student/ActivityGramEvent");
			},

			8: () => {
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
				navigate("/role/StateAdmin/data-management");
			},
			3: () => {
				navigate("/role/StateAdmin/reports");
			},
			4: () => {
				navigate("/role/StateAdmin/SmartCoach");
			},
			5: () => {
				navigate("/role/StateAdmin/district-statistics");
			},
			6: () => {
				navigate("/role/StateAdmin/system_usage");
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

	const sideNavRouting = (role, id, clickedNavItem) => {
		routingObj[selectedRole][id]();

		dispatch(setActivatingID(id));
	};

	useEffect(() => {
		duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
	}, [token]);

	return (
		<>
			<Box display="flex" flexDirection="column" bg="white">
				{obj[selectedRole]?.map((item) => {
					if (item.isDisplay) {
						return (
							<Box
								key={item.id}
								h="8"
								my="5"
								mr="2"
								cursor="pointer"
								roundedRight="xl"
								transform="translateY(50%)"
								_hover={{ bg: "primary", textColor: "white" }}
								whiteSpace="nowrap"
								overflow="hidden"
								textColor={
									activatingID == item.id || hoveringID == item.id
										? "white"
										: "black"
								}
								display="flex"
								alignItems="center"
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
								<Box px="3">
									<Heading4new> {item.name}</Heading4new>
								</Box>
							</Box>
						);
					}

					return (
						<Box
							key={item.id}
							h="8"
							my="5"
							mr="2"
							cursor="not-allowed"
							roundedRight="xl"
							transform="translateY(50%)"
							whiteSpace="nowrap"
							overflow="hidden"
							display="flex"
							alignItems="center"
						>
							<Box px="3">
								<Heading4new> {item.name}</Heading4new>
							</Box>
						</Box>
					);
				})}
			</Box>
		</>
	);
};

export default MainHoveringSideNav;
