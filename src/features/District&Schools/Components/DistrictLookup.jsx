import {
  Box,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spacer,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getStatesList } from "../../../DistrictAdminApis/districtAdminSlice";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  getDistrictsByFilter,
  getDistrictsBySearchInDistrcitLookUp,
  setDistrictsByFilter,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import { MdAddCircle } from "react-icons/md";
import { debounce } from "../../../Utilities/utils";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import { districtListData } from "../Config";
import DistrictsList from "./DistrictsList";

const DistrictLookup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initFormData = {
    district_name: "",
    district_sso_id: "",
    zipcode: "",
    district_identifier: "",
    local_identifier: "",
    school_name: "",
    state: "",
    skip: 1,
    size: "20",
  };
  const prevFormData = useRef(initFormData);
  const { DistrictLookup } = districtListData;

  const { title, subtitle, filterFields } = DistrictLookup;

  const loading = useSelector((state) => state?.superAdmin?.loading);
  const upLoading = useSelector((state) => state?.profile?.upLoading);
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);

  const states = useSelector((state) => state?.districtAdmin?.statesList);

  const token = useSelector((state) => state?.profile?.token);

  const districts = useSelector(
    (state) => state?.superAdmin?.districtsBySearchInDistrcitLookUp
  );

  const [selectedDistrict, setSelectedDistrict] = useState({
    label: "Select..",
    value: "",
  });
  const prevDistrict = useRef(selectedDistrict);

  const [formData, setFormData] = useState(initFormData);
  const [statesList, setStatesList] = useState([
    { code: "", state: "Select State" },
  ]);

  const [districtsList, setDistrictsList] = useState([]);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value, skip: 1 });
  };

  const onhandleChange = (teacher) => {
    setFormData((prevState) => ({
      ...prevState,
      district_name: teacher.value,
      skip: 1,
    }));

    setSelectedDistrict((prevState) => ({
      ...prevState,
      label: teacher.label,
      value: teacher.value,
    }));
  };

  const handleApply = (event) => {
    event.preventDefault();
    prevFormData.current = {
      ...formData,
    };
    prevDistrict.current = { ...selectedDistrict };
    dispatch(getDistrictsByFilter({ formData, token: token }));
  };

  const handleClear = () => {
    setSelectedDistrict({
      label: "Select..",
      value: "",
    });
    prevFormData.current = {
      ...initFormData,
    };
    setFormData(initFormData);
    getDistrictsBySearchInDistrcitLookUp({ token, body: { search: "" } });

    dispatch(getDistrictsByFilter({ token: token, formData: initFormData }));
    dispatch(
      getDistrictsBySearchInDistrcitLookUp({ token, body: { search: '' } })
    );
    dispatch(setDistrictsByFilter(null));
  };

  const handleDistrictAddition = () => {
    dispatch(setPreviousPath(null));
    navigate(`/role/${selectedRole}/Districts/AddNewDistrict`);
  };

  const handleInputChange = debounce((text) => {
    text?.length > 2 &&
      dispatch(
        getDistrictsBySearchInDistrcitLookUp({ token, body: { search: text } })
      );
  }, 500);

  useEffect(() => {
    !states?.length && dispatch(getStatesList({ token }));
    dispatch(
      getDistrictsBySearchInDistrcitLookUp({ token, body: { search: "" } })
    );
    dispatch(getDistrictsByFilter({ formData, token: token }));
  }, []);

  useEffect(() => {
    states?.length && setStatesList((prevState) => [...prevState, ...states]);
  }, [states]);

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

  useEffect(() => {});

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex alignItems="center">

          <Heading1>{title}</Heading1>
          <Spacer />

          {selectedRole !== "stateAdmin" ? (
            <Box color="black" role="button" onClick={handleDistrictAddition}>
              <TextIcon
                text={subtitle}
                icon={MdAddCircle}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          ) : null}
        </Flex>

        <Divider borderColor="gray" />

        <Heading2>FILTER</Heading2>

        <form onSubmit={handleApply}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(3, 1fr)",
            }}
            gap={{ base: "3", lg: "2" }}
          >

            {filterFields?.map((item, index) => {
              return (
                <GridItem key={'abc'+index}>
                  {item.inputType === "text" && (
                    <Inputs
                      id={item?.id}
                      label={item?.label}
                      type="text"
                      border="0px"
                      whiteSpace="nowrap"
                      bg="bg.100"
                      name={item?.name}
                      value={formData[item?.name]}
                      onChange={handleChange}
                      placeholder={item.placeholder}
                      maxLength={item?.name == "district_sso_id" ? 4 : null}
                    />
                  )}

                  {item.inputType === "select" &&
                    (item.name === "state" ? (
                      <SingleSelect2
                        id={item?.id}
                        label={item?.label}
                        name={item?.name}
                        value={formData?.state}
                        onChange={handleChange}
                        optionsProps={statesList}
                        displayKey={"state"}
                        optionValue={"code"}
                        mb="0.1px"
                      />
                    ) : (
                      <ChakraSelect
                        id={item?.id}
                        placeholder="Select"
                        label={item?.label}
                        name={item?.name}
                        onInputChange={handleInputChange}
                        onChange={onhandleChange}
                        value={selectedDistrict}
                        options={districtsList}
                        mb="0.4px"
                      />
                    ))}
                </GridItem>
              );
            })}
          </Grid>

          <Center mt="5">
            <Flex minWidth="max-content" alignItems="center" gap="5">
              <NegativeButton text={"Clear"} onClick={handleClear} />
              <PositiveButton
                type="submit"
                text={"Apply"}
                isLoading={upLoading}
                bg="#19A617"
              />
            </Flex>
          </Center>
        </form>

        <Divider borderColor="gray" mb="1"  />
        <DistrictsList
          setFormData={setFormData}
          formData={formData}
          prevFormData={prevFormData}
          setSelectedDistrict={setSelectedDistrict}
          prevDistrict={prevDistrict}
        />
      </Flex>
    </>
  );
};

export default DistrictLookup;
