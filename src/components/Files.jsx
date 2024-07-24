import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getViewResource } from "../store/slices/profileSlice";

const Files = () => {
	const dispatch = useDispatch();
	const [searchParams] = useSearchParams();
	const token = useSelector((state) => state.profile.token);
	const filePath = searchParams.get("filePath");
	const isDownload = searchParams.get("isDownload")
	const module = searchParams.get("module")


	useEffect(() => {
		dispatch(
			getViewResource({
				token,
				filePath,
				isDownload: isDownload ?? true,
				module: module ?? "",
			}),
		);
	}, []);
	return <div></div>;
};

export default Files;
