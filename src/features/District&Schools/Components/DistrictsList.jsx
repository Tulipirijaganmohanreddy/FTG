import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import TableSkeleton from "../../../components/GlobalComponents/TableSkeleton";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  getDistrictsByFilter,
  setDistrcitIDForDistrict,
  setDistrictAdminById,
  setDistrictState,
  setDistrictZipCode,
  setDistrictsByFilter,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { districtListData } from "../Config";

const DistrictsList = (props) => {
  const {
    setFormData,
    formData,
    prevFormData,
    prevDistrict,
    setSelectedDistrict,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { districtTableHeaders, title } = districtListData;

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const loading = useSelector((state) => state?.superAdmin?.loading);
  const token = useSelector((state) => state.profile.token);
  const totalPages = useSelector((state) => state.teacher.totalPages);

  const allDistricts = useSelector(
    (state) => state?.superAdmin?.getDistrictDataByFilter
  );

  const isPreviousButtonDisabled = formData.skip === 1;
  const isNextButtonDisabled = formData.skip === totalPages;
  const handlePageNumber = (event) => {
    setFormData({
      ...prevFormData.current,

      skip: event.selected + 1,
    });
    setSelectedDistrict({ ...prevDistrict.current });
    dispatch(
      getDistrictsByFilter({
        formData: { ...prevFormData.current, skip: event.selected + 1 },
        token: token,
      })
    );
  };
  const RedirectToDistrict = (districtData) => {
    dispatch(setDistrcitIDForDistrict(districtData));
    dispatch(setDistrictState(districtData?.state));
    dispatch(setDistrictZipCode(districtData?.zipcode));
    navigate(
      `/role/${selectedRole}/Districts/DistrictDetails/${districtData.uuid}`
    );
  };

  useEffect(() => {
    dispatch(setDistrictAdminById({}));
    dispatch(setTotalPages(""));
    return () => {
      dispatch(setDistrictsByFilter(null));
    };
  }, []);

  const handleLicenseName = (name) => {
    if (name) {
      const regex = /(\d{4}-\d{2}-\d{2})\s+to\s+(\d{4}-\d{2}-\d{2})/g;
      const result = name.replace(regex, (match, startDate, endDate) => {
        const formattedStartDate = moment(startDate).format("MM-DD-YYYY");
        const formattedEndDate = moment(endDate).format("MM-DD-YYYY");
        return `${formattedStartDate} to ${formattedEndDate}`;
      });

      return result;
    }

    return "-NA-";
  };

  return (
    <>
      <Heading2>{title}</Heading2>
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
                {districtTableHeaders.map((item, index) => (
                  <Th key={"a" + index}>{item}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {allDistricts?.length > 0 &&
                allDistricts?.map((item, index) => (
                  <Tr key={"b" + index}>
                    {selectedRole === "superAdmin" ||
                    selectedRole === "stateAdmin" ? (
                      <Td color="#1890ff">
                        <Box
                          role="button"
                          onClick={() => {
                            RedirectToDistrict(item);
                          }}
                          size="sm"
                          cursor={"pointer"}
                        >
                          {item.district_name}
                        </Box>
                      </Td>
                    ) : (
                      <Td color="#1890ff">
                        <Box>
                          {sort((item) =>
                            item.localeCompare(item.district_name)
                          )}
                        </Box>
                      </Td>
                    )}

                    <Td>
                      <Box>{item.city || "NA"}</Box>
                    </Td>
                    <Td>
                      <Box>{item.state || "NA"}</Box>
                    </Td>
                    <Td>
                      <Box>{item.zipcode || "NA"}</Box>
                    </Td>
                    {selectedRole === "superAdmin" ||
                    selectedRole === "stateAdmin" ? (
                      <Td
                      // color='red'
                      >
                        <Box>
                          {item.licenses && item.licenses === ""
                            ? "NA"
                            : handleLicenseName(item?.license_name)}
                        </Box>
                      </Td>
                    ) : (
                      <Td color="red.700">
                        <Box>{handleLicenseName(item?.license_name)}</Box>
                      </Td>
                    )}

                    <Td>
                      <Box>{item.district_sso_id || "N/A"}</Box>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>

          {allDistricts?.length === 0 && (
            <NoDataFoundText>No Data Found</NoDataFoundText>
          )}
        </TableContainer>
      )}
      {allDistricts?.length > 0 && (
        <PaginationComponent
          onPageChange={handlePageNumber}
          pageCount={totalPages}
          forcePage={formData.skip - 1}
          isNextButton={isNextButtonDisabled}
          isPreviousButton={isPreviousButtonDisabled}
        />
      )}
    </>
  );
};

export default DistrictsList;
