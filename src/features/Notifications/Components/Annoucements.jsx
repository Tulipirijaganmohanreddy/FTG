import React from "react";
import moment from "moment";

import parse from "html-react-parser";
import { Box, Divider, Flex } from "@chakra-ui/react";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import { RxDotFilled } from "react-icons/rx";

const Annoucements = (props) => {
  const { item, index, handleNotifications } = props;

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
        cursor="pointer"
      >
        <Box mt="10">
          {!item?.is_read && <RxDotFilled size="20" color="#0081C8" />}
        </Box>
        <Box w="full">
          <Heading4new>{item?.announcement_title}</Heading4new>

          <Flex>
            <Box>
              {item?.desc ? (
                <Label marginTopText={"0"}>{parse(item?.desc)}</Label>
              ) : null}

              <Box color="black-2">
                <NormalHeading>
                  {moment(item?.start_date).format("ddd MMM DD YYYY")}{" "}
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

export default Annoucements;
