import {
	Flex,
	FormControl,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
	useDisclosure
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { setMessage } from "../../../store/slices/profileSlice";
import { TEST_ITEMS_NAME } from "./EnterDataTable";

const exemptionCodes = [
	{ label: "Exempt", value: "Exempt" },
	{
		label: "Exempt (Texas only) disability or other condition (TEC §38.101(b))",
		value: "Exempt (Texas only) disability or other condition (TEC §38.101(b))",
	},
];

const IndividualExemptionModal = (props) => {
	const { event_name, test_items, users, handleUpdateData } = props;
	const dispatch = useDispatch();
	const { isOpen, onOpen, onClose } = useDisclosure();

	const [testItems, setTestItems] = useState([]);

	const [selectedTestItems, setSelectedTestItems] = useState([]);

	const [exemptionCode, setExemptionCode] = useState(null);

	const handleTestItems = (selected) => {
		const _selectedItems = selected.map((item) => item.value);
		setSelectedTestItems([..._selectedItems]);
	};

	const handleExemptionCode = (e) => {
		setExemptionCode(e.target.value);
	};

	const setExemption = () => {
		if (!selectedTestItems.length) {
			dispatch(setMessage("Please Select Test Item(s)"));
			return;
		}
		if (!exemptionCode) {
			dispatch(setMessage("Please Select Exemption Code"));
			return;
		}
		const updatedUsers = JSON.parse(JSON.stringify(users));
		for (const [index, user] of updatedUsers.entries()) {
			for (const item in user) {
				if (selectedTestItems.includes(item)) {
					updatedUsers[index][item] = `exemption:${exemptionCode}`;
				}

				if (selectedTestItems.includes("HEIGHT")) {
					updatedUsers[index]["HEIGHT_FEET"] = `exemption:${exemptionCode}`;
					updatedUsers[index]["HEIGHT_INCH"] = `exemption:${exemptionCode}`;
				}
			}
		}
		onClose();
		handleUpdateData(updatedUsers);
	};

	useEffect(() => {
		let _test_items = [...test_items];
		if (test_items.includes("HEIGHT(INCH)")) {
			_test_items = test_items.filter(
				(item) => !["HEIGHT(INCH)", "HEIGHT(FEET)"].includes(item),
			);
			_test_items.unshift("HEIGHT");
		}
		const _testItems = _test_items.map((item) => ({
			label: item,
			value: TEST_ITEMS_NAME[item],
		}));

		setTestItems([..._testItems]);
	}, []);
	return (
		<>
			<button onClick={onOpen}>
				<FaUserAlt fill="green" size={15} />
			</button>
			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				useInert={true}
				borderColor="transparent"
			>
				<ModalOverlay />
				<ModalContent p="2" m="2">
					<ModalBody>
						<Stack spacing="4">
							<Heading1>Set Exemptions</Heading1>
							<FormControl>
								<Heading6> Student Name</Heading6>

								<Flex
									direction="column"
									justifyContent={"center"}
									border="1px solid #C4C7C5"
									p="3"
									minH="2rem"
									maxH="8rem"
									overflow={"auto"}
									borderRadius={"5px"}
								>
									{users?.map((each, index) => (
										<React.Fragment key={index + "student"}>
											<Label1 name={each?.first_name} textColor="black">
												{`${each?.last_name}, ${each?.first_name}`}
											</Label1>
										</React.Fragment>
									))}
								</Flex>
							</FormControl>
							<FormControl>
								<Heading6>Test Event</Heading6>

								<Flex
									direction="column"
									border="1px solid #C4C7C5"
									px="2.5"
									py="0.3rem"
									borderRadius={"5px"}
									marginTop="1"
								>
									<Label1 name={event_name} textColor="black">
										{event_name}
									</Label1>
								</Flex>
							</FormControl>
							<FormControl>
								<Heading6>Test Items</Heading6>

								<Flex
									direction="column"
									border="1px solid #C4C7C5"
									borderRadius={"5px"}
									marginTop="1"
								>
									<MultiSelector
										label={""}
										options={testItems}
										onChange={handleTestItems}
										width="100%"
										border="1px solid #C4C7C5"
										textColor="black"
										increaseText="navMenuItemText"
									/>
								</Flex>
							</FormControl>
							<FormControl>
								<SingleSelect2
									placeholder={"Select"}
									label={"Exemption Code"}
									onChange={handleExemptionCode}
									name={"exemption"}
									optionsProps={exemptionCodes}
									displayKey={"label"}
									optionValue={"value"}
									increaseWidth="100%"
									border="1px solid #C4C7C5"
									textColor="black"
									// height="2.7rem"
									py="1"
									increaseText="heading6"
								/>
							</FormControl>

							<Flex justify="center" alignItems="center" gap="8">
								<NegativeButton text={"Close"} onClick={onClose} />
								<PositiveButton
									text={"Apply"}
									type="submit"
									onClick={setExemption}
								/>
							</Flex>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default IndividualExemptionModal;
