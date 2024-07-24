import React, { useEffect, useState } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getReportPdf,
  setCode,
  setMessage,
} from "../store/slices/profileSlice";
import SuccessResponse from "./GlobalComponents/SuccessResponse";
import ErrorResponse from "./GlobalComponents/ErrorResponse";

const DownloadReport = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const token = useSelector((state) => state.profile.token);
  const loggedInUserId = useSelector((state) => state?.profile?.userId);
  const uuid = searchParams.get("uuid");

  const userID = searchParams.get("id");
  const fileName = searchParams.get("file");

  const [isShowPopUp, setIsShowPopUp] = useState(false);

  useEffect(() => {
    if (loggedInUserId === userID) {
      dispatch(
        getReportPdf({
          token,
          uuid,
          fileName,
        })
      );
    } else {
      //if(location.pathname.includes("uuid") && location.pathname.includes("id")){

      setIsShowPopUp(true);

      dispatch(setMessage("You are not authorized to see the report"));

      // }
    }

    return () => {
      setIsShowPopUp(false);
    };
  }, []);
  return <div>{isShowPopUp ? <ErrorResponse /> : null}</div>;
};

export default DownloadReport;
