import { Box, Flex, Input, Select, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { CreateNewMappingData, createTableData } from "../Config";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import { useDispatch, useSelector } from "react-redux";
import {
  getCreateMappingObject,
  getCsvColumnsNames,
  getGetMapObjDetailsById,
  getGetTablesById,
  setCsvColumnsNames,
  setGetMapObjDetailsById,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Heading5 from "../../../components/FitnessComponents/FitnessTexts/Heading5";
import SubHeading from "../../../components/FitnessComponents/FitnessTexts/SubHeading";
import Heading9 from "../../../components/FitnessComponents/FitnessTexts/Heading9";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";


const EditMapping = (props) => {
  const {
    setEditMapping,
    editMapping,
    selectedMappingId,
    setSelectedMappingId,
  } = props;
  const {
    text,
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
  const params = useParams();

  const mappingUuid = selectedMappingId;

  const token = useSelector((state) => state?.profile?.token);

  const columnNames = useSelector(
    (state) => state?.schoolAdmin?.csvColumnsNames
  );
  const loading = useSelector((state) => state.profile.upLoading);

  const manageUser = useSelector((state) => state.profile.manageUser);
  const code = useSelector((state) => state.profile.code);

  const mappingTableData = useSelector(
    (state) => state?.schoolAdmin?.getTablesById?.data?.response
  );

  const getMapObjDetailsByIdData = useSelector(
    (state) => state?.schoolAdmin?.getMapObjDetailsById?.data?.response
  );

  const previousPath = useSelector((state) => state?.profile?.previousPath);

  const [csvFileUploaded, setCsvFileUploaded] = useState(false);

  const [requiredFields, setRequiredFields] = useState([]);

  const formData = new FormData();

  const [dropdowntext, setDropdowntext] = useState();

  const [data, setData] = useState({
    data_set: "",
    name: "",
    mapped_object: {},
    mapUUID: mappingUuid,
  });

  const [name, setName] = useState("");

  const [selectedData, setSelectedData] = useState({});

  const mandataryArrays = mappingTableData?.filter((item) => item?.Required);

  const mandatoryHeaders = mandataryArrays?.map((item) => item.FieldCd);

  const onHandleChange = (event) => {
    if (!event.target.value) {
      const dummyObj = {
        ...data.mapped_object,
      };
      delete dummyObj[event.target.name];

      setData((prevState) => ({
        ...prevState,
        mapped_object: {
          ...dummyObj,
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        mapped_object: {
          ...prevState.mapped_object,
          [event.target.name]: event.target.value,
        },
      }));
    }
  };

  const inputOnChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onSelect = (e) => {
    setDropdowntext(e.target.value);
    // dispatch(getGetTablesById({ uuid: dropdowntext, token }));

    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const clickToSave = (event) => {
	event.preventDefault()

    const finalBody = {
      ...data,
      mapUUID: mappingUuid,
      updateMapping: true,
    };

    const existingmandatoryHeaders = [];

    const selectedValue = data.mapped_object;

    Object.keys(selectedValue).forEach((key) => {
      if (mandatoryHeaders.includes(key)) {
        existingmandatoryHeaders.push(key);
      }
    });

    const missedmandatoryHeaders = mandatoryHeaders.filter(
      (key) => !existingmandatoryHeaders.includes(key)
    );

    setRequiredFields(missedmandatoryHeaders);

    if (missedmandatoryHeaders.length === 0 && data?.name) {
      dispatch(getCreateMappingObject({ finalBody, token }));
    }
  };

  useEffect(() => {
    dispatch(setCsvColumnsNames(null));

    dispatch(getGetMapObjDetailsById({ uuid: mappingUuid, token }));

    // dispatch(getGetTablesById({ uuid: 1, token }));
  }, []);

  useEffect(() => {
    if (code) {
      setEditMapping(false);
    }
  }, [code]);

  useEffect(() => {
    setData({
      data_set: getMapObjDetailsByIdData?.data_set,
      name: getMapObjDetailsByIdData?.name,
      mapped_object: getMapObjDetailsByIdData?.mapped_object,
    });
  }, [getMapObjDetailsByIdData]);

  useEffect(() => {
    data?.data_set &&
      dispatch(getGetTablesById({ uuid: data?.data_set, token }));
  }, [data?.data_set]);

  useEffect(() => {
    setData({
      ...data,
      columnNames: columnNames,
    });
  }, [columnNames]);

  return (
    <>
      <Flex direction="column" gap="3">
        <SubHeading>Edit Mapping </SubHeading>

    

        <SubHeading color="black-2">{sideHeading}</SubHeading>

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
              value={data?.name}
              error={!data.name && errorText}
            />
            <Box inlineSize="xs">
              <Box>
                <Label1 name="mappingFile">{step3}</Label1>
              </Box>

              <SubHeading>
                {" "}
                {getMapObjDetailsByIdData?.uploadedFileName}
              </SubHeading>
            </Box>
          </Flex>
        </Flex>
      

          <SubHeading color="black-2">{tableName}</SubHeading>
          <form onSubmit={clickToSave}>

          <>
            <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
              <Table>
                <Thead>
                  <Tr>
                    {tableColumns.map((columnName, index) =>
                      columnName === "MapTo:" ? (
                        <Th
                          color="primary"
                          key={`editmap${index}`}
                          colSpan={3}
                          px={{ base: "5rem", md: "" }}
                          scope="col"
                        >
                          {columnName}
                        </Th>
                      ) : (
                        <Th color="primary" key={`editmap${index}`}>
                          {columnName}
                        </Th>
                      )
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {mappingTableData?.length &&
                    mappingTableData?.map((item, i) => (
                      <Tr>
                        {item?.Required === true ? (
                          <Td>
                            {item?.Name}*
                            {requiredFields?.length > 0 &&
                            requiredFields.includes(item?.FieldCd) ? (
                              <ErrorText>Required</ErrorText>
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
                            value={data?.mapped_object[item?.FieldCd]}
                            onChange={(e) => onHandleChange(e)}
                            size="sm"
                            rounded="lg"
                            w={{ base: "100%", lg: "50%", md: "90%" }}
                          >
                            {csvFileUploaded
                              ? columnNames?.length &&
                                columnNames?.map((option, index) => (
                                  <option value={option}>{option}</option>
                                ))
                              : Object.keys(
                                  getMapObjDetailsByIdData !== undefined &&
                                    getMapObjDetailsByIdData?.mapped_object
                                )?.map(
                                  (key) =>
                                    item?.FieldCd === key && (
                                      <option>
                                        {" "}
                                        {
                                          getMapObjDetailsByIdData
                                            ?.mapped_object[key]
                                        }
                                      </option>
                                    )
                                )}
                          </Select>
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>

              {!mappingTableData?.length && (
                <NoDataFoundText>No Data Found</NoDataFoundText>
              )}
            </TableContainer>
          </>

          <Flex justify="center" gap={8} width={"full"}>
            <NegativeButton
              text={"Cancel"}
              onClick={() => {
                navigate(previousPath);
                dispatch(setGetMapObjDetailsById(null));
                setEditMapping(false)
              }}
            />
            <PositiveButton text={"Save"} isLoading={loading} type="submit" />
          </Flex>
        </form>
      </Flex>
    </>
  );
};

export default EditMapping;
