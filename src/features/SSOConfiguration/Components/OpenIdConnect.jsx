import {
  Box,
  Flex,
  Radio,
  Stack
} from "@chakra-ui/react";
import React from "react";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";
  
  import { useParams } from "react-router-dom";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { openIdConnectList } from "../Config";
  
  const OpenIdConnect = (props) => {
    const params = useParams();
    const { ssoConfigObj, setSsOConfigObj, errors, setErrors } = props;
  
  
    const handleChange = (event) => {
      if (
        event.target.name === "enable_state" ||
        event.target.name === "enable_nonce"
      ) {
        setSsOConfigObj((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value === "yes" ? true : false,
        }));
      } else {
        setSsOConfigObj((prevState) => ({
          ...prevState,
          [event.target.name]: event.target.value,
        }));
      }
    };
    const handleBlur = (event) => {
      const { name, value } = event.target;
      const trimmedValue = value.trim();
      setSsOConfigObj((prevState) => ({
        ...prevState,
        [name]: trimmedValue,
      }));
    };
  
    return ( 
      <Flex flexDirection={"column"} gap="2" w={'50%'}>
        {openIdConnectList?.map((each, index) =>
          each?.inputType === "Select" ? (
            <Box key={`AC${index}`}>
              <SingleSelect2
                id={each?.Id}
                placeholder="Select "
                label={each?.label}
                name={each?.name}
                value={ssoConfigObj?.[each?.name]}
                onChange={handleChange}
                optionsProps={each?.optionsList}
                displayKey={"label"}
                optionValue={"value"}
                error={errors?.[each?.name] && errors?.[each?.name]}
              />
            </Box>
          ) : (
            <Box key={`AC${index}`}>
              <Inputs
                id={each?.Id}
                label={each?.label}
                type={each?.inputType}
                background="#F5F9FF"
                rounded="lg"
                w={{ base: "100%", md: "90%", lg: "90%" }}
                border="none"
                name={each?.name}
                value={ssoConfigObj?.[each?.name]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors?.[each?.name] && errors?.[each?.name]}
              />
            </Box>
          )
        )}
  
        <Label1 name={"openIdEnableState"}>Enable State:</Label1>
  
        <Stack spacing="1" marginLeft="1rem">
          <Radio
            id="openIdEnableState"
            name="enable_state"
            onChange={handleChange}
            isChecked={ssoConfigObj?.enable_state ? true : false}
            value="yes"
          >
            <Paragraph1 decreaseMarginTop="0" decreaseMarginBottom="0">
              Yes
            </Paragraph1>
          </Radio>
          <Radio
            id="openIdEnableState"
            name="enable_state"
            onChange={handleChange}
            isChecked={!ssoConfigObj?.enable_state ? true : false}
            value="no"
          >
            <Paragraph1 decreaseMarginTop="0" decreaseMarginBottom="0">
              No
            </Paragraph1>
          </Radio>
        </Stack>
  
        <Label1 name={"openIdEnableNonce"}>Enable Nonce:</Label1>
  
        <Stack spacing="1" marginLeft="1rem">
          <Radio
            id="openIdEnableNonce"
            name="enable_nonce"
            onChange={handleChange}
            isChecked={ssoConfigObj?.enable_nonce ? true : false}
            value="yes"
          >
            <Paragraph1 decreaseMarginTop="0" decreaseMarginBottom="0">
              Yes
            </Paragraph1>
          </Radio>
          <Radio
            id="openIdEnableNonce"
            name="enable_nonce"
            onChange={handleChange}
            isChecked={!ssoConfigObj?.enable_nonce ? true : false}
            value="no"
          >
            <Paragraph1 decreaseMarginTop="0" decreaseMarginBottom="0">
              No
            </Paragraph1>
          </Radio>
        </Stack>
      </Flex>
    );
  };
  
  export default OpenIdConnect;
  