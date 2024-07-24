import {
	Box,
	Center,
	Checkbox,
	Divider,
	Flex,
	Grid,
	GridItem,
	HStack,
	Spacer,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ChangePasswordPopUp from "../Components/ChangePasswordPopUp";

import { useEffect } from "react";
import { BiPowerOff } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { getUpdatedUser, logOut } from "../../../store/slices/profileSlice";
import { resetStore } from "../../../store/store";
import {
	getEditUserProfileApiCall,
	getUpdateImportsEmailStatus,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import ChangeUserNamePopUp from "../Components/ChangeUserNamePopUp";
import { MyAccount } from "../Config";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const Myaccount = () => {
	const { title, inputFields, footer, subHead, fields, btnText1, btnText2 } =
		MyAccount;

	const dispatch = useDispatch();

	const [editClicked, setEditClicked] = useState(true);

	const token = useSelector((state) => state?.profile?.token);

	const navigate = useNavigate();

	const userId = useSelector((state) => state.profile.userId);

	const code = useSelector((state) => state?.profile?.code);

	const selectedRole = useSelector((state) => state?.profile?.selectedRole);

	const loading = useSelector((state) => state.profile.upLoading);

	const rolesAndPrevilegesObject = useSelector(
		(state) => state?.profile?.rolesAndPrevilegesObject,
	);
	const [user, setUser] = useState(null);

	const loggedInUserDetails = useSelector(
		(state) => state?.profile?.loggedInUserDetails,
	);

	const [userDetails, setUserDetails] = useState({});
	const [show, setShow] = useState(false);

	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();

		if (name == "first_name") {
			setUserDetails({
				...userDetails,
				[name]: value,
			});
		} else {
			setUserDetails({
				...userDetails,
				[name]: trimmedValue,
			});
		}

		const errorsObj = validateFormData({
			[name]: trimmedValue,
		});

		if (Object.keys(errorsObj).length) {
			setErrors((prevState) => ({
				...prevState,
				...errorsObj,
			}));
		} else {
			let obj = { ...errors };
			delete obj[name];
			setErrors({ ...obj });
		}
	};

	const handleImportEmail = (e) => {
		const { name, checked } = e.target;
		setUserDetails({
			...userDetails,
			[name]: checked,
		});
		dispatch(
			getUpdateImportsEmailStatus({
				token,
				body: { import_email_status: checked },
			}),
		);
	};
	const handleBlur = (e) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();
		setUserDetails({
			...userDetails,
			[name]: trimmedValue,
		});
	};
	const handleLogout = () => {
		navigate("/");
		dispatch(logOut({ token }));
		resetStore();
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		const { import_email_status, ...payload } = userDetails;

		const errorsObj = validateFormData(payload);

		if (Object.keys(errorsObj)?.length > 0) {
			setErrors(errorsObj);
		} else {
			setErrors({});

			const userID = loggedInUserDetails?.uuid;

			dispatch(
				getEditUserProfileApiCall({ userID, finalBody: userDetails, token }),
			);
		}
	};
	useEffect(() => {
		if (code === 200) {
			setEditClicked(true);
		}
	}, [code]);

	useEffect(() => {
		dispatch(getUpdatedUser({ id: userId, token }));
	}, []);

	useEffect(() => {
		if (
			loggedInUserDetails?.district_admin_role ||
			loggedInUserDetails?.super_admin_role
		) {
			setUserDetails({
				first_name: loggedInUserDetails?.first_name,
				middle_name: loggedInUserDetails?.middle_initial,
				last_name: loggedInUserDetails?.last_name,
				email: loggedInUserDetails?.email,
				import_email_status: loggedInUserDetails?.import_email_status,
			});
		} else {
			setUserDetails({
				first_name: loggedInUserDetails?.first_name,
				middle_name: loggedInUserDetails?.middle_initial,
				last_name: loggedInUserDetails?.last_name,
				email: loggedInUserDetails?.email,
			});
		}

		setUser({
			user_name: loggedInUserDetails?.user_name,
		});
	}, [loggedInUserDetails]);

	return (
		<Box>
			<HStack display={"flex"}>
				<Text mb="5" textStyle={"text"}>
					{title}
				</Text>
				<Spacer />
				<Box
					rounded="lg"
					textAlign={"center"}
					display={{
						md: "none",
						base: "flex",
						lg: "none",
					}}
				>
					<Flex mt="-21px" role="button">
						<Text textStyle={"h4"} textDecoration={"underline"}>
							{footer}
						</Text>
						<BiPowerOff onClick={() => handleLogout()} />
					</Flex>
				</Box>
			</HStack>

			{rolesAndPrevilegesObject?.["My Personal Information"]?.edit ?? true ? (
				<HStack
					display={{ base: "flex flex-col", md: "flex", lg: "flex" }}
					direction="row"
					justifyContent="flex-start"
					gap="2"
				>
					<Box>
						<Inputs
							id={fields[0].Id}
							label={fields[0].label}
							value={user?.user_name}
							isDisabled
						/>

						<ChangeUserNamePopUp />
					</Box>

					<Box>
						<Inputs
							id={fields[1].Id}
							label={fields[1].label}
							isDisabled
							type={show ? "text" : "password"}
							value="***************"
						/>

						<ChangePasswordPopUp />
					</Box>
				</HStack>
			) : (
				<HStack
					display={{ base: "flex flex-col", md: "flex", lg: "flex" }}
					direction="row"
					justifyContent="flex-start"
					gap="2"
				>
					<Box>
						<Inputs label={"UserName"} value={user?.user_name} isDisabled />

						<ChangeUserNamePopUp />
					</Box>

					<Box>
						<Inputs
							label={"Password"}
							isDisabled
							type={show ? "text" : "password"}
							value="***************"
						/>

						<ChangePasswordPopUp />
					</Box>
				</HStack>
			)}

			<Divider size="lg" borderColor="gray" mt="3" mb="3" />

			{rolesAndPrevilegesObject?.["My Personal Information"]?.edit ?? true ? (
				<Box display={{ base: "flex" }} justifyContent={"flex-end"}>
					<Box
						display={{
							md: "none",
							base: !editClicked ? "none" : "flex",
							lg: "none",
						}}
						mt="1rem"
						onClick={() => setEditClicked(false)}
						role="button"
					>
						<Text
							marginRight="0.5rem"
							textDecoration="underline"
							cursor="pointer"
							textStyle={"textHead"}
						>
							{subHead}
						</Text>
						<Box mt="1">
							<FiEdit cursor="pointer" size="12" fill="#0081c8" />
						</Box>
					</Box>
				</Box>
			) : (
				<Box display={{ base: "flex" }} justifyContent={"flex-end"}>
					<Box
						display={{
							md: "none",
							base: !editClicked ? "none" : "flex",
							lg: "none",
						}}
						mt="1rem"
					>
						<Text
							marginRight="0.5rem"
							textDecoration="underline"
							cursor="not-allowed"
							textStyle={"textHead"}
						>
							{subHead}
						</Text>
						<Box mt="1">
							<FiEdit cursor="not-allowed" size="12" fill="#0081c8" />
						</Box>
					</Box>
				</Box>
			)}

			<form onSubmit={handleSubmit}>
				<Box
					display={{ base: "", lg: "flex", md: "flex" }}
					justifyContent={"space-between"}
				>
					<Grid
						templateColumns={{
							base: "repeat(1, 1fr)",
							md: "repeat(2, 1fr)",
							lg: "repeat(3, 1fr)",
						}}
						gap="6"
					>
						{inputFields?.map((each) => (
							<GridItem>
								<Box maxW="100%">
									<Inputs
										id={each?.Id}
										type={"text"}
										label={each?.label}
										name={each?.name}
										onBlur={handleBlur}
										value={userDetails?.[each?.name]}
										onChange={handleChange}
										disabled={editClicked ? true : false}
										error={errors?.[each?.name] && errors?.[each?.name]}
									/>
								</Box>
							</GridItem>
						))}
						{["districtAdmin", "superAdmin"].includes(selectedRole) ? (
							<GridItem display="flex" alignItems="start" gap="2">
								<Checkbox
									mt="1"
									id={7}
									key={7 + "my acc"}
									name={"import_email_status"}
									isChecked={userDetails?.import_email_status}
									onChange={handleImportEmail}
									isDisabled={editClicked}
								/>
								<Label1 name={7}>
									Receive email when FTP import finishes?
								</Label1>
							</GridItem>
						) : null}
					</Grid>

					{rolesAndPrevilegesObject?.["My Personal Information"]?.edit ??
					true ? (
						<Box
							display={{
								base: "none",
								lg: !editClicked ? "none" : "flex",
								md: !editClicked ? "none" : "flex",
							}}
							onClick={() => setEditClicked(false)}
							role="button"
						>
							<Text
								marginRight="0.5rem"
								textDecoration="underline"
								cursor="pointer"
							>
								{subHead}
							</Text>
							<Box mt="1">
								<FiEdit fill="#0081c8" cursor="pointer" />
							</Box>
						</Box>
					) : (
						<Box
							display={{
								base: "none",
								lg: !editClicked ? "none" : "flex",
								md: !editClicked ? "none" : "flex",
							}}
						>
							<Text
								marginRight="0.5rem"
								textDecoration="underline"
								cursor="not-allowed"
							>
								{subHead}
							</Text>
							<Box mt="1">
								<FiEdit fill="#0081c8" cursor="not-allowed" />
							</Box>
						</Box>
					)}
				</Box>
				<Box
					mt="2"
					rounded="lg"
					p="2"
					display={{
						md: "none",
						base: "none",
						lg: !editClicked ? "none" : "flex",
					}}
				>
					<Link
						background="none"
						border="none"
						role="button"
						onClick={() => handleLogout()}
					>
						<Text
							fontSize={{ base: "14px", md: "13px", lg: "16px" }}
							fontFamily={"body"}
							mt="5"
							mb="3"
							textDecoration={"underline"}
						>
							{footer}
						</Text>
					</Link>
				</Box>

				{editClicked ? null : (
					<>
						<Box>
							{!editClicked ? (
								<Center gap="2rem" mt="2">
									<Box
										onClick={() => {
											setErrors({});
											setEditClicked(true);
										}}
									>
										<NegativeButton text={btnText1} />
									</Box>

									<PositiveButton
										bg="green"
										text={btnText2}
										type="submit"
										isLoading={loading}
									/>
								</Center>
							) : null}
						</Box>
					</>
				)}
			</form>
		</Box>
	);
};

export default Myaccount;
