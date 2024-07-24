import { DeleteIcon } from "@chakra-ui/icons";
import {
  Center,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  deleteEmailHistoryData,
  getEmailHistory,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const LicenseEmailHistory = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const token = useSelector((state) => state?.profile?.token);
  const loading = useSelector((state) => state?.superAdmin?.loading);
  const emailHistoryData = useSelector(
    (state) => state?.superAdmin?.emailHistoryData
  );
  const deletedEmailHistoryData = useSelector(
    (state) => state?.superAdmin?.deletedEmailHistory
  );
  const emailSent = useSelector((state) => state?.superAdmin?.emailsToContacts);

  const [data, setData] = useState([]);
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedEmailContact, setSelectedEmailContact] = useState("");

  const handleEmailHistoryDelete = (id) => {
    dispatch(setPreviousPath(location.pathname));
    dispatch(
      deleteEmailHistoryData({ id: selectedEmailContact, token: token })
    );
  };

  useEffect(() => {
    dispatch(
      getEmailHistory({ token: token, district_uuid: params?.licenseId })
    );
  }, [emailSent, deletedEmailHistoryData]);

  useEffect(() => {
    setData(emailHistoryData);
  }, [emailHistoryData]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : data?.length ? (
        <TableContainer p="0" h="auto"  maxH="calc(100vh - 12rem)" overflowY={"auto"}>
          <Table >
            <Thead>
              <Tr>
                <Th>
                  <Text textStyle={"theading"}>Date Sent</Text>
                </Th>
                <Th>
                  <Text textStyle={"theading"}>Sent To</Text>
                </Th>
                <Th>
                  <Text textStyle={"theading"}>CC</Text>
                </Th>
                <Th>
                  <Text textStyle={"theading"}>BCC</Text>
                </Th>
                <Th>
                  <Text textStyle={"theading"}>Template</Text>
                </Th>
                <Th>
                  <Text textStyle={"theading"}>Delete</Text>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {data?.length &&
                data?.map((item, index) => (
                  <Tr key={"a" + index}>
                    <Td>
                      <Text textStyle={"p"}>
                        {moment
                          .utc(item?.createdAt)
                          .local()
                          .format("MM-DD-YYYY hh:mm:ss A")}
                      </Text>
                    </Td>
                    <Td>
                      <Text
                        textStyle={"p"}
                        style={{ width: "10rem", overflow: "auto" }}
                        className="example"
                      >
                        {item?.sendTo || "NA"}
                      </Text>
                    </Td>

                    <Td>
                      <Wrap>
                        <WrapItem>
                          <Center>
                            <Text textStyle={"p"} whiteSpace={"wrap"}>
                              {item?.cc || "NA"}
                            </Text>
                          </Center>
                        </WrapItem>
                      </Wrap>
                    </Td>

                    <Td>
                      <Text textStyle={"p"}>{item?.bcc || "NA"}</Text>
                    </Td>
                    <Td>
                      {" "}
                      <Text textStyle={"p"}>{item?.subject || "NA"}</Text>
                    </Td>
                    <Td role="button">
                      <DeleteIcon
                        onClick={
                          () => {
                            setSelectedEmailContact(item.uuid);
                            setDeletePopUp(true);
                          }

                          // handleEmailHistoryDelete(item?.uuid)
                        }
                        color="red"
                        cursor="pointer"
                      />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      ) : (
        <>
          <NoDataFoundText>No Emails are Found for the district</NoDataFoundText>

        
        </>
      )}
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the email history?"}
          onClick={handleEmailHistoryDelete}
        />
      )}{" "}
    </>
  );
};

export default LicenseEmailHistory;
