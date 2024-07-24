import {
  Flex,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import PaginationComponent from "../../../components/PaginationComponent";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getStateByFilterApiCall,
  setStateByFilterData,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { statesPartnersData } from "../Config";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";

const StatesPartnerTable = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const location = useLocation();
  const { tableHeaders } = statesPartnersData;

  const {
    prevFiltersData,
    filters,
    setFilters,
    setSelectedState,
    prevStateName,
  } = props;

  const token = useSelector((state) => state.profile.token);

  const stateByFilterData = useSelector(
    (state) => state?.superAdmin?.stateByFilterData
  );

  const totalPages = useSelector((state) => state.teacher.totalPages);
  const loading = useSelector((state) => state.superAdmin.loading);
  const userId = useSelector((state) => state?.profile?.userId);

  const isPreviousButtonDisabled = filters.skip === 1;
  const isNextButtonDisabled = filters.skip === totalPages;

  const handlePageNumber = (event) => {
    setFilters({
      ...prevFiltersData.current,
      skip: event.selected + 1,
    });
    setSelectedState({ ...prevStateName.current });
    dispatch(
      getStateByFilterApiCall({
        body: { ...prevFiltersData.current, skip: event.selected + 1 },
        token,
      })
    );
  };

  const RedirectToEditPage = (selectedItem) => {
    navigate(
      `/role/superAdmin/StatesPartners/${userId}/edit/${selectedItem?.uuid}`
    );
  };
  useEffect(() => {
    return () => {
      dispatch(setStateByFilterData(null));
    };
  }, []);

  return (
    <>
      <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              {tableHeaders.map((item, key) => (
                <Th key={`abcd${key}`}>{item}</Th>
              ))}
            </Tr>
          </Thead>

          <Tbody>
            {stateByFilterData?.length > 0 ? (
              stateByFilterData?.map((item, key) => (
                <Tr key={`abcd${key}`}>
                  <Td
                    color="#1890ff"
                    cursor="pointer"
                    role="button"
                    onClick={() => RedirectToEditPage(item)}
                  >
                    {item?.state_name}
                  </Td>
                  <Td>{item?.type}</Td>
                  <Td>{item.state_code}</Td>
                  <Td color="#1890ff" display={"flex"} flexDirection={"column"}>
                    {item?.license_name?.length
                      ? item?.license_name?.map((license, index) => (
                          <Td> {license}</Td>
                        ))
                      : "N/A"}
                  </Td>
                  <Td>{item?.license_status ? item?.license_status : "N/A"}</Td>
                </Tr>
              ))
            ) : (
              <></>
            )}
          </Tbody>
        </Table>
      </TableContainer>
      {stateByFilterData && stateByFilterData?.length == 0 && (
        <NoDataFoundText>No Data Found</NoDataFoundText>
      )}

      {stateByFilterData?.length > 0 && totalPages > 1 ? (
        <PaginationComponent
          onPageChange={handlePageNumber}
          pageCount={totalPages}
          forcePage={filters.skip - 1}
          isNextButton={isNextButtonDisabled}
          isPreviousButton={isPreviousButtonDisabled}
        />
      ) : null}
    </>
  );
};

export default StatesPartnerTable;
