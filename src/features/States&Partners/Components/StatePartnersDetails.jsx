import { Box, Divider, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import TextIcon from "../../../components/TextIcon";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import { adminLicenseData } from "../Config";
import LicensesList from "./LicensesList";
import AdminsList from "./AdminsList";

const StatePartnersDetails = () => {
  const { tabNamesList } = adminLicenseData;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();
  const params = useParams();

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const [activeTab, setActiveTab] = useState(1);

  const statePartnerDataByID = useSelector(
    (state) => state?.superAdmin?.statePartnerDataByID
  );

  const handleNavigate = () => {
    statePartnerDataByID?.type == "state"
      ? dispatch(
          setManageUser({
            formTitle: "Add State Administrator",
            userType: "stateAdmin",
          })
        )
      : dispatch(
          setManageUser({
            formTitle: "Add Partner",
            userType: "partner",
          })
        );

    dispatch(setPreviousPath(location?.pathname));
    navigate(`/role/${selectedRole}/AddUser`, {
      state: {
        state_uuid: params?.selectedItemId,
        state_code: statePartnerDataByID?.state_code,
      },
    });
  };

  return (
    <>
      <Flex direction="column" gap="4" m={{ base: "0", md: "4" }}>
        <Divider mt="4" />

        <Flex>
          <GloabalTab
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabNamesList={tabNamesList}
            increasePaddingX="0.4rem"
          />
        </Flex>
        {activeTab === 1 ? (
          <Flex justifyContent="flex-end" alignItems="center">
            <Box color="black" onClick={handleNavigate} role="button">
              <TextIcon
                text={"Add Adminstrator"}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          </Flex>
        ) : null}

        {activeTab === 1 ? (
          <AdminsList activeTab={activeTab} />
        ) : (
          <LicensesList activeTab={activeTab} />
        )}
      </Flex>
    </>
  );
};

export default StatePartnersDetails;
