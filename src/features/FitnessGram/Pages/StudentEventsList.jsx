import React, { useEffect, useState } from "react";
import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import noEvents_teacher from "../../../assets/Images/FitnessGramEventImages/noEvents_teacher.svg";

import run from "../../../assets/Images/FitnessGramEventImages/undraw_fitness_stats_sht6 (1)@2x.png";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Center, Flex, Grid, Image, Text } from "@chakra-ui/react";

import { debounce } from "../../../Utilities/utils";
import PaginationComponent from "../../../components/PaginationComponent";
import { getEventsList } from "../../teacher/teacherSlice";
import StudentEventDataCard from "../Components/StudentEventDataCard";
import StudentEventOptionsControls from "../Components/StudentEventOptionsControls";
import StudentEventPopup from "../Components/StudentEventPopup";

const StudentEventsList = () => {
	const dispatch = useDispatch();

	const token = useSelector((state) => state?.profile?.token);

	const loading = useSelector((state) => state.teacher.loading);

	const storeDataLoading = useSelector(
		(state) => state.teacher.storeDataLoading,
	);

	const openSideBar = useSelector((state) => state?.profile?.openSideBar);

	const totalPages = useSelector((state) => state?.teacher?.totalPages);

	const [events, setEvents] = useState([]);

	const [isViewDataClicked, setIsViewDataClicked] = useState(false);

	const [selectedEventCardData, setSelectedEventCardData] = useState({});

	const [data, setData] = useState({
		pageNumber: 1,
		sortCondition: "event_start_date_ASC",
		searchTerm: "",
	});

	const isPreviousButtonDisabled = data.pageNumber === 1;
	const isNextButtonDisabled = data.pageNumber === totalPages;

	const studentEventsList = useSelector((state) => state?.teacher?.eventsList);

	const handlePageNumber = (event) => {
		setData((prevState) => ({ ...prevState, pageNumber: event.selected + 1 }));
	};
	const handleChange = (e) => {
		setData((prevState) => ({ ...prevState, [e.target.name]: e.target.value }));
	};

	const searchEvents = debounce((text) => {
		setData((prevState) => ({ ...prevState, searchTerm: text, pageNumber: 1 }));
		text?.length != 1 &&
			dispatch(
				getEventsList({
					token,
					data: { ...data, searchTerm: text, pageNumber: 1 },
				}),
			);
	}, 1500);

	useEffect(() => {
		setEvents(studentEventsList);
	}, [studentEventsList]);

	useEffect(() => {
		if (!storeDataLoading) {
			dispatch(getEventsList({ token, data: data }));
		}
	}, [data.sortCondition, data.pageNumber, storeDataLoading]);

	return (
		<Flex direction={"column"} gap={4}>
			<StudentEventOptionsControls
				data={data}
				handleChange={handleChange}
				searchEvents={searchEvents}
			/>

			{loading || storeDataLoading ? (
				<>
					<Center h={"60vh"}>
						<Image src={loading_img} />
					</Center>
				</>
			) : !events?.length ? (
				<Flex direction="column" alignItems="center">
					<Image src={noEvents_teacher} w="20rem" />
					<Text fontFamily="poppins-semoibold" mt="2">
						No Events Found
					</Text>
					<Text textStyle="h7" mt="2">
						No event has been assigned to you!{" "}
					</Text>
				</Flex>
			) : (
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						md: "repeat(2, 1fr)",
						lg: "repeat(2, 1fr)",
						xl: "repeat(3, 1fr)",
						"2xl": !openSideBar ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
					}}
					gap={{ base: "2", lg: "1rem", xl: "5" }}
				>
					{events?.length > 0 &&
						events?.map((each, index) => (
							<StudentEventDataCard
								each={each}
								index={index}
								setSelectedEventCardData={setSelectedEventCardData}
								setIsViewDataClicked={setIsViewDataClicked}
							/>
						))}
				</Grid>
			)}

			{isViewDataClicked ? (
				<StudentEventPopup
					isViewDataClicked={isViewDataClicked}
					setIsViewDataClicked={setIsViewDataClicked}
					selectedCard={selectedEventCardData}
				/>
			) : null}

			{!events?.length || totalPages === 1 ? null : (
				<Flex
					justifyContent={{ base: "center", md: "space-between" }}
					alignItems="center"
					m={{ md: 0, lg: 0, xl: 5 }}
					w="full"
					pt="5"
				>
					<Box
						w={{ md: 40, lg: 60, xl: 60 }}
						px="5"
						display={{ base: "none", md: "block" }}
					>
						{loading ? null : (
							<Image
								src={run}
								w="10rem"
								h="6rem"
								// display={{ base: 'none', md: 'flex' }}
							/>
						)}
					</Box>
					{totalPages > 1 && (
						<Flex
							justifyContent={{ base: "flex-end", lg: "flex-end" }}
							marginRight={{ base: "5px", md: "20px" }}
							my={{ base: "2rem", md: "3rem" }}
						>
							<PaginationComponent
								onPageChange={handlePageNumber}
								pageCount={totalPages}
								forcePage={data?.pageNumber - 1}
								isNextButton={isNextButtonDisabled}
								isPreviousButton={isPreviousButtonDisabled}
							/>
						</Flex>
					)}
				</Flex>
			)}
		</Flex>
	);
};

export default StudentEventsList;
