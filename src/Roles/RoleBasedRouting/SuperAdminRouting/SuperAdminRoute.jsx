import { Route } from "react-router-dom";

import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";

import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import MetricsReport from "../../../components/GlobalComponents/Reports/Pages/MetricsReport";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import DataManagementDashboard from "../../../features/DataManagementDashboard/Pages/DataManagementDashboard";
import AddNewDistrict from "../../../features/District&Schools/Components/AddNewDistrict";
import DistrictDashboard from "../../../features/District&Schools/Pages/DistrictDashboard";
import DistrictListDashboard from "../../../features/District&Schools/Pages/DistrictListDashboard";
import SchoolDashboard from "../../../features/District&Schools/Pages/SchoolDashboard";
import EmailSettings from "../../../features/DistrictAdmin/Settings/EmailSettings";
import EnterDataDashboard from "../../../features/FitnessGram/Pages/EnterDataDashboard";
import EventsList from "../../../features/FitnessGram/Pages/EventsList";
import FgCreateEvent from "../../../features/FitnessGram/Pages/FgCreateEvent";
import FgEditEvent from "../../../features/FitnessGram/Pages/FgEditEvent";
import ErrorsPage from "../../../features/Imports/Components/ErrorsPage";
import ImportsDashboard from "../../../features/Imports/Pages/ImportsDashboard";
import CreateLicense from "../../../features/Licenses/Components/CreateLicense";
import UpdateLicense from "../../../features/Licenses/Components/UpdateLicense";
import LicensesDashboard from "../../../features/Licenses/Pages/LicensesDashboard";
import Class from "../../../features/ManageClasses/Pages/Class";
import ManageClassesDashboard from "../../../features/ManageClasses/Pages/ManageClassesDashboard";
import AddMandates from "../../../features/ManageMandates/Pages/AddMandates";
import EditMandates from "../../../features/ManageMandates/Pages/EditMandates";
import MandatesList from "../../../features/ManageMandates/Pages/MandatesList";
import AddUser from "../../../features/ManageUsers/Pages/AddUser";
import ManageUsers from "../../../features/ManageUsers/Pages/ManageUsers";
import SuperAdminDashboard from "../../../features/ManageUsers/Pages/SuperAdminDashboard";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import RolesAndPrivilegesDashboard from "../../../features/Roles&Privileges/Pages/RolesAndPrivilegesDashboard";
import CreateSSO from "../../../features/SSOConfiguration/Components/CreateSSO";
import SSOConfigDashboard from "../../../features/SSOConfiguration/Pages/SSOConfigDashboard";
import AddCMS from "../../../features/SmartCoach/Components/AddCMS";
import CMSDashboard from "../../../features/SmartCoach/Pages/CMSDashboard";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import CreateStatePartner from "../../../features/States&Partners/Components/CreateStatePartner";
import StatesPartnersDashboard from "../../../features/States&Partners/Pages/StatesPartnersDashboard";
import SystemAdminDashboard from "../../../features/SystemAdminDashboard/SystemAdminDashboard";
import DistrictStatistics from "../../../features/Usage&Statistics/Pages/DistrictStatistics";
import SystemUsage from "../../../features/Usage&Statistics/Pages/SystemUsage";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import EndOfTermProcess from "../../../components/EndOfTermProcess";
import UnavailablePage from "../../../components/Unavailable";

import React from "react";
import CreateNewMapping from "../../../features/Imports/Components/CreateNewMapping";
import EditMapping from "../../../features/Imports/Components/EditMapping";
import { useSelector } from "react-redux";

export default function SuperAdminRoute() {
	const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
	return (
		<Route>
			<Route key="S1" index element={<DistrictListDashboard />} />,
			<Route key="S2" path="my-account" element={<Myaccount />} />,
			<Route key="S3" path="Districts/AddUser" element={<AddUser />} />,
			<Route key="S4" path="CMS" element={<CMSDashboard />} />,
			<Route
				key="S5"
				path="Districts/DistrictLookup"
				element={<DistrictListDashboard />}
			/>
			,
			<Route
				key="S6"
				path="Districts/AddNewDistrict"
				element={<AddNewDistrict />}
			/>
			,
			<Route
				key="S7"
				path="Districts/DistrictDetails/:districtId"
				element={<DistrictDashboard />}
			/>
			,
			<Route
				key="S8"
				path="Licenses/CreateLicense"
				element={<CreateLicense />}
			/>
			,
			<Route key="S9" path="Licenses" element={<LicensesDashboard />} />,
			<Route
				key="S10"
				path="Licenses/CreateNewLicense"
				element={<CreateLicense />}
			/>
			,
			<Route
				key="S11"
				path="StatesPartners"
				element={<StatesPartnersDashboard />}
			/>
			,
			<Route
				key="S12"
				path="StatesPartners/CreateStatePartner"
				element={<CreateStatePartner />}
			/>
			,
			<Route
				key="S18"
				path="StatesPartners/:userId/edit/:selectedItemId"
				element={<CreateStatePartner />}
			/>
			,
			<Route key="S19" path="manageusers" element={<SuperAdminDashboard />} />,
			<Route
				key="S20"
				path="roles-privileges"
				element={<RolesAndPrivilegesDashboard />}
			/>
			,
			<Route key="S21" path="SSOConfigMain" element={<SSOConfigDashboard />} />,
			<Route
				key="S22"
				path="SSOConfig/CreateNewSSOConfig"
				element={<CreateSSO />}
			/>
			,
			<Route
				key="S23"
				path="SSOConfig/:userId/edit/:selectedSSOID"
				element={<CreateSSO />}
			/>
			,
			<Route
				key="S24"
				path="Notifications"
				element={<NotificationsComponent />}
			/>
			,
			<Route
				key="S25"
				path="AddUser"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route
				key="S26"
				path="edit/:role/:id"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route key="S27" path="CMS/CMSContent" element={<AddCMS />} />,
			<Route
				key="S28"
				path="License/:licenseId/:funderId"
				element={<UpdateLicense />}
			/>
			, 
			<Route
				key="S29"
				path="data-management"
				element={<DataManagementDashboard />}
			/>
			,
			<Route
				key="S30"
				path="import"
				element={<ImportsDashboard />}
			/>
			,
			<Route key="S31" path="error" element={<ErrorsPage />} />, //{" "}
			<Route
				key="S32"
				path="create-new-mapping"
				element={<CreateNewMapping />}
			/>
			, // <Route key="S33" path="edit/mapping/:id" element={<EditMapping />} />
			,
			<Route
				key="S34"
				path="manage-classes"
				element={underTexas ? <UnavailablePage /> : <ManageClassesDashboard />}
			/>
			,
			<Route
				key="S35"
				path="manage-classes/school/:schoolId/class/:classId"
				element={underTexas ? <UnavailablePage /> : <Class />}
			/>
			,
			<Route key="S36" path="schools" element={<DistrictDashboard />} />,
			<Route key="S37" path="system-admin" element={<SystemAdminDashboard />} />
			,
			<Route key="S38" path="manage-mandates" element={<MandatesList />} />,
			<Route key="S39" path="add-mandates" element={<AddMandates />} />,
			<Route key="S40" path="edit-mandates" element={<EditMandates />} />,
			<Route
				key="S41"
				path="roles-privileges"
				element={<RolesAndPrivilegesDashboard />}
			/>
			,
			<Route
				key="S42"
				path="manage-users"
				element={underTexas ? <UnavailablePage /> : <ManageUsers />}
			/>
			,
			<Route
				key="S43"
				path="edit/:role/:id"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route key="S45" path="email-settings" element={<EmailSettings />} />,
			<Route
				key="S46"
				path="district-statistics"
				element={<DistrictStatistics />}
			/>
			,
			<Route key="S47" path="smartCoach" element={<SmartCoachDashboard />} />,
			<Route
				key="S48"
				path=":eventType/smartCoach"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="S49"
				path=":eventType/smartCoach/:eventId"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route key="S50" path="reports" element={<ReportsDashboard />} />,
			<Route key="S51" path="reports/fitness" element={<ReportViewDashboard />}>
				<Route
					key="SC01"
					path="FitnessGramCompletionReport"
					element={<Report />}
				/>
				,
				<Route
					key="SC011"
					path="FitnessGramOverviewReport"
					element={<Report />}
				/>
				,
				<Route
					key="SC02"
					path="FitnessGramStudentReport"
					element={<StudentReportsDashboardList />}
				/>
				,
				<Route
					key="SC03"
					path="FitnessGramStudentReport/student/:studentUUID"
					element={<StudentReportsDashboardList />}
				/>
				,
			</Route>
			,
			<Route
				key="S63"
				path="RolesPrevilages"
				element={<RolesAndPrivilegesDashboard />}
			/>
			,
			<Route key="S64" path="system_usage" element={<SystemUsage />} />, //{" "}
			<Route
				key="S65"
				path="fitnessgram"
				element={underTexas ? <UnavailablePage /> : <EventsList />}
			/>
			,
			<Route
				key="S67"
				path="fitnessgram/CreateEvent"
				element={underTexas ? <UnavailablePage /> : <FgCreateEvent />}
			/>
			,
			<Route
				key="S69"
				path="adminTest"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="S70"
				path="adminTest/:eventId"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="S80"
				path="edit-event/:eventId"
				element={underTexas ? <UnavailablePage /> : <FgEditEvent />}
			/>
			,
			<Route key="S84" path="my-account" element={<Myaccount />} />,
			<Route key="S85" path="school/:schoolId" element={<SchoolDashboard />} />,
			<Route key="S85" path="metricsReports" element={<MetricsReport />} />,
			<Route key="S86" path="exportContacts" element={<MetricsReport />} />,
			<Route key="S87" path="ActivityGramEvent" element={<ComingSoon />} />,
			<Route key="S88" path="ActivityLog" element={<ComingSoon />} />,
			<Route key="S89" path="EndOfTermProcess" element={<EndOfTermProcess />} />
		</Route>
	);
}
