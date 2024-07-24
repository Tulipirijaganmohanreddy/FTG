import React from "react";

import { Route } from "react-router-dom";

import FgCreateEvent from "../../../features/FitnessGram/Pages/FgCreateEvent";
import FgEditEvent from "../../../features/FitnessGram/Pages/FgEditEvent";
import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";
import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import SchoolsList from "../../../features/District&Schools/Components/SchoolsList";
import SchoolDashboard from "../../../features/District&Schools/Pages/SchoolDashboard";
import EnterDataDashboard from "../../../features/FitnessGram/Pages/EnterDataDashboard";
import EventsList from "../../../features/FitnessGram/Pages/EventsList";
import Class from "../../../features/ManageClasses/Pages/Class";
import ManageClassesDashboard from "../../../features/ManageClasses/Pages/ManageClassesDashboard";
import AddUser from "../../../features/ManageUsers/Pages/AddUser";
import ManageUsers from "../../../features/ManageUsers/Pages/ManageUsers";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import UnavailablePage from "../../../components/Unavailable";
import { useSelector } from "react-redux";

export default function SchoolAdminRoute() {
	const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
	return (
		<>
			<Route
				key="SC1"
				index
				element={underTexas ? <UnavailablePage /> : <EventsList />}
			/>
			,
			<Route key="SC2" path="smartCoach" element={<SmartCoachDashboard />} />,
			<Route
				key="SC3"
				path=":eventType/smartCoach"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="SC4"
				path=":eventType/smartCoach/:eventId"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="SC6"
				path="CreateEvent"
				element={underTexas ? <UnavailablePage /> : <FgCreateEvent />}
			/>
			,
			<Route
				key="SC10"
				path="manage-classes"
				element={underTexas ? <UnavailablePage /> : <ManageClassesDashboard />}
			/>
			,
			<Route
				key="SC11"
				path="manage-users"
				element={underTexas ? <UnavailablePage /> : <ManageUsers />}
			/>
			, //{" "}
			<Route
				key="SC15"
				path="adminTest"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="SC16"
				path="adminTest/:eventId"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route key="SC23" path="reports" element={<ReportsDashboard />} />,
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
			<Route key="SC44" path="schools" element={<SchoolsList />} />, // ,
			<Route key="SC46" path="school/:schoolId" element={<SchoolDashboard />} />
			,
			<Route
				key="SC47"
				path="manage-classes/school/:schoolId/class/:classId"
				element={underTexas ? <UnavailablePage /> : <Class />}
			/>
			
			,
			<Route
				key="T24"
				path="AddUser"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>,
			<Route
				key="SC49"
				path="edit/:role/:id"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route
				key="SC58"
				path="edit-event/:eventId"
				element={underTexas ? <UnavailablePage /> : <FgEditEvent />}
			/>
			,
			<Route key="SC65" path="my-account" element={<Myaccount />} />,
			<Route
				key="SC67"
				path="Notifications"
				element={<NotificationsComponent />}
			/>
			,
			<Route key="SC68" path="ActivityGramEvent" element={<ComingSoon />} />,
			<Route key="SC69" path="ActivityLog" element={<ComingSoon />} />,
		</>
	);
}
