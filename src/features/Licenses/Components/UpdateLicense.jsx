/** @format */

import {
	Box,
	Button,
	Center,
	Checkbox,
	Divider,
	Flex,
	Grid,
	GridItem,
	Image,
	Radio,
	RadioGroup,
	Spacer,
	Stack,
	Text,
	Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import { handleEndDate } from "../../../Utilities/utils";
import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import NavbarCardIcon from "../../../components/FitnessComponents/FitnessTexts/NavbarCardIcon";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import PositiveButton from "../../../components/PositiveButton";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
	deleteLicenseById,
	getLicenseById,
	setAddSchoolRequirements,
	setDeletedSchoolLicenseById,
	setDistrcitIDForDistrict,
	setDistrictState,
	setDistrictZipCode,
	setFunderLicenseStatus,
	setFunderName,
	setLicenseById,
	setLicensedSchoolLimit,
	setSchoolsAssignedToLicense,
	updateLicenseById,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { updateLicenseData } from "../Config";
import LicenseTabs from "./LicenseTabs";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";

const UpdateLicense = React.memo((props) => {
	const { LicenseFields, checkboxText } = updateLicenseData;
	const dispatch = useDispatch();
	const location = useLocation();
	const params = useParams();

	const token = useSelector((state) => state?.profile?.token);

	const licenseByIdData = useSelector(
		(state) => state?.superAdmin?.licenseData,
	);

	const selectedRole = useSelector((state) => state?.profile?.selectedRole);
	const loading = useSelector((state) => state?.superAdmin?.licenceLoading);
	const upLoading = useSelector((state) => state.profile.upLoading);
	const code = useSelector((state) => state.profile.code);

	const code2 = useSelector((state) => state.profile.code2);

	const deleteSchoolLicense = useSelector(
		(state) => state?.superAdmin?.deleteSchoolLicense,
	);

	const licenseStatus = useSelector(
		(state) => state?.superAdmin?.licenseStatus,
	);
	const updatedLicensedInformation = useSelector(
		(state) => state?.superAdmin?.updatedLicense,
	);
	const licenseInformation = useSelector(
		(state) => state?.superAdmin?.licenseData,
	);

	const [deletePopUp, setDeletePopUp] = useState(false);

	const updateLicenseByIdFields = {
		assigned: licenseByIdData?.assigned,
		end_date: licenseByIdData?.end_date?.split("T")[0],
		start_date: licenseByIdData?.start_date?.split("T")[0],
		funder_name: licenseByIdData?.funder_name,
		license_name: licenseByIdData?.license_name,
		funder_uuid: licenseByIdData?.funder_name,
		school_limit: licenseByIdData?.school_limit,
		status: licenseByIdData?.status,
		id: licenseByIdData?.license_id,
		uuid: licenseByIdData?.uuid,
		notes: licenseByIdData?.notes ? licenseByIdData?.notes : "",
		activeLicense: licenseByIdData?.activeLicense,
		inactiveLicense: licenseByIdData?.inactiveLicense,
	};

	const [inputFields, setInputFields] = useState(updateLicenseByIdFields);
	const [category, setCategory] = useState();
	const [initInputFields, setInitInputFields] = useState();
	const [errors, setErrors] = useState({});
	const [remainingSchoolLimit, setRemainingSchoolLimit] = useState(0);
	const [schools, setSchools] = useState([]);
	const [massUpdate, setMassUpdate] = useState(false);
	const [activeTab, setActiveTab] = useState(1);

	const handleChange = (e) => {
		if (e.target.name === "editEndDateOfAllSchool") {
			setInputFields({
				...inputFields,
				[e.target.name]: e.target.checked ? 1 : 0,
			});
		} else if (e.target.name === "start_date") {
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
	const handleSubmit = (event) => {
		event.preventDefault();

		dispatch(setPreviousPath(location.pathname));
		const {
			id,
			uuid,
			funder_uuid,
			notes,
			editEndDateOfAllSchool,
			funder_name,
			assigned,
			license_name,
			activeLicense,
			inactiveLicense,
			...payload
		} = inputFields;
		let errors = validateFormData(payload);

		if (!Object.keys(errors)?.length) {
			const finalPayload = {
				uuid,
				notes,
				license_name,
				editEndDateOfAllSchool,
				schools,
				...payload,
			};

			Object.keys(finalPayload).forEach((key) => {
				if (key !== "uuid" && finalPayload[key] === initInputFields[key]) {
					delete finalPayload[key];
				}
			});

			console.log(finalPayload, "finalPayload===>2");
			if (licenseByIdData?.category !== parseInt(category)) {
				finalPayload["category"] = parseInt(category);
			}
			const data = {
				bulkUpdate: massUpdate ? 1 : 0,
				...finalPayload,
			};

			dispatch(updateLicenseById({ body: data, token: token }));
			setErrors({});

			// setInputFields
		} else {
			setErrors(errors);
		}
	};

	const handleLicenseDelete = () => {
		dispatch(setPreviousPath(`/role/${selectedRole}/Licenses`));
	};

	const handleRemove = () => {
		dispatch(
			deleteLicenseById({ uuid: updateLicenseByIdFields?.uuid, token: token }),
		);
	};

	useEffect(() => {
		const remainingValue =
			parseInt(updateLicenseByIdFields?.school_limit) -
			parseInt(
				updateLicenseByIdFields?.assigned === null
					? 0
					: updateLicenseByIdFields?.assigned,
			);

		setRemainingSchoolLimit(remainingValue);

		setInputFields(updateLicenseByIdFields);

		setInitInputFields(updateLicenseByIdFields);
		dispatch(setSchoolsAssignedToLicense(licenseByIdData?.assigned));
		dispatch(setLicensedSchoolLimit(licenseByIdData?.school_limit));
		dispatch(setDistrictState(licenseByIdData?.district?.state));
		dispatch(setDistrictZipCode(licenseByIdData?.district?.zipcode));
		dispatch(
			setAddSchoolRequirements({
				state:
					licenseByIdData?.funder_type === "district"
						? licenseByIdData?.state
						: licenseByIdData?.district?.state,
				zipcode:
					licenseByIdData?.funder_type === "district"
						? licenseByIdData?.zipcode
						: licenseByIdData?.district?.zipcode,
				district_uuid:
					licenseByIdData?.funder_type === "district"
						? licenseByIdData?.funder_uuid
						: licenseByIdData?.district?.uuid,
			}),
		);
	}, [licenseByIdData]);

	useEffect(() => {
		dispatch(
			setLicensedSchoolLimit(
				updatedLicensedInformation?.data?.response?.school_limit,
			),
		);
	}, [updatedLicensedInformation]);
	useEffect(() => {
		licenseByIdData?.category?.toString() &&
			setCategory(licenseByIdData?.category?.toString());
	}, [licenseByIdData?.category]);

	useEffect(() => {
		dispatch(getLicenseById({ id: params?.licenseId, token: token }));

		dispatch(setDeletedSchoolLicenseById({}));
	}, []);

	useEffect(() => {
		if (massUpdate || schools?.length) {
			setMassUpdate(false);
			setSchools([]);
			setInputFields((prevState) => ({
				...prevState,
				editEndDateOfAllSchool: 0,
			}));
		}
	}, [activeTab]);

	useEffect(() => {
		if (!massUpdate && !schools?.length) {
			setInputFields((prevState) => ({
				...prevState,
				editEndDateOfAllSchool: 0,
			}));
		}
	}, [massUpdate, schools?.length]);

	useEffect(() => {
		return () => {
			dispatch(setLicenseById({}));
			dispatch(setAddSchoolRequirements({}));
		};
	}, []);

	useEffect(() => {
		if (licenseInformation?.funder_type === "district") {
			dispatch(setFunderName(licenseInformation?.district?.district_name));
			dispatch(setDistrcitIDForDistrict(licenseInformation?.district));
		} else {
			dispatch(setFunderName(licenseInformation?.state?.state_name));
			dispatch(setDistrcitIDForDistrict(licenseInformation?.state));
		}
		dispatch(setFunderLicenseStatus(licenseInformation?.status));
	}, [licenseInformation]);

	useEffect(() => {
		if (code == 200) {
			dispatch(getLicenseById({ id: params?.licenseId, token: token }));
		}
	}, [code]);

	useEffect(() => {
		if (code2 === 200) {
			setInputFields((prevState) => ({
				...prevState,
				assigned: deleteSchoolLicense?.assigned,
				activeLicense: deleteSchoolLicense?.activeLicense,
				inactiveLicense: deleteSchoolLicense?.inactiveLicense,
			}));

			setRemainingSchoolLimit(
				deleteSchoolLicense?.school_limit - deleteSchoolLicense?.assigned,
			);

			dispatch(setSchoolsAssignedToLicense(deleteSchoolLicense?.assigned));
		}
	}, [code2]);

	return (
		<>
			{loading ? (
				<Center h="100vh">
					<Image src={loading_img} />
				</Center>
			) : (
				<>
					<Flex>
						<Box mt="3">
							<Heading1>
								{inputFields?.["funder_name"]}
								<Text as="span" color={"primary"} marginLeft={2}>
									({licenseStatus})
								</Text>
							</Heading1>
						</Box>
						<Spacer />
						<Box onClick={handleLicenseDelete}>
							<Button
								onClick={() => {
									setDeletePopUp(true);
								}}
							>
								<Box mt="0.5">
									<Heading8>Delete</Heading8>
								</Box>
								<NavbarCardIcon
									elementIcon={RiDeleteBin5Line}
									changeIconColor={"red"}
								/>
							</Button>
						</Box>
					</Flex>

					<form onSubmit={handleSubmit}>
						<Grid
							templateColumns={{
								base: "repeat(1, 1fr)",
								lg: "repeat(2, 1fr)",
								md: "repeat(1, 1fr)",
							}}
							gap="4"
						>
							<GridItem>
								{LicenseFields?.map((item, index) => (
									<GridItem mt="2" key={"a" + index}>
										{item.inputType === "text" &&
											item?.name !== "school_limit" &&
											item.name !== "license_name" && (
												<Inputs
													id={item.Id}
													label={item.label}
													type="text"
													name={item?.name}
													value={inputFields[item?.name]}
													onChange={handleChange}
													isDisabled={item.isDisabled}
												/>
											)}

										{item.name == "license_name" &&
											licenseByIdData?.sub_license && (
												<Inputs
													id={item.Id}
													label={item.label}
													type="text"
													name={item?.name}
													value={inputFields[item?.name]}
													onChange={handleChange}
													isDisabled={item.isDisabled}
												/>
											)}
										{item.inputType === "date" && (
											<Inputs
												id={item.Id}
												label={item.label}
												type="date"
												name={item?.name}
												max={
													item?.name === "start_date"
														? inputFields?.["end_date"]
														: ""
												}
												min={
													item?.name === "end_date"
														? inputFields?.["start_date"]
														: ""
												}
												value={inputFields[item?.name]}
												onChange={handleChange}
											/>
										)}

										{item?.name === "end_date" && (
											<>
												<Checkbox
													id={"schoolCheck"}
													onChange={handleChange}
													isDisabled={!(massUpdate || schools?.length)}
													name="editEndDateOfAllSchool"
													isChecked={
														inputFields?.editEndDateOfAllSchool ? true : false
													}
												>
													<Label1 name={"schoolCheck"} textStyle={"p"}>
														{" "}
														{checkboxText}
													</Label1>
												</Checkbox>
												{!(schools?.length || massUpdate) ? (
													<Text color="red" fontSize="xs">
														Please Select atleast one school
													</Text>
												) : null}
											</>
										)}
									</GridItem>
								))}
							</GridItem>

							<GridItem>
								{LicenseFields?.map((item, index) => {
									return (
										<>
											{item.inputType === "number" &&
												item.name === "school_limit" && (
													<Box key={"ab" + index}>
														<Inputs
															id={item.Id}
															label={item.label}
															type={item.inputType}
															name={item?.name}
															value={inputFields[item?.name]}
															onChange={handleChange}
															isDisabled={item.isDisabled}
															error={
																errors?.[item?.name] && errors?.[item?.name]
															}
														/>
														{item?.name === "school_limit" && (
															<Flex gap={5}>
																<Box>
																	<Text fontSize={"xs"} ml="12px">
																		Assigned:
																		{inputFields["assigned"] !== null
																			? inputFields["assigned"]
																			: "0"}
																	</Text>
																	<Text fontSize={"xs"} ml="12px">
																		Remaining:
																		{remainingSchoolLimit}
																	</Text>
																</Box>

																<Box>
																	<Text fontSize={"xs"} ml="12px">
																		Active License:
																		{inputFields?.["activeLicense"]
																			? inputFields["activeLicense"]
																			: "0"}
																	</Text>
																	<Text fontSize={"xs"} ml="12px">
																		Inactive License:
																		{inputFields?.["inactiveLicense"]
																			? inputFields?.["inactiveLicense"]
																			: 0}
																	</Text>
																</Box>
															</Flex>
														)}
													</Box>
												)}
											{item.inputType === "radio" &&
												item.name === "category" && (
													<Box>
														<Label1 name={item?.id}>{item?.label}</Label1>
														<RadioGroup onChange={setCategory} value={category}>
															<Stack direction="row">
																<Radio value="0">
																	<Label1>Platinum</Label1>
																</Radio>
																<Radio value="1">
																	<Label1>Gold</Label1>
																</Radio>
															</Stack>
														</RadioGroup>
													</Box>
												)}
										</>
									);
								})}

								{LicenseFields?.map((item, index) => {
									return (
										item?.name === "notes" && (
											<Box key={"abc" + index}>
												<Label1 name={item?.Id}>{item?.label}</Label1>
												<Box h="80%">
													<Textarea
														id={item.Id}
														background="#F5F9FF"
														h="full"
														border="none"
														name="notes"
														onChange={handleChange}
														value={inputFields?.notes}
														w={{ base: "100%", md: "90%", lg: "90%" }}
													></Textarea>
												</Box>
											</Box>
										)
									);
								})}
							</GridItem>
						</Grid>
						{deletePopUp && (
							<DeletePopUp
								setDeletePopUp={setDeletePopUp}
								deletePopUp={deletePopUp}
								text={"Are you sure you want to delete the district license?"}
								onClick={handleRemove}
							/>
						)}{" "}
						<Center p="4">
							<PositiveButton
								type="submit"
								text="Update License"
								isLoading={upLoading}
								increaseTextSize="paragraph2ColorBlackIncreaseText"
							/>
						</Center>
					</form>

					<Divider borderColor="gray" />
					<LicenseTabs
						setSchools={setSchools}
						setMassUpdate={setMassUpdate}
						massUpdate={massUpdate}
						setActiveTab={setActiveTab}
						activeTab={activeTab}
					/>
				</>
			)}
		</>
	);
});

export default UpdateLicense;
