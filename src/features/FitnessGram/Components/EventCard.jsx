import {
  Card,
  CardBody,
  Divider,
  Flex,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const EventCard = (props) => {
  const params = useParams();
  const {
    title,
    setSelectedEvents,
    setIsSelected,
    isSelected,
    tabIndex,
    setInputs,
  } = props;
  const eventEditDetails = useSelector(
    (state) => state?.teacher?.eventDataById
  );
  const [testItemList, setTestItemList] = useState(null);
  const recentEventTestList = useSelector(
    (state) => state.teacher.recentEventTestList
  );
  const recommondedEventTestList = useSelector(
    (state) => state.teacher.recommondedEventTestList
  );
  const handleSelect = (testItem, i) => {
    setIsSelected(i);
    if (tabIndex === 1) {
      setInputs((prevState) => ({
        ...prevState,
        test_item_flow:
          i === 0 ? "recommend_0" : i === 1 ? "recommend_1" : "recommend_2",
      }));
    }
    setSelectedEvents(testItem.event_struct);
  };

  useEffect(() => {
    if (tabIndex == 1) {
      setTestItemList(recommondedEventTestList);
      if (params?.eventId) {
        if (eventEditDetails.test_item_flow === "recommend_0") {
          setIsSelected(0);
          setSelectedEvents(eventEditDetails.event_struct);
        } else if (eventEditDetails.test_item_flow === "recommend_1") {
          setIsSelected(1);
          setSelectedEvents(eventEditDetails.event_struct);
        } else if (eventEditDetails.test_item_flow === "recommend_2") {
          setIsSelected(2);
          setSelectedEvents(eventEditDetails.event_struct);
        }
      }
    } else if (tabIndex == 2) {
      setTestItemList(recentEventTestList);


      if (params?.eventId && eventEditDetails.test_item_flow === "recent") {
        setIsSelected(0);
      setSelectedEvents(eventEditDetails.event_struct);

      }
    }
  }, [tabIndex, recentEventTestList]);

  return (
    <>
      <Flex direction="column">
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="6"
        >
          {testItemList?.length ? (
            testItemList?.map((testItem, index) => (
              <>
                <GridItem role='button'>
                  <Card
                    mx="2"
                    mt="2"
                    mb="2"
                    cursor="pointer"
                    onClick={() => handleSelect(testItem, index)}
                    borderColor={isSelected === index ? "blue.500" : "none"}
                    borderWidth={isSelected === index ? "2px" : "none"}
                  >
                    <CardBody p="0" mb="5">
                      <Text
                        background="head2"
                        paddingTop="0.5rem"
                        paddingLeft="0.5rem"
                        paddingBottom="0.3rem"
                        textStyle={"textHead"}
                      >
                        {testItem.event_name || `Recommended list ${index + 1}`}
                      </Text>
                      {testItem.event_struct.map((item, index) => {
                        return (
                          <Stack mx="5">
                            <Stack mt="2">
                              {" "}
                              <Text textColor="primary" textStyle={"textHead"}>
                                {item.name}
                              </Text>
                              <Text textStyle={"textHead"}>
                                {item.test_items?.join(", ") ||
                                  "No Test Items found"}
                              </Text>
                            </Stack>
                            {testItem.event_struct.length - 1 ===
                            index ? null : (
                              <Divider />
                            )}
                          </Stack>
                        );
                      })}
                    </CardBody>
                  </Card>
                </GridItem>
              </>
            ))
          ) : (
            <GridItem colSpan="3" textAlign="center">
              No Recent Event is Created
            </GridItem>
          )}
        </Grid>
      </Flex>
    </>
  );
};

export default EventCard;
