import { Box, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import {
	getTestItemsList,
	setAddMandate,
	updateMandate,
} from "../../../DistrictAdminApis/districtAdminSlice";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { addMandatesData } from "../Config";
const EditMandates = () => {
	const { inputFields, editBtnText, negativeBtnText, editTitle } =
		addMandatesData;

	const dispatch = useDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const mandate = location?.state?.mandate;

	const [data, setData] = useState({
		title: "",
		start_date: "",
		end_date: "",
		required: "",
		schools: [],
		tests: [],
	});

	const userId = useSelector((state) => state.profile.userId);
	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const token = useSelector((state) => state.profile.token);
	const schoolsList = useSelector((state) => state.teacher.schools);
	const loading = useSelector((state) => state?.profile?.upLoading);
	const testItemsList = useSelector(
		(state) => state?.districtAdmin?.testItemsList,
	);

	const [schools, setSchools] = useState();
	const [testItems, setTestItems] = useState();
	const [selectedSchools, setSelectedSchools] = useState([]);
	const [selectedTestItems, setSelectedTestItems] = useState([]);
	const [errors, setErrors] = useState({});

	const handleSchools = (schoolsList) => {
		let all_value = null;
		if (schoolsList?.length) {
			for (let school of schoolsList) {
				if (school.label == "All") {
					all_value = school;
					break;
				}
			}
		}

		if (all_value) {
			setSelectedSchools([all_value]);

			setData((prevState) => ({
				...prevState,
				schools: all_value.value,
			}));
			setErrors((prevState) => ({
				...prevState,
				schools: "",
			}));
		} else {
			setSelectedSchools(schoolsList);

			setData((prevState) => ({
				...prevState,
				schools: schoolsList?.map((item) => item?.value),
			}));
			setErrors((prevState) => ({
				...prevState,
				schools: "",
			}));
		}
		if (!schoolsList.length)
			setErrors((prevState) => ({
				...prevState,
				schools: "Please Select Schools",
			}));
	};

	const handleTestItems = (testItemsList) => {
		const testItems = testItemsList?.map((item) => item?.value);
		if (
			((testItems.includes("HANDGRIP(LB)") &&
				data.tests?.includes("HANDGRIP(KG)")) ||
				(testItems.includes("HANDGRIP(KG)") &&
					data.tests?.includes("HANDGRIP(LB)"))) &&
			data?.required == 1
		) {
			dispatch(
				setMessage("You can not select both HANDGRIP(KG) and HANDGRIP(LB)"),
			);
			return null;
		}
		setSelectedTestItems(testItemsList);

		setData((prevState) => ({
			...prevState,
			tests: testItems,
		}));
		setErrors((prevState) => ({
			...prevState,
			tests: "",
		}));

		if (!testItemsList.length)
			setErrors((prevState) => ({
				...prevState,
				tests: "Please Select TestItems",
			}));
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();
		if (name == "required") {
			setData((prevData) => ({ ...prevData, tests: [] }));
			setSelectedTestItems([]);
		}
		if (name == "title") {
			setData((prevData) => ({ ...prevData, [name]: value }));
		} else {
			setData((prevData) => ({ ...prevData, [name]: trimmedValue }));
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

	const handleBlur = (e) => {
		const { name, value } = e.target;
		const trimmedValue = value.trim();

		setData({ ...data, [name]: trimmedValue });
	};
	useEffect(() => {
		schoolsList?.length && setSchools(schoolsList);
		let schoolOptions = [];

		const schoolUuidArray =
			schoolsList?.length &&
			schoolsList.map((each) => {
				schoolOptions.push({ label: each.school_name, value: each.uuid });
				return each.uuid;
			});

		schoolOptions.unshift({ label: "All", value: schoolUuidArray });

		setSchools(schoolOptions);
	}, [schoolsList]);

	useEffect(() => {
		testItemsList?.length && setTestItems(testItemsList);

		let testOptions = testItemsList.map((item) => {
			return { label: item, value: item };
		});

		setTestItems(testOptions);
	}, [testItemsList]);

	useEffect(() => {
		dispatch(getTestItemsList(token));
	}, []);

	useEffect(() => {
		if (Object.keys(mandate)?.length) {
			setData({
				title: mandate?.title,
				start_date: mandate?.start_date,
				end_date: mandate?.end_date,
				required: mandate?.required === true ? "1" : "0",
				schools: mandate?.SchoolMandates?.map((school) => school.uuid),
				tests: mandate?.tests?.map((test) => test),
			});
			if (mandate?.SchoolMandates.length) {
				let arr = mandate?.SchoolMandates?.map((school) => ({
					label: school.school_name,
					value: school.uuid,
				}));
				setSelectedSchools(arr);
			}

			if (mandate?.tests.length) {
				let testArr = mandate?.tests?.map((test) => ({
					label: test,
					value: test,
				}));
				setSelectedTestItems(testArr);
			}
		}
	}, [mandate]);

	const formSubmitted = (event) => {
		event.preventDefault();

		let errorObj = validateFormData(data);

		setErrors(errorObj);

		if (Object.keys(errorObj)?.length === 0) {
			const finalObject = {
				...data,

				updated_by: userId,
				updated_role: selectedRole,
			};
			let mandateId = mandate?.uuid;

			dispatch(updateMandate({ token, finalObject, mandateId }));
		}
	};

	return (
		<Flex direction="column" gap="4" m={{ base: "0", md: "4" }}>
			<Heading1>{editTitle}</Heading1>
			<form onSubmit={formSubmitted}>
				<Flex
					w={{ base: "100%", md: "60%", lg: "50%", xl: "40%", "2xl": "30%" }}
					direction="column"
					gap="1"
				>
					{inputFields?.map((field, id) => {
						return (
							<Box key={"a" + id}>
								{field.inputType !== "select" ? (
									<Inputs
										id={field?.Id}
										label={field.label}
										onChange={handleChange}
										type={field.inputType}
										onBlur={handleBlur}
										name={field.name}
										value={data?.[field.name]}
										min={field.name === "end_date" ? data.start_date : null}
										max={field.name === "start_date" ? data.end_date : null}
										error={errors[field.name] ? errors[field.name] : ""}
									/>
								) : field.name === "required" ? (
									<SingleSelect2
										id={field?.Id}
										label={field.label}
										onChange={handleChange}
										name={field?.name}
										placeholder={field.placeholder}
										optionsProps={field.options}
										displayKey={"label"}
										optionValue={"value"}
										value={data?.required}
										error={errors[field.name] ? errors[field.name] : ""}
									/>
								) : (
									<Box>
										<MultiSelector
											id={field?.Id}
											label={field.label}
											options={
												field.name === "schools"
													? selectedSchools?.[0]?.label != "All"
														? schools
														: schools
													: selectedTestItems?.[0]?.label != "All"
													? testItems
													: []
											}
											onChange={
												field.name === "schools"
													? handleSchools
													: handleTestItems
											}
											value={
												field.name === "schools"
													? selectedSchools
													: selectedTestItems
											}
											error={errors[field.name] ? errors[field.name] : ""}
										/>
									</Box>
								)}
							</Box>
						);
					})}

					<Flex
						marginTop="2rem"
						justifyContent="center"
						gap={8}
						w={{ base: "100%", md: "90%" }}
					>
						<NegativeButton
							text={negativeBtnText}
							onClick={() => {
								dispatch(setAddMandate(""));
								navigate("/role/DistrictAdmin/manage-mandates");
							}}
						/>
						<PositiveButton
							text={editBtnText}
							isLoading={loading}
							type="submit"
						/>
					</Flex>
				</Flex>
			</form>
		</Flex>
	);
};

export default EditMandates;
