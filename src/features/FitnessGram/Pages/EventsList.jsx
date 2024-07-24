import React, { useEffect, useState } from "react";

import { Stack } from "@chakra-ui/react";

import {
	Box,
	Center,
	Flex,
	Image,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";

import noEvents_teacher from "../../../assets/Images/FitnessGramEventImages/noEvents_teacher.svg";

import {
	deleteEventData,
	getEventsList,
	setEventsList,
	setTotalPages,
} from "../../teacher/teacherSlice";

import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import { getTeachersForLoginUserApiCall } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import EventDetailsPopup from "../Components/EventDetailsPopup";
import EventOptionsControls from "../Components/EventOptionsControls";
import GridEventsList from "./GridEventsList";
import ListViewEvents from "./ListViewEvents";
import PaginationComponent from "../../../components/PaginationComponent";
import CautionPopUp from "../../../components/GlobalComponents/CautionPopUp";

export const DELETE_EVENT_FINAL_CAUTION = `There may be admin or other users linked to this event, by deleting this test event all data will be delete for you and any other user linked to the test event, 
do you wish to proceed?`;

const EventsList = () => {
	const [isViewDataClicked, setIsViewDataClicked] = useState(false);

	const [selectedEventCardData, setSelectedEventCardData] = useState({});

	const [eventsView, setEventsView] = useState("GridView");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const loading = useSelector((state) => state?.teacher?.loading);
	const duplicateRole = useSelector((state) => state.profile.duplicateRole);
	const token = useSelector((state) => state.profile.token);
	const userId = useSelector((state) => state?.profile?.userId);
	const role = useSelector((state) => state.profile.selectedRole);
	const totalPages = useSelector((state) => state?.teacher?.totalPages);
	const code = useSelector((state) => state.profile.code);
	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
	);
	const isSideBarOpen = useSelector((state) => state.profile.openSideBar);

	const eventsList = useSelector((state) => state?.teacher?.eventsList);

	const [events, setEvents] = useState([]);
	const [deletePopUp, setDeletePopUp] = useState(false);

	const [data, setData] = useState({
		pageNumber: 1,
		sortCondition: "event_start_date_ASC",
		searchTerm: "",
		teacherUUIDs: [],
	});

	const [caution, setCaution] = useState(false);
	const isPreviousButtonDisabled = data.pageNumber === 1;
	const isNextButtonDisabled = data.pageNumber === totalPages;

	const handlePageNumber = (event) => {
		setData((prevState) => ({ ...prevState, pageNumber: event.selected + 1 }));
	};

	const handleDelete = (item) => {
		setSelectedEventCardData(item);

		setDeletePopUp(true);
	};

	const handleViewData = (item) => {
		setSelectedEventCardData(item);
		setIsViewDataClicked(true);
	};

	const handleEventsView = (selectedView) => {
		setEventsView(selectedView);
	};

	const handleChild = () => {
		if (loading) {
			return (
				<Center h={"60vh"}>
					<Image src={loading_img} />
				</Center>
			);
		}

		if (!eventsList?.length) {
			return (
				<Center h={"60vh"}>
					<Flex direction="column" alignItems="center">
						<Image src={noEvents_teacher} w="20rem" />
						<Text fontFamily="poppins-semoibold" mt="2">
							No Events Found
						</Text>
						<Text textStyle="h7" mt="2">
							Nothing available at the moment!{" "}
						</Text>

						{rolesAndPrevilegesObject?.["FitnessGram Event"]?.is_add ?? true ? (
							<Box
								cursor="pointer"
								role="button"
								onClick={() => {
									if (role === "districtAdmin" || duplicateRole) {
										navigate(`/role/${role}/fitnessgram/CreateEvent`);
									} else {
										navigate(`/role/${role}/CreateEvent`);
									}
								}}
							>
								<Text textStyle="h7" mt="2">
									Create new event{" "}
									<Text as="span" color="#0081C8">
										here
									</Text>
								</Text>
							</Box>
						) : (
							<Box cursor="not-allowed">
								<Text textStyle="h7" mt="2">
									Create new event{" "}
									<Text as="span" color="#0081C8">
										here
									</Text>
								</Text>
							</Box>
						)}
					</Flex>
				</Center>
			);
		}

		return (
			<>
				{rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true ? (
					<>
						<Box h="calc(100vh - 12rem)">
							{eventsView === "GridView" ? (
								<GridEventsList
									handleDelete={handleDelete}
									handleViewData={handleViewData}
									data={data}
									events={events}
									handlePageNumber={handlePageNumber}
								/>
							) : (
								<ListViewEvents
									data={data}
									events={events}
									handleViewData={handleViewData}
									handlePageNumber={handlePageNumber}
								/>
							)}

							{totalPages > 1 && (
								<Flex justifyContent={{ base: "flex-end", lg: "flex-end" }}>
									<PaginationComponent
										onPageChange={handlePageNumber}
										pageCount={totalPages}
										forcePage={data?.pageNumber - 1}
										isNextButton={isNextButtonDisabled}
										isPreviousButton={isPreviousButtonDisabled}
									/>
								</Flex>
							)}
						</Box>

						{deletePopUp && (
							<DeletePopUp
								setDeletePopUp={setDeletePopUp}
								deletePopUp={deletePopUp}
								text={"Are you sure you want to delete the event?"}
								onClick={() => setCaution(true)}
							/>
						)}{" "}
						{caution && (
							<CautionPopUp
								setCaution={setCaution}
								caution={caution}
								text={DELETE_EVENT_FINAL_CAUTION}
								onClick={handleDeleteEvent}
							/>
						)}{" "}
						{isViewDataClicked ? (
							<EventDetailsPopup
								isViewDataClicked={isViewDataClicked}
								setIsViewDataClicked={setIsViewDataClicked}
								event={selectedEventCardData}
							/>
						) : null}
					</>
				) : (
					<>
						<Box h="calc(100vh - 12rem)">
							{eventsView === "GridView" ? (
								<GridEventsList
									handleDelete={handleDelete}
									handleViewData={handleViewData}
									data={data}
									events={events}
									handlePageNumber={handlePageNumber}
								/>
							) : (
								<ListViewEvents
									data={data}
									events={events}
									handleViewData={handleViewData}
									handlePageNumber={handlePageNumber}
								/>
							)}

							{totalPages > 1 && (
								<Flex justifyContent={{ base: "flex-end", lg: "flex-end" }}>
									<PaginationComponent
										onPageChange={handlePageNumber}
										pageCount={totalPages}
										forcePage={data?.pageNumber - 1}
										isNextButton={isNextButtonDisabled}
										isPreviousButton={isPreviousButtonDisabled}
									/>
								</Flex>
							)}
						</Box>
						{deletePopUp && (
							<DeletePopUp
								setDeletePopUp={setDeletePopUp}
								deletePopUp={deletePopUp}
								text={"Are you sure you want to delete the event?"}
								onClick={() => setCaution(true)}
							/>
						)}{" "}
						{caution && (
							<CautionPopUp
								setCaution={setCaution}
								caution={caution}
								text={DELETE_EVENT_FINAL_CAUTION}
								onClick={handleDeleteEvent}
							/>
						)}{" "}
						{isViewDataClicked ? (
							<EventDetailsPopup
								isViewDataClicked={isViewDataClicked}
								setIsViewDataClicked={setIsViewDataClicked}
								event={selectedEventCardData}
							/>
						) : null}
					</>
				)}
			</>
		);
	};

	useEffect(() => {
		setEvents([...eventsList]);
	}, [eventsList]);

	useEffect(() => {
		if (role !== "superAdmin" || duplicateRole) {
			dispatch(getEventsList({ token, data: data }));
		}
	}, [data.sortCondition, data.pageNumber, token, data.teacherUUIDs]);

	useEffect(() => {
		if (code === 200) {
			dispatch(getEventsList({ token, data: data }));
		}
	}, [code]);

	useEffect(() => {
		let body = {
			search: "",
		};

		!["student", "teacher"].includes(role) &&
			dispatch(getTeachersForLoginUserApiCall({ token, body }));
		dispatch(setEventsList([]));
		setEvents([]);
		return () => {
			dispatch(setTotalPages(""));
			setEvents([]);
		};
	}, []);

	const handleDeleteEvent = (item) => {
		dispatch(
			deleteEventData({
				eventId: selectedEventCardData.uuid,
				token,
				body: { updated_by: userId, updater_role: role },
			}),
		);
		setIsViewDataClicked(false);
	};

	return (
		<Flex
			direction="column"
			height="full"
			overflowY="auto"
			gap="4"
			overflowX="hidden"
			className="example"
		>
			<EventOptionsControls
				data={data}
				setData={setData}
				handleEventsView={handleEventsView}
				eventsView={eventsView}
			/>
			{handleChild()}
		</Flex>
	);
};

export default EventsList;
