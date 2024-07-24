import React, { useEffect, useRef, useState } from "react";

import { Bar } from "react-chartjs-2";

import districtStaticticsIcon from "../../../assets/Images/Navbar/SideNavBarImages/DistrictAdminImages/districtStatistics.svg";

import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import { Box, Center, Flex, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	getAccessLogCounts,
	setAccessLogCounts,
} from "../../../DistrictAdminApis/districtAdminSlice";
import HeadingWithImages from "../../../components/FitnessComponents/District/DataManagement/HeadingWithImages";
import SubHeadingText from "../../../components/FitnessComponents/District/DataManagement/SubHeadingText";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import { getDistrictsBySearchInDistrcitLookUp } from "../../../store/slices/superAdminSlice/superAdminSlice";
import { debounce } from "../../../Utilities/utils";
import { getDistrictsForRoleChange } from "../../../APIS/SuperAdmin/CMS/cms.service";

const DistrictStatistics = () => {
	Chart.register(ChartDataLabels);

	const dispatch = useDispatch();
	const token = useSelector((state) => state?.profile?.token);
	const loading = useSelector((state) => state?.districtAdmin?.loading);

	const selectedRole = useSelector((state) => state?.profile?.selectedRole);
	const duplicateRole = useSelector((state) => state?.profile?.duplicateRole);

	const accessLogData = useSelector(
		(state) => state?.districtAdmin?.accessLogCounts,
	);
	const districts = useSelector(
		(state) => state?.superAdmin?.districtsBySearchInDistrcitLookUp,
	);
	const searchRef = useRef("");
	const [districtsList, setDistrictsList] = useState([]);

	const [accessLog, setAccessLog] = useState([]);

	const [fieldName, setFieldName] = useState([]);
	const [fieldCount, setFieldCount] = useState([]);
	const [selectedDistrict, setSelectedDistrict] = useState({
		label: "Select..",
		value: "",
	});

	const handleAccessLog = (list) => {
		setFieldName([
			...list?.map(
				(item) =>
					item?.field_name?.charAt(0).toUpperCase() +
					item?.field_name?.slice(1),
			),
		]);

		setFieldCount([...list?.map((item) => item?.countfieldname)]);
	};

	const onhandleChange = (district) => {
		setSelectedDistrict((prevState) => ({
			...prevState,
			label: district.label,
			value: district.value,
		}));
		dispatch(getAccessLogCounts({ token, uuid: district.value }));
	};

	const horizontal_bar_data = {
		labels: fieldName,
		datasets: [
			{
				label: "Visit",
				data: fieldCount,
				backgroundColor: "#4F81BD",
				barThickness: 12,
			},
		],
	};

	const horizontal_bar_options = {
		indexAxis: "y",
		scales: {
			x: {
				grid: {
					display: true,
				},
				// ticks: {
				//   steps: 10,
				//   stepSize: 500,
				// },outl
			},
		},

		plugins: {
			datalabels: {
				anchor: "top",
				align: "top",
				labels: {
					value: {
						color: "black",
					},
				},
			},
			legend: {
				display: false,
				position: "bottom",
				// labels: {
				//   boxWidth: 10,
				// },
				toolTip: {
					enabled: true,
				},
			},
			options: {
				maintainAspectRatio: false,
				aspectRatio: 1,

				responsive: true,
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
		setAccessLog(accessLogData);
	}, [accessLogData]);

	useEffect(() => {
		handleAccessLog(accessLog);
	}, [accessLog]);

	useEffect(() => {
		if (
			(selectedRole === "superAdmin" && duplicateRole === "districtAdmin") ||
			selectedRole === "districtAdmin"
		) {
			dispatch(getAccessLogCounts({ token }));
		}
		!districts?.length &&
			selectedRole === "stateAdmin" &&
			dispatch(
				getDistrictsBySearchInDistrcitLookUp({ token, body: { search: "" } }),
			);
		return () => {
			dispatch(setAccessLogCounts([]));
		};
	}, [token]);

	return (
		<Box margin={{ base: "0rem", md: "1rem", lg: "1rem" }}>
			<Box border="">
				<HeadingWithImages
					textName="DISTRICT STATISTICS"
					image={districtStaticticsIcon}
				/>

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
				) : (
					<>
						<Box mt="10" mb="2" ml={{ base: "4", md: "12" }}>
							<SubHeadingText
								headingName="Activity at a Glance"
								textName="(for the last 30 days)"
							/>
						</Box>

						<Box mt="10" w="100%">
							<Bar
								options={horizontal_bar_options}
								data={horizontal_bar_data}
							/>
						</Box>
					</>
				)}
			</Box>
		</Box>
	);
};

export default DistrictStatistics;
