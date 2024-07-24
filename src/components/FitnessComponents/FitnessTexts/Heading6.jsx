import { Text } from "@chakra-ui/react";
import React from "react";

const Heading6 = ({
  children,
  textTransform,
  letterSpacing,
  mt,
  ...headingProps
}) => {
  return (
    <>
      <Text
        display={{ base: "none", md: "none", lg: "block" }}
        textStyle={"heading6"}
        mt={mt}
        textTransform={textTransform !== undefined && textTransform}
        letterSpacing={letterSpacing !== undefined && "tight"}
        {...headingProps}
      >
        {/* {children?.length <= 30 ? children : children?.slice(0, 30) + "..."} */}
        {children}
      </Text>
      <Text
        display={{ base: "none", md: "block", lg: "none" }}
        textStyle={"heading6"}
        mt={mt}
        textTransform={textTransform !== undefined && textTransform}
        letterSpacing={letterSpacing !== undefined && "tight"}
        {...headingProps}
      >
        {/* {children?.length <= 30 ? children : children?.slice(0, 18) + "..."}
         */}
        {children}
      </Text>
      <Text
        display={{ base: "block", md: "none", lg: "none" }}
        textStyle={"heading6"}
        mt={mt}
        textTransform={textTransform !== undefined && textTransform}
        letterSpacing={letterSpacing !== undefined && "tight"}
        {...headingProps}
      >
        {/* {children?.length <= 30 ? children : children?.slice(0, 10) + "..."}
         */}
        {children}
      </Text>
    </>
  );
};

export default Heading6;
