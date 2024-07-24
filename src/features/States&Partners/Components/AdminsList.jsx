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
import React, { useEffect } from "react";

import { adminLicenseData } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getStateAdminsList } from "../../../store/slices/superAdminSlice/superAdminSlice";
import Paragraph2 from "../../../components/FitnessComponents/FitnessTexts/Paragraph2";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";

const AdminsList = (props) => {
  const { activeTab } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();
  const { adminTableHeaders } = adminLicenseData;

  const token = useSelector((state) => state.profile.token);
  const stateAdminsList = useSelector(
    (state) => state.superAdmin?.stateAdminsList
  );
  const clickOnUser = (id) => {
    dispatch(setPreviousPath(location.pathname));
    stateAdminsList?.type !== "partner"
      ? dispatch(
          setManageUser({
            formTitle: `Edit State Administrator`,
            userType: "stateAdmin",
          })
        )
      : dispatch(
          setManageUser({
            formTitle: `Edit Partner`,
            userType: "partner",
          })
        );
    stateAdminsList?.type !== "partner"
      ? navigate(`/role/superAdmin/edit/stateAdmin/${id}`, {
          state: {
            // state_uuid: params?.selectedItemId,
            state_code: stateAdminsList?.state_code,
          },
        })
      : navigate(`/role/superAdmin/edit/partner/${id}`, {
          state: {
            // state_uuid: params?.selectedItemId,
            state_code: stateAdminsList?.state_code,
          },
        });
  };
  useEffect(() => {
    activeTab == 1 &&
      dispatch(getStateAdminsList({ token, stateId: params?.selectedItemId }));
  }, [activeTab]);

  return (
    <>
      <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
        <Table>
          <Thead>
            <Tr>
              {adminTableHeaders?.map((item, key) => (
                <Th key={"a" + key}>{item}</Th>
              ))}
            </Tr>
          </Thead>
          {stateAdminsList?.AdminState?.length &&
            stateAdminsList?.AdminState?.map((item, key) => {
              return (
                <Tbody>
                  <Tr key={"ab" + key}>
                  <Td 
                    cursor="pointer"
                    onClick={() => {
                      clickOnUser(item.uuid);
                    }}
                    
                    role="button"
                    textStyle='paragraph2IncreaseText'
                    color={'primary'}
                    mb="0.5"
                  
                  >
                        {`${item.last_name}, ${item.first_name}`}

                  
                   
                  </Td>
                  <Td>{item.user_id || "NA"}</Td>
                  <Td>{item.email || "NA"}</Td>
                  <Td>{item.phone || "NA"}</Td>
                  <Td>
                    {item.login_status == "1" ? "Active" : "Inactive" || "NA"}
                  </Td>
                  </Tr>
              
                </Tbody>
              );
            })}
        </Table>
      </TableContainer>
    </>
  );
};

export default AdminsList;
