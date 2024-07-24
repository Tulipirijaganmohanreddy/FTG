
import { Box, Divider, Flex, Grid, GridItem, Spacer } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SingleSelect from "../../../components/FitnessComponents/FitnessSelect/SingleSelect";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getAllSubjects,
  getResourceFilterData,
  setResourceFilterData,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import CMSTable from "../Components/CMSTable";
import { CMSData } from "../Config";
import { debounce } from "../../../Utilities/utils";

const CMSDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);
  const { title, subHead, filter } = CMSData;

  const authToken = useSelector((state) => state?.profile?.token);
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const code = useSelector((state) => state?.profile?.code);
  const subjectsResponse = useSelector(
    (state) => state?.superAdmin?.getSubjects
  );

  const categoryOptions = [
    { label: "All", value: "" },
    {
      label: "Smart Coach Resources",
      value: "Smart Coach Resources",
    },
    {
      label: "Email Templates",
      value: "Email Templates",
    },
  ];
  const status = ["Active", "Inactive"];

  const initFilters = {
    status: "",
    subject: "",
    category_uuid: "",
    title: "",
    skip: "1",
  };

  const [filters, setFilters] = useState(initFilters);
  const [subjects, setSubjects] = useState([]);

  const handleChange = (e) => {
    filters.title && (searchInputRef.current.value = "");

    if (
      e.target.name === "category_uuid" &&
      e.target.value === "Email Templates"
    ) {
      let filtersCopy = { ...filters };
      delete filtersCopy["subject"];

      setFilters({
        ...filtersCopy,
        [e.target.name]: e.target.value,
        skip: 1,
        title: "",
      });
    } else {
      setFilters((prevState) => {
        if (prevState.subject === undefined) {
          return {
            ...prevState,
            subject: "",
            [e.target.name]: e.target.value,
            skip: 1,
            title: "",
          };
        }
        return {
          ...prevState,
          [e.target.name]: e.target.value,
          skip: 1,
          title: "",
        };
      });
    }
  };

  const searchHandleChange = debounce((event) => {
    setFilters((prevState) => ({
      ...prevState,

      skip: 1,

      [event.target.name]: event.target.value,
    }));
  }, 1000);

  const handleRedirectToAddContent = () => {
    navigate(`/role/${selectedRole}/CMS/CMSContent`);
    dispatch(setPreviousPath(location.pathname));
  };

  useEffect(() => {
    filters?.title?.length != 1 &&
      dispatch(
        getResourceFilterData({
          body: filters,
          token: authToken,
        })
      );
  }, [filters]);

  useEffect(() => {
    if (code === 200) {
      dispatch(
        getResourceFilterData({
          body: filters,
          token: authToken,
        })
      );
      // dispatch(getAllSubjects({ token: authToken }));
    }
  }, [code]);
  useEffect(() => {
    if (subjectsResponse?.length) {
      let subjectOptions = subjectsResponse.map((item) => {
        return { label: item.name, value: item.name };
      });

      setSubjects(subjectOptions);
    } else {
      setSubjects([]);
    }
  }, [subjectsResponse]);

  useEffect(() => {
    dispatch(getAllSubjects({ token: authToken }));
    dispatch(setTotalPages(null));
    return()=>{
      dispatch(setResourceFilterData(null))
      
    }
  }, []);

  return (
    <>
      <Flex direction="column" gap="2">
        <Flex alignItems="center">
          <Heading1>{title}</Heading1>

          <Spacer />
          <Box onClick={handleRedirectToAddContent} role="button">
            <TextIcon
              text="Add Content"
              icon={MdAddCircle}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        </Flex>

        <Divider borderColor="gray" />

        <Label >{subHead}</Label>

        <Heading2>{filter}</Heading2>

        <Grid
          templateColumns={{
            base: "repeat(1,1fr)",
            lg: "repeat(4,1fr)",
            md: "repeat(4,1fr)",
          }}
          gap={{ base: "3", lg: "6" }}
        >
          <GridItem>
            <SingleSelect2
              id="cmsCategory"
              label={"Category:"}
              name="category_uuid"
              value={filters?.category_uuid}
              optionsProps={categoryOptions}
              displayKey={"label"}
              optionValue={"value"}
              onChange={handleChange}
            />
          </GridItem>

          {filters?.category_uuid !== "Email Templates" ? (
            <GridItem>
              <SingleSelect2
                id="cmsSubjects"
                placeholder="All"
                label={"Subjects:"}
                name="subject"
                value={filters.subject}
                optionsProps={subjects}
                displayKey={"label"}
                optionValue={"value"}
                onChange={handleChange}
              />{" "}
            </GridItem>
          ) : null}

          <GridItem>
            <SingleSelect
              id="cmsStatus"
              label={"Status:"}
              name={"status"}
              value={filters.status}
              optionprops={status}
              onChange={handleChange}
            />
          </GridItem>

          <GridItem>
            <Box mt={{ base: "2", md: "5" }}>
              <SearchComponent
                ref={searchInputRef}
                id="cmsSearch"
                name="title"
                display={{ base: "flex", lg: "flex", md: "flex" }}
                onChange={searchHandleChange}
              />
            </Box>
          </GridItem>
        </Grid>

        <Divider  borderColor="gray" />
        <CMSTable filters={filters} setFilters={setFilters} />
      </Flex>
    </>
  );
};

export default CMSDashboard;
