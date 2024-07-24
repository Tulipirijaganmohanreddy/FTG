import {
	BellIcon,
	HamburgerIcon,
	QuestionIcon,
	SettingsIcon,
} from "@chakra-ui/icons";
import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Drawer,
	DrawerContent,
	Flex,
	HStack,
	Icon,
	IconButton,
	Image,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	Select,
	Spacer,
	Text,
	useColorModeValue,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { BiPowerOff } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiChevronDown } from "react-icons/fi";
import { HiUserCircle } from "react-icons/hi";
import { IoMdSettings } from "react-icons/io";
import { MdNotifications } from "react-icons/md";
import { RiArrowDropDownLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../Utilities/utils";
import logo from "../../assets/Images/Navbar/MainNavBarImages/FG-by-GreenLight-Fitness-07.31.23 (1).png";
import texasLogo from "../../assets/Images/Navbar/MainNavBarImages/TEA_logo.png";
import Heading8 from "../../components/FitnessComponents/FitnessTexts/Heading8";
import NavbarCardIcon from "../../components/FitnessComponents/FitnessTexts/NavbarCardIcon";
import Paragraph1 from "../../components/FitnessComponents/FitnessTexts/Paragraph1";
import ErrorResponse from "../../components/GlobalComponents/ErrorResponse";
import SearchComponent from "../../components/GlobalComponents/SearchComponent";
import SuccessResponse from "../../components/GlobalComponents/SuccessResponse";
import ChangePasswordDA from "../../features/ManageUsers/Components/ChangePasswordDA";
import { getUserRolesListForManageUsersApiCall } from "../../features/authentication/components/schoolAdmin/schoolAdminSlice";
import { getSchoolsList } from "../../features/teacher/teacherSlice";
import {
	changeRole,
	getGlobalSearchResults,
	getNotificationsCountAPICall,
	getUserPrivileges,
	logOut,
	setActivatingID,
	setDistrictCode,
	setDuplicateRole,
	setGlobalSearchResults,
	setOpenSideBar,
	setPreviousPath,
	setSearchData,
	setSelectedRole,
	setSelectedSuperAdminOption,
} from "../../store/slices/profileSlice";
import {
	getDistrictsForRoleChange,
	getSuperAdminChangeRole,
} from "../../store/slices/superAdminSlice/superAdminSlice";
import { resetStore } from "../../store/store";
import SettingsCard from "./SettingsCard";
import SidebarContent from "./SidebarContent";

const TopNavbar = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const location = useLocation();
	const globalSearchInputRef = useRef(null);
	const tabGlobalSearchInputRef = useRef(null);
	const mobileGlobalSearchInputRef = useRef(null);

	const code = useSelector((state) => state?.profile?.code);
	const code2 = useSelector((state) => state?.profile?.code2);

	const duplicateRole = useSelector((state) => state.profile.duplicateRole);
	const selectedSuperAdminOption = useSelector(
		(state) => state.profile.selectedSuperAdminOption,
	);

	const loggedInUserDetails = useSelector(
		(state) => state?.profile?.loggedInUserDetails,
	);

	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const role = useSelector((state) => state.profile.userRole);

	const userData = useSelector(
		(state) => state?.profile?.loggedInUserDetails?.first_name,
	);

	const token = useSelector((state) => state.profile.token);
	const userId = useSelector((state) => state.profile.userId);

	const openSideBar = useSelector((state) => state?.profile?.openSideBar);

	const districts = useSelector(
		(state) => state?.superAdmin?.districtsForChangeRole,
	);

	const searchData = useSelector((state) => state.profile.searchData);

	const contactsKey = useSelector((state) => state.profile.contactsKey);

	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
	);

	const inputref = useRef(null);
	const inputrefMobile = useRef(null);
	const selectedRoleRef = useRef();
	const tokenRef = useRef(token);

	const [deviceWidth, setDeviceWidth] = useState(window?.innerWidth);

	const notificationsCount = useSelector(
		(state) => state?.profile?.notificationsCount,
	);

	const defaultSuperAdminOptions = [
		{
			label: "Super Administrator",
			value: "superAdmin",
		},
	];

	const [displayCard, setDisplayCard] = useState(false);

	const [superAdminOptions, setSuperAdminOptions] = useState(
		defaultSuperAdminOptions,
	);

	const [isSelectActive, setIsSelectActive] = useState(false);

	const [isSelectMobileActive, setIsSelectMobileActive] = useState(false);

	const role_obj = {
		superAdmin: "Super Admin",
		helpDesk: "Help Desk",
		student: "Student",
		teacher: "Teacher",
		parent: "Parent",
		schoolAdmin: "School Administrator",
		districtAdmin: "District Administrator",
		stateAdmin: "State Administrator",
		partner: "Partner",
	};

	const searchDistrictsForRoleChange = debounce((text) => {
		text?.length != 1 &&
			dispatch(getDistrictsForRoleChange({ token, body: { search: text } }));
	}, 500);

	const handleDistrictCode = (e) => {
		dispatch(setPreviousPath(null));

		if (e.value === "superAdmin") {
			dispatch(setDistrictCode(null));
			dispatch(setDuplicateRole(""));
			const body = { newRole: selectedRole };
			dispatch(changeRole({ token, body }));
		} else {
			dispatch(setDistrictCode(e.value));
			dispatch(setDuplicateRole("districtAdmin"));
			const body = { newRole: selectedRole, districtCode: e.value };
			dispatch(getSuperAdminChangeRole({ token, body }));
		}
		dispatch(setSelectedSuperAdminOption(e));
		setIsSelectActive(false);

		setIsSelectMobileActive(false);

		if (inputref?.current) {
			inputref.current.value = "";
		}

		if (inputrefMobile?.current) {
			inputrefMobile.current.value = "";
		}
	};

	const handleChange = (event) => {
		const { value, ...rest } = event.target;
		dispatch(setSelectedRole(value));
		if (!["student", "stateAdmin", "partner"].includes(value)) {
			const newRole = value;
			let body = { newRole };
			dispatch(changeRole({ token, body }));
		}
	};

	const handleClickNavCard = (val) => {
		setDisplayCard(val);
	};

	const debouncedSearch = debounce((searchText) => {
		dispatch(
			setSearchData({
				category: searchData?.category,
				search: searchText,
			}),
		);
		if (searchText?.length != 1 && selectedRole !== "stateAdmin") {
			dispatch(
				getGlobalSearchResults({
					token,
					data: { category: searchData?.category, search: searchText },
				}),
			);
		} else {
			dispatch(setGlobalSearchResults(null));
		}
	}, 500);

	const clearLogout = () => {
		navigate("/");
		dispatch(logOut({ token }));
		resetStore();
	};

	const notificationsButtonclicked = () => {
		if (searchData?.search?.length) {
			dispatch(setSearchData({ search: "", category: "All" }));
			dispatch(setGlobalSearchResults(null));
		}
		if (selectedRole === "student" || selectedRole === "schoolAdmin") {
			dispatch(setActivatingID(null));
		}

		if (selectedRole === "teacher") {
			dispatch(setActivatingID(1));
		}

		if (selectedRole === "superAdmin" && !duplicateRole) {
			dispatch(setActivatingID(4));
		}

		if (selectedRole === "districtAdmin" || duplicateRole) {
			dispatch(setActivatingID(2));
		}

		navigate(`/role/${selectedRole}/Notifications`);
	};

	const helpClicked = () => {
		window.open("https://help.fitnessgram.net/", "_blank");
		handleClickNavCard(false);
	};

	const onResize = () => {
		const width = window.innerWidth;
		const height = window.innerHeight;

		setDeviceWidth(width);
	};

	useEffect(() => {
		const handleGlobalThings = (event) => {
			// const url = window.location.href;

			var path = event.composedPath ? event.composedPath() : event.path;

			if (
				path[1].id !== "settingsIconElement" &&
				path[2].id !== "settingsIconElement"
			) {
				handleClickNavCard(false);
			}

			if (
				path[0].id === "mobileSettingsText" ||
				path[0].id === "mobileSettingsIcon" ||
				path[1].id === "mobileSettingsIcon" ||
				path[2].id === "mobileSettingsText" ||
				path[2].id === "mobileSettingsIcon"
			) {
				handleClickNavCard(true);
			}
		};

		document.body.addEventListener("click", handleGlobalThings);

		window.addEventListener("resize", onResize);

		return () => {
			document.body.removeEventListener("click", handleGlobalThings);

			window.removeEventListener("resize", onResize);
		};
	}, []);

	useEffect(() => {
		if (tokenRef.current !== token) {
			if (duplicateRole) {
				navigate("/role/superAdmin/data-management");
				dispatch(setActivatingID(1));
			} else {
				navigate(`/role/${selectedRole}`);

				dispatch(setActivatingID(1));
			}
		}
		if (!["stateAdmin", "partner"].includes(selectedRole)) {
			//user previlages and getSchools apis not required for the said roles
			dispatch(getUserPrivileges({ token }));
			dispatch(getSchoolsList({ userId, token }));
		}

		dispatch(getNotificationsCountAPICall({ token }));
		!["student", "stateAdmin", "partner"].includes(selectedRole) &&
			dispatch(getUserRolesListForManageUsersApiCall({ token }));
		tokenRef.current = token;
		// startTimer();
	}, [token]);

	useEffect(() => {
		if (districts?.length) {
			let arr = districts.map((district) => ({
				label: `${district?.state}-${district?.district_sso_id}-${district?.district_name}`,
				value: district.district_sso_id,
			}));

			setSuperAdminOptions((prevState) => [
				...defaultSuperAdminOptions,
				...arr,
			]);
		} else {
			setSuperAdminOptions(defaultSuperAdminOptions);
		}
		inputref?.current?.focus();
		inputrefMobile?.current?.focus();
	}, [districts]);

	useEffect(() => {
		if (selectedRole === "superAdmin") {
			dispatch(getDistrictsForRoleChange({ token, body: { search: "" } }));
		}
	}, [selectedRole, selectedSuperAdminOption]);

	const mobileNavbar = () => {
		useEffect(() => {
			if (!searchData?.search && mobileGlobalSearchInputRef.current) {
				mobileGlobalSearchInputRef.current.value = "";
			}
		}, [searchData?.search]);
		return (
			<Flex flexDirection={"column"} w={"100%"}>
				<Flex
					justifyContent="space-between"
					gap="1"
					alignItems="center"
					bg={useColorModeValue("white", "gray.900")}
					borderBottomColor={useColorModeValue("gray.200", "gray.700")}
				>
					<Box ml="1">
						<IconButton
							display={{ base: "flex", md: "flex", lg: "none" }}
							onClick={onOpen}
							aria-label="open menu"
							icon={<HamburgerIcon boxSize={5} />}
						/>
					</Box>

					{location.pathname !== "/role/global-search" ?? true ? (
						<>
							<Box mt="1" w="auto" minW="8rem" maxW="14rem" h="3rem">
								<Image
									src={logo}
									objectFit="contain"
									w="100%"
									h="100%"
									minWidth="100%"
									maxWidth="100%"
									aspect="auto"
									alt="FitnessGram"
								/>
							</Box>

							{!location.pathname.includes("SmartCoach") &&
							(loggedInUserDetails?.texas_district_admin ||
								loggedInUserDetails?.texas_admin) ? (
								<Box w="auto" maxW="8rem" mt="" h="2.6rem">
									<Image
										w="100%"
										h="100%"
										objectFit="contain"
										aspect="auto"
										src={texasLogo}
										alt="texas"
									/>
								</Box>
							) : null}
						</>
					) : null}

					<HStack pr="1.5" gap="3">
						{location.pathname === "/role/global-search" ?? true ? (
							// <SearchComponent
							// 	ref={mobileGlobalSearchInputRef}
							// 	id="globalSearch"
							// 	name="search"
							// 	value={searchData?.search}
							// 	onFocus={() => {
							// 		if (location.pathname !== "/role/global-search") {
							// 			navigate(`/role/global-search`);
							// 		}
							// 	}}
							// 	onChange={(e) => debouncedSearch(e.target.value)}
							// />
							<div></div>
						) : (
							<Box
								onClick={() => {
									navigate("/role/global-search");
								}}
							>
								<NavbarCardIcon elementIcon={BsSearch} />
							</Box>
						)}

						{/* <Spacer /> */}

						<Menu p="0">
							<MenuButton
								display={{ sm: "flex", md: "flex", lg: "none" }}
								p="0"
								transition="all 0.3s"
								_focus={{ boxShadow: "none" }}
								position="relative"
							>
								<FiChevronDown />
							</MenuButton>
							<MenuList
								mt="1.3rem"
								position="absolute"
								right="-5"
								minW="calc(50% + 5.5rem)"
								border="1px solid #ffffff"
								boxShadow="2xl"
							>
								<MenuItem>
									<Box onClick={helpClicked}>
										<NavbarCardIcon elementIcon={QuestionIcon} />
									</Box>

									<Box cursor="pointer" onClick={helpClicked} ml="4">
										<Heading8 increaseTextSize="navMenuItemText">Help</Heading8>
									</Box>
								</MenuItem>

								<MenuItem>
									<Box
										onClick={() => {
											if (
												rolesAndPrevilegesObject?.[
													"Notification System Administration"
												]?.view ??
												true
											) {
												notificationsButtonclicked();
											}
										}}
									>
										<NavbarCardIcon elementIcon={MdNotifications} />
									</Box>

									<Box
										cursor="pointer"
										onClick={() => {
											if (
												rolesAndPrevilegesObject?.[
													"Notification System Administration"
												]?.view ??
												true
											) {
												notificationsButtonclicked();
											}
										}}
										ml="4"
									>
										<Heading8 increaseTextSize="navMenuItemText">
											Notifications
										</Heading8>
									</Box>
								</MenuItem>

								<MenuItem>
									<Box
										id="mobileSettingsIcon"
										onClick={() => handleClickNavCard(!displayCard)}
									>
										<NavbarCardIcon elementIcon={SettingsIcon} />
									</Box>

									<Box
										cursor="pointer"
										ml="4"
										id="mobileSettingsText"
										onClick={() => handleClickNavCard(!displayCard)}
									>
										<Heading8 increaseTextSize="navMenuItemText">
											Settings
										</Heading8>
									</Box>
								</MenuItem>

								<Box
									display="flex"
									justifyContent="center"
									h="0.5px"
									p="1"
									alignItems="center"
								>
									<Divider orientation="horizontal" border="1px solid gray-3" />
								</Box>

								<MenuItem>
									<Box onClick={clearLogout}>
										<NavbarCardIcon elementIcon={BiPowerOff} />
									</Box>

									<Box cursor="pointer" pl="4" onClick={clearLogout}>
										<Heading8 increaseTextSize="navMenuItemText">
											Log out
										</Heading8>
									</Box>
								</MenuItem>
							</MenuList>
						</Menu>
					</HStack>
				</Flex>
				{location.pathname !== "/role/global-search" ? (
					<Box
						mt="0.5"
						// pl="1"
						p="2"
						bg="primary"
						borderRadius="sm"
						color="white"
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						gap="2"
					>
						<Paragraph1
							decreaseMarginTop="0"
							decreaseMarginBottom="0"
							changeTextColor="white"
						>
							Welcome {userData}
						</Paragraph1>

						<Box>
							{selectedRole !== "superAdmin" ? (
								<Select
									value={selectedRole}
									onChange={handleChange}
									bg="white"
									color="#59bEE3"
									rounded="full"
									size="sm"
									fontSize="xs"
									// mt='1'
									// mr='2'
									textTransform="capitalize"
								>
									{role?.map((role, index) => (
										<option
											id={role + index}
											value={role}
											style={{ color: "black" }}
										>
											{role_obj[role]}
										</option>
									))}
								</Select>
							) : (
								<Box position="relative" w="11rem">
									<Menu
										isOpen={isSelectMobileActive}
										onClose={() => setIsSelectMobileActive(false)}
									>
										<ButtonGroup w="100%">
											<MenuButton
												as={Button}
												size="sm"
												bg="white"
												color="#59bEE3"
												rounded="full"
												// inlineSize='24rem'
												px="2"
												textAlign="center"
												fontSize="xs"
												w="100%"
												variant="outline"
												onClick={() => setIsSelectMobileActive(true)}
												rightIcon={
													<Icon as={RiArrowDropDownLine} boxSize={5} />
												}
												overflow="hidden"
												textOverflow="ellipsis"
												whiteSpace="nowrap"
											>
												{selectedSuperAdminOption?.label?.length > 20
													? selectedSuperAdminOption?.label?.slice(0, 18) +
													  "..."
													: selectedSuperAdminOption?.label}
											</MenuButton>
										</ButtonGroup>
										<MenuList
											w={{ base: "15rem", xl: "20rem" }}
											boxShadow="dark-lg"
											height="auto"
											maxHeight="45vh"
											overflowY="auto"
										>
											<SearchComponent
												id="changeRoleSearchBar"
												name="searchTerm"
												mb="2"
												display={{ base: "flex", md: "none", lg: "none " }}
												onChange={(e) => {
													searchDistrictsForRoleChange(e.target.value);
												}}
												ref={inputrefMobile}
												color="black"
											/>

											{superAdminOptions.length > 0 ? (
												superAdminOptions.map((option) => (
													<MenuItem
														key={option.value}
														onClick={() => handleDistrictCode(option)}
														bg={
															selectedSuperAdminOption?.value === option?.value
																? "primary"
																: "transparent"
														}
														color={
															selectedSuperAdminOption?.value === option?.value
																? "white"
																: "black"
														}
													>
														{option?.label}
													</MenuItem>
												))
											) : (
												<Text color="gray.500" p={2}>
													No options found
												</Text>
											)}
										</MenuList>
									</Menu>
								</Box>
							)}
						</Box>
					</Box>
				) : null}
			</Flex>
		);
	};

	const TabNavbar = () => {
		useEffect(() => {
			if (!searchData?.search && tabGlobalSearchInputRef.current) {
				tabGlobalSearchInputRef.current.value = "";
			}
		}, [searchData?.search]);
		return (
			<>
				<Flex
					h="4.5rem"
					gap="0.5"
					w="100%"
					alignItems="center"
					bg={useColorModeValue("white", "gray.900")}
					borderBottomColor={useColorModeValue("gray.200", "gray.700")}
				>
					<Box pl="2" onClick={onOpen}>
						<HamburgerIcon boxSize={25} />

						{/* <IconButton
              onClick={onOpen}
              aria-label="open menu"
              icon={<HamburgerIcon boxSize={10} />}
            /> */}
					</Box>

					{location.pathname !== "/role/global-search" ?? true ? (
						<>
							<HStack>
								<Box w="auto" minW="11rem" maxW="15rem" h="3rem">
									<Image
										src={logo}
										objectFit="contain"
										w="100%"
										h="100%"
										minWidth="100%"
										maxWidth="100%"
										aspect="auto"
										alt="FitnessGram"
									/>
								</Box>

								<Box w="auto" minW="8.2rem" maxW="15rem">
									<Text
										color="black"
										mt="1"
										// mx={{base:"0", xl:"1"}}
										textStyle={"textHead"}
										whiteSpace="wrap"
										textTransform="capitalize"
									>
										Welcome {userData}
									</Text>
								</Box>

								{selectedRole !== "superAdmin" ? (
									<Select
										value={selectedRole}
										onChange={handleChange}
										bg="primary"
										borderColor="primary"
										color="white"
										rounded="full"
										size="sm"
										mt="1"
										mr="2"
										textTransform="capitalize"
									>
										{role?.map((role, index) => (
											<option
												id={role + index}
												value={role}
												style={{ color: "black" }}
											>
												{role_obj[role]}
											</option>
										))}
									</Select>
								) : (
									<Box position="relative" w="auto" minW="11.8rem" maxW="13rem">
										<Menu
											isOpen={isSelectActive}
											onClose={() => setIsSelectActive(false)}
											maxW="100%"
										>
											<ButtonGroup w="100%">
												<MenuButton
													as={Button}
													size="sm"
													bg="primary"
													color="white"
													rounded="full"
													// inlineSize='24rem'
													w="100%"
													variant="outline"
													onClick={() => setIsSelectActive(true)}
													rightIcon={
														<Icon as={RiArrowDropDownLine} boxSize={7} />
													}
													overflow="hidden"
													textOverflow="ellipsis"
													whiteSpace="nowrap"
												>
													{selectedSuperAdminOption?.label?.length > 20
														? selectedSuperAdminOption?.label?.slice(0, 15) +
														  "..."
														: selectedSuperAdminOption?.label}
												</MenuButton>
											</ButtonGroup>
											<MenuList
												// inlineSize='auto'
												w="13rem"
												boxShadow="dark-lg"
												height="auto"
												maxHeight="45vh"
												overflowY="auto"
											>
												<SearchComponent
													id="changeRoleSearchBar"
													mb="2"
													name="searchTerm"
													onChange={(e) => {
														searchDistrictsForRoleChange(e.target.value);
													}}
													ref={inputref}
												/>

												{superAdminOptions?.length > 0 ? (
													superAdminOptions?.map((option) => (
														<MenuItem
															key={option.value}
															onClick={() => handleDistrictCode(option)}
															bg={
																selectedSuperAdminOption?.value ===
																option?.value
																	? "primary"
																	: "transparent"
															}
															color={
																selectedSuperAdminOption?.value ===
																option?.value
																	? "white"
																	: "black"
															}
														>
															{option?.label}
														</MenuItem>
													))
												) : (
													<Text color="gray.500" p={2}>
														No options found
													</Text>
												)}
											</MenuList>
										</Menu>
									</Box>
								)}
							</HStack>

							<Spacer />

							{!location.pathname.includes("SmartCoach") &&
							(loggedInUserDetails?.texas_district_admin ||
								loggedInUserDetails?.texas_admin) ? (
								<Box w="auto" minW="5rem" maxW="8rem" mt="" h="3rem">
									<Image
										w="100%"
										h="100%"
										maxWidth="100%"
										objectFit="contain"
										aspect="auto"
										src={texasLogo}
										alt="texas"
									/>
								</Box>
							) : null}

							<Spacer />
						</>
					) : null}

					<HStack
						pr="1"
						gap={
							loggedInUserDetails?.texas_district_admin ||
							loggedInUserDetails?.texas_admin
								? "2"
								: "3"
						}
						w={
							location.pathname === "/role/global-search" ?? true
								? "calc(100% - 3rem)"
								: "auto"
						}
					>
						{location.pathname === "/role/global-search" ?? true ? (
							// <SearchComponent
							// 	id="globalSearch"
							// 	name="search"
							// 	ref={tabGlobalSearchInputRef}
							// 	// value={searchData?.search}
							// 	onFocus={() => {
							// 		if (location.pathname !== "/role/global-search") {
							// 			navigate(`/role/global-search`);
							// 		}
							// 	}}
							// 	onChange={(e) => debouncedSearch(e.target.value)}
							// />
							<div></div>
						) : // <Box
						// 	onClick={() => {
						// 		navigate("/role/global-search");
						// 	}}
						// >
						// 	<NavbarCardIcon elementIcon={BsSearch} />
						// </Box>
						null}

						<Box
							onClick={() => {
								if (
									rolesAndPrevilegesObject?.["My Personal Information"]?.edit ??
									true
								) {
									if (searchData?.search?.length) {
										dispatch(setSearchData({ search: "", category: "All" }));
										dispatch(setGlobalSearchResults(null));
									}
									dispatch(setActivatingID(1));

									navigate(`/role/${selectedRole}/my-account`);
								}
							}}
							marginRight="auto"
						>
							<NavbarCardIcon
								elementIcon={HiUserCircle}
								changeCursor={
									rolesAndPrevilegesObject?.["My Personal Information"]
										?.view === false
										? "not-allowed"
										: "pointer"
								}
							/>
						</Box>

						<Box
							position="relative"
							onClick={() => {
								if (
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ??
									true
								) {
									notificationsButtonclicked();
								}
							}}
							marginRight="auto"
							pb="2"
						>
							<NavbarCardIcon
								elementIcon={BellIcon}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view === false
										? "not-allowed"
										: "pointer"
								}
							/>

							{notificationsCount?.count > 0 && (
								<Box
									position="absolute"
									cursor="pointer"
									top="-1.5"
									left="2"
									width="90%"
									textAlign="center"
									bg="red"
									color="white"
									rounded="lg"
									pt="0.5"
									onClick={() => {
										if (
											rolesAndPrevilegesObject?.[
												"Notification System Administration"
											]?.view ??
											true
										) {
											notificationsButtonclicked();
										}
									}}
								>
									<Text fontSize="9px">{notificationsCount?.count}</Text>
								</Box>
							)}
						</Box>

						<Box
							id="settingsIconElement"
							onClick={() => {
								handleClickNavCard(!displayCard);
							}}
							marginRight="auto"
						>
							<NavbarCardIcon elementIcon={IoMdSettings} />
						</Box>
					</HStack>
				</Flex>
			</>
		);
	};

	const lapTopNavbar = () => {
		useEffect(() => {
			if (!searchData?.search && globalSearchInputRef.current) {
				globalSearchInputRef.current.value = "";
			}
		}, [searchData?.search]);
		return (
			<Box display="flex" h="4.5rem" w="100%">
				<Box
					w="5rem"
					bg="white"
					display="flex"
					justifyContent={"center"}
					alignItems={"center"}
					cursor="pointer"
					onClick={() => {
						dispatch(setOpenSideBar(!openSideBar));
					}}
				>
					<HamburgerIcon boxSize={25} />
				</Box>

				<Flex
					h="100%"
					w="100%"
					alignItems="center"
					bg={useColorModeValue("white", "gray.900")}
					borderBottomColor={useColorModeValue("gray.200", "gray.700")}
				>
					{location.pathname !== "/role/global-search" ?? true ? (
						<>
							<Flex gap="3" px="3" alignItems="center">
								<Box w="auto" minW="11rem" maxW="26rem" h="3rem">
									<Image
										src={logo}
										objectFit="contain"
										w="100%"
										h="100%"
										minWidth="100%"
										maxWidth="100%"
										aspect="auto"
										alt="FitnessGram"
									/>
								</Box>

								<Box w="auto" minW="8.7rem" maxW="15rem">
									<Text
										color="black"
										mt="1"
										// mx={{base:"0", xl:"1"}}
										textStyle={"textHead"}
										whiteSpace="wrap"
										textTransform="capitalize"
									>
										Welcome {userData}
									</Text>
								</Box>

								{selectedRole !== "superAdmin" ? (
									<Select
										value={selectedRole}
										onChange={handleChange}
										bg="primary"
										borderColor="primary"
										color="white"
										rounded="full"
										// size="sm"
										w="auto"
										minW={{ lg: "13.5rem", "2xl": "15rem" }}
										maxW={{ lg: "13.5rem", "2xl": "15rem" }}
										mt="1"
										mr="2"
										h="8"
										textTransform="capitalize"
									>
										{role?.map((role, index) => (
											<option
												id={role + index}
												value={role}
												style={{ color: "black" }}
											>
												{role_obj[role]}
											</option>
										))}
									</Select>
								) : (
									<Box
										position="relative"
										w="auto"
										minW={{ lg: "13.5rem", "2xl": "15rem" }}
										maxW={{ lg: "13.5rem", "2xl": "15rem" }}
									>
										<Menu
											isOpen={isSelectActive}
											onClose={() => setIsSelectActive(false)}
											maxW="100%"
										>
											<ButtonGroup w="100%">
												<MenuButton
													as={Button}
													size="sm"
													bg="primary"
													color="white"
													rounded="full"
													// inlineSize='24rem'
													w="100%"
													px="1"
													variant="outline"
													onClick={() => setIsSelectActive(true)}
													rightIcon={
														<Icon as={RiArrowDropDownLine} boxSize={7} />
													}
													overflow="hidden"
													textOverflow="ellipsis"
													whiteSpace="nowrap"
												>
													{selectedSuperAdminOption?.label?.length > 20
														? selectedSuperAdminOption?.label?.slice(0, 20) +
														  "..."
														: selectedSuperAdminOption?.label}
												</MenuButton>
											</ButtonGroup>
											<MenuList
												// inlineSize='auto'
												w={{ lg: "15rem", "2xl": "22rem" }}
												boxShadow="dark-lg"
												height="auto"
												maxHeight="45vh"
												overflowY="auto"
											>
												<SearchComponent
													id="changeRoleSearchBar"
													mb="2"
													name="searchTerm"
													onChange={(e) => {
														searchDistrictsForRoleChange(e.target.value);
													}}
													ref={inputref}
												/>

												{superAdminOptions?.length > 0 ? (
													superAdminOptions?.map((option) => (
														<MenuItem
															key={option.value}
															onClick={() => handleDistrictCode(option)}
															bg={
																selectedSuperAdminOption?.value ===
																option?.value
																	? "primary"
																	: "transparent"
															}
															color={
																selectedSuperAdminOption?.value ===
																option?.value
																	? "white"
																	: "black"
															}
														>
															{option?.label}
														</MenuItem>
													))
												) : (
													<Text color="gray.500" p={2}>
														No options found
													</Text>
												)}
											</MenuList>
										</Menu>
									</Box>
								)}

								<Spacer />
							</Flex>

							<Spacer />

							{!location.pathname.includes("SmartCoach") &&
							(loggedInUserDetails?.texas_district_admin ||
								loggedInUserDetails?.texas_admin) ? (
								<Box w="auto" minW="5rem" maxW="15rem" mt="" h="3rem">
									<Image
										w="100%"
										h="100%"
										maxWidth="100%"
										objectFit="contain"
										aspect="auto"
										src={texasLogo}
										alt="texas"
									/>
								</Box>
							) : null}

							<Spacer />
						</>
					) : null}

					<HStack
						mr="5"
						gap={
							loggedInUserDetails?.texas_district_admin ||
							loggedInUserDetails?.texas_admin
								? "2"
								: "3"
						}
						w={
							location.pathname === "/role/global-search" ?? true
								? "calc(100% - 3rem)"
								: "auto"
						}
					>
						{/* <SearchComponent
							id="globalSearch"
							name="search"
							// value={searchData?.search}
							ref={globalSearchInputRef}
							onFocus={() => {
								if (location.pathname !== "/role/global-search") {
									navigate(`/role/global-search`);
								}
							}}
							onChange={(e) => debouncedSearch(e.target.value)}
						/> */}

						<Box
							display={"flex"}
							alignItems={"center"}
							onClick={() => {
								if (
									rolesAndPrevilegesObject?.["My Personal Information"]?.edit ??
									true
								) {
									if (searchData?.search?.length) {
										dispatch(setSearchData({ search: "", category: "All" }));
										dispatch(setGlobalSearchResults(null));
									}
									dispatch(setActivatingID(1));

									navigate(`/role/${selectedRole}/my-account`);
								}
							}}
							marginRight="auto"
						>
							<NavbarCardIcon
								elementIcon={HiUserCircle}
								changeCursor={
									rolesAndPrevilegesObject?.["My Personal Information"]
										?.view === false
										? "not-allowed"
										: "pointer"
								}
							/>
						</Box>

						<Box
							position="relative"
							display={"flex"}
							alignItems={"center"}
							onClick={() => {
								if (
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view ??
									true
								) {
									notificationsButtonclicked();
								}
							}}
							marginRight="auto"
						>
							<NavbarCardIcon
								elementIcon={BellIcon}
								changeCursor={
									rolesAndPrevilegesObject?.[
										"Notification System Administration"
									]?.view === false
										? "not-allowed"
										: "pointer"
								}
							/>

							{notificationsCount?.count > 0 && (
								<Box
									position="absolute"
									cursor="pointer"
									top="-1.5"
									left="2"
									width="90%"
									textAlign="center"
									bg="red"
									color="white"
									rounded="lg"
									pt="0.5"
									onClick={() => {
										if (
											rolesAndPrevilegesObject?.[
												"Notification System Administration"
											]?.view ??
											true
										) {
											notificationsButtonclicked();
										}
									}}
								>
									<Text fontSize="9px">{notificationsCount?.count}</Text>
								</Box>
							)}
						</Box>

						<Box
							display={"flex"}
							alignItems={"center"}
							id="settingsIconElement"
							onClick={() => {
								handleClickNavCard(!displayCard);
							}}
							marginRight="auto"
						>
							<NavbarCardIcon elementIcon={IoMdSettings} />
						</Box>
					</HStack>
				</Flex>
			</Box>
		);
	};

	return (
		<Box
			bg={useColorModeValue("gray.100", "gray.900")}
			h="auto"
			display="flex"
			justifyContent="center"
			alignItems="center"
			position="fixed"
			w="100vw"
			zIndex="1"
		>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				// size="full"
				// w="20%"
				w={{ base: "80%", md: "25rem" }}
			>
				<DrawerContent>
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			{/* mobilenav */}
			{/* <MobileTopNavbar onOpen={onOpen} /> */}

			{deviceWidth <= 767 ? mobileNavbar() : null}

			{deviceWidth >= 768 && deviceWidth <= 991 ? TabNavbar() : null}

			{deviceWidth >= 992 ? lapTopNavbar() : null}

			{displayCard ? (
				<SettingsCard
					handleClickNavCard={handleClickNavCard}
					setDisplayCard={setDisplayCard}
					displayCard={displayCard}
				/>
			) : null}
			{contactsKey && <ChangePasswordDA />}
			{(code && code === 200) || code === 201 || code2 === 200 ? (
				<SuccessResponse />
			) : (
				<ErrorResponse />
			)}
		</Box>
	);
};
export default TopNavbar;
