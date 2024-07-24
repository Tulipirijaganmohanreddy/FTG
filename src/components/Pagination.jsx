import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Flex, Input, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCompletionReportApiCall } from "../DistrictAdminApis/districtAdminSlice";
import { debounce } from "../Utilities/utils";

const Pagination = () => {
	const dispatch = useDispatch();

	const totalPages = useSelector((state) => state.teacher.totalPages);
	const reportData = useSelector((state) => state.districtAdmin.reportPdfData);

	const timerRef = useRef(null); // Store the previous timeout

	const [inputPage, setInputPage] = useState(1);
	const [prevValue, setPrevValue] = useState(inputPage);

	const reportPayload = useSelector(
		(state) => state.districtAdmin.initialPayloadForReports,
	);
	const reportFilter = useSelector((state) => state.districtAdmin.reportFilter);
	const token = useSelector((state) => state.profile.token);

	const apiCallObj = {
		"FitnessGram Completion Report": (body) => {
			dispatch(getCompletionReportApiCall({ body, token }));
		},
	};
	const handlePageChange = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages) {
			setInputPage(newPage);
		}
		// apiCallObj[reportFilter]({ ...reportPayload, pageNo: newPage });
	};

	const handleInputChange = (event) => {
		const newPage = event.target.value;
		setInputPage(newPage);
		// if (!isNaN(newPage)) {
		//   setPrevValue(newPage);
		// }
	};

	const handleInputBlur = (e) => {
		if (!e.target.value) {
			setInputPage(prevValue);
		}
	};

	useEffect(() => {
		clearTimeout(timerRef.current); // clear previous timeout

		timerRef.current = setTimeout(() => {
			timerRef.current = null; // Reset timerRef when timer finally ends

			if (inputPage && inputPage !== prevValue) {
				apiCallObj[reportFilter]({ ...reportPayload, pageNo: inputPage });
				setPrevValue(inputPage);
			}
		}, 500);

		return () => clearTimeout(timerRef.current);
	}, [inputPage]);

	return (
		<Flex justifyContent={"center"}>
			<Button onClick={() => handlePageChange(1)} disabled={inputPage === 1}>
				{"<<"}
			</Button>
			<Button
				onClick={() => handlePageChange(inputPage - 1)}
				disabled={inputPage === 1}
			>
				{"<"}
			</Button>
			<Flex alignItems={"center"}>
				<Input
					type="number"
					value={inputPage}
					onChange={handleInputChange}
					onBlur={handleInputBlur}
					max={totalPages}
					w="30px"
					h="30px"
					p="0"
					textAlign={"center"}
					rounded={"full"}
				/>
				<Text mt="0.5">{`/${totalPages}`}</Text>
			</Flex>

			<Button
				onClick={() => handlePageChange(inputPage + 1)}
				disabled={inputPage === totalPages}
			>
				{">"}
			</Button>
			<Button
				onClick={() => handlePageChange(totalPages)}
				disabled={inputPage === totalPages}
			>
				{">>"}
			</Button>
		</Flex>
	);
};

export default Pagination;
