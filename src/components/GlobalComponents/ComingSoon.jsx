import React from "react";
import comingsoon_img from "../../assets/Images/ComingSoonImages/coming_soon.svg";
import { Center, Flex, Image, Text } from "@chakra-ui/react";


const ComingSoon = () => {
  return (
    <>
      <Center h={"75vh"}>
        <Flex alignItems="center" direction="column">
          <Image src={comingsoon_img} w="20rem" />
          <Text fontFamily="poppins-semoibold" mt="5">
            Coming Soon...{" "}
          </Text>
          <Text textStyle="smallText" mt="2" fontFamily={"poppins-regular"}>
            Stay tuned for the updates!{" "}
          </Text>
        </Flex>
      </Center>
    </>
  );
};

export default ComingSoon;
