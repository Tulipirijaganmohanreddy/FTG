import { Box, Select } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Activate from "../Components/Activate";
import Assign from "../Components/Assign";
import MergeUsers from "../Components/MergeUsers";
import { setMessage } from "../../../../store/slices/profileSlice";

const SelectAction = (props) => {
	const {
		actionOptions,
		actionValues,
		role,
		userIds,
		setUserIds,
		user_type,
		selectedUsersInfo,
		setSelectedUsersInfo,
		userType,
		schoolUUID,
		setIsAllChecked,
	} = props;
	const dispatch = useDispatch();
	const [action, setAction] = useState(null);
	const [isPopUpShow, setIsPopUpShow] = useState(false);
	const selectedRole = useSelector((state) => state.profile.selectedRole);
	const actionPopUp = {
		// <AssignRole isPopUpShow={isPopUpShow} setIsPopUpShow={setIsPopUpShow} />

		Assign: (
			<Assign
				action={action}
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setAction={setAction}
				title={`Assign ${role}`}
				setUserIds={setUserIds}
				userIds={userIds}
				unAssignmentType1={" Remove current class assignments"}
				unAssignmentType2={"Keep current class assignments"}
				user_type={user_type}
				setIsAllChecked={setIsAllChecked}
			/>
		),
		Unassign: (
			<Assign
				action={action}
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setUserIds={setUserIds}
				userIds={userIds}
				setAction={setAction}
				title={`Unassign ${role}`}
				unAssignmentType1={" Remove from class Only(keep in school)"}
				unAssignmentType2={"Remove from class and school"}
				user_type={user_type}
				setIsAllChecked={setIsAllChecked}
			/>
		),
		activate: (
			<Activate
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setAction={setAction}
				action={action}
				title={"Active Login"}
				text={`${role}  will be activated and will be able to login.`}
				button={"Active"}
				setUserIds={setUserIds}
				userIds={userIds}
				setIsAllChecked={setIsAllChecked}
			/>
		),
		deactivate: (
			<Activate
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setAction={setAction}
				action={action}
				title={"Deactivate Login"}
				text={`${role}  will be deactivated and won't be able to login.`}
				button={"Deactive"}
				setUserIds={setUserIds}
				userIds={userIds}
				setIsAllChecked={setIsAllChecked}
			/>
		),
		delete: (
			<Activate
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setAction={setAction}
				action={action}
				title={`Delete ${role} `}
				text={`This ${role} has test event data. Deleting this ${role} will also permanently delete these results. Are you sure you want to continue?`}
				button={"Delete"}
				setUserIds={setUserIds}
				userIds={userIds}
				setIsAllChecked={setIsAllChecked}
			/>
		),
		merge: (
			<MergeUsers
				isPopUpShow={isPopUpShow}
				setIsPopUpShow={setIsPopUpShow}
				setAction={setAction}
				action={action}
				title={`Merge Users`}
				selectedUsersInfo={selectedUsersInfo}
				setSelectedUsersInfo={setSelectedUsersInfo}
				setUserIds={setUserIds}
				userIds={userIds}
				userType={userType}
				schoolUUID={schoolUUID}
				setIsAllChecked={setIsAllChecked}
			/>
		),
	};

	useEffect(() => {
		if (!userIds?.length) {
			setAction("");
		}
	}, [userIds]);

	return (
		<Box>
			<Select
				disabled={
					!userIds?.length ||
					(userType === "teacher" && selectedRole === "teacher")
				}
				rounded="full"
				borderWidth="2px"
				borderColor="white"
				bg="primary"
				color="white"
				onClick={() => setIsPopUpShow(true)}
				value={action}
				onChange={(e) => {
					if (userIds.length > 20) {
						dispatch(
							setMessage("Please Select Not More than 20 users to proceed"),
						);
						return;
					}
					setAction(e.target.value);
					setIsPopUpShow(true);
				}}
				_selected={{
					color: "white",
				}}
				cursor="pointer"
			>
				<option style={{ color: "black" }} value={""}>
					Select Action
				</option>

				{actionOptions.map((action, index) => {
					return (
						<option
							key={index}
							value={actionValues[index]}
							style={{ color: "black" }}
						>
							{action}
						</option>
					);
				})}
			</Select>
			{userIds?.length ? isPopUpShow && actionPopUp[action] : null}
		</Box>
	);
};

export default SelectAction;
