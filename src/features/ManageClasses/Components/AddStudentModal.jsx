import {
	Box,
	Flex,
	FormControl,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import { IoAddCircleSharp } from "react-icons/io5";

import React, { useEffect, useState } from "react";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	getAddStudentToClassApiCall,
	getStudentInfoBasedOnParticularSchoolApi,
	setAddStudentToClassApiResponse,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import TableHeading from "../../../components/FitnessComponents/FitnessTexts/TableHeading";
import TextIcon from "../../../components/TextIcon";
import { setManageUser, setMessage } from "../../../store/slices/profileSlice";
import { debounce } from "../../../Utilities/utils";

const AddStudentModal = (props) => {
	const { addStudentModal, setAddStudentModal } = props;

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { onClose } = useDisclosure();

	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const studentRoaster = useSelector(
		(state) => state.schoolAdmin.schoolAdminStudentByClasses,
	);

	const token = useSelector((state) => state.profile.token);
	const userId = useSelector((state) => state.profile.userId);
	const loading = useSelector((state) => state.profile.upLoading);

	const selectedClassDetails = useSelector(
		(state) => state?.schoolAdmin?.selectedClassDetails,
	);

	const studentsBySchool = useSelector(
		(state) => state.schoolAdmin.studentInfoBasedOnSchool,
	);

	const [studentOptions, setStudentOptions] = useState([]);

	const [data, setData] = useState({
		user_uuid: "",
		classes: [params?.classId],
		schools: [params?.schoolId],
		assigner_role: selectedRole,
		assigner_uuid: userId,
	});

	const handleAddNewStudent = (schoolAdminId) => {
		dispatch(
			setManageUser({
				formTitle: `Add Student`,
				userType: "student",
				previousPath: location.pathname,
			}),
		);

		navigate(`/role/${selectedRole}/AddUser`, {
			state: {
				assignment: {
					uuid: selectedClassDetails?.school?.uuid,
					school_name: selectedClassDetails?.school?.school_name,
					classes: [
						{
							uuid: selectedClassDetails?.uuid,
							class_name: selectedClassDetails?.class_name,
						},
					],
				},
			},
		});
	};

	const handleChange = (teacher) => {
		setData((prevState) => ({ ...prevState, user_uuid: teacher.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (data?.user_uuid) {
			dispatch(getAddStudentToClassApiCall({ body: data, token }));
		} else {
			dispatch(setMessage("Please Select the User"));
		}
	};

	const handleInputChange = debounce((searchText) => {
		searchText?.length > 1 &&
			dispatch(
				getStudentInfoBasedOnParticularSchoolApi({
					token,
					schoolId: selectedClassDetails?.schoolUuid,
					body: { search_text: searchText, size: "20", skip: "1" },
				}),
			);
	}, 500);
	useEffect(() => {
		if (studentsBySchool?.length) {
			const existingStudentIds =
				studentRoaster?.length && studentRoaster.map((student) => student.uuid);
			let arr = [];

			studentsBySchool.forEach((student) => {
				if (
					existingStudentIds?.length &&
					!existingStudentIds.includes(student.uuid)
				) {
					let obj = {
						label: `${student.last_name}, ${student.first_name}`,
						value: student.uuid,
					};
					arr.push(obj);
				} else if (!existingStudentIds?.length) {
					let obj = {
						label: `${student.last_name}, ${student.first_name}`,
						value: student.uuid,
					};
					arr.push(obj);
				}
			});

			setStudentOptions([...arr]);
		} else {
			setStudentOptions([]);
		}
	}, [studentsBySchool]);

	useEffect(() => {
		if (addStudentModal) {
			dispatch(
				getStudentInfoBasedOnParticularSchoolApi({
					token,
					schoolId: selectedClassDetails?.schoolUuid,
					body: { search_text: "", size: "20", skip: "1" },
				}),
			);
		}
	}, []);

	return (
		<>
			<Modal
				size="md"
				onClose={() => {
					setAddStudentModal(false);
					onClose();
				}}
				isOpen={addStudentModal}
				isCentered
				useInert={true}
				borderColor="transparent"
			>
				<ModalOverlay />
				<ModalContent p="4" m="2">
					<ModalBody>
						<Stack spacing="4">
							<Flex gap="3" justifyContent="space-between" alignItems="center">
								<TableHeading>Add Student to Class</TableHeading>

								<Flex
									justify={{
										base: "flex-start",
										md: "flex-end",
										lg: "flex-end",
									}}
									role="button"
									onClick={handleAddNewStudent}
								>
									<TextIcon text="Add New Student" icon={IoAddCircleSharp} />
								</Flex>
							</Flex>
							<form onSubmit={handleSubmit}>
								<Flex flexDirection={"column"} gap={"3"}>
									<ChakraSelect
										id="studentLastName"
										label={"User Last Name"}
										onInputChange={handleInputChange}
										name="user_uuid"
										onChange={handleChange}
										options={studentOptions}
										placeholder="Select Student"
									/>

									<Inputs
										id="teacherRole"
										label={"This Role"}
										value={"Teacher"}
										isDisabled
									/>

									<Inputs
										id="className"
										label={"Class Name"}
										value={selectedClassDetails?.class_name}
										isDisabled
									/>

									<Inputs
										id="schoolName"
										label={"At School"}
										value={selectedClassDetails?.school?.school_name}
										isDisabled
									/>

									<Flex justify="center" gap="8">
										<NegativeButton
											text={"Cancel"}
											onClick={() => {
												setAddStudentModal(false);
												dispatch(setAddStudentToClassApiResponse(null));
											}}
										/>
										<PositiveButton
											type="submit"
											text={"Submit"}
											isLoading={loading}
										/>
									</Flex>
								</Flex>
							</form>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddStudentModal;
