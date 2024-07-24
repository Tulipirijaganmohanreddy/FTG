import {
	Box,
	Center,
	Divider,
	Flex,
	Grid,
	GridItem,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import {
	debounce,
	handleDateRange,
	handleEndDate,
} from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
	checkLicense,
	createLicenses,
	getFundersList,
	setCheckLicenseStatus,
	setFunderId,
	setLicenseId,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { CreateLicenseData } from "../Config";
import LicenseExistPopup from "./LicenseExistPopup";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const CreateLicense = () => {
	const { title, addDistrict, LicenseFields, createBtnText, negativeBtnText } =
		CreateLicenseData;
	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const token = useSelector((state) => state?.profile?.token);
	const fundersList = useSelector((state) => state?.superAdmin?.fundersList);

	const selectedRole = useSelector((state) => state?.profile?.selectedRole);
	const loading = useSelector((state) => state?.superAdmin?.loading);
	const createdLicenseData = useSelector((state) => state?.superAdmin?.license);
	const licenseInfo = useSelector((state) => state?.superAdmin?.licenseData);
	const previouspath = useSelector((state) => state?.profile?.previousPath);
	const upLoading = useSelector((state) => state?.profile?.upLoading);
	const checkLicenseStatus = useSelector(
		(state) => state.superAdmin.checkLicenseStatus,
	);
	const dateRange = handleDateRange();

	const [deletePopUp, setDeletePopUp] = useState(false);

	const [showLicenseField, setShowLicenseField] = useState(false);

	const initInputFeilds = {
		funder_name: "",
		...dateRange,
		school_limit: "",
		funder_type: "",
		funder_uuid: "",
		sub_license: 0,
	};

	const [inputFields, setInputFields] = useState(initInputFeilds);
	const [category, setCategory] = useState("0");
	const [errors, setErrors] = useState({});
	const [selectedFunderName, setSelectedFunderName] = useState([]);
	const [funders, setFunders] = useState([]);

	const handleChange = (e) => {
		const { type, name, value } = e.target;
		const trimmedValue = value.trim();
		if (e.target.name === "start_date") {
			let endDate = handleEndDate(e.target.value);
			setInputFields({
				...inputFields,
				[e.target.name]: e.target.value,
				...endDate,
			});
		} else {
			setInputFields({ ...inputFields, [e.target.name]: e.target.value });
		}
	};

	const handleInputChange = debounce((text) => {
		text?.length >= 2 &&
			dispatch(getFundersList({ token: token, body: { search: text } }));
	}, 500);

	const handleFundername = (funderData) => {
		setSelectedFunderName(funderData);

		const funderUUID = funderData?.value?.split(".")[0];
		const funderType = funderData?.value?.split(".")[1];

		setInputFields((prevState) => ({
			...prevState,
			funder_uuid: funderUUID,
			funder_type: funderType,
			funder_name: funderData?.label,
		}));
		dispatch(checkLicense({ token, uuid: funderUUID }));
	};

	const validateData = (event) => {
		event.preventDefault();
		const { notes, funder_type, funder_uuid, sub_license, ...payload } =
			inputFields;
		let errorObj = validateFormData(payload);
		setErrors({ ...errorObj });
		const finalPayload = {
			funder_type,
			notes,
			...inputFields,
			category: parseInt(category),
		};
		if (!Object.keys(errorObj).length) {
			dispatch(createLicenses({ body: finalPayload, token: token }));
		}
	};

	const handleDistrictAddition = () => {
		dispatch(setPreviousPath(location.pathname));
	};

	useEffect(() => {
		dispatch(getFundersList({ token: token, body: { search: "" } }));
	}, []);

	const handleCancel = () => {
		navigate(`/role/${selectedRole}/Licenses`);
	};

	const handleLicenseField = () => {
		setShowLicenseField(true);

		dispatch(setCheckLicenseStatus(null));
		setInputFields((prevState) => ({
			...prevState,
			license_name: "",
			sub_license: 1,
		}));
	};

	useEffect(() => {
		dispatch(setLicenseId(createdLicenseData?.data?.response?.uuid));
		dispatch(setFunderId(createdLicenseData?.data?.response?.funder_name));
		if (createdLicenseData?.data?.code === 200) {
			dispatch(
				setPreviousPath(
					`/role/${selectedRole}/License/${createdLicenseData?.data?.response?.uuid}/${createdLicenseData?.data?.response?.funder_uuid}`,
				),
			);
		}
	}, [createdLicenseData]);

	useEffect(() => {
		if (fundersList?.length) {
			let arr = fundersList.map((funder) => ({
				label: ["state", "partner"].includes(funder.type)
					? funder.state_name
					: funder.district_name,
				value: funder.uuid + "." + funder.type,
			}));
			setFunders(arr);
		} else {
			setFunders([]);
		}
	}, [fundersList]);

	console.log(inputFields, "inputFields====>");

	return (
		<div>
			<Flex>
				<Box>
					<Text textStyle="text">{title}</Text>
				</Box>
				<Spacer />
			</Flex>
			<Divider marginY="4" borderColor="gray" />
			<form onSubmit={validateData}>
				<Grid
					templateColumns={{
						base: "repeat(1, 1fr)",
						md: "repeat(2, 1fr)",
						lg: "repeat(3, 1fr)",
					}}
					gap="1"
				>
					{LicenseFields?.map((item, index) => {
						return (
							<GridItem key={"a" + index}>
								{item.inputType === "text" ||
									(item.inputType == "number" && (
										<Box>
											<Inputs
												id={item.id}
												label={item.label}
												type={item.inputType}
												name={item?.name}
												value={inputFields[item?.name]}
												onChange={handleChange}
												error={errors?.[item.name] && errors?.[item.name]}
											/>
										</Box>
									))}
								{item.inputType === "multiselect" && (
									<Flex direction={"column"} gap="3">
										<ChakraSelect
											id={item.id}
											label={item.label}
											name="user_uuid"
											value={selectedFunderName}
											onInputChange={handleInputChange}
											onChange={handleFundername}
											options={funders}
											error={errors?.[item.name] && errors?.[item.name]}
										/>
										<Box onClick={handleDistrictAddition} role="button">
											<Link to={"/role/SuperAdmin/Districts/AddNewDistrict"}>
												<Text
													textStyle={"p"}
													textDecoration="underline"
													cursor={"pointer"}
												>
													Add New District/School
												</Text>
											</Link>
										</Box>
									</Flex>
								)}
								{item.inputType === "date" && item.name === "start_date" && (
									<Box>
										<Inputs
											id={item.id}
											label={item.label}
											type="date"
											border="0px"
											bg="head2"
											name={item?.name}
											value={inputFields?.start_date}
											onChange={handleChange}
											w={{ base: "100%", md: "50%", lg: "70%" }}
											size="sm"
											rounded={"lg"}
											error={errors?.[item?.name] && errors?.[item?.name]}
										/>
									</Box>
								)}
								{item.inputType == "text" && showLicenseField ? (
									<Box>
										<Inputs
											id={item.id}
											label={item.label}
											type={item.inputType}
											name={item?.name}
											onChange={handleChange}
											error={errors?.[item.name] && errors?.[item.name]}
										/>
									</Box>
								) : null}

								{item.inputType === "date" && item.name === "end_date" && (
									<Box>
										<Inputs
											id={item?.id}
											label={item.label}
											type="date"
											border="0px"
											bg="head2"
											name={item?.name}
											value={inputFields?.end_date}
											onChange={handleChange}
											w={{ base: "100%", md: "50%", lg: "70%" }}
											size="sm"
											rounded={"lg"}
											error={errors?.[item?.name] && errors?.[item?.name]}
										/>
									</Box>
								)}
								{item.inputType === "radio" && item.name === "category" && (
									<Stack>
										<Label1 name={item?.id}>{item?.label}</Label1>
										<RadioGroup onChange={setCategory} value={category}>
											<Stack>
												<Radio value="0">
													<Label1>Platinum</Label1>
												</Radio>
												<Radio value="1">
													<Label1>Gold</Label1>
												</Radio>
											</Stack>
										</RadioGroup>
									</Stack>
								)}
							</GridItem>
						);
					})}
				</Grid>

				{inputFields.funder_type == "partner" ? (
					<LicenseExistPopup onClick={handleLicenseField} />
				) : null}

				<Center mt="10">
					<Flex minWidth="max-content" alignItems="center" gap="4">
						<NegativeButton text={negativeBtnText} onClick={handleCancel} />
						<PositiveButton
							type="submit"
							text={createBtnText}
							isLoading={loading}
							bg="#65a30d"
						/>
					</Flex>
				</Center>
			</form>
		</div>
	);
};

export default CreateLicense;
