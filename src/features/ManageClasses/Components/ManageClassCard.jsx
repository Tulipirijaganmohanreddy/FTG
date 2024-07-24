import { Box, Button, Checkbox, Flex, Text, Tooltip } from "@chakra-ui/react";
import moment from "moment";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Heading8 from "../../../components/FitnessComponents/FitnessTexts/Heading8";
import TextOne from "../../../components/FitnessComponents/FitnessTexts/TextOne";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import { setSelectedClassDetails } from "../../authentication/components/schoolAdmin/schoolAdminSlice";

const ManageClassCard = (props) => {
  const {
    item,
    index,
    userIds,
    setUserIds,
    setIsAllChecked,
    handleRedirectOfViewClass,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();

  const userRole = useSelector((state) => state.profile.selectedRole);
  const manageClassesList = useSelector(
    (state) => state?.teacher?.manageClasses
  );

  const dispatch = useDispatch();
  const data = [
    {
      id: "1",
      name: "ClassName",
      val:
        // item?.class_name?.length > 25
        //   ? item?.class_name.slice(0, 25) + "..."
        //   :

        item?.class_name,
    },
    {
      id: "2",
      name: "Class ID",
      val:
        // item?.local_identifier?.length > 0
        //   ? item?.local_identifier?.length > 25
        //     ? item?.local_identifier.slice(0, 25) + "..."
        //     :

        item?.local_identifier,
      // : "NA",
    },
    {
      id: "3",
      name: "Start Date",
      // val: `${item?.start_date?.split('T')[0]}`,
      val: `${moment(item?.start_date).format(
        navigator.language === "en-GB" ? "DD-MM-YYYY" : "MM-DD-YYYY"
      )}`,
    },
    {
      id: "4",
      name: "End Date",
      val: `${moment(item?.end_date).format(
        navigator.language === "en-GB" ? "DD-MM-YYYY" : "MM-DD-YYYY"
      )}`,
      // val: `${item?.end_date?.split('T')[0]}`,
    },
    {
      id: "5",
      name: "Students",
      val: `${item?.students}`,
    },
    {
      id: "6",
      name: "Status",
      val: !item?.school_status ? "Inactive" : `${item?.status}`,
    },
  ];

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setUserIds((prevState) => {
        manageClassesList.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);

        return [...prevState, userId];
      });
    } else {
      let dummyUserIds = userIds.slice();
      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);
      manageClassesList.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  const handleViewClass = (item) => {
    handleRedirectOfViewClass(item, location.pathname);
  };


  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        rounded="lg"
        boxShadow="1px 4px 6px 2px rgba(0, 0, 0, 0.2)"
        bg={data[4]?.val == 0 ? "#d3ded6" : "none"}
        m={3}
      >
        <Box boxShadow="none" pos="relative" minH="13.5rem" pt="1" px="1">
          <Box>
            <Checkbox
              colorScheme="blue"
              pos="absolute"
              mt="1"
              left="3"
              rounded={"lg"}
              size={"sm"}
              isChecked={userIds.includes(item?.uuid)}
              onChange={(e) => [handleUserIds(e, item.uuid)]}
            />
            {data.map((head, index) => {
              return (
                <>
                  <Flex
                    ml="7"
                    mt="1.5"
                    justifyContent="space-between"
                    gap="1"
                    key={"ab" + index}
                  >
                    <Flex gap="0.5" w="30%">
                      <>
                        <Box mt="0.1rem">
                          <TextOne>{head.name}</TextOne>
                        </Box>

                        <Box mt="-0.09em">
                          <Text color="primary">&#58;</Text>
                        </Box>
                      </>
                    </Flex>

                    <Flex w="50%">
                      {data[4]?.val == 0 && head?.name === "Status" ? (
                        " --"
                      ) : ["ClassName", "Class ID"].includes(head?.name) ? (
                        <Tooltip
                          hasArrow
                          label={
                            head?.name == "ClassName"
                              ? item?.class_name
                              : item?.local_identifier
                          }
                          bg="primary"
                          color="white"
                          borderRadius={"md"}
                        >
                          <Box w="100%">
                            <Heading8 isTruncated>{head.val}</Heading8>
                          </Box>
                        </Tooltip>
                      ) : (
                        <Heading8
                          textColor={head.val === "Inactive" ? "red" : ""}
                        >
                          {" "}
                          {head.val}
                        </Heading8>
                      )}
                    </Flex>
                  </Flex>
                </>
              );
            })}
          </Box>
        </Box>

        <Box textAlign="center" mb="1rem">
          <Button
            bg="#F5F9FF"
            size="sm"
            px="2rem"
            rounded="xl"
            onClick={() => {
              const classId = item?.uuid;

              handleViewClass(item);

              // dispatch(setSelectedClassDetails(item));
              // dispatch(setPreviousPath(location.pathname));
              // navigate(
              // 	`/role/${userRole}/manage-classes/school/${item?.schoolUuid}/class/${item?.uuid}`,
              // );
            }}
          >
            <Text
              textStyle={"p"}
              //textDecoration={'underline'}
              _hover={{ textDecoration: "underline" }}
            >
              View
            </Text>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default ManageClassCard;
