import { Box, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const GlobalTable = ({ data }) => {
  return (
    <Box overflowX="auto">
      <Table variant="simple">
        <Thead>
          {data.map((row) => (
            <Tr key={row.id}>
              <Th>{row.name}</Th>
              <Th>{row.email}</Th>
              <Th>{row.role}</Th>
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr key={row.id}>
              <Td>{row.name}</Td>
              <Td>{row.email}</Td>
              <Td>{row.role}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default GlobalTable;
