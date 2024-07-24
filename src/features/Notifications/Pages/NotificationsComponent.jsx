import { Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import ManageNotifications from "../Components/ManageNotifications";
import RecievedNotifications from "../Components/RecievedNotifications";
import { notificationsData } from "../Config";

const NotificationsComponent = () => {
  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const { tabNamesList, title, subText } = notificationsData;
  const [activeTab, setActiveTab] = useState(1);

  return (
    <>
      <Flex direction="column" gap="4">
        <Heading1>{title}</Heading1>

        {selectedRole !== "student" ? (
          <Flex
          // w={{ base: "100%", md: "50%", lg: "45%", xl: "30%", "2xl": "25%" }}
          >
            <GloabalTab
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              tabNamesList={tabNamesList}
              increasePaddingX="0.4rem"
            />
          </Flex>
        ) : null}

        <Label marginTopText={"0"}> {subText}</Label>

        {activeTab === 1 ? <RecievedNotifications /> : <ManageNotifications />}
      </Flex>
    </>
  );
};

export default NotificationsComponent;
