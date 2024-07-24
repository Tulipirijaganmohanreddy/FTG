import React from "react";
import Inputs from "./Inputs";
import {
	Box,
	Input,
	InputGroup,
	InputRightElement,
	Text,
} from "@chakra-ui/react";
import ErrorText from "../FitnessTexts/ErrorText";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Label from "../FitnessTexts/Label";
import Paragraph2 from "../FitnessTexts/Paragraph2";
import Label1 from "../FitnessTexts/Lable1";
import { useParams } from "react-router-dom";

const InputPassword = (props) => {
	const params = useParams();
	const { children, label, error, spanprops, pr, ...inputprops } = props;
	return (
		<>
			<Label1 name={inputprops?.id}>{label}</Label1>
			<InputGroup size="auto">
				<Input
					{...inputprops}
					pr="4.5rem"
					background="head2"
					px="4"
					border="none"
					w={{ base: "100%", md: "90%", lg: "90%", xl: "90%" }}
					size="sm"
					rounded="lg"
					autoComplete={params?.id ? "current-password" : "new-password"}
				/>
				<InputRightElement
					h="full"
					pt={{ base: "0", lg: "0" }}
					display={"flex"}
					flexDirection={"column"}
					justifyContent={"center"}
					alignItems={"center"}
					pr={
						props.pr ?? {
							base: "0.9rem",
							lg: "2.0rem",
							md: "2.0rem",
							xl: "2.2rem",
						}
					}
				>
					<span size="lg" background="#F5F9FF" onClick={spanprops}>
						{children}
					</span>
				</InputRightElement>
			</InputGroup>
			{error && <ErrorText> {error}</ErrorText>}
		</>
	);
};

export default InputPassword;
