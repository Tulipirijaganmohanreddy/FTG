import { FormControl, FormHelperText, Input } from "@chakra-ui/react";
import React from "react";
import ErrorText from "../FitnessTexts/ErrorText";
import Label1 from "../FitnessTexts/Lable1";
import { useParams } from "react-router-dom";

const Inputs = (props) => {
	const params = useParams();
	const {
		label,
		error,
		changeLabel,
		mandate,
		bg,
		border,
		helperText,
		...inputprops
	} = props;

	return (
		<FormControl
			w="100%"
			display="flex"
			flexDir="column"
			isRequired={props?.mandate ? props?.mandate : null}
		>
			<Label1 name={inputprops?.id}>{label}</Label1>

			<Input
				{...inputprops}
				//size={{ base: "sm", md: "sm", lg: "md" }}
				fontSize={{ base: "xs", lg: "sm", md: "sm" }}
				bg={bg ? bg : "input.100"}
				border={border ? border : "0"}
				w={{ base: "100%", md: "90%", lg: "90%" }}
				size="sm"
				rounded="lg"
				autoComplete={
					inputprops?.name === "user_name"
						? params?.id
							? "current-username"
							: "new-username"
						: null
				}
				id={inputprops?.id}
			/>
			{helperText && (
				<FormHelperText textStyle={"p"} mt="0.3rem" color={"gray-2"}>
					{helperText}
				</FormHelperText>
			)}
			{error && <ErrorText> {error}</ErrorText>}
		</FormControl>
	);
};

export default Inputs;
