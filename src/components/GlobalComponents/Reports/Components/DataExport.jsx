import {
	Box,
	Card,
	CardBody,
	Flex,
	Image,
	ListItem,
	Text,
	UnorderedList,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import Heading4 from "../../../FitnessComponents/FitnessTexts/Heading4";
import PositiveButton from "../../../PositiveButton";
import Heading1 from "../../../FitnessComponents/FitnessTexts/Heading1";
import Heading8 from "../../../FitnessComponents/FitnessTexts/Heading8";
import Heading2 from "../../../FitnessComponents/FitnessTexts/Heading2";
import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";
import csv from "../../../../assets/Images/ReportImages/dataExportcsv.png";
import ReportFilters, { initialPayload } from "./ReportFilters";
import { dataExportData } from "../Config/config";
import SubHeadingText from "../../../FitnessComponents/District/DataManagement/SubHeadingText";
import { useState } from "react";
import {
	setInitialPayloadForReports,
	setReportFilter,
	setReportFilterDataObject,
	setReportFilterFormDataObject,
} from "../../../../DistrictAdminApis/districtAdminSlice";
import { academicYear } from "../../../../Utilities/utils";
import { useDispatch, useSelector } from "react-redux";

const DataExport = () => {
	const { listItems, title, text, subHead, usageText1, usageText2 } =
		dataExportData;

	const dispatch = useDispatch();

	const [isFilterOpenedFirstTime, setIsFilterOpenedFirstTime] = useState(null);
	const schoolAcademicYear = useSelector(
		(state) => state.districtAdmin.schoolAcademicYear,
	);

	useEffect(() => {
		dispatch(setReportFilter("dataExport"));
		const payload = initialPayload["dataExport"];
		dispatch(
			setInitialPayloadForReports({
				...payload,
				start_date: schoolAcademicYear?.start_date || "01 July 2023",
				end_date: schoolAcademicYear?.end_date || "30 June 2024",
				academic_year: schoolAcademicYear?.years?.[0] || academicYear(),
			}),
		);
	}, []);
	return (
		<>
			<Box>
				{listItems &&
					listItems?.map((item) => (
						<Card
							role="button"
							bg="#f5f5f5"
							boxShadow="sm"
							border="1"
							mt="4"
							height="14"
							justifyContent="center"
							// onClick={() => cardItemClicked(item)}
						>
							<CardBody
								display="flex"
								alignItems="center"
								justifyContent="flex-start"
								cursor={"pointer"}
							>
								{/* <Image src={item.img} width="8" /> */}

								<Box px="5">
									<Heading4> {item.name}</Heading4>
								</Box>
							</CardBody>
						</Card>
					))}
			</Box>

			<Box textAlign={"end"}>
				<ReportFilters
					setIsFilterOpenedFirstTime={setIsFilterOpenedFirstTime}
					isFilterOpenedFirstTime={isFilterOpenedFirstTime}
				/>
			</Box>
			<Box p="4">
				<Heading2>{title}</Heading2>
				<Box mt="3">
					<Paragraph2>{text}</Paragraph2>
				</Box>

				<Flex mt="5" gap="5">
					<Box>
						<Image src={csv} w={"30rem"} />
					</Box>
					<Box a>
						<Heading2>{subHead}</Heading2>
						<UnorderedList>
							<ListItem>
								<Paragraph2>{usageText1}</Paragraph2>
							</ListItem>
							<ListItem>
								<Paragraph2>{usageText2}</Paragraph2>
							</ListItem>
						</UnorderedList>
					</Box>
				</Flex>
			</Box>
		</>
	);
};

export default DataExport;
