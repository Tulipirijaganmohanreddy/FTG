import React from "react";

import moment from "moment";

import parse from "html-react-parser";
import { Box, Divider, Flex, Text, HStack } from "@chakra-ui/react";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import { RxDotFilled } from "react-icons/rx";
import PositiveButton from "../../../components/PositiveButton";
import NegativeButton from "../../../components/NegativeButton";
import { useSelector } from "react-redux";

const AddUserRequests = (props) => {
  const { item, index, status, setStatus, handleApprovalRequest } = props;

  const loading = useSelector((state) => state?.profile?.loading);

  const notificationsButtonClicked = (uuid, status, index) => {
    handleApprovalRequest(uuid, status, index);
  };

  return (
    <>
      <Flex
        key={index}
        // onClick={() => setIsActive(key)}
        style={{
          background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
        }}
      >
        <Box w="full">
          <Flex>
            <Box mt="2">
              <Text p="2" textStyle={"textHead"}>
                {item?.role} addition approval request
              </Text>

              <Text p="2" textStyle={"p"}>
                {item?.requested_role} {item?.requestedBy?.first_name} has
                requested for the user addition of{" "}
                {item?.requestedFor?.first_name} as a {item?.role}
              </Text>

              <Text p="2" textStyle={"p"} color="#8B8B8B">
                {" "}
                {moment(item?.createdAt).format("ddd MMM DD YYYY h:mm A")}
              </Text>
            </Box>
          </Flex>
          <HStack gap="2">
            <Box
              px="4"
              py="2"
              onClick={() =>
                notificationsButtonClicked(item?.uuid, "Approved", index)
              }
            >
              <PositiveButton
                text="Approve"
                isLoading={
                  status?.statusIndex === index &&
                  status?.statusText === "Approved" &&
                  loading
                }
              />{" "}
            </Box>
            <Box
              onClick={() =>
                notificationsButtonClicked(item?.uuid, "Rejected", index)
              }
            >
              <NegativeButton
                isLoading={
                  status?.statusIndex === index &&
                  status?.statusText === "Rejected" &&
                  loading
                }
                text="Reject"
              />
            </Box>
          </HStack>

          <Divider />
        </Box>
      </Flex>
    </>
  );
};

export default AddUserRequests;
