import {
  Box,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Image,
  Select,
  Spinner
} from "@chakra-ui/react";
import loadingimg from "../../../../src/assets/Images/FitnessGramEventImages/loading.gif";

import React, { useEffect, useRef, useState } from "react";
import { FaFileExport } from "react-icons/fa";

import { manageClassesData } from "../config";

import { useDispatch, useSelector } from "react-redux";

import { MdAddCircle } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect from "../../../components/FitnessComponents/FitnessSelect/SingleSelect";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading9 from "../../../components/FitnessComponents/FitnessTexts/Heading9";
import IconText from "../../../components/FitnessComponents/FitnessTexts/IconText";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import RenderingOptionsView from "../../../components/GlobalComponents/RenderingOptionsView";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";
import TextIcon from "../../../components/TextIcon";
import {
  setMessage,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getClassAction,
  getExportClasses,
  getTeachersBySchoolsApiCall,
  setSelectedClassDetails,
  setTeachersListBySchools,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import {
  getFilteredManageClassesList,
  setLoading,
  setManageClasses,
  setTotalPages,
} from "../../teacher/teacherSlice";
import AddClassModal from "../Components/AddClassModal";
import GridViewOfClasses from "./GridViewOfClasses";
import ListViewOfClasses from "./ListViewOfClasses";

const ManageClassesDashboard = () => {
  const { title, details } = manageClassesData;

  const [school, teacher, status] = details;

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchInputRef = useRef(null);
  const mobileSearchInputRef = useRef(null);

  const searchTeacherRef = useRef(null);


  const loading = useSelector((state) => state?.teacher?.loading);

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const schoolsList = useSelector((state) => state.teacher.schools);

  const teachersListBySchools = useSelector(
    (state) => state.schoolAdmin.teachersListBySchools
  );

  const exportLoading = useSelector((state) => state.schoolAdmin.loading);

  const manageClassesList = useSelector(
    (state) => state.teacher.manageClasses?.response
  );

  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const code = useSelector((state) => state?.profile?.code);

 
  const [schools, setSchools] = useState([]);

  const [teachers, setTeachers] = useState([]);

  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [action, setAction] = useState(null);
  const [deletePopUp, setDeletePopUp] = useState(false);

  const [classesView, setClassesView] = useState("GridView");

  const [formData, setFormData] = useState({
    school_uuid: null,
    teacher_uuid: null,
    status: "",
    search: "",
    size: 100,
    skip: 1,
  });

  const isPreviousButtonDisabled = formData?.skip === 1;
  const isNextButtonDisabled = formData?.skip === totalPages;

  const [addClassModal, setAddClassModal] = useState(false);

  const [isSuccess, setIsSuccess] = useState(false);

  const [selectedSchools, setSelectedSchools] = useState();
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [isParentChanged, setIsParentChanged] = useState(true); //to handle subsequent apis like teachers where it has parent list and searchTerm

  const handleSchools = (selectedSchoolsList) => {
    formData.search && (searchInputRef.current.value = "");
    formData.search && (mobileSearchInputRef.current.value = "");

    if (
      selectedSchoolsList?.length > 1 &&
      selectedSchoolsList[0].label == "All"
    ) {
      setSelectedSchools([selectedSchoolsList?.[1]]);

      setFormData((prevState) => ({
        ...prevState,
        school_uuid: [selectedSchoolsList[1]?.value],
        search: "",
      }));
    } else {
      let all_value = null;
      if (selectedSchoolsList?.length) {
        for (let school of selectedSchoolsList) {
          if (school.label == "All") {
            all_value = school;
            break;
          }
        }
      }
      if (all_value) {
        setSelectedSchools([all_value]);

        setFormData((prevState) => ({
          ...prevState,
          school_uuid: all_value?.value,
          search: "",
          skip: 1,
        }));
      } else {
        setSelectedSchools(selectedSchoolsList);
        setFormData((prevState) => ({
          ...prevState,
          school_uuid: selectedSchoolsList?.map((school) => school.value),
          search: "",
          skip: 1,
        }));
      }
    }
    setIsParentChanged(true);
  };
  const handleInputTeachers = debounce((text) => {
    if (text?.length != 1 && searchTeacherRef.current !== text) {
      const finalData = {
        accesser_uuid: userId,
        schools: formData?.school_uuid,
        search: text,
      };
      // dispatch(setManageClasses([]));
      dispatch(getTeachersBySchoolsApiCall({ body: finalData, token }));

      searchTeacherRef.current = text;
    }
  }, 500);

  const handleTeachers = (selectedTeachersList) => {
    if (selectedTeachersList?.length) {
      if (
        selectedTeachersList?.length > 1 &&
        selectedTeachersList[0].label === "All"
      ) {
        if (selectedTeachersList[1].label === "All") {
          return;
        }
        setSelectedTeachers([selectedTeachersList?.[1]]);
        setFormData((prevState) => ({
          ...prevState,
          teacher_uuid: [selectedTeachersList[1]?.value],
          skip: 1,
        }));
      } else {
        let all_value = null;

        if (selectedTeachersList?.length) {
          for (let clas of selectedTeachersList) {
            if (clas.label == "All") {
              all_value = clas;
              break;
            }
          }
        }

        if (all_value) {
          setSelectedTeachers([all_value]);

          setFormData((prevState) => ({
            ...prevState,
            teacher_uuid: all_value.value,
            skip: 1,
          }));
        } else {
          setSelectedTeachers(selectedTeachersList);

          setFormData((prevState) => ({
            ...prevState,
            teacher_uuid: selectedTeachersList?.map((item) => item?.value),
            skip: 1,
          }));
        }
      }
    } else {
      setSelectedTeachers([]);
      dispatch(setManageClasses([]));
      setFormData((prevState) => ({
        ...prevState,
        teacher_uuid: null,
        skip: 1,
      }));
    }
  };

  const handlePageNumber = (event) => {
    setFormData((prevState) => ({ ...prevState, skip: event.selected + 1 }));
  };
  const handleChangeFormData = (event) => {
    formData.search && (searchInputRef.current.value = "");
    formData.search && (mobileSearchInputRef.current.value = "");
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
      search: "",
      skip: 1,
    });
  };

  const searchHandleChange = debounce((event) => {
    setFormData((prevState) => ({
      ...prevState,
      search: event.target.value,
      skip: 1,
    }));
  }, 500);

  const handleChangeAction = (e) => {
    if (userIds?.length) {
      let body = {
        uuids: userIds,
        updater_role: selectedRole,
        updated_by: userId,
      };
      dispatch(getClassAction({ token, body }));
    } else {
      dispatch(setMessage("Please Select atleast one Class"));
      setAction("action");
    }
  };
  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = manageClassesList.map((user) => user.uuid);

      setUserIds(arr);
    } else {
      setIsAllChecked(false);
      setUserIds([]);
    }
  };

  const handleClassesView = (selctedView) => {
    setClassesView(selctedView);
  };

  const handleRedirectOfViewClass = (item, pathname) => {
    dispatch(setSelectedClassDetails(item));
    dispatch(setPreviousPath(pathname));
    navigate(
      `/role/${selectedRole}/manage-classes/school/${item?.schoolUuid}/class/${item?.uuid}`
    );
  };

  const handleExportClasses = () => {
    let body = {
      ...formData,
      class_uuid: userIds,
    };

    dispatch(getExportClasses({ token, body }));
  };

  useEffect(() => {
    setIsSuccess(false);
  }, []);

  useEffect(() => {
    if (formData?.school_uuid?.length) {
      const finalData = {
        accesser_uuid: userId,
        schools: formData?.school_uuid,
        search: "",
      };
      // dispatch(setManageClasses([]));
      dispatch(getTeachersBySchoolsApiCall({ body: finalData, token }));
    }
  }, [formData?.school_uuid]);

  useEffect(() => {
    if (teachersListBySchools) {
      if (teachersListBySchools?.length) {
        let teacherOptions = [];
        const teacherUuidArr = teachersListBySchools.map((each) => {
          teacherOptions.push({
            label: `${each.last_name} ${each.first_name}`,
            value: each.uuid,
          });
          return each.uuid;
        });

        teacherOptions.unshift({ label: "All", value: [] });
        if (isParentChanged) {
          setSelectedTeachers([{ label: "All", value: [] }]);
          setFormData((prevState) => ({
            ...prevState,
            teacher_uuid: [],
          }));
        }
        // setSelectedTeachers([{ label: "All", value: teacherUuidArr }]);
        setTeachers(teacherOptions);
      } else {
        isParentChanged && setSelectedTeachers([]);
        isParentChanged &&
          setFormData((prevData) => ({ ...prevData, teacher_uuid: null }));
        setTeachers([]);
      }
    }
    isParentChanged && setIsParentChanged(false);
  }, [teachersListBySchools]);

  useEffect(() => {
    if (formData.school_uuid && !isParentChanged) {
      let body = {
        user_role: selectedRole,
        user_uuid: userId,
        ...formData,
      };
      formData?.search?.length != 1 &&
        dispatch(getFilteredManageClassesList({ token, body }));
    }

    isAllChecked && setIsAllChecked(false);
    userIds?.length && setUserIds([]);
  }, [formData]);

  useEffect(() => {
    if (!userIds?.length) {
      setAction("action");
    }
  }, [userIds?.length]);

  useEffect(() => {
    if (code === 200) {
      setUserIds([]);
      setAction("action");
      setIsAllChecked(false);

      let body = {
        user_role: selectedRole,
        user_uuid: userId,
        ...formData,
      };

      dispatch(getFilteredManageClassesList({ token, body }));
    }
  }, [code]);

  useEffect(() => {
    dispatch(setPreviousPath(null));
    setAction("action");

    // setting the school options list
    if (schoolsList?.length) {
      let schoolOptions = [];
      const schoolUuidArray =
        schoolsList?.length &&
        schoolsList.map((each) => {
          schoolOptions.push({ label: each.school_name, value: each.uuid });
          return each.uuid;
        });

      schoolOptions.unshift({ label: "All", value: schoolUuidArray });
      setSelectedSchools([{ label: "All", value: schoolUuidArray }]);
      setSchools(schoolOptions);
      setFormData((prevState) => ({
        ...prevState,
        school_uuid: [...schoolUuidArray],
      }));
    } else {
      setSchools([]);
      setFormData((prevState) => ({
        ...prevState,
        school_uuid: [],
      }));
    }

    return () => {
      dispatch(setManageClasses(null));
      dispatch(setTeachersListBySchools(null));
      dispatch(setLoading(false));
      dispatch(setTotalPages(0));
    };
  }, []);

  return (
    <Flex
      direction="column"
      height="full"
      overflowY="auto"
      gap="4"
      overflowX="hidden"
      className="example"
    >
      <Heading1>{title}</Heading1>

      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={{ base: "2", xl: "20" }}
      >
        <MultiSelector
          id="userSchools"
          label={school?.lable}
          options={selectedSchools?.[0]?.label != "All" ? schools : schools}
          onChange={handleSchools}
          value={selectedSchools}
        >
          {" "}
        </MultiSelector>

        <MultiSelector
          id="schoolTeachers"
          label={teacher?.lable}
          value={selectedTeachers}
          placeholder={
            teachersListBySchools?.length == 0
              ? "No Teachers for the selected school(s)"
              : "Select Teacher(s)"
          }
          options={teachers}
          onChange={handleTeachers}
          onInputChange={handleInputTeachers}
        >
          {" "}
        </MultiSelector>

        <GridItem>
          <SingleSelect
            id="classStatus"
            label={status?.lable}
            name="status"
            value={formData?.status}
            onChange={handleChangeFormData}
            optionprops={status?.options}
          />
        </GridItem>
      </Grid>

      <Divider />

      <Box
        display={{ base: "flex flex-col", lg: "flex" }}
        justifyContent={{ base: "", md: "space-between" }}
      >
        <HStack justifyContent={{ base: "space-between" }}>
          <Box>
            <Checkbox
              textStyle="h6"
              isChecked={isAllChecked}
              onChange={handleCheckAll}
            >
              <Heading9>Select all</Heading9>
            </Checkbox>
          </Box>
          <Box inlineSize={{ base: "10em", lg: "10em", md: "11em" }}>
            <Select
              disabled={!userIds?.length}
              rounded="full"
              borderWidth="2px"
              borderColor="white"
              bg="primary"
              color={"white"}
              onChange={
                (e) => {
                  setAction(e.target.value);
                  setDeletePopUp(true);
                }

                // handleChangeAction(e)
              }
              _selected={{
                color: "white",
              }}
              py="1"
              size="sm"
              value={action}
              fontSize={"sm"}
            >
              <option style={{ color: "black" }} value="action">
                Select Action
              </option>
              <option style={{ color: "black" }} value="delete">
                Delete
              </option>
            </Select>
          </Box>
          {action === "delete" && deletePopUp && (
            <DeletePopUp
              setDeletePopUp={setDeletePopUp}
              deletePopUp={deletePopUp}
              setAction={setAction}
              action={action}
              text={"Are you sure you want to delete the class?"}
              onClick={handleChangeAction}
            />
          )}{" "}
          <Box
            inlineSize={{ base: "10em", xl: "18em", md: "18em", lg: "14em" }}
            display={{ base: "none", md: "block" }}
          >
            <SearchComponent
              ref={searchInputRef}
              id="searchClass"
              name="search"
              display={{ base: "none", md: "block" }}
              onChange={searchHandleChange}
              inlineSize={{
                base: "10em",
                xl: "18em",
                md: "18em",
                lg: "14em",
              }}
            />
          </Box>
        </HStack>

        <Box mt="2">
          <SearchComponent
            ref={mobileSearchInputRef}
            id="searchClass"
            name="search"
            display={{ base: "block", md: "none" }}
            onChange={searchHandleChange}
          />
        </Box>

        <HStack
          spacing="4"
          mt={{ base: "2", md: "0", lg: "0" }}
          justifyContent="space-between"
          px={{ base: "2", md: "0" }}
        >
          {exportLoading ? (
            <Flex gap="2">
              <IconText increaseTextSize="increaseTextSize">
                {" "}
                Export Classes
              </IconText>
              <Spinner color="primary" />
            </Flex>
          ) : (
            <Box onClick={handleExportClasses} role="button">
              <TextIcon
                text={"Export Classes"}
                icon={FaFileExport}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          )}

          {rolesAndPrevilegesObject?.["Manage Classes"]?.is_add ?? true ? (
            ["districtAdmin", "schoolAdmin", "superAdmin"].includes(
              selectedRole
            ) ? (
              <AddClassModal
                addClassModal={addClassModal}
                setAddClassModal={setAddClassModal}
                isSuccess={isSuccess}
                setIsSuccess={setIsSuccess}
              />
            ) : null
          ) : (
            <Box>
              <TextIcon
                changeCursorPointer="not-allowed"
                text={"Add New Class"}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          )}

          <Box>
            <RenderingOptionsView
              onClick={handleClassesView}
              selectedView={classesView}
            />
          </Box>
        </HStack>
      </Box>

      {loading ? (
        <Flex direction="column" alignItems="center">
          <Image src={loadingimg} />
        </Flex>
      ) : null}

      {!loading && manageClassesList?.length ? (
        <>
          <Box h="calc(100vh - 5rem)">
            {classesView === "GridView" ? (
              <GridViewOfClasses
                userIds={userIds}
                setUserIds={setUserIds}
                setIsAllChecked={setIsAllChecked}
                handleRedirectOfViewClass={handleRedirectOfViewClass}
                formData={formData}
                onPageChange={handlePageNumber}
              />
            ) : (
              <ListViewOfClasses
                handleRedirectOfViewClass={handleRedirectOfViewClass}
                userIds={userIds}
                setUserIds={setUserIds}
                setIsAllChecked={setIsAllChecked}
                formData={formData}
                onPageChange={handlePageNumber}
              />
            )}

            {totalPages > 1 && (
              <PaginationComponent
                onPageChange={handlePageNumber}
                pageCount={totalPages}
                forcePage={formData?.skip - 1}
                isNextButton={isNextButtonDisabled}
                isPreviousButton={isPreviousButtonDisabled}
              />
            )}
          </Box>
        </>
      ) : null}
      {!loading && !manageClassesList?.length && !isParentChanged ? (
        <NoDataFoundText>
          No Classes Available for the selected school(s) and/or teacher(s)
        </NoDataFoundText>
      ) : null}
    </Flex>
  );
};

export default ManageClassesDashboard;
