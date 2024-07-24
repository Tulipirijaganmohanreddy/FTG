import { Box, Button, Spinner, Text } from "@chakra-ui/react";
import React from "react";

const NegativeButton = (props) => {
	const { text, isLoading, bg, ...buttonprops } = props;
	return (
		<Button
			{...buttonprops}
			color={bg ? "white" : "black"}
			borderRadius="3xl"
			// background={bg ? bg : "#EEEEEE"}
			type="button"
			bg={bg ? bg : "#EEEEEE"}
			width={{ base: "6rem", md: "6.5rem", lg: "7rem" }}
			fontSize={{ base: "xs", md: "13px", lg: "13px" }}
			fontWeight="normal"
			size="sm"
		>
			{isLoading ? <Spinner /> : text}
		</Button>
	);
};

export default NegativeButton;
