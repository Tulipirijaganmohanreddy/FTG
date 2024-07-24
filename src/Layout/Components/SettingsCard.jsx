import {
	Box,
	Card,
	CardBody,
	Divider,
	Flex,
	Heading,
	Slide,
	Stack,
	StackDivider,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";

import { BiPowerOff } from "react-icons/bi";
import { FaGraduationCap, FaUserCog, FaUsers } from "react-icons/fa";
import { GiKeyLock } from "react-icons/gi";
import { HiOutlineClipboardList, HiUserCircle } from "react-icons/hi";
import { IoIosHelpCircle, IoMdSchool } from "react-icons/io";
import { MdNotifications, MdUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setPreviousValuesOfAddUser } from "../../features/authentication/components/schoolAdmin/schoolAdminSlice";
import {
	logOut,
	setActivatingID,
	setGlobalSearchResults,
	setLogoutClicked,
	setManageUser,
	setMessage,
	setSearchData,
} from "../../store/slices/profileSlice";

import Heading8 from "../../components/FitnessComponents/FitnessTexts/Heading8";
import NavbarCardIcon from "../../components/FitnessComponents/FitnessTexts/NavbarCardIcon";

import { resetStore } from "../../store/store";
import AppContext from "../../Context/AppContext";

const SettingsCard = (props) => {
	const { displayCard, setDisplayCard } = props;

	const { dataEntryRef, DATA_ENTRY_WAIT_MSG } =
		useContext(AppContext);

	const token = useSelector((state) => state?.profile?.token);
	const duplicateRole = useSelector((state) => state.profile.duplicateRole);
	const role = useSelector((state) => state?.profile?.selectedRole);

	const searchData = useSelector((state) => state.profile.searchData);

	const location = useLocation();

	const navigate = useNavigate();

	const dispatch = useDispatch();

	const userRole = useSelector((state) => state?.profile?.selectedRole);

	const [selectedRole, setSelectedRole] = useState("");

	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
	);

	const commonSettingsData = {
		id: "1",
		head: "ACCOUNT SETTINGS",
		list: [
			{
				id: 1,
				icon: (
					<NavbarCardIcon
						elementIcon={HiUserCircle}
						changeCursor={
							rolesAndPrevilegesObject?.["My Personal Information"]?.view ??
							true
								? "pointer"
								: "not-allowed"
						}
					/>
				),

				name: "My Account",

				isDisplay:
					rolesAndPrevilegesObject?.["My Personal Information"]?.view ?? true
						? true
						: false,
			},
			{
				id: 2,
				icon: <NavbarCardIcon elementIcon={IoIosHelpCircle} />,

				name: "Help",

				isDisplay: true,
			},
			{
				id: 2,
				icon: <NavbarCardIcon elementIcon={BiPowerOff} />,

				name: "Logout",

				isDisplay: true,
			},
		],
	};

	const settingsData = {
		teacher: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Notifications",

						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
				],
			},
			{
				id: "2",
				head: "DATA MANAGEMENT",
				list: [
					{
						id: 1,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUsers}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Classes"]?.edit ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Classes",

						isDisplay:
							rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true
								? true
								: false,
					},
					{
						id: 2,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUserCog}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Users",
						isDisplay:
							rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
								? true
								: false,
					},
				],
			},
		],

		superAdmin: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						name: "Roles & Privileges",
						icon: (
							<NavbarCardIcon
								elementIcon={GiKeyLock}
								changeCursor={
									rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						isDisplay:
							rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
								? true
								: false,
					},
				],
			},
			{
				id: "2",
				head: "DATA MANAGEMENT",
				list: [
					{
						id: 1,
						name: "Manage Users",
						icon: (
							<NavbarCardIcon
								elementIcon={FaUserCog}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
								? true
								: false,
					},
				],
			},
		],

		student: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						name: "Notifications",
						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
				],
			},
		],
		Parent: {},
		schoolAdmin: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						name: "Schools",
						icon: (
							<NavbarCardIcon
								elementIcon={IoMdSchool}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage District and Schools"]
										?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						isDisplay:
							rolesAndPrevilegesObject?.["Manage District and Schools"]?.view ??
							true
								? true
								: false,
					},
					{
						id: 2,
						name: "Notifications",
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
				],
			},
			{
				id: "2",
				head: "DATA MANAGEMENT",
				list: [
					{
						id: 2,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUsers}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Classes",

						isDisplay:
							rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true
								? true
								: false,
					},
					{
						id: 3,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUserCog}
								//
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Users",
						isDisplay:
							rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
								? true
								: false,
					},
				],
			},
		],

		districtAdmin: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						name: "District & Schools",
						icon: (
							<NavbarCardIcon
								elementIcon={IoMdSchool}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage District and Schools"]
										?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Manage District and Schools"]?.view ??
							true
								? true
								: false,
					},

					{
						id: 3,
						name: "Manage Mandates",
						icon: (
							<NavbarCardIcon
								elementIcon={HiOutlineClipboardList}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Mandates"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						isDisplay:
							rolesAndPrevilegesObject?.["Manage Mandates"]?.view ?? true
								? true
								: false,
					},
					{
						id: 4,
						name: "Notifications",
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
					{
						id: 5,
						name: "Roles & Privileges",
						icon: (
							<NavbarCardIcon
								elementIcon={GiKeyLock}
								changeCursor={
									rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
								? true
								: false,
					},
				],
			},
			{
				id: "2",
				head: "DATA MANAGEMENT",
				list: [
					{
						id: 1,
						name: "End of Term Process",
						icon: (
							<NavbarCardIcon
								elementIcon={FaGraduationCap}
								changeCursor={"pointer"}
							/>
						),
						isDisplay: true,
					},

					{
						id: 2,
						name: "Import",
						icon: (
							<NavbarCardIcon
								elementIcon={MdUpload}
								changeCursor={
									rolesAndPrevilegesObject?.["Import"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						isDisplay:
							rolesAndPrevilegesObject?.["Import"]?.view ?? true ? true : false,
					},
					{
						id: 3,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUsers}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Classes",
						isDisplay:
							rolesAndPrevilegesObject?.["Manage Classes"]?.view ?? true
								? true
								: false,
					},
					{
						id: 4,
						icon: (
							<NavbarCardIcon
								elementIcon={FaUserCog}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						name: "Manage Users",

						isDisplay:
							rolesAndPrevilegesObject?.["Manage Users"]?.view ?? true
								? true
								: false,
					},
				],
			},
		],

		stateAdmin: [
			{
				id: "1",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						name: "Districts & Schools",
						icon: (
							<NavbarCardIcon
								elementIcon={IoMdSchool}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage District and Schools"]
										?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Manage District and Schools"]?.view ??
							true
								? true
								: false,
					},

					{
						id: 2,
						name: "Manage Mandates",
						icon: (
							<NavbarCardIcon
								elementIcon={HiOutlineClipboardList}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage Mandates"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),

						isDisplay:
							rolesAndPrevilegesObject?.["Manage Mandates"]?.view ?? true
								? true
								: false,
					},
					{
						id: 3,
						name: "Notifications",
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
					{
						id: 4,
						name: "Roles & Privileges",
						icon: (
							<NavbarCardIcon
								elementIcon={GiKeyLock}
								changeCursor={
									rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Roles & Privileges"]?.view ?? true
								? true
								: false,
					},
				],
			},
			{
				id: "2",
				head: "DATA MANAGEMENT",
				list: [
					{
						id: 1,
						name: "Import",
						icon: (
							<NavbarCardIcon
								elementIcon={MdUpload}
								changeCursor={
									rolesAndPrevilegesObject?.["Import"]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Import"]?.view ?? true ? true : false,
					},
				],
			},
		],

		partner: [
			{
				id: "2",
				head: "SYSTEM ADMINISTRATOR",
				list: [
					{
						id: 1,
						name: "Districts & Schools",
						icon: (
							<NavbarCardIcon
								elementIcon={IoMdSchool}
								changeCursor={
									rolesAndPrevilegesObject?.["Manage District and Schools"]
										?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Manage District and Schools"]?.view ??
							true
								? true
								: false,
					},
					{
						id: 2,
						name: "Notifications",
						icon: (
							<NavbarCardIcon
								elementIcon={MdNotifications}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ?? true
										? "pointer"
										: "not-allowed"
								}
							/>
						),
						isDisplay:
							rolesAndPrevilegesObject?.["Notification System Administration"]
								?.view ?? true
								? true
								: false,
					},
				],
			},
		],
	};

	const settingCardRoutingObj = {
		"My Account": () => {
			navigate(`/role/${userRole}/my-account`);
			setDisplayCard(false);

			dispatch(setActivatingID(1));
		},
		Help: () => {
			window.open("https://help.fitnessgram.net/", "_blank");
			setDisplayCard(false);
		},
		"Manage Classes": () => {
			if (selectedRole === "teacher" || selectedRole === "districtAdmin") {
				dispatch(setActivatingID(1));
			}

			setDisplayCard(false);

			navigate(`/role/${userRole}/manage-classes`);
		},
		Logout: () => {
			if (dataEntryRef?.current) {
				dispatch(setLogoutClicked(true));
				dispatch(setMessage(DATA_ENTRY_WAIT_MSG));
				return;
			}
			navigate("/");
			dispatch(logOut({ token }));
			resetStore();
		},
		"Manage Users": () => {
			if (
				!location.pathname.includes("manage-users") &&
				selectedRole !== "superAdmin"
			) {
				dispatch(
					setManageUser({
						userType: "",
						formTitle: "",
						previousPath: "",
						tab: "",
					}),
				);

				navigate(`/role/${userRole}/manage-users`);

				if (
					selectedRole === "teacher" ||
					selectedRole === "districtAdmin" ||
					selectedRole === "schoolAdmin"
				) {
					dispatch(setActivatingID(1));
				}

				return;
			}

			if (selectedRole === "superAdmin") {
				dispatch(setActivatingID(null));
				navigate(`/role/${userRole}/manageusers`);
			}

			setDisplayCard(false);
		},
		"District & Schools": () => {
			navigate(`/role/${userRole}/schools`);

			setDisplayCard(false);

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(2));
			}
		},
		"Districts & Schools": () => {
			navigate(`/role/${userRole}/Districts/DistrictLookup`);

			setDisplayCard(false);
			dispatch(setActivatingID(1));
		},
		Schools: () => {
			navigate(`/role/${userRole}/schools`);

			setDisplayCard(false);
		},
		Notifications: () => {
			navigate(`/role/${userRole}/Notifications`);
			setDisplayCard(false);

			if (selectedRole === "student" || selectedRole === "schoolAdmin") {
				dispatch(setActivatingID(null));
			}

			if (selectedRole === "teacher") {
				dispatch(setActivatingID(1));
			}

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(2));
			}
		},

		Import: () => {
			navigate(`/role/${userRole}/Import`);
			setDisplayCard(false);

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(1));
			}
		},
		"Roles & Privileges": () => {
			navigate(`/role/${userRole}/roles-privileges`);
			setDisplayCard(false);

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(2));
			}

			if (selectedRole === "superAdmin") {
				dispatch(setActivatingID(null));
			}
		},

		"End of Term Process": () => {
			navigate(`/role/${userRole}/EndOfTermProcess`);

			setDisplayCard(false);

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(2));
			}
		},

		"Manage Mandates": () => {
			navigate(`/role/${userRole}/manage-mandates`);
			setDisplayCard(false);

			if (selectedRole === "districtAdmin") {
				dispatch(setActivatingID(2));
			}
		},
	};

	const handleRouting = (item) => {
		if (searchData?.search?.length) {
			dispatch(setSearchData({ search: "", category: "All" }));
			dispatch(setGlobalSearchResults(null));
		}

		settingCardRoutingObj[item]();
	};

	useEffect(() => {
		dispatch(setPreviousValuesOfAddUser(null));
	}, []);

	useEffect(() => {
		duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
	}, [token]);

	return (
		<Box
			zIndex="1000"
			position="fixed"
			top="5rem"
			right={{ base: "1", md: "1.5" }}
			border="2px solid white"
		>
			<Slide direction="right" in={displayCard} style={{ zIndex: 10 }}>
				<Box
					position="fixed"
					top="3rem"
					right="-1.2rem"
					bottom="0"
					width="100%"
					display="flex"
					alignItems="flex-start"
					justifyContent="flex-end"
					padding="2rem"
				>
					<Card
						maxW="sm"
						h="auto"
						maxHeight="70vh"
						overflowY="auto"
						className="example"
					>
						<CardBody>
							<Stack divider={<StackDivider />} spacing="4">
								<Box>
									<Heading
										size={"xs"}
										textTransform="uppercase"
										color={"primary"}
									>
										{commonSettingsData.head}
									</Heading>

									<Stack direction="row" h="1px" p={1} mt="1">
										<Divider
											orientation="horizontal"
											border="1px solid #F4F4F4"
										/>
									</Stack>

									{commonSettingsData?.list?.map((listItem) => {
										if (listItem.isDisplay) {
											return (
												<>
													<Box
														display={"flex"}
														gap={"4"}
														alignItems={"center"}
														mt={3}
													>
														<Box
															cursor="pointer"
															onClick={() => handleRouting(listItem.name)}
														>
															<Heading8>{listItem.icon}</Heading8>
														</Box>

														<Box
															cursor="pointer"
															onClick={() => handleRouting(listItem.name)}
														>
															<Heading8>{listItem.name}</Heading8>
														</Box>
													</Box>

													<Stack direction="row" h="1px" p={1} mt="1">
														<Divider
															orientation="horizontal"
															border="1px solid #F4F4F4"
														/>
													</Stack>
												</>
											);
										}

										return (
											<>
												<Box
													display={"flex"}
													gap={"4"}
													alignItems={"center"}
													mt={3}
												>
													<Box cursor="not-allowed">
														<Heading8>{listItem.icon}</Heading8>
													</Box>

													<Box cursor="not-allowed">
														<Heading8>{listItem.name}</Heading8>
													</Box>
												</Box>

												<Stack direction="row" h="1px" p={1} mt="1">
													<Divider
														orientation="horizontal"
														border="1px solid #F4F4F4"
													/>
												</Stack>
											</>
										);
									})}
								</Box>
							</Stack>
							{settingsData[selectedRole]?.map((item) => {
								return (
									<Stack
										key={item.id}
										divider={<StackDivider />}
										spacing="4"
										overflow={"auto"}
									>
										<Box>
											<Heading
												size="xs"
												textTransform="uppercase"
												mt="4"
												mb="4"
												color={"primary"}
											>
												{item.head}
											</Heading>

											<Stack direction="row" h="1px" p={1} mt="1">
												<Divider
													orientation="horizontal"
													border="1px solid #F4F4F4"
												/>
											</Stack>

											{item?.list?.map((listItem) => {
												if (listItem?.isDisplay) {
													return (
														<>
															<Flex
																gap="2"
																key={listItem.id}
																alignItems={"center"}
																mt={3}
															>
																<Box
																	cursor="pointer"
																	onClick={() => handleRouting(listItem.name)}
																>
																	<Heading8>{listItem.icon}</Heading8>
																</Box>

																<Box
																	cursor="pointer"
																	onClick={() => handleRouting(listItem.name)}
																>
																	<Heading8>{listItem.name}</Heading8>
																</Box>
															</Flex>

															<Stack direction="row" h="1px" p={1} mt="1">
																<Divider
																	orientation="horizontal"
																	border="1px solid #F4F4F4"
																/>
															</Stack>
														</>
													);
												}

												return (
													<>
														<Flex
															gap="2"
															key={listItem.id}
															alignItems={"center"}
															mt={3}
														>
															<Box cursor="not-allowed">
																<Heading8>{listItem.icon}</Heading8>
															</Box>

															<Box cursor="not-allowed">
																<Heading8>{listItem.name}</Heading8>
															</Box>
														</Flex>

														<Stack direction="row" h="1px" p={1} mt="1">
															<Divider
																orientation="horizontal"
																border="1px solid #F4F4F4"
															/>
														</Stack>
													</>
												);
											})}
										</Box>
									</Stack>
								);
							})}
						</CardBody>
					</Card>
				</Box>
			</Slide>
		</Box>
	);
};
export default SettingsCard;
