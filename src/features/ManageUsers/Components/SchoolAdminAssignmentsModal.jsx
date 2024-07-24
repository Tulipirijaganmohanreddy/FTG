import {
  Box,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import React, { useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setMessage } from "../../../store/slices/profileSlice";
import { userAssignmentData } from "../Config";

const SchoolAdminAssignmentsModal = (props) => {
  const { schools, adminSchools, setAdminSchools } = props;
  const {
    schoolAdminTitle,
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

  const [selectedSchool, setSelectedSchool] = useState({});

  const handleSchool = (e) => {
    const _selectedSchool = schools.filter(
      (school) => school.uuid === e.target.value
    )[0];

    setSelectedSchool(_selectedSchool);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (selectedSchool?.uuid  ) {
      if(!adminSchools.some(school=>school.uuid === selectedSchool?.uuid )){
        setAdminSchools((prevState) => [...prevState, selectedSchool]);
      }
      handleClose();
    } else {
      dispatch(setMessage("Please Select a School to add"));
    }
  };

  const handleClose=()=>{
    setSelectedSchool({})
    onClose()

  }

  return (
    <>
      <Box onClick={onOpen}>
        <TextIcon text={schoolAdminTitle} icon={MdAddCircle} />
      </Box>
      <Modal
        size={"md"}
        isOpen={isOpen}
        isCentered
        useInert={true}
        onClose={handleClose}
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
                id={'schoolAdminSchool'}
                  onChange={(e) => handleSchool(e)}
                  displayKey={"school_name"}
                  optionValue={"uuid"}
                  optionsProps={schools}
                  placeholder="Select School"
                />

                <Flex justify="center" gap="8">
                    <NegativeButton text={negativeBtnText}  onClick={handleClose} />

                  <PositiveButton text={positiveBtnText} type='submit' />
                </Flex>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SchoolAdminAssignmentsModal;
