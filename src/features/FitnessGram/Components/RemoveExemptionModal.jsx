import { NotAllowedIcon } from "@chakra-ui/icons";
import {
	Flex,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalOverlay,
	Stack,
	useDisclosure
} from "@chakra-ui/react";
import React from "react";
import { FaBan } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";

const RemoveExemptionModal = (props) => {
	const { user, handleUpdateData, testItemKey, testItemName } = props;

	const { isOpen, onOpen, onClose } = useDisclosure();

	const handleRemoveExemption = () => {
		const copyOfUser = { ...user };

		if (["HEIGHT_INCH", "HEIGHT_FEET"].includes(testItemKey)) {
			copyOfUser["HEIGHT_INCH"] = "";
			copyOfUser["HEIGHT_FEET"] = "";
		} else {
			copyOfUser[testItemKey] = "";
		}

		handleUpdateData([copyOfUser]);
		onClose();
	};

	return (
		<>
			<button onClick={onOpen} >
				<FaBan color="red" size={15} />
			</button>

			<Modal
				isOpen={isOpen}
				onClose={onClose}
				isCentered
				useInert={true}
				borderColor="transparent"
			>
				<ModalOverlay />
				<ModalContent p="4" m="2">
					<ModalCloseButton />
					<ModalBody>
						<Stack spacing="4">
							<HStack>
								<NotAllowedIcon boxSize="6" />
								<Heading2>Exemption</Heading2>
							</HStack>
							<Flex gap="2" alignItems={"center"}>
								<Heading6> Student: </Heading6>
								<Label1
									name={"student name"}
									decreaseMarginTop="0.2rem"
									textColor="black"
								>
									{`${user?.["first_name"]} ${user?.["last_name"]} `}
								</Label1>
							</Flex>
							<Flex gap="2" alignItems={"center"}>
								<Heading6> Test: </Heading6>
								<Label1
									name={"test name"}
									decreaseMarginTop="0.2rem"
									textColor="black"
								>
									{testItemName}
								</Label1>
							</Flex>
							<Flex gap="2" alignItems={"center"}>
								<Heading6> Code: </Heading6>
								<Label1
									name={"code name"}
									textColor="black"
									decreaseMarginTop="0.1rem"
								>
									{user[testItemKey]?.split(":")[1]}
								</Label1>
							</Flex>
							<Flex justifyContent={"center"}>
								<Flex
									gap="1"
									alignItems={"center"}
									borderRadius={"2rem"}
									p="2"
									px="3"
									cursor="pointer"
									role="button"
									bg="primary"
									color="white"
									onClick={() => handleRemoveExemption()}
								>
									<RiDeleteBin6Line color="white" size="15" />
									<Heading6>Remove</Heading6>
								</Flex>
							</Flex>
						</Stack>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default RemoveExemptionModal;
