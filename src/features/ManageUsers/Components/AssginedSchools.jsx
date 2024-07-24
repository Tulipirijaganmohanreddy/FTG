import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { RiDeleteBin6Line, RiDeleteBinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import UserUnAssign from "./UserUnAssign";

const AssginedSchools = (props) => {
  const { adminSchools, setAdminSchools } = props;
  const params = useParams();
  const userData = useSelector((state) => state?.profile?.UserData);

  const [unAssignModel, setUnAssignModel] = useState(false);
  const [unassignData, setUnAssignData] = useState({
    schoolId: [],
    classId: [],
    school_name: "",
  });

  const handleDelete = (schoolId, school_name) => {
    if (
      params.id &&
      userData?.school_admin_role &&
      userData?.schools.some((item) => item.uuid === schoolId)
    ) {
      setUnAssignData((prevState) => ({
        ...prevState,
        schoolId: schoolId,
        school_name: school_name,
      }));
      setUnAssignModel(true);
    } else {
      let assignedSchools = adminSchools;

      let schoolIndex = assignedSchools.findIndex(
        (school) => school.uuid === schoolId
      );

      assignedSchools.splice(schoolIndex, 1);

      setAdminSchools([...assignedSchools]);
    }
  };

  return (
    <>
      <Box>
        {adminSchools?.map((school) => (
          <Accordion allowToggle defaultIndex={[0]} background="bg.100" mt="3">
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {school?.school_name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              <AccordionPanel display="flex" justifyContent="flex-end" pb={4}>
                <Box mt="1">
                  <RiDeleteBin6Line
                    cursor="pointer"
                    onClick={() =>
                      handleDelete(school.uuid, school?.school_name)
                    }
                    fill="red"
                  />
                </Box>
              </AccordionPanel>
              {unAssignModel && userData?.school_admin_role && (
                <UserUnAssign
                  unAssignModel={unAssignModel}
                  setUnAssignModel={setUnAssignModel}
                  userAssignments={unassignData}
                  role={userData?.school_admin_role ? "schoolAdmin" : null}
                />
              )}
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default AssginedSchools;
