import React from "react";

import { Route } from "react-router-dom";

import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";

import FgCreateEvent from "../../../features/FitnessGram/Pages/FgCreateEvent";
import FgEditEvent from "../../../features/FitnessGram/Pages/FgEditEvent";

import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import EnterDataDashboard from "../../../features/FitnessGram/Pages/EnterDataDashboard";
import EventsList from "../../../features/FitnessGram/Pages/EventsList";
import Class from "../../../features/ManageClasses/Pages/Class";
import ManageClassesDashboard from "../../../features/ManageClasses/Pages/ManageClassesDashboard";
import AddUser from "../../../features/ManageUsers/Pages/AddUser";
import ManageUsers from "../../../features/ManageUsers/Pages/ManageUsers";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import { useSelector } from "react-redux";
import UnavailablePage from "../../../components/Unavailable";

export default function TeacherRoute() {
	const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
	return (
		<>
			<Route
				key="T1"
				index
				element={underTexas ? <UnavailablePage /> : <EventsList />}
			/>
			,
			<Route
				key="T2"
				path="fitness-gram"
				element={underTexas ? <UnavailablePage /> : <EventsList />}
			/>
			,
			<Route key="T3" path="smartCoach" element={<SmartCoachDashboard />} />,
			<Route
				key="T4"
				path=":eventType/smartCoach"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="T5"
				path=":eventType/smartCoach/:eventId"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="T6"
				path="CreateEvent"
				element={underTexas ? <UnavailablePage /> : <FgCreateEvent />}
			/>
			,
			<Route
				key="T8"
				path="edit-event/:eventId"
				element={underTexas ? <UnavailablePage /> : <FgEditEvent />}
			/>
			,
			<Route
				key="T13"
				path="manage-classes"
				element={underTexas ? <UnavailablePage /> : <ManageClassesDashboard />}
			/>
			,
			<Route
				key="T14"
				path="manage-users"
				element={underTexas ? <UnavailablePage /> : <ManageUsers />}
			/>
			,
			<Route
				key="T17"
				path="manage-classes/school/:schoolId/class/:classId"
				element={underTexas ? <UnavailablePage /> : <Class />}
			/>
			,
			<Route
				key="T18"
				path="adminTest/:eventId"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="T19"
				path="adminTest"
				element={underTexas ? <UnavailablePage /> : <EnterDataDashboard />}
			/>
			,
			<Route
				key="T24"
				path="AddUser"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route
				key="T25"
				path="edit/:role/:id"
				element={underTexas ? <UnavailablePage /> : <AddUser />}
			/>
			,
			<Route key="T30" path="my-account" element={<Myaccount />} />,
			<Route key="T32" path="reports" element={<ReportsDashboard />} />,
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
			<Route
				key="T47"
				path="Notifications"
				element={<NotificationsComponent />}
			/>
			,
			<Route key="T48" path="ActivityGramEvent" element={<ComingSoon />} />,
			<Route key="T49" path="ActivityLog" element={<ComingSoon />} />,
		</>
	);
}
