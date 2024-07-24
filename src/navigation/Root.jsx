import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import StudentRoute from "../Roles/RoleBasedRouting/StudentRouting/StudentRoute";
import SuperAdminRoute from "../Roles/RoleBasedRouting/SuperAdminRouting/SuperAdminRoute";
import TeacherRoute from "../Roles/RoleBasedRouting/TeacherRouting/TeacherRoute";
import ContainerSharedLayout from "./ContainerSharedLayout";
import GlobalSearchPage from "../Layout/Components/GlobalSearchPage";
import LayoutPage from "../Layout/Pages/LayoutPage";
import ResetPassword from "../MobileResponsive/ForgetScreens/ResetPassword";
import SignInMobile from "../MobileResponsive/SignInMobile";
import SignInPage from "../MobileResponsive/SignInPage";
import SsoLogin from "../MobileResponsive/SsoLogin";
import DistrictAdminRoute from "../Roles/RoleBasedRouting/DistrictAdminRouting/DistrictAdminRoute";
import { PartnerRoute } from "../Roles/RoleBasedRouting/PartnerRouting/PartnerRoute";
import SchoolAdminRoute from "../Roles/RoleBasedRouting/SchoolAdminRouting/SchoolAdminRoute";
import StateAdminRoute from "../Roles/RoleBasedRouting/StateAdminRouting/StateAdminRoute";
import RequiredAuth from "../Utilities/RequiredAuth";
import Files from "../components/Files";
import ContactUs from "../components/ContactUs";
import PageNotFound from "../components/PageNotFound";
import DownloadReport from "../components/DownloadReport";
import ComingSoon from "../components/GlobalComponents/ComingSoon";
const Root = () => {
	return (
		<>
			{" "}
			<Router>
				{" "}
				<Routes>
					{" "}
					<Route key="a" path="/" element={<SignInPage />} />{" "}
					<Route key="aa" path="/Home" element={<SignInPage />} />{" "}
					<Route key="abc" path="/ContactUs" element={<ContactUs />} />{" "}
					<Route key="b" path="/SSO" element={<SsoLogin />} />{" "}
					<Route key="c" path="/signin" element={<SignInMobile />} />{" "}
					<Route key="d" path="/reset/:id" element={<ResetPassword />} />{" "}
					<Route
						key="e"
						path="/files"
						element={
							<RequiredAuth>
								{" "}
								<Files />{" "}
							</RequiredAuth>
						}
					/>{" "}
					<Route
						key="ea"
						path="/download-report"
						element={
							<RequiredAuth>
								{" "}
								<DownloadReport />{" "}
							</RequiredAuth>
						}
					/>{" "}
					<Route
						key="f"
						path="/role"
						element={
							<RequiredAuth>
								{" "}
								<LayoutPage />{" "}
							</RequiredAuth>
						}
					>
						{" "}
						<Route key="g" path="teacher" element={<ContainerSharedLayout />}>
							{" "}
							{TeacherRoute()}{" "}
						</Route>{" "}
						<Route key="h" path="Student" element={<ContainerSharedLayout />}>
							{" "}
							{StudentRoute()}{" "}
						</Route>{" "}
						<Route
							key="i"
							path="schoolAdmin"
							element={<ContainerSharedLayout />}
						>
							{" "}
							{SchoolAdminRoute()}{" "}
						</Route>{" "}
						<Route
							key="j"
							path="superAdmin"
							element={<ContainerSharedLayout />}
						>
							{" "}
							{SuperAdminRoute()}{" "}
						</Route>
						<Route
							key="k"
							path="districtAdmin"
							element={<ContainerSharedLayout />}
						>
							{" "}
							{DistrictAdminRoute()}{" "}
						</Route>{" "}
						<Route
							key="l"
							path="StateAdmin"
							element={<ContainerSharedLayout />}
						>
							{" "}
							{StateAdminRoute}{" "}
						</Route>{" "}
						<Route key="m" path="Partner" element={<ContainerSharedLayout />}>
							{" "}
							{PartnerRoute}{" "}
						</Route>{" "}
						{/* <Route key="m" path="Partner" element={<ComingSoon />} /> */}
						<Route
							key="n"
							path="global-search"
							element={<GlobalSearchPage />}
						/>{" "}
					</Route>{" "}
					<Route key="o" path="*" element={<PageNotFound />} />{" "}
				</Routes>{" "}
			</Router>{" "}
		</>
	);
};
export default Root;
