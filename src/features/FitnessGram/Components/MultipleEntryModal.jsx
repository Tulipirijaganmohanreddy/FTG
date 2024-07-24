import {
	Flex,
	FormControl,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { MESSAGES, TEST_ITEMS_NAME, validate } from "./EnterDataTable";
import { handlePadStartTimer } from "../../../Utilities/utils";
import { setMessage } from "../../../store/slices/profileSlice";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const SHOULDER_PROPS = [
	{ displayKey: "Yes", value: "Yes" },
	{ displayKey: "No", value: "No" },
];

const MultipleEntryModal = (props) => {
	const { users, modal, test_items, handleModal, handleUpdateData } = props;

	const dispatch = useDispatch();

	const [testItems, setTestItems] = useState([]);

	const [selectedTestItem, setSelectedTestItem] = useState();

	const [data, setData] = useState();

	const [error, setError] = useState();

	const handleTestItem = (e) => {
		const { value, ...rest } = e.target;
		setSelectedTestItem(value);
		if (value === "HEIGHT") {
			setData({ HEIGHT_FEET: "", HEIGHT_INCH: "" });
		} else {
			setData();
		}
		setError();
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		if (selectedTestItem === "HEIGHT") {
			setData((prevData) => ({ ...prevData, [TEST_ITEMS_NAME[name]]: value }));
			return;
		}
		// setData({ [name]: value });
		if (["ONE-MILE RUN", "ONE-MILE WALK", "PLANK"].includes(name)) {
			const finalTime = handlePadStartTimer(value);
			setData({ [TEST_ITEMS_NAME[name]]: finalTime });
		} else {
			setData({
				[TEST_ITEMS_NAME[name]]: name.includes("SHOULDER STRETCH")
					? value.toUpperCase()
					: value,
			});
		}
		if (error) {
			setError();
		}
	};
	const handleApply = (e) => {
		e.preventDefault();
		//if no testItem is selected
		if (!selectedTestItem) {
			dispatch(setMessage("Please Select Test Item"));
			return;
		}
		//if HEIGHT is selected
		if (selectedTestItem === "HEIGHT") {
			//when no input given to feet and inch
			if (!data?.["HEIGHT_FEET"] && !data?.["HEIGHT_INCH"]) {
				setError({
					HEIGHT_FEET: MESSAGES["HEIGHT(FEET)"],
				});
				return;
			}
			// input given to feet and the input is not valid
			if (
				data?.["HEIGHT_FEET"] &&
				!validate["HEIGHT(FEET)"](data["HEIGHT_FEET"])
			) {
				setError({
					HEIGHT_FEET: MESSAGES["HEIGHT(FEET)"],
				});
				return;
			}
			//inputs given to feet and inch and feet is valid and inch is not valid w.r.t feet
			if (
				data?.["HEIGHT_FEET"] &&
				data?.["HEIGHT_INCH"] &&
				!validate["HEIGHT(INCH)2"](data["HEIGHT_INCH"])
			) {
				setError({
					HEIGHT_INCH: MESSAGES["HEIGHT(INCH)2"],
				});
				return;
			}
			//no input to feet and input given to inch is not valid
			if (
				!data?.["HEIGHT_FEET"] &&
				data?.["HEIGHT_INCH"] &&
				!validate["HEIGHT(INCH)"](data["HEIGHT_INCH"])
			) {
				setError({
					HEIGHT_INCH: MESSAGES["HEIGHT(INCH)"],
				});
				return;
			}

			//all the given inputs are valid
			setError();
			const updatedUsers = users.map((user) => ({ ...user, ...data }));
			handleUpdateData(updatedUsers);
			handleModal();
			return;
		}

		if (!data) {
			setError({
				[TEST_ITEMS_NAME[selectedTestItem]]: MESSAGES[selectedTestItem],
			});
			return;
		}

		if (validate[selectedTestItem](data[TEST_ITEMS_NAME[selectedTestItem]])) {
			setError();
			const updatedUsers = users.map((user) => ({ ...user, ...data }));

			handleUpdateData(updatedUsers);
			handleModal();
		} else {
			setError({
				[TEST_ITEMS_NAME[selectedTestItem]]: MESSAGES[selectedTestItem],
			});
		}
	};

	const handleInputField = () => {
		if (selectedTestItem === "HEIGHT") {
			return (
				<>
					<FormControl>
						<Label1>HEIGHT(FEET)</Label1>
						<Input
							id={"id1" + "HEIGHT(FEET)"}
							type="text"
							name={"HEIGHT(FEET)"}
							onChange={handleChange}
							size={"sm"}
							rounded="lg"
							bg={"input.100"}
							border="0"
							value={data?.[TEST_ITEMS_NAME["HEIGHT(FEET)"]] ?? ""}
						/>
						{error?.[TEST_ITEMS_NAME["HEIGHT(FEET)"]] ? (
							<ErrorText>{error[TEST_ITEMS_NAME["HEIGHT(FEET)"]]}</ErrorText>
						) : null}
					</FormControl>

					<FormControl>
						<Label1>HEIGHT(INCH)</Label1>
						<Input
							id={"id2" + "HEIGHT(INCH)"}
							type="text"
							name={"HEIGHT(INCH)"}
							onChange={handleChange}
							size={"sm"}
							rounded="lg"
							bg={"input.100"}
							border="0"
							value={data?.[TEST_ITEMS_NAME["HEIGHT(INCH)"]] ?? ""}
						/>
						{error?.["HEIGHT_INCH"] ? (
							<ErrorText>{error["HEIGHT_INCH"]}</ErrorText>
						) : null}
					</FormControl>
				</>
			);
		}

		return (
			<FormControl>
				<Input
					id={"id" + selectedTestItem}
					type="text"
					name={selectedTestItem}
					onChange={handleChange}
					size={"sm"}
					rounded="lg"
					bg={"input.100"}
					border="0"
					value={data?.[TEST_ITEMS_NAME[selectedTestItem]] ?? ""}
				/>
				{error?.[TEST_ITEMS_NAME[selectedTestItem]] ? (
					<ErrorText>{error[TEST_ITEMS_NAME[selectedTestItem]]}</ErrorText>
				) : null}
			</FormControl>
		);
	};

	useEffect(() => {
		if (modal) {
			const _testItems = [...test_items];
			const heightFeetIndex = _testItems.findIndex(
				(item) => item === "HEIGHT(FEET)",
			);

			if (heightFeetIndex !== -1) {
				_testItems.splice(heightFeetIndex, 1, "HEIGHT");
			}
			const heightInchIndex = _testItems.findIndex(
				(item) => item === "HEIGHT(INCH)",
			);
			if (heightInchIndex !== -1) {
				_testItems.splice(heightInchIndex, 1);
			}

			const _testsArr = _testItems.map((item) => ({
				testItem: item,
				test_item: TEST_ITEMS_NAME[item],
			}));

			setTestItems([..._testsArr]);
		}
	}, [modal]);

	return (
		<Modal
			isOpen={modal}
			onClose={handleModal}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent p="2" m="2">
				<ModalBody>
					<Stack spacing="4">
						<Heading1>Multiple Entry</Heading1>
						<FormControl>
							<SingleSelect2
								placeholder={"Select"}
								label={"Select Test Item"}
								onChange={handleTestItem}
								name={"test_item"}
								optionsProps={testItems}
								displayKey={"testItem"}
								optionValue={"testItem"}
								increaseWidth="100%"
								border="0"
								textColor="black"
								py="1"
								increaseText="heading6"
							/>
						</FormControl>

						{selectedTestItem ? handleInputField() : null}

						<Flex justify="center" alignItems="center" gap="8">
							<NegativeButton text={"Close"} onClick={handleModal} />
							<PositiveButton
								text={"Apply"}
								type="submit"
								onClick={handleApply}
							/>
						</Flex>
					</Stack>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default MultipleEntryModal;
