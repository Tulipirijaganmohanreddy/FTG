import {
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import { getSSOConfigByFilterApiCall } from "../../../store/slices/superAdminSlice/superAdminSlice";

import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import PaginationComponent from "../../../components/PaginationComponent";
import { ssoConfigData } from "../Config";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";

const SSOConfigTable = (props) => {
  const { setFilters, filters } = props;

  const { tableHeaders } = ssoConfigData;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const [tableData, setTableData] = useState([{}]);
  const token = useSelector((state) => state?.profile?.token);

  const userId = useSelector((state) => state?.profile?.userId);

  const totalPages = useSelector((state) => state.teacher.totalPages);
  const loading = useSelector((state) => state.superAdmin.loading);

  const isPreviousButtonDisabled = filters.skip === 1;
  const isNextButtonDisabled = filters.skip === totalPages;

  const getAllSSOConfigResults = useSelector(
    (state) => state.superAdmin?.getSSOConfigData
  );

  const ssoConfigByFilterData = useSelector(
    (state) => state?.superAdmin?.ssoConfigByFilterData
  );

  const handlePageNumber = (event) => {
    setFilters((prevState) => ({ ...prevState, skip: event.selected + 1 }));
    dispatch(
      getSSOConfigByFilterApiCall({
        body: { ...filters, skip: event.selected + 1 },
        token,
      })
    );
  };

  const RedirectToEditSSOConfig = (ConfigData) => {
    dispatch(setPreviousPath(location.pathname));
    navigate(`/role/superAdmin/SSOConfig/${userId}/edit/${ConfigData?.uuid}`);
  };

  return (
    <>
      <>
        <TableContainer height="auto" maxH="calc(100vh - 9rem)"  overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                {tableHeaders?.map((item, index) => (
                  <Th key={"a" + index}>{item}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {ssoConfigByFilterData?.length > 0 ? (
                ssoConfigByFilterData?.map((item, key) => (
                  <Tr key={"a" + key}>
                    <Td
                      color={"primary"}
                      cursor="pointer"
                      role="button"
                      onClick={() => RedirectToEditSSOConfig(item)}
                    >
                      {" "}
                      {item?.configuration_name || "NA"}
                    </Td>

                    <Td>{item?.districts?.[0]?.district_name || "NA"}</Td>
                    <Td>{item?.authorization_protocol || "NA"}</Td>
                  </Tr>
                ))
              ) : (
                <></>
              )}
            </Tbody>
          </Table>
        </TableContainer>
        {ssoConfigByFilterData && ssoConfigByFilterData?.length == 0 && (
          <NoDataFoundText>No Data Found</NoDataFoundText>
        )}

        {ssoConfigByFilterData?.length > 0 && totalPages > 1 ? (
          <PaginationComponent
            onPageChange={handlePageNumber}
            pageCount={totalPages}
            forcePage={filters.skip - 1}
            isNextButton={isNextButtonDisabled}
            isPreviousButton={isPreviousButtonDisabled}
          />
        ) : null}
      </>
    </>
  );
};

export default SSOConfigTable;
