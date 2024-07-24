import {
	Box,
	HStack,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalOverlay,
	Stack,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { instructions } from "../Config";

import { FaBookReader } from "react-icons/fa";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import TextIcon from "../../../components/TextIcon";

const InstructionsModal = (props) => {
	const { instructionsList } = instructions;

	const { instructionsModal, setInstructionsModal } = props;
	const { onClose } = useDisclosure();

	return (
		<Modal
			size="2xl"
			onClose={onClose}
			isOpen={instructionsModal}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent
				p="4"
				h={{ base: "60vh", md: "auto", lg: "auto" }}
				overflow={"scroll"}
				className="example"
				m="2"
			>
				<HStack></HStack>
				<Box px="1.4rem">
					<TextIcon
						text={"Instructions"}
						icon={FaBookReader}
						increaseTextSize="increaseTextSize"
					/>
				</Box>
				<ModalCloseButton onClick={() => setInstructionsModal(false)} />
				<ModalBody>
					<Stack spacing={4} color="black-2">
						{instructionsList.map((instruction, index) => {
							return <Label marginTopText={"0"}>{instruction}</Label>;
						})}
						<Label marginTopText={"0"}>
							Visit{" "}
							<a href="https://help.fitnessgram.net/" target="_blank">
								https://help.fitnessgram.net/
							</a>{" "}
							for more information on importing.
						</Label>
					</Stack>
				</ModalBody>
				<ModalFooter></ModalFooter>
			</ModalContent>
		</Modal>
	);
};
export default InstructionsModal;
