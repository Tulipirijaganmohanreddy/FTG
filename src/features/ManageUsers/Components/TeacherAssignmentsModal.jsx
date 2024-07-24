import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "../../../Utilities/utils";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setMessage } from "../../../store/slices/profileSlice";
import { getClassesList } from "../../teacher/teacherSlice";
import { userAssignmentData } from "../Config";

const TeacherAssignmentsModal = (props) => {
  const { schools, userAssignments, setUserAssignments } = props;

  const {
    title,
    selectFields,
    schoolAdminModalName1,
    schoolAdminModalName2,
    positiveBtnText,
    negativeBtnText,
  } = userAssignmentData;

  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const token = useSelector((state) => state.profile.token);

  const manageUser = useSelector((state) => state.profile.manageUser);

  const classesList = useSelector((state) => state.teacher.classes);

  const [selectedSchool, setSelectedSchool] = useState({});

  const [selectedClass, setSelectedClass] = useState();
  const [classOptions, setClassOptions] = useState([]);

  const handleSchool = (e) => {
    setSelectedSchool(
      schools.filter((school) => school.uuid === e.target.value)[0]
    );
    setSelectedClass(null);
  };

  const handleClass = (list) => {
    if (list.length) {
      const clas = list.pop();
      setSelectedClass(clas);
    } else {
      setSelectedClass();
    }
  };

  const handleInputClasses = debounce((searchText) => {
    if (searchText.length > 1) {
      let payLoad = {
        schools: selectedSchool ? [selectedSchool.uuid] : [],
        search: searchText,
      };
      dispatch(getClassesList({ body: payLoad, token }));
    }
  }, 500);

  const handleClose = () => {
    setSelectedSchool({});
    setSelectedClass();
    onClose();
  };

  const handleAdd = (event) => {
    event.preventDefault();

    const Class = {
      class_name: selectedClass?.label,
      uuid: selectedClass?.value,
    };

    if (!selectedSchool?.uuid) {
      dispatch(setMessage("Please select School"));
    }

    // else if (!Class?.uuid) {
    // 	dispatch(setMessage("Please select Class"));
    // }
    else {
      let assignedSchools = userAssignments;

      let schoolIndex = assignedSchools.findIndex(
        (school) => school.uuid === selectedSchool.uuid
      );
      if (schoolIndex == -1) {
        setUserAssignments((prevState) => [
          ...prevState,
          { ...selectedSchool, classes: [Class] },
        ]);
      } else {
        let assignedClasses = assignedSchools[schoolIndex]?.classes ?? [];

        let classIndex = assignedClasses?.findIndex(
          (clas) => clas.uuid === Class.uuid
        );
        if (classIndex == -1) {
          assignedSchools?.splice(schoolIndex, 1, {
            ...assignedSchools?.[schoolIndex],
            classes: [...(assignedSchools[schoolIndex]?.classes ?? []), Class],
          });

          setUserAssignments([...assignedSchools]);
        }
      }
      handleClose();
    }
  };

  useEffect(() => {
    userAssignments?.length &&
      setSelectedSchool({
        school_name: userAssignments[0]?.school_name,
        uuid: userAssignments[0]?.uuid,
      });
  }, [isOpen]);

  useEffect(() => {
    if (selectedSchool?.uuid && isOpen) {
      let payLoad = {
        schools: [selectedSchool.uuid],
        search: "",
      };
      dispatch(getClassesList({ token, body: payLoad }));
    }
  }, [selectedSchool]);

  useEffect(() => {
    if (classesList?.length) {
      let arr = [];
      classesList.forEach((classData) => {
        let obj = { label: classData.class_name, value: classData.uuid };
        arr.push(obj);
      });
      setClassOptions([...arr]);
    } else {
      setClassOptions([]);
    }
  }, [classesList]);

  return (
    <>
      <Box onClick={onOpen}>
        <TextIcon text={title} icon={MdAddCircle} />
      </Box>
      <Modal
        size={"md"}
        isOpen={isOpen}
        isCentered
        useInert={true}
        onClose={() => handleClose()}
        borderColor="transparent"
      >
        <ModalOverlay />

        <ModalContent p="4" direction="flex" alignItems={"center"} m="4">
          <Text
            textAlign={"center"}
            mb="3"
            color="primary"
            textStyle={"textHead"}
          >
            {manageUser?.userType !== "schoolAdmin"
              ? `${schoolAdminModalName1}`
              : `${schoolAdminModalName2}`}
          </Text>

          <ModalBody>
            <form onSubmit={handleAdd}>
              <Flex direction="column" gap="4">
                <SingleSelect2
                  id={"teacherSchool"}
                  onChange={(e) => handleSchool(e)}
                  displayKey={"school_name"}
                  value={selectedSchool?.uuid}
                  optionValue={"uuid"}
                  optionsProps={schools}
                  placeholder="Select School"
                />

                <MultiSelector
                  id={"teacherClass"}
                  value={[selectedClass]}
                  label={"Add Class"}
                  onInputChange={handleInputClasses}
                  name="classId"
                  onChange={handleClass}
                  options={classOptions}
                />

                <Flex justify="center" gap="8">
                  <NegativeButton
                    text={negativeBtnText}
                    onClick={() => handleClose()}
                  />

                  <PositiveButton text={positiveBtnText} type="submit" />
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TeacherAssignmentsModal;
