import {
  Button,
  Checkbox,
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
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import PaginationComponent from "../../../components/PaginationComponent";
import {
  setManageUser,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getAllHelpDeskUsers,
  getSuperAdmins,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { ManageUsersData } from "../Config";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const SuperAdminTable = (props) => {
  const { formData, setFormData } = props;

  const { USERS_OBJ, adminTableHeaders, helpDeskHeaders } = ManageUsersData;

  const tableHeadersCheckingObj = {
    admin: adminTableHeaders,
    helpdesk: helpDeskHeaders,
  };

  const dispatch = useDispatch();

  const token = useSelector((state) => state?.profile?.token);

  const getSuperAdminData = useSelector(
    (state) => state?.superAdmin?.superAdmins
  );
  const manageUser = useSelector((state) => state?.profile?.manageUser);

  const loading = useSelector((state) => state?.superAdmin?.loading);

  const navigate = useNavigate();

  const userRole = useSelector((state) => state.profile.selectedRole);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const [data, setData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState(adminTableHeaders);

  const [userIds, setUserIds] = useState([]);
  const [isAllChecked, setIsAllChecked] = useState(false);

  const isPreviousButtonDisabled = formData?.skip === 1;
  const isNextButtonDisabled = formData?.skip === totalPages;

  const handlePageNumber = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      skip: event.selected + 1,
    }));
  };

  useEffect(() => {
    setData(getSuperAdminData);
  }, [getSuperAdminData]);

  const RedirectToEditAdminUser = (adminInfo) => {
    dispatch(
      setManageUser({
        formTitle: `Edit ${USERS_OBJ[manageUser?.userType]}`,
        userType: manageUser?.userType,
      })
    );
    dispatch(setPreviousPath(location.pathname));

    navigate(`/role/${userRole}/edit/admin/${adminInfo?.uuid}`);
  };

  const [deleteData, setDeleteData] = useState({
    uuid: "",
    action: "",
  });

  const handleUserIds = (e, userId) => {
    if (e.target.checked) {
      setUserIds((prevState) => {
        getSuperAdminData.length === [...prevState, userId].length
          ? setIsAllChecked(true)
          : setIsAllChecked(false);
        return [...prevState, userId];
      });

      let userData = getSuperAdminData.filter(
        (userData) => userData?.uuid === userId
      );
    } else {
      let dummyUserIds = userIds.slice();

      let userIdIndex = dummyUserIds.findIndex((id) => id === userId);
      dummyUserIds.splice(userIdIndex, 1);
      setUserIds([...dummyUserIds]);

      getSuperAdminData.length === dummyUserIds.length
        ? setIsAllChecked(true)
        : setIsAllChecked(false);
    }
  };

  const handleCheckAll = (e) => {
    if (e.target.checked) {
      setIsAllChecked(true);
      let arr = getSuperAdminData.map((user) => user.uuid);
      setUserIds(arr);
    } else {
      setIsAllChecked(false);
      setUserIds([]);
    }
  };

  useEffect(() => {
    formData?.user_type === "helpdesk"
      ? dispatch(
          getSuperAdmins({
            token: token,
            finalBody: { ...formData, user_type: "helpDesk" },
          })
        )
      : dispatch(getSuperAdmins({ token: token, finalBody: formData }));

    setTableHeaders(tableHeadersCheckingObj?.[formData?.user_type]);
  }, [formData]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
            <Table variant="stripped" color="">
              <Thead>
                <Tr>
                  {tableHeaders?.map((item, index) => (
                    <Th key={"abc" + index}>
                      {index == 0 ? (
                        <Flex gap={5}>
                          <Checkbox
                            isChecked={isAllChecked}
                            onChange={handleCheckAll}
                          />
                          <Text>{tableHeaders[0]}</Text>
                        </Flex>
                      ) : (
                        <Text>{item}</Text>
                      )}
                    </Th>
                  ))}
                </Tr>
              </Thead>

              <Tbody>
                {data?.map((item, key) => (
                  <Tr key={`super${key}`}>
                    <Td color="#1890ff">
                      <Flex gap={"5"}>
                        <Checkbox
                          isChecked={userIds.includes(item?.uuid)}
                          onChange={(e) => [handleUserIds(e, item.uuid)]}
                        />

                        <Text
                          role="button"
                          onClick={() => RedirectToEditAdminUser(item)}
                        >
                          {item.user_name}
                        </Text>
                      </Flex>
                    </Td>
                    <Td>{item?.user_id || "-NA-"}</Td>
                    <Td>{item.login_status == "1" ? "Active" : "Inactive"}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
            {data?.length === 0 && (
              <NoDataFoundText>No Data Found</NoDataFoundText>
            )}
          </TableContainer>

          {totalPages > 1 ? (
            <PaginationComponent
              onPageChange={handlePageNumber}
              pageCount={totalPages}
              forcePage={formData?.skip - 1}
              isNextButton={isNextButtonDisabled}
              isPreviousButton={isPreviousButtonDisabled}
            />
          ) : null}
        </>
      )}
    </>
  );
};

export default SuperAdminTable;
