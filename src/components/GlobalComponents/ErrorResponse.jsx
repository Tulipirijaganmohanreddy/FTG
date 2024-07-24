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
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import wrongmark from "../../assets/Images/Success_ErrorImages/wrong.svg";
import { logOut, setCode, setMessage } from "../../store/slices/profileSlice";
import { resetStore } from "../../store/store";

const ErrorResponse = (props) => {
	const { message } = props;

	const { isOpen } = useDisclosure();
	const dispatch = useDispatch();

	const navigate = useNavigate();

	const location = useLocation();

	const token = useSelector((state) => state.profile.token);

	const errorResponse = useSelector((state) => state?.profile?.message);
	const code = useSelector((state) => state.profile.code);

	const handleClose = () => {
		dispatch(setMessage(null));
		dispatch(setCode(null));
		if(errorResponse === "Your Session has Expired!"){
			localStorage.removeItem("expiryMessage")
		}
	};

	return (
		<Modal
			onClose={() => handleClose()}
			isOpen={errorResponse}
			// ![200, 201].includes(code) && code
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
							{errorResponse}
						</Text>
						<Box onClick={() => handleClose()}>
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

export default ErrorResponse;
