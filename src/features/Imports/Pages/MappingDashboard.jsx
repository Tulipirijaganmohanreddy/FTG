import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import SubHeading from "../../../components/FitnessComponents/FitnessTexts/SubHeading";
import TextIcon from "../../../components/TextIcon";
import { MappingTableData } from "../../DistrictAdmin/config/config";
import { setTotalPages } from "../../teacher/teacherSlice";
import CreateNewMapping from "../Components/CreateNewMapping";
import EditMapping from "../Components/EditMapping";
import MappingTable from "../Components/MappingTable";

const MappingDashboard = (props) => {
	const { setActiveTab } = props;
	const { subText } = MappingTableData;

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const token = useSelector((state) => state?.profile?.token);
	const selectedRole = useSelector((state) => state?.profile?.selectedRole);
	const mappingTableData = useSelector(
		(state) => state?.schoolAdmin?.getMappingObjectList,
	);

	const [createMapping, setCreateMapping] = useState(false);
	const [editMapping, setEditMapping] = useState(false);
	const [selectedMappingId, setSelectedMappingId] = useState("");

	useEffect(() => {
		dispatch(setTotalPages(""));
	}, []);

	return (
		<Flex direction="column" gap="4">
			{!createMapping && !editMapping ? (
				<>
					<Flex alignItems="center">
						<Heading2>FILE MAPPING</Heading2>

						<Spacer />

						{(mappingTableData?.createMapping ?? true) && (
							<Box onClick={() => setCreateMapping(true)} role="button">
								<TextIcon
									text={"Create New Mapping"}
									icon={MdAddCircle}
									increaseTextSize="increaseTextSize"
								/>
							</Box>
						)}
					</Flex>

					<SubHeading>{subText}</SubHeading>
					<MappingTable
						editMapping={editMapping}
						setEditMapping={setEditMapping}
						setSelectedMappingId={setSelectedMappingId}
						selectedMappingId={selectedMappingId}
					/>
				</>
			) : createMapping ? (
				<CreateNewMapping
					setCreateMapping={setCreateMapping}
					createMapping={createMapping}
				/>
			) : editMapping ? (
				<EditMapping
					setSelectedMappingId={setSelectedMappingId}
					selectedMappingId={selectedMappingId}
					editMapping={editMapping}
					setEditMapping={setEditMapping}
				/>
			) : null}
		</Flex>
	);
};

export default MappingDashboard;
