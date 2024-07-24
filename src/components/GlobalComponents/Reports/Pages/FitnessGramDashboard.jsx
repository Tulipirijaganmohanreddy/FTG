import {
	Card,
	CardBody,
	Center,
	Flex,
	Image,
	Text,
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Button,
	HStack,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import comingsoon_img from "../../../../assets/Images/ComingSoonImages/coming_soon.svg";

import { reportsObj } from "../Config/config";

import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";
import ReportFilterModal from "../Components/ReportFilterModal";
import {
	setInitialPayloadForReports,
	setReportFilter,
	setReportTitle,
} from "../../../../DistrictAdminApis/districtAdminSlice";
import { initialPayload } from "../Components/ReportFilters";
import { setTotalPages } from "../../../../features/teacher/teacherSlice";

const FitnessGramDashboard = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const selectedRole = useSelector((state) => state.profile.selectedRole);

	const routingObj = {
		student: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(`/role/${selectedRole}/reports/fitness/StudentHistoryReport`);
			},
		},

		teacher: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},

			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},

			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStaticReport`,
				);
			},

			5: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramClassScoreReport`,
				);
			},
		},

		districtAdmin: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},

			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},

			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramClassScoreReport`,
				);
			},

			5: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStaticReport`,
				);
			},
		},

		superAdmin: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},

			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},

			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramClassScoreReport`,
				);
			},

			5: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStaticReport`,
				);
			},
		},

		schoolAdmin: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},

			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},

			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramClassScoreReport`,
				);
			},

			5: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStaticReport`,
				);
			},
		},

		stateAdmin: {
			1: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentReport`,
				);
			},

			2: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStudentHistoryReport`,
				);
			},

			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},

			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},

			5: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramStaticReport`,
				);
			},

			6: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramClassScoreReport`,
				);
			},
		},
		partner: {
			3: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramOverviewReport`,
				);
			},
			4: () => {
				navigate(
					`/role/${selectedRole}/reports/fitness/FitnessGramCompletionReport`,
				);
			},
		},
	};

	const handleClick = (selectedCard) => {
		dispatch(setReportTitle(selectedCard?.text));
		dispatch(setReportFilter(selectedCard?.text));
		dispatch(setInitialPayloadForReports(initialPayload[selectedCard?.text]));

		routingObj[selectedRole][selectedCard.id]();
	};

	useEffect(() => {
		dispatch(setTotalPages(null));
	});

	return (
		<>
			{reportsObj[selectedRole]?.fitnessGramReports?.length > 0 ? (
				reportsObj[selectedRole]?.fitnessGramReports?.map((each) => (
					<Accordion allowToggle>
						<AccordionItem
							border="none"
							display={{ base: "block", md: "block" }}
						>
							<AccordionButton
								border="0px"
								background={"#F5F5F5"}
								color="black"
								mt={2}
								_hover={{ bg: "#F5F5F5", color: "black" }}
								roundedTop={"2xl"}
								_focus={{
									boxShadow: "none",
									bg: "#F5F5F5",
									color: "black",
								}}
								_active={{ bg: "#F5F5F5", color: "black" }}
								py={4}
							>
								<Box as="span" flex="1" textAlign="left">
									{each?.text}
								</Box>
								<AccordionIcon />
							</AccordionButton>

							<AccordionPanel pb={4} background="#F5F5F5">
								<>
									{[
										"FitnessGram Completion Report",
										"FitnessGram Student Report",
										"FitnessGram Overview Report",
									].includes(each.text) ? (
										<Flex justifyContent="space-between" alignItems="start">
											<Box w="30rem" textAlign="justify">
												<Paragraph2>{each?.description}</Paragraph2>
											</Box>

											<Box
												bg="fit"
												py="2"
												px="4"
												role="button"
												rounded={"lg"}
												cursor={"pointer"}
												onClick={() => handleClick(each)}
											>
												<Paragraph2 textColor="white">View Report</Paragraph2>
											</Box>
										</Flex>
									) : (
										<Flex justifyContent="space-between" alignItems="start">
											<Box w="30rem" textAlign="justify">
												<Paragraph2>{each?.description}</Paragraph2>
											</Box>

											<ReportFilterModal />
										</Flex>
									)}

									{/* <Box h="50rem">
										<PdfDocument image={each?.image} />
									</Box> */}
											
									<Flex w="full" justifyContent="center" bg="gray"  >
										<Image
										objectFit="cover"
											w={{ base: "20rem", md: "35rem", lg: "48rem" }}
											// aspectRatio="2/3"
											src={each?.image}
											alt="Report Image"
										/>
									</Flex>
								</>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				))
			) : (
				<Center h={"75vh"}>
					<Flex alignItems="center" direction="column">
						<Image src={comingsoon_img} w="20rem" />
						<Text fontFamily="poppins-semoibold" mt="5">
							Coming Soon...{" "}
						</Text>
						<Text textStyle="smallText" mt="2" fontFamily={"poppins-regular"}>
							Stay tuned for the updates!{" "}
						</Text>
					</Flex>
				</Center>
			)}
		</>
	);
};

export default FitnessGramDashboard;
