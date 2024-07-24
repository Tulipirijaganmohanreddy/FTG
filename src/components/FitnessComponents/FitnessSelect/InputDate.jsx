import React from "react";
import ErrorText from "../FitnessTexts/ErrorText";
import Calendar from "react-calendar";
import {
  Box,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { FaCalendarAlt } from "react-icons/fa";
import Label1 from "../FitnessTexts/Lable1";

const InputDate = (props) => {
  const {
    label,
    handleCalendarClick,
    isCalendarOpen,
    selectedDate,
    top,
    translate,
    handleChangeDateFromCalendar,
    onClickDay,
    error,
    ...inputprops
  } = props;
  return (
    <>
      <Box position="relative">
        <Label1 name={inputprops?.Id}> {label}</Label1>
        <InputGroup>
          <Input
            {...inputprops}
            type="text"
            fontSize={{ base: "xs", lg: "sm", md: "sm" }}
            bg="input.100"
            border="0"
            w={{ base: "100%", md: "90%", lg: "90%" }}
            size="sm"
            rounded="lg"
            placeholder="Select a date"
          />
          <InputRightElement
            h="full"
            pt={{ base: "0", lg: "0" }}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            pr={{ base: "0.9rem", lg: "3rem", md: "2.5rem", "2xl": "5.5rem" }}
          >
            <IconButton
              icon={<FaCalendarAlt />}
              aria-label="Select date"
              onClick={handleCalendarClick}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        {isCalendarOpen && (
          <Box
            position="absolute"
            top={top ? top : "1rem"}
            zIndex="1000"
            transform={translate ? null : "translateY(-100%)"}
            w={{ base: "100%", md: "90%", lg: "90%" }}
          >
            <Calendar
              value={selectedDate}
              onChange={handleChangeDateFromCalendar}
              onClickDay={onClickDay}
            />
          </Box>
        )}
        {error && <ErrorText> {error}</ErrorText>}
      </Box>
    </>
  );
};

export default InputDate;
