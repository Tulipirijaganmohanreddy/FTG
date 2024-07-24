import React from "react";
import { useNavigate } from "react-router-dom";
import Heading from "./FitnessComponents/FitnessTexts/Heading";
import ErrorImg from "../assets/Images/PageNotFound/undraw_page_not_found_re_e9o6.svg";
import Paragraph1 from "./FitnessComponents/FitnessTexts/Paragraph1";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import PositiveButton from "./PositiveButton";

const PageNotFound = () => {
	const navigate = useNavigate();
	return (
		<Flex
			direction="column"
			h="calc(100vh)"
			textAlign="center"
			pt="12"
			alignItems={"center"}
			bg="#F2F8FFC7"
		>
			<Box boxSize="64">
				<Image src={ErrorImg} alt="404" w="full" h="full" />
			</Box>
			<Paragraph1>
				The page you are attempting to reach is not available. Feel free to go
				back and <br /> resume your journey on FitnessGram.
			</Paragraph1>
			<Box mt="8" onClick={() => navigate("/")}>
				<PositiveButton text="Return Home"></PositiveButton>
			</Box>
		</Flex>
	);
};

export default PageNotFound;
