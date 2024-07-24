import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { logOut, setMessage } from "../../store/slices/profileSlice";
import { resetStore } from "../../store/store";
import IconSideNav from "../Components/IconSideNav";
import SideNav from "../Components/SideNav";
import TopNavbar from "../Components/TopNavbar";
import IdleTimerComponent from "../Components/IdleTimer";

const LayoutPage = () => {
  const openSideBar = useSelector((state) => state?.profile?.openSideBar);
  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);

  return (
    <>
      <IdleTimerComponent />
      <Box h="100vh" w="100vw" overflow="auto" 
					
      
      
      >
        <TopNavbar />
        <Box
          display={{ base: "none", md: "none", lg: "block" }}
          position={"fixed"}
          h="5.5rem"
          bg="white"
          top="0"
          left="0"
          w="5rem"
        ></Box>

        <Box
          position="fixed"
          display="flex"
          h="auto"
          maxHeight="95vh"
          overflowY="scroll"
          className="example"
          top="5.5rem"
          bottom="0"
          left="0"
          right="0"
          //   border="2px solid green"
        >
          <IconSideNav />

          <SideNav />
        </Box>

        <Box
          bg="white"
          h={{
            base: "calc(96% - 6.8rem - 1px)",
            md: "calc(100% - 6.4rem - 1px)",
            lg: "calc(100% - 6.5rem )",
          }}
          p="1.25rem"
          overflow="scroll"
          className="example"
          width={{
            base: "100%",

            md: "100%",

            lg: `calc(100% - ${openSideBar ? "312px" : "112px"})`,

            // xl: `calc(799%  - ${openSideBar ? '300px' : '6.5rem'})`,
            //  '4xl': `calc(74%  - ${openSideBar ? '300px' : '6.5rem'})`,
          }}
          position="fixed"
          top={{ base: "7rem", md: "5.5rem", lg: "5.5rem" }}
          rounded="lg"
          right={{ base: "0", md: "0", lg: "1rem" }}
          transition="width 0.5s"
          css={{
            transitionDuration: "0.5s",
            transitionTimingFunction: "ease",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </>
  );
};

export default LayoutPage;
