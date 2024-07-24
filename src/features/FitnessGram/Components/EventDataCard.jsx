import { Box, Flex, Image, Spinner, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import React from "react";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import Paragraph2new from "../../../components/FitnessComponents/FitnessTexts/Paragraph2new";
import ParagraphWithColorPrimary from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorPrimary";
import TextIcon from "../../../components/TextIcon";

import present from "../../../assets/Images/FitnessGramEventImages/absent.png";

import absent from "../../../assets/Images/FitnessGramEventImages/absent@2x.png";

import girlImg from "../../../assets/Images/FitnessGramEventImages/Group 3776@2x.png";

import calendarImg from "../../../assets/Images/FitnessGramEventImages/Icon awesome-calendar-alt@2x.png";

import { useNavigate } from "react-router-dom";

const EventDataCard = ({ item, index, handleDelete, handleViewData }) => {
  const navigate = useNavigate();

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const upLoading = useSelector((state) => state?.teacher?.upLoading);
  const role = useSelector((state) => state.profile.selectedRole);

  return (
    <Box key={"a" + index} shadow="lg" rounded={"lg"} m={1.5}>
      <Flex
        justify={"space-between"}
        alignItems="center"
        p="2"
        bg="head"
        roundedTop={"xl"}
      >
        <Tooltip
          hasArrow
          label={item.event_name}
          bg="primary"
          color="white"
          borderRadius={"md"}
          textTransform="capitalize"
        >
          <Box maxW={{ base: "50%", md: "70%" }} overflow={"hidden"}>
            <Heading6 textTransform="capitalize" isTruncated>{item.event_name}</Heading6>
          </Box>
        </Tooltip>

        <Box display="flex">
          {rolesAndPrevilegesObject?.["FitnessGram Event"]?.is_delete ??
          true ? (
            <Box
              display="flex"
              px={{ base: "3px", md: "10px" }}
              color="black"
              role="button"
              onClick={() => {
                handleDelete(item);
              }}
            >
              <TextIcon
                text={"Delete"}
                icon={upLoading ? <Spinner /> : RiDeleteBin6Line}
                increaseTextSize="increaseTextSize"
                changeIconColor="red"
              />
            </Box>
          ) : (
            <Box
              display="flex"
              px={{ base: "3px", md: "10px" }}
              color="black"
              cursor="not-allowed"
            >
              <TextIcon
                text={"Delete"}
                icon={upLoading ? <Spinner /> : RiDeleteBin6Line}
                increaseTextSize="increaseTextSize"
                changeIconColor="red"
              />
            </Box>
          )}

          {rolesAndPrevilegesObject?.["FitnessGram Event"]?.edit ?? true ? (
            <Box
              color="black"
              role="button"
              onClick={() => {
                navigate(`/role/${role}/edit-event/${item.uuid}`);
                // dispatch(setEventDataById({}));
              }}
            >
              <TextIcon
                text={"Edit"}
                icon={BiEdit}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          ) : (
            <Box color="black" cursor="pointer">
              <TextIcon
                text={"Edit"}
                icon={BiEdit}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          )}
        </Box>
      </Flex>

      <Flex justify={"space-between"} m="2" mb="4" pl="2" pr="2">
        <Box>
          <Heading4new textTransform="capitalize" letterSpacing={"tight"}>
            {" "}
            Type : Fitness Tests
          </Heading4new>

          <Flex mt="1" gap="2" alignItems={"center"}>
            <Image
              // mt="1"
              src={calendarImg}
              w={{ base: "5", md: "5", lg: "4" }}
              h={{ base: "5", md: "5", lg: "4" }}
            />

            <Paragraph2new decreaseMarginTop="1">
              Start Date:
              {moment(item?.start_date).format(
                navigator.language === "en-GB" ? "DD-MM-YYYY" : "MM-DD-YYYY"
              )}
            </Paragraph2new>
          </Flex>
          <Flex mt="1" gap="2" alignItems={"center"}>
            <Image
              src={calendarImg}
              w={{ base: "5", md: "5", lg: "4" }}
              h={{ base: "5", md: "5", lg: "4" }}
            />

            <Paragraph2new decreaseMarginTop="1">
              End Date:
              {moment(item?.end_date).format(
                navigator.language === "en-GB" ? "DD-MM-YYYY" : "MM-DD-YYYY"
              )}
            </Paragraph2new>
          </Flex>
        </Box>

        <Image src={girlImg} w="15%" />
      </Flex>
      <Flex gap="3" mt="3" px="3">
        <Flex gap={"2"} display={{ base: "flex ", md: "flex", lg: "flex" }}>
          <Image
            src={absent}
            w={{ base: "5", md: "5", lg: "5" }}
            h={{ base: "5", md: "5", lg: "5" }}
          />

          <Paragraph2new decreaseMarginTop="0.5">
            {item.participants || 0} Participants
          </Paragraph2new>
        </Flex>

        <Flex gap={"2"} display={{ base: "flex ", md: "flex", lg: "flex" }}>
          <Image
            src={present}
            w={{ base: "5", md: "5", lg: "5" }}
            h={{ base: "5", md: "5", lg: "5" }}
          />

          <Paragraph2new decreaseMarginTop="0.10rem">
            {item.incompleted || 0} Missing data
          </Paragraph2new>
        </Flex>
      </Flex>

      <Flex justifyContent="center">
        {rolesAndPrevilegesObject?.["FitnessGram Event"]?.view ?? true ? (
          <Box
            m="2"
            textDecoration="underline"
            textDecorationColor="primary"
            onClick={() => {
              handleViewData(item);
            }}
            role="button"
          >
            <ParagraphWithColorPrimary>View Data</ParagraphWithColorPrimary>
          </Box>
        ) : (
          <Box
            m="2"
            cursor="not-allowed"
            textDecoration="underline"
            textDecorationColor="primary"
          >
            <ParagraphWithColorPrimary changeCursorPointer="not-allowed">
              View Data
            </ParagraphWithColorPrimary>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default EventDataCard;
