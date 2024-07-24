import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
	promoteStudentsApi
} from "../DistrictAdminApis/district.service";
import SingleSelect2 from "./FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "./FitnessComponents/FitnessTexts/Heading1";
import Heading4new from "./FitnessComponents/FitnessTexts/Heading4new";

import { useDispatch, useSelector } from "react-redux";
import { getAdminByDistrictAPI } from "../APIS/SuperAdmin/Districts/district.service";
import { setCode, setMessage } from "../store/slices/profileSlice";
import EndOfTermHistoryTable from "./EndOfTermHistoryTable";
import EndOfTermProcessModal from "./EndOfTermProcessModal";

const endOfTermSelectOptions = [
	{
		id: 1,
		lable: "Promote Students",
		name: "promote_students",
		value: "promote",
	},

	{
		id: 2,
		lable: "Undo Promote Students",
		name: "undo_promote_students",
		value: "undo",
	},
];

const errorText =
	"Please Deactivate Auto Promote to manually Promote or Undo Promote ";

const EndOfTermProcess = () => {
	const dispatch = useDispatch();

	const token = useSelector((state) => state?.profile?.token);

	const districtId = useSelector(
		(state) => state?.profile?.loggedInUserDetails?.district_uuid,
	);
	const [autoPromote, setAutoPromote] = useState(false);
	const [isStudentsPromoted, setIsStudentsPromoted] = useState("all");

	const [showModal, setShowModal] = useState(false);

	const handlePromoteStudentsApiCall = async () => {
		const body = {
			request_type: isStudentsPromoted,
			uuid: districtId,
		};

		try {
			const result = await promoteStudentsApi({ token, body });

			setShowModal(false);

			dispatch(setCode(result.code));

			dispatch(setMessage(result.message));
		} catch (error) {
			console.log(error, "errrrrrrrrrrrrr");
		} finally {
		}
	};

	const onSelect = (e) => {
		setIsStudentsPromoted(e.target.value);

		if (e.target.value?.length) {
			setShowModal(true);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await getAdminByDistrictAPI({ districtId, token });
				setAutoPromote(response?.data?.response?.auto_promote);
			} catch (err) {
				console.log(err, "err===>");
			}
		};
		fetchData();
	}, []);
	useEffect(() => {
		return () => {
			setIsStudentsPromoted("");
		};
	}, []);

	return (
		<>
			<Flex direction="column" gap="4">
				<Flex alignItems="center">
					<Heading1>End Of Term Process</Heading1>
				</Flex>

				<Divider borderColor="gray" />

				<Flex direction={"column"} gap="5" mb="4">
					<Heading4new changeTextColor={"#0081c8"}>
						Promote all students to the next grade level, or undo a promote.
					</Heading4new>

					<Box w={{ base: "55%", lg: "30%" }}>
						<SingleSelect2
							id={"end-of-term"}
							placeholder="Select One"
							label={"Select an end-of-term operation:"}
							name={"end-of-term"}
							optionsProps={endOfTermSelectOptions}
							displayKey={"lable"}
							optionValue={"value"}
							value={isStudentsPromoted}
							isDisabled={autoPromote}
							onChange={(e) => onSelect(e)}
							error={autoPromote ? errorText : null}
						/>
					</Box>
				</Flex>

				<EndOfTermHistoryTable isStudentsPromoted={isStudentsPromoted} />
			</Flex>
			{showModal ? (
				<EndOfTermProcessModal
					showModal={showModal}
					setShowModal={setShowModal}
					isStudentsPromoted={isStudentsPromoted}
					handleApi={handlePromoteStudentsApiCall}
				/>
			) : null}
		</>
	);
};

export default EndOfTermProcess;
