/** @format */

import {
  Box,
  Center,
  Checkbox,
  Divider,
  Flex,
  Grid,
  GridItem,
  Spacer,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { FaFileExport } from "react-icons/fa";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import ChakraSelect from "../../../components/FitnessComponents/FitnessSelect/ChakraSelect";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import IconText from "../../../components/FitnessComponents/FitnessTexts/IconText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import ParagraphWithColorBlack from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorBlack";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  exportLicensesData,
  filterLicenseList,
  getFundersList,
  getLicenseList,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import LicensesList from "../Components/LicensesList";
import { licenseFields } from "../Config";

const LicensesDashboard = () => {
  const {
    filterFields,
    title,
    createText,
    subHead,
    negativeBtnText,
    positiveBtnText,
    exportText,
  } = licenseFields;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const token = useSelector((state) => state?.profile?.token);

  const upLoading = useSelector((state) => state?.superAdmin?.loading);
  const exportLoading = useSelector((state) => state?.profile?.loading2);

  const fundersList = useSelector((state) => state?.superAdmin?.fundersList);
  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);
  const [selectedFunderName, setSelectedFunderName] = useState({
    label: "Select..",
    value: "",
  });
  const [funders, setFunders] = useState([]);

  const initialFilters = {
    funder_uuid: "",
    funder_type: [],
    district_name: "",
    login_status: [],
    size: "20",
    skip: 1,
  };

  const prevFiltersData = useRef(initialFilters);
  const prevFunder = useRef(selectedFunderName);

  const [filters, setFilters] = useState(initialFilters);

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    if (fieldName === "funder_type" || fieldName === "login_status") {
      if (e.target.checked) {
        setFilters((prevState) => ({
          ...prevState,
          [fieldName]: [...filters[fieldName], fieldValue],
          skip: 1,
        }));
      } else {
        let filteredFunderTypes = filters[fieldName].filter(
          (funder) => funder !== fieldValue
        );
        setFilters((prevState) => ({
          ...prevState,
          [fieldName]: filteredFunderTypes,
          skip: 1,
        }));
      }
    } else {
      setFilters({ ...filters, [fieldName]: fieldValue });
    }
  };

  const handleClear = () => {
    setFilters(initialFilters);
    prevFiltersData.current = {
      ...initialFilters,
    };
    prevFunder.current = { label: "Select..", value: "" };
    setSelectedFunderName([]);

    dispatch(getLicenseList({ body: initialFilters, token: token }));
  };

  const handleFundername = (funderData) => {
    setSelectedFunderName(funderData);

    setFilters((prevState) => ({
      ...prevState,
      funder_uuid: funderData.value,
      skip: 1,
    }));
  };

  const handleInputChange = debounce((text) => {
    text?.length != 1 &&
      dispatch(getFundersList({ token: token, body: { search: text } }));
  }, 500);

  const handleExportLicenses = () => {
    let body = {
      ...filters,
      uuid: userIds,
    };
    dispatch(exportLicensesData({ token, body }));
  };

  const validateData = (event) => {
    event.preventDefault();

    prevFiltersData.current = {
      ...filters,
    };
    prevFunder.current = { ...selectedFunderName };

    dispatch(
      filterLicenseList({
        token: token,
        body: filters,
      })
    );
  };

  const licenseCreation = () => {
    navigate(`/role/${selectedRole}/Licenses/CreateNewLicense`);
  };

  useEffect(() => {
    dispatch(getFundersList({ token: token, body: { search: "" } }));
    dispatch(getLicenseList({ body: initialFilters, token: token }));
  }, []);

  useEffect(() => {
    if (fundersList?.length) {
      let arr = fundersList.map((funder) => ({
        label: ["state", "partner"].includes(funder.type)
          ? funder.state_name
          : funder.district_name,
        value: funder.uuid,
      }));
      setFunders(arr);
    } else {
      setFunders([]);
    }
  }, [fundersList]);

  return (
    <>
      <Flex direction="column" gap="4">
        <Flex alignItems="center">
          <Heading1>{title}</Heading1>

          <Spacer />
          <Box role="button" onClick={licenseCreation}>
            <TextIcon
              text={createText}
              icon={MdAddCircle}
              increaseTextSize="increaseTextSize"
            ></TextIcon>
          </Box>
        </Flex>
        <Divider borderColor="gray" />

        <form onSubmit={validateData}>
          <Grid
            templateColumns={{
              base: "repeat(1, 1fr)",
              lg: "repeat(3, 1fr)",
              md: "repeat(3, 1fr)",
            }}
          >
            {filterFields?.map((item, index) => {
              return (
                <>
                  <GridItem colSpan="1" key={`${index}cod`}>
                    {item.inputType === "multiselect" && (
                      <Box key={`${index}code1`}>
                        <ChakraSelect
                          id={item?.Id}
                          label={item?.label}
                          value={selectedFunderName}
                          onInputChange={handleInputChange}
                          onChange={handleFundername}
                          options={funders}
                          className="example"
                        />
                      </Box>
                    )}

                    {item.inputType === "text" && (
                      <Box
                        mt={{ base: "0", md: "-3rem", lg: "-3rem" }}
                        key={`${index}coder2`}
                      >
                        <Inputs
                          id={item?.Id}
                          type="text"
                          label={item.label}
                          name={item?.name}
                          placeholder={item.placeholder}
                          value={filters[item?.name]}
                          onChange={handleChange}
                        />
                      </Box>
                    )}

                    {item?.inputType === "checkbox" && (
                      <Box key={`${index}coders3`}>
                        <Label1 name={item?.Id} textStyle={"h6"}>
                          {item?.label}
                        </Label1>
                        {item?.options?.map((option, index) => (
                          <Flex ml="3" alignItems={'center'} alignSelf={'center'}>
                              <Checkbox
                                key={"a" + index}
                                id={item?.Id}
                                // size="sm"
                                isChecked={filters[item.name]?.includes(
                                  option?.value
                                )}
                                value={option?.value}
                                name={item?.name}
                                onChange={handleChange}
                              >
                                <ParagraphWithColorBlack>
                                  {option?.label}
                                </ParagraphWithColorBlack>
                              </Checkbox>
                          </Flex>
                        ))}
                      </Box>
                    )}
                  </GridItem>
                </>
              );
            })}
          </Grid>

          <Center mt="2">
            <Flex gap="3">
              <Box onClick={handleClear}>
                <NegativeButton text={negativeBtnText} />
              </Box>

              <PositiveButton
                type="submit"
                text={positiveBtnText}
                bg="#65a30d"
                isLoading={upLoading}
              />
            </Flex>
          </Center>
        </form>
        <Divider borderColor="gray" mt="5" />

        <Flex alignItems="center">
          <Heading2>{subHead}</Heading2>

          <Spacer />
          {exportLoading ? (
            <Flex gap="2">
              <IconText increaseTextSize="increaseTextSize">
                {exportText}
              </IconText>
              <Spinner color="primary" />
            </Flex>
          ) : (
            <Box onClick={handleExportLicenses} role="button">
              <TextIcon
                text={exportText}
                icon={FaFileExport}
                increaseTextSize="increaseTextSize"
              />
            </Box>
          )}
        </Flex>

        <LicensesList
          userIds={userIds}
          setUserIds={setUserIds}
          setIsAllChecked={setIsAllChecked}
          isAllChecked={isAllChecked}
          filters={filters}
          setFilters={setFilters}
          setSelectedFunderName={setSelectedFunderName}
          prevFiltersData={prevFiltersData}
          prevFunder={prevFunder}
        />
      </Flex>
    </>
  );
};

export default LicensesDashboard;
