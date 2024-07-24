import {
	Box,
	Card,
	Divider,
	Flex,
	Grid,
	GridItem,
	Spacer,
	Spinner,
	Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getLicenseHistory,
	setLicenseHistory,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import { useParams } from "react-router-dom";
import SubHeading from "../../../components/FitnessComponents/FitnessTexts/SubHeading";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";

const LicenseHistory = (props) => {
	const { activeTab } = props;
	const dispatch = useDispatch();
	const params = useParams();

	const token = useSelector((state) => state?.profile?.token);
	const licenseHistory = useSelector(
		(state) => state?.superAdmin?.licenseHistory,
	);

	const loading = useSelector((state) => state.superAdmin.loading);

	const updateLicenceByIdCode = useSelector(
		(state) => state.superAdmin.updateLicenceByIdCode,
	);

	const [licenseHistoryData, setLicenseHistoryData] = useState([]);
	const [particularData, setParticularData] = useState([]);
	const [showData, setShowData] = useState(false);
	const [activeHistoryIndex, setActiveHistoryIndex] = useState(0);

	const COLUMN_NAME_TO_DISPLAY_NAME = {
		start_date: "Start Date",
		end_date: "End Date",
		notes: "Notes",
		school_limit: "School Limit",
		category: "Category",
	};
	const LICENSE_CATEGORY_OBJ = {
		0: "Plantinum",
		1: "Gold",
	};

	const FUNCTIONS_OBJ = {
		LicenseDataUpdate(item) {
			const { adminUser, updated_data, type, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { column_name, prev_val, new_val } = updated_data;

			let statement = `${first_name} ${last_name} changed ${
				COLUMN_NAME_TO_DISPLAY_NAME[column_name]
			} 


      ${column_name === "notes" ? "" : "from"} 

      ${
				column_name === "notes"
					? ""
					: column_name === "school_limit"
					? prev_val
					: column_name === "category"
					? LICENSE_CATEGORY_OBJ[prev_val]
					: isNaN(prev_val) === true
					? moment(prev_val?.split("T")[0])?.format(
							navigator.language === "en-GB" ? "MM/DD/YYYY" : "MM/DD/YYYY",
					  )
					: moment(prev_val)?.format(
							navigator.language === "en-GB" ? "MM/DD/YYYY" : "MM/DD/YYYY",
					  )
			}
        
        ${column_name === "notes" ? "" : "to"} 
        ${
					column_name === "notes"
						? ""
						: column_name === "school_limit"
						? new_val
						: column_name === "category"
						? LICENSE_CATEGORY_OBJ[new_val]
						: moment(new_val)?.format(
								navigator.language === "en-GB" ? "MM/DD/YYYY" : "MM/DD/YYYY",
						  )
				} 
      
      
      
      
      
      `;

			return {
				statement,
				action_date: createdAt,
				type,
				school_names: [],
				prev_val,
				new_val,
				column_name,
				createdAt,
			};
		},
		schoolRemovedFromLicense(item) {
			const { adminUser, updated_data, type, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { column_name, prev_val, new_val } = updated_data;

			let statement = `${first_name} ${last_name} removed 1 school`;

			let school_names = [updated_data]?.map((school) => school.school_name);
			return {
				statement,
				type,
				createdAt,
				action_date: createdAt,
				school_name: updated_data["school_name"],
				school_names,
			};
		},
		addedSchoolsToLicense(item) {
			const { adminUser, updated_data, type, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { column_name, prev_val, new_val } = updated_data;

			let school_names = updated_data.map((school) => school.school_name);

			let statement = `${first_name} ${last_name} added ${
				school_names?.length
			} ${school_names?.length > 1 ? "schools" : "school"}`;

			return {
				statement,
				type,
				action_date: createdAt,
				createdAt,
				school_names,
			};
		},
		IndividualSchoolDateUpdate(item) {
			const { adminUser, updated_data, type, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { column_name, prev_val, new_val } = updated_data;

			let statement = `${first_name} ${last_name} modified dates for 1 school`;

			let school_details = [];
			if (Object.keys(updated_data).includes("new_start_date")) {
				let obj = {
					name: `${updated_data["school_name"]} - Start Date`,
					new_value: updated_data["new_start_date"],
					old_value: updated_data["license_start_date"],
				};
				school_details.push(obj);
			}
			if (Object.keys(updated_data).includes("new_end_date")) {
				let obj = {
					name: `${updated_data["school_name"]} - End Date`,
					new_value: updated_data["new_end_date"],
					old_value: updated_data["license_end_date"],
				};
				school_details.push(obj);
			}

			return {
				statement,
				type,
				createdAt,
				action_date: createdAt,
				school_details,
			};
		},

		bulkSchoolDatesUpdate(item) {
			const { adminUser, updated_data, type, count, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { column_name, prev_val, new_val } = updated_data;

			let statement = `${first_name} ${last_name} modified dates for ${count} school(s)`;

			let school_details = [];
			updated_data.forEach((school) => {
				if (Object.keys(school).includes("new_start_date")) {
					let obj = {
						name: `${school["school_name"]} - Start Date`,
						new_value: school["new_start_date"],
						old_value: school["license_start_date"],
					};
					school_details.push(obj);
				}
				if (Object.keys(school).includes("new_end_date")) {
					let obj = {
						name: `${school["school_name"]} - End Date`,
						new_value: school["new_end_date"],
						old_value: school["license_end_date"],
					};
					school_details.push(obj);
				}
			});

			return {
				statement,
				type,
				createdAt,
				action_date: createdAt,
				school_details,
			};
		},

		licenseCreated(item) {
			const { adminUser, updated_data, type, createdAt } = item;

			const { first_name, last_name } = adminUser;
			const {
				column_name,
				prev_val,
				new_val,
				district_name,
				state_name,
				end_date,
				start_date,
			} = updated_data;

			let statement = `${first_name} ${last_name} created the license for ${
				state_name ? state_name : district_name
			}`;

			return {
				statement,
				action_date: createdAt,
				type,
				first_name,
				last_name,
				district_name,
				state_name,
				start_date,
				end_date,
				createdAt,
			};
		},
		MassSchoolDatesUpdate(item) {
			const { adminUser, updated_data, type, count, createdAt } = item;
			const { first_name, last_name } = adminUser;
			const { new_end_date, pre_end_date } = updated_data;

			let statement = `${first_name} ${last_name} modified license end date from  ${pre_end_date} to ${new_end_date} for ${count} school(s)`;
			return {
				statement,
				type,
				createdAt,
				action_date: createdAt,
			};
		},
	};

	const handleHistoryCheck = (historyData, key) => {
		setShowData(true);
		setParticularData([historyData]);
		setActiveHistoryIndex(key);
	};

	const output = licenseHistoryData?.map((item) => {
		return FUNCTIONS_OBJ[item["type"]](item);
	});

	useEffect(() => {
		setLicenseHistoryData(licenseHistory);
	}, [licenseHistory]);

	useEffect(() => {
		dispatch(
			getLicenseHistory({
				id: params?.licenseId,
				token: token,
			}),
		);
	}, []);
	useEffect(() => {
		if (licenseHistory?.length) {
			setShowData(true);
			const data = licenseHistory?.[0];
			const output = FUNCTIONS_OBJ[data["type"]](data);
			setParticularData([output]);
		}
	}, [licenseHistory]);
	useEffect(() => {
		return () => {
			setParticularData([]);
		};
	}, []);

	useEffect(() => {
		if (updateLicenceByIdCode === 200 && activeTab === 2)
			dispatch(
				getLicenseHistory({
					id: params?.licenseId,
					token: token,
				}),
			);
	}, [updateLicenceByIdCode]);
	return (
		<Box>
			{loading ? (
				<LoadingComponent />
			) : (
				<>
					<Box mt="5">
						<SubHeading>LICENSE HISTORY</SubHeading>
						<Grid templateColumns="repeat(2, 1fr)" gap="0" mt="5">
							<GridItem
								maxHeight={"50vh"}
								overflow={"auto"}
								className="example"
							>
								<Card>
									<Box>
										{output?.length
											? output?.map((item, key) => (
													<>
														<Flex
															px="4"
															py="3"
															key={key}
															cursor="pointer"
															role="button"
															onClick={() => handleHistoryCheck(item, key)}
															bg={
																activeHistoryIndex === key
																	? "bg.100"
																	: "transparent"
															}
														>
															<Box>
																<Text textStyle={"p"} whiteSpace={"wrap"}>
																	{
																		<Text textStyle={"p"} whiteSpace="wrap">
																			{item?.statement}
																		</Text>
																	}
																</Text>
															</Box>
															<Spacer />
															<Box>
																<Text textStyle={"p"}>
																	{moment(item?.createdAt).format(
																		navigator.language === "en-GB"
																			? "MM/DD/YYYY"
																			: "MM/DD/YYYY",
																	)}
																</Text>
															</Box>
														</Flex>
														{output.length - 1 === key ? null : <Divider />}
													</>
											  ))
											: "No Data Found"}
									</Box>
								</Card>
							</GridItem>

							{showData === true ? (
								<GridItem p="2" overflow={"auto"}>
									{particularData
										? particularData.map((item, key) => (
												<>
													<Flex justifyContent={"space-between"}>
														<Text w="60%" textStyle={"heading6"}>
															{item?.statement}
														</Text>
														<Box>
															<Text textStyle={"heading6"} whiteSpace={"wrap"}>
																{moment(item?.action_date).format(
																	"ddd MMM DD YYYY h:mm A",
																)}
															</Text>
														</Box>
													</Flex>
													<Divider />

													{item?.school_names?.map((name, index) => (
														<>
															<Flex m="3">
																<Text
																	textStyle={"paragraph2"}
																	whiteSpace={"nowrap"}
																>
																	School Name :
																</Text>
																<Text mx="2" textStyle={"paragraph2"}>
																	{name}
																</Text>
															</Flex>
														</>
													))}

													{item?.type === "bulkSchoolDatesUpdate" ||
													item?.type === "IndividualSchoolDateUpdate" ? (
														item?.school_details?.map((data, index) => (
															<>
																<Flex m="3" key={"b" + index}>
																	<Box>
																		<Text textStyle={"paragraph2"}>
																			{data?.name}
																		</Text>
																	</Box>
																	<Spacer />
																	<Box>
																		<Flex
																			justifyContent="space-between"
																			alignItems="center"
																		>
																			<Box mx="3">
																				<Text textStyle={"paragraph2"}>
																					{moment(data?.new_value).format(
																						navigator.language === "en-GB"
																							? "MM/DD/YYYY"
																							: "MM/DD/YYYY",
																					)}
																				</Text>
																			</Box>
																			<Box>
																				<Text
																					textStyle={"paragraph2"}
																					textDecoration={"line-through"}
																				>
																					{moment(data?.old_value).format(
																						navigator.language === "en-GB"
																							? "MM/DD/YYYY"
																							: "MM/DD/YYYY",
																					)}
																				</Text>
																			</Box>
																		</Flex>
																	</Box>
																</Flex>
															</>
														))
													) : item.type === "LicenseDataUpdate" ? (
														<Flex justifyContent="space-between" m="3">
															<Box>
																<Text textStyle={"paragraph2"}>
																	{item.column_name === "notes" ||
																	item.column_name === "school_limit"
																		? item.new_val?.length
																			? item.new_val
																			: "--NA--"
																		: item.column_name === "category"
																		? LICENSE_CATEGORY_OBJ[item.new_val]
																		: moment(item.new_val).format(
																				navigator.language === "en-GB"
																					? "MM-DD-YYYY"
																					: "MM-DD-YYYY",
																		  )}
																</Text>
															</Box>
															<Box>
																<Text as="s" textStyle={"paragraph2"}>
																	{item.column_name === "notes" ||
																	item.column_name === "school_limit"
																		? item.prev_val
																		: item.column_name === "category"
																		? LICENSE_CATEGORY_OBJ[item.prev_val]
																		: moment(item.prev_val).format(
																				navigator.language === "en-GB"
																					? "MM-DD-YYYY"
																					: "MM-DD-YYYY",
																		  )}
																</Text>
															</Box>
														</Flex>
													) : (
														item.type === "licenseCreated" && (
															<>
																<Flex m="3">
																	<Text textStyle={"paragraph2"}>
																		License Name :
																	</Text>
																	<Text mx="1" textStyle={"paragraph2"}>
																		{item.district_name}
																	</Text>
																</Flex>
																<Flex m="3">
																	<Text textStyle={"paragraph2"}>
																		First Name :
																	</Text>
																	<Text mx="1" textStyle={"paragraph2"}>
																		{item.first_name}
																	</Text>
																</Flex>
																<Flex m="3">
																	<Text textStyle={"paragraph2"}>
																		Last Name :
																	</Text>
																	<Text mx="1" textStyle={"paragraph2"}>
																		{item.last_name}
																	</Text>
																</Flex>
																<Flex m="3">
																	<Text textStyle={"paragraph2"}>
																		Start Date :
																	</Text>
																	<Text mx="1" textStyle={"paragraph2"}>
																		{item.start_date}
																	</Text>
																</Flex>
																<Flex m="3">
																	<Text textStyle={"paragraph2"}>
																		End Date :
																	</Text>
																	<Text mx="1" textStyle={"paragraph2"}>
																		{item.end_date}
																	</Text>
																</Flex>
															</>
														)
													)}
												</>
										  ))
										: ""}
								</GridItem>
							) : null}
						</Grid>
					</Box>
				</>
			)}
		</Box>
	);
};

export default LicenseHistory;
