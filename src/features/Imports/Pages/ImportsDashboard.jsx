import { Flex, Stack } from "@chakra-ui/react";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";

import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Import from "../Components/Import";
import { importData } from "../Config";
import ImportHistory from "./ImportHistory";
import MappingDashboard from "./MappingDashboard";

const ImportsDashboard = () => {
	const location = useLocation();
	const { tabNamesList } = importData;

	const [activeTab, setActiveTab] = useState(
		location?.state !== undefined && location?.state !== null
			? location?.state
			: 1,
	);

	const tabObj = {
		1: <Import setActiveTab={setActiveTab} />,
		2: <MappingDashboard setActiveTab={activeTab} />,
		3: <ImportHistory />,
	};

	return (
		<Flex h="full" direction="column" gap="4">
			<Stack>
				<Heading1>IMPORT</Heading1>

				<Flex>
					<GloabalTab
						activeTab={activeTab}
						setActiveTab={setActiveTab}
						tabNamesList={tabNamesList}
						increasePaddingX="0.4rem"
					/>
				</Flex>
			</Stack>

			{tabObj[activeTab]}
		</Flex>
	);
};

export default ImportsDashboard;
