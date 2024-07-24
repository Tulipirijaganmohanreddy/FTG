import { Text } from "@chakra-ui/react";
import React from "react";

const NoDataFoundText = ({ children }) => {
	return (
		<>
			<Text textStyle="heading3" color="red" textAlign={"center"} mt="5" mb="5">
				{children}
			</Text>
		</>
	);
};

export default NoDataFoundText;
