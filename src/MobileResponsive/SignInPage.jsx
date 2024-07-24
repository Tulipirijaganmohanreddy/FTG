import {
	Box,
	Button,
	Checkbox,
	Flex,
	Grid,
	Img,
	Spinner,
	Text,
} from "@chakra-ui/react";

import React, { useEffect, useLayoutEffect, useState } from "react";

import fitnessnewlogo from "../assets/Images/SignInPageImages/fitnessnewlogo.png";
import fitnessLoginExcerciseImage from "../assets/Images/SignInPageImages/Physical education-pana.png";

import backgroundImg from "../../src/assets/Images/SignInPageImages/loginbackgroundimage.png";

import { QuestionIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import InputPassword from "../components/FitnessComponents/FitnessSelect/InputPassword";
import Inputs from "../components/FitnessComponents/FitnessSelect/Inputs";
import ErrorText from "../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading5 from "../components/FitnessComponents/FitnessTexts/Heading5";
import Label1 from "../components/FitnessComponents/FitnessTexts/Lable1";
import NavbarCardIcon from "../components/FitnessComponents/FitnessTexts/NavbarCardIcon";
import Paragraph2 from "../components/FitnessComponents/FitnessTexts/Paragraph2";
import ErrorResponse from "../components/GlobalComponents/ErrorResponse";
import ForgetUserName from "../features/DistrictAdmin/DataManagement/ManageUsers/SelectTabs/ForgetUserName";
import { handleShowPassword } from "../features/ManageUsers/Components/BasicUserInfoStudent";
import {
	getUser,
	getUserRole,
	logOut,
	setActivatingID,
	setMessage,
} from "../store/slices/profileSlice";
import { validateFormData } from "../Utilities/FormValidation";
import FooterResponse from "./FooterPopups/FooterResponse";
import ForgetDistrict from "./ForgetScreens/ForgetDistrict";
import ForgetPassword from "./ForgetScreens/ForgetPassword";
import { loginInputFieldsData } from "./loginFieldsData";
import DisclaimerCardModal from "./MobileNav/DisclaimerCardModal";

const SignInPage = () => {
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const message = useSelector((state) => state?.profile?.message); // capturing the response message

	const code = useSelector((state) => state.profile.code); // capturing the response code

	const errorResponse = useSelector((state) => state?.profile?.errorResponse); // capturing the response when the api fails due to invalid user credentials

	const userRole = useSelector((state) => state.profile.selectedRole); // capturing the role of the loggedin user ex: student, teacher, superadmin, distrcitadmin, schooladmin

	const token = useSelector((state) => state?.profile?.token); // capturing the logged in user authentication token

	const loadingOne = useSelector((state) => state?.profile?.loadingOne); // capturing the loading state when api gets fired

	const userId = useSelector((state) => state.profile.userId); // capturing the loggedin user uuid

	const duplicateRole = useSelector((state) => state.profile.duplicateRole);

	const [loginDetails, setLoginDetails] = useState({
		user_name: "",
		password: "",
		district_code: "",
		disclaimerAccepted: "",
	}); // variable to capture the user credentials

	const [isPopUpShow, setIsPopUpShow] = useState(false); // variable to show popup when user clicks on forgor username

	const [isPopUpShowPwd, setIsPopUpShowPwd] = useState(false); // variable to show popup when user clicks on forgor password

	const [isPopUpShowCode, setIsPopUpShowCode] = useState(false); // variable to show popup when user clicks on forgor district code

	const [disclaimerPopUpOpened, setDisclaimerPopUpOpened] = useState(false); // variable to show disclaimer popup for the user to accept the disclaimer

	const [showPassword, setShowPassword] = useState({
		password: false,
	}); //variable to hide and show password in input filed

	const [errors, setErrors] = useState({}); // variable to capture the errors when user entered credentials are not matched specifications

	const handleChange = (event) => {
		const { name, value } = event.target;

		const trimmedValue = value.trim(); // removing the spaces from the user entered value

		if (name === "disclaimerAccepted") {
			if (event.target.checked) {
				// capturing the data when user accepts/declines the disclaimer

				setLoginDetails({
					...loginDetails,
					[name]: event.target.checked,
				});
				let obj = { ...errors };
				delete obj[name];
				setErrors({ ...obj });
			} else {
				// setting up the user-entered data
				setLoginDetails({
					...loginDetails,
					[name]: trimmedValue,
				});
			}
		} else {
			// setting up the user-entered data
			setLoginDetails({
				...loginDetails,
				[name]: trimmedValue,
			});
		}
		if (name != "disclaimerAccepted") {
			// checking the errors when user not accepted the disclaimer

			const errorsObj = validateFormData(
				{
					[name]: trimmedValue,
				},
				"login",
			);
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
		}
	};

	const handlePassword = (name) => {
		// updating the value to hide and show password in input filed
		setShowPassword((prevState) => ({
			...prevState,
			[name]: !prevState[name],
		}));
	};
	const handleSubmit = (event) => {
		event.preventDefault();
		const { district_code, ...payload } = loginDetails;

		let errorObj = validateFormData(payload, "login"); // checking the errors in the user credentials

		if (Object.keys(errorObj)?.length > 0) {
			setErrors(errorObj);
		} else {
			setErrors({});

			const loginUserDetails = {
				user_name: loginDetails.user_name,
				password: loginDetails.password,
				district_code: loginDetails.district_code,
			}; // payload to send through api to the backend

			// dispatching the api call with payload
			// this is first api to check whether the user exists or not

			dispatch(getUser(loginUserDetails));
		}
	};

	useEffect(() => {
		const expiryMessage = localStorage.getItem("expiryMessage");

		//setting up the message for expiry

		!token && expiryMessage && dispatch(setMessage(expiryMessage));

		// dispatching the api to know the logged in user role e.g. student, teacher, superadmin, distrcitadmin, schooladmin when we get the userID from first api
		// firing the second api

		!userRole && userId && dispatch(getUserRole({ id: userId, token }));
	}, [token, userId, dispatch]);

	useEffect(() => {
		// navigating to the main page when user exists is correct
		if (token && userId && userRole) {
			location.state?.from
				? navigate(location.state.from)
				: duplicateRole
				? navigate("/role/superAdmin/data-management")
				: navigate(`/role/${userRole}`);
			dispatch(setActivatingID(1));
		}
	}, [userRole, dispatch]);

	return (
		<>
			<Box
				h={{ base: "none", lg: "100vh" }}
				//h='100vh'
				display="flex"
				flexDirection="column"
				overflow="hidden"
				className="example"
			>
				<Grid
					templateColumns={{
						base: "100%",
						md: "48% 52%",
						xl: "54% 46%",
						"2xl": "63% 37%",
					}}
					flex="1"
				>
					<Box
						display="flex"
						flexDir="column"
						justifyContent={{ base: "center", md: "center" }}
						alignItems="center"
					>
						<Box
							h="50%"
							display="flex"
							flexDir="column"
							justifyContent={{ base: "center", md: "center" }}
							alignItems="center"
						>
							<Img
								src={fitnessnewlogo}
								w={{ base: "60vw", md: "35vw", lg: "35vw" }}
								objectFit="contain"
								pb={{ base: "3" }}
								pt={{ base: "3" }}
							/>

							<Text
								textAlign={"center"}
								gap="10"
								w={{
									base: "100%",
									md: "80%",
									lg: "75%",
								}}
								textStyle="textHead1"
								mt={{ base: "", xl: "0.8rem" }}
							>
								<b>FitnessGram</b>
								<Text as="span" color="#282828">
									{" "}
									is one of the most widely used health-related fitness
									assessment tools in the world, and it's backed by decades of
									science, research, and the vision of{" "}
								</Text>
								<b>Dr. &nbsp;Kenneth H. &nbsp;Cooper</b>, the "Father of
								Aerobics."
							</Text>
						</Box>

						<Box display={{ md: "none", lg: "block", base: "none" }}>
							<Img
								src={fitnessLoginExcerciseImage}
								mt="10"
								h={{ base: "auto", md: "45vh" }}
								maxW="100%"
								rounded="lg"
								transition="transform 1s ease-in-out"
								transform={"translateY(-40px)"}
								objectFit="fill"
							/>
						</Box>
						<Box
							maxW="100%"
							height="auto"
							mt="2"
							display={{ base: "block", md: "block", lg: "none" }}
						>
							<Img
								src={fitnessLoginExcerciseImage}
								alt="Description of the image"
								style={{ width: "100%", height: "100%", objectFit: "cover" }}
							/>
						</Box>
					</Box>
					<Box
						height="auto"
						style={{ backgroundImage: `url(${backgroundImg})` }}
						css={{
							backgroundPosition: "right 3.5rem top -0rem",
						}}
						// maxW='100%'
						backgroundRepeat="no-repeat"
						backgroundSize="100% 100%"
						bg="#1895C4"
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
						// flex='1'
						px="2"
					>
						<Box
							w={{ base: "80%", md: "85%", lg: "75%", xl: "63%", "3xl": "60%" }}
						>
							<Box mt="2" mb={{ base: "2", lg: "1rem", xl: "2rem" }}>
								<Heading5
									changeTextColor={"white"}
									changeTextStyle="logInHeading"
								>
									Login here
								</Heading5>
							</Box>

							<Paragraph2
								textColor="white"
								whiteSpace={{ base: "wrap", md: "nowrap" }}
							>
								* Password & District Code are Case Sensitive.
							</Paragraph2>
							<form onSubmit={handleSubmit}>
								{loginInputFieldsData?.dataList?.map((each, index) => (
									<Box mt="3" key={`ABC${index}`}>
										<Flex
											justifyContent="space-between"
											mr={{ base: "0", md: "6", lg: "2.5rem", xl: "2.5rem" }}
											alignItems="center"
											mb="1"
											key={`ABCD${index}`}
										>
											<Paragraph2 textColor="white">
												{each?.labelOne}
											</Paragraph2>

											<Box
												onClick={() => {
													if (each?.name === "user_name") {
														setIsPopUpShow(true);
													}

													if (each?.name === "password") {
														setIsPopUpShowPwd(true);
													}

													if (each?.name === "district_code") {
														setIsPopUpShowCode(true);
													}
												}}
												key={`ABCDE${index}`}
											>
												<Paragraph2
													textColor="white"
													decreaseMarginTop="0"
													changeCursorPointer="pointer"
												>
													{each?.labelTwo}
												</Paragraph2>
											</Box>
										</Flex>

										{each?.name !== "password" ? (
											<Inputs
												id={each?.id}
												placeholder={
													each?.name === "user_name"
														? "e.g. John"
														: each?.name === "district_code"
														? "Only for district admin"
														: ""
												}
												type={each?.inputType}
												background="white"
												rounded="lg"
												size="sm"
												// py='5'
												name={each?.name}
												value={loginDetails[each?.name]}
												onChange={handleChange}
												error={errors?.[each?.name] && errors?.[each?.name]}
												autoComplete="off"
											/>
										) : (
											<InputPassword
												id={each?.id}
												type={!showPassword["password"] ? "password" : "text"}
												name="password"
												onChange={handleChange}
												// placeholder=""
												// id="password"
												value={loginDetails[each?.name]}
												spanprops={() => handlePassword("password")}
												error={errors?.[each?.name] && errors?.[each?.name]}
												pr={{
													base: "0.9rem",
													lg: "2.8rem",
													md: "2.5rem",
													xl: "2.8rem",
												}}
											>
												{handleShowPassword(showPassword["password"])}
											</InputPassword>
										)}
									</Box>
								))}

								<Box mt="3">
									<Flex gap="3" alignItems="center" textColor="white">
										<Checkbox
											id="termsCheck"
											isChecked={loginDetails?.disclaimerAccepted}
											borderColor="white"
											name="disclaimerAccepted"
											onChange={handleChange}
										>
											<Label1 textColor="white" name={"termsCheck"}>
												I agree to the Terms of Use and Privacy Policy{" "}
											</Label1>
										</Checkbox>
									</Flex>
									<ErrorText textColor="red" mt="2">
										{errors && errors["disclaimerAccepted"]}
									</ErrorText>
								</Box>

								<>
									<Button
										w={{ lg: "90%", md: "90%", base: "100%" }}
										background="white"
										rounded="md"
										type="submit"
										size="sm"
										mt="3"
										//w='100%'
									>
										{" "}
										{loadingOne ? <Spinner /> : "Log In"}
									</Button>
								</>
							</form>

							<Flex gap="2" mt="3" mb="3rem">
								<Box
									onClick={() => {
										window.open("https://help.fitnessgram.net/", "_blank");
									}}
								>
									<NavbarCardIcon elementIcon={QuestionIcon} color="white" />
								</Box>

								<Box
									pt="1"
									role="button"
									onClick={() => {
										window.open("https://help.fitnessgram.net/", "_blank");
									}}
								>
									<Paragraph2 textColor="white" changeCursorPointer="pointer">
										Help?
									</Paragraph2>
								</Box>
							</Flex>
						</Box>
					</Box>
				</Grid>

				<DisclaimerCardModal
					disclaimerPopUpOpened={disclaimerPopUpOpened}
					setDisclaimerPopUpOpened={setDisclaimerPopUpOpened}
					loginDetails={loginDetails}
					setLoginDetails={setLoginDetails}
				/>

				<ErrorResponse message={errorResponse} />

				{isPopUpShow ? (
					<ForgetUserName
						isPopUpShow={isPopUpShow}
						setIsPopUpShow={setIsPopUpShow}
					/>
				) : null}
				{isPopUpShowPwd ? (
					<ForgetPassword
						isPopUpShowPwd={isPopUpShowPwd}
						setIsPopUpShowPwd={setIsPopUpShowPwd}
					/>
				) : null}
				{isPopUpShowCode ? (
					<ForgetDistrict
						isPopUpShowCode={isPopUpShowCode}
						setIsPopUpShowCode={setIsPopUpShowCode}
					/>
				) : null}

				{!code && message ? <ErrorResponse /> : null}

				<FooterResponse />
			</Box>
		</>
	);
};

export default SignInPage;
