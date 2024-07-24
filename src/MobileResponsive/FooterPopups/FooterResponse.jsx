import { useState } from "react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  Center,
  Text,
  Divider,
  Flex,
  Img,
} from "@chakra-ui/react";

import logo from "../../assets/Images/SuperAdminContentImages/FitnessGramLogo.png";
import Heading8 from "../../components/FitnessComponents/FitnessTexts/Heading8";
import Paragraph2 from "../../components/FitnessComponents/FitnessTexts/Paragraph2";

const data = [
  {
    id: "1",
    name: "About FitnessGram",
  },
  {
    id: "2",
    name: "About The Cooper Institute",
  },
  {
    id: "3",
    name: "Privacy Policy",
  },
  {
    id: "4",
    name: "Terms of Use",
  },
];

const modalContentMapping = {
  "About FitnessGram": {
    title: "About FitnessGram",
    subTitle: "FITNESSGRAM®",
    img: logo,
    content:
      " FitnessGram assesses youth health-related fitness and delivers personalized reports to students and parents. Developed by The Cooper Institute, FitnessGram was adopted by the Presidential Youth Fitness Program in 2012 and is used in schools nationwide. It serves as a student-centered assessment, reporting, and educational tool used to promote health, fitness and activity in children.",
    redirect: "CooperInstitute.org/FitnessGram",
  },
  "About The Cooper Institute": {
    title: "About The Cooper Institute",
    content:
      "The Cooper Institute is dedicated to promoting life-long health and wellness worldwide through research and education. Founded by Kenneth H. Cooper, MD, MPH, The Cooper Institute translates the latest scientific findings into proactive solutions that improve population health. Key areas of focus are research, adult education, and youth programs. Through these initiatives, The Cooper Institute helps people lead better, longer lives now and well into the future. For more information , please visit",
    redirect: "CooperInstitute.org.",
  },
};

const handleRedirect = (redirect) => {
  switch (redirect) {
    case "CooperInstitute.org/FitnessGram":
      window.open("https://www.cooperinstitute.org/FitnessGram", "_blank");
      break;
    case "CooperInstitute.org.":
      window.open("https://www.cooperinstitute.org", "_blank");
      break;
    case "Privacy Policy":
      window.open("https://help.fitnessgram.net/?page_id=5136", "_blank");

      break;
    case "Terms of Use":
      window.open("https://help.fitnessgram.net/?page_id=5127", "_blank");
      break;
    default:
      // Handle cases when the name doesn't match any website
      break;
  }
};

export default function FooterResponse() {
  const [selectedWebsite, setSelectedWebsite] = useState(null);

  const handleOpenModal = (name) => {
    if (name === "About FitnessGram" || name === "About The Cooper Institute") {
      setSelectedWebsite(name);
    } else {
      handleRedirect(name);
    }
  };

  const handleCloseModal = () => {
    setSelectedWebsite(null);
  };

  return (
    <Box
      background="#1895C4"
      display={{ base: "none", lg: "block", md: "block" }}
    >
      <Center>
        {data.map((item) => (
          <Button key={item.id} onClick={() => handleOpenModal(item.name)}>
            <Heading8 increaseTextSize="navMenuItemText" textColor="white">
              {item.name.trim()}
            </Heading8>

            {/* <Text color='#fff' fontWeight={'normal'}>
            
            </Text> */}
          </Button>
        ))}
      </Center>

      {selectedWebsite && (
        <Modal isOpen={true} onClose={handleCloseModal} pt="10rem" isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <Heading8 increaseTextSize="paragraph2ColorBlackIncreaseText">
                {modalContentMapping[selectedWebsite].title}
              </Heading8>

              {/* 
              <Text textStyle={'h5'} border='1px solid red'>
                
              </Text> */}
            </ModalHeader>
            <ModalCloseButton />
            <Center>
              <Divider w="90%" />
            </Center>
            <ModalBody mb="5">
              <Img
                src={modalContentMapping[selectedWebsite].img}
                w="40%"
                mt="1"
                mb="1"
              />

              <Paragraph2 textColor="gray.50">
                {" "}
                {modalContentMapping[selectedWebsite].content}
              </Paragraph2>

              {/* <Text textStyle={'p'} color='gray.50' border='1px solid red'>
                {modalContentMapping[selectedWebsite].content}
              </Text> */}
              <Flex>
                <Text textStyle="p" whiteSpace="nowrap" pt="1">
                  {" "}
                  For more information, visit{" "}
                </Text>
                {/* <Button
                
              > */}

                <Text
                  textStyle={"textHead1"}
                  color="primary"
                  textDecoration={"underline"}
                  pt="1"
                  cursor={"pointer"}
                  onClick={() =>
                    handleRedirect(
                      modalContentMapping[selectedWebsite].redirect
                    )
                  }
                  pl="1"
                >
                  {modalContentMapping[selectedWebsite].redirect}
                </Text>
                {/* </Button> */}
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
}
