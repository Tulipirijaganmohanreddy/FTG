import { Box, Flex, GridItem, Image, Img, Tooltip } from "@chakra-ui/react";
import React from "react";
import girlImg from "../../../assets/Images/FitnessGramEventImages/Group 3776@2x.png";
import calendarImg from "../../../assets/Images/FitnessGramEventImages/Icon awesome-calendar-alt@2x.png";
import Heading4 from "../../../components/FitnessComponents/FitnessTexts/Heading4";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import Paragraph2new from "../../../components/FitnessComponents/FitnessTexts/Paragraph2new";
import ParagraphWithColorPrimary from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorPrimary";

import moment from "moment";
import pendingImage from "../../../assets/Images/ActivityGramEventImages/clock-rotate-right-icon.svg";
import tickImage from "../../../assets/Images/ActivityGramEventImages/tick-icon.svg";
import excerciseImg from "../../../assets/Images/FitnessGramEventImages/exerciseIcon.svg";

const StudentEventDataCard = ({
	each,
	index,
	setSelectedEventCardData,
	setIsViewDataClicked,
}) => {
	return (
		<GridItem
			shadow="lg"
			rounded={"lg"}
			mb="3"
			key={`${index}event-card-${each.uuid}`}
		>
			<Flex justify={"space-between"} p="3" bg="head" roundedTop={"xl"}>
				<Tooltip
					hasArrow
					label={each?.event_name}
					bg="primary"
					color="white"
					borderRadius={"md"}
					textTransform="capitalize"
				>
					<Box maxW={{ base: "40px", md: "200px" }} overflow={"hidden"}>
						<Heading6 textTransform="capitalize" isTruncated>
							{each.event_name}
						</Heading6>
					</Box>
				</Tooltip>

				<Flex gap="1" cursor="pointer">
					<Img src={each.results ? tickImage : pendingImage} alt="image" />

					<Box mt="0.5">
						<NormalHeading changeTextColor={each.results ? "fit" : "red"}>
							{each.results ? "Validated" : "Pending"}
						</NormalHeading>
					</Box>
				</Flex>
			</Flex>

			<Flex justifyContent="space-between">
				<Box pt="2" pl="2">
					<Heading4new textTransform="capitalize" letterSpacing={"tight"}>
						{" "}
						Type : {each.event_type}
					</Heading4new>

					<Flex mt="3" gap="2">
						<Image
							src={calendarImg}
							mt="1"
							w={{ base: "5", md: "5", lg: "4" }}
							h={{ base: "5", md: "5", lg: "4" }}
						/>

						<Paragraph2new
							decreaseMarginTop={{
								base: "0.4rem",
								md: "0.3rem",
								lg: "0.2rem",
								xl: "0.25rem",
								"2xl": "0.2rem",
							}}
						>
							Start Date:
							{moment(each?.start_date).format(
								navigator.language === "en-GB" ? "DD-MM-YYYY" : "MM-DD-YYYY",
							)}
						</Paragraph2new>
					</Flex>

					<Box display={"flex"} gap={"3"} mt="2">
						<Img src={excerciseImg} alt="excercise-image" />

						<Box mt="0.5">
							<Heading4 textTransform="capitalize">
								{each.total_test_items} Test Items
							</Heading4>
						</Box>
					</Box>
				</Box>

				<Box w="6rem" mt="2" mr="2">
					<Image src={girlImg} w={"80%"} float="right" />
				</Box>
			</Flex>
			<Flex justifyContent="center">
				<Box
					m="2"
					onClick={() => {
						setSelectedEventCardData(each);
						setIsViewDataClicked(true);
					}}
					textDecoration="underline"
					textDecorationColor="primary"
					role="button"
				>
					<ParagraphWithColorPrimary>View Data</ParagraphWithColorPrimary>
				</Box>
			</Flex>
		</GridItem>
	);
};

export default StudentEventDataCard;
