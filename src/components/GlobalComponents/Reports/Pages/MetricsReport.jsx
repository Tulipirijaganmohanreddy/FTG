import React from "react";
import Heading1 from "../../../FitnessComponents/FitnessTexts/Heading1";
import { Box, Flex, Text } from "@chakra-ui/react";
import Paragraph2 from "../../../FitnessComponents/FitnessTexts/Paragraph2";
import PositiveButton from "../../../PositiveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getExportContactApiCall,
  getMetricsReport,
} from "../../../../store/slices/superAdminSlice/superAdminSlice";
import { useLocation } from "react-router-dom";

const buttonsList = [
  {
    id: 1,
    text: "Metrics Report",
  },
  // {
  //   id: 2,
  //   text: "Export Contact",
  // },
];

const MetricsReport = () => {
  const dispatch = useDispatch();

  const location = useLocation();

  const token = useSelector((state) => state.profile.token);
  const loading = useSelector((state) => state.superAdmin.loading);
  const loading2 = useSelector((state) => state.profile.loading2);


  const buttonObj = {
    metricsReports: {
      id: 1,
      heading: "METRICS REPORT",
      text: "Metrics Report",
      description: "Generate current system user metrics.",

      loadingState: loading,
    },

    exportContacts: {
      id: 2,
      heading: "CONTACT LIST",

      text: "Export Contact",

      description: "Download the contacts list",

      loadingState: loading2,
    },
  };

  const apiCallObj = {
    "Metrics Report": () => {
      dispatch(getMetricsReport({ token }));
    },
    "Export Contact": () => {
      dispatch(getExportContactApiCall({ token }));
    },
  };

  const handleDownload = (event) => {

    apiCallObj[event.target.textContent]();

    // dispatch(getMetricsReport({ token }));
  };

 

  return (
    <>
      <Heading1>
        {buttonObj[location.pathname.split("/")?.[3]]?.heading || null}
      </Heading1>
      <Box p="5" textAlign={"justify"}>
        <Paragraph2>
          {buttonObj[location.pathname.split("/")?.[3]]?.description || null}
        </Paragraph2>

        <Flex
          direction={{ base: "column", md: "row" }}
          justifyContent="center"
          alignItems={"center"}
          gap={{ base: "1rem", md: "5rem" }}
          m="5"
        >
          {
            // ["metricsReports", "exportContacts"]?.includes(location.pathname.split("/")?.[3])

            buttonObj?.[location.pathname.split("/")?.[3]] ? (
              // buttonsList?.map((each, index) => (
              <PositiveButton
                text={buttonObj[location.pathname.split("/")?.[3]]?.text}
                onClick={handleDownload}
                isLoading={
                  buttonObj[location.pathname.split("/")?.[3]]?.loadingState
                }
                px="4rem"
                py="1rem"
                key={`reportbutton+${123}`}
              />
            ) : // ))

            null
          }

          {/* <PositiveButton
            text="Export Contact"
            onClick={handleDownload}
            // isLoading={loading}
            px="4rem"
            py="1rem"
          /> */}
        </Flex>
      </Box>
    </>
  );
};

export default MetricsReport;
