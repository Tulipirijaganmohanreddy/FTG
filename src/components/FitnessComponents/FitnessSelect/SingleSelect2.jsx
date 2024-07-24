import { FormControl, Select } from "@chakra-ui/react";
import React from "react";
import ErrorText from "../FitnessTexts/ErrorText";
import Label1 from "../FitnessTexts/Lable1";

const SingleSelect2 = (props) => {
  const {
    label,
    optionValue,
    displayKey,
    optionsProps,
    error,
    placeholder,
    increaseWidth,
    increaseMarginTop,
    decreaseMarginTop,
    bg,
    mb,
	border,

    ...selectprops
  } = props;

  return (
    <FormControl
      w="100%"
      display="flex"
      flexDir="column"
      mt={increaseMarginTop !== undefined && increaseMarginTop}
      mb={mb ? mb : ""}
    >
      <Label1 name={selectprops?.id} decreaseMarginTop="0">
        {label}
      </Label1>

      <Select
        bg={bg ? bg : "head2"}
        borderColor=""
        id={selectprops?.id}
        placeholder={placeholder}
        textStyle={"p"}
        //size={{ base: 'sm', md: 'md', lg: 'sm' }}
        // maxW={'100%'}
        rounded="md"
        size="sm"
        border={border ? border : "0"}
        w={
          increaseWidth !== undefined
            ? increaseWidth
            : { base: "100%", md: "90%", lg: "90%" }
        }
        {...selectprops}
      >
        {optionsProps?.map((value, i) => {
          return (
            <option
              key={i}
              value={value[optionValue]}
              // selected={selectedValue[item?.value] === value}
            >
              {value[displayKey]}
            </option>
          );
        })}
      </Select>
      {error && <ErrorText> {error}</ErrorText>}
    </FormControl>
  );
};

export default SingleSelect2;
