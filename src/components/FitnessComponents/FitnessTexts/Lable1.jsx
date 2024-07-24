import { FormLabel, Text } from "@chakra-ui/react";
import React from "react";

const Label1 = ({
	children,
	textColor,
	increaseText,
	decreaseMarginTop,
	filter,
	changeCursorPointer,
	whiteSpace,
	name,
}) => {
	return (
		<Text
			as="label"
			htmlFor={name}
			textStyle={increaseText !== undefined ? increaseText : "paragraph2"}
			color={textColor !== undefined ? textColor : "black-2"}
			mb="0.5"
			mt={decreaseMarginTop !== undefined ? decreaseMarginTop : "0"}
			filter={filter !== undefined && filter}
			cursor={changeCursorPointer ? changeCursorPointer : ""}
			whiteSpace={whiteSpace ? whiteSpace : ""}
		>
			{children}
		</Text>
	);
};

export default Label1;
