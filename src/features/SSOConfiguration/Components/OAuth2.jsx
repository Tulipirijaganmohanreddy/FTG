import { Box, Flex, Radio, Stack } from "@chakra-ui/react";
import React from "react";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Paragraph1 from "../../../components/FitnessComponents/FitnessTexts/Paragraph1";

import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import { oAuth2List } from "../Config";

const OAuth2 = (props) => {
  const { ssoConfigObj, setSsOConfigObj, errors } = props;

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
    {oAuth2List?.map((each, index) =>
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

      <Label1 name={"oAuth2EnableState"}>Enable State:</Label1>

      <Stack spacing="1" marginLeft="1rem">
        <Radio
          id="oAuth2EnableState"
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
          id="oAuth2EnableState"
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

      <ErrorText>{errors["enable_state"]}</ErrorText>

      <Label1 name={"oAuth2EnableNonce"}>Enable Nonce:</Label1>

      <Stack spacing="1" marginLeft="1rem">
        <Radio
          id="oAuth2EnableNonce"
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
          id="oAuth2EnableNonce"
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

      <ErrorText>{errors["enable_nonce"]}</ErrorText>
    </Flex>
  );
};

export default OAuth2;
