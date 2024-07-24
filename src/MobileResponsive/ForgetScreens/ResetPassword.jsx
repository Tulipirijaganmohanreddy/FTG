import {
	Box,
	ButtonGroup,
	Center,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../Utilities/FormValidation";
import InputPassword from "../../components/FitnessComponents/FitnessSelect/InputPassword";
import ErrorResponse from "../../components/GlobalComponents/ErrorResponse";
import SuccessResponse from "../../components/GlobalComponents/SuccessResponse";
import NegativeButton from "../../components/NegativeButton";
import PositiveButton from "../../components/PositiveButton";
import { handleShowPassword } from "../../features/ManageUsers/Components/BasicUserInfoStudent";
import { getResetPassword } from "../../store/slices/profileSlice";

import fitnessHeading from "../../assets/Images/SignInPageImages/fitnessnewlogo.png";

const ResetPassword = () => {
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();

	const code = useSelector((state) => state?.profile?.code);
	const code2 = useSelector((state) => state?.profile?.code2);

	const loading = useSelector((state) => state.profile.upLoading);
	const [data, setData] = useState({
		new_password: "",
		confirm_password: "",
	});
	const [showPassword, setShowPassword] = useState({
		new_password: false,
		confirm_password: false,
	});
	const [errors, setErrors] = useState({});
	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });

		const errorsObj = validateFormData({
			[event.target.name]: event.target.value,
		});

		if (Object.keys(errorsObj).length) {
			setErrors((prevState) => ({
				...prevState,
				...errorsObj,
			}));
		} else {
			let obj = { ...errors };
			delete obj[event.target.name];
			setErrors({ ...obj });
		}
		if (event.target.name === "new_password" && data.confirm_password?.length) {
			if (event.target.value !== data.confirm_password) {
				setErrors((prevState) => ({
					...prevState,
					confirm_password: "Password and confirm password do not match",
				}));
			} else {
				let obj = { ...errors };
				delete obj["confirm_password"];
				// delete obj[event.target.name];

				setErrors({ ...obj });
			}
		}
		if (
			event.target.name === "confirm_password" &&
			event.target.value?.length
		) {
			if (event.target.value !== data.new_password) {
				setErrors((prevState) => ({
					...prevState,
					confirm_password: "Password and confirm password do not match",
				}));
			} else {
				let obj = { ...errors };
				delete obj["confirm_password"];
				setErrors({ ...obj });
			}
		}
	};

	const handlePassword = (name) => {
		setShowPassword((prevState) => ({
			...prevState,
			[name]: !prevState[name],
		}));
	};

	const handleReset = () => {
		const errorObj = validateFormData(data);
		setErrors(errorObj);
		if (Object.keys(errorObj)?.length === 0) {
			if (data.confirm_password === data.new_password) {
				let body = {
					uuid: params?.id,
					new_password: data.new_password,
				};
				dispatch(getResetPassword({ body }));
			}
		}
	};

	return (
		<Flex
			h="calc(100vh)"
			justifyContent={"center"}
			alignItems={"center"}
			bg="#F2F8FFC7"
			position="relative"
		>
			<Image
				src={fitnessHeading}
				alt="FitnessGram"
				position="absolute"
				top="0"
				left="0"
			/>

			<Center>
				<Box
					borderRadius="lg"
					w={{ base: "", md: "sm" }}
					bg={"white"}
					shadow={"lg"}
					mx={{ base: "2", md: "0" }}
				>
					<Stack spacing="3" m="7">
						<Center>
							<Heading size="md" color="#0081c8" textAlign="center">
								Reset Password For Your FitnessGram Account
							</Heading>
						</Center>
						<Stack mx="4">
							<InputPassword
								placeholder="Enter New Password"
								type={!showPassword["new_password"] ? "password" : "text"}
								name="new_password"
								onChange={handleChange}
								spanprops={() => handlePassword("new_password")}
								error={errors?.["new_password"] && errors?.["new_password"]}
							>
								{handleShowPassword(showPassword["new_password"])}
							</InputPassword>

							<Text fontSize="xs" p="3">
								Password should contain 8 characters with one uppercase
								letter,one lowercase letter, one number and one special
								character[!@#$%^&_*().\-=+]
							</Text>

							<InputPassword
								placeholder="Confirm New Password"
								type={!showPassword["confirm_password"] ? "password" : "text"}
								name="confirm_password"
								onChange={handleChange}
								spanprops={() => handlePassword("confirm_password")}
								error={
									errors?.["confirm_password"] && errors?.["confirm_password"]
								}
							>
								{handleShowPassword(showPassword["confirm_password"])}
							</InputPassword>
						</Stack>
					</Stack>
					<Center m="3">
						<ButtonGroup gap="4" my="5">
							<Box>
								<NegativeButton
									text={"Cancel"}
									onClick={() => {
										navigate("/");
									}}
								/>
							</Box>

							<Box>
								<PositiveButton
									text={"Save"}
									onClick={handleReset}
									isLoading={loading}
								/>
							</Box>
						</ButtonGroup>
					</Center>
				</Box>
			</Center>

			{(code && code === 200) || code === 201 || code2 === 200 ? (
				<SuccessResponse />
			) : (
				<ErrorResponse />
			)}
		</Flex>
	);
};

export default ResetPassword;
