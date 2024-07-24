import {
  Box,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Grid,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getAllStates,
  getStateByFilterApiCall,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import StatesPartnerTable from "../Components/StatesPartnerTable";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import { statesPartnersData } from "../Config";

const StatesPartnersDashboard = () => {
  const {
    title,
    subTitle,
    subHead,
    typeOptions,
    licenseStatus,
    negativeBtnText,
    positiveBtnText,
  } = statesPartnersData;
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();

  const token = useSelector((state) => state?.profile?.token);

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const loading = useSelector((state) => state?.superAdmin?.loading);

  const searchStateRef = useRef(null);

  const initialFilters = {
    state_name: "",
    type: "",
    license_status: "",
    size: 20,
    skip: 1,
  };
  const prevFiltersData = useRef(initialFilters);
  const [filters, setFilters] = useState(initialFilters);

  const [selectedState, setSelectedState] = useState({
    label: "Select..",
    value: "",
  });

  const prevStateName = useRef(selectedState);

  const [statesList, setStatesList] = useState([]);

  const getAllStatesData = useSelector(
    (state) => state?.superAdmin?.getAllStatesInfo
  );

  const handleInputChange = debounce((searchText) => {
    if (searchText?.length != 1 && searchStateRef.current !== searchText) {
      dispatch(getAllStates({ token: token, body: { search: searchText } }));

      searchStateRef.current = searchText;
    }
  }, 500);

  const onhandleChange = (selectedState) => {
    setSelectedState((prevState) => ({
      ...prevState,
      label: selectedState?.label,
      value: selectedState?.value,
    }));
    setFilters((prevState) => ({
      ...prevState,
      state_name: selectedState?.value,
    }));
  };

  const handleChange = (e) => {
    setFilters((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleNavigate = () => {
    navigate(`/role/${selectedRole}/StatesPartners/CreateStatePartner`);

    dispatch(setPreviousPath(location?.pathname));
  };

  const handleApply = (event) => {
    event.preventDefault();

    prevFiltersData.current = {
      ...filters,
    };
    prevStateName.current = { ...selectedState };

    dispatch(getStateByFilterApiCall({ body: filters, token }));
  };

  const handleClear = () => {
    dispatch(getAllStates({ token: token, body: { search: "" } }));

    dispatch(getStateByFilterApiCall({ body: initialFilters, token }));

    prevFiltersData.current = {
      ...initialFilters,
    };
    prevStateName.current = { label: "Select..", value: "" };
    setFilters(initialFilters);
    setSelectedState({
      label: "Select..",
      value: "",
    });
  };

  useEffect(() => {
    dispatch(setTotalPages(""));

    dispatch(getStateByFilterApiCall({ body: initialFilters, token }));

    dispatch(getAllStates({ token: token, body: { search: "" } }));
  }, []);

  useEffect(() => {
    if (getAllStatesData?.length) {
      let arr = getAllStatesData?.map((each) => ({
        label: each?.state_name,
        value: each?.state_name,
      }));

      setStatesList([{ value: "", label: "Select" }, ...arr]);
    } else {
      setStatesList([{ value: "", label: "Select" }]);
    }
  }, [getAllStatesData]);

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex alignItems="center">
          <Heading1>{title}</Heading1>
          <Spacer />
          <Box color="black" onClick={handleNavigate} role="button">
            <TextIcon
              text={subTitle}
              icon={IoAddCircle}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        </Flex>
        <Divider borderColor="gray" />

        <Heading2>{subHead}</Heading2>
        <form onSubmit={handleApply}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
            }}
            gap={{ base: "1", md: "2" }}
          >
            <Box>
              <ChakraSelect
                id="stateName"
                placeholder="Select"
                label={"Name"}
                name="state_name"
                onInputChange={handleInputChange}
                onChange={onhandleChange}
                value={selectedState}
                options={statesList}
              />
            </Box>

            <Box>
              <SingleSelect2
                id="selectType"
                placeholder="Select Type"
                label={"Type"}
                name="type"
                onChange={handleChange}
                optionsProps={typeOptions}
                displayKey={"label"}
                optionValue={"value"}
                value={filters.type}
              />
            </Box>

            <Box>
              <SingleSelect2
                id={"licenseStatus"}
                placeholder="Select"
                label={"Licenses Status:"}
                name="license_status"
                onChange={handleChange}
                displayKey={"label"}
                optionValue={"value"}
                optionsProps={licenseStatus}
                value={filters.license_status}
              />
            </Box>
          </Grid>
          <Center mt="5">
            <ButtonGroup gap="5">
              <NegativeButton text={negativeBtnText} onClick={handleClear} />

              <PositiveButton
                type="submit"
                text={positiveBtnText}
                bg="#65a30d"
                isLoading={loading}
              />
            </ButtonGroup>
          </Center>
        </form>

        <Divider borderColor="gray" />
        <StatesPartnerTable
          selectedState={selectedState}
          prevFiltersData={prevFiltersData}
          filters={filters}
          setFilters={setFilters}
          setSelectedState={setSelectedState}
          prevStateName={prevStateName}
        />
      </Flex>
    </>
  );
};

export default StatesPartnersDashboard;
