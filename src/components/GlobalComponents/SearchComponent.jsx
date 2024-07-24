import { SearchIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import React from "react";
import Label1 from "../FitnessComponents/FitnessTexts/Lable1";

const SearchComponent = React.forwardRef((props, ref) => {
  const { onChange, value, id, name, placeholder, ...searchProps } = props;
  return (
    <>
      <Label1 name={id}> </Label1>
      <InputGroup {...searchProps} size="md">
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray-3" mb="2" />}
        />
        <Input
          id={id}
          name={name}
          placeholder={placeholder ? placeholder : "Search"}
          borderRadius="full"
          size="sm"
          onChange={onChange}
          value={value}
          ref={ref}
        />
      </InputGroup>
    </>
  );
});

export default SearchComponent;
