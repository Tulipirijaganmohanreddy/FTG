import React from "react";
import moment from "moment";

import parse from "html-react-parser";
import { Box, Divider, Flex } from "@chakra-ui/react";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import { RxDotFilled } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const FitnessGramRequests = (props) => {
  const { item, index } = props;

  const navigate = useNavigate();

  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const notificationsButtonClicked = (item) => {
    handleNotifications(item);
  };

  return (
    <>
      <Flex
        key={index}
        onClick={() => notificationsButtonClicked(item)}
        style={{
          background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
        }}
        gap="1"
      >
        <Box mt="10">
          {!item?.is_read && <RxDotFilled size="20" color="#0081C8" />}
        </Box>
        <Box w="full">
          <Heading4new>Student data approval requests</Heading4new>

          <Flex>
            <Box>
              <Box
                onClick={() => navigate(`/role/${selectedRole}`)}
                cursor="pointer"
                border="1px solid #59AEDD"
                textAlign="center"
                borderLeftRadius="full"
                borderLeftWidth="2px"
                borderRightWidth="2px"
                borderRightRadius="full"
                py="1"
                px="2"
                my="1"
              >
                <Label
                  marginTopText={"0"}
                  changeTextColor="#59AEDD"
                  changeTextStyle="labelBoldHead"
                >
                  {item?.requests}+ Requests Pending
                </Label>
              </Box>

              <Box color="black-2">
                <NormalHeading>
                  {moment(item?.start_date).format("ddd MMM DD YYYY h:mm A")}{" "}
                </NormalHeading>
              </Box>
            </Box>
          </Flex>

          <Divider />
        </Box>
      </Flex>
    </>
  );
};

export default FitnessGramRequests;
