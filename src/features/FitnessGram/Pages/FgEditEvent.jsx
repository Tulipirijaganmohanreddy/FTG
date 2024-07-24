import {
	Box,
	Center,
	Flex,
	Grid,
	GridItem,
	HStack,
	Spinner,
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";

import { Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";

import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
	getClassesList,
	getEventDataById,
	getEventTestList,
	getMandateEventTestList,
	getRecentEventTestList,
	getrecommondedEventTestList,
	setEventDataById,
	setResponse,
	updateEvent,
} from "../../teacher/teacherSlice";
import EventCard from "../Components/EventCard";
import EventSuccessPopUp from "../Components/EventSuccessPopUp";
import { createEventData } from "../Config";
import {
	setActivatingID,
	setMessage,
} from "../../../store/slices/profileSlice";
import { debounce } from "../../../Utilities/utils";
import CautionPopUp from "../../../components/GlobalComponents/CautionPopUp";

const REMOVE_TEST_ITEM_CAUTION_TEXT = `You are applying changes that may cause data loss to one or more classes and test items. 
Do you wish to continue?`;
const FgEditEvent = () => {
	const options = [
		{ value: "pre", label: "Pre" },
		{ value: "post", label: "Post" },
		{ value: "other", label: "Other" },
	];
	const TEST_ITEM_FLOW_OBJ = {
		0: "new",
		1: "recommend",
		2: "recent",
	};
	const { createEventDetails } = createEventData;
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();

	const eventId = params.eventId;
	const loading = useSelector((state) => state.profile.loading2);
	const userId = useSelector((state) => state.profile.userId);
	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const token = useSelector((state) => state.profile.token);
	const schoolsList = useSelector((state) => state.teacher.schools);
	const classesList = useSelector((state) => state.teacher.classes);
	const eventTestList = useSelector((state) => state.teacher.eventTestList);
	const isLoading = useSelector((state) => state.profile.upLoading);
	const duplicateRole = useSelector((state) => state.profile.duplicateRole);
	const eventEditDetails = useSelector(
		(state) => state?.teacher?.eventDataById,
	);
	const mandatesData = useSelector(
		(state) => state?.teacher?.mandateEventTestList,
	);

	const initialEventTests = [
		{
			name: "Aerobic Capacity",
			test_items: [],
		},
		{
			name: "Body Composition",
			test_items: [],
		},
		{
			name: "Muscle Strength and Endurance",
			test_items: [],
		},
		{
			name: "Flexibility",
			test_items: [],
		},
		// {
		// 	name: "Activity Days",
		// 	test_items: [],
		// },
	];

	const autoSelectArr = ["ONE-MILE WALK", "HEART", "WEIGHT", "VERTICAL JUMP"];

	const autoSelectObj = {
		"ONE-MILE WALK": (modifiedEvents, testName, testIndex, modifiedItems) => {
			let autoIndex2 = modifiedEvents.findIndex((event) =>
				event.name.includes("Aerobic Capacity"),
			);

			if (!modifiedItems.includes("HEART")) {
				modifiedEvents[autoIndex2]?.test_items.push("HEART");
				modifiedItems.push("HEART");
			}

			let autoIndex = modifiedEvents.findIndex((event) =>
				event.name.includes("Body Composition"),
			);
			if (autoIndex == -1) {
				modifiedEvents.push({
					name: "Body Composition",
					test_items: ["WEIGHT"],
				});
				modifiedItems.push("WEIGHT");
			} else {
				if (!modifiedItems.includes("WEIGHT")) {
					modifiedEvents.splice(autoIndex, 1, {
						...modifiedEvents[autoIndex],
						test_items: [...modifiedEvents[autoIndex]["test_items"], "WEIGHT"],
					});

					modifiedItems.push("WEIGHT");
				}
			}
		},
		HEART: (modifiedEvents, testName, testIndex, modifiedItems) => {
			if (
				modifiedItems.includes("WEIGHT") &&
				!modifiedItems.includes("HEART") &&
				modifiedItems.includes("ONE-MILE WALK")
			) {
				let autoIndex = modifiedEvents.findIndex((event) =>
					event.name.includes("Body Composition"),
				);
				let testItemIndex =
					modifiedEvents[autoIndex].test_items.indexOf("WEIGHT");
				modifiedEvents[autoIndex].test_items.splice(testItemIndex, 1);
				let testItemIndex2 = modifiedItems.indexOf("WEIGHT");
				modifiedItems.splice(testItemIndex2, 1);
			}
			if (modifiedItems.includes("ONE-MILE WALK")) {
				let testItemIndex =
					modifiedEvents[testIndex].test_items.indexOf("ONE-MILE WALK");
				modifiedEvents[testIndex].test_items.splice(testItemIndex, 1);
				let testItemIndex2 = modifiedItems.indexOf("ONE-MILE WALK");
				modifiedItems.splice(testItemIndex2, 1);
			}
		},
		WEIGHT: (modifiedEvents, testName, testIndex, modifiedItems) => {
			if (
				modifiedItems.includes("HEART") &&
				modifiedItems.includes("ONE-MILE WALK") &&
				!modifiedItems.includes("WEIGHT")
			) {
				let autoIndex = modifiedEvents.findIndex((event) =>
					event.name.includes("Aerobic Capacity"),
				);

				if (!mandates.includes("HEART")) {
					let testItemIndex =
						modifiedEvents[autoIndex].test_items.indexOf("HEART");
					if (testItemIndex != -1) {
						modifiedEvents[autoIndex].test_items.splice(testItemIndex, 1);
						let testItemIndex2 = modifiedItems.indexOf("HEART");
						modifiedItems.splice(testItemIndex2, 1);
					}
				}
			}

			if (
				modifiedItems.includes("ONE-MILE WALK") &&
				!modifiedItems.includes("WEIGHT")
			) {
				let autoIndex = modifiedEvents.findIndex((event) =>
					event.name.includes("Aerobic Capacity"),
				);
				let testItemIndex =
					modifiedEvents[autoIndex].test_items.indexOf("ONE-MILE WALK");

				if (testItemIndex != -1) {
					modifiedEvents[autoIndex].test_items.splice(testItemIndex, 1);
					let testItemIndex2 = modifiedItems.indexOf("ONE-MILE WALK");
					modifiedItems.splice(testItemIndex2, 1);
				}
			}

			if (
				modifiedItems.includes("VERTICAL JUMP") &&
				!modifiedItems.includes("WEIGHT")
			) {
				let autoIndex = modifiedEvents.findIndex((event) =>
					event.name.includes("Muscle Strength and Endurance"),
				);
				let testItemIndex =
					modifiedEvents[autoIndex].test_items.indexOf("VERTICAL JUMP");
				modifiedEvents[autoIndex].test_items.splice(testItemIndex, 1);
				let testItemIndex2 = modifiedItems.indexOf("VERTICAL JUMP");
				modifiedItems.splice(testItemIndex2, 1);
			}
		},
		"VERTICAL JUMP": (modifiedEvents, testName, testIndex, modifiedItems) => {
			if (modifiedItems.includes("VERTICAL JUMP")) {
				let autoIndex = modifiedEvents.findIndex((event) =>
					event.name.includes("Body Composition"),
				);
				if (autoIndex == -1) {
					modifiedEvents.push({
						name: "Body Composition",
						test_items: ["WEIGHT"],
					});
					modifiedItems.push("WEIGHT");
				} else {
					if (!modifiedItems.includes("WEIGHT")) {
						modifiedEvents.splice(autoIndex, 1, {
							...modifiedEvents[autoIndex],
							test_items: [
								...modifiedEvents[autoIndex]["test_items"],
								"WEIGHT",
							],
						});

						modifiedItems.push("WEIGHT");
					}
				}
			}
		},
	};
	const searchClassesRef = useRef("");
	const testItemsBeforeEditing = useRef([]);
	const clickedItemRef = useRef(null);
	const classesBeforeEditing = useRef([]);
	const missingClassesCountRef = useRef(0);
	const clickedClassesRef = useRef(null);
	const [schools, setSchools] = useState();
	const [classes, setClasses] = useState();

	const [selectedSchools, setSelectedSchools] = useState([]);
	const [selectedClasses, setSelectedClasses] = useState([]);
	const [selectedEventTests, setSelectedEventTests] =
		useState(initialEventTests);

	const [selectedTestItems, setSelectedTestItems] = useState([]);

	const [mandates, setMandates] = useState([]);

	const [selectedEvents, setSelectedEvents] = useState([]);
	const [isSelected, setIsSelected] = useState(null);
	const [tabIndex, setTabIndex] = useState(0);

	const [inputs, setInputs] = useState({
		event_name: "",
		event_type: "",
		start_date: "",
		end_date: "",
		schools: [],
		classes: [],
		test_item_flow: "",
	});
	const [errors, setErrors] = useState({});

	const [caution, setCaution] = useState(false);

	const handleClasses = (selectedClassesList) => {
		if (
			selectedClassesList?.length > 1 &&
			selectedClassesList[0].label === "All"
		) {
			setSelectedClasses([selectedClassesList[1]]);

			setInputs((prevState) => ({
				...prevState,
				classes: [selectedClassesList[1].value],
			}));
		} else {
			let all_value = null;
			if (selectedClassesList?.length) {
				for (let clas of selectedClassesList) {
					if (clas.label == "All") {
						all_value = clas;
						break;
					}
				}
			}

			if (all_value) {
				setSelectedClasses([all_value]);

				setInputs((prevState) => ({
					...prevState,
					classes: all_value.value,
				}));
				setErrors((prevState) => ({
					...prevState,
					classes: "",
				}));
			} else {
				setSelectedClasses(selectedClassesList);

				setInputs((prevState) => ({
					...prevState,
					classes: selectedClassesList?.map((item) => item?.value),
				}));
				setErrors((prevState) => ({
					...prevState,
					classes: "",
				}));
			}
		}

		if (!selectedClassesList.length)
			setErrors((prevState) => ({
				...prevState,
				classes: "Please Select Classes",
			}));
		clickedClassesRef.current = null;
	};

	const compareClasses = (selectedClassesList) => {
		const initialClasses = classesBeforeEditing?.current?.map(
			(clas) => clas.value,
		);
		let missingClassesCount = 0;
		for (let clas of initialClasses) {
			let isPresent = false;
			for (let i = 0; i < selectedClassesList?.length; i++) {
				if (clas === selectedClassesList[i]?.value) {
					isPresent = true;
					break;
				}
			}
			if (!isPresent) {
				missingClassesCount++;
			}
		}

		if (missingClassesCount > missingClassesCountRef.current) {
			missingClassesCountRef.current = missingClassesCount;
			return false;
		}
		missingClassesCountRef.current = missingClassesCount;
		return true;
	};

	const handleCautionForClasses = (selectedClassesList) => {
		const n = selectedClassesList?.length;

		if (n && selectedClassesList[n - 1].label === "All") {
			handleClasses(selectedClassesList);
			return;
		}
		if (
			classesBeforeEditing?.current[0].label !== "All" &&
			compareClasses(selectedClassesList)
		) {
			handleClasses(selectedClassesList);
			return;
		}
		clickedClassesRef.current = [...selectedClassesList];
		setCaution(true);
	};

	const handleInputClasses = debounce((text) => {
		if (text?.length != 1 && searchClassesRef.current != text) {
			let payLoad = {
				schools: inputs?.schools,
				search: text,
			};
			dispatch(getClassesList({ body: payLoad, token }));
			searchClassesRef.current = text;
		}
	}, 1000);

	const handleEventsTestList = (i, testName, testItem) => {
		let modifiedEvents = JSON.parse(JSON.stringify(selectedEvents));

		let modifiedItems = JSON.parse(JSON.stringify(selectedTestItems));

		if (testName === "Activity Days") {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);
			if (!modifiedItems.includes(testItem)) {
				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: [
						"AEROBIC ACTIVITY",
						"MUSCLE-STRENGTHENING ACTIVITY",
						"BONE-STRENGTHENING ACTIVITY",
					],
				});
				modifiedItems.push(
					"AEROBIC ACTIVITY",
					"MUSCLE-STRENGTHENING ACTIVITY",
					"BONE-STRENGTHENING ACTIVITY",
				);
			} else {
				modifiedEvents.splice(testIndex, {
					name: "Activity Days",
					test_items: [],
				});
				[
					"AEROBIC ACTIVITY",
					"MUSCLE-STRENGTHENING ACTIVITY",
					"BONE-STRENGTHENING ACTIVITY",
				].forEach((item) => {
					let testItemIndex2 = modifiedItems.indexOf(item);
					modifiedItems.splice(testItemIndex2, 1);
				});
			}
		} else if (["CALF SKIN FOLD", "TRICEP SKIN FOLD"].includes(testItem)) {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);
			if (!modifiedItems.includes(testItem)) {
				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: [
						...modifiedEvents[testIndex]["test_items"],

						"CALF SKIN FOLD",
						"TRICEP SKIN FOLD",
					],
				});
				modifiedItems.push("CALF SKIN FOLD", "TRICEP SKIN FOLD");
			} else {
				let remainingItems = modifiedEvents[testIndex].test_items.filter(
					(item) => !["CALF SKIN FOLD", "TRICEP SKIN FOLD"].includes(item),
				);

				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: remainingItems,
				});

				["CALF SKIN FOLD", "TRICEP SKIN FOLD"].forEach((item) => {
					let testItemIndex2 = modifiedItems.indexOf(item);
					modifiedItems.splice(testItemIndex2, 1);
				});
			}
		} else if (
			["SIT AND REACH LEFT", "SIT AND REACH RIGHT"].includes(testItem)
		) {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);
			if (!modifiedItems.includes(testItem)) {
				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: [
						...modifiedEvents[testIndex]["test_items"],
						"SIT AND REACH LEFT",
						"SIT AND REACH RIGHT",
					],
				});
				modifiedItems.push("SIT AND REACH LEFT", "SIT AND REACH RIGHT");
			} else {
				let remainingItems = modifiedEvents[testIndex].test_items.filter(
					(item) =>
						!["SIT AND REACH LEFT", "SIT AND REACH RIGHT"].includes(item),
				);

				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: remainingItems,
				});

				["SIT AND REACH LEFT", "SIT AND REACH RIGHT"].forEach((item) => {
					let testItemIndex2 = modifiedItems.indexOf(item);
					modifiedItems.splice(testItemIndex2, 1);
				});
			}
		} else if (
			["SHOULDER STRETCH LEFT", "SHOULDER STRETCH RIGHT"].includes(testItem)
		) {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);
			if (!modifiedItems.includes(testItem)) {
				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: [
						...modifiedEvents[testIndex]["test_items"],
						"SHOULDER STRETCH LEFT",
						"SHOULDER STRETCH RIGHT",
					],
				});
				modifiedItems.push("SHOULDER STRETCH LEFT", "SHOULDER STRETCH RIGHT");
			} else {
				let remainingItems = modifiedEvents[testIndex].test_items.filter(
					(item) =>
						!["SHOULDER STRETCH LEFT", "SHOULDER STRETCH RIGHT"].includes(item),
				);

				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: remainingItems,
				});

				["SHOULDER STRETCH LEFT", "SHOULDER STRETCH RIGHT"].forEach((item) => {
					let testItemIndex2 = modifiedItems.indexOf(item);
					modifiedItems.splice(testItemIndex2, 1);
				});
			}
		} else if (["HANDGRIP(LB)", "HANDGRIP(KG)"].includes(testItem)) {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);
			if (
				!modifiedItems.includes("HANDGRIP(LB)") &&
				!modifiedItems.includes("HANDGRIP(KG)")
			) {
				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: [...modifiedEvents[testIndex]["test_items"], testItem],
				});
				modifiedItems.push(testItem);
				if (testItem === "HANDGRIP(LB)") {
					setMandates((prevState) => [...prevState, "HANDGRIP(KG)"]);
				} else {
					setMandates((prevState) => [...prevState, "HANDGRIP(LB)"]);
				}
			} else if (modifiedItems.includes(testItem)) {
				let remainingItems = modifiedEvents[testIndex].test_items.filter(
					(item) => ![testItem].includes(item),
				);

				modifiedEvents.splice(testIndex, 1, {
					name: testName,
					test_items: remainingItems,
				});

				let testItemIndex2 = modifiedItems.indexOf(testItem);
				modifiedItems.splice(testItemIndex2, 1);
				let modifiedMandates = JSON.parse(JSON.stringify(mandates));
				if (testItem === "HANDGRIP(LB)") {
					let testItemIndex3 = modifiedMandates.indexOf("HANDGRIP(KG)");
					modifiedMandates.splice(testItemIndex3, 1);
				} else {
					let testItemIndex3 = modifiedMandates.indexOf("HANDGRIP(KG)");
					modifiedMandates.splice(testItemIndex3, 1);
				}
				setMandates([...modifiedMandates]);
			}
		} else {
			let testIndex = modifiedEvents.findIndex((event) =>
				event.name.includes(testName),
			);

			if (!modifiedItems.includes(testItem)) {
				modifiedEvents.splice(testIndex, 1, {
					...modifiedEvents[testIndex],
					test_items: [...modifiedEvents[testIndex].test_items, testItem],
				});
				modifiedItems.push(testItem);

				autoSelectArr.includes(testItem) &&
					autoSelectObj[testItem](
						modifiedEvents,
						testName,
						testIndex,
						modifiedItems,
					);
			} else {
				let testItemIndex =
					modifiedEvents[testIndex].test_items.indexOf(testItem);

				let remaining = modifiedEvents[testIndex].test_items.filter(
					(item, index) => index !== testItemIndex,
				);

				modifiedEvents.splice(testIndex, 1, {
					...modifiedEvents[testIndex],
					test_items: [...remaining],
				});
				let testItemIndex2 = modifiedItems.indexOf(testItem);
				modifiedItems.splice(testItemIndex2, 1);

				autoSelectArr.includes(testItem) &&
					autoSelectObj[testItem](
						modifiedEvents,
						testName,
						testIndex,
						modifiedItems,
					);
			}
		}

		setSelectedTestItems([...modifiedItems]);
		setSelectedEvents([...modifiedEvents]);
		clickedItemRef.current = null;
	};

	const handleCautionForTestItems = (i, testName, testItem) => {
		if (
			testItemsBeforeEditing.current.includes(testItem) &&
			selectedTestItems.includes(testItem)
		) {
			setCaution(true);
			clickedItemRef.current = [i, testName, testItem];
			return;
		}
		handleEventsTestList(i, testName, testItem);
		return;
	};

	const handleChange = (e) => {
		setInputs((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
		const errorsObj = validateFormData({
			[e.target.name]: e.target.value,
		});
		if (Object.keys(errorsObj).length) {
			setErrors((prevState) => ({
				...prevState,
				...errorsObj,
			}));
		} else {
			let obj = { ...errors };
			delete obj[e.target.name];
			setErrors({ ...obj });
		}
	};

	const handleTabChange = (index) => {
		setTabIndex(index);
		setSelectedEvents(initialEventTests);
		setIsSelected(null);
		setInputs((prevState) => ({
			...prevState,
			test_item_flow: TEST_ITEM_FLOW_OBJ[index],
		}));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		let { test_item_flow, ...validationObj } = inputs;

		if (inputs?.test_item_flow === "new") {
			validationObj["event_struct"] = selectedTestItems;
		} else {
			if (isSelected == null) {
				dispatch(setMessage("Please select Test Items"));
			}
		}

		let errorObj = validateFormData(validationObj);

		setErrors(errorObj);

		if (Object.keys(errorObj)?.length === 0) {
			let payload = {
				...inputs,
				event_struct: selectedEvents,
				updater_role: selectedRole,
				updated_by: userId,
				type_of_gram: false,
			};

			delete payload["schools"];
			if (inputs?.test_item_flow !== "new" && isSelected !== null) {
				dispatch(updateEvent({ payload, token, eventId }));
			} else if (inputs?.test_item_flow == "new") {
				dispatch(updateEvent({ payload, token, eventId }));
			}
		}
	};
	const handleRequiredMandates = () => {
		if (mandatesData?.required?.length) {
			const events = [...eventTestList]?.map((item) => {
				let requiredItems = item.test_items.filter((testItem) =>
					mandatesData?.required.includes(testItem),
				);
				return { name: item.name, test_items: requiredItems };
			});

			setSelectedEvents([...events]);
		} else {
			setSelectedEvents(initialEventTests);
		}
	};
	useEffect(() => {
		// dispatch(setClasses([]))
		dispatch(getEventTestList(token));
		dispatch(setResponse(""));

		let body = {
			accesser_uuid: userId,
			accesser_role: selectedRole,
		};
		dispatch(getEventDataById({ eventId, token }));

		return () => {
			dispatch(setEventDataById({}));
		};
	}, []);

	useEffect(() => {
		if (eventEditDetails && Object.keys(eventEditDetails)?.length) {
			let filteredSchools = eventEditDetails.FitnessSchool.filter((school) =>
				schoolsList.some((schooll) => schooll.uuid === school.uuid),
			);

			setInputs({
				event_name: eventEditDetails?.event_name,
				event_type: eventEditDetails?.event_type,
				start_date: eventEditDetails?.start_date?.split("T")[0],
				end_date: eventEditDetails?.end_date?.split("T")[0],
				schools: eventEditDetails.FitnessSchool?.map((school) => school.uuid),
				classes:
					eventEditDetails.FitnessClass != "all"
						? eventEditDetails.FitnessClass?.map((clas) => clas.uuid)
						: eventEditDetails.FitnessClass,
				test_item_flow: eventEditDetails?.test_item_flow,
			});

			if (eventEditDetails?.FitnessSchool?.length) {
				let arr = filteredSchools.map((school) => ({
					label: school.school_name,
					value: school.uuid,
				}));
				if (arr.length === schoolsList?.length) {
					setSelectedSchools([{ label: "All", value: arr.value }]);
				} else {
					setSelectedSchools(arr);
				}
			} else {
				setSelectedSchools([]);
			}

			if (eventEditDetails?.FitnessClass?.length) {
				if (eventEditDetails?.FitnessClass == "all") {
					setSelectedClasses([{ label: "All", value: "all" }]);
					classesBeforeEditing.current = [{ label: "All", value: "all" }];
				} else {
					let classArr = eventEditDetails?.FitnessClass.map((clas) => ({
						label: clas.class_name,
						value: clas.uuid,
					}));
					setSelectedClasses(classArr);
					classesBeforeEditing.current = [...classArr];
				}
			} else {
				setSelectedClasses([]);
				classesBeforeEditing.current = [];
			}

			setTabIndex(
				eventEditDetails.test_item_flow === "new"
					? 0
					: eventEditDetails.test_item_flow === "recent"
					? 2
					: 1,
			);
		}
	}, [eventEditDetails]);
	useEffect(() => {
		const _mandates = [];
		mandatesData?.required && _mandates.push(...mandatesData?.required);
		mandatesData?.exclude && _mandates.push(...mandatesData?.exclude);
		mandatesData?.combined && _mandates.push(mandatesData?.combined);
		setMandates(_mandates);
	}, [mandatesData]);

	useEffect(() => {
		if (
			mandatesData?.required &&
			eventEditDetails?.test_item_flow === "new" &&
			tabIndex == 0
		) {
			let arr = eventEditDetails?.event_struct
				?.map((item) => item.test_items)
				.flat(4);
			let filteredRequiredItems = mandatesData?.required?.filter(
				(item) => !arr.includes(item),
			);

			if (filteredRequiredItems?.length) {
				const events = [...eventTestList]?.map((item) => {
					let requiredItems = item.test_items.filter((testItem) =>
						[...arr, ...filteredRequiredItems].includes(testItem),
					);
					return { name: item.name, test_items: requiredItems };
				});

				setSelectedEvents([...events]);

				setSelectedTestItems([...arr, ...filteredRequiredItems]);
				testItemsBeforeEditing.current = [...arr, ...filteredRequiredItems];
			} else {
				setSelectedTestItems(arr.slice());
				testItemsBeforeEditing.current = arr.slice();

				setSelectedEvents([...eventEditDetails?.event_struct]);
			}
			if (arr.includes("HANDGRIP(LB)")) {
				setMandates((prevState) => [...prevState, "HANDGRIP(KG)"]);
			}
			if (arr.includes("HANDGRIP(KG)")) {
				setMandates((prevState) => [...prevState, "HANDGRIP(LB)"]);
			}
		}
	}, [mandatesData, eventEditDetails, tabIndex]);

	useEffect(() => {
		let payLoad = {
			schools: inputs?.schools,
			search: "",
		};
		dispatch(getClassesList({ body: payLoad, token })); // setSelectedClasses([])

		dispatch(
			getMandateEventTestList({
				token,
				schools: { schools: inputs?.schools },
			}),
		);
		let body = {
			schools: inputs?.schools,
			event_uuid: params?.eventId,
		};
		inputs?.schools?.length &&
			dispatch(
				getRecentEventTestList({
					token,
					body,
				}),
			);
		dispatch(
			getrecommondedEventTestList({
				token,
				schools: { schools: inputs?.schools },
			}),
		);
	}, [inputs?.schools]);
	useEffect(() => {
		const classOptions = classesList.map((each) => {
			return { label: each.class_name, value: each.uuid };
		});

		classOptions.unshift({ label: "All", value: "all" });

		setClasses(classOptions);
	}, [classesList]);

	useEffect(() => {
		return () => {
			if (clickedClassesRef?.current) {
				clickedClassesRef.current = null;
			}
			if (clickedItemRef?.current) {
				clickedItemRef.current = null;
			}
		};
	}, []);

	return (
		<>
			{loading ? (
				<Center h="80vh">
					<Spinner color="gray-3" />
				</Center>
			) : (
				<>
					<Flex position="relative" gap="4" direction="column" height="100%">
						<Text>{eventEditDetails?.event_name}</Text>
						<form onSubmit={handleSubmit}>
							<Grid
								templateColumns={{
									base: "repeat(1,1fr)",
									lg: "repeat(3,1fr)",
									md: "repeat(3,1fr)",
								}}
								gap={{ base: "4", md: 8, lg: 4 }}
							>
								<GridItem>
									<MultiSelector
										id={"eventSchools"}
										isDisabled={true}
										label={"Schools"}
										options={schools}
										// onChange={handleSchools}
										value={selectedSchools}
										error={errors?.schools ? errors?.schools : ""}
									/>
								</GridItem>
								<GridItem>
									<MultiSelector
										id={"eventClasses"}
										label={"Classes"}
										options={classes}
										onChange={handleCautionForClasses}
										onInputChange={handleInputClasses}
										value={selectedClasses}
										error={errors?.classes ? errors?.classes : ""}
									/>
								</GridItem>

								{createEventDetails.map((item, index) => {
									return (
										<GridItem mb="3" key={"ab" + index}>
											{item.inputType == "select" && (
												<SingleSelect2
													id={item?.Id}
													placeholder="Select"
													label={item.lable}
													name={item.name}
													value={inputs?.[item.name]}
													onChange={(e) => handleChange(e)}
													optionsProps={options}
													displayKey={"label"}
													optionValue={"value"}
													// value={}
													error={
														errors?.[item?.name] ? errors?.[item?.name] : ""
													}
												/>
											)}

											{item.inputType !== "multi-select" &&
												item.inputType !== "select" &&
												item.inputType !== "date" && (
													<Inputs
														id={item?.Id}
														label={item.lable}
														type={item.inputType}
														name={item.name}
														value={inputs?.[item.name]}
														onChange={(e) => handleChange(e)}
														error={
															errors?.[item?.name] ? errors?.[item?.name] : ""
														}
													/>
												)}

											{item.name === "start_date" && (
												<Inputs
													id={item?.Id}
													label={item.lable}
													type={item.inputType}
													name={item.name}
													value={inputs?.[item.name]?.split("T")[0]}
													max={inputs?.end_date}
													onChange={(e) => handleChange(e)}
													error={
														errors?.[item?.name] ? errors?.[item?.name] : ""
													}
												/>
											)}
											{item.name === "end_date" && (
												<Inputs
													id={item?.Id}
													label={item.lable}
													type={item.inputType}
													name={item.name}
													value={inputs?.[item.name]?.split("T")[0]}
													min={inputs?.start_date}
													onChange={(e) => handleChange(e)}
													error={
														errors?.[item?.name] ? errors?.[item?.name] : ""
													}
												/>
											)}
										</GridItem>
									);
								})}
							</Grid>

							<Tabs
								index={tabIndex}
								onChange={(index) => handleTabChange(index)}
							>
								<TabList borderBottomColor="white">
									<Tab textStyle={"textHead"}>
										<Text textStyle={"h4"}>New</Text>
									</Tab>
									<Tab whiteSpace="nowrap">
										<Text textStyle={"h4"}>Recommended for You</Text>
									</Tab>
									<Tab>
										<Text textStyle={"h4"}>Recents</Text>
									</Tab>
								</TabList>

								<TabPanels>
									<TabPanel>
										{eventTestList?.length &&
											eventTestList.map((test, i) => {
												return (
													<Flex
														direction="column"
														key={test.name}
														gap={{ base: "2", md: 1, lg: 1 }}
													>
														<Text
															textStyle={"textHead"}
															fontWeight={{
																base: "thin",
																md: "thin",
																lg: "thin",
															}}
														>
															{test.name}
														</Text>{" "}
														<HStack
															spacing={{ base: "none", lg: 4, md: 4 }}
															display={{ base: "none", md: "flex", lg: "flex" }}
															mt="2"
															mb="2"
														>
															{test.test_items.map((testItem, j) => {
																if (mandates.includes(testItem)) {
																	return (
																		<Button
																			p="3.5"
																			size="sm"
																			key={testItem}
																			cursor="not-allowed"
																			rounded="lg"
																			bg={
																				selectedTestItems.includes(testItem)
																					? "#009DD5"
																					: "#cecece "
																			}
																			color={
																				selectedTestItems.includes(testItem)
																					? "white "
																					: "black"
																			}
																			shadow="md !important"
																		>
																			<Text textStyle="p">{testItem}</Text>
																		</Button>
																	);
																}

																return (
																	<Button
																		p="3.5"
																		size="sm"
																		key={testItem}
																		cursor={
																			mandates.includes(testItem)
																				? "not-allowed"
																				: "pointer"
																		}
																		onClick={() => {
																			if (!mandates.includes(testItem)) {
																				handleCautionForTestItems(
																					i,
																					test.name,
																					testItem,
																				);
																			}
																		}}
																		rounded="lg"
																		bg={
																			selectedTestItems.includes(testItem)
																				? "#009DD5"
																				: "bg.100 "
																		}
																		color={
																			selectedTestItems.includes(testItem)
																				? "white "
																				: "black"
																		}
																		shadow="md !important"
																	>
																		<Text textStyle="p">{testItem}</Text>
																	</Button>
																);
															})}
														</HStack>
														<Flex
															gap={{ base: "2" }}
															alignItems="center"
															flexWrap="wrap"
															flex={1}
															flexGrow={1}
														>
															{test.test_items.map((testItem, j) => {
																if (mandates.includes(testItem)) {
																	return (
																		<HStack
																			key={"ab" + j}
																			display={{
																				base: "block",
																				md: "none",
																				lg: "none",
																			}}
																			rounded={"md"}
																			w="auto"
																		>
																			<Button
																				key={testItem}
																				// w='auto'

																				onClick={() => {
																					if (!mandates.includes(testItem)) {
																						handleCautionForTestItems(
																							i,
																							test.name,
																							testItem,
																						);
																					}
																				}}
																				bg={
																					selectedTestItems.includes(testItem)
																						? "#009DD5"
																						: "#cecece "
																				}
																				color={
																					selectedTestItems.includes(testItem)
																						? "white"
																						: "black"
																				}
																			>
																				<Text
																					fontSize={{
																						base: "11px",
																						md: "md",
																						lg: "md",
																					}}
																					fontWeight={"thin"}
																				>
																					{testItem}
																				</Text>
																			</Button>
																		</HStack>
																	);
																}

																return (
																	<HStack
																		key={"ab" + j}
																		display={{
																			base: "block",
																			md: "none",
																			lg: "none",
																		}}
																		rounded={"md"}
																		w="auto"
																	>
																		<Button
																			key={testItem}
																			// w='auto'

																			onClick={() => {
																				if (!mandates.includes(testItem)) {
																					handleCautionForTestItems(
																						i,
																						test.name,
																						testItem,
																					);
																				}
																			}}
																			bg={
																				selectedTestItems.includes(testItem)
																					? "primary "
																					: "bg.100"
																			}
																			color={
																				selectedTestItems.includes(testItem)
																					? "white"
																					: "black"
																			}
																		>
																			<Text
																				fontSize={{
																					base: "11px",
																					md: "md",
																					lg: "md",
																				}}
																				fontWeight={"thin"}
																			>
																				{testItem}
																			</Text>
																		</Button>
																	</HStack>
																);
															})}
														</Flex>
													</Flex>
												);
											})}

										{errors?.event_struct && (
											<Text color="red">{errors?.event_struct}</Text>
										)}
									</TabPanel>
									<TabPanel>
										<EventCard
											title={"Recommended List"}
											setSelectedEvents={setSelectedEvents}
											selectedEvents={selectedEvents}
											setIsSelected={setIsSelected}
											isSelected={isSelected}
											setInputs={setInputs}
											Inputs={inputs}
											tabIndex={tabIndex}
										/>
									</TabPanel>
									<TabPanel>
										<EventCard
											title={"Recents Test List"}
											list="Some text"
											setSelectedEvents={setSelectedEvents}
											setIsSelected={setIsSelected}
											isSelected={isSelected}
											tabIndex={tabIndex}
										/>
									</TabPanel>
								</TabPanels>
							</Tabs>

							<Flex justify="center" gap="8" pb="8" w="100%">
								<NegativeButton
									text={"Cancel"}
									onClick={() => {
										if (selectedRole === "districtAdmin" || duplicateRole) {
											navigate(`/role/${selectedRole}/fitnessgram`);
											dispatch(setActivatingID("7"));
										} else {
											navigate(`/role/${selectedRole}`);
										}
									}}
								/>
								<PositiveButton
									text={"Save"}
									isLoading={isLoading}
									type="submit"
								/>
							</Flex>
						</form>

						<EventSuccessPopUp />
						{caution ? (
							<CautionPopUp
								caution={caution}
								setCaution={setCaution}
								text={REMOVE_TEST_ITEM_CAUTION_TEXT}
								onClick={() => {
									if (clickedItemRef?.current) {
										handleEventsTestList(...clickedItemRef?.current);
										return;
									}
									if (clickedClassesRef?.current) {
										handleClasses(clickedClassesRef?.current);
										return;
									}
								}}
							/>
						) : null}
					</Flex>
				</>
			)}
		</>
	);
};

export default FgEditEvent;
