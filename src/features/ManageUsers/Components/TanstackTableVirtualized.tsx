import React, { useState } from "react";

import {
	Box,
	Checkbox,
	Flex,
	Image,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	Row,
	getSortedRowModel,
	// SortingState,
	useReactTable,
} from "@tanstack/react-table";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useVirtualizer } from "@tanstack/react-virtual";

import loadingImg from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import PaginationComponent from "../../../components/PaginationComponent";
import {
	setManageUser,
	setMessage,
	setPreviousPath,
} from "../../../store/slices/profileSlice";
import { ManageUsersData, manageUsersTableData } from "../Config";
import moment from "moment";

interface usersObj {
	student: string;
	teacher: string;
	parent: string;
	schoolAdmin: string;
	districtAdmin: string;
}

const USERS_OBJ: usersObj = {
	student: "Student",
	teacher: "Teacher",
	parent: "Parent",
	schoolAdmin: "School Administrator",
	districtAdmin: "District Administrator",
};

type Student = {
	first_name: String;
	last_name: String;
	student_id: String;
	date_of_birth: String;
	grade: String;
	gender: String;
	login_status: String;
	assignedToClass: Boolean;
};

type Teacher = {
	first_name: String;
	last_name: String;
	user_id: String;
	login_status: String;
	assignedToClass: Boolean;
};
type schoolAdmin = {
	first_name: String;
	last_name: String;
	user_id: String;
	login_status: String;
	admin_assigned_to_school: Boolean;
};
type districtAdmin = {
	first_name: String;
	last_name: String;
	user_id: String;
	login_status: String;
};

export const TanstackTableVirtualized = React.memo((props: any) => {
	const {
		userIds,
		setUserIds,
		setIsAllChecked,
		isAllChecked,
		pageNumber,
		setFormData,
		selectedUsersInfo,
		setSelectedUsersInfo,
		userType,
		schoolUUID,
		birthDateRef,
		formData,
	} = props;

	const { noUsers } = ManageUsersData;

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const DropdownText: string = useSelector(
		(state: any) => state?.profile?.manageUser?.userType,
	);

	const manageUser = useSelector((state: any) => state?.profile?.manageUser);

	const userRole = useSelector((state: any) => state?.profile?.selectedRole);

	const data = useSelector((state: any) => state.teacher.allUsers) || [];

	const totalPages = useSelector((state: any) => state?.teacher?.totalPages);

	const loading = useSelector((state: any) => state.teacher.loading);
	const loading2 = useSelector((state: any) => state.districtAdmin?.loading);

	const isPreviousButtonDisabled = pageNumber === 1;
	const isNextButtonDisabled = pageNumber === totalPages;

	const rolesAndPrevilegesObject = useSelector(
		(state: any) => state?.profile?.rolesAndPrevilegesObject,
	);

	// const [sorting, setSorting] = useState<SortingState>([]);

	// const columns = React.useMemo<ColumnDef<userTableHeading>[]>(() => {
	//   const tableColumns : any = [];

	//   if (DropdownText) {
	//     let initialObj: userTableHeading = {
	//       accessorKey: "first_name",
	//       header: manageUsersTableData?.["tableHeaders"]?.[DropdownText],
	//       id: "first_name",
	//       cell: (info: any) => info.getValue(),
	//     };

	//     tableColumns.push(initialObj);

	//     Object.entries<string>(
	//       manageUsersTableData?.[DropdownText] as Record<string, string>
	//     ).forEach(([key, value]) => {
	//       let obj: {
	//         accessorKey: string;
	//         header: string;
	//         id: string;
	//         cell: (info: any) => any;
	//       } = {
	//         accessorKey: key,
	//         header: value,
	//         id: key,
	//         cell: (info: any) => info.getValue(),
	//       };

	//       tableColumns.push(obj);
	//     });
	//   }

	//   return tableColumns;
	// }, [DropdownText]);

	const studentColumns = React.useMemo<ColumnDef<Student>[]>(
		() => [
			{
				accessorFn: (row) => `${row.last_name}, ${row.first_name}`,
				id: "name",
				cell: (info) => info.getValue(),
				header: "Student Name",
				// size:245,
			},
			{
				accessorKey: "student_id",
				cell: (info) => info.getValue(),
				header: "Student ID",
				size: 90,
			},
			{
				accessorKey: "date_of_birth",
				cell: (info) => moment(info.getValue()).format("MM-DD-YYYY"),
				header: "Birth Date",
				size: 60,
			},
			{
				accessorKey: "grade",
				cell: (info) => info.getValue(),
				header: "Grade",
				size: 30,
			},
			{
				accessorKey: "gender",
				cell: (info) => info.getValue(),
				header: "SEX ASSIGNED AT BIRTH",
				size: 70,
			},
			{
				accessorKey: "login_status",
				cell: (info) => (info.getValue() == "1" ? "Active" : "Inactive"),
				header: "LOGIN STATUS",
				size: 70,
			},
			{
				accessorKey: "assignedToClass",
				cell: (info) => (info.getValue() ? "Assigned" : "Unassigned"),
				header: "ASSIGNED TO CLASS",
				id: "assigned",
				size: 120,
			},
		],
		[DropdownText],
	);

	const teacherColumns = React.useMemo<ColumnDef<Teacher>[]>(
		() => [
			{
				accessorFn: (row) => `${row.last_name}, ${row.first_name}`,
				id: "name",
				cell: (info) => info.getValue(),
				header: "Teacher Name",
				// size:245,
			},
			{
				accessorKey: "user_id",
				cell: (info) => info.getValue(),
				header: "Teacher ID",
				// size:90,
			},
			{
				accessorKey: "login_status",
				cell: (info) => (info.getValue() == "1" ? "Active" : "Inactive"),
				header: "LOGIN STATUS",
				// size: 70,
			},
			{
				accessorKey: "assignedToClass",
				cell: (info) => (info.getValue() ? "Assigned" : "Unassigned"),
				header: "ASSIGNED TO CLASS",
				id: "assigned",
				// size: 120,
			},
		],
		[DropdownText],
	);
	const schoolAdminColumns = React.useMemo<ColumnDef<schoolAdmin>[]>(
		() => [
			{
				accessorFn: (row) => `${row.last_name}, ${row.first_name}`,
				id: "name",
				cell: (info) => info.getValue(),
				header: "School Administrator Name",
				// size:245,
			},
			{
				accessorKey: "user_id",
				cell: (info) => info.getValue(),
				header: "School Administrator ID",
				// size:90,
			},
			{
				accessorKey: "login_status",
				cell: (info) => (info.getValue() == "1" ? "Active" : "Inactive"),
				header: "LOGIN STATUS",
				// size: 70,
			},
			{
				accessorKey: "admin_assigned_to_school",
				cell: (info) => (info.getValue() ? "Assigned" : "Unassigned"),
				header: "ASSIGNED TO School",
				id: "assigned",
				// size: 120,
			},
		],
		[DropdownText],
	);
	const districtAdminColumns = React.useMemo<ColumnDef<districtAdmin>[]>(
		() => [
			{
				accessorFn: (row) => `${row.last_name}, ${row.first_name}`,
				id: "name",
				cell: (info) => info.getValue(),
				header: "District Administrator Name",
				// size:245,
			},
			{
				accessorKey: "user_id",
				cell: (info) => info.getValue(),
				header: "District Administrator ID",
				// size:90,
			},
			{
				accessorKey: "login_status",
				cell: (info) => (info.getValue() == "1" ? "Active" : "Inactive"),
				header: "LOGIN STATUS",
				// size: 70,
			},
		],
		[DropdownText],
	);

	const COLUMNS_OBJ = {
		student: studentColumns,
		teacher: teacherColumns,
		schoolAdmin: schoolAdminColumns,
		districtAdmin: districtAdminColumns,
	};

	const table = useReactTable({
		data,
		columns: COLUMNS_OBJ[DropdownText],
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
	});

	const tableContainerRef = React.useRef<HTMLDivElement>(null);

	const virtualizer = useVirtualizer({
		count: data?.length,
		getScrollElement: () => tableContainerRef.current,
		estimateSize: () => 34,
		measureElement:
			typeof window !== "undefined" &&
			navigator.userAgent.indexOf("Firefox") === -1
				? (element) => element?.getBoundingClientRect().height
				: undefined,
		overscan: 20,
	});

	const clickOnUser = (id: any) => {
		dispatch(
			setManageUser({
				formTitle: `Edit ${USERS_OBJ[manageUser?.userType]}`,
				userType: manageUser?.userType,
			}),
		);
		dispatch(setPreviousPath(location.pathname));

		navigate(`/role/${userRole}/edit/${DropdownText}/${id}`);
	};

	const handleCheckAll = (e: any) => {
		if (e.target.checked) {
			setIsAllChecked(true);
			let arr = data.map((user: any) => user.uuid);
			setUserIds(arr);
			setSelectedUsersInfo(data);
		} else {
			setIsAllChecked(false);
			setUserIds([]);
			setSelectedUsersInfo([]);
		}
	};

	const handleUserIds = (e: any, userId: any) => {
		// 	if (e.target.checked && userIds?.length > 20) {
		// 		dispatch(setMessage("You can not select more than 20 users at a time"));
		//   return
		// 	}
		if (e.target.checked) {
			setUserIds((prevState: any) => {
				data.length === [...prevState, userId].length
					? setIsAllChecked(true)
					: setIsAllChecked(false);
				return [...prevState, userId];
			});

			let userData = data.filter((userData: any) => userData?.uuid === userId);

			setSelectedUsersInfo((prevState: any) => [...prevState, ...userData]);
		} else {
			setSelectedUsersInfo((prevState: any) => {
				return prevState?.filter((each: any) => each?.uuid !== userId);
			});

			let dummyUserIds = userIds.slice();

			let userIdIndex = dummyUserIds.findIndex((id: any) => id === userId);
			dummyUserIds.splice(userIdIndex, 1);
			setUserIds([...dummyUserIds]);

			data.length === dummyUserIds.length
				? setIsAllChecked(true)
				: setIsAllChecked(false);
		}
	};

	const clickOnAssigned = (id: any) => {
		dispatch(
			setManageUser({
				formTitle: `Edit ${USERS_OBJ[manageUser?.userType]}`,
				userType: manageUser?.userType,
				tab: 1,
			}),
		);
		dispatch(setPreviousPath(location.pathname));

		navigate(`/role/${userRole}/edit/${DropdownText}/${id}`);
	};

	const cellRenderer = (cell: any) => {
		if (cell.column.id === "name") {
			return (
				<Td
					key={`cell-${cell.id}`}
					style={{
						display: "flex",
						gap: "8px",
						flexGrow: "1",
						width: cell.column.getSize(),
						overflow: "hidden",
					}}
				>
					<Checkbox
						isChecked={userIds.includes(cell.row.original?.uuid)}
						onChange={(e) => [handleUserIds(e, cell.row.original.uuid)]}
					/>
					{rolesAndPrevilegesObject?.["Manage Users"]?.edit ?? true ? (
						<Text
							role="button"
							onClick={() => {
								clickOnUser(cell.row.original.uuid);
							}}
							cursor="pointer"
							color="primary"
						>
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Text>
					) : (
						<Text cursor="not-allowed">
							{flexRender(cell.column.columnDef.cell, cell.getContext())}
						</Text>
					)}
				</Td>
			);
		}
		if (cell.column.id === "assigned") {
			return (
				<Td
					key={`cell-${cell.id}`}
					style={{
						display: "flex",
						flexGrow: "1",
						width: cell.column.getSize(),
						overflow: "hidden",
					}}
					role="button"
					color="primary"
					onClick={() => {
						clickOnAssigned(cell.row.original.uuid);
					}}
				>
					{flexRender(cell.column.columnDef.cell, cell.getContext())}
				</Td>
			);
		}

		return (
			<Td
				key={`cell-${cell.id}`}
				style={{
					display: "flex",
					flexGrow: "1",
					width: cell.column.getSize(),
					overflow: "hidden",
				}}
			>
				{flexRender(cell.column.columnDef.cell, cell.getContext())}
			</Td>
		);
	};

	const handlePageNumber = (event: any) => {
		birthDateRef.current = formData.date_of_birth;

		setFormData((prevState: any) => ({
			...prevState,
			skip: event.selected + 1,
		}));
	};

	return loading || loading2 ? (
		<Flex direction="column" alignItems="center">
			<Image src={loadingImg} />
		</Flex>
	) : data?.length ? (
		<>
			<TableContainer
				height="auto"
				maxH="calc(100vh - 12rem)"
				overflowY="auto"
				ref={tableContainerRef}
			>
				<Table style={{ display: "grid", width: "100%" }}>
					<Thead
						style={{
							display: "grid",
							position: "sticky",
							top: 0,
							zIndex: 1,
							width: "100%",
						}}
					>
						{table.getHeaderGroups().map((headerGroup) => (
							<Tr
								key={headerGroup.id}
								style={{ display: "flex", width: "100%" }}
								height="auto"
								bg="white"
							>
								{headerGroup.headers.map((header) => {
									return header.id === "name" ? (
										<Th
											key={header.id}
											style={{
												display: "flex",
												gap: "8px",
												textWrap: "wrap",
												flexGrow: "1",
												alignItems: "center",
												width: header.getSize(),
											}}
										>
											<Checkbox
												isChecked={isAllChecked}
												onChange={handleCheckAll}
											/>
											<span>
												{flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
											</span>
										</Th>
									) : (
										<Th
											key={header.id}
											style={{
												display: "flex",
												textWrap: "wrap",
												flexGrow: "1",
												alignItems: "center",
												width: header.getSize(),
											}}
										>
											{flexRender(
												header.column.columnDef.header,
												header.getContext(),
											)}
										</Th>
									);
								})}
							</Tr>
						))}
					</Thead>
					<Tbody
						style={{
							display: "grid",
							height: `${virtualizer.getTotalSize()}px`, //tells scrollbar how big the table is
							position: "relative", //needed for absolute positioning of rows
						}}
					>
						{virtualizer.getVirtualItems().map((virtualRow, index) => {
							const row = table.getRowModel().rows[
								virtualRow.index
							] as Row<Student>;
							return (
								<Tr
									data-index={virtualRow.index} //needed for dynamic row height measurement
									ref={(node) => virtualizer.measureElement(node)} //measure dynamic row height
									key={row.id}
									style={{
										display: "flex",
										alignItems: "center",
										position: "absolute",
										transform: `translateY(${virtualRow.start}px)`, //this should always be a `style` as it changes on scroll
										width: "100%",
									}}
								>
									{row.getVisibleCells().map((cell: any) => {
										return <>{cellRenderer(cell)}</>;
									})}
								</Tr>
							);
						})}
					</Tbody>
				</Table>
			</TableContainer>

			{totalPages > 1 ? (
				<PaginationComponent
					onPageChange={handlePageNumber}
					pageCount={totalPages}
					forcePage={pageNumber - 1}
					isNextButton={isNextButtonDisabled}
					isPreviousButton={isPreviousButtonDisabled}
				/>
			) : null}
		</>
	) : (
		<NoDataFoundText>{noUsers}</NoDataFoundText>
	);
});
