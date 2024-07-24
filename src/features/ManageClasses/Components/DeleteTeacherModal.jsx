import {
    Box,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalOverlay,
    Stack,
    Text
} from "@chakra-ui/react";
import React from "react";

import { HiExclamationCircle } from "react-icons/hi";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PositiveButton from "../../../components/PositiveButton";

const DeleteTeacherModal = (props) => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { setTrue, enable } = props;
	return (
		<>
			<Modal isOpen={enable} size="md" isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalBody p="0">
						<Box
							w={["100%"]}
							borderRadius="15"
							p="0"
							display="flex"
							flexDirection="column"
							justifyContent="space-between"
							marginBottom="5"
						>
							<Stack>
								<Box
									display="flex"
									justifyContent="space-between"
									background="#0081C8"
									border="1px"
									borderColor="#0081C8"
									borderTopRadius={5}
									w="100%"
									px="2"
									py="2"
								>
									<Text
										color="white"
										textStyle="h4"
										fontFamily="poppins-semoibold"
									>
										Remove Teacher
									</Text>
								</Box>

								<Flex
									direction="column"
									alignItems="center"
									justifyContent="center"
								>
									<Flex alignItems="center" direction="column">
										<HiExclamationCircle size={35} fill="red" />
										<Text marginTop="1" color="red">
											{" "}
											WARNING
										</Text>

										<Text paddingLeft="5" fontsize="sm" marginTop="2">
											WARNING: This Teacher has associated test events. Cannot
											be removed. Unassign the Teacher instead.
										</Text>
									</Flex>

									<Flex marginTop="5" onClick={() => setTrue(false)}>
										<PositiveButton text="Cancel" />
									</Flex>
								</Flex>
							</Stack>
						</Box>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default DeleteTeacherModal;
