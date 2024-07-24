import { Box, Flex } from "@chakra-ui/react";
import React from "react";

import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import { wsFederationList } from "../Config";

const WSFederation = (props) => {
  const { ssoConfigObj, setSsOConfigObj, errors } = props;

  const handleChange = (event) => {
    setSsOConfigObj((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
    {wsFederationList?.map((each, index) =>
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
    </Flex>
  );
};

export default WSFederation;
