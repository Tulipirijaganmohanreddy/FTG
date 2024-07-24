import React from "react";
import { Route } from "react-router-dom";
import EnterStudentDataTable from "../../../features/FitnessGram/Components/EnterStudentDataTable";
import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import StudentEventPopup from "../../../features/FitnessGram/Components/StudentEventPopup";
import StudentEventsList from "../../../features/FitnessGram/Pages/StudentEventsList";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import StudentEnterDataDashboard from "../../../features/FitnessGram/Pages/StudentEnterDataDashboard";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import { useSelector } from "react-redux";
import UnavailablePage from "../../../components/Unavailable";

export default function StudentRoute() {
	const underTexas = useSelector(
		(state) => state.profile?.loggedInUserDetails?.under_texas,
	);
	return (
		<>
			<Route
				key="s1"
				index
				element={underTexas ? <UnavailablePage /> : <StudentEventsList />}
			/>
			,
			<Route key="s2" path="mainStudnet" element={<StudentEventPopup />} />,
			<Route
				key="s3"
				path="EnterTestResults"
				element={
					underTexas ? <UnavailablePage /> : <StudentEnterDataDashboard />
				}
			/>
			,
			<Route
				key="s5"
				path="EnterStudentDataTable/:eventId"
				element={underTexas ? <UnavailablePage /> : <EnterStudentDataTable />}
			/>
			,
			<Route key="s6" path="SmartCoach" element={<SmartCoachDashboard />} />,
			<Route
				key="s7"
				path=":eventType/smartCoach"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route
				key="s8"
				path=":eventType/smartCoach/:eventId"
				element={<SmartCoachDashboard />}
			/>
			,
			<Route key="s10" path="reports" element={<ReportsDashboard />} />,
			<Route key="S51" path="reports/fitness" element={<ReportViewDashboard />}>
				<Route
					key="SC02"
					path="FitnessGramStudentReport"
					element={<StudentReportsDashboardList />}
				/>
				,
			</Route>
			,
			<Route
				key="s31"
				path="Notifications"
				element={<NotificationsComponent />}
			/>
			,
			<Route key="s39" path="my-account" element={<Myaccount />} />,
			<Route key="s40" path="ActivityGramEvent" element={<ComingSoon />} />,
			<Route key="s41" path="ActivityLog" element={<ComingSoon />} />,
		</>
	);
}
