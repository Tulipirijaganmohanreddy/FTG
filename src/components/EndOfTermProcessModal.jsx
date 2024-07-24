import {
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	useDisclosure
} from "@chakra-ui/react";
import React from "react";
import Paragraph2 from "./FitnessComponents/FitnessTexts/Paragraph2";
import NegativeButton from "./NegativeButton";
import PositiveButton from "./PositiveButton";

const EndOfTermProcessModal = ({
	showModal,
	setShowModal,
	isStudentsPromoted,
	handleApi,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const handleClose = () => {
		setShowModal(false);
		onClose();
		// setIsStudentsPromoted("");
	};
	return (
		<>
			<Modal
				isOpen={showModal}
				onClose={() => handleClose()}
				isCentered
				useInert={true}
				borderColor="transparent"
				size="md"
			>
				<ModalOverlay />
				<ModalContent textAlign="center" py="4">
					<ModalHeader>End of term Operation</ModalHeader>
					<Box onClick={() => handleClose()}>
						<ModalCloseButton />
					</Box>
					<ModalBody textAlign="center">
						<Flex flexDirection={"column"} gap="4">
							{isStudentsPromoted === "promote" ? (
								<Paragraph2>
									Selecting "Yes" will promote the students.
								</Paragraph2>
							) : (
								<Paragraph2>
									Selecting "Yes" will undo the promotion of students.
								</Paragraph2>
							)}

							<Flex justify="center" gap="8">
								<PositiveButton
									text={"Yes"}
									type="submit"
									onClick={() => handleApi()}
								/>

								<NegativeButton text={"No"} onClick={() => handleClose()} />
							</Flex>
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default EndOfTermProcessModal;
