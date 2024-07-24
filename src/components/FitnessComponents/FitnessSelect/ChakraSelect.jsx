import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import React from "react";
import Label from "../FitnessTexts/Label";
import { Select } from "chakra-react-select";
import Paragraph2 from "../FitnessTexts/Paragraph2";
import ErrorText from "../FitnessTexts/ErrorText";
import Label1 from "../FitnessTexts/Lable1";

const ChakraSelect = (props) => {
	const { label, increaseMarginTop, className, error, mb, ...selectprops } =
		props;

	return (
		<>
			<FormLabel
				w="100%"
				display="flex"
				flexDir="column"
				mt={increaseMarginTop !== undefined && increaseMarginTop}
				mb={mb ? mb : ""}
			>
				<Label1 decreaseMarginTop="0" name={selectprops?.id}>{label}</Label1>

				<Box
					bg="input.100"
					px="2"
					w={{ base: "100%", lg: "90%", md: "90%" }}
					rounded="lg"
				>
					<Select
						size="sm"
						rounded="lg"
						{...selectprops}
						variant="unstyled"
						closeMenuOnSelect
						isClearable={false}
						placeholder="Start Typing..."
						className={"classname "}
					/>
				</Box>
				{error && <ErrorText> {error}</ErrorText>}
			</FormLabel>
		</>
	);
};

export default ChakraSelect;
