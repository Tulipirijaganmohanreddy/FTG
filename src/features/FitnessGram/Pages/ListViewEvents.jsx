import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Flex,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import React from "react";
import TextIcon from "../../../components/TextIcon";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";
import run from "../../../assets/Images/FitnessGramEventImages/undraw_fitness_stats_sht6 (1)@2x.png";
import { useSelector } from "react-redux";
import UseResize from "../../../CustomHooks/UseResize";
import PaginationComponent from "../../../components/PaginationComponent";

const tableHeaders = [
  "S.No",
  "Event Name",
  "Start Date",
  "End Date",
  "Total Students",
  "Students Missing Data",
];

const ListViewEvents = ({ data, events, handleViewData, handlePageNumber }) => {
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const loading = useSelector((state) => state?.teacher?.loading);

  const isPreviousButtonDisabled = data.pageNumber === 1;
  const isNextButtonDisabled = data.pageNumber === totalPages;

  const screenDimensions = UseResize();

  return (
    <TableContainer
      height="auto"
      maxH={`calc(${screenDimensions?.height}px - 7.75rem - 6.5rem)`}
      overflowY="auto"
    >
      <Table>
        <Thead>
          <Tr>
            {tableHeaders.map((item, index) => (
              <Th key={"list-table-header" + index}>{item}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {events?.map((row, index) => (
            <Tr key={"list-table-body" + index}>
              <Td>{index + 1}</Td>
              <Td color="#1890ff" maxWidth={"150px"} overflow="hidden">
                <Tooltip
                  hasArrow
                  label={row?.event_name}
                  bg="primary"
                  color="white"
                  borderRadius={"md"}
                  placement="top-start"
                  textTransform="capitalize"
                >
                  <Box
                    role="button"
                    onClick={() => handleViewData(row)}
                    size="sm"
                    cursor={"pointer"}
                    isTruncated
                    textTransform="capitalize"
                  >
                    {row?.event_name}
                  </Box>
                </Tooltip>
              </Td>

              <Td>{row?.start_date}</Td>
              <Td>{row?.end_date}</Td>
              <Td>{row?.participants || 0}</Td>
              <Td>{row?.incompleted || 0}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default ListViewEvents;
