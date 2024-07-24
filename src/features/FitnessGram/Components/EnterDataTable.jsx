import {
	Box,
	Checkbox,
	Flex,
	HStack,
	Input,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Spacer,
	Text,
	grid,
} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react"; // React Grid Logic

import React, {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useMemo,
	useState,
} from "react";
import { FaBan, FaUserAlt } from "react-icons/fa";
import { BiSolidHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
	fgStoreStudentData,
	getUpdateFgEventOrder,
	setStoreDataLoading,
} from "../../../features/teacher/teacherSlice";

import { setMessage } from "../../../store/slices/profileSlice";

import { BsFiletypeExe } from "react-icons/bs";
import { FaFileCsv } from "react-icons/fa";

import { useRef } from "react";
import {
	debounce,
	exportData,
	handlePadStartTimer,
} from "../../../Utilities/utils";
import Heading9 from "../../../components/FitnessComponents/FitnessTexts/Heading9";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import ExemptionModal from "./ExemptionModal";
import MultipleEntryModal from "./MultipleEntryModal";
import RemoveExemptionModal from "./RemoveExemptionModal";
import IndividualExemptionModal from "./IndividualExemptionModal";

export const MESSAGES = {
	"PUSH-UP": "Score value should be between 1 and 80",
	"20M PACER": "Score value should be between 1 and 247",
	"15M PACER": "Score value should be between 1 and 323",
	"HEIGHT(FEET)2":
		"To enter Height(ft), Height(in) value should be between 0 and 11.99 ",
	"HEIGHT(FEET)": "Height(ft) value should be between 1 and 7",
	"HEIGHT(INCH)": "Height(in) value should be between 1 and 95.99",
	"HEIGHT(INCH)2": "Height(in) value should be between 0 and 11.99",
	"TRUNK LIFT": "Score value should be between 1 and 12",
	"SIT AND REACH RIGHT": "Score value should be between 1 and 12",
	"SIT AND REACH LEFT": "Score value should be between 1 and 12",
	"AEROBIC ACTIVITY": "Score value should be between 1 and 7",
	"MUSCLE-STRENGTHENING ACTIVITY": "Score value should be between 1 and 7",
	"BONE-STRENGTHENING ACTIVITY": "Score value should be between 1 and 7",
	"CURL-UP": "Score value should be between 1 and 80",
	"ONE-MILE RUN": "Score value should be between 03:00 and 59:59",
	"ONE-MILE WALK": "Score value should be between 03:00 and 59:59",
	HEART: "Score value should be between 30 and 250",
	WEIGHT: "Score value should be between 20 and 450",
	"PERCENT BODY FAT": "Score value should be between 1 and 99",
	"ABDOMINAL SKIN FOLD": "Score value should be between 1 and 99.5",
	"CALF SKIN FOLD": "Score value should be between 1 and 99.5",
	"TRICEP SKIN FOLD": "Score value should be between 1 and 99.5",
	"FLEXED ARM HANG": "Score value should be between 1 and 999",
	"MODIFIED PULL-UP": "Score value should be between 1 and 150",
	"SHOULDER STRETCH LEFT": "Score value should be Y or N",
	"SHOULDER STRETCH RIGHT": "Score value should be Y or N",
	"VERTICAL JUMP": "Score value should be between 0 and 40",
	PLANK: "Score value should be between 00:00 and 03:00",
	"HANDGRIP(LB)": "Score value should be between 0 and 200",
	"HANDGRIP(KG)": "Score value should be between 0 and 90",
};
export const validate = {
	"PUSH-UP": (value) => {
		let regex = /^(?:[1-9]|[1-7][0-9]|80)$/;
		return regex.test(value);
	},
	"FLEXED ARM HANG": (value) => {
		let regex = /^(?:[1-9][0-9]{0,2}|[1-9][0-9]{1,2}|999)$/;
		return regex.test(value);
	},
	"TRUNK LIFT": (value) => {
		let regex = /^(?:[1-9]|1[0-2])$/;
		return regex.test(value);
	},

	"CURL-UP": (value) => {
		let regex = /^(?:[1-9]|[1-7][0-9]|80)$/;
		return regex.test(value);
	},

	"MODIFIED PULL-UP": (value) => {
		let regex = /^(?:[1-9]|[1-9][0-9]|1[0-4][0-9]|150)$/;

		return regex.test(value);
	},
	"20M PACER": (value) => {
		let regex = /^(?:[1-9]|[1-9][0-9]|1[0-9]{2}|2[0-3][0-9]|24[0-7])$/;
		return regex.test(value);
	},
	"15M PACER": (value) => {
		let regex = /^(?:[1-9]|[1-9][0-9]|[12][0-9]{2}|3[0-1][0-9]|32[0-3])$/;
		return regex.test(value);
	},

	"ONE-MILE RUN": (value) => {
		let regex = /^(?:0[3-9]|[1-5]\d):[0-5]\d$/;
		return regex.test(value);
	},
	"ONE-MILE WALK": (value) => {
		let regex = /^(?:0[3-9]|[1-5]\d):[0-5]\d$/;

		return regex.test(value);
	},
	"HEIGHT(FEET)": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 7) {
				return true;
			}
			return false;
		}
		return false;
	},
	"HEIGHT(INCH)": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 95.99) {
				return true;
			}
			return false;
		}
		return false;
	},
	"HEIGHT(INCH)2": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 0 && number <= 11.99) {
				return true;
			}
			return false;
		}
		return false;
	},

	FEETS: (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 7) {
				return true;
			}
			return false;
		}
		return false;
	},
	INCHES: (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 95.99) {
				return true;
			}
			return false;
		}
		return false;
	},
	INCHES2: (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 0 && number <= 11.99) {
				return true;
			}
			return false;
		}
		return false;
	},

	HEART: (value) => {
		let regex = /^(?:3[0-9]|[4-9][0-9]|1[0-9]{2}|2[0-4][0-9]|250)$/;
		return regex.test(value);
	},
	WEIGHT: (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 20 && number <= 450) {
				return true;
			}
			return false;
		}
		return false;
	},
	"ABDOMINAL SKIN FOLD": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 99.5) {
				return true;
			}
			return false;
		}
		return false;
	},
	"CALF SKIN FOLD": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 99.5) {
				return true;
			}
			return false;
		}
		return false;
	},

	"TRICEP SKIN FOLD": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 99.5) {
				return true;
			}
			return false;
		}
		return false;
	},

	"PERCENT BODY FAT": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 99) {
				return true;
			}
			return false;
		}
		return false;
	},
	"SHOULDER STRETCH LEFT": (value) => {
		let regex = /^[yYnN]$/;
		return regex.test(value);
	},
	"SHOULDER STRETCH RIGHT": (value) => {
		let regex = /^[yYnN]$/;
		return regex.test(value);
	},
	"AEROBIC ACTIVITY": (value) => {
		let regex = /^[1-7]$/;
		return regex.test(value);
	},
	"MUSCLE-STRENGTHENING ACTIVITY": (value) => {
		let regex = /^[1-7]$/;
		return regex.test(value);
	},
	"BONE-STRENGTHENING ACTIVITY": (value) => {
		let regex = /^[1-7]$/;
		return regex.test(value);
	},
	"SIT AND REACH RIGHT": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 12) {
				return true;
			}
			return false;
		}
		return false;
	},
	"SIT AND REACH LEFT": (value) => {
		let regex = /^\d+(\.\d{1,2})?$/;
		if (regex.test(value)) {
			let number = parseFloat(value);
			if (number >= 1 && number <= 12) {
				return true;
			}
			return false;
		}
		return false;
	},
	"VERTICAL JUMP": (value) => {
		let regex = /^([0-9](\.\d)?|[1-3][0-9](\.\d)?|40)$/;
		return regex.test(value);
	},
	PLANK: (value) => {
		let regex = /^(?:00:[0-5]\d|01:\d\d|02:\d\d|03:00)$/;
		return regex.test(value);
	},
	"HANDGRIP(LB)": (value) => {
		let regex =
			/^(?!200\.\d+$)([0-9](\.\d)?|[1-9]\d(\.\d)?|1\d{2}(\.\d)?|200)$/;
		return regex.test(value);
	},
	"HANDGRIP(KG)": (value) => {
		let regex = /^(?!90\.\d+$)([0-9](\.\d)?|[1-8]\d(\.\d)?|90)$/;
		return regex.test(value);
	},
};
export const TEST_ITEMS_NAME = {
	"20M PACER": "20M_PACER",
	"15M PACER": "15M_PACER",
	"ONE-MILE RUN": "ONE_MILE_RUN",
	"ONE-MILE WALK": "ONE_MILE_WALK",
	HEART: "HEART",

	HEIGHT: "HEIGHT",
	"HEIGHT(FEET)": "HEIGHT_FEET",
	"HEIGHT(INCH)": "HEIGHT_INCH",
	WEIGHT: "WEIGHT",
	"PERCENT BODY FAT": "PERCENT_BODY_FAT",
	"ABDOMINAL SKIN FOLD": "ABDOMINAL_SKIN_FOLD",
	"CALF SKIN FOLD": "CALF_SKIN_FOLD",
	"TRICEP SKIN FOLD": "TRICEP_SKIN_FOLD",

	"CURL-UP": "CURL_UP",
	"TRUNK LIFT": "TRUNK_LIFT",
	"PUSH-UP": "PUSH_UP",
	"FLEXED ARM HANG": "FLEXED_ARM_HANG",
	"MODIFIED PULL-UP": "MODIFIED_PULL_UP",

	"SIT AND REACH RIGHT": "SIT_AND_REACH_RIGHT",
	"SIT AND REACH LEFT": "SIT_AND_REACH_LEFT",
	"SHOULDER STRETCH LEFT": "SHOULDER_STRETCH_LEFT",
	"SHOULDER STRETCH RIGHT": "SHOULDER_STRETCH_RIGHT",

	"BONE-STRENGTHENING ACTIVITY": "BONE_STRENGTHENING_ACTIVITY",
	"AEROBIC ACTIVITY": "AEROBIC_ACTIVITY",
	"MUSCLE-STRENGTHENING ACTIVITY": "MUSCLE_STRENGTHENING_ACTIVITY",
	"VERTICAL JUMP": "VERTICAL_JUMP",
	PLANK: "PLANK",
	"HANDGRIP(LB)": "HANDGRIP_LB",
	"HANDGRIP(KG)": "HANDGRIP_KG",
};

export const CustomCellRenderer = (props) => {
	const { data, value, params, handleUpdateData } = props;

	let isExemption = value && value.includes("exemption");

	return (
		<Flex
			height="100%"
			width="100%"
			justify="center"
			alignItems="center"
			textOverflow="ellipsis"
			overflow="hidden"
			whiteSpace="nowrap"
			cursor="pointer"
			border="none"
			position="relative"
		>
			{isExemption ? (
				<RemoveExemptionModal
					user={data}
					handleUpdateData={handleUpdateData}
					testItemKey={params.colDef.field}
					testItemName={params.colDef.headerName}
				/>
			) : (
				value
			)}
		</Flex>
	);
};

export const NameCellRenderer = (props) => {
	const {
		event_name,
		test_items,
		data,
		last_name = data.last_name,
		first_name = data.first_name,
		student_id = data.student_id,
		handleUpdateData,
		...rest
	} = props;

	return (
		<>
			<Flex
				height="100%"
				width="100%"
				alignItems="center"
				textOverflow="ellipsis"
				overflow="hidden"
				whiteSpace="nowrap"
				border="none !important"
				gap={2}
			>
				<IndividualExemptionModal
					event_name={event_name}
					test_items={test_items}
					users={[data]}
					handleUpdateData={handleUpdateData}
				/>
				<Flex direction="column" justify="center">
					<Text lineHeight="1.2">{`${last_name}, ${first_name}`}</Text>
					<Text
						fontSize="12px"
						lineHeight="1.2"
						color="gray-2"
					>{`(${student_id})`}</Text>
				</Flex>
			</Flex>
		</>
	);
};

export const CustomCellEditor = forwardRef((props, ref) => {
	const {
		node,
		colDef,
		column,
		data,
		api,
		rowIndex,
		rowHeight = node.rowHeight,
		top = node.rowTop,
		left = column.left,
		colWidth = colDef.minWidth,
		...rest
	} = props;
	// const gridWidth = api.gridBodyCtrl.eBodyViewport.clientWidth;
	const containerWidthRef = useRef();

	const [value, setValue] = useState(props.value);

	const [isInputValid, setIsInputValid] = useState(true);

	const errorEl = document.getElementById("error-msg");

	const inputRef = useRef(null);

	const validation = (input) => {
		const header = props.colDef.headerName;
		let isValid;
		if (
			header === "HEIGHT(INCH)" &&
			validate["HEIGHT(FEET)"](data["HEIGHT_FEET"])
		) {
			isValid = validate["HEIGHT(INCH)2"](input);
		} else if (
			header === "HEIGHT(FEET)" &&
			validate["HEIGHT(INCH)"](data["HEIGHT_INCH"]) &&
			!validate["HEIGHT(INCH)2"](data["HEIGHT_INCH"])
		) {
			isValid = false;
		} else {
			isValid = validate[header](input);
		}
		if (header.includes("SHOULDER STRETCH")) {
			setValue(input.toUpperCase());
		} else {
			setValue(input);
		}
		setIsInputValid(isValid);
	};

	const handleChange = (e) => {
		const inputValue = e.target.value;
		if (
			["ONE-MILE RUN", "ONE-MILE WALK", "PLANK"].includes(
				props.colDef.headerName,
			)
		) {
			const finalTime = handlePadStartTimer(inputValue);

			validation(finalTime);
		} else {
			validation(inputValue);
		}
	};

	if (!isInputValid) {
		const gridWidth = containerWidthRef.current;
		const header = props.colDef.headerName;
		let message;
		if (
			header === "HEIGHT(INCH)" &&
			validate["HEIGHT(FEET)"](data["HEIGHT_FEET"])
		) {
			message = MESSAGES["HEIGHT(INCH)2"];
		} else if (
			header === "HEIGHT(FEET)" &&
			validate["HEIGHT(INCH)"](data["HEIGHT_INCH"]) &&
			!validate["HEIGHT(INCH)2"](data["HEIGHT_INCH"])
		) {
			message = MESSAGES["HEIGHT(FEET)2"];
		} else {
			message = MESSAGES[header];
		}
		errorEl.innerHTML = message;
		errorEl.style.top = `${rowHeight + top}px`;

		if (gridWidth - left < 350) {
			errorEl.style.right = "0px";
		} else {
			errorEl.style.left = `${left}px`;
			errorEl.style.transform =
				left > 50 ? "translateX(calc(-50% + 50px))" : "translateX(0px)";
		}

		errorEl.style.display = "inline";
	}
	if (isInputValid) {
		errorEl.innerHTML = "";
		errorEl.style.display = "none";
		errorEl.style.removeProperty("right");
		errorEl.style.removeProperty("left");
		errorEl.style.removeProperty("transform");
	}

	useEffect(() => {
		// Cleanup function
		if (inputRef.current) {
			inputRef.current.focus();
		}
		containerWidthRef.current = document.getElementsByClassName(
			"ag-center-cols-container",
			// "ag-body-viewport",
		)[0].offsetWidth;
		return () => {
			errorEl.innerHTML = "";
			errorEl.style.display = "none";
		};
	}, []);

	useImperativeHandle(ref, () => ({
		// getValue: () => (!value || (value && isInputValid) ? value : props.value),
		getValue: () => (isInputValid ? value : ""),
	}));

	return (
		<>
			<input
				style={{
					width: "100%",
					height: "100%",
					textOverflow: "ellipsis",
					textAlign: "center",
					overflow: "hidden",
					whiteSpace: "nowrap",
					outline: "none",
				}}
				placeholder={
					props.colDef.headerName.includes("ONE") ||
					props.colDef.headerName.includes("PLANK")
						? "00:00"
						: null
				}
				ref={inputRef}
				value={value}
				onChange={handleChange}
			/>
		</>
	);
});

const EnterDataTable = React.forwardRef((props, dataEntryRef) => {
	const {
		eventId,
		missingData,
		handleMissingData,
		handleWait,
		handleFinalStoreData,
	} = props;

	const dispatch = useDispatch();

	const token = useSelector((state) => state?.profile?.token);

	const role = useSelector((state) => state?.profile?.selectedRole);

	const userId = useSelector((state) => state?.profile?.userId);

	const studentData = useSelector((state) => state?.teacher?.eventStudentList);

	const storeDataLoading = useSelector(
		(state) => state.teacher.storeDataLoading,
	);

	const eventStudentList = studentData?.response ?? [];

	const totalStudentsCount = studentData?.data?.participants;

	const test_items = studentData?.data?.test_items;

	const orderedTestItems = studentData?.data?.order_test_items;

	const hiddenTestItems = studentData?.data?.hidden_test_items;

	const event_name = studentData?.data?.event_name;

	const [hideTableColumns, setHideTableColumns] = useState(false);

	const [tableColumnsToHide, setTableColumnsToHide] = useState([]); //parent

	const [selectedColumnsToHide, setSelectedColumnsToHide] = useState([]); // child

	let gridApi;

	const gridRef = useRef();
	const hideMenuRef = useRef();

	const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	const [rowData, setRowData] = useState([]);

	const [colDefs, setColDefs] = useState([]);

	const [massExempt, setMassExempt] = useState(false);

	const [massExemptCopy, setMassExemptCopy] = useState(false);

	const selectedRows = useRef([]);

	const defaultColDef = useMemo(() => {
		return {
			flex: 1,
			minWidth: 50,
			lockPinned: true,
		};
	}, []);

	const replaceExemption = (csvRow) => {
		return csvRow.replace(/exemption:.*?"/g, 'X"');
	};

	const onBtnExport = useCallback(() => {
		const dataString = gridRef.current.api.getDataAsCsv();
		const csvData = dataString.split("\n").map((row) => row.trim());
		const modifiedCsvData = csvData.map((row) => replaceExemption(row));
		exportData(
			modifiedCsvData.join("\n"),
			"Event Data.csv",
			"text/csv;charset=utf-8;",
		);
	}, []);

	const onCellValueChanged = (params) => {
		const rowData = params.data;

		dataEntryRef?.current &&
			dataEntryRef?.current?.user_uuid !== rowData?.user_uuid &&
			dispatch(fgStoreStudentData({ body: [dataEntryRef.current], token }));
		dataEntryRef.current = rowData;
	};

	const onRowClicked = ({ data }) => {
		if (
			dataEntryRef?.current &&
			dataEntryRef?.current?.user_uuid !== data?.user_uuid
		) {
			dispatch(fgStoreStudentData({ body: [dataEntryRef.current], token }));
			dataEntryRef.current = null;
		}
	};

	const onGridReady = (params) => {
		// Store gridApi reference
		gridApi = params.api;
		const parent = document.getElementsByClassName(
			"ag-center-cols-container",
			// "ag-body-viewport",
		)[0];
		const errorEl = document.createElement("div");
		errorEl.setAttribute("id", "error-msg");
		errorEl.classList.add("err-msg");
		errorEl.style.display = "none";
		errorEl.innerHTML = "";
		parent.appendChild(errorEl);
	};

	const onSelectionChanged = useCallback(() => {
		const _selectedRows = gridRef.current.api.getSelectedRows();
		if (_selectedRows.length > 20) {
			dispatch(setMessage("You can not select more than 20 students at once."));
			const lastSelectedNode = gridRef.current.api.getSelectedNodes().pop();
			if (lastSelectedNode) {
				lastSelectedNode.setSelected(false);
			}
			return;
		}
		selectedRows.current = _selectedRows;
	}, []);

	const getCurrentColumnsInOrder = () => {
		const alteredColumns = gridRef?.current?.api
			?.getAllGridColumns()
			?.map(
				(column) =>
					!["STUDENT NAME"].includes(column.getColDef().headerName) &&
					column.getColDef().headerName,
			)
			.filter(Boolean);
		return alteredColumns;
	};

	const handleHeaderClicked = (params) => {
		//onClick header working , need to implement
	};

	// const navigateToNextCell = useCallback((params) => {
	// 	let suggestedNextCell = params.nextCellPosition;
	// 	return suggestedNextCell;
	// }, []);

	const handleMoveColumns = () => {
		const alteredColumns = getCurrentColumnsInOrder();
		const finalObject = {
			event_uuid: eventId,
			order_test_items: alteredColumns,
			hidden_test_items: tableColumnsToHide,
		};

		if (alteredColumns?.length) {
			dispatch(getUpdateFgEventOrder({ body: finalObject, token }));
		}
	};

	const debouncedHandleMoveColumns = debounce(handleMoveColumns, 500);

	const handleUpdateData = useCallback((updatedUsers) => {
		setRowData((prevRowData) => {
			const updatedRowsMap = new Map(
				prevRowData.map((row) => [row.user_uuid, row]),
			);

			updatedUsers.forEach((updatedUser) => {
				const user_uuid = updatedUser.user_uuid;
				if (updatedRowsMap.has(user_uuid)) {
					updatedRowsMap.set(user_uuid, updatedUser);
				}
			});

			const updatedRows = Array.from(updatedRowsMap.values());

			dispatch(fgStoreStudentData({ body: updatedUsers, token }));
			dataEntryRef.current = null;

			return JSON.parse(JSON.stringify(updatedRows));
		});
	}, []);

	const handleMassExemptionDataCopyModal = useCallback(() => {
		setMassExemptCopy((prevState) => !prevState);
	}, [massExemptCopy]);

	const handleMassCopyStudentsData = () => {
		if (selectedRows?.current?.length) {
			setMassExemptCopy(true);
		} else {
			dispatch(setMessage("Please Select Student(s)"));
		}
	};

	const handleMassExemptModal = useCallback(() => {
		setMassExempt((prevState) => !prevState);
	}, [massExempt]);

	const handleMassExempt = () => {
		if (selectedRows?.current?.length) {
			setMassExempt(true);
		} else {
			dispatch(setMessage("Please Select Student(s)"));
		}
	};
	const handleColDefs = (testItemsList) => {
		const colDefList = [
			{
				headerName: "STUDENT NAME",
				checkboxSelection: true,
				valueGetter: (params) => {
					return `${params.data.last_name}, ${params.data.first_name}
					(${params.data.student_id})
					`;
				},
				valueSetter: (params) => {
					return;
				},
				cellRenderer: (params) => (
					<NameCellRenderer
						event_name={event_name}
						data={params.data}
						test_items={getCurrentColumnsInOrder()}
						handleUpdateData={handleUpdateData}
					/>
				),
				pinned: "left",
				suppressMovable: true,
				cellClass: "locked-col",
				sortable: false,
			},
		];

		for (let item of testItemsList) {
			colDefList.push({
				headerName: item,
				// headerComponentFramework: <CustomHeaderComponent/>,
				field: TEST_ITEMS_NAME[item],
				editable: (params) => {
					return params.data[TEST_ITEMS_NAME[item]]?.includes("exemption")
						? false
						: true;
				},
				cellEditor: CustomCellEditor,

				cellRenderer: (params) => (
					<CustomCellRenderer
						data={params.data}
						value={params.value}
						params={params}
						handleUpdateData={handleUpdateData}
					/>
				),
				sortable: false,
			});
		}
		return colDefList;
	};

	const handleChangeColumns = (event) => {
		const { checked, name } = event.target;
		if (checked) {
			setSelectedColumnsToHide((prevState) => [...prevState, name]);
		} else {
			const hiddenColumns = [...selectedColumnsToHide];
			const remaingHiddenColumns = hiddenColumns.filter(
				(column) => !column.includes(name),
			);
			setSelectedColumnsToHide([...remaingHiddenColumns]);
		}
	};

	const onFilterTextBoxChanged = useCallback(() => {
		gridRef.current.api.setGridOption(
			"quickFilterText",
			document.getElementById("filter-text-box").value,
		);
	}, []);

	const handleUnhideAll = () => {
		if (selectedColumnsToHide.length) {
			setSelectedColumnsToHide([]);
			handleHideColumns([]);
		} else {
			setHideTableColumns(false);
		}
	};

	function compareArrays(array1, array2) {
		// Compare lengths
		if (array1.length !== array2.length) {
			return true;
		}

		// Sort the arrays and compare their sorted versions
		const sortedArray1 = array1.slice().sort();
		const sortedArray2 = array2.slice().sort();

		for (let i = 0; i < sortedArray1.length; i++) {
			if (sortedArray1[i] !== sortedArray2[i]) {
				return true;
			}
		}

		// If lengths and values match, arrays are equal
		return false;
	}

	const handleHideColumns = (testItems = null) => {
		const itemsTobeHidden = testItems ? testItems : [...selectedColumnsToHide];

		const isHiddenItemsChanged = compareArrays(
			itemsTobeHidden,
			tableColumnsToHide,
		);
		if (isHiddenItemsChanged) {
			const columnsOrder = getCurrentColumnsInOrder();

			const addedTestItems = tableColumnsToHide.filter(
				(column) => !itemsTobeHidden.includes(column),
			);
			if (itemsTobeHidden.includes("HEIGHT")) {
				const heightIndex = itemsTobeHidden.findIndex(
					(item) => item === "HEIGHT",
				);
				itemsTobeHidden.splice(heightIndex, 1, "HEIGHT(FEET)", "HEIGHT(INCH)");
			}

			for (let item of itemsTobeHidden) {
				const itemIndex = columnsOrder?.findIndex((column) => column === item);
				if (itemIndex != -1) {
					columnsOrder.splice(itemIndex, 1);
				}
			}
			if (addedTestItems.includes("HEIGHT")) {
				const heightIndex = addedTestItems.findIndex(
					(item) => item === "HEIGHT",
				);
				addedTestItems.splice(heightIndex, 1, "HEIGHT(FEET)", "HEIGHT(INCH)");
			}
			if (addedTestItems.length) {
				columnsOrder.unshift(...addedTestItems);
			}
			const finalObject = {
				event_uuid: eventId,
				order_test_items: columnsOrder,
				hidden_test_items: itemsTobeHidden,
			};

			dispatch(getUpdateFgEventOrder({ body: finalObject, token }));

			const _colDefs = handleColDefs(columnsOrder);

			setColDefs([..._colDefs]);

			setTableColumnsToHide(testItems ?? selectedColumnsToHide);

			setHideTableColumns(false);
		} else {
			setHideTableColumns(false);
		}
	};

	useEffect(() => {
		if (test_items?.length) {
			const _colDefs = handleColDefs(orderedTestItems);
			setColDefs([..._colDefs]);
		}
	}, [orderedTestItems]);

	useEffect(() => {
		if (eventStudentList?.length) {
			const _rowData = eventStudentList?.map((eachStudent, index) => {
				if (Object.keys(eachStudent)?.length <= 4) {
					let modifiedStudent = {
						user_uuid: eachStudent?.uuid,
						student_id: eachStudent?.student_id,
						event_uuid: eventId,
						submitted_by: userId,
						first_name: eachStudent?.first_name,
						last_name: eachStudent?.last_name,
						submitter_role: role,
					};

					for (let item of test_items) {
						if (item === "HEIGHT") {
							modifiedStudent["HEIGHT_INCH"] = "";
							modifiedStudent["HEIGHT_FEET"] = "";
						} else {
							modifiedStudent[TEST_ITEMS_NAME[item]] = "";
						}
					}

					return modifiedStudent;
				} else {
					let modifiedStudent = {
						...eachStudent,
						submitted_by: userId,
						submitter_role: role,
					};
					for (let item of test_items) {
						if (modifiedStudent[TEST_ITEMS_NAME[item]] == undefined) {
							modifiedStudent[TEST_ITEMS_NAME[item]] = "";
						}
					}
					return modifiedStudent;
				}
			});

			JSON.parse(JSON.stringify(_rowData));

			setRowData(JSON.parse(JSON.stringify(_rowData)));
		}
	}, [eventStudentList]);

	useEffect(() => {
		if (hiddenTestItems?.length) {
			const _hiddenTestItems = [...hiddenTestItems];
			const heightFeetIndex = _hiddenTestItems.findIndex(
				(item) => item === "HEIGHT(FEET)",
			);

			if (heightFeetIndex !== -1) {
				_hiddenTestItems.splice(heightFeetIndex, 1);
			}
			const heightInchIndex = _hiddenTestItems.findIndex(
				(item) => item === "HEIGHT(INCH)",
			);
			if (heightInchIndex !== -1) {
				_hiddenTestItems.splice(heightInchIndex, 1);
			}
			heightInchIndex !== -1 &&
				!_hiddenTestItems.includes("HEIGHT") &&
				_hiddenTestItems.push("HEIGHT");
			setTableColumnsToHide([..._hiddenTestItems]);
		}
	}, [hiddenTestItems]);

	useEffect(() => {
		return () => {
			handleFinalStoreData();
		};
	}, []);
	useEffect(() => {
		const handleVisibilityChange = () => {
			// You can perform actions based on the visibility state here
			if (document.visibilityState === "visible") {
			} else {
				handleFinalStoreData();
			}
		};
		// Check if the Page Visibility API is supported by the browser
		if ("hidden" in document) {
			// Add event listener for visibilitychange
			document.addEventListener("visibilitychange", handleVisibilityChange);

			// Cleanup the event listener on component unmount
			return () => {
				document.removeEventListener(
					"visibilitychange",
					handleVisibilityChange,
				);
			};
		}
	}, []);

	useEffect(() => {
		const handleBeforeUnload = (event) => {
			// You can perform any cleanup or show a confirmation message here
			handleFinalStoreData();
			const confirmationMessage = "Are you sure you want to leave?";
			event.returnValue = confirmationMessage; // Standard for most browsers
			return confirmationMessage; // For some older browsers
		};

		window.addEventListener("beforeunload", handleBeforeUnload);

		return () => {
			// Cleanup: Remove the event listener when the component is unmounted
			window.removeEventListener("beforeunload", handleBeforeUnload);
		};
	}, []);

	return (
		<>
			{rowData?.length || missingData ? (
				<>
					<Flex alignItems={"center"} gap="3" w="full">
						<Input
							width="15rem"
							type="text"
							size="md"
							id="filter-text-box"
							placeholder="Filter..."
							onChange={onFilterTextBoxChanged}
						/>
						<HStack>
							<Checkbox
								id={`checkbox+button+${25}`}
								// value={inputDetailsObj?.[role.name]}
								name={"missing_data"}
								isChecked={missingData}
								onChange={() => {
									if (storeDataLoading) {
										handleWait();
									} else {
										handleMissingData();
									}
								}}
							/>

							<Heading9>Missing Data</Heading9>
						</HStack>
						<Spacer />

						<Box
							display={{ base: "flex", md: "flex", lg: "flex" }}
							position="relative"
							justifyContent={{ base: "flex-start", md: "center" }}
							alignItems={"center"}
							px="4"
							py="2"
							gap="1"
							key={"button212" + "action"}
							bg="head2"
							cursor="pointer"
							borderRadius={"0.3rem"}
							onClick={handleMassCopyStudentsData}
							as="button"
						>
							<Text>
								<BsFiletypeExe size={20} />
							</Text>

							<Heading9>Multiple Entry</Heading9>
						</Box>

						<Box position="relative">
							<Menu
								isOpen={hideTableColumns}
								onClose={() => setHideTableColumns(false)}
								closeOnSelect={false}
							>
								<MenuButton
									bg="head2"
									cursor="pointer"
									borderRadius={"0.3rem"}
									px="4"
									py="2"
									gap="1"
									textAlign="center"
									w="100%"
									onClick={() => {
										setHideTableColumns(true);
										setSelectedColumnsToHide([...tableColumnsToHide]);
										hideMenuRef.current.scrollTop = 0;
									}}
									overflow="hidden"
									textOverflow="ellipsis"
									whiteSpace="nowrap"
								>
									<Flex gap="1">
										<BiSolidHide size={20} /> <Heading9>Hide Columns</Heading9>
									</Flex>
								</MenuButton>
								<MenuList
									w="17rem"
									boxShadow="dark-lg"
									height="auto"
									zIndex={9999}
								>
									<Box
										ref={hideMenuRef}
										height="auto"
										maxH="35vh"
										overflowY="auto"
									>
										{test_items?.length ? (
											test_items.map((testItem, index) => (
												<MenuItem key={`heading + ${testItem} ${index}`}>
													<Flex gap="2" alignItems="center">
														<Checkbox
															id={`menucolumn+${index}`}
															// value={inputDetailsObj?.[role.name]}
															name={testItem}
															isChecked={selectedColumnsToHide?.includes(
																testItem,
															)}
															onChange={(event) => handleChangeColumns(event)}
														/>
														<Heading9>{testItem}</Heading9>
													</Flex>
												</MenuItem>
											))
										) : (
											<Text color="gray.500" p={2}>
												No options found
											</Text>
										)}
									</Box>

									<Flex
										justifyContent={"center"}
										alignItems={"center"}
										my="1"
										gap="4"
									>
										<NegativeButton
											text={"Unhide All"}
											onClick={() => handleUnhideAll()}
										/>
										<PositiveButton
											text={"Apply"}
											onClick={() => handleHideColumns()}
										/>
									</Flex>
								</MenuList>
							</Menu>
						</Box>

						<Box
							display={{ base: "flex", md: "flex", lg: "flex" }}
							position="relative"
							justifyContent={{ base: "flex-start", md: "center" }}
							alignItems={"center"}
							px="4"
							py="2"
							gap="1"
							key={"button1" + "action"}
							bg="head2"
							cursor="pointer"
							borderRadius={"0.3rem"}
							onClick={onBtnExport}
							as="button"
						>
							<FaFileCsv size={20} />

							<Heading9>Export Table Data</Heading9>
						</Box>

						<Box
							display={{ base: "flex", md: "flex", lg: "flex" }}
							position="relative"
							justifyContent={{ base: "flex-start", md: "center" }}
							alignItems={"center"}
							px="4"
							py="2"
							gap="1"
							key={"button2" + "action"}
							bg="head2"
							cursor="pointer"
							borderRadius={"0.3rem"}
							onClick={handleMassExempt}
							as="button"
						>
							<FaBan />

							<Heading9>Mass Exempt</Heading9>
						</Box>
					</Flex>

					<div
						className="ag-theme-quartz"
						style={{ height: `calc(100vh - ${170}px)`, width: "100%" }}
					>
						<AgGridReact
							ref={gridRef}
							rowHeight={45}
							rowData={rowData}
							columnDefs={colDefs}
							defaultColDef={defaultColDef}
							rowSelection={"multiple"}
							enableRangeSelection={false}
							suppressScrollOnNewData={true}
							suppressRowClickSelection={true}
							onSelectionChanged={onSelectionChanged}
							onRowClicked={onRowClicked}
							suppressExcelExport={true}
							columnHoverHighlight={true}
							// navigateToNextCell={navigateToNextCell}
							singleClickEdit={true}
							stopEditingWhenCellsLoseFocus={true}
							onCellValueChanged={onCellValueChanged}
							onGridReady={onGridReady}
							onColumnMoved={debouncedHandleMoveColumns}
							// onColumnHeaderClicked={handleHeaderClicked}
						/>
					</div>
					<Flex w="full">
						<Paragraph2>
							{" "}
							Total Students Count : {totalStudentsCount}
						</Paragraph2>
					</Flex>

					{massExempt && (
						<ExemptionModal
							event_name={event_name}
							users={selectedRows?.current}
							modal={massExempt}
							handleModal={handleMassExemptModal}
							handleUpdateData={handleUpdateData}
							test_items={getCurrentColumnsInOrder()}
						/>
					)}

					{massExemptCopy && (
						<MultipleEntryModal
							users={selectedRows?.current}
							modal={massExemptCopy}
							handleModal={handleMassExemptionDataCopyModal}
							handleUpdateData={handleUpdateData}
							test_items={getCurrentColumnsInOrder()}
						/>
					)}
				</>
			) : null}
		</>
	);
});

export default EnterDataTable;
