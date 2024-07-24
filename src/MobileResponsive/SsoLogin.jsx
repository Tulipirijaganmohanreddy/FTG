import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getUserRole } from "../store/slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUserId } from "../../src/store/slices/profileSlice";

const SsoLogin = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const token = searchParams.get("token");
	const userId = searchParams.get("userId");
	const userRole = useSelector((state) => state.profile.selectedRole);

	useEffect(() => {
		userId && dispatch(getUserRole({ id: userId, token }));
	}, [userId, dispatch]);

	useEffect(() => {
		if (token && userRole) {
			navigate(`/role/${userRole}`);
			dispatch(setToken(token));
			dispatch(setUserId(userId));
		}
	}, [userRole]);
	return <div></div>;
};

export default SsoLogin;
