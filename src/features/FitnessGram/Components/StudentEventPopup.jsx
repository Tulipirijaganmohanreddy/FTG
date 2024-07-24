import {
	Box,
	Img,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Tooltip,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { Flex, useDisclosure } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import moment from "moment";

import excerciseImg from "../../../assets/Images/FitnessGramEventImages/exerciseIcon.svg";

import girlImg from "../../../assets/Images/FitnessGramEventImages/Group 3776@2x.png";

import calender from "../../../assets/Images/FitnessGramEventImages/Icon awesome-calendar-alt@2x.png";

import vesselImg from "../../../assets/Images/ActivityGramEventImages/vessel.svg";

import pendingImage from "../../../assets/Images/ActivityGramEventImages/clock-rotate-right-icon.svg";

import tickImage from "../../../assets/Images/ActivityGramEventImages/tick-icon.svg";

import { useNavigate } from "react-router-dom";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import {
	setActivatingID,
	setPreviousPath,
	setTestSelectionButtonClicked,
} from "../../../store/slices/profileSlice";

const StudentEventPopup = (props) => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	//using the user varibale from profileslice

	const loginResponse = useSelector((state) => state?.profile?.user);

	const {
		isViewDataClicked,
		setIsViewDataClicked,
		studentItemCard,
		selectedCard,
		handleClick,
		selectedItem,
	} = props;

	const {
		start_date,
		event_name,
		end_date,
		event_type,
		results,
		total_test_items,
		uuid,
		test_items,
	} = selectedCard;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const smartCoachButtonClicked = () => {
		dispatch(setTestSelectionButtonClicked(true));

		navigate(`/role/Student/fitnessGram/SmartCoach/${uuid}`);

		dispatch(setActivatingID(3));
	};

	const viewEnterDataButtonClicked = (selectedItem) => {
		const userDetails = {
			user_uuid: loginResponse && loginResponse?.uuid,
			event_uuid: selectedItem && selectedItem?.uuid,
		};
		dispatch(setPreviousPath(location.pathname));

		dispatch(setActivatingID(2));

		navigate(`/role/Student/EnterStudentDataTable/${selectedItem.uuid}`);
	};

	useEffect(() => {
		moment.locale("en"); // Example locale, replace 'en' with the desired locale code
	}, []);

	return (
		<>
			{}
			<Box w="sm">
				<Modal
					isOpen={isViewDataClicked}
					onClose={() => {
						setIsViewDataClicked(false);
						onClose;
					}}
					size="3xl"
					isCentered
				>
					<ModalOverlay />
					<ModalContent m="3">
						<ModalBody p="0" key={uuid && uuid}>
							<>
								<Box
									display={"flex"}
									bg="head"
									p="2"
									roundedTopRight={"lg"}
									roundedTopLeft={"lg"}
									justifyContent="space-between"
								>
									<Tooltip
										hasArrow
										label={event_name}
										bg="primary"
										color="white"
										borderRadius={"md"}
										textTransform="capitalize"
									>
										<Box maxW={{ base: "40px", md: "85%" }} overflow={"hidden"}>
											<Heading6 textTransform="capitalize" isTruncated>
												{event_name}
											</Heading6>
										</Box>
									</Tooltip>

									<Flex gap="1" cursor="pointer">
										<Img src={results ? tickImage : pendingImage} alt="image" />

										<Box mt="0.5">
											<NormalHeading changeTextColor={results ? "fit" : "red"}>
												{results ? "Validated" : "Pending"}
											</NormalHeading>
										</Box>
									</Flex>
								</Box>

								<Box mt="3">
									<>
										<Box display="flex" justifyContent="space-between">
											<Box w="full">
												<Box
													w="full"
													display="flex"
													flexDirection={{ base: "column", md: "row" }}
												>
													<Box
														display="flex"
														justifyContent="space-between"
														alignItems="center"
														w="100%"
													>
														<Box
															display="flex"
															w="50%"
															gap="3"
															alignItems="center"
														>
															<Img src={calender} w="5" h="5" ml="4" />
															<Heading8>Start Date</Heading8>
														</Box>

														<Box
															display="flex"
															w="60%"
															gap="2"
															justifyContent={{
																base: "flex-start",
																md: "flex-start",
															}}
															alignItems="center"
														>
															<Heading8>&#58;</Heading8>
															<Heading8>
																{moment(start_date).format(
																	navigator.language === "en-GB"
																		? "DD-MM-YYYY"
																		: "MM-DD-YYYY",
																)}
															</Heading8>
														</Box>
													</Box>

													<Box
														display="flex"
														justifyContent="space-between"
														alignItems="center"
														w="100%"
														mt={{ base: "2", md: "0" }}
													>
														<Box
															display="flex"
															w="50%"
															gap="3"
															alignItems="center"
														>
															<Img src={calender} w="5" h="5" ml="4" />

															<Heading8>End Date</Heading8>
														</Box>

														<Box
															display="flex"
															w="60%"
															gap="2"
															justifyContent={{
																base: "flex-start",
																md: "flex-start",
															}}
															alignItems="center"
														>
															<Heading8>&#58;</Heading8>

															<Heading8>
																{moment(end_date).format(
																	navigator.language === "en-GB"
																		? "DD-MM-YYYY"
																		: "MM-DD-YYYY",
																)}
															</Heading8>
														</Box>
													</Box>
												</Box>

												<Box display="flex" gap="3" alignItems="center" mt="2">
													<Img src={excerciseImg} w="5" h="10" ml="4" />

													<Heading4
														textTransform="capitalize"
														letterSpacing={"tight"}
													>
														{" "}
														{total_test_items && total_test_items} Test Items
													</Heading4>
												</Box>
											</Box>

											<Img
												src={girlImg}
												alt="girl-image"
												display={{ base: "none", lg: "flex", md: "flex" }}
												w={{ base: "none", md: "5rem", lg: "5rem" }}
												h={{ base: "none", md: "5rem", lg: "5rem" }}
												mr="2"
											/>
										</Box>

										<Box w="full">
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems="flex-start"
												w="100%"
											>
												<Box
													display="flex"
													w={{ base: "50%", md: "18%" }}
													gap="3"
													alignItems="flex-start"
												>
													<Img src={excerciseImg} w="5" h="10" ml="4" />

													<Box pt={{ base: "3" }}>
														<Heading8>Test Items</Heading8>
													</Box>
												</Box>

												<Box
													display="flex"
													w={{ base: "60%", md: "82%" }}
													gap="2"
													justifyContent={{
														base: "flex-start",
														md: "flex-start",
													}}
													alignItems="flex-start"
													pt={{ base: "2", md: "3" }}
												>
													<Heading8>&#58;</Heading8>
													<Heading8
														// textStyle='textHead'
														// w='full'
														whiteSpace="wrap"
														pr={{ lg: "2" }}
														pt={{ base: "1", md: "0" }}
													>
														{test_items?.join(", ")}
													</Heading8>
												</Box>
											</Box>
										</Box>
									</>
								</Box>

								<Flex
									direction="column"
									gap="2"
									mt="3"
									mb="5"
									justifyContent="center"
									alignItems="center"
								>
									<Box w={{ base: "17rem", md: "18rem" }}>
										<Box
											display="flex"
											justifyContent="center"
											bg="primary"
											alignItems="center"
											py="2"
											rounded="lg"
											color="white"
											onClick={smartCoachButtonClicked}
											cursor="pointer"
											role="button"
										>
											<Img w="5" h="5" mt="0" mr="3" mb="1" src={vesselImg} />
											<Box>
												<Heading8> SmartCoach Resources</Heading8>
											</Box>
										</Box>
									</Box>

									<Box w={{ base: "17rem", md: "18rem" }}>
										<Box
											display="flex"
											justifyContent="center"
											bg="primary"
											alignItems="center"
											py="2"
											rounded="lg"
											color="white"
											onClick={() => viewEnterDataButtonClicked(selectedCard)}
											cursor="pointer"
											role="button"
										>
											<Box mt="0.01rem">
												<Heading8> View/Enter/Edit Data</Heading8>
											</Box>
										</Box>
									</Box>
								</Flex>
							</>
						</ModalBody>
					</ModalContent>
				</Modal>
			</Box>
		</>
	);
};

export default StudentEventPopup;
