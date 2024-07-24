import { Center, Image } from "@chakra-ui/react";
import React from "react";
import loading_img from "../../assets/Images/FitnessGramEventImages/loading.gif";

const LoadingComponent = () => {
  return (
    <>
      <Center>
        <Image src={loading_img} />
      </Center>
    </>
  );
};

export default LoadingComponent;
