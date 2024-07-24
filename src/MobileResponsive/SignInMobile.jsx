import { Center, Image } from "@chakra-ui/react";

import { useSelector } from "react-redux";


import loadingImg from "../assets/Images/FitnessGramEventImages/loading2.gif";

import SignInPage from "./SignInPage";

export default function SignInMobile() {
  
  const loadingOne = useSelector((state) => state?.profile?.loadingOne);

  const loadingTwo = useSelector((state) => state?.profile?.loadingTwo);

  return (
    <>
      {loadingTwo ? (
        <Center h="100vh">
          <Image src={loadingImg} w="10rem" />
        </Center>
      ) : (
        <>
          <SignInPage />
        </>
      )}
    </>
  );
}
