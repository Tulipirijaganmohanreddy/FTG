import { Route } from "react-router-dom";
import EmailSettings from "../../../features/DistrictAdmin/Settings/EmailSettings";
import Class from "../../../features/ManageClasses/Pages/Class";
import ManageClassesDashboard from "../../../features/ManageClasses/Pages/ManageClassesDashboard";
import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";
import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import DataManagementDashboard from "../../../features/DataManagementDashboard/Pages/DataManagementDashboard";
import DistrictDashboard from "../../../features/District&Schools/Pages/DistrictDashboard";
import SchoolDashboard from "../../../features/District&Schools/Pages/SchoolDashboard";
import EnterDataDashboard from "../../../features/FitnessGram/Pages/EnterDataDashboard";
import EventsList from "../../../features/FitnessGram/Pages/EventsList";
import FgCreateEvent from "../../../features/FitnessGram/Pages/FgCreateEvent";
import FgEditEvent from "../../../features/FitnessGram/Pages/FgEditEvent";
import ErrorsPage from "../../../features/Imports/Components/ErrorsPage";
import ImportsDashboard from "../../../features/Imports/Pages/ImportsDashboard";
import AddMandates from "../../../features/ManageMandates/Pages/AddMandates";
import EditMandates from "../../../features/ManageMandates/Pages/EditMandates";
import MandatesList from "../../../features/ManageMandates/Pages/MandatesList";
import AddUser from "../../../features/ManageUsers/Pages/AddUser";
import ManageUsers from "../../../features/ManageUsers/Pages/ManageUsers";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import RolesAndPrivilegesDashboard from "../../../features/Roles&Privileges/Pages/RolesAndPrivilegesDashboard";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import SystemAdminDashboard from "../../../features/SystemAdminDashboard/SystemAdminDashboard";
import DistrictStatistics from "../../../features/Usage&Statistics/Pages/DistrictStatistics";
import SystemUsage from "../../../features/Usage&Statistics/Pages/SystemUsage";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import EndOfTermProcess from "../../../components/EndOfTermProcess";

import React from "react";
import UnavailablePage from "../../../components/Unavailable";
import { useSelector } from "react-redux";
import CreateNewMapping from "../../../features/Imports/Components/CreateNewMapping";
import EditMapping from "../../../features/Imports/Components/EditMapping";

export default function DistrictAdminRoute() {
	const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
	return (
		<>
			<Route key="D1" index element={<DataManagementDashboard />} />,
			<Route
				key="D2"
				path="data-management"
				element={<DataManagementDashboard />}
			/>
			,
			<Route
				key="D3"
				path="import"
				element={<ImportsDashboard />}
			/>
			,
			<Route key="D4" path="error" element={<ErrorsPage />} />, //{" "}
			<Route path="create-new-mapping" element={<CreateNewMapping />} />, //{" "}
			<Route path="edit/mapping/:id" element={<EditMapping />} />,
			<Route
				key="D5"
				path="manage-classes"
				element={underTexas ? <UnavailablePage /> : <ManageClassesDashboard />}
			/>
			,
			<Route
				key="D6"
				path="manage-classes/school/:schoolId/class/:classId"
				element={underTexas ? <UnavailablePage /> : <Class />}
			/>
			,
			<Route key="D7" path="class" element={<Class />} />, // schools elements
			<Route key="D8" path="schools" element={<DistrictDashboard />} />,
			<Route key="D9" path="system-admin" element={<SystemAdminDashboard />} />,
			<Route key="D10" path="manage-mandates" element={<MandatesList />} />,
			<Route key="D11" path="add-mandates" element={<AddMandates />} />,
			<Route key="D12" path="edit-mandates" element={<EditMandates />} />,
			<Route
				key="D13"
				path="roles-privileges"
				element={<RolesAndPrivilegesDashboard />}
			/>
			,
			<Route
				key="D14"
				path="manage-users"
				element={underTexas ? <UnavailablePage /> : <ManageUsers />}
			/>
			,
			<Route
				key="D15"
				path="edit/:role/:id"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route
				key="D16"
				path="AddUser"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route key="D17" path="email-settings" element={<EmailSettings />} />,
			<Route
				key="D18"
				path="district-statistics"
				element={<DistrictStatistics />}
			/>
			,
			<Route key="D20" path="smartCoach" element={<SmartCoachDashboard />} />,
			<Route
				key="D21"
				path=":eventType/smartCoach"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="D22"
				path=":eventType/smartCoach/:eventId"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route key="D23" path="reports" element={<ReportsDashboard />} />,
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
			<Route key="D35" path="system_usage" element={<SystemUsage />} />, //{" "}
			<Route
				key="D36"
				path="fitnessgram"
				element={underTexas ? <UnavailablePage /> : <EventsList />}
			/>
			,
			<Route
				key="D38"
				path="fitnessgram/CreateEvent"
				element={underTexas ? <UnavailablePage /> : <FgCreateEvent />}
			/>
			,
			<Route
				key="D40"
				path="edit-event/:eventId"
				element={underTexas ? <UnavailablePage /> : <FgEditEvent />}
			/>
			,
			<Route
				key="D41"
				path="adminTest"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="D42"
				path="adminTest/:eventId"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route key="D58" path="my-account" element={<Myaccount />} />,
			<Route key="D59" path="school/:schoolId" element={<SchoolDashboard />} />,
			<Route
				key="D60"
				path="Notifications"
				element={<NotificationsComponent />}
			/>
			,
			<Route key="D61" path="ActivityGramEvent" element={<ComingSoon />} />,
			<Route key="D62" path="ActivityLog" element={<ComingSoon />} />,
			<Route key="D63" path="EndOfTermProcess" element={<EndOfTermProcess />} />
			,
		</>
	);
}
