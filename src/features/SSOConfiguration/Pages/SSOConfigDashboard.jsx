import {
  Box,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Grid,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getDistrictsForRoleChange,
  getSSOConfigByFilterApiCall,
  setSsoConfigByFilterData,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { ssoConfigData } from "../Config";
import SSOConfigTable from "../Components/SSOConfigTable";

const SSOConfigDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const {
    title,
    addSso,
    authenticationProtocolTypes,
    subTitle,
    positiveBtnText,
    negativeBtnText,
  } = ssoConfigData;

  const token = useSelector((state) => state?.profile?.token);

  const loading = useSelector((state) => state?.superAdmin?.loading);

  const districts = useSelector(
    (state) => state?.superAdmin?.districtsForChangeRole
  );

  const initialFilters = {
    districts: "",
    protocol: "",
    size: "20",
    skip: 1,
  };
  const [filters, setFilters] = useState(initialFilters);

  const [selectedDistrict, setSelectedDistrict] = useState({
    label: "Select..",
    value: "",
  });

  const [selectedProtocal, setSelectedProtocal] = useState({
    label: "Select..",
    value: "",
  });

  const [districtsList, setDistrictsList] = useState([]);

  const handleProtocolChange = (option) => {
    setSelectedProtocal((prevState) => ({
      ...prevState,
      label: option.label,
      value: option.value,
    }));
    setFilters((prevState) => ({
      ...prevState,
      protocol: option.value,
      skip: 1,
    }));
  };

  const onhandleChange = (district) => {
    setSelectedDistrict((prevState) => ({
      ...prevState,
      label: district.label,
      value: district.value,
    }));
    setFilters((prevState) => ({
      ...prevState,
      districts: district.value,
      skip: 1,
    }));
  };

  const handleClear = () => {
    setSelectedDistrict({
      label: "Select..",
      value: "",
    });
    setSelectedProtocal({
      label: "Select..",
      value: "",
    });
    setFilters(initialFilters);

    dispatch(
      getSSOConfigByFilterApiCall({
        body: initialFilters,
        token,
      })
    );
  };

  const handleInputChange = debounce((text) => {
    const body = {
      search: text,
    };
    setFilters((prevState) => ({
      ...prevState,
      skip: 1,
    }));
    text?.length != 1 && dispatch(getDistrictsForRoleChange({ token, body }));
  }, 500);

  const handleApply = (event) => {
    event.preventDefault();

    dispatch(
      getSSOConfigByFilterApiCall({
        body: filters,
        token,
      })
    );
  };

  useEffect(() => {
    dispatch(setTotalPages(""));

    const body = {
      search: "",
    };
    dispatch(
      getSSOConfigByFilterApiCall({
        body: initialFilters,
        token,
      })
    );

    dispatch(getDistrictsForRoleChange({ body, token }));
    return () => {
      dispatch(setSsoConfigByFilterData(null));
    };
  }, []);

  useEffect(() => {
    if (districts?.length) {
      let arr = districts.map((district) => ({
        label: district?.district_name,
        value: district?.district_name,
      }));
      setDistrictsList(arr);
    } else {
      setDistrictsList([]);
    }
  }, [districts]);

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex
          display={{ base: "flex flex-col", md: "flex", lg: "flex" }}
          alignItems="center"
        >
          <Heading1>{title}</Heading1>

          <Spacer />
          <Box role="button">
            <TextIcon
              text={addSso}
              icon={MdAddCircle}
              onClick={() => {
                dispatch(setPreviousPath(location.pathname));
                navigate("/role/SuperAdmin/SSOConfig/CreateNewSSOConfig");
              }}
            />
          </Box>
        </Flex>
        <Divider borderColor="gray" />

        <Heading2>{subTitle}</Heading2>

        <form onSubmit={handleApply}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1Fr)",
              md: "repeat(2, 1Fr)",
            }}
          >
            <Box>
              <ChakraSelect
                id="districtName"
                placeholder="Select"
                label={"District Name*"}
                name="districts"
                onInputChange={handleInputChange}
                onChange={onhandleChange}
                value={selectedDistrict}
                options={districtsList}
              />
            </Box>

            <Box>
              <ChakraSelect
                id="authenticationProtocal"
                label={"Authentication Protocol"}
                name="authentication_protocal"
                options={authenticationProtocolTypes}
                onChange={handleProtocolChange}
                value={selectedProtocal}
              />
            </Box>
          </Grid>

          <Center mt="4">
            <Flex minWidth="max-content" alignItems="center" mb="2">
              <ButtonGroup gap="4">
                <NegativeButton onClick={handleClear} text={negativeBtnText} />

                <PositiveButton
                  type="submit"
                  bg="#65a30d"
                  text={positiveBtnText}
                  isLoading={loading}
                />
              </ButtonGroup>
            </Flex>
          </Center>
        </form>

        <Divider borderColor="gray" />

        <SSOConfigTable filters={filters} setFilters={setFilters} />
      </Flex>
    </>
  );
};

export default SSOConfigDashboard;
