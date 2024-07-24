import { DeleteIcon, WarningTwoIcon } from "@chakra-ui/icons";
import {
	Box,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Text,
} from "@chakra-ui/react";
import React from "react";
import PositiveButton from "../PositiveButton";
import NegativeButton from "../NegativeButton";

const CautionPopUp = ({ caution, setCaution, onClick, text }) => {
	console.log(text, "text===>");
	return (
		<Modal
			size="xs"
			// onClose={() => dispatch(setErrorResponse(null))}
			isOpen={caution}
			onClose={() => {
				setCaution(false);
				// setAction("action");
				// setSelectedSchool("")
			}}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent alignItems="center">
				<ModalHeader>
					<Icon as={WarningTwoIcon} boxSize={6} color="red" />
				</ModalHeader>
				<ModalBody>
					<Text textStyle="message" textAlign="center" color="grey">
						{text}
					</Text>
				</ModalBody>
				<ModalFooter gap="4">
					<PositiveButton
						bg={"#ACACAC"}
						onClick={() => {
							onClick();
							setCaution(false);
						}}
						text={"Yes"}
					/>

					<NegativeButton
						text={"No"}
						onClick={() => setCaution(false)}
						bg="primary"
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default CautionPopUp;
