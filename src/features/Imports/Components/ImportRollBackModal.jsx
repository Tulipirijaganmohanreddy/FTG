import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { importRollBack } from "../Config";

const ImportRollBackModal = (props) => {
	const { title, text, caution } = importRollBack;

	const { importRollBackModal, setImportRollBackModal } = props;
	const { onClose } = useDisclosure();

	return (
		<Modal
			size="4xl"
			onClose={onClose}
			isOpen={importRollBackModal}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent p="4">
				<ModalHeader textStyle="h5">{title}</ModalHeader>
				<ModalCloseButton onClick={() => setImportRollBackModal(false)} />
				<ModalBody>
					<Flex direction="column" gap="6">
						{text.map((item, index) => {
							return (
								<Text key={item + index} textStyle="h6">
									{item}
								</Text>
							);
						})}
						<Text textStyle="h4" color="red" textAlign="center">
							{caution}
						</Text>
					</Flex>
				</ModalBody>
				<ModalFooter>
					<Flex justify="center" gap={8} width={"full"}>
						<Box onClick={() => setImportRollBackModal(false)}>
							<NegativeButton text={"Canel"} />
						</Box>
						<Box>
							<PositiveButton text={"Positive"} />
						</Box>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default ImportRollBackModal;
