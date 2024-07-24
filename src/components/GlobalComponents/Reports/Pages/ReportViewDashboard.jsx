import { SearchIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	HStack,
	Img,
	Input,
	InputGroup,
	InputLeftElement,
	Popover,
	PopoverBody,
	PopoverContent,
	PopoverTrigger,
	Portal,
	Radio,
	SimpleGrid,
	Spacer,
	Spinner,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileCsv } from "react-icons/fa";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { Outlet, useLocation } from "react-router-dom";
import Heading1 from "../../../FitnessComponents/FitnessTexts/Heading1";

import { VscFilePdf } from "react-icons/vsc";

import { useDispatch, useSelector } from "react-redux";
import {
	destroyCompletionReportApiCall,
	getCompletionReportApiCall,
	getCompletionReportCsvApiCall,
	getDownloadAllStudentsReportsApi,
	getDownloadCompletionReportApiCall,
	getEmailAllStudentsReportsApi,
	getOverviewReportApiCall,
	getStudentsListForReportsApiCall,
	setInitialPayloadForReports,
	setReportPdfData,
} from "../../../../DistrictAdminApis/districtAdminSlice";
import emailImg from "../../../../assets/Images/ReportImages/email.png";
import ReportFilters from "../Components/ReportFilters";
import StudentReportsDashboardList from "./StudentReportsDashboardList";

import {
	academicYear,
	debounce,
	exportData,
} from "../../../../Utilities/utils";
import {
	getStudentReportApiCall,
	setLoading2,
	setLoading3,
	setMessage,
	setUpLoading,
	setUpLoading2,
} from "../../../../store/slices/profileSlice";
import Heading8 from "../../../FitnessComponents/FitnessTexts/Heading8";
import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";
import DownloadAllEmailCautionModal from "../Components/DownloadAllEmailCautionModal";
import Report from "../Components/Report";

const REPORT_ACTION_TABS = {
	"FitnessGram Student Report": [
		{
			id: "1",
			name: "",
			icon: <Input />,
		},
		{
			id: "2",
			name: "Download All",
			icon: <HiOutlineDocumentDownload size={25} />,
		},
		{
			id: "3",
			name: "Email",
			icon: <Img src={emailImg} marginRight={2} w="5" h="5" />,
		},
		{
			id: "4",
			name: "PDF Download",
			icon: <VscFilePdf size={20} />,
		},
		// {
		// 	id: "5",
		// 	name: "CSV Download",

		// 	icon: <FaFileCsv size={20} />,

		// },
		// {
		//   id: "6",
		//   name: "XPS Download",
		//   icon: <FaFileCsv size={20}/>,
		// },
	],
	COMMON_REPORT_ACTIONS: [
		{
			id: "1",
			name: "PDF Download",
			icon: <VscFilePdf size={20} />,
		},
	],
	COMPLETION_REPORT_ACTIONS: [
		{
			id: "1",
			name: "PDF Download",
			icon: <VscFilePdf size={20} />,
		},
		{
			id: "2",
			name: "CSV Download",

			icon: <FaFileCsv size={20} />,
		},
	],
};
const ReportViewDashboard = () => {
	const { onOpen } = useDisclosure();

	const dispatch = useDispatch();

	const location = useLocation();

	const token = useSelector((state) => state.profile.token);

	const reportTitle = useSelector((state) => state?.districtAdmin?.reportTitle);

	const loading = useSelector((state) => state.profile.loading);

	const Loading2 = useSelector((state) => state.profile.loading2);

	const Loading3 = useSelector((state) => state.profile.loading3);

	const reportPdfData = useSelector(
		(state) => state.districtAdmin.reportPdfData,
	);

	const loggedInUserDetails = useSelector(
		(state) => state?.profile?.loggedInUserDetails,
	);

	const userId = useSelector((state) => state.profile.userId);

	const selectedRole = useSelector((state) => state.profile.selectedRole);

	const searchInputRef = useRef(null);

	const reportPayload = useSelector(
		(state) => state.districtAdmin.initialPayloadForReports,
	);

	const tokenRef = useRef("");

	const [pdfLoading, setPdfLoading] = useState(false);

	const [clickedOption, setClickedOption] = useState("");

	const [isFilterOpenedFirstTime, setIsFilterOpenedFirstTime] = useState(null);

	const [sendEmailTo, setSendEmailTo] = useState(null); // 1 for student, 2 for Parent, 3 for Both

	const completionReport = useSelector(
		(state) => state?.districtAdmin?.completionReport,
	);

	const reportFilter = useSelector((state) => state.districtAdmin.reportFilter);
	const selectedStudent = useSelector(
		(state) => state.districtAdmin.selectedStudentUUIDForReport,
	);

	const [studentReportDetailsObj, setStudentReportDetailsObj] = useState({});

	const initialPayloadForReports = useSelector(
		(state) => state?.districtAdmin?.initialPayloadForReports,
	);

	const schoolAcademicYear = useSelector(
		(state) => state.districtAdmin.schoolAcademicYear,
	);

	const [isShowPopUp, setIsShowPopUp] = useState(null);

	const SPECIFIC_ACTION_OBJ = {
		"Download All": (payload) => {
			dispatch(getDownloadAllStudentsReportsApi({ payload, token }));
		},
		Email: (payload) => {
			dispatch(getEmailAllStudentsReportsApi({ payload, token }));
		},
	};

	const API_CALL_OBJ = {
		"FitnessGram Student Report": (payload) => {
			dispatch(getStudentsListForReportsApiCall({ finalObj: payload, token }));
		},

		"FitnessGram Completion Report": (payload) => {
			dispatch(getCompletionReportApiCall({ body: payload, token }));
		},
		"FitnessGram Overview Report": (payload) => {
			dispatch(getOverviewReportApiCall({ body: payload, token }));
		},
	};

	const downloadPDFName = {
		"FitnessGram Student Report": "Student Report.pdf",
		"FitnessGram Completion Report": "Completion Report.pdf",
	};

	const downLoadingPDFObj = {
		"FitnessGram Student Report": () => {
			if (selectedStudent || selectedRole === "student") {
				const uint8Array = new Uint8Array(reportPdfData);
				exportData(uint8Array, "Student Report.pdf", "application/pdf");
			} else {
				dispatch(setMessage("Please Select a Student to download the Report"));
			}
		},
		"FitnessGram Overview Report": () => {
			const uint8Array = new Uint8Array(reportPdfData);
			exportData(uint8Array, "Overview Report.pdf", "application/pdf");
		},

		"FitnessGram Completion Report": () => {
			dispatch(
				getDownloadCompletionReportApiCall({
					body: { ...reportPayload, pageNo: null, isDownload: true },
					token,
				}),
			);
		},
	};

	const handleSearchChange = debounce((searchText) => {
		if (reportFilter === "FitnessGram Student Report") {
			const { ...finalObj } = initialPayloadForReports;

			finalObj["search"] = searchText;

			if (searchText?.length != 1) {
				dispatch(getStudentsListForReportsApiCall({ finalObj, token }));
				dispatch(
					setInitialPayloadForReports({ ...reportPayload, search: searchText }),
				);
			}
		}
	}, 500);

	const handleSpecificAction = (action, mailTo = 0) => {
		const { schools, ...payload } = initialPayloadForReports;
		const finalObj = {
			...payload,
			school_uuids: schools,
			academic_year: schoolAcademicYear?.years?.[0] || academicYear(),
			search: searchInputRef?.current?.value,
		};

		action == "Email" ? (finalObj["send_mail_to"] = mailTo) : null;

		setIsShowPopUp(finalObj);
	};

	const handleActions = (selectedBox) => {
		setClickedOption(selectedBox?.name);

		if (["Download All", "Email"].includes(selectedBox?.name)) {
			handleSpecificAction(selectedBox?.name);
		} else if (selectedBox?.name === "PDF Download") {
			downLoadingPDFObj[reportFilter]();
		} else if (selectedBox?.name === "CSV Download") {
			if (reportFilter === "FitnessGram Completion Report") {
				dispatch(getCompletionReportCsvApiCall({ token, body: reportPayload }));
			}
		}
	};

	const handleSendEmail = (e) => {
		setSendEmailTo(e.target.value);
		handleSpecificAction("Email", +e.target.value);
	};

	const handleDestroyCompletionReport = () => {
		if (
			reportFilter === "FitnessGram Completion Report" &&
			!["student", "stateAdmin", "partner"].includes(selectedRole)
		) {
			dispatch(
				destroyCompletionReportApiCall({
					body: { action_type: "destroy" },
					token: tokenRef.value ?? token,
				}),
			);
		}
	};

	useEffect(() => {
		sendEmailTo & setSendEmailTo(null);
	}, [reportPayload, Loading3]);

	useEffect(() => {
		if (
			!reportPayload?.search &&
			reportFilter === "FitnessGram Student Report" &&
			selectedRole !== "student"
		) {
			searchInputRef.current.value = "";
		}
	}, [reportPayload?.search]);

	useEffect(() => {
		handleDestroyCompletionReport();

		tokenRef.value = token;
		const payload = {
			...reportPayload,
			start_date: schoolAcademicYear?.start_date || "01 July 2023",
			end_date: schoolAcademicYear?.end_date || "30 June 2024",
			academic_year: schoolAcademicYear?.years?.[0] || academicYear(),
		};

		if (selectedRole === "partner") {
			payload.licenses = [];
		}
		selectedRole !== "student" &&
			dispatch(setInitialPayloadForReports(payload));
		if (
			reportFilter &&
			!["stateAdmin", "partner", "student"].includes(selectedRole)
		) {
			API_CALL_OBJ[reportFilter](payload);
		} else if (selectedRole === "student") {
			const finalObj = {
				...payload,
				school_uuids: reportPayload?.schools,
				student_uuid: userId,
			};

			dispatch(getStudentReportApiCall({ body: finalObj, token }));
			dispatch(setInitialPayloadForReports(finalObj));
		}

		return () => {
			setIsFilterOpenedFirstTime(null);
			setClickedOption("");
			dispatch(setUpLoading(false));
			dispatch(setUpLoading2(false));
			dispatch(setLoading2(false));
			dispatch(setLoading3(false));
			dispatch(setReportPdfData(null));
			handleDestroyCompletionReport();
		};
	}, []);

	return (
		<>
			<Flex direction="column" gap="4">
				<Flex alignItems="center">
					<Heading1>{reportTitle ? reportTitle : ""}</Heading1>

					<Spacer />
					{/* conditionally show and hide the buttons */}
					{(reportFilter !== "FitnessGram Student Report" &&
						!["stateAdmin", "partner"].includes(selectedRole)) ||
					(reportFilter === "FitnessGram Completion Report" &&
						["stateAdmin", "partner"].includes(selectedRole)) ||
					(reportFilter === "FitnessGram Overview Report" &&
						["stateAdmin", "partner"].includes(selectedRole) &&
						(reportPayload?.districts?.length === 1 ||
							reportPayload?.schools?.length === 1)) ? (
						<Flex gap="3" mr="3">
							{REPORT_ACTION_TABS[
								reportFilter?.includes("Completion")
									? "COMPLETION_REPORT_ACTIONS"
									: "COMMON_REPORT_ACTIONS"
							]?.map((item, index) => (
								<Box
									display={{ base: "none", md: "flex", lg: "flex" }}
									position="relative"
									justifyContent={{ base: "flex-start", md: "center" }}
									alignItems={"center"}
									px="4"
									py="2"
									key={index + "action"}
									bg="#F5F9FF"
									cursor="pointer"
									onClick={() => handleActions(item)}
								>
									<Text>
										{clickedOption === item?.name && Loading3 ? (
											<Spinner />
										) : (
											item.icon
										)}
									</Text>

									<Text>{item.name}</Text>
								</Box>
							))}
						</Flex>
					) : null}

					<ReportFilters
						setIsFilterOpenedFirstTime={setIsFilterOpenedFirstTime}
						isFilterOpenedFirstTime={isFilterOpenedFirstTime}
					/>
				</Flex>

				{reportFilter === "FitnessGram Student Report" &&
				selectedRole !== "student" ? (
					<Flex direction="column" gap="1">
						<SimpleGrid
							columns={{ base: "flex flex-row", md: 3, lg: 5 }}
							gap="3"
						>
							{REPORT_ACTION_TABS[reportFilter]?.map((item, index) => {
								return (
									<>
										{item.id === "1" ? (
											<Box
												gap={4}
												display={{ base: "none", md: "flex", lg: "flex" }}
												mt="2"
												key={index + "action"}
											>
												<InputGroup>
													<InputLeftElement
														pointerEvents="none"
														children={<SearchIcon color="gray.300" />}
													/>
													<Input
														type="tel"
														placeholder="Search Student"
														onChange={(event) =>
															handleSearchChange(event.target.value)
														}
														ref={searchInputRef}
													/>
												</InputGroup>
											</Box>
										) : null}
										{item.id == "3" ? (
											<Popover placement="bottom-end" isLazy>
												<PopoverTrigger cursor="pointer">
													<Box
														display={{ base: "none", md: "flex", lg: "flex" }}
														justifyContent={{
															base: "flex-start",
															md: "center",
														}}
														alignItems={"center"}
														cursor="pointer"
														gap="4"
														key={index + "action"}
														mt="2"
														bg="#F5F9FF"
														onClick={() => {
															setClickedOption(item.name);
														}}
													>
														<Text>
															{clickedOption === item?.name && Loading3 ? (
																<Spinner />
															) : (
																item.icon
															)}
														</Text>

														<Text>{item.name}</Text>
													</Box>
												</PopoverTrigger>
												<Portal>
													<PopoverContent
														position="absolute"
														borderWidth="0"
														bg="white"
														w="auto"
														zIndex={401} // So it can go above the map.
														right="0"
													>
														{/* <PopoverArrow /> */}
														<PopoverBody
															userSelect="none"
															whiteSpace="nowrap"
															// boxShadow="2xl"
															boxShadow="outline"
															rounded="md"
														>
															<Stack>
																<HStack>
																	<Radio
																		id="sendMail"
																		onChange={handleSendEmail}
																		name="mailToCondition"
																		value="1"
																		isChecked={sendEmailTo == "1"}
																	></Radio>

																	<Text>Student</Text>
																</HStack>
																<HStack>
																	<Radio
																		id="sendMail"
																		onChange={handleSendEmail}
																		name="mailToCondition"
																		value="2"
																		isChecked={sendEmailTo == "2"}
																	></Radio>

																	<Text>Parent</Text>
																</HStack>

																<HStack>
																	<Radio
																		id="sendMail"
																		onChange={handleSendEmail}
																		name="mailToCondition"
																		value="3"
																		isChecked={sendEmailTo == "3"}
																	></Radio>

																	<Text> Both Parent and Student</Text>
																</HStack>
															</Stack>
														</PopoverBody>
													</PopoverContent>
												</Portal>
											</Popover>
										) : null}
										{!["1", "3"].includes(item.id) ? (
											<Box
												display={{ base: "none", md: "flex", lg: "flex" }}
												position="relative"
												justifyContent={{ base: "flex-start", md: "center" }}
												alignItems={"center"}
												gap="4"
												key={index + "action"}
												mt="2"
												bg="#F5F9FF"
												cursor={
													["PDF Download", "Download All"].includes(item.name)
														? "pointer"
														: null
												}
												onClick={() => handleActions(item)}
											>
												<Text>
													{clickedOption === item?.name &&
													(Loading3 || pdfLoading) ? (
														<Spinner />
													) : (
														item.icon
													)}
												</Text>

												<Text>{item.name}</Text>
											</Box>
										) : null}
									</>
								);
							})}
						</SimpleGrid>
						<Paragraph2>
							Note: Effortlessly locate students by searching with their First
							Name or Last Name or First Name, Last Name or Last Name, First
							Name or Student ID
						</Paragraph2>
					</Flex>
				) : null}

				{selectedRole === "student" ? (
					<Report />
				) : ["stateAdmin", "partner"].includes(selectedRole) &&
				  reportFilter === "FitnessGram Completion Report" ? (
					<Box m="5rem" textAlign={"center"}>
						<Heading8>
							To receive the Completion Report in your email, navigate to
							"Report Filters" at the top right corner in this page. Adjust the
							filters if required, and then click on the "Run Report" button
							located at the bottom of the pop-up.
						</Heading8>
					</Box>
				) : reportFilter === "FitnessGram Overview Report" &&
				  ["stateAdmin", "partner"].includes(selectedRole) &&
				  reportPayload?.districts?.length !== 1 &&
				  reportPayload?.schools?.length !== 1 ? (
					<Box m="5rem" textAlign={"center"}>
						<Heading8>
							To view or to receive the Overview Report in your email, navigate
							to "Report Filters" at the top right corner in this page. Adjust
							the filters if required, and then click on the "Run Report" button
							located at the bottom of the pop-up.
						</Heading8>
					</Box>
				) : (
					<Box h="full" className="example" overflowY={"scroll"}>
						{location?.pathname.includes("FitnessGramStudentReport") ? (
							<StudentReportsDashboardList searchInputRef={searchInputRef} />
						) : (
							<Outlet />
						)}
					</Box>
				)}
			</Flex>

			{isShowPopUp ? (
				<DownloadAllEmailCautionModal
					isShowPopUp={isShowPopUp}
					setIsShowPopUp={setIsShowPopUp}
					action={clickedOption}
					handleSpecificAction={handleSpecificAction}
					SPECIFIC_ACTION_OBJ={SPECIFIC_ACTION_OBJ}
					setSendEmailTo={setSendEmailTo}
				/>
			) : null}
		</>
	);
};

export default ReportViewDashboard;
