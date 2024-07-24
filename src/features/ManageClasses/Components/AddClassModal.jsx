import {
  Box,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import TableHeading from "../../../components/FitnessComponents/FitnessTexts/TableHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { getAddClassToManageClassesApiCall } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { addClassModalData } from "../config";
const AddClassModal = (props) => {
  const { onClose, isOpen, onOpen } = useDisclosure();
  const dispatch = useDispatch();

  const { title, classDetails } = addClassModalData;
  const { addClassModal, setAddClassModal, setIsSuccess } = props;

  const token = useSelector((state) => state?.profile?.token);
  const userId = useSelector((state) => state.profile.userId);
  const loading = useSelector((state) => state.profile.upLoading);
  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const code = useSelector((state) => state?.profile?.code);

  const schoolsList = useSelector((state) => state.teacher.schools);

  const [classData, setClassData] = useState({
    class_name: "",
    start_date: "",
    end_date: "",
    local_identifier: "",
    schoolUuid: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();

    if (["class_name", "local_identifier"].includes(name)) {
      setClassData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      setClassData((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
      }));
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
    setClassData((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    let errorObj = validateFormData(classData);
    setErrors(errorObj);
    if (Object.keys(errorObj).length === 0) {
      dispatch(
        getAddClassToManageClassesApiCall({
          body: {
            ...classData,
            creater_role: selectedRole,
            created_by: userId,
          },
          token,
        })
      );
    }
  };
  const handleClose = () => {
    setErrors({});
    onClose();
    setClassData({
      class_name: "",
      start_date: "",
      end_date: "",
      local_identifier: "",
      schoolUuid: "",
    });
  };

  useEffect(() => {
    if (code === 200) {
      setAddClassModal(false);
      handleClose();
    }
  }, [code]);

  return (
    <>
      <Box onClick={onOpen} role="button">
        <TextIcon
          text={"Add New Class"}
          icon={MdAddCircle}
          increaseTextSize="increaseTextSize"
        />
      </Box>
      <Modal
        size={{ base: "xs", md: "sm", lg: "sm" }}
        onClose={() => {
          handleClose();
        }}
        isOpen={isOpen}
        isCentered
        useInert={true}
        borderColor="transparent"
      >
        <ModalOverlay />

        <ModalContent p="4" m="2">
          <ModalCloseButton onClick={() => handleClose()} />
          <ModalBody>
            <Box mt="0.5" mb="2">
              <TableHeading>{title}</TableHeading>
            </Box>
            <form onSubmit={handleSubmit}>
              <Grid>
                {classDetails?.map((item) => {
                  return (
                    <>
                      <GridItem mb="3">
                        {item.type !== "select" && item.type !== "date" && (
                          <Inputs
                            id={item.Id}
                            type={item.type}
                            label={item.lable}
                            name={item.name}
                            value={classData?.[item?.name]}
                            onChange={(e) => handleChange(e)}
                            onBlur={handleBlur}
                            border="0"
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                          />
                        )}

                        {item.name === "start_date" && (
                          <Inputs
                            id={item.Id}
                            label={item.lable}
                            type={item.type}
                            name={item.name}
                            value={classData?.item?.name}
                            max={classData?.end_date}
                            onChange={(e) => handleChange(e)}
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                          />
                        )}
                        {item.name === "end_date" && (
                          <Inputs
                            id={item.Id}
                            label={item.lable}
                            type={item.type}
                            name={item.name}
                            value={classData?.item?.name}
                            min={classData?.start_date}
                            onChange={(e) => handleChange(e)}
                            error={
                              errors?.[item?.name] ? errors?.[item?.name] : ""
                            }
                          />
                        )}
                      </GridItem>

                      {item.type == "select" && (
                        <GridItem mb="3">
                          <SingleSelect2
                            id={item.Id}
                            placeholder="Select School"
                            label={item?.lable}
                            name={item.name}
                            value={classData?.item?.name}
                            optionsProps={schoolsList}
                            displayKey={"school_name"}
                            optionValue={"uuid"}
                            onChange={(e) => handleChange(e)}
                            error={errors?.[item?.name] && errors?.[item.name]}
                          />
                        </GridItem>
                      )}
                    </>
                  );
                })}
              </Grid>

              <Flex justify="center" gap="8" w="100%">
                <NegativeButton
                  text={"Cancel"}
                  onClick={() => {
                    handleClose();
                  }}
                />
                <PositiveButton
                  text={"Create"}
                  isLoading={loading}
                  type="submit"
                />
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddClassModal;
