import {
  Box,
  Button,
  Center,
  Flex,
  Image,
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
import loadingImg from "../../../assets/Images/FitnessGramEventImages/loading.gif";

import { FiEdit } from "react-icons/fi";

import { RiDeleteBinLine } from "react-icons/ri";
import {
  deleteAnnoucement,
  setEditAnnouncementFormData,
} from "../../../DistrictAdminApis/districtAdminSlice";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import PaginationComponent from "../../../components/PaginationComponent";

// import { getManageAnnouncementData } from "../teacherSlice";

const ManageNotificationsTable = (props) => {
  const { setPageNumber, pageNumber } = props;

  const loading = useSelector((state) => state?.schoolAdmin?.loading);
  const role = useSelector((state) => state.profile.selectedRole);
  const token = useSelector((state) => state?.profile?.token);
  const totalPages = useSelector((state) => state?.teacher?.totalPages);
  const message = useSelector((state) => state.profile.message);
  const dispatch = useDispatch();
  // const manageAnnouncementData = useSelector((state) => state?.teacher?.manageAnnouncementData?.data?.response?.data);
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const manageAnnouncementData = useSelector(
    (state) => state?.schoolAdmin?.ManageAnnouncementData
  );

  const [manageNotification, setManageNotification] = useState();
  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(false);

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
    // dispatch(setCurrentPageNumber(event.selected+1))
  };

  const tableHeader = [
    "Notification Title",
    "Start Date",
    "End Date",
    "Audience",
    "Status",
    "Edit",
    "Delete",
  ];

  const handleEdit = (selectedItem) => {
    (rolesAndPrevilegesObject?.["Notification System Administration"]?.edit ??
      true) &&
      dispatch(setEditAnnouncementFormData(selectedItem));
  };

  const handleDelete = (selectedItem) => {
    dispatch(deleteAnnoucement({ uuid: selectedAnnouncement?.uuid, token }));
  };

  useEffect(() => {
    setManageNotification(manageAnnouncementData);
  }, [manageAnnouncementData]);

  return (
    <>
      {loading ? (
        <Center justify="center">
          <Image src={loadingImg} />
        </Center>
      ) : (
        <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                {tableHeader.map((item,index) => (
                  <Th key={'abc'+index}>{item}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {manageNotification?.length > 0 &&
                manageNotification?.map((item, key) => (
                  <Tr wordBreak="break-word" key={"ab" + key}>
                    <Td>{item.announcement_title}</Td>
                    <Td>
                      {moment(item?.start_date).format(
                        navigator.language === "en-GB"
                          ? "DD-MM-YYYY"
                          : "MM-DD-YYYY"
                      )}
                    </Td>
                    <Td>
                      {moment(item?.end_date).format(
                        navigator.language === "en-GB"
                          ? "DD-MM-YYYY"
                          : "MM-DD-YYYY"
                      )}
                    </Td>
                    <Td>{item.audience}</Td>
                    <Td style={{ color: "#0081c8" }}>{item.status}</Td>
                    <Td
                      style={{
                        color: "#0081c8",
                      }}
                    >
                      <Button
                        size="xs"
                        isDisabled={
                          rolesAndPrevilegesObject?.[
                            "Notification System Administration"
                          ]?.edit ?? true
                            ? false
                            : true
                        }
                      >
                        <FiEdit
                          size="20"
                          // cursor="pointer"
                          onClick={() => handleEdit(item)}
                        />
                      </Button>
                    </Td>
                    <Td
                      style={{
                        color: "#ff3f3f",
                      }}
                    >
                      <Button
                        size="xs"
                        isDisabled={
                          rolesAndPrevilegesObject?.[
                            "Notification System Administration"
                          ]?.is_delete ?? true
                            ? false
                            : true
                        }
                      >
                        {" "}
                        <RiDeleteBinLine
                          size="20"
                          cursor="pointer"
                          onClick={
                            () => {
                              if (
                                rolesAndPrevilegesObject?.[
                                  "Notification System Administration"
                                ]?.is_delete ??
                                true
                              ) {
                                setSelectedAnnouncement(item);
                                setDeletePopUp(true);
                              }
                            }
                            // handleDelete(item)
                          }
                        />{" "}
                      </Button>
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          {deletePopUp && (
            <DeletePopUp
              setDeletePopUp={setDeletePopUp}
              deletePopUp={deletePopUp}
              text={"Are you sure you want to delete the announcement?"}
              onClick={handleDelete}
            />
          )}{" "}
          {manageAnnouncementData?.length === 0 && (
            <NoDataFoundText>No Data Found</NoDataFoundText>
          )}
        </TableContainer>
      )}
      <Box mt='2'>
        <PaginationComponent
          onPageChange={handlePageNumber}
          pageCount={totalPages}
          forcePage={pageNumber - 1}
          isNextButton={isNextButtonDisabled}
          isPreviousButton={isPreviousButtonDisabled}
        />
      </Box>
    </>
  );
};

export default ManageNotificationsTable;
