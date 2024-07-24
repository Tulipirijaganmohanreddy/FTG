import { Box, Flex, Image, Spinner, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import excel from "../../../../assets/Images/FitnessGramEventImages/excel.svg";
import GloabalTab from "../../../FitnessComponents/FitnessTabs/GloabalTab";
import MobileMenuListDropdown from "../../../FitnessComponents/FitnessTabs/MobileMenuListDropdown";
import Heading from "../../../FitnessComponents/FitnessTexts/Heading";
import {
	getDataExportPFAI,
	getSchoolAcademicYear,
	setReportFilter,
	setReportTitle,
	setStudentsListForReports,
	setTotalCountOfReports,
} from "../../../../DistrictAdminApis/districtAdminSlice";
import { reportsObj } from "../Config/config";
import ActivityGramDashboard from "./ActivityGramDashboard";
import ReportActivity from "./ReportActivity";
import FitnessGramDashboard from "./FitnessGramDashboard";
import ReportFilters from "../Components/ReportFilters";
import DataExport from "../Components/DataExport";

const ReportsDashboard = () => {
	const { buttonsArray, districtAdminbuttonsArray } = reportsObj;

	const dispatch = useDispatch();

	const token = useSelector((state) => state.profile.token);
	const loading = useSelector((state) => state.profile.loading);

	const screenDeviceWidth = useSelector(
		(state) => state?.districtAdmin?.screenDeviceWidth,
	);

	const [activeTab, setActiveTab] = useState(1);

	const [mobileDropdownActiveItem, setMobileDropdownActiveItem] = useState(
		"FITNESSGRAM REPORTS",
	);

	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const loggedInUserDetails = useSelector(
		(state) => state?.profile?.loggedInUserDetails,
	);

	const handleMobileDropdown = (selectedItem) => {
		setMobileDropdownActiveItem(selectedItem?.tabTextName);

		setActiveTab(selectedItem?.id);
	};

	const handleDownloadPFAI = () => {
		if (selectedRole == "stateAdmin") {
			window.open(
				"https://d2d0wpgkzkt4y0.cloudfront.net/frontend-image/FitnessGramDataExport.csv",
				"_self",
			);
		} else {
			dispatch(getDataExportPFAI({ token }));
		}
	};

	useEffect(() => {
		dispatch(setReportTitle(""));

		dispatch(setStudentsListForReports([]));

		dispatch(setTotalCountOfReports(null));

		dispatch(getSchoolAcademicYear({ token }));

		dispatch(setReportFilter(""));
	}, []);

	return (
		<>
			<Flex direction="column" gap="4">
				<Heading>REPORTS</Heading>

				<Flex
					justifyContent={"space-between"}
					display={{ base: "none", md: "flex" }}
				>
					<Box display={{ base: "none", md: "flex" }}>
						<GloabalTab
							activeTab={activeTab}
							setActiveTab={setActiveTab}
							width="12rem"
							tabNamesList={
								[
									"districtAdmin",
									"stateAdmin",
									"superAdmin",
									"partner",
								].includes(selectedRole)
									? districtAdminbuttonsArray
									: buttonsArray
							}
						/>
					</Box>

					<Flex gap="2">
						<Flex>
							{["districtAdmin", "superAdmin"].includes(selectedRole) &&
								(loggedInUserDetails?.texas_district_admin ||
									loggedInUserDetails?.texas_admin) && (
									<Flex
										gap="2"
										cursor="pointer"
										px="4"
										py="0.1rem"
										rounded="3xl"
										display={{ base: "none", md: "flex", lg: "flex " }}
										alignItems="center"
										bg="green"
										onClick={() => handleDownloadPFAI()}
									>
										<Text textStyle={"textHead"} color="white">
											PFAI Export
										</Text>
										{loading ? (
											<Spinner color="white" />
										) : (
											<Image src={excel} w={5} />
										)}{" "}
									</Flex>
								)}
						</Flex>
					</Flex>
				</Flex>

				<Box display={{ base: "block", md: "none" }}>
					<MobileMenuListDropdown
						tabNamesList={
							["districtAdmin", "stateAdmin", "superAdmin"].includes(
								selectedRole,
							)
								? districtAdminbuttonsArray
								: buttonsArray
						}
						handleMobileDropdown={handleMobileDropdown}
						showDropdownActiveItem={mobileDropdownActiveItem}
					/>
				</Box>

				{screenDeviceWidth < 768 && (
					<Flex
						display={{ base: "block", md: "none" }}
						onClick={() => dispatch(setReportFilter("dataExport"))}
					>
						<ReportFilters />
					</Flex>
				)}

				{["districtAdmin", "superAdmin"].includes(selectedRole) &&
					(loggedInUserDetails?.texas_district_admin ||
						loggedInUserDetails?.texas_admin) && (
						<Flex justify={"end"} display={{ base: "block", md: "none" }}>
							<Flex
								cursor={"pointer"}
								display={"flex"}
								gap="2"
								rounded="3xl"
								bg="green"
								// px='4.5rem'
								w="full"
								justifyContent="center"
								py="2"
								onClick={() => handleDownloadPFAI()}
							>
								<Text textStyle={"textHead"} color="white">
									PFAI Export
								</Text>
								{loading ? (
									<Spinner color="white" />
								) : (
									<Image src={excel} w="4" />
								)}
							</Flex>
						</Flex>
					)}
				{["districtAdmin", "stateAdmin", "superAdmin", "partner"].includes(
					selectedRole,
				) ? (
					activeTab === 1 ? (
						<FitnessGramDashboard />
					) : activeTab == 2 ? (
						<ActivityGramDashboard />
					) : activeTab == 3 ? (
						<DataExport />
					) : (
						<ReportActivity />
					)
				) : activeTab === 1 ? (
					<FitnessGramDashboard />
				) : activeTab === 2 ? (
					<ActivityGramDashboard />
				) : (
					<ReportActivity />
				)}
			</Flex>
		</>
	);
};

export default ReportsDashboard;
