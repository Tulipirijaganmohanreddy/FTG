import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Spacer,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";

import { IoAddCircleSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { classData } from "../config";

import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect from "../../../components/FitnessComponents/FitnessSelect/SingleSelect";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import {
  getUserData,
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getClassByIDApiCall,
  getTeachersListByClassIdApiCall,
  getUpdateClassByIDApiCall,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import AddTeacherModal from "../Components/AddTeacherModal";
import ClassTable from "../Components/ClassTable";
import DeleteTeacherModal from "../Components/DeleteTeacherModal";

const Class = () => {
  const { classDetails } = classData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const code = useSelector((state) => state.profile.code);
  const userRole = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const previousPath = useSelector((state) => state.profile.previousPath);
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const loading = useSelector((state) => state?.schoolAdmin?.loading);
  const upLoading = useSelector((state) => state?.profile?.upLoading);

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);

  const schoolsList = useSelector((state) => state.teacher.schools);

  const teachersList = useSelector(
    (state) => state?.schoolAdmin?.teachersListByClassId
  );

  const selectedClassDetails = useSelector(
    (state) => state?.schoolAdmin?.selectedClassDetails
  );

  const [addTeacherModal, setAddTeacherModal] = useState(false);

  const [editClassData, setEditClassData] = useState({
    updater_role: userRole,
    updated_by: userId,
  });

  const [errors, setErrors] = useState({});
  const [enable, setTrue] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    if (["class_name", "local_identifier"].includes(name)) {
      setEditClassData({
        ...editClassData,
        [name]: value,
      });
    } else {
      setEditClassData({
        ...editClassData,
        [name]: trimmedValue,
      });
    }

    const errorsObj = validateFormData({
      [name]: trimmedValue,
    });

    if (Object.keys(errorsObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorsObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setEditClassData({
      ...editClassData,
      [name]: trimmedValue,
    });
  };
  const handleEdit = (teacherId) => {
    dispatch(getUserData({ id: teacherId, token }));
    dispatch(
      setManageUser({
        formTitle: `Edit Teacher`,
        userType: "teacher",
      })
    );
    dispatch(setPreviousPath(location.pathname));
    navigate(`/role/${userRole}/edit/teacher/${teacherId}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { updated_by, updater_role, ...validateBody } = editClassData;
    let errorObj = validateFormData(validateBody);
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      dispatch(
        getUpdateClassByIDApiCall({
          classId: params.classId,
          body: editClassData,
          token,
        })
      );
    }
  };

  useEffect(() => {
    setEditClassData((prevState) => ({
      ...prevState,
      class_name: selectedClassDetails?.class_name,
      schoolUuid: selectedClassDetails?.school?.uuid,
      start_date: selectedClassDetails?.start_date?.split("T")[0],
      end_date: selectedClassDetails?.end_date?.split("T")[0],
      local_identifier: selectedClassDetails?.local_identifier,
      status: selectedClassDetails?.status,
    }));
  }, [selectedClassDetails]);

  useEffect(() => {
    if (code === 200) {
      setAddTeacherModal(false);

      dispatch(getClassByIDApiCall({ classId: params.classId, token }));

      dispatch(
        getTeachersListByClassIdApiCall({ classId: params.classId, token })
      );
    }
  }, [code]);

  useEffect(() => {
    dispatch(getClassByIDApiCall({ classId: params.classId, token }));
    dispatch(
      getTeachersListByClassIdApiCall({ classId: params.classId, token })
    );
  }, []);
  return (
    <>
      <Flex direction="column" gap="4">
        <HStack>
          <Tooltip
            hasArrow
            label={selectedClassDetails?.class_name}
            bg="primary"
            color="white"
            borderRadius={"md"}
          >
            <Box w="50%"  overflow={"hidden"}>
              <Heading1 isTruncated>{selectedClassDetails?.class_name}</Heading1>
            </Box>
          </Tooltip>

          <Spacer />
          <Box onClick={() => setAddTeacherModal(true)} role="button">
            {userRole !== "teacher" ? (
              <TextIcon
                text="Add Teacher to Class"
                icon={IoAddCircleSharp}
                increaseTextSize="increaseTextSize"
              />
            ) : (
              <TextIcon
                text="Request to Add Teacher"
                icon={IoAddCircleSharp}
                increaseTextSize="increaseTextSize"
              />
            )}
          </Box>
        </HStack>

        {loading ? (
          <Grid templateColumns="repeat(4, 1fr)" gap="8">
            {[...Array(8)].map((num, index) => (
              <GridItem key={num + index}>
                <Skeleton height="2rem" startColor="gray-3" />
              </GridItem>
            ))}
          </Grid>
        ) : (
          <>
            <form onSubmit={handleSubmit}>
              <Grid
                templateColumns={{
                  base: "repeat(1, 1fr)",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                  xl: "repeat(4, 1fr)",
                }}
                gap={{ base: "1", md: "4", lg: "1" }}
              >
                {classDetails?.map((item, index) => {
                  return (
                    <>
                      <GridItem mb="3" key={"ab" + index}>
                        {item.type !== "select" && item.type !== "date" && (
                          <Inputs
                            id={item.Id}
                            type={item.type}
                            label={item.lable}
                            name={item.name}
                            value={editClassData?.[item.name]}
                            onChange={(e) => handleChange(e)}
                            onBlur={handleBlur}
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                            disabled={
                              rolesAndPrevilegesObject?.["Manage Classes"]?.edit
                                ? false
                                : true
                            }
                          />
                        )}

                        {item.type === "date" && (
                          <Inputs
                            id={item.Id}
                            type={item.type}
                            label={item.lable}
                            name={item.name}
                            min={
                              item.name === "end_date"
                                ? editClassData.start_date
                                : null
                            }
                            max={
                              item.name === "start_date"
                                ? editClassData.end_date
                                : null
                            }
                            value={editClassData?.[item.name]}
                            onChange={(e) => handleChange(e)}
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                            disabled={
                              duplicateRole ||
                              rolesAndPrevilegesObject?.["Manage Classes"]?.edit
                                ? false
                                : true
                            }
                          />
                        )}
                        {item.type == "select" && item.name == "schoolUuid" && (
                          <SingleSelect2
                            id={item.Id}
                            label={item.lable}
                            onChange={(e) => handleChange(e)}
                            name={item?.name}
                            value={editClassData?.schoolUuid}
                            optionsProps={schoolsList}
                            displayKey={"school_name"}
                            optionValue={"uuid"}
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                            disabled
                          />
                        )}
                        {item.type == "select" && item.name == "status" && (
                          <Box>
                            <SingleSelect
                              id={item.Id}
                              label={item?.lable}
                              name={item.name}
                              value={editClassData?.status}
                              onChange={(e) => handleChange(e)}
                              optionprops={item.options}
                              disabled
                            />
                          </Box>
                        )}
                      </GridItem>
                    </>
                  );
                })}

                <GridItem mt="1">
                  <Paragraph2>Teachers</Paragraph2>

                  {!teachersList?.length ? (
                    <Flex>
                      <Text textStyle={"p"} whiteSpace="nowrap" mt="3">
                        No Teachers Found for the class
                      </Text>
                    </Flex>
                  ) : (
                    teachersList.map((each, index) => (
                      <Box
                        key={"key" + index}
                        cursor="pointer"
                        display="flex"
                        justifyContent="space-between"
                      >
                        <Box
                          role="button"
                          onClick={() => {
                            handleEdit(each.uuid);
                          }}
                          color="primary"
                        >
                          {" "}
                          <Paragraph2>
                            {`${each.last_name}, ${each.first_name}`}
                          </Paragraph2>
                        </Box>

                        {userRole !== "teacher" ? (
                          <GridItem textAlign="center">
                            <Flex gap={"6"}>
                              {userRole == "teacher" ? null : (
                                <>
                                  {userRole === "districtAdmin" ||
                                  duplicateRole ? (
                                    <Flex gap="2">
                                      <HStack>
                                        <Text
                                          role="button"
                                          textStyle="p"
                                          cursor="pointer"
                                          textDecoration="underline"
                                          onClick={() => {
                                            handleEdit(each.uuid);
                                          }}
                                        >
                                          Edit
                                        </Text>
                                        <FiEdit
                                          color="#0081c8"
                                          cursor="pointer"
                                          size={"15"}
                                          onClick={() => {
                                            handleEdit(each.uuid);
                                          }}
                                        />
                                      </HStack>
                                      <HStack
                                        role="button"
                                        cursor="pointer"
                                        onClick={() => setTrue(true)}
                                      >
                                        <Text
                                          textStyle="p"
                                          textDecoration="underline"
                                        >
                                          Delete
                                        </Text>
                                        <RiDeleteBin6Line
                                          color="red"
                                          size="15"
                                        />
                                      </HStack>
                                    </Flex>
                                  ) : (
                                    <>
                                      <>
                                        <HStack>
                                          <Text
                                            role="button"
                                            color="black-3"
                                            textDecoration="underline"
                                            textStyle="textHead"
                                            cursor="pointer"
                                            onClick={() => {
                                              handleEdit(each.uuid);
                                            }}
                                          >
                                            Edit
                                          </Text>
                                          <FiEdit
                                            textStyle="textHead"
                                            color="#0081c8"
                                            cursor="pointer"
                                            onClick={() => {
                                              handleEdit(each.uuid);
                                            }}
                                            mt="1"
                                          />
                                        </HStack>
                                      </>

                                      <HStack>
                                        <Text
                                          role="button"
                                          color="black-3"
                                          textDecoration="underline"
                                          onClick={() => setTrue(true)}
                                          textStyle="textHead"
                                        >
                                          Delete
                                        </Text>
                                        <RiDeleteBin6Line color="red" mt="1" />
                                      </HStack>
                                    </>
                                  )}
                                </>
                              )}
                            </Flex>
                          </GridItem>
                        ) : null}
                      </Box>
                    ))
                  )}
                </GridItem>
              </Grid>
              <Flex
                justify="center"
                gap={12}
                width={"full"}
                mt={{ base: "4", lg: "1", md: "4" }}
              >
                <Box
                  onClick={() => {
                    previousPath === location.pathname || !previousPath
                      ? navigate(`/role/${userRole}/manage-classes`)
                      : navigate(previousPath);
                  }}
                >
                  <NegativeButton text={"Cancel"} />
                </Box>
                {duplicateRole ||
                rolesAndPrevilegesObject?.["Manage Classes"]?.edit ? (
                  <PositiveButton
                    text={"Update"}
                    isLoading={upLoading}
                    type="submit"
                  />
                ) : (
                  <Box>
                    <PositiveButton text={"Update"} isDisabled={true} />
                  </Box>
                )}
              </Flex>
            </form>
          </>
        )}

        {(enable && userRole == "districtAdmin") || duplicateRole ? (
          <DeleteTeacherModal setTrue={setTrue} enable={enable} />
        ) : null}

        {addTeacherModal && (
          <AddTeacherModal
            addTeacherModal={addTeacherModal}
            setAddTeacherModal={setAddTeacherModal}
            classDataa={{}}
          />
        )}
        <ClassTable />
      </Flex>
    </>
  );
};

export default Class;
