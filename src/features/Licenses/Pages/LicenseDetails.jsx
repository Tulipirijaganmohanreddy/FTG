import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  setDistrcitIDForDistrict,
  setFunderLicenseStatus,
  setFunderName,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import UpdateLicense from "../Components/UpdateLicense";
import LicenseTabs from "../Components/LicenseTabs";

const LicenseDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();

  const licenseInformation = useSelector(
    (state) => state?.superAdmin?.licenseData
  );

  // const [schools, setSchools] = useState([]);
 

  useEffect(() => {
    if (licenseInformation?.funder_type === "district") {
      dispatch(setFunderName(licenseInformation?.district?.district_name));
      dispatch(setDistrcitIDForDistrict(licenseInformation?.district));
    } else {
      dispatch(setFunderName(licenseInformation?.state?.state_name));
      dispatch(setDistrcitIDForDistrict(licenseInformation?.state));
    }
    dispatch(setFunderLicenseStatus(licenseInformation?.status));
  }, [licenseInformation]);

  return (
    <>
      <UpdateLicense
        schools={schools}
        setSchools={setSchools}

        setMassUpdate={setBulkUpdate}
        massUpdate={bulkUpdate}
        activeTab={activeTab}

      />
      <LicenseTabs
        setSchools={setSchools}
        setMassUpdate={setBulkUpdate}
        massUpdate={bulkUpdate}
        setActiveTab={setActiveTab}
        activeTab={activeTab}

      />
    </>
  );
};

export default LicenseDetails;
