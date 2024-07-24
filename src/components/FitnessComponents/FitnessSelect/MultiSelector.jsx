import React from "react";
import { Select as MultiSelect } from "chakra-react-select";
import Label from "../FitnessTexts/Label";
import { Box, FormControl } from "@chakra-ui/react";
import ErrorText from "../FitnessTexts/ErrorText";
import Paragraph2 from "../FitnessTexts/Paragraph2";
import Label1 from "../FitnessTexts/Lable1";

const MultiSelector = (props) => {
	const { label, error, width, ...multiselectprops } = props;

	const customStyles = {
		menu: (provided) => ({
			...provided,
			borderRadius: "10px",
		}),
	};

	return (
		<FormControl>
			<Label1 name={multiselectprops?.id}>{label}</Label1>

			<Box
				bg="input.100"
				border="0"
				rounded="md"
				id={multiselectprops?.id}
				px="2"
				w={width ? width : { base: "100%", md: "90%", lg: "90%" }}
				display="flex"
				flexDir="column"
			>
				<MultiSelect
					{...multiselectprops}
					variant="unstyled"
					colorScheme="bg"
					isMulti
					closeMenuOnSelect
					isClearable={false}
					size="sm"
					styles={customStyles}
				/>
			</Box>
			{error && <ErrorText> {error}</ErrorText>}
		</FormControl>
	);
};

export default MultiSelector;
