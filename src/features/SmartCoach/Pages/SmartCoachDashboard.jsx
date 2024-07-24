import { Box, Card, CardBody, Flex, Icon, Text } from "@chakra-ui/react";

import React, { useEffect, useState } from "react";

import { BsFileEarmark } from "react-icons/bs";
import { IoMdStarOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import {
  getRecommendedSmartCoachAPICall,
  getViewResource,
} from "../../../store/slices/profileSlice";
import { SmartCoach } from "../Config";
import TestSelectionResources from "./TestSelectionResources";

const SmartCoachDashboard = () => {
  const { title, tabsList, notAvailableText } = SmartCoach;
  const [activeTab, setActiveTab] = useState(2);

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);

  const userRole = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const [selectedRole, setSelectedRole] = useState(userRole);

  const recommendedSmartCoachList = useSelector(
    (state) => state?.profile?.smartCoachResponse
  );

  const handleViewResource = (url) => {
    const filePath = encodeURIComponent(url?.split(".com/")[1]);

    dispatch(
      getViewResource({ token, filePath, isDownload: "false", module: "cms" })
    );
  };
  const handleUrlDocumentView = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    const userDetails = {
      selected_primary_audience: selectedRole,
    };
    activeTab === 1 &&
      dispatch(getRecommendedSmartCoachAPICall({ userDetails, token }));
  }, [activeTab]);

  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(userRole);
  }, []);

  return (
    <Box h="full" direction="column">
      <Heading1>{title}</Heading1>

      <Flex  mt="5">
        <GloabalTab
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          tabNamesList={tabsList}
        />
      </Flex>


      {activeTab === 1 ? (
        <Box mt="8">
          {recommendedSmartCoachList !== undefined &&
          recommendedSmartCoachList?.length > 0 ? (
            recommendedSmartCoachList?.map((each) => (
              <Box >
                <Card
                  bg="#f5f5f5"
                  boxShadow="sm"
                  h="14"
                  border="1"
                  mt="4"
                  mb="5"
				  role="button"
                  borderColor="yellow.600"
                >
                  <CardBody
                    display="flex"
                    alignItems="center"
                    justifyContent="flex-start"
                    cursor={"pointer"}
                    onClick={() =>
                      each?.file_url
                        ? handleViewResource(each?.file_url)
                        : handleUrlDocumentView(each?.url)
                    }
                  >
                    <Icon as={IoMdStarOutline} w={8} h={6} color="#FECE50" />
                    <Icon as={BsFileEarmark} w={6} h={6} color="#EE373E" />
                    <Text px="5" textStyle="p">
                      {each?.title}
                    </Text>
                  </CardBody>
                </Card>
              </Box>
            ))
          ) : (
            <Box
              display={"flex"}
              flexDirection={"column"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text>{notAvailableText}</Text>
            </Box>
          )}
        </Box>
      ) : (
        <TestSelectionResources />
      )}
    </Box>
  );
};

export default SmartCoachDashboard;
