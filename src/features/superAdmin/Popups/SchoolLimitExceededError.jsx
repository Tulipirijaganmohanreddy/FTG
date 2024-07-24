import {
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalContent,
	ModalOverlay,
	Text,
	useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import wrongmark from "../../../assets/Images/Success_ErrorImages/wrong.svg";

const SchoolLimitExceeededError = (props) => {
	const { message } = props;
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const location = useLocation();

	const errorResponse = useSelector((state) => state?.profile?.message);

	const { isOpen, onOpen, onClose } = useDisclosure();

	return (
		<Modal
			onClose={onClose}
			isOpen={isOpen}
			isCentered
			useInert={true}
			borderColor="transparent"
		>
			<ModalOverlay />
			<ModalContent
				w={{ lg: "16rem", md: "12rem", base: "12rem" }}
				borderRadius="xl"
			>
				<ModalBody>
					<Flex direction="column" alignItems="center">
						<Box boxSize="10" mt="1.5rem">
							<img src={wrongmark} />
						</Box>
						<Text textStyle="popup" mt="0.5rem" textAlign="center">
							Error{" "}
						</Text>
						<Text
							textStyle="message"
							mt="0.5rem"
							color="message"
							textAlign="center"
						>
							{" "}
							you have exceeded the school limit. Try Updating the school limit
							to add more schools to a license
						</Text>
						<Box
							onClick={() => {
								onClose();
							}}
						>
							<Box
								as="button"
								rounded="md"
								height="36px"
								width="130px"
								lineHeight="1.2"
								transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
								fontSize="14px"
								fontWeight="normal"
								bg="primary"
								color="white"
								fontFamily="poppins"
								my="4"
							>
								OK
							</Box>{" "}
						</Box>
					</Flex>
				</ModalBody>
			</ModalContent>
		</Modal>
	);
};

export default SchoolLimitExceeededError;
