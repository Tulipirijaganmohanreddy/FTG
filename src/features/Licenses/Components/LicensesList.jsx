import {
  Checkbox,
  Flex,
  HStack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import TableSkeleton from "../../../components/GlobalComponents/TableSkeleton";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getLicenseList,
  setDistrcitIDForDistrict,
  setDistrictState,
  setDistrictZipCode,
  setFunderId,
  setFunderLicenseStatus,
  setFunderName,
  setLicenseId,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import { licenseFields } from "../Config";

const LicensesList = (props) => {
  const {
    usersList,
    userIds,
    setUserIds,
    setIsAllChecked,
    isAllChecked,
    filters,
    setFilters,
    setSelectedFunderName,
    prevFiltersData,
    prevFunder,
  } = props;
  const { tableHeaders } = licenseFields;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkbox = useRef();

  const token = useSelector((state) => state?.profile?.token);
  const licensesList = useSelector((state) => state?.superAdmin?.licensesList);
  const loading = useSelector((state) => state?.superAdmin?.loading);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const [data, setData] = useState([]);
  const [licensesUUID, setLicensesUUID] = useState([]);

  const isPreviousButtonDisabled = filters.skip === 1;
  const isNextButtonDisabled = filters.skip === totalPages;

  const handleLicenseUpdate = (licenseData) => {
    dispatch(setLicenseId(licenseData?.uuid));

    if (licenseData?.funder_type === "district") {
      dispatch(setFunderId(licenseData?.district?.uuid));
      dispatch(setFunderName(licenseData?.district?.district_name));
      dispatch(setDistrcitIDForDistrict(licenseData?.district));
      dispatch(setDistrictState(licenseData?.district?.state));
      dispatch(setDistrictZipCode(licenseData?.district?.zipcode));
    } else if (
      licenseData?.funder_type === "state" ||
      licenseData?.funder_type === "partner"
    ) {
      dispatch(setFunderId(licenseData?.state?.uuid));
      dispatch(setFunderName(licenseData?.state?.state_name));
    }
    dispatch(setFunderLicenseStatus(licenseData?.status));

    navigate(
      `/role/${selectedRole}/License/${licenseData?.uuid}/${licenseData?.funder_uuid}`
    );
    // dispatch(setPreviousPath(location.pathname));
    dispatch(setFunderId(licenseData?.funder_name));
  };

  const handlePageNumber = (event) => {
    setFilters({ ...prevFiltersData.current, skip: event.selected + 1 });
    setSelectedFunderName({ ...prevFunder.current });

    dispatch(
      getLicenseList({
        body: { ...prevFiltersData.current, skip: event.selected + 1 },
        token: token,
      })
    );
  };

  const handleUserIds = (e, userId) => {
    getLicenseId(userId);
    if (e.target.checked) {
      setUserIds((prevState) => {
        licensesList.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);
        return [...prevState, userId];
      });
    } else {
      let dummyUserIds = userIds.slice();

      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);
      licensesList.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = licensesList.map((user) => user.uuid);
      setUserIds(arr);
    } else {
      setIsAllChecked(false);
      setUserIds([]);
    }
  };

  const getLicenseId = (uuidList) => {
    if (uuidList === "") {
      setLicensesUUID([]);
    } else {
      if (checkbox.current.checked) {
        setLicensesUUID((licensesUUID) => [...licensesUUID, uuidList]);
      } else {
        setLicensesUUID((current) =>
          current.filter((uuid) => uuid !== uuidList)
        );
      }
    }
  };

  useEffect(() => {
    setData(licensesList);
  }, [licensesList]);

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableContainer
          height="auto"
          maxH="calc(100vh - 12rem)"
          overflowY="auto"
        >
          <Table>
            <Thead>
              <Tr>
                {tableHeaders.map((item, key) =>
                  key === 0 ? (
                    <Th key={`${key}hell`}>
                      <Flex gap="3" alignItems="center">
                        <Checkbox
                          isChecked={isAllChecked}
                          onChange={handleCheckAll}
                        />

                        {item}
                      </Flex>
                    </Th>
                  ) : (
                    <Th key={`${key}hell`}>{item}</Th>
                  )
                )}
              </Tr>
            </Thead>

            <Tbody>
              {data?.length > 0 &&
                data?.map((item, index) => (
                  <Tr key={item.uuid}>
                    <Td>
                      <HStack gap="3" mt="3" mb="2">
                        <Checkbox
                          isChecked={userIds.includes(item?.uuid)}
                          onChange={(e) => [handleUserIds(e, item.uuid)]}
                          ref={checkbox}
                        ></Checkbox>

                        <Text
                          color={"primary"}
                          cursor="pointer"
                          role="button"
                          onClick={() => handleLicenseUpdate(item)}
                        >
                          {item?.sub_license
                            ? `${item?.funder_name} - ${item?.license_name}`
                            : item.funder_name}
                        </Text>
                      </HStack>
                    </Td>
                    <Td>{item?.funder_type || "NA"}</Td>
                    <Td>{item?.status || "N/A"}</Td>
                    <Td>{item?.state || "N/A"}</Td>
                    <Td>{`${item?.assigned === null ? "0" : item?.assigned}/${
                      item?.school_limit
                    }`}</Td>
                    <Td>{moment(item?.start_date).format("MM-DD-YYYY")}</Td>
                    <Td>{moment(item?.end_date).format("MM-DD-YYYY")}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {!data?.length ? (
        <NoDataFoundText>No Licences Are Found</NoDataFoundText>
      ) : null}

      <PaginationComponent
        onPageChange={handlePageNumber}
        pageCount={totalPages}
        forcePage={filters.skip - 1}
        isNextButton={isNextButtonDisabled}
        isPreviousButton={isPreviousButtonDisabled}
      />
    </>
  );
};

export default LicensesList;
