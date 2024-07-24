import { FormControl, FormLabel, Switch } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAutoPromote } from "../DistrictAdminApis/district.service";
import { setCode, setMessage } from "../store/slices/profileSlice";

export default function AutoPromote() {
	const dispatch = useDispatch();
	const autoPromote = useSelector(
		(state) =>
			state.districtAdmin.getDistrictForDistrictAdminResponse?.auto_promote,
	);
	const districtId = useSelector(
		(state) => state?.profile?.loggedInUserDetails?.district_uuid,
	);
	const token = useSelector((state) => state.profile.token);
	const [isChecked, setIsChecked] = useState();

	const handleAutoPromoteApi = async (data) => {
		try {
			const response = await getAutoPromote(data);
			dispatch(setCode(201)); //hard coded 201 because 200 is triggering apis in districtDetails page and schoolList page
			dispatch(setMessage(response.message));
		} catch (err) {
			dispatch(setMessage(err.message));
			setIsChecked((prevState) => !prevState);
		}
	};

	const handleChange = (e) => {
		setIsChecked((prevState) => !prevState);
		const data = {
			token,
			body: {
				district_uuid: districtId,
				auto_promote: e.target.checked ? 1 : 0,
			},
		};
		handleAutoPromoteApi(data);
	};

	useEffect(() => {
		setIsChecked(autoPromote);
		return () => setIsChecked();
	}, [autoPromote]);
	return (
		<FormControl
			display="flex"
			justifyContent="end"
			alignItems="center"
			w="auto"
			mr="4"
			gap="0"
		>
			<FormLabel htmlFor="auto-promote" mb="0" textStyle="textHead">
				Auto Promote Students?
			</FormLabel>
			<Switch
				id="auto-promote"
				size="md"
				colorScheme="teal"
				isChecked={isChecked}
				onChange={handleChange}
			/>
		</FormControl>
	);
}
