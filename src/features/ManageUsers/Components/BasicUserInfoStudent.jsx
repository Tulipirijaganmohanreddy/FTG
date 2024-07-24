import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Checkbox,
	Flex,
	Grid,
	GridItem,
	HStack,
	Radio,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import InputPassword from "../../../components/FitnessComponents/FitnessSelect/InputPassword";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { setMessage } from "../../../store/slices/profileSlice";
import { checkUniqueFields } from "../../../store/slices/superAdminSlice/superAdminSlice";
import { addUserData } from "../Config";
import ChangePasswordDA from "./ChangePasswordDA";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

export const handleShowPassword = (name) => {
	if (name) {
		return <ViewIcon cursor={"pointer"} />;
	}
	return <ViewOffIcon cursor={"pointer"} />;
};

const BasicUserInfoStudent = (props) => {
	const {
		studentInputFields,
		login,
		negativeBtnText,
		positiveBtnText,
		printList,
	} = addUserData;
	const [loginStatus] = login;

	const navigate = useNavigate();
	const {
		setActiveTab,
		inputDetailsObj,
		setInputDetailsObj,
		selectedRace,
		setSelectedRace,
		errors,
		setErrors,
		uniqueErrors,
		selectedRole,
		setSelectedRole,
	} = props;

	const params = useParams();
	const timerRef = useRef(null);

	const dispatch = useDispatch();

	const manageUser = useSelector((state) => state.profile.manageUser);

	const statesList = useSelector((state) => state?.districtAdmin.statesList);

	const token = useSelector((state) => state?.profile.token);

	const userData = useSelector((state) => state?.profile?.UserData);

	const previousPath = useSelector((state) => state?.profile?.previousPath);

	const [showPassword, setShowPassword] = useState({
		password: false,
		re_enter_password: false,
	});
	const handlePassword = (name) => {
		setShowPassword((prevState) => ({
			...prevState,
			[name]: !prevState[name],
		}));
	};

	const handleReEnterPassword = (e) => {
		const { type, name, value } = e.target;
		const trimmedValue = value.trim();

		setInputDetailsObj({
			...inputDetailsObj,
			[name]: trimmedValue,
		});
		if (trimmedValue !== inputDetailsObj.password) {
			setErrors((prevState) => ({
				...prevState,
				[name]: "Password and confirm password do not match",
			}));
		} else {
			let errorsCopy = errors;
			delete errorsCopy["re_enter_password"];
			setErrors(errorsCopy);
		}
	};

	const handleChange = (event) => {
		const { type, name, value } = event.target;
		const trimmedValue = value.trim();
		if (trimmedValue.length > 3 && ["student_id", "email"].includes(name)) {
			const payload = {
				[name]: trimmedValue,
			};
			// dispatch(checkUniqueFields({ body: payload, token }));
		}

		if (type === "checkbox") {
			setInputDetailsObj((prevState) => ({
				...prevState,
				[name]: event.target.checked,
			}));
		} else if (type === "radio") {
			setInputDetailsObj((prevState) => ({
				...prevState,
				login_status: trimmedValue,
			}));
		} else if (name == "password") {
			setInputDetailsObj({
				...inputDetailsObj,
				[name]: trimmedValue,
			});
			if (
				inputDetailsObj.re_enter_password &&
				inputDetailsObj["re_enter_password"] !== trimmedValue
			) {
				setErrors((prevState) => ({
					...prevState,
					re_enter_password: "Password and confirm password do not match",
				}));
			} else {
				let errorsCopy = errors;
				delete errorsCopy["re_enter_password"];
				setErrors(errorsCopy);
			}
		} else if (
			selectedRole === "teacher" &&
			name === "grade" &&
			params?.id?.length > 1
		) {
			dispatch(setMessage("Teacher Cannot Edit Grade!"));
		} else if (
			[
				"first_name",
				"phone",
				"last_name",
				"middle_initial",
				"nick_name",
			].includes(name)
		) {
			setInputDetailsObj({
				...inputDetailsObj,
				[name]: value,
			});
		} else {
			setInputDetailsObj({
				...inputDetailsObj,
				[name]: trimmedValue,
			});
		}

		if (!["state", "gender"].includes(name)) {
			const errorsObj = validateFormData(
				{ [name]: trimmedValue },
				manageUser?.userType,
			);

			if (Object.keys(errorsObj).length) {
				setErrors((prevState) => ({
					...prevState,
					...errorsObj,
					...uniqueErrors,
				}));
			} else {
				let obj = { ...errors };
				delete obj[name];
				setErrors({ ...obj });
			}
		}
	};

	const handleRace = (selectedRace) => {
		setSelectedRace(selectedRace);
		setInputDetailsObj({
			...inputDetailsObj,
			race: selectedRace.map((race) => race.value),
		});
	};
	const clickToNext = (event) => {
		event.preventDefault();
		const {
			student_role,
			permanently_exempt,
			print_body_composition,
			print_reports_in_spanish,
			race,
			ethnicity,
			state,
			gender,
			...payload
		} = inputDetailsObj;

		params?.id && delete payload["password"];
		params?.id && delete payload["re_enter_password"];
		const errorsObj = validateFormData(payload, manageUser?.userType);
		if (inputDetailsObj["re_enter_password"] !== inputDetailsObj["password"]) {
			errorsObj["re_enter_password"] =
				"Password and confirm password do not match";
		} else {
			let errorsCopy = errors;
			delete errorsCopy["re_enter_password"];
			setErrors(errorsCopy);
		}

		setErrors({ ...errorsObj, ...uniqueErrors });

		if (Object.keys(errorsObj).length === 0) {
			setActiveTab(1);
		}
	};
	useEffect(() => {
		clearTimeout(timerRef.current); // clear previous timeout

		timerRef.current = setTimeout(() => {
			timerRef.current = null; // Reset timerRef when timer finally ends

			if (
				inputDetailsObj.student_id?.length >= 3 &&
				userData?.student_id != inputDetailsObj.student_id
			) {
				const payload = {
					student_id: inputDetailsObj.student_id,
				};
				dispatch(checkUniqueFields({ body: payload, token }));
			}
		}, 500);

		return () => clearTimeout(timerRef.current);
	}, [inputDetailsObj.student_id?.length]);

	useEffect(() => {
		clearTimeout(timerRef.current); // clear previous timeout

		timerRef.current = setTimeout(() => {
			timerRef.current = null; // Reset timerRef when timer finally ends

			if (
				inputDetailsObj.email?.length >= 3 &&
				userData?.email != inputDetailsObj.email
			) {
				const payload = {
					email: inputDetailsObj.email,
				};
				dispatch(checkUniqueFields({ body: payload, token }));
			}
		}, 500);

		return () => clearTimeout(timerRef.current);
	}, [inputDetailsObj.email]);
	return (
		<>
			<form onSubmit={clickToNext}>
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						xl: "repeat(4, 1fr)",
						md: "repeat(3, 1fr)",
					}}
					gap="2"
				>
					{studentInputFields?.map((item, index) => {
						return (
							<GridItem key={item.id} colSpan="1">
								{!["select", "password", "multi-select", "date"].includes(
									item.inputType,
								) && (
									<Inputs
										id={item?.Id}
										type={item.inputType}
										label={item.lable}
										name={item.name}
										value={inputDetailsObj?.[item?.name]}
										onChange={handleChange}
										error={errors?.[item?.name] ? errors?.[item?.name] : ""}
										helperText={
											item.name == "user_name" &&
											"For students username will be emails"
										}
									/>
								)}

								{item.inputType == "select" && (
									<SingleSelect2
										id={item?.Id}
										placeholder="Select "
										label={item.lable}
										onChange={handleChange}
										name={item?.name}
										value={inputDetailsObj[item?.name]}
										optionsProps={
											item?.name === "state" ? statesList : item?.options
										}
										displayKey={item?.name === "state" ? "state" : "lable"}
										optionValue={item?.name === "state" ? "code" : "value"}
										error={errors?.[item?.name] ? errors?.[item?.name] : ""}
									/>
								)}

								{item.inputType == "multi-select" && (
									<MultiSelector
										id={item?.Id}
										label={item?.lable}
										options={item.options}
										onChange={handleRace}
										value={selectedRace}
									/>
								)}
								{item.inputType == "password" && (
									<>
										<InputPassword
											id={item?.Id}
											label={item.lable}
											type={!showPassword[item?.name] ? item.inputType : "text"}
											value={inputDetailsObj[item?.name]}
											name={item?.name}
											onChange={
												item.name === "password"
													? handleChange
													: handleReEnterPassword
											}
											isDisabled={params.id ? true : false}
											spanprops={() => handlePassword(item?.name)}
											error={errors?.[item?.name] ? errors?.[item?.name] : ""}
										>
											{handleShowPassword(showPassword[item?.name])}{" "}
										</InputPassword>
										{selectedRole === "districtAdmin" &&
											item.name === "password" &&
											params?.id && <ChangePasswordDA />}
									</>
								)}
								{item.inputType == "date" && (
									<Inputs
										id={item?.Id}
										type={item.inputType}
										label={item.lable}
										name={item.name}
										value={inputDetailsObj[item?.name]}
										max="9999-12-31"
										onChange={handleChange}
										error={errors?.[item?.name] ? errors?.[item?.name] : ""}
									/>
								)}
							</GridItem>
						);
					})}
				</Grid>
				<HStack
					gap={{
						base: "8",
						md: "3.5rem",
						lg: "6.5rem",
						xl: "8.5rem",
						"2xl": "15rem",
					}}
					p="0"
				>
					<Box>
						{printList.map((role, index) => {
							return (
								<HStack mt="2" key={"a" + index}>
									<Checkbox
										id={role.Id}
										value={inputDetailsObj?.[role.name]}
										name={role.name}
										isChecked={inputDetailsObj?.[role.name]}
										onChange={handleChange}
									/>

									<Label1 name={role.Id}>{role.lable}</Label1>
								</HStack>
							);
						})}
					</Box>

					<GridItem>
						<>
							<Paragraph2>{loginStatus.label}</Paragraph2>

							<Stack spacing="1">
								<Radio
									id={loginStatus?.Id1}
									name={loginStatus.name}
									onChange={handleChange}
									isChecked={
										inputDetailsObj?.login_status == "1" ? true : false
									}
									value="1"
								>
									<Label1
										name={loginStatus?.Id1}
										decreaseMarginTop="0"
										decreaseMarginBottom="0"
									>
										{loginStatus.options[0]}
									</Label1>
								</Radio>
								<Radio
									id={loginStatus?.Id2}
									name={loginStatus.name}
									onChange={handleChange}
									isChecked={
										inputDetailsObj?.login_status == "0" ? true : false
									}
									value="0"
								>
									<Label1
										name={loginStatus?.Id2}
										decreaseMarginTop="0"
										decreaseMarginBottom="0"
									>
										{loginStatus.options[1]}
									</Label1>
								</Radio>
							</Stack>
						</>
						{errors?.[loginStatus.name] && (
							<ErrorText>{errors?.[loginStatus.name]}</ErrorText>
						)}
					</GridItem>
				</HStack>

				<Flex justify="center" gap="8" mt="4">
					<NegativeButton
						text={negativeBtnText}
						onClick={() => {
							navigate(previousPath);
						}}
					/>
					<PositiveButton text={positiveBtnText} type="submit" />
				</Flex>
			</form>
		</>
	);
};

export default BasicUserInfoStudent;
