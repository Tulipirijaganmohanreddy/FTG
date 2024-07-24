import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { reportActivity } from "../Reports/jsonfiles/reportData.json";

const AdministerTest = () => {
  const TableHeaders = [
    "Report Name",
    "Action",
    "Run By",
    "Scheduled on",
    "Ready Date",
    "Status",
    "Download/View",
  ];
  const navigate = useNavigate();
  const handleButtonClick = () => {
    navigate("/role/Partner/Reports");
  };
  return (
    <>
      <Flex>
        <Box>
          <Text textStyle="h1">ADMINISTER TEST</Text>
          <br></br>
        </Box>
      </Flex>
      <Flex  mb="5">
        <ButtonGroup>
          <Button
            onClick={handleButtonClick}
            background="#EEEEEE"
            color="black"
            marginRight="-0.5rem"
            borderRadius="none"
            borderLeftRadius="1rem"
            width="10rem"
          >
            Reports
          </Button>
          <Button
            background="primary"
            color="#ffffff"
            borderRadius="none"
            borderRightRadius="1rem"
            width="10rem"
          >
            Report Activity
          </Button>
        </ButtonGroup>
      </Flex>

      <Box marginTop="2rem">
        <Text>Report Activity</Text>
        <TableContainer className="SuperAdminTables">
          <Table variant="stripped">
            <Thead>
              <Tr>
                {TableHeaders.map((item) => (
                  <Th>
                    <Text textStyle="h4">{item}</Text>
                  </Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {reportActivity.map((item, key) => (
                <Tr>
                  <Td color="#1890ff">{item.reportName}</Td>
                  <Td>{item.action}</Td>
                  <Td>{item.runby}</Td>
                  <Td>{item.scheduledon}</Td>
                  <Td>{item.readyState}</Td>
                  <Td>{item.status}</Td>
                  <Td>
                    <Link to="">Download</Link>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default AdministerTest;
