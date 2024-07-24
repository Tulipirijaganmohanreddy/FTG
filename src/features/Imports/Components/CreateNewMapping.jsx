import {
  Box,
  Flex,
  Input,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import GloabalTab from "../../../components/FitnessComponents/FitnessTabs/GloabalTab";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Heading from "../../../components/FitnessComponents/FitnessTexts/Heading";
import Heading9 from "../../../components/FitnessComponents/FitnessTexts/Heading9";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import SubHeading from "../../../components/FitnessComponents/FitnessTexts/SubHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  getCreateMappingObject,
  getCsvColumnsNames,
  getGetTablesById,
  setCsvColumnsNames,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { CreateNewMappingData, createTableData } from "../Config";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { validateFormData } from "../../../Utilities/FormValidation";
import { setMessage } from "../../../store/slices/profileSlice";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";

const CreateNewMapping = (props) => {
  const { setCreateMapping, createMapping } = props;
  const {
    text1,
    text2,
    sideHeading,
    step1,
    step1Options,
    step2,
    step3,
    tableName,
    tableColumns,
    errorText,
    errorText2,
  } = CreateNewMappingData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const token = useSelector((state) => state?.profile?.token);

  const loading = useSelector((state) => state.profile.upLoading);

  const code = useSelector((state) => state.profile.code);

  const columnNames = useSelector(
    (state) => state?.schoolAdmin?.csvColumnsNames
  );

  const mappingTableData = useSelector(
    (state) => state?.schoolAdmin?.getTablesById?.data?.response
  );

  const formData = new FormData();

  const [dropdowntext, setDropdowntext] = useState(1);

  const [name, setName] = useState("");

  const [selectedData, setSelectedData] = useState({});

  const [file, setFile] = useState(null);

  const [requiredFields, setRequiredFields] = useState([]);

  const [modifiedColumnNames, setModifiedColumnNames] = useState([]);

  const mandataryArrays = mappingTableData?.filter((item) => item?.Required);

  const mandatoryHeaders = mandataryArrays?.map((item) => item?.FieldCd);

  const onHandleChange = (event) => {
    if (!event.target.value) {
      const dummyObj = {
        ...selectedData,
      };
      delete dummyObj[event.target.name];

      setSelectedData({
        ...dummyObj,
      });
    } else {
      setSelectedData({
        ...selectedData,
        [event.target.name]: event.target.value,
      });
    }
  };

  const inputOnChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setName(value);
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setName(trimmedValue);
  };

  const clickToSave = (event) => {
    event.preventDefault();
    const finalBody = {
      name: name,
      data_set: dropdowntext,
      mapped_object: selectedData,
    };

    const existingmandatoryHeaders = [];

    Object.keys(selectedData).forEach((key) => {
      if (mandatoryHeaders.includes(key)) {
        existingmandatoryHeaders.push(key);
      }
    });

    const missedmandatoryHeaders = mandatoryHeaders?.filter(
      (key) => !existingmandatoryHeaders.includes(key)
    );

    setRequiredFields(missedmandatoryHeaders);
    if (missedmandatoryHeaders.length === 0 && name) {
      dispatch(getCreateMappingObject({ finalBody, token }));
    } else {
      dispatch(setMessage("Please map all the mandatory fields"));
    }
  };

  const onSelect = (e) => {
    setDropdowntext(e.target.value);
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      formData.append("file", e.target.files[0]);
      dispatch(getCsvColumnsNames({ finalBody: formData, token }));
    } else {
      setFile(null);
    }
  };

  useEffect(() => {
    const _columnArrForFieldCdCheck = [];
    if (columnNames?.length) {
      const _modifiedColumns = columnNames.map((item) => {
        const label = item.trim();
        const value = label.toLowerCase().split(/\s+/).join("");
        _columnArrForFieldCdCheck.push(value);
        return { label, value: label };
      });

      const _dataObj = {};
      mappingTableData.map((item) => {
        // let columnIndex = _modifiedColumns.findIndex(
        // 	(column) => column.value === item?.FieldCd.toLowerCase(),
        // );

        let columnIndex = _columnArrForFieldCdCheck.indexOf(
          item?.FieldCd.toLowerCase()
        );

        if (columnIndex !== -1) {
          _dataObj[item?.FieldCd] = _modifiedColumns[columnIndex]["label"];
        }
      });

      setModifiedColumnNames(_modifiedColumns);

      setSelectedData(_dataObj);
    }
  }, [columnNames]);

  useEffect(() => {
    return () => {
      dispatch(setCsvColumnsNames(null));
    };
  }, []);

  useEffect(() => {
    dispatch(getGetTablesById({ uuid: dropdowntext, token }));
  }, [dropdowntext]);

  useEffect(() => {
    if (code) {
      setCreateMapping(false);
    }
  }, [code]);

  return (
    <>
      <Flex
        direction="column"
        gap="4"
        overflow="hidden"
        mr={{ base: "-0.4rem", md: "0" }}
      >
        <Box>
          <Label marginTopText={"0"}>{text1}</Label>
          <Label marginTopText={"0"}>{text2}</Label>
        </Box>
        <SubHeading>{sideHeading}</SubHeading>

        <Flex justifyContent={"space-between"}>
          <Flex w="50%" flexDirection={"column"} gap={"3"}>
            <SingleSelect2
              label={step1}
              id={"dataSet"}
              name={"dataSet"}
              optionsProps={step1Options}
              displayKey={"lable"}
              optionValue={"id"}
              onChange={(e) => onSelect(e)}
            />
            <Inputs
              id="mappingName"
              label={step2}
              type="text"
              name="name"
              onChange={(e) => inputOnChange(e)}
              onBlur={handleBlur}
              value={name}
              error={!name && errorText}
            />
            <Box inlineSize="xs">
              <Box>
                <Label1 name="mappingFile">{step3}</Label1>
              </Box>

              <Stack width="220px">
                <input
                  id="mappingFile"
                  accept=".csv"
                  type="file"
                  bg="white"
                  borderColor="white"
                  name="file"
                  onChange={(e) => handleChange(e)}
                />
              </Stack>
              {!file && <ErrorText>{errorText2}</ErrorText>}
            </Box>
          </Flex>
        </Flex>

        <form onSubmit={clickToSave}>
          <Text textStyle="h4" mt="4" color="black-2">
            {tableName}
          </Text>
          <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
            <Table>
              <Thead>
                <Tr>
                  {tableColumns.map((columnName, index) => {
                    return (
                      <Th scope="col">
                        <Text textStyle="theading" color="primary">
                          {columnName}
                        </Text>
                      </Th>
                    );
                  })}
                </Tr>
              </Thead>
              <Tbody>
                {mappingTableData?.length &&
                  mappingTableData?.map((item, i) => {
                    return (
                      <Tr key={`${i}01`}>
                        {item?.Required === true ? (
                          <Td>
                            {item?.Name}*
                            {requiredFields?.length > 0 &&
                            requiredFields.includes(item?.FieldCd) ? (
                              <ErrorText color="red">Required</ErrorText>
                            ) : null}
                          </Td>
                        ) : (
                          <Td>{item?.Name}</Td>
                        )}

                        <Td>{item?.FieldLength + " " + item?.ShowType}</Td>
                        <Td role="cell">
                          <Select
                            aria-label="MapTo"
                            placeholder="Select"
                            bg="bg.100"
                            // borderColor="bg.100"
                            variant="outline"
                            name={item?.FieldCd}
                            value={selectedData?.[item["FieldCd"]]}
                            onChange={onHandleChange}
                            size="sm"
                            rounded="lg"
                            w={{ base: "100%", lg: "90%", md: "90%" }}
                          >
                            {modifiedColumnNames?.length &&
                              modifiedColumnNames?.map((option, index) => (
                                <option key={index + 123} value={option.label}>
                                  {option.value}
                                </option>
                              ))}
                          </Select>
                        </Td>
                      </Tr>
                    );
                  })}
              </Tbody>
            </Table>

            {!mappingTableData?.length && (
              <NoDataFoundText>No Data Found</NoDataFoundText>
            )}
          </TableContainer>
          <Flex justify="center" gap={8} width={"full"}>
            <NegativeButton
              text={"Cancel"}
              onClick={() => {
                setCreateMapping(false);
              }}
            />
            <PositiveButton text={"Save"} isLoading={loading} type="submit" />
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default CreateNewMapping;
