import {
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import React, { useEffect } from "react";

import { adminLicenseData } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStateOrPartnerLicencesList } from "../../../store/slices/superAdminSlice/superAdminSlice";
import moment from "moment";
const LicensesList = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();

  const params = useParams();
  const { licenseTableHeaders } = adminLicenseData;
  const token = useSelector((state) => state.profile.token);

  const licencelist = useSelector(
    (state) => state.superAdmin?.stateOrPartnerLicencesList
  );

  useEffect(() => {
    if (activeTab == 2) {
      dispatch(
        getStateOrPartnerLicencesList({
          token,
          stateId: params?.selectedItemId,
        })
      );
    }
  }, [activeTab]);

  return (
    <>
      <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              {licenseTableHeaders?.map((item, key) => (
                <Th key={"ab" + key}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          {licencelist?.map((item, key) => {
            return (
              <Tbody key={"ab" + key}>
                <Td color={"primary"} cursor="pointer">
                  {item?.sub_license
                    ? `${item?.funder_name} - ${item?.license_name}`
                    : item.funder_name}{" "}
                </Td>
                <Td textTransform={"capitalize"}>
                  {item.funder_type || "NA"}{" "}
                </Td>
                <Td>{moment(item?.start_date).format("MM-DD-YYYY")}</Td>
                <Td>{moment(item?.end_date).format("MM-DD-YYYY")}</Td>
                <Td>{`${item?.assigned === null ? "0" : item?.assigned}/${
                  item?.school_limit
                }`}</Td>
                <Td>{item.status || "NA"}</Td>
              </Tbody>
            );
          })}
        </Table>
      </TableContainer>
    </>
  );
};

export default LicensesList;
