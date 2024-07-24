import {
	Box,
	Button,
	Checkbox,
	Flex,
	Grid,
	GridItem,
	HStack,
	Image,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import excel from "../../../../assets/Images/FitnessGramEventImages/excel.svg";

import { useDispatch, useSelector } from "react-redux";

import { FcClearFilters } from "react-icons/fc";
import {
	getCompletionReportApiCall,
	getDataExportFilter,
	getDataExportFilterStateAdmin,
	getLicenseDistricts,
	getOverviewReportApiCall,
	getPartnerLicenses,
	getSchoolsInDistrictsForStateAndPartner,
	getStudentsListForReportsApiCall,
	setInitialPayloadForReports,
	setLicenseDistricts,
	setSchoolsInDistrictsForStateAndPartner,
	setSelectedStudentUUIDForReport,
} from "../../../../DistrictAdminApis/districtAdminSlice";

import moment from "moment";
import { academicYear, debounce } from "../../../../Utilities/utils";
import {
	getClassesList,
	setTotalPages,
} from "../../../../features/teacher/teacherSlice";
import {
	getStudentReportApiCall,
	setLoading2,
	setMessage,
} from "../../../../store/slices/profileSlice";
import InputDate from "../../../FitnessComponents/FitnessSelect/InputDate";
import Inputs from "../../../FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect from "../../../FitnessComponents/FitnessSelect/SingleSelect";
import SingleSelect2 from "../../../FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../FitnessComponents/FitnessTexts/Heading1";
import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";
import ParagraphWithColorPrimary from "../../../FitnessComponents/FitnessTexts/ParagraphWithColorPrimary";
import {
	completionReportFilters,
	dataExportFiltersData,
	gradeOptionsList,
	studentReportFilters,
	testTypeOptionsList,
} from "../Config/config";
import ErrorText from "../../../FitnessComponents/FitnessTexts/ErrorText";
import PositiveButton from "../../../PositiveButton";

export const initialPayload = {
	"FitnessGram Student Report": {
		schools: [],
		classes: [],
		search: "",
		age: "",
		grades: [],
		gender: [],
		test_type: [],
		start_date: "",
		end_date: "",
		student_id: false,
		student_name: true,
		body_composition: true,
		complete_student_history: false,
		report_in_spanish: false,
		academic_year: "",
		size: 100,
		skip: 1,
	},

	dataExport: {
		schools: [],
		classes: [],
		grades: [],
		districts: [],
		start_date: "",
		end_date: "",
		academic_year: "",
		hashType: 0,
	},

	"FitnessGram Completion Report": {
		schools: [],
		classes: [],
		grades: [],
		test_type: [],
		districts: [],
		age: "",
		academic_year: "",
		start_date: "",
		end_date: "",
		pageNo: 1,
	},
	"FitnessGram Overview Report": {
		schools: [],
		classes: [],
		grades: [],
		test_type: [],
		districts: [],
		age: "",
		academic_year: "",
		start_date: "",
		end_date: "",
		pageNo: 1,
	},
};

const ReportFilters = (props) => {
	const { isFilterOpenedFirstTime, setIsFilterOpenedFirstTime } = props;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const dispatch = useDispatch();
	const totalPages = useSelector((state) => state.teacher.totalPages);

	const token = useSelector((state) => state.profile.token);

	const schoolsList = useSelector((state) => state.teacher.schools);
	const schoolsInDistrictsForStateAndPartner = useSelector(
		(state) => state.districtAdmin.schoolsInDistrictsForStateAndPartner,
	);
	const schoolAcademicYear = useSelector(
		(state) => state.districtAdmin.schoolAcademicYear,
	);

	const reportPayload = useSelector(
		(state) => state.districtAdmin.initialPayloadForReports,
	);

	const classesList = useSelector((state) => state.teacher.classes);
	const partnerLicensesList = useSelector(
		(state) => state.districtAdmin.partnerLicenses,
	);
	const loading = useSelector((state) => state.profile.upLoading);
	const selectedRole = useSelector((state) => state.profile.selectedRole);

	const loggedInUserDetails = useSelector(
		(state) => state?.profile?.loggedInUserDetails,
	);

	const reportFilterFormDataObject = useSelector(
		(state) => state?.districtAdmin?.reportFilterFormDataObject,
	);

	const date = new Date();

	const reportFilter = useSelector((state) => state.districtAdmin.reportFilter);

	const reportInSpanish = useSelector(
		(state) => state?.districtAdmin?.reportInSpanish,
	);

	const [schools, setSchools] = useState([]);

	const [selectedSchools, setSelectedSchools] = useState([]);

	const [isParentChanged, setIsParentChanged] = useState(true); //to handle subsequent apis like districts, schools and classes where it has parent list and searchTerm

	const [partnerLicenses, setPartnerLicenses] = useState([]);

	const [selectedPartnerLicenses, setSelectedPartnerLicenses] = useState([]);

	const [selectedDate, setSelectedDate] = useState({
		start_date: "",
		end_date: "",
	});
	const [isCalendarOpen, setIsCalendarOpen] = useState({
		start_date: false,
		end_date: false,
	});

	const reportInputFields = {
		"FitnessGram Student Report": studentReportFilters,
		dataExport: dataExportFiltersData,
		"FitnessGram Completion Report": completionReportFilters,
		"FitnessGram Overview Report": completionReportFilters,
	};

	const API_CALL_OBJ = {
		"FitnessGram Student Report": (payload) => {
			dispatch(getStudentsListForReportsApiCall({ finalObj: payload, token }));
		},

		"FitnessGram Completion Report": (payload) => {
			if (!["stateAdmin", "partner"].includes(selectedRole) && totalPages) {
				dispatch(setTotalPages(0));
			}
			dispatch(getCompletionReportApiCall({ body: payload, token }));
		},
		"FitnessGram Overview Report": (payload) => {
			dispatch(getOverviewReportApiCall({ body: payload, token }));
		},
	};

	const [classes, setClasses] = useState([]);

	const [selectedClasses, setSelectedClasses] = useState([]);

	const [grades, setGrades] = useState([]);

	const [selectedGrades, setSelectedGrades] = useState([]);

	const [testTypes, setTestTypes] = useState([]);

	const [selectedTestTypes, setSelectedTestTypes] = useState([]);

	const [districts, setDistricts] = useState([]);

	const [selectedDistricts, setSelectedDistricts] = useState([]);

	const [fieldsList, setFieldsList] = useState(dataExportFiltersData);

	const districtsForStateAdminOrPartner = useSelector(
		(state) => state?.districtAdmin?.licenseDistricts,
	);
	const licensesForPartner = useSelector(
		(state) => state?.superAdmin?.districtsForStateOrPartner,
	);

	const userId = useSelector((state) => state.profile.userId);

	const [formData, setFormData] = useState({});

	const [errors, setErrors] = useState({});
	const [academicYear, setAcademicYear] = useState([]);

	function academicYears() {
		const month = date.getMonth();
		const year = date.getFullYear();

		const optionsArray = [];
		if (month >= 6) {
			for (let i = year; i >= 2023; i--) {
				optionsArray.push(`${i}-${i + 1}`);
			}
		} else {
			for (let i = year; i > 2023; i--) {
				optionsArray.push(`${i - 1}-${i}`);
			}
		}
		return optionsArray;
	}

	const handleCalendarClick = (text) => {
		text == "start_date"
			? setIsCalendarOpen((prevState) => ({
					...prevState,
					start_date: !isCalendarOpen.start_date,
			  }))
			: setIsCalendarOpen((prevState) => ({
					...prevState,
					end_date: !isCalendarOpen.end_date,
			  }));
	};

	const handleChangeDateFromCalendar = (e, text = "") => {
		if (text == "start_date") {
			setSelectedDate((prevState) => ({
				...prevState,
				start_date: e,
			}));
			const date = moment(e).format("DD MMMM YYYY");
			setFormData((prevState) => ({ ...prevState, start_date: date }));
		} else {
			setSelectedDate((prevState) => ({
				...prevState,
				end_date: e,
			}));
			const date = moment(e).format("DD MMMM YYYY");
			setFormData((prevState) => ({ ...prevState, end_date: date }));
		}
	};

	const handleSchools = (selectedSchoolsList) => {
		if (selectedSchoolsList?.length) {
			if (
				selectedSchoolsList?.length > 1 &&
				selectedSchoolsList[0].label == "All"
			) {
				if (selectedSchoolsList[1].label === "All") {
					return;
				}
				setSelectedSchools([selectedSchoolsList?.[1]]);

				setFormData((prevState) => ({
					...prevState,
					schools: [selectedSchoolsList[1]?.value],
				}));
			} else {
				let all_value = null;

				if (selectedSchoolsList?.length) {
					for (let school of selectedSchoolsList) {
						if (school.label == "All") {
							all_value = school;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedSchools([all_value]);

					setFormData((prevState) => ({
						...prevState,
						schools: all_value?.value,
					}));
				} else {
					setSelectedSchools(selectedSchoolsList);
					setFormData((prevState) => ({
						...prevState,
						schools: selectedSchoolsList?.map((school) => school.value),
					}));
				}
			}
		} else {
			setSelectedSchools([]);
			if (!["stateAdmin", "partner"].includes(selectedRole)) {
				setSelectedClasses([]);
				setFormData((prevState) => ({
					...prevState,
					schools: null,
					classes: null,
				}));
			} else {
				setFormData((prevState) => ({
					...prevState,
					schools: null,
				}));
			}
		}
		if (!["stateAdmin", "partner"].includes(selectedRole)) {
			setIsParentChanged(true);
		}
	};

	const handleClasses = (selectedClassesList) => {
		if (selectedClassesList?.length) {
			if (
				selectedClassesList?.length > 1 &&
				selectedClassesList[0].label === "All"
			) {
				if (selectedClassesList[1].label === "All") {
					return;
				}
				setSelectedClasses([selectedClassesList?.[1]]);
				setFormData((prevState) => ({
					...prevState,
					classes: [selectedClassesList[1]?.value],
				}));
			} else {
				let all_value = null;

				if (selectedClassesList?.length) {
					for (let clas of selectedClassesList) {
						if (clas.label == "All") {
							all_value = clas;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedClasses([all_value]);

					setFormData((prevState) => ({
						...prevState,
						classes: all_value.value,
					}));
				} else {
					setSelectedClasses(selectedClassesList);

					setFormData((prevState) => ({
						...prevState,
						classes: selectedClassesList?.map((item) => item?.value),
					}));
				}
			}
		} else {
			setSelectedClasses([]);
			setFormData((prevState) => ({
				...prevState,
				classes: null,
			}));
		}
	};
	const handlePartnerLicenses = (selectedLicensesList) => {
		if (selectedLicensesList?.length) {
			if (
				selectedLicensesList?.length > 1 &&
				selectedLicensesList[0].label === "All"
			) {
				if (selectedLicensesList[1].label === "All") {
					return;
				}
				setSelectedPartnerLicenses([selectedLicensesList?.[1]]);

				setFormData((prevState) => ({
					...prevState,
					licenses: [selectedLicensesList[1]?.value],
				}));
			} else {
				let all_value = null;

				if (selectedLicensesList?.length) {
					for (let license of selectedLicensesList) {
						if (license.label == "All") {
							all_value = license;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedPartnerLicenses([all_value]);

					setFormData((prevState) => ({
						...prevState,
						licenses: all_value.value,
					}));
				} else {
					setSelectedPartnerLicenses(selectedLicensesList);

					setFormData((prevState) => ({
						...prevState,
						licenses: selectedLicensesList?.map((item) => item?.value),
					}));
				}
			}
		} else {
			setSelectedPartnerLicenses([]);
			setSelectedDistricts([]);
			setSelectedSchools([]);
			setFormData((prevState) => ({
				...prevState,
				licenses: null,
				districts: null,
				schools: null,
			}));
		}
		setIsParentChanged(true);
	};

	const handleGrades = (selectedGradesList) => {
		if (selectedGradesList?.length) {
			if (
				selectedGradesList?.length > 1 &&
				selectedGradesList[0].label === "All"
			) {
				if (selectedGradesList[1].label === "All") {
					return;
				}
				setSelectedGrades([selectedGradesList?.[1]]);

				setFormData((prevState) => ({
					...prevState,
					grades: [selectedGradesList[1]?.value],
				}));
			} else {
				let all_value = null;
				if (selectedGradesList?.length) {
					for (let clas of selectedGradesList) {
						if (clas.label == "All") {
							all_value = clas;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedGrades([all_value]);

					setFormData((prevState) => ({
						...prevState,
						grades: all_value.value,
					}));
				} else {
					setSelectedGrades(selectedGradesList);

					setFormData((prevState) => ({
						...prevState,
						grades: selectedGradesList?.map((item) => item?.value),
					}));
				}
			}
		} else {
			setSelectedGrades([]);
			setFormData((prevState) => ({
				...prevState,
				grades: null,
			}));
		}
	};

	const handleTestType = (selectedTestsList) => {
		if (selectedTestsList?.length) {
			if (
				selectedTestsList?.length > 1 &&
				selectedTestsList[0].label === "All"
			) {
				setSelectedTestTypes([selectedTestsList?.[1]]);

				setFormData((prevState) => ({
					...prevState,
					test_type: [selectedTestsList[1]?.value],
				}));
			} else {
				let all_value = null;
				if (selectedTestsList?.length) {
					for (let clas of selectedTestsList) {
						if (clas.label == "All") {
							all_value = clas;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedTestTypes([all_value]);

					setFormData((prevState) => ({
						...prevState,
						test_type: all_value.value,
					}));
				} else {
					setSelectedTestTypes(selectedTestsList);

					setFormData((prevState) => ({
						...prevState,
						test_type: selectedTestsList?.map((item) => item?.value),
					}));
				}
			}
		} else {
			setSelectedTestTypes([]);
			setFormData((prevState) => ({
				...prevState,
				test_type: null,
			}));
		}
	};

	const handleDistricts = (selectedDistrictsList) => {
		if (selectedDistrictsList?.length) {
			if (
				selectedDistrictsList?.length > 1 &&
				selectedDistrictsList[0].label === "All"
			) {
				if (selectedDistrictsList[1].label === "All") {
					return;
				}
				setSelectedDistricts([selectedDistrictsList?.[1]]);

				setFormData((prevState) => ({
					...prevState,
					districts: [selectedDistrictsList[1]?.value],
				}));
			} else {
				let all_value = null;
				if (selectedDistrictsList?.length) {
					for (let clas of selectedDistrictsList) {
						if (clas.label == "All") {
							all_value = clas;
							break;
						}
					}
				}

				if (all_value) {
					setSelectedDistricts([all_value]);

					setFormData((prevState) => ({
						...prevState,
						districts: all_value.value,
					}));
				} else {
					setSelectedDistricts(selectedDistrictsList);

					setFormData((prevState) => ({
						...prevState,
						districts: selectedDistrictsList?.map((item) => item?.value),
					}));
				}
			}
		} else {
			setSelectedDistricts([]);
			setSelectedSchools([]);
			setFormData((prevState) => ({
				...prevState,
				districts: null,
				schools: null,
			}));
		}

		setIsParentChanged(true);
	};

	const handleChange = (event) => {
		if (event.target.type === "checkbox") {
			const { name, checked } = event.target;
			if (reportFilter === "FitnessGram Student Report") {
				if (name === "student_id" && !formData.student_name && !checked) {
					return dispatch(
						setMessage("Either Student Name or Student ID is required"),
					);
				}
				if (name === "student_name" && !formData.student_id && !checked) {
					return dispatch(
						setMessage("Either Student Name or Student ID is required"),
					);
				}
			}

			setFormData((prevState) => ({
				...prevState,
				[event.target.name]: event.target.checked,
			}));
		} else {
			setFormData((prevState) => ({
				...prevState,
				[event.target.name]: event.target.value,
			}));
		}
	};

	const handleInitialSchools = (list) => {
		if (list?.length) {
			let schoolsOptions = [];

			const schoolUuidArray = list?.map((each) => {
				schoolsOptions.push({
					label: each?.school_name,
					value: each?.uuid,
				});

				return each?.uuid;
			});

			if (!["partner", "stateAdmin"].includes(selectedRole)) {
				schoolsOptions.unshift({ label: "All", value: schoolUuidArray });
			} else {
				schoolsOptions.unshift({ label: "All", value: [] });
			}

			if (isParentChanged) {
				setSelectedSchools([{ label: "All", value: [] }]);
				setFormData((prevState) => ({
					...prevState,
					schools: [],
				}));
			}
			setSchools(schoolsOptions);
		} else {
			setSchools([]);
		}
		if (["stateAdmin", "partner"].includes(selectedRole) && isParentChanged) {
			setIsParentChanged(false);
		}
	};
	const handleRunFilters = () => {
		if (!Object.values(formData).includes(null)) {
			if (reportFilter == "dataExport") {
				const finalPayload = {
					...formData,
					hashType: formData?.hashType ? parseInt(formData?.hashType) : 0,
				};
				if (selectedRole.includes("state")) {
					dispatch(getDataExportFilterStateAdmin({ token, finalPayload }));
				} else {
					dispatch(getDataExportFilter({ token, finalPayload }));
				}
			} else if (reportFilter == "FitnessGram Student Report") {
				if (selectedRole === "student") {
					const finalObj = {
						...formData,
						school_uuids: formData?.schools,
					};

					dispatch(getStudentReportApiCall({ body: finalObj, token }));
					dispatch(setInitialPayloadForReports(finalObj));
				} else {
					const finalObj = {
						...formData,
						size: 20,
						skip: 1,
						search: "",
					};

					dispatch(setInitialPayloadForReports(finalObj));
					API_CALL_OBJ[reportFilter](finalObj);
				}

				dispatch(setSelectedStudentUUIDForReport(null));
			} else {
				const finalPayload = {
					...formData,
					pageNo: 1,
				};
				dispatch(setInitialPayloadForReports(finalPayload));
				API_CALL_OBJ[reportFilter](finalPayload);
				// dispatch(setLoading2(true));
			}

			onClose();
		}
	};

	const handleInputChangeLicenses = debounce((text) => {
		let payload = {
			search: text,
		};
		if (text?.length > 1) {
			dispatch(getPartnerLicenses({ body: payload, token }));
		}
	}, 500);

	const handleInputChangeDistricts = debounce((text) => {
		if (text?.length > 1) {
			dispatch(
				getLicenseDistricts({
					body: { search: text, licenses: formData.licenses },
					token,
				}),
			);
		}
	}, 500);

	const handleInputChangeSchools = debounce((text) => {
		if (text?.length > 1) {
			dispatch(
				getSchoolsInDistrictsForStateAndPartner({
					data: { search: text, licenses: formData.districts },
					token,
				}),
			);
		}
	}, 500);

	const handleInputClasses = debounce((text) => {
		if (text?.length > 1) {
			let payLoad = {
				schools: formData?.schools ? formData?.schools : [],
				search: text,
			};
			dispatch(getClassesList({ body: payLoad, token }));
		}
	}, 500);

	useEffect(() => {
		if (
			isOpen &&
			["stateAdmin", "partner"].includes(selectedRole) &&
			selectedDistricts?.length
		) {
			dispatch(
				getSchoolsInDistrictsForStateAndPartner({
					token,
					data: {
						districts: formData.districts,
						search: "",
					},
				}),
			);
		}
	}, [selectedDistricts]);
	useEffect(() => {
		if (
			isOpen &&
			selectedRole === "partner" &&
			selectedPartnerLicenses?.length
		) {
			dispatch(
				getLicenseDistricts({
					body: { search: "", licenses: formData.licenses },
					token,
				}),
			);
		}
	}, [selectedPartnerLicenses]);

	useEffect(() => {
		!["stateAdmin", "partner"].includes(selectedRole) &&
			isOpen &&
			selectedSchools?.length &&
			dispatch(
				getClassesList({
					body: { schools: formData?.schools },
					token,
				}),
			);
	}, [selectedSchools]);

	useEffect(() => {
		if (
			isOpen &&
			!["stateAdmin", "partner"].includes(selectedRole) &&
			selectedSchools?.length
		) {
			if (classesList?.length) {
				let classOptions = [];
				const classUuidArr = classesList.map((each) => {
					classOptions.push({ label: each.class_name, value: each.uuid });
					return each.uuid;
				});
				classOptions.unshift({ label: "All", value: [] });

				if (isParentChanged) {
					setSelectedClasses([{ label: "All", value: [] }]);
					setFormData((prevState) => ({
						...prevState,
						classes: [],
					}));
				}

				setClasses(classOptions);
			} else {
				isParentChanged && !formData?.classes?.length && setSelectedClasses([]);
				setClasses([]);
			}

			isParentChanged && setIsParentChanged(false);
		}
	}, [classesList]);

	useEffect(() => {
		if (isOpen === true && selectedRole === "partner") {
			if (partnerLicensesList?.length) {
				let partnerLicensesOptions = [];
				const licenseUuidArr = partnerLicensesList.map((each) => {
					partnerLicensesOptions.push({
						label: `${each.funder_name} - ${each.license_name}`,
						value: each.uuid,
					});
					return each.uuid;
				});

				partnerLicensesOptions.unshift({ label: "All", value: [] });

				if (!selectedPartnerLicenses?.length) {
					setSelectedPartnerLicenses([{ label: "All", value: [] }]);
				}
				setPartnerLicenses(partnerLicensesOptions);
			} else {
				setPartnerLicenses([]);
			}
		}
	}, [partnerLicensesList]);

	useEffect(() => {
		if (isOpen === true && ["stateAdmin", "partner"].includes(selectedRole)) {
			if (districtsForStateAdminOrPartner?.length) {
				let districtsOptions = [];

				const districtUUidArray = districtsForStateAdminOrPartner?.map(
					(each) => {
						districtsOptions.push({
							label: each?.district_name,
							value: each?.uuid,
						});

						return each?.uuid;
					},
				);

				if (isParentChanged) {
					setSelectedDistricts([{ label: "All", value: [] }]);
					setFormData((prevState) => ({
						...prevState,
						districts: [],
					}));
				}

				setDistricts(districtsOptions);
			} else {
				setDistricts([]);
			}
		}
	}, [districtsForStateAdminOrPartner]);
	useEffect(() => {
		if (isOpen === true && ["stateAdmin", "partner"].includes(selectedRole)) {
			handleInitialSchools(schoolsInDistrictsForStateAndPartner);
		}
	}, [schoolsInDistrictsForStateAndPartner]);

	useEffect(() => {
		if (isOpen == true && !isFilterOpenedFirstTime) {
			setIsFilterOpenedFirstTime(true);
			const academicYearsArr = schoolAcademicYear?.years || academicYears();

			setAcademicYear([...academicYearsArr]);

			if (
				selectedRole === "student" &&
				reportFilter === "FitnessGram Student Report"
			) {
				const { age, grade, ...payload } = reportPayload;

				setFormData({ ...payload });
			} else {
				setFormData({
					...reportPayload,
				});
			}

			setFieldsList(reportInputFields[reportFilter]);
			if (!["stateAdmin", "partner"].includes(selectedRole)) {
				handleInitialSchools(schoolsList);
			}

			if (selectedRole !== "student") {
				if (gradeOptionsList?.length) {
					let gradeOptions = [];

					const gradeUuidArray = gradeOptionsList?.map((each) => {
						gradeOptions.push({ label: each?.lable, value: each?.value });

						return each?.value;
					});

					gradeOptions.unshift({ label: "All", value: [] });

					setSelectedGrades([{ label: "All", value: [] }]);

					setGrades(gradeOptions);
				}
			}

			if (testTypeOptionsList?.length) {
				let testOptions = [];

				const testUuidArray = testTypeOptionsList?.map((each) => {
					testOptions.push({ label: each?.lable, value: each?.value });

					return each?.value;
				});

				testOptions.unshift({ label: "All", value: testUuidArray });

				setSelectedTestTypes([{ label: "All", value: testUuidArray }]);

				setTestTypes(testOptions);
			}
			if (selectedRole === "stateAdmin") {
				dispatch(
					getLicenseDistricts({
						body: { search: "", licenses: [] },
						token,
					}),
				);
			} else if (selectedRole === "partner") {
				dispatch(getPartnerLicenses({ body: { search: "" }, token }));
			}
			setSelectedDate({
				start_date: moment(reportPayload?.start_date).format("DD MMMM YYYY"),
				end_date: moment(reportPayload?.end_date).format("DD MMMM YYYY"),
			});
		}
		setIsCalendarOpen({
			start_date: false,
			end_date: false,
		});
	}, [isOpen]);

	useEffect(() => {
		return () => {
			setFormData({});
			dispatch(setSchoolsInDistrictsForStateAndPartner([]));
		};
	}, []);

	return (
		<>
			{reportFilter == "dataExport" ||
			location.pathname == `/role/${selectedRole}/reports` ? (
				<Flex justify={"end"}>
					<Box
						gap="2"
						cursor="pointer"
						px="4"
						py="0.4rem"
						rounded="3xl"
						display={{ base: "none", md: "flex", lg: "flex " }}
						alignItems="center"
						bg="green"
						onClick={onOpen}
					>
						<Text textStyle={"textHead"} color="white">
							View Report
						</Text>
						{loading ? <Spinner color="white" /> : <Image src={excel} w={5} />}
					</Box>
				</Flex>
			) : (
				<HStack
					bg="fit"
					p="2"
					rounded={"lg"}
					display={{ base: "none", lg: "flex", md: "flex" }}
					cursor={"pointer"}
					onClick={onOpen}
				>
					<Paragraph2 textColor="white">Report filters</Paragraph2>

					<FcClearFilters color="white" size={20} />
				</HStack>
			)}

			{reportFilter == "dataExport" ||
			location.pathname == `/role/${selectedRole}/reports` ? (
				<Flex justify={"end"} display={{ base: "block", md: "none" }}>
					<Flex
						cursor={"pointer"}
						display={"flex"}
						gap="2"
						rounded="3xl"
						bg="green"
						// px='4.5rem'
						w="full"
						justifyContent="center"
						py="2"
						onClick={() => handleDownload()}
					>
						<Text textStyle={"textHead"} color="white">
							{["districtAdmin", "superAdmin"].includes(selectedRole) &&
							(loggedInUserDetails?.texas_district_admin ||
								loggedInUserDetails?.texas_admin)
								? "PFAI Export"
								: "Data Export"}{" "}
						</Text>
						{loading ? <Spinner color="white" /> : <Image src={excel} w="4" />}
					</Flex>
				</Flex>
			) : null}

			<Modal
				isOpen={isOpen}
				borderRadius={4}
				size="sm"
				// isCentered
				onClose={() => {
					onClose();
				}}
				motionPreset="slideInBottom"
				scrollBehavior={"inside"}
			>
				<ModalOverlay />
				<ModalContent
					h={{ base: "30rem", md: "auto" }}
					position="fixed"
					top="0"
					right="0"
				>
					<ModalHeader>
						{reportFilter == "dataExport" ||
						location.pathname == `/role/${selectedRole}/reports` ? (
							<>
								<Heading1 textColor="#1890ff">Data Export Filters</Heading1>
							</>
						) : (
							<Heading1 textColor="#1890ff">Report Filters</Heading1>
						)}
					</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Box
							whiteSpace="nowrap"
							display="flex"
							flexDirection="column"
							justifyContent="center"
							gap="4"
						>
							<Grid templateColumns={{ base: "repeat(1, 1fr)" }} gap="3">
								{fieldsList?.inputFilesList?.map((item) =>
									item.type === "multi-select" ? (
										item?.name === "school" &&
										!["stateAdmin", "partner"].includes(selectedRole) ? (
											<MultiSelector
												label={item?.lable}
												options={schools}
												onChange={handleSchools}
												value={selectedSchools}
											></MultiSelector>
										) : item?.name === "school" &&
										  ["stateAdmin", "partner"].includes(selectedRole) ? (
											<MultiSelector
												label={item?.lable}
												options={schools}
												onChange={handleSchools}
												onInputChange={handleInputChangeSchools}
												value={selectedSchools}
											></MultiSelector>
										) : item?.name === "class_name" &&
										  !["stateAdmin", "partner"].includes(selectedRole) ? (
											<MultiSelector
												id={item?.id}
												label={item?.lable}
												options={
													selectedSchools?.[0]?.label != "All"
														? classes
														: classes
												}
												onChange={handleClasses}
												onInputChange={handleInputClasses}
												value={selectedClasses}
											/>
										) : item?.name === "districts" &&
										  ["stateAdmin", "partner"].includes(selectedRole) ? (
											<MultiSelector
												id={item?.id}
												label={item?.lable}
												options={districts}
												onChange={handleDistricts}
												onInputChange={handleInputChangeDistricts}
												value={selectedDistricts}
											/>
										) : item?.name === "licenses" &&
										  selectedRole === "partner" ? (
											<MultiSelector
												id={item?.id}
												label={item?.lable}
												options={partnerLicenses}
												onChange={handlePartnerLicenses}
												onInputChange={handleInputChangeLicenses}
												value={selectedPartnerLicenses}
											/>
										) : item?.name === "grade" ? (
											selectedRole !== "student" ? (
												<MultiSelector
													id={item?.id}
													label={item?.lable}
													options={
														selectedGrades?.[0]?.label != "All"
															? grades
															: grades
													}
													onChange={handleGrades}
													value={selectedGrades}
												/>
											) : null
										) : item?.name === "test_type" ? (
											<MultiSelector
												id={item?.id}
												label={item?.lable}
												options={
													selectedTestTypes?.[0]?.label != "All"
														? testTypes
														: testTypes
												}
												onChange={handleTestType}
												value={selectedTestTypes}
											/>
										) : null
									) : item.name === "academic_year" ? (
										<GridItem>
											<SingleSelect
												// placeholder={item?.placeholder}
												label={item.lable}
												onChange={handleChange}
												name={item?.name}
												optionprops={academicYear}
												value={formData[item?.name]}
												reportFilter={true}
											/>
										</GridItem>
									) : item.name === "state" ? (
										<GridItem>
											<SingleSelect2
												placeholder={item?.placeholder}
												label={item.lable}
												onChange={handleChange}
												name={item?.name}
												optionsProps={
													item?.name === "state" ? statesList : item?.options
												}
												value={formData[item?.name]}
												displayKey={item?.name === "state" ? "state" : "lable"}
												optionValue={item?.name === "state" ? "code" : "value"}
											/>
										</GridItem>
									) : item?.type === "text" ? (
										<GridItem>
											<Inputs
												type={item.type}
												label={item.lable}
												name={item.name}
												onChange={handleChange}
											/>
										</GridItem>
									) : item?.type == "date" ? (
										<GridItem>
											<InputDate
												label={item.lable}
												id={item.Id}
												name={item.name}
												type="text"
												error={errors?.[item?.name] && errors?.[item?.name]}
												onClickDay={() =>
													setIsCalendarOpen((prevState) => ({
														...prevState,
														[item.name]: false,
													}))
												}
												isCalendarOpen={isCalendarOpen?.[item.name]}
												selectedDate={selectedDate?.[item.name]}
												handleChangeDateFromCalendar={(e) =>
													handleChangeDateFromCalendar(e, item.name)
												}
												handleCalendarClick={() =>
													handleCalendarClick([item.name])
												}
												value={formData?.[item.name]}
												onChange={(e) => {
													handleChange(e);
												}}
											/>
										</GridItem>
									) : item?.type === "checkbox" ? (
										<Box display="flex" flexDirection="column">
											{item?.lable === "Show Student ID" ? (
												<ParagraphWithColorPrimary>
													Display Details
												</ParagraphWithColorPrimary>
											) : null}

											<Checkbox
												id={item.id}
												value={formData?.[item.name]}
												name={item.name}
												isChecked={formData?.[item.name]}
												onChange={handleChange}
											>
												{item?.lable}
											</Checkbox>
										</Box>
									) : item?.type === "select" && item.name == "hashType" ? (
										<Box display="flex" flexDirection="column">
											<SingleSelect2
												placeholder={item?.placeholder}
												label={item.lable}
												onChange={handleChange}
												name={item?.name}
												optionsProps={item?.options}
												value={formData[item?.name]}
												displayKey={"lable"}
												optionValue={"value"}
											/>
										</Box>
									) : null,
								)}
							</Grid>
						</Box>
					</ModalBody>
					<ModalFooter
						display="flex"
						flexDirection="column"
						justifyContent="center"
						alignItems="center"
					>
						<PositiveButton
							text={"Run Report"}
							onClick={handleRunFilters}
							isDisabled={Object.values(formData).includes(null)}
						/>

						{Object.values(formData).includes(null) ? (
							<ErrorText>Note: Please Select All the filters</ErrorText>
						) : null}
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ReportFilters;
