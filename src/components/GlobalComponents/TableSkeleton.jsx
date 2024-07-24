import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  Flex,
  Text,
  Grid,
  GridItem,
  HStack,
  Spacer,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const TableSkeleton = () => {
  return (
    <Stack mt="6" spacing="3">
      {" "}
      <Skeleton height="3rem" startColor="bg.100" />
      <Skeleton height="3rem" startColor="gray-3" />
      <Skeleton height="3rem" startColor="bg.100" />
      <Skeleton height="3rem" startColor="gray-3" />
      <Skeleton height="3rem" startColor="bg.100" />
      <Skeleton height="3rem" startColor="gray-3" />
      <Skeleton height="3rem" startColor="bg.100" />
    </Stack>
  );
};

export default TableSkeleton;
