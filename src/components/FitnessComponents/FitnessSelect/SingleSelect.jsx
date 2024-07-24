import { FormControl, Select } from "@chakra-ui/react";
import React from "react";
import Label1 from "../FitnessTexts/Lable1";

const SingleSelect = (props) => {
  const { label, optionprops, error, reportFilter, ...selectprops } = props;

  return (
    <FormControl w="100%" display="flex" flexDir="column">
      <Label1 name={selectprops?.id}>{label}</Label1>

      <Select
        {...selectprops}
        id={selectprops?.id}
        bg="input.100"
        fontSize={{ base: "xs", md: "sm", lg: "sm" }}
        rounded="lg"
        border="none"
        w={{ base: "100%", md: "90%", lg: "90%" }}
        size="sm"
        mb="0"
      >
        {(!reportFilter) && <option value="">All</option>}
        {optionprops?.map((value, i) => {
          return (
            <option key={value} value={value}>
              {value}
            </option>
          );
        })}
      </Select>
      {error && <ErrorText> {error}</ErrorText>}
    </FormControl>
  );
};

export default SingleSelect;
