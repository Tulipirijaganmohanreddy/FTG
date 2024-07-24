import {
	Box,
	Flex,
	Icon,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Spinner,
	Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import PositiveButton from "../PositiveButton";
import NegativeButton from "../NegativeButton";
import { DeleteIcon } from "@chakra-ui/icons";

const DeletePopUp = (props) => {
	const { deletePopUp, setDeletePopUp, text, onClick } = props;

	return (
		<Modal
			size="xs"
			isOpen={deletePopUp}
			onClose={() => {
				setDeletePopUp(false);
			}}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent alignItems="center">
				<ModalHeader>
					<Icon as={DeleteIcon} boxSize={6} color="red" />
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
							setDeletePopUp(false);
						}}
						text={"Yes"}
					/>

					<NegativeButton
						text={"No"}
						onClick={() => setDeletePopUp(false)}
						bg="primary"
					/>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default DeletePopUp;
