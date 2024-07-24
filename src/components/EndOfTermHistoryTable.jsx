import React, { useEffect, useState } from "react";
import SubHeading from "./FitnessComponents/FitnessTexts/SubHeading";
import loadingImg from "../assets/Images/FitnessGramEventImages/loading.gif";
import {
	Center,
	Image,
	Table,
	TableContainer,
	Tbody,
	Td,
	Thead,
	Tr,
} from "@chakra-ui/react";
import NoDataFoundText from "./FitnessComponents/FitnessTexts/NoDataFoundText";
import { useSelector } from "react-redux";
import { promoteStudentHistoryApi } from "../DistrictAdminApis/district.service";
import moment from "moment";

const tableHeading = "View Log";

const endOfTermTableHeaders = [
	"Last Executed",
	"Activity",
	"Records Updated",
	"By",
];

const EndOfTermHistoryTable = ({ isStudentsPromoted }) => {
	const token = useSelector((state) => state?.profile?.token);

	const districtId = useSelector(
		(state) => state?.profile?.loggedInUserDetails?.district_uuid,
	);

	const [promoteStudentsTableData, setPromoteStudentsTableData] = useState([]);
	const [loading, setLoading] = useState(false);

	const handleTableApiCall = async () => {
		const body = {
			request_type: isStudentsPromoted || "all",
			uuid: districtId,
		};

		try {
			setLoading(true);
			const promoteStudentHistoryResult = await promoteStudentHistoryApi({
				token,
				body,
			});
			if (promoteStudentHistoryResult?.code === 200) {
				setPromoteStudentsTableData(promoteStudentHistoryResult?.response);
			}
		} catch (error) {
			console.log(error, "rerrrrrrr");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		handleTableApiCall();
	}, [isStudentsPromoted]);

	return (
		<>
			<SubHeading>{tableHeading}</SubHeading>

			{loading ? (
				<Center justify="center">
					<Image src={loadingImg} />
				</Center>
			) : (
				<TableContainer
					height="auto"
					maxH="calc(100vh - 12rem)"
					overflowY="auto"
				>
					<Table>
						<Thead>
							<Tr>
								{endOfTermTableHeaders?.map((headerName, index) => (
									<Td key={`table-headerName-${index}`}>{headerName}</Td>
								))}
							</Tr>
						</Thead>
						<Tbody>
							{promoteStudentsTableData?.length
								? promoteStudentsTableData?.map((eachRow, index) => (
										<Tr>
											<Td>
												{moment
													.utc(eachRow?.activity_date)
													.format("MM-DD-YYYY")}
											</Td>
											<Td>{eachRow?.type}</Td>
											<Td>{eachRow?.count}</Td>
											<Td>
												{`${eachRow?.adminUser?.last_name} ${eachRow?.adminUser?.first_name}` ||
													"N/A"}
											</Td>
										</Tr>
								  ))
								: null}
						</Tbody>
					</Table>
					{!promoteStudentsTableData?.length && (
						<NoDataFoundText>No Records Found</NoDataFoundText>
					)}
				</TableContainer>
			)}
		</>
	);
};

export default EndOfTermHistoryTable;
