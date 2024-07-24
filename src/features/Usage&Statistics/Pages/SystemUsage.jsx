import React, { useEffect, useRef, useState } from "react";

import systemUsageIcon from "../../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/systemUsage.svg";

import { Line } from "react-chartjs-2";

import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	getDistrictStatistics,
	setDistrictStatistics,
} from "../../../DistrictAdminApis/districtAdminSlice";
import HeadingWithImages from "../../../components/FitnessComponents/District/DataManagement/HeadingWithImages";
import SubHeadingText from "../../../components/FitnessComponents/District/DataManagement/SubHeadingText";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import { getDistrictsBySearchInDistrcitLookUp } from "../../../store/slices/superAdminSlice/superAdminSlice";
import { debounce } from "../../../Utilities/utils";
import { getDistrictsForRoleChange } from "../../../APIS/SuperAdmin/CMS/cms.service";

const SystemUsage = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state?.profile?.token);
	const selectedRole = useSelector((state) => state?.profile?.selectedRole);
	const loading = useSelector((state) => state?.districtAdmin?.loading);
	const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);
	const districtStatistics = useSelector(
		(state) => state?.districtAdmin?.districtStatistics,
	);

	const districts = useSelector(
		(state) => state?.superAdmin?.districtsBySearchInDistrcitLookUp,
	);
	const searchRef = useRef();
	const [districtsList, setDistrictsList] = useState([]);

	const [data, setData] = useState([]);

	const [date, setDate] = useState([]);
	const [dateCount, setDateCount] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState({
		label: "Select..",
		value: "",
	});

	const onhandleChange = (district) => {
		setSelectedDistrict((prevState) => ({
			...prevState,
			label: district.label,
			value: district.value,
		}));
		dispatch(getDistrictStatistics({ token, uuid: district.value }));
	};

	const handleData = (list) => {
		setDate([...list.map((item) => item.date)]);
		setDateCount([...list.map((item) => item.datecount)]);
	};

	useEffect(() => {
		setData(districtStatistics);
	}, [districtStatistics]);
	useEffect(() => {
		handleData(data);
	}, [data]);

	const area_data = {
		showTooltips: true,

		labels: date,
		datasets: [
			{
				label: "Users",
				data: dateCount,
				backgroundColor: "#FCB131",
				borderColor: "#FCB131",
				tension: 0.4,
				fill: true,
			},
		],
	};

	const area_options = {
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				ticks: {
					suggestedMin: 0,
					beginAtZero: true,
					// steps: 50,
					// stepSize: 15,
				},
			},
		},

		elements: {
			point: {
				borderWidth: 0,
				radius: 0,
				background: "#36B24A",
			},
		},
		plugins: {
			legend: {
				display: false,
				// position: "bottom",
				labels: {
					boxWidth: 10,
				},
				toolTip: {
					enabled: false,
				},
				datalabels: {
					display: true,
					color: "black",
					align: "end",
					anchor: "end",
					font: { size: "14" },
				},
			},
		},
	};

	const handleDistrictsList = (districts) => {
		if (districts?.length) {
			let arr = districts.map((district) => ({
				label: district?.district_name,
				value: district?.uuid,
			}));
			setDistrictsList(arr);
		} else {
			setDistrictsList([]);
		}
	};

	const handleInputChange = debounce(async (searchText) => {
		if (searchText?.length != 1 && searchRef.current != searchText) {
			const response = await getDistrictsForRoleChange({
				body: { search: searchText },
				token,
			});
			handleDistrictsList(response.data.response);
			searchRef.current = searchText;
		}
	}, 500);

	useEffect(() => {
		handleDistrictsList(districts);
	}, [districts]);

	useEffect(() => {
		if (
			(selectedRole === "superAdmin" && duplicateRole === "districtAdmin") ||
			selectedRole === "districtAdmin"
		) {
			dispatch(getDistrictStatistics({ token }));
		}
		!districts?.length &&
			selectedRole === "stateAdmin" &&
			dispatch(
				getDistrictsBySearchInDistrcitLookUp({ token, body: { search: "" } }),
			);
		return () => {
			dispatch(setDistrictStatistics([]));
		};
	}, [token]);

	return (
		<Box margin={{ base: "0rem", md: "1rem", lg: "1rem" }}>
			<Box border="">
				<HeadingWithImages textName="SYSTEM USAGE" image={systemUsageIcon} />

				{selectedRole === "stateAdmin" && (
					<Flex direction={"column"} gap={3}>
						<ChakraSelect
							id="districtName"
							placeholder="Select"
							label={"District Name"}
							name={"district_name"}
							onChange={onhandleChange}
							onInputChange={handleInputChange}
							value={selectedDistrict}
							options={districtsList}
							mb="0.4px"
						/>
					</Flex>
				)}

				{loading ? (
					<Center h="80vh">
						<Spinner color="gray-3" />
					</Center>
				) : districtStatistics?.length > 0 ? (
					<>
						<Box mt="10" mb="2" ml={{ base: "4", md: "12" }}>
							<SubHeadingText headingName="Weekly logins" />
						</Box>

						<Box marginTop="2rem" w="100%">
							<Line options={area_options} data={area_data} />
						</Box>

						<Label>
							Statistics are based on the total number of system logins by role
							over the past 7 days.
						</Label>
					</>
				) : (
					selectedRole !== "stateAdmin" && (
						<Label>No Past Logins for the User</Label>
					)
				)}
			</Box>
		</Box>
	);
};

export default SystemUsage;
