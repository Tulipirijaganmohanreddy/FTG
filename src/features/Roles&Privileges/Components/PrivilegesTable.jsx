import {
  Center,
  Checkbox,
  Image,
  Spinner,
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
import {
  setUpdateRolesAndPrivilagesCode,
  updateRolesAndPrivilages,
} from "../../../DistrictAdminApis/districtAdminSlice";
import { getUserPrivileges } from "../../../store/slices/profileSlice";
import { rolesPrevilagesData } from "../Config";
import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const PrivilagesTable = (props) => {
  const role = props.role;

  const { tableColumns, superAdminTableColumns } = rolesPrevilagesData;

  const dispatch = useDispatch();
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const updateRolesAndPrivilagesCode = useSelector(
    (state) => state.districtAdmin.updateRolesAndPrivilagesCode
  );
  const token = useSelector((state) => state?.profile?.token);
  const privilage = useSelector(
    (state) => state?.districtAdmin?.rolesAndPrivilagesByRole
  );
  const loading = useSelector((state) => state.profile.loading);
  const [privilageData, setPrivilageData] = useState([]);
  const userRole = useSelector((state) => state?.profile?.userRole);

  const handleChangeCheckBox = (item, e) => {
    let modifiedPrevilageData = privilageData.slice();

    let itemIndex = modifiedPrevilageData.findIndex(
      (data) => data.uuid === item.uuid
    );
    modifiedPrevilageData.splice(itemIndex, 1, {
      ...item,
      [e.target.name]: e.target.checked,
    });

    setPrivilageData(modifiedPrevilageData);

    const arr = ["is_add", "is_delete", "view", "enter_data", "edit"].filter(
      (item) => item !== e.target.name
    );

    let body = {
      role: item.role,
      privilegeName: item.privilege,
      [e.target.name]: e.target.checked,
    };

    arr.forEach((previlege) => (body[previlege] = item[previlege]));

    dispatch(updateRolesAndPrivilages({ token, body }));
  };

  useEffect(() => {
    if (updateRolesAndPrivilagesCode === 200) {
      dispatch(getUserPrivileges({ token }));
      dispatch(setUpdateRolesAndPrivilagesCode(null));
    }
  }, [updateRolesAndPrivilagesCode]);
  useEffect(() => {
    setPrivilageData(privilage);
  }, [privilage, dispatch]);

  return (
    <>
      {loading ? (
        <Center h="50vh">
          <Image src={loading_img} />
        </Center>
      ) : (
        <TableContainer height="auto" maxH="calc(100vh - 12rem)" overflowY="auto">
          <Table>
            {role === "admin" || role === "helpDesk" ? (
              <Thead>
                <Tr>
                  {superAdminTableColumns.map((columnName, index) => {
                    return <Th>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>
            ) : (
              <Thead>
                <Tr>
                  {tableColumns.map((columnName, index) => {
                    return <Th>{columnName}</Th>;
                  })}
                </Tr>
              </Thead>
            )}

            <Tbody>
              {privilageData?.length &&
                privilageData.map((row, index) => {
                  return (
                    <Tr key={index}>
                      <Td>{row.privilege}</Td>
                      <Td>
                        <Checkbox
                          name="view"
                          isChecked={row.view}
                          isDisabled={
                            !(
                              rolesAndPrevilegesObject?.["Roles & Privileges"]
                                ?.edit ?? true
                            ) || !row.is_view_editable
                          }
                          onChange={(e) => {
                            handleChangeCheckBox(row, e);
                          }}
                        />
                      </Td>
                      <Td>
                        <Checkbox
                          name="edit"
                          isChecked={row.edit}
                          isDisabled={
                            !(
                              rolesAndPrevilegesObject?.["Roles & Privileges"]
                                ?.edit ?? true
                            ) || !row.is_edit_editable
                          }
                          onChange={(e) => {
                            handleChangeCheckBox(row, e);
                          }}
                        />
                      </Td>
                      <Td>
                        <Checkbox
                          name="is_add"
                          isChecked={row.is_add}
                          isDisabled={
                            !(
                              rolesAndPrevilegesObject?.["Roles & Privileges"]
                                ?.edit ?? true
                            ) || !row.is_add_editable
                          }
                          onChange={(e) => {
                            handleChangeCheckBox(row, e);
                          }}
                        />
                      </Td>
                      <Td>
                        <Checkbox
                          name="is_delete"
                          isChecked={row.is_delete}
                          isDisabled={
                            !(
                              rolesAndPrevilegesObject?.["Roles & Privileges"]
                                ?.edit ?? true
                            ) || !row.is_delete_editable
                          }
                          // colorScheme={row.is_delete_editable && "green"}
                          onChange={(e) => {
                            handleChangeCheckBox(row, e);
                          }}
                        />
                      </Td>
                      {/* <Td
                    fontFamily={'body'}
                    fontSize={{ base: 'sm', md: 'sm', lg: 'sm' }}
                  >
                    <Checkbox
                      name='enter_data'
                      isChecked={row.enter_data}
                      isDisabled={!rolesAndPrevilegesObject["Roles & Privileges"]?.edit || !row.is_enter_data_editable}
                      onChange={(e) => {
                        handleChangeCheckBox(row, e);
                      }}
                    />
                  </Td> */}
                      {/* {role === "admin" || role === "helpDesk" ? (
                        <Td>
                          <Checkbox
                            name="is_active"
                            isChecked={row.is_active}
                            isDisabled={!row.is_active}
                            onChange={(e) => {
                              handleChangeCheckBox(row, e);
                            }}
                          />
                        </Td>
                      ) : (
                        ""
                      )} */}
                    </Tr>
                  );
                })}
            </Tbody>
          </Table>

          {privilageData?.length === 0 && (
            <NoDataFoundText>"No Privileges Found"</NoDataFoundText>
          )}
        </TableContainer>
      )}
    </>
  );
};

export default PrivilagesTable;
