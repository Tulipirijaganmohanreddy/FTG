import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { resetStore } from "../store/store";
import { logOut } from "../store/slices/profileSlice";

const RequiredAuth = ({ children }) => {
	const token = useSelector((state) => state.profile.token);

	const dispatch = useDispatch();

	const location = useLocation();

	const lastActiveTime = localStorage.getItem("lastActiveTime");

	if (!token) {
		return (
			<Navigate
				to="/"
				state={{
					from:
						location.pathname.includes("files") ||
						location.pathname.includes("download-report")
							? location
							: null,
				}}
				replace
			/>
		);
	}

	if (lastActiveTime) {
		let timeGap = (Date.now() - lastActiveTime) / 1000;
		if (timeGap > 30 * 60) {
			dispatch(logOut({ token }));
			
			resetStore();
			return <Navigate to="/" replace />;
		}
	}

	return children;
};

export default RequiredAuth;
