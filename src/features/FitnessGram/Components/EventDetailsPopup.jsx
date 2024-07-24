import {
	Box,
	Button,
	Flex,
	Image,
	Img,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import calender from "../../../assets/Images/FitnessGramEventImages/Icon awesome-calendar-alt@2x.png";

import present from "../../../assets/Images/FitnessGramEventImages/absent.png";
import absent from "../../../assets/Images/FitnessGramEventImages/absent@2x.png";

import girlImg from "../../../assets/Images/FitnessGramEventImages/Group 3776@2x.png";

import vesselImg from "../../../assets/Images/Navbar/SideNavBarImages/Teacher_Student_Parent_SchoolAdminImages/whistle-1@2x.png";

import excerciseImg from "../../../assets/Images/FitnessGramEventImages/exerciseIcon.svg";

import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import {
	deleteEventData,
	setEventStudentList,
	setFromEvent,
	setSelectedEvent,
} from "../../teacher/teacherSlice";

import moment from "moment";
import { BiEdit } from "react-icons/bi";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import TextIcon from "../../../components/TextIcon";
import { setActivatingID } from "../../../store/slices/profileSlice";
import CautionPopUp from "../../../components/GlobalComponents/CautionPopUp";
import { DELETE_EVENT_FINAL_CAUTION } from "../Pages/EventsList";

function EventDetailsPopup(props) {
	const { event, isViewDataClicked, setIsViewDataClicked } = props;
	const { isOpen, onOpen, onClose } = useDisclosure();

	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
	);
	const upLoading = useSelector((state) => state?.teacher?.upLoading);

	const [deletePopUp, setDeletePopUp] = useState(false);
	const [caution, setCaution] = useState(false);
	const duplicateRole = useSelector((state) => state.profile.duplicateRole);
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const token = useSelector((state) => state.profile.token);
	const userId = useSelector((state) => state.profile.userId);
	const ResponseCode = useSelector((state) => state?.teacher?.responseCode);

	const selectedRole = useSelector((state) => state.profile.selectedRole);

	const smartCoach = () => {
		navigate(`/role/${selectedRole}/fitnessGram/SmartCoach/${event.uuid}`);
		dispatch(setActivatingID(3));
		if (selectedRole == "districtAdmin" || duplicateRole) {
			dispatch(setActivatingID(4));
		}
	};
	const enterData = () => {
		dispatch(setEventStudentList(null));
		navigate(`/role/${selectedRole}/adminTest/${event.uuid}`);
		dispatch(setSelectedEvent(event));
		dispatch(setFromEvent(true));
		if (selectedRole == "districtAdmin" || duplicateRole) {
			dispatch(setActivatingID(8));
		} else {
			dispatch(setActivatingID(2));
		}
	};

	const handleDeleteEvent = () => {
		dispatch(
			deleteEventData({
				eventId: event.uuid,
				token,
				body: { updated_by: userId, updater_role: selectedRole },
			}),
		);
		setIsViewDataClicked(false);
	};

	return (
		<>
			<Modal
				isCentered
				isOpen={isViewDataClicked}
				onClose={() => {
					setIsViewDataClicked(false);
				}}
				size="3xl"
			>
				<ModalOverlay />
				<ModalContent m="3">
					<ModalBody p="0">
						<>
							<Stack spacing={"1"}>
								<Box
									display="flex"
									justifyContent="space-between"
									background="#E7F1FF"
									border="1px"
									borderColor="#E7F1FF"
									borderRadius="3"
									w="100%"
									px={{ base: "0", md: "2" }}
									py="2"
									alignItems="center"
								>
									<Heading6
										textTransform="capitalize"
										letterSpacing={"tight"}
										isTruncated
									>
										{event.event_name}
									</Heading6>
									<Box display="flex">
										{rolesAndPrevilegesObject?.["FitnessGram Event"]
											?.is_delete ?? true ? (
											<Box
												display="flex"
												px={{ base: "3px", md: "10px" }}
												color="black"
												role="button"
												onClick={() => {
													setDeletePopUp(true);
												}}
											>
												<TextIcon
													text={"Delete"}
													icon={upLoading ? <Spinner /> : RiDeleteBin6Line}
													increaseTextSize="increaseTextSize"
													changeIconColor="red"
												/>
											</Box>
										) : (
											<Box
												display="flex"
												px={{ base: "3px", md: "10px" }}
												color="black"
												cursor="not-allowed"
											>
												<TextIcon
													text={"Delete"}
													icon={upLoading ? <Spinner /> : RiDeleteBin6Line}
													increaseTextSize="increaseTextSize"
													changeIconColor="red"
												/>
											</Box>
										)}
										{rolesAndPrevilegesObject?.["FitnessGram Event"]?.edit ??
										true ? (
											<Box
												color="black"
												role="button"
												onClick={() => {
													navigate(
														`/role/${selectedRole}/edit-event/${event.uuid}`,
													);
													// dispatch(setEventDataById({}));
												}}
											>
												<TextIcon
													text={"Edit"}
													icon={BiEdit}
													increaseTextSize="increaseTextSize"
												/>
											</Box>
										) : (
											<Box color="black" cursor="not-allowed">
												<TextIcon
													text={"Edit"}
													icon={BiEdit}
													increaseTextSize="increaseTextSize"
												/>
											</Box>
										)}
									</Box>
								</Box>
								<Box px="4">
									<Box
										display={"flex"}
										flexDirection={{ base: "column", md: "row" }}
										alignItems={{ base: "", md: "center" }}
										gap="2"
									>
										<Box w="full">
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems={{ base: "flex-start", md: "center" }}
												w="100%"
											>
												<Box
													display="flex"
													w={{ base: "50%", md: "50%" }}
													gap="3"
													alignItems={{ base: "flex-start", md: "center" }}
												>
													<Box>
														<Image
															mt="1"
															src={calender}
															w={{ base: "5", md: "5", lg: "4" }}
															h={{ base: "5", md: "5", lg: "4" }}
														/>
													</Box>

													<Box pt={{ base: "2" }}>
														<Heading8>Start Date</Heading8>
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
													pt={{ base: "2", md: "2" }}
												>
													<Heading8>&#58;</Heading8>
													<Heading8
														// textStyle='textHead'
														// w='full'
														whiteSpace="wrap"
														pr={{ lg: "2" }}
														pt={{ base: "1", md: "0" }}
													>
														{moment(event?.start_date).format(
															navigator.language === "en-GB"
																? "DD-MM-YYYY"
																: "MM-DD-YYYY",
														)}{" "}
													</Heading8>
												</Box>
											</Box>
										</Box>

										<Box w="full">
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems={{ base: "flex-start", md: "center" }}
												w="100%"
											>
												<Box
													display="flex"
													w={{ base: "50%", md: "50%" }}
													gap="3"
													alignItems={{ base: "flex-start", md: "center" }}
												>
													<Box>
														<Image
															mt="1"
															src={calender}
															w={{ base: "5", md: "5", lg: "4" }}
															h={{ base: "5", md: "5", lg: "4" }}
														/>
													</Box>

													<Box pt={{ base: "2" }}>
														<Heading8>End Date</Heading8>
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
													pt={{ base: "2", md: "2" }}
												>
													<Heading8>&#58;</Heading8>
													<Heading8
														// textStyle='textHead'
														// w='full'
														whiteSpace="wrap"
														pr={{ lg: "2" }}
														pt={{ base: "1", md: "0" }}
													>
														{moment(event?.end_date).format(
															navigator.language === "en-GB"
																? "DD-MM-YYYY"
																: "MM-DD-YYYY",
														)}
													</Heading8>
												</Box>
											</Box>
										</Box>

										<Box>
											<Img
												src={girlImg}
												alt="girl-image"
												display={{ base: "none", lg: "flex", md: "flex" }}
												w={{ base: "none", md: "10rem", lg: "10rem" }}
												h={{ base: "none", md: "5rem", lg: "5rem" }}
												mr="2"
											/>
										</Box>
									</Box>
									<Box
										display={"flex"}
										flexDirection={{ base: "column", md: "row" }}
										alignItems={{ base: "", md: "center" }}
										gap={{ base: "1", md: "5" }}
									>
										<Box w="full">
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems={{ base: "flex-start", md: "center" }}
												w="100%"
											>
												<Box
													display="flex"
													w={{ base: "50%", md: "50%" }}
													gap="3"
													alignItems={{ base: "flex-start", md: "center" }}
												>
													<Box>
														<Image
															mt="1"
															src={absent}
															w={{ base: "5", md: "5", lg: "4" }}
															h={{ base: "5", md: "5", lg: "4" }}
														/>
													</Box>

													<Box pt={{ base: "2" }}>
														<Heading8>Participants</Heading8>
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
													pt={{ base: "2", md: "2" }}
												>
													<Heading8>&#58;</Heading8>
													<Heading8
														// textStyle='textHead'
														// w='full'
														whiteSpace="wrap"
														pr={{ lg: "2" }}
														pt={{ base: "1", md: "0" }}
													>
														{event.participants}
													</Heading8>
												</Box>
											</Box>
										</Box>

										<Box w="full">
											<Box
												display="flex"
												justifyContent="space-between"
												alignItems={{ base: "flex-start", md: "center" }}
												w="100%"
											>
												<Box
													display="flex"
													w={{ base: "50%", md: "50%" }}
													gap="3"
													alignItems={{ base: "flex-start", md: "center" }}
												>
													<Box>
														<Image
															mt="1"
															src={present}
															w={{ base: "5", md: "5", lg: "4" }}
															h={{ base: "5", md: "5", lg: "4" }}
														/>
													</Box>

													<Box pt={{ base: "2" }}>
														<Heading8>Missing Data</Heading8>
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
													pt={{ base: "2", md: "2" }}
												>
													<Heading8>&#58;</Heading8>
													<Heading8
														// textStyle='textHead'
														// w='full'
														whiteSpace="wrap"
														pr={{ lg: "2" }}
														pt={{ base: "1", md: "0" }}
													>
														{event?.incompleted || 0}
													</Heading8>
												</Box>
											</Box>
										</Box>
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
												<Img src={excerciseImg} w="5" h="10" />

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
												ml={{ base: "0", md: "0.15rem" }}
											>
												<Heading8>&#58;</Heading8>
												<Heading8
													// textStyle='textHead'
													// w='full'
													whiteSpace="wrap"
													pr={{ lg: "2" }}
													pt={{ base: "1", md: "0" }}
												>
													{event?.test_items.join(", ") || (
														<Text color="red">Data Not Found</Text>
													)}
												</Heading8>
											</Box>
										</Box>
									</Box>

									<Flex
										direction="column"
										gap="2"
										mt="3"
										justifyContent="center"
										alignItems="center"
									>
										<Box
											display="flex"
											justifyContent="center"
											bg="primary"
											alignItems="center"
											py="2"
											w={{ base: "17rem", md: "18rem" }}
											rounded="lg"
											color="white"
											onClick={() => smartCoach()}
											cursor="pointer"
											role="button"
										>
											<Img src={vesselImg} w="5" h="5" mt="0" mr="3" mb="1" />
											<Box mt="0.01rem">
												<Heading8> SmartCoach Resources</Heading8>
											</Box>
										</Box>

										<Button
											bg="primary"
											color="white"
											onClick={() => {
												enterData();
											}}
											w={{ base: "17rem", md: "18rem" }}
											role="button"
										>
											<Heading8>Enter Data</Heading8>
										</Button>
									</Flex>
								</Box>
							</Stack>
						</>
					</ModalBody>

					<ModalFooter></ModalFooter>
				</ModalContent>
			</Modal>
			{deletePopUp && (
				<DeletePopUp
					setDeletePopUp={setDeletePopUp}
					deletePopUp={deletePopUp}
					text={"Are you sure you want to delete the event?"}
					onClick={() => setCaution(true)}
				/>
			)}
			{caution && (
				<CautionPopUp
					setCaution={setCaution}
					caution={caution}
					text={DELETE_EVENT_FINAL_CAUTION}
					onClick={handleDeleteEvent}
				/>
			)}{" "}
		</>
	);
}

export default EventDetailsPopup;
