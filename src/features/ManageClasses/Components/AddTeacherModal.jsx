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

import React, { useEffect, useState } from "react";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";

import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
	getAddTeacherToManageClassApiCall,
	getTeachersBySchoolForAddTeacherToClassModalEffect as getTeachersBySchool,
	setAddTeacherToManageClassApiResponse,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

import { IoAddCircleSharp } from "react-icons/io5";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import TableHeading from "../../../components/FitnessComponents/FitnessTexts/TableHeading";
import TextIcon from "../../../components/TextIcon";
import {
	setManageUser,
	setMessage,
	setPreviousPath,
} from "../../../store/slices/profileSlice";
import { debounce } from "../../../Utilities/utils";

const AddTeacherModal = (props) => {
	const { addTeacherModal, setAddTeacherModal } = props;

	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const { onClose } = useDisclosure();

	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const loading = useSelector((state) => state.profile.upLoading);

	const token = useSelector((state) => state.profile.token);
	const userId = useSelector((state) => state.profile.userId);

	const selectedClassDetails = useSelector(
		(state) => state?.schoolAdmin?.selectedClassDetails,
	);

	const teachersList = useSelector(
		(state) => state?.schoolAdmin?.teachersListByClassId,
	);

	const teachersBySchool = useSelector(
		(state) => state.schoolAdmin.TeachersBySchool,
	);
	const addTeacherToManageClassApiResponse = useSelector(
		(state) => state?.schoolAdmin?.addTeacherToManageClassApiResponse,
	);

	const [teacherOptions, setTeacherOptions] = useState([]);

	const [data, setData] = useState({
		user_uuid: "",
		classes: [params?.classId],
		schools: [params?.schoolId],
		assigner_role: selectedRole,
		assigner_uuid: userId,
	});

	const handleChange = (teacher) => {
		setData((prevState) => ({ ...prevState, user_uuid: teacher.value }));
	};

	const handleSubmit = (event) => {
		event.preventDefault();

		if (data?.user_uuid) {
			dispatch(getAddTeacherToManageClassApiCall({ body: data, token }));
		} else {
			dispatch(setMessage("Please Select the User"));
		}
	};

	const handleNewTeacher = () => {
		dispatch(
			setManageUser({
				formTitle: `Add Teacher`,
				userType: "teacher",
			}),
		);
		dispatch(setPreviousPath(location.pathname));

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

	const handleRequestToAddTeacher = () => {
		dispatch(
			setManageUser({
				formTitle: `Request to Add Teacher`,
				userType: "teacher",
			}),
		);
		dispatch(setPreviousPath(location.pathname));
		navigate(`/role/${selectedRole}/AddUser`);
	};

	useEffect(() => {
		if (teachersBySchool?.length) {
			const existingTeacherIds =
				teachersList?.length && teachersList?.map((teacher) => teacher.uuid);
			let arr = [];

			teachersBySchool?.forEach((teacher) => {
				if (
					existingTeacherIds?.length &&
					!existingTeacherIds?.includes(teacher?.uuid)
				) {
					let obj = {
						label: `${teacher.last_name}, ${teacher.first_name}`,
						value: teacher.uuid,
					};

					arr.push(obj);
				} else if (!existingTeacherIds?.length) {
					let obj = {
						label: `${teacher.last_name}, ${teacher.first_name}`,
						value: teacher.uuid,
					};
					arr.push(obj);
				}
			});

			setTeacherOptions([...arr]);
		} else {
			setTeacherOptions([]);
		}
	}, [teachersBySchool]);

	const handleInputChange = debounce((searchText) => {
		searchText?.length > 1 &&
			dispatch(
				getTeachersBySchool({
					token,
					schoolId: selectedClassDetails?.schoolUuid,
					body: { search_text: searchText, skip: 1, size: "50" },
				}),
			);
	}, 500);

	useEffect(() => {
		if (addTeacherModal) {
			dispatch(
				getTeachersBySchool({
					token,
					schoolId: selectedClassDetails?.schoolUuid,
					body: { search_text: "", skip: 1, size: "50" },
				}),
			);
		}
	}, [addTeacherModal]);

	return (
		<>
			<Modal
				size="md"
				onClose={() => {
					setAddTeacherModal(false);
					onClose();
				}}
				isOpen={addTeacherModal}
				isCentered
				useInert={true}
				borderColor="transparent"
			>
				<ModalOverlay />
				<ModalContent p="4" m="2">
					<ModalBody>
						<Stack spacing="4">
							{selectedRole !== "teacher" ? (
								<>
									<TableHeading>Add Teacher to Class</TableHeading>

									<Flex
										justify={{
											base: "flex-start",
											md: "flex-end",
											lg: "flex-end",
										}}
										role="button"
										onClick={handleNewTeacher}
									>
										<TextIcon text="Add New Teacher" icon={IoAddCircleSharp} />
									</Flex>
								</>
							) : (
								<Box>
									<Flex
										justifyContent={"space-between"}
										alignItems={"center"}
										py="3"
										my="3"
									>
										{" "}
										<TableHeading>Request to Add Teacher</TableHeading>
										<Box onClick={handleRequestToAddTeacher} role="button">
											<TextIcon
												text="Add Teacher to Class"
												icon={IoAddCircleSharp}
												increaseTextSize="increaseTextSize"
											/>
										</Box>
									</Flex>
								</Box>
							)}
							<form onSubmit={handleSubmit}>
								<Flex flexDirection={"column"} gap={"3"}>
									<ChakraSelect
										id={"teacherLastName"}
										label={"User Last Name"}
										onInputChange={handleInputChange}
										name="user_uuid"
										onChange={handleChange}
										options={teacherOptions}
									/>

									<Inputs
										id={"teacherRole"}
										label={"This Role"}
										value={"Teacher"}
										isDisabled
									/>

									<Inputs
										id={"className"}
										label={"Class Name"}
										value={selectedClassDetails?.class_name}
										isDisabled
									/>

									<Inputs
										id={"schoolName"}
										label={"At School"}
										value={selectedClassDetails?.school?.school_name}
										isDisabled
									/>

									<Flex justify="center" gap="8">
										<NegativeButton
											text={"Cancel"}
											onClick={() => {
												setAddTeacherModal(false);
												dispatch(setAddTeacherToManageClassApiResponse(null));
											}}
										/>
										<PositiveButton
											text={"Submit"}
											isLoading={loading}
											type="submit"
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

export default AddTeacherModal;
