import { Text, Box, Image, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import DistrictsSchools from "../../assets/Images/SuperAdminContentImages/DistrictsSchoolsIcon.svg";
import Notifications from "../../assets/Images/SuperAdminContentImages/notificationsIcon.svg";

const PartnerSystemAdmin = () => {

  const navigate = useNavigate();
  const RedirectToDistricts = () => {
    navigate("/role/Partner/DistrictLookup");
  }
  const RedirectToNotifications = () => {
    navigate("/role/Partner/Notifications");
  }
  return (
    <>
      <Box>
        <Text textStyle="h4">SYSTEM ADMINISTRATOR</Text>
      </Box>
      <Flex marginTop="4">
        <Box background="#0081C8" borderRadius="3xl">
          <Flex p="2">
            <Image src={DistrictsSchools} marginLeft="2" />
            <Button color="white" w="13rem" h="1.5rem" marginLeft="-2" onClick={RedirectToDistricts}>
              Districts & Schools
            </Button>
          </Flex>
        </Box>


        <Box background="#0081C8" borderRadius="3xl" marginLeft="5">
          <Flex p="2">
            <Image src={Notifications} marginLeft="4" />
            <Button color="white" w="13rem" h="1.5rem" marginLeft="-7" onClick={RedirectToNotifications}>
              Notifications
            </Button>
          </Flex>
        </Box>
        <Box>
          <Image src={Notifications} />
        </Box>
      </Flex>
    </>
  );
};

export default PartnerSystemAdmin;
