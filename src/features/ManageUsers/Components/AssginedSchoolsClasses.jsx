import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useParams } from "react-router-dom";
import UserUnAssign from "./UserUnAssign";
import { useSelector } from "react-redux";

const AssginedSchoolsClasses = (props) => {
  const { userAssignments, setUserAssignments } = props;

  const params = useParams();
  const userData = useSelector((state) => state?.profile?.UserData);

  const [unAssignModel, setUnAssignModel] = useState(false);
  const [unassignData, setUnAssignData] = useState({
    schoolId: [],
    classId: [],
    class_name: "",
  });

  const handleDelete = (schoolId, classId, class_name) => {
    const schoolDetails = userData?.teacher_schools?.filter(
      (school) => school.uuid === schoolId
    )?.[0];

    if (
      params?.id &&
      userData?.teacher_role &&
      schoolDetails &&
      schoolDetails?.classes?.some((item) => item.uuid === classId)
    ) {
      setUnAssignData((prevState) => ({
        ...prevState,
        schoolId: schoolId,
        classId: classId,
        class_name: class_name,
      }));
      setUnAssignModel(true);
    } else if (params?.id && userData?.student_role) {
      setUnAssignData((prevState) => ({
        ...prevState,
        schoolId: schoolId,
        classId: classId,
        class_name: class_name,
      }));
      setUnAssignModel(true);
    } else {
      let assignedSchools = userAssignments;

      let schoolIndex = assignedSchools.findIndex(
        (school) => school.uuid === schoolId
      );

      let assignedClasses = assignedSchools[schoolIndex].classes;

      if (assignedClasses.length == 1) {
        assignedSchools.splice(schoolIndex, 1);
      } else {
        let classIndex = assignedClasses.findIndex(
          (clas) => clas.uuid === classId
        );

        let filteredClasses = assignedClasses.filter(
          (clas) => clas.uuid !== classId
        );

        assignedSchools.splice(schoolIndex, 1, {
          ...assignedSchools[schoolIndex],
          classes: [...filteredClasses],
        });
      }

      setUserAssignments([...assignedSchools]);
    }
  };

  return (
    <>
      <Box>
        {userAssignments?.map((school) => (
          <Accordion allowToggle background="bg.100" mt="3" defaultIndex={[0]}>
            <AccordionItem border="none">
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    {school?.school_name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>

              {school?.classes?.length
                ? school?.classes?.map(
                    (item, index) =>
                      item?.class_name && (
                        <AccordionPanel pb={4}>
                          <Box
                            display={"flex"}
                            flexDirection={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                          >
                            <Box w="70%" overflow={"hidden"} isTruncated>
                              {item?.class_name}
                            </Box>

                            <Box mt="1">
                              <RiDeleteBin6Line
                                cursor="pointer"
                                fill="red"
                                onClick={() =>
                                  handleDelete(
                                    school.uuid,
                                    item.uuid,
                                    item?.class_name
                                  )
                                }
                              />
                            </Box>
                          </Box>
                        </AccordionPanel>
                      )
                  )
                : null}
              {unAssignModel && (
                <UserUnAssign
                  unAssignModel={unAssignModel}
                  setUnAssignModel={setUnAssignModel}
                  userAssignments={unassignData}
                  role={userData?.teacher_role ? "teacher" : null}
                />
              )}
            </AccordionItem>
          </Accordion>
        ))}
      </Box>
    </>
  );
};

export default AssginedSchoolsClasses;
