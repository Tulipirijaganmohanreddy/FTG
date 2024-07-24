import {
	Box,
	Checkbox,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Text,
} from "@chakra-ui/react";
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import { AgGridReact } from "ag-grid-react"; // React Grid Logic

import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	fgStoreStudentData,
	getUpdateFgEventOrder,
} from "../../../features/teacher/teacherSlice";

import { BiSolidHide } from "react-icons/bi";
import { useParams } from "react-router-dom";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading9 from "../../../components/FitnessComponents/FitnessTexts/Heading9";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { getTestResultsData } from "../../../store/slices/studentSlice/studentSlice";
import {
	CustomCellEditor,
	CustomCellRenderer,
	NameCellRenderer,
	TEST_ITEMS_NAME,
} from "./EnterDataTable";
import ExemptionModal from "./ExemptionModal";
import { debounce } from "../../../Utilities/utils";

const EnterDataTable = (props) => {
	const params = useParams();

	const eventId = params.eventId;

	const dispatch = useDispatch();

	const rowDataRef = useRef();

	const token = useSelector((state) => state?.profile?.token);

	const role = useSelector((state) => state?.profile?.selectedRole);

	const userId = useSelector((state) => state?.profile?.userId);

	const eventTestResult = useSelector(
		(state) => state?.student?.eventTestResult,
	);

	const stduentEventData = eventTestResult?.response ?? {};

	const test_items = eventTestResult?.data?.test_items;

	const orderedTestItems = eventTestResult?.data?.order_test_items;

	const hiddenTestItems = eventTestResult?.data?.hidden_test_items;

	const event_name = eventTestResult?.data?.event_name;

	const [hideTableColumns, setHideTableColumns] = useState(false);

	const [tableColumnsToHide, setTableColumnsToHide] = useState([]); //parent

	const [selectedColumnsToHide, setSelectedColumnsToHide] = useState([]); // child

	let gridApi;

	const gridRef = useRef();

	const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);

	const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

	const [rowData, setRowData] = useState([]);

	const [colDefs, setColDefs] = useState([]);

	const [massExempt, setMassExempt] = useState(false);

	const selectedRows = useRef([]);

	const defaultColDef = useMemo(() => {
		return {
			flex: 1,
			minWidth: 50,
			lockPinned: true,
		};
	}, []);

	const onCellValueChanged = (params) => {
		const rowData = params.data;
		rowDataRef.current = rowData;
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

	const getCurrentColumnsInOrder = () => {
		const alteredColumns = gridRef?.current?.api
			?.getAllGridColumns()
			?.map(
				(column) =>
					column.getColDef().headerName !== "STUDENT NAME" &&
					column.getColDef().headerName,
			)
			.filter(Boolean);
		return alteredColumns;
	};

	const handleHeaderClicked = (params) => {
		//onClick header working , need to implement
	};

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

	const handleColDefs = (testItemsList) => {
		const colDefList = [
			{
				headerName: "STUDENT NAME",
				valueGetter: (params) => {
					return params.data.last_name + ", " + params.data.first_name;
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

			return JSON.parse(JSON.stringify(updatedRows));
		});
	}, []);

	const handleFinalStoreData = () => {
		if (rowDataRef?.current) {
			dispatch(fgStoreStudentData({ body: [rowDataRef.current], token }));
		}

		rowDataRef.current = null;
	};

	useEffect(() => {
		if (test_items?.length) {
			const _colDefs = handleColDefs(orderedTestItems);
			setColDefs([..._colDefs]);
		}
	}, [orderedTestItems]);

	useEffect(() => {
		if (Object.keys(stduentEventData)?.length) {
			let _rowData;
			if (Object.keys(stduentEventData)?.length <= 4) {
				_rowData = {
					user_uuid: stduentEventData?.uuid,
					event_uuid: eventId,
					student_id: stduentEventData?.student_id,
					submitted_by: userId,
					first_name: stduentEventData?.first_name,
					last_name: stduentEventData?.last_name,
					submitter_role: role,
				};

				for (let item of test_items) {
					//HEIGHT(FEET) HEIGHT(INCH)

					if (item === "HEIGHT") {
						_rowData["HEIGHT_INCH"] = "";
						_rowData["HEIGHT_FEET"] = "";
					} else {
						_rowData[TEST_ITEMS_NAME[item]] = "";
					}
				}
				console.log(_rowData, "1==========>");
			} else {
				_rowData = {
					...stduentEventData,
					submitted_by: userId,
					submitter_role: role,
				};
				for (let item of test_items) {
					if (_rowData[TEST_ITEMS_NAME[item]] == undefined) {
						_rowData[TEST_ITEMS_NAME[item]] = "";
					}
				}
				console.log(_rowData, "2==========>");
			}

			setRowData([JSON.parse(JSON.stringify(_rowData))]);
		}
	}, [stduentEventData]);

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
		dispatch(
			getTestResultsData({
				token,
				body: { user_uuid: userId, event_uuid: eventId },
			}),
		);
	}, []);

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
		<Flex direction="column" gap="4">
			{rowData?.length ? (
				<>
					<Heading1>{eventTestResult?.data?.event_name}</Heading1>
					<Flex justifyContent="flex-end">
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
								onClick={() => {
									setHideTableColumns(true);
									setSelectedColumnsToHide([...tableColumnsToHide]);
								}}
								overflow="hidden"
								textOverflow="ellipsis"
								whiteSpace="nowrap"
							>
								<Flex gap="1">
									<BiSolidHide size={20} />
									<Heading9>Hide Columns</Heading9>
								</Flex>
							</MenuButton>
							<MenuList
								w="17rem"
								boxShadow="dark-lg"
								height="auto"
								zIndex={9999}
							>
								<Box height="auto" maxH="35vh" overflowY="auto">
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
					</Flex>

					<div className="ag-theme-quartz" style={{ height: "150px" }}>
						<AgGridReact
							ref={gridRef}
							rowHeight={40}
							rowData={rowData}
							columnDefs={colDefs}
							defaultColDef={defaultColDef}
							suppressRowClickSelection={true}
							suppressExcelExport={true}
							singleClickEdit={true}
							stopEditingWhenCellsLoseFocus={true}
							// onCellEditingStarted={onCellEditingStarted}
							onCellValueChanged={onCellValueChanged}
							onGridReady={onGridReady}
							onColumnMoved={debouncedHandleMoveColumns}
							onColumnHeaderClicked={handleHeaderClicked}
						/>
					</div>

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
				</>
			) : null}
		</Flex>
	);
};

export default EnterDataTable;
