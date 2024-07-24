import React from "react";
import Heading1 from "./FitnessComponents/FitnessTexts/Heading1";
import { Flex } from "@chakra-ui/react";

export default function UnavailablePage() {
	return (
		<Flex
			h="100%"
			direction="column"
			justifyContent="center"
			alignItems="center"
		>
			<Heading1>
				This page is unavailable until the 2024-2025 opt-in form is complete.
			</Heading1>
			<Heading1>
				More information available{" "}
				<a target="_blank" href="https://help.fitnessgram.net/texas/">
					https://help.fitnessgram.net/texas/
				</a>
			</Heading1>
		</Flex>
	);
}
