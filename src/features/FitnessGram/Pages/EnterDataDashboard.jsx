import { Box, Flex, Grid, GridItem, Image } from "@chakra-ui/react";
import React, { useEffect, memo, useCallback, useRef, useContext } from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import loadingimg from "../../../../src/assets/Images/FitnessGramEventImages/loading.gif";
import {
	fgStoreStudentData,
	getClassListByEvent,
	getEventStudentList,
	getFgEventsList,
} from "../../teacher/teacherSlice";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import { debounce } from "../../../Utilities/utils";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import EnterDataTable from "../Components/EnterDataTable";
import {
	setLogoutClicked,
	setMessage,
} from "../../../store/slices/profileSlice";
import AppContext from "../../../Context/AppContext";

const typeOfEntry = [
	{ value: "By Class", label: "Enter by Class" },
	{
		value: "By Student",
		label: " Enter by Student",
	},
];

const EnterDataDashboard = (props) => {
	const dispatch = useDispatch();

	const params = useParams();

	const navigate = useNavigate();

	const searchClassRef = useRef("");

	const loading = useSelector((state) => state.teacher.loading);

	const storeDataLoading = useSelector(
		(state) => state.teacher.storeDataLoading,
	);
	const isLogoutClicked = useSelector((state) => state.profile.isLogoutClicked);
	const token = useSelector((state) => state.profile.token);

	const userId = useSelector((state) => state?.profile?.userId);

	const selectedRole = useSelector((state) => state?.profile?.selectedRole);

	const eventsList = useSelector((state) => state?.teacher?.fgEventsList);

	const classesList = useSelector((state) => state?.teacher?.classesByEvent);

	const eventStudentList = useSelector(
		(state) => state?.teacher?.eventStudentList?.response,
	);

	const { dataEntryRef, DATA_ENTRY_WAIT_MSG } = useContext(AppContext);

	const [classes, setClasses] = useState([]);

	const [selectedClasses, setSelectedClasses] = useState([]);

	const [missingData, setMissingData] = useState(false);

	const [data, setData] = useState({
		eventId: params?.eventId ?? "",
		type: params?.eventId ? "By Student" : "",
		classes: [],
	});

	const handleMissingData = useCallback(() => {
		if (dataEntryRef.current) {
			handleWait();
			return;
		}
		setMissingData((prevData) => !prevData);
	}, [missingData]);

	const handleWait = () => {
		dispatch(setMessage(DATA_ENTRY_WAIT_MSG));
	};
	const handleFinalStoreData = () => {
		if (dataEntryRef?.current) {
			dispatch(fgStoreStudentData({ body: [dataEntryRef.current], token }));
		}

		dataEntryRef.current = null;
	};
	const handleTestEvent = (e) => {
		if (storeDataLoading || dataEntryRef.current) {
			handleWait();
			handleFinalStoreData();
			return;
		}
		const { value, ...rest } = e.target;
		setData({ eventId: value, type: "", classes: [] });
		navigate(`/role/${selectedRole}/adminTest/${value}`);
	};

	const handleTypeOfEntry = (e) => {
		if (storeDataLoading || dataEntryRef.current) {
			handleWait();
			handleFinalStoreData();
			return;
		}
		const { value, ...rest } = e.target;
		missingData && setMissingData((prevData) => !prevData);
		setData((prevData) => ({ ...prevData, type: value, classes: [] }));
		setSelectedClasses([]);
	};

	const handleClasses = (classesList) => {
		if (storeDataLoading || dataEntryRef.current) {
			handleWait();
			handleFinalStoreData();
			return;
		}
		// dispatch(setEventStudentList(null));
		if (classesList?.length > 1 && classesList[0].label == "All") {
			setSelectedClasses([classesList?.[1]]);
			setData((prevData) => ({
				...prevData,
				classes: [classesList?.[1]?.value],
			}));
		} else {
			let all_value = null;
			if (classesList?.length) {
				for (let clas of classesList) {
					if (clas.label == "All") {
						all_value = clas;
						break;
					}
				}
			}

			if (all_value) {
				setSelectedClasses(all_value);
				setData((prevData) => ({ ...prevData, classes: [...all_value.value] }));

				// setDisplayClasses([all_value]);
			} else {
				// setDisplayClasses(classesList);
				setData((prevData) => ({
					...prevData,
					classes: [...classesList?.map((item) => item?.value)],
				}));
				setSelectedClasses(classesList);
			}
		}
	};

	const handleSearchClasses = debounce((text) => {
		if (text?.length != 1 && searchClassRef.current != text) {
			const body = { eventId: data.eventId, searchTerm: text };
			dispatch(getClassListByEvent({ token, body }));

			searchClassRef.current = text;
		}
	}, 1000);

	const handleChild = () => {
		if (!data.eventId) {
			return <ErrorText>PLEASE SELECT THE EVENT</ErrorText>;
		}

		if (!data.type) {
			return <ErrorText>PLEASE SELECT THE TYPE OF ENTRY</ErrorText>;
		}

		if (loading) {
			return <Image src={loadingimg} />;
		}

		if (!eventStudentList?.length && !missingData) {
			return <ErrorText>NO STUDENTS FOR THE SELECTED EVENT</ErrorText>;
		}

		return (
			<EnterDataTable
				eventId={data.eventId}
				missingData={missingData}
				handleMissingData={handleMissingData}
				handleWait={handleWait}
				ref={dataEntryRef}
				handleFinalStoreData={handleFinalStoreData}
			/>
		);
	};

	useEffect(() => {
		dispatch(getFgEventsList({ token }));
	}, []);

	useEffect(() => {
		if (classesList?.length) {
			let classOptions = [];
			const classUuidArr = classesList?.map((each) => {
				classOptions.push({ label: each.class_name, value: each.uuid });
				return each.uuid;
			});
			classOptions.unshift({ label: "All", value: classUuidArr });
			!selectedClasses.length &&
				setSelectedClasses({ label: "All", value: classUuidArr });
			setClasses(classOptions);
		} else {
			setClasses([]);
		}
	}, [classesList]);

	useEffect(() => {
		if (data.eventId && data.type && !missingData) {
			let body = {
				accesser_uuid: userId,
				accesser_role: selectedRole,
				missing_data: missingData,
			};
			if (data.type === "By Class" && data?.classes?.length) {
				body.classes = data.classes;
			}

			dispatch(
				getEventStudentList({
					token,
					body,
					pageNumber: "1",
					eventId: data.eventId,
				}),
			);
		}
	}, [data.type, missingData]);

	useEffect(() => {
		if (data?.classes?.length) {
			let body = {
				accesser_uuid: userId,
				accesser_role: selectedRole,
				missing_data: missingData,
				classes: data?.classes,
			};

			dispatch(
				getEventStudentList({
					token,
					body,
					pageNumber: "1",
					eventId: data.eventId,
				}),
			);
		}
	}, [data?.classes]);

	useEffect(() => {
		if (missingData) {
			let body = {
				accesser_uuid: userId,
				accesser_role: selectedRole,
				missing_data: missingData,
			};

			if (data.type === "By Class" && data?.classes?.length) {
				body.classes = data.classes;
			}

			dispatch(
				getEventStudentList({
					token,
					body,
					pageNumber: "1",
					eventId: data.eventId,
				}),
			);
		}
	}, [missingData]);

	useEffect(() => {
		if (data.eventId.length) {
			const body = { eventId: data.eventId, searchTerm: "" };
			dispatch(getClassListByEvent({ token, body }));
		}
	}, [data.eventId]);
	useEffect(() => {
		let timer = setInterval(() => {
			handleFinalStoreData();
		}, 5000);
		return () => {
			clearInterval(timer);
		};
	}, []);
	useEffect(() => {
		if (isLogoutClicked) {
			handleFinalStoreData();
			dispatch(setLogoutClicked(false));
		}
	}, [isLogoutClicked]);

	return (
		<Flex direction="column" gap="4">
			<Heading1>ADMINISTER TEST</Heading1>
			<Grid
				templateColumns={{
					base: "repeat(1,1fr)",
					lg: "repeat(3,1fr)",
					md: "repeat(2,1fr)",
				}}
				gap={{ base: "1", md: "7" }}
			>
				<GridItem>
					<Box>
						<SingleSelect2
							id={"eventName"}
							placeholder="Select"
							label={"Select the test event below"}
							onChange={handleTestEvent}
							value={data.eventId}
							optionsProps={eventsList}
							displayKey={"event_name"}
							optionValue={"uuid"}
						/>
					</Box>
				</GridItem>
				<GridItem>
					<SingleSelect2
						id={"entryType"}
						placeholder="Select"
						label={"Select the type of Entry"}
						onChange={(e) => handleTypeOfEntry(e)}
						// name={item?.name}
						value={data.type}
						optionsProps={typeOfEntry}
						displayKey={"label"}
						optionValue={"value"}
					/>
				</GridItem>
				{data.type === "By Class" ? (
					<GridItem>
						<MultiSelector
							id={"eventClasses"}
							label={"Please Select Classes"}
							options={classes}
							onChange={handleClasses}
							value={selectedClasses}
							onInputChange={handleSearchClasses}
							// error={errors?.classes ? errors?.classes : ""}
						/>
					</GridItem>
				) : null}
			</Grid>
			<Flex direction="column" gap="4" alignItems="center">
				{handleChild()}
			</Flex>
		</Flex>
	);
};

export default memo(EnterDataDashboard);
