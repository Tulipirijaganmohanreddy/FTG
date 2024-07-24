import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import parse from "html-react-parser";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import DeletePopUp from "../../../components/GlobalComponents/DeletePopUp";
import TableSkeleton from "../../../components/GlobalComponents/TableSkeleton";
import {
  getViewResource,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  getDeletedCMSContentById,
  setCurrentCMSContent,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import linkIcon from "../../../assets/Images/SuperAdminContentImages/linkIcon.svg";

import previewIcon from "../../../assets/Images/SuperAdminContentImages/previewIcon.svg";
import PaginationComponent from "../../../components/PaginationComponent";
import { CMSData } from "../Config";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";

const CMSTable = (props) => {
  const { filters, setFilters } = props;
  const { tableHeaders } = CMSData;

  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch();
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const loading = useSelector((state) => state.superAdmin.loading);
  const userRole = useSelector((state) => state?.profile?.selectedRole);
  const token = useSelector((state) => state?.profile?.token);
  const resources = useSelector(
    (state) => state?.superAdmin?.CMSResourcesFilterData
  );

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const [deletePopUp, setDeletePopUp] = useState(false);
  const [selectedresource, setSelectedResource] = useState();

  const [linkStatesData, setLinksStateData] = useState({
    linkURL: "",
    showLinkCondition: false,
    isLinkClicked: false,
    clickedLinkURLUUID: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [emailPreviewData, setEmailPreviewData] = useState({
    title: "",
    description: "",
  });

  const handlePageNumber = (event) => {
    setFilters((prevState) => ({
      ...prevState,
      skip: event.selected + 1,
    }));
  };
  const isPreviousButtonDisabled = filters.skip === 1;
  const isNextButtonDisabled = filters.skip === totalPages;

  const RedirectToEditContent = (contentData) => {
    dispatch(setCurrentCMSContent(contentData));
    navigate(`/role/${userRole}/CMS/CMSContent`);
    dispatch(setPreviousPath(location.pathname));
  };
  const handleDelete = (id) => {
    dispatch(
      getDeletedCMSContentById({ id: selectedresource?.uuid, token: token })
    );
  };
  const handleDocumentView = (url) => {
    // window.open(url, "_blank");
    const filePath = encodeURIComponent(url?.split(".com/")[1]);

    dispatch(
      getViewResource({ token, filePath, isDownload: "false", module: "cms" })
    );
  };
  const handleUrlDocumentView = (url) => {
    window.open(url, "_blank");
  };
  const handleLinkView = (url, id) => {
    const hostname = window.location.origin;
    const filePath = `${hostname}/files?filePath=${encodeURIComponent(
      url?.split(".com/")[1]
    )}&isDownload=false`;
    setLinksStateData({
      ...linkStatesData,
      linkURL: url,
      showLinkCondition: true,
      clickedLinkURLUUID: id,
      isLinkClicked: true,
    });
    navigator.clipboard.writeText(filePath);
  };

  const handleUrlLinkView = (url, id) => {
    setLinksStateData({
      ...linkStatesData,
      linkURL: url,
      showLinkCondition: true,
      clickedLinkURLUUID: id,
      isLinkClicked: true,
    });
    navigator.clipboard.writeText(url);
  };

  const handleLinkCondition = (contentUUID) => {
    if (
      contentUUID === linkStatesData?.clickedLinkURLUUID &&
      linkStatesData.isLinkClicked
    ) {
      toast({
        position: "bottom",
        duration: 1000,
        render: () => (
          <Box color="white" p={3} bg="blue.500">
            Link Copied!
          </Box>
        ),
      });
    }
    setTimeout(() => {
      setLinksStateData({ ...linkStatesData, isLinkClicked: false });
    }, 1000);
  };

  const handleEmailTemplatePreviewOpen = (title, description) => {
    onOpen();
    setEmailPreviewData({
      ...emailPreviewData,
      title: title,
      description: description,
    });
    setOpenModal(true);
  };

  return (
    <>
      {loading ? (
        <TableSkeleton />
      ) : (
        <TableContainer height="auto" maxH="calc(100vh - 12rem)"  overflowY="auto">
          <Table>
            <Thead>
              <Tr>
                {tableHeaders.map((item, index) => (
                  <Th key={"abc" + index}> {item}</Th>
                ))}
              </Tr>
            </Thead>

            <Tbody>
              {resources?.length > 0 &&
                resources?.map((item, key) => {
                  return (
                    <>
                      <Tr key={"ab" + key}>
                        <Td color="#1890ff">
                          <>
                            <Text
                              role="button"
                              cursor="pointer"
                              onClick={() => RedirectToEditContent(item)}
                            >
                              {item?.title}
                            </Text>
                          </>
                        </Td>
                        <Td>{item?.category}</Td>
                        <Td>{item?.status}</Td>

                        <Td>
                          {item.category === "Smart Coach Resources" ? (
                            <Image
                              role="button"
                              src={previewIcon}
                              onClick={() =>
                                item?.file_url
                                  ? handleDocumentView(item?.file_url)
                                  : handleUrlDocumentView(item?.url)
                              }
                              w="5"
                              h="5"
                              cursor="pointer"
                            />
                          ) : (
                            <>
                              <Image
                                role="button"
                                src={previewIcon}
                                onClick={() =>
                                  handleEmailTemplatePreviewOpen(
                                    `${item?.title}`,
                                    `${item?.html_content}`
                                  )
                                }
                                w="5"
                                h="5"
                                cursor="pointer"
                              />
                            </>
                          )}
                        </Td>

                        <Td>
                          {item.category === "Email Templates" ? (
                            <Text>-NA-</Text>
                          ) : (
                            <>
                              <Image
                                role="button"
                                cursor="pointer"
                                src={linkIcon}
                                w="5"
                                h="5"
                                onClick={() => {
                                  item?.file_url
                                    ? handleLinkView(item?.file_url, item?.uuid)
                                    : handleUrlLinkView(item?.url, item?.uuid);
                                }}
                              />

                              {linkStatesData.isLinkClicked &&
                                handleLinkCondition(item.uuid)}
                            </>
                          )}
                        </Td>
                        <Td>
                          <DeleteIcon
                            role="button"
                            cursor="pointer"
                            color="red"
                            fontSize={13}
                            onClick={() => {
                              setSelectedResource(item);
                              setDeletePopUp(true);
                            }}

                            // handleDelete(item.uuid)}
                          />
                        </Td>
                      </Tr>
                    </>
                  );
                })}
            </Tbody>
          </Table>

          {resources?.length === 0 && (
            <NoDataFoundText>No Data Found</NoDataFoundText>
          )}
        </TableContainer>
      )}
      {deletePopUp && (
        <DeletePopUp
          setDeletePopUp={setDeletePopUp}
          deletePopUp={deletePopUp}
          text={"Are you sure you want to delete the resource?"}
          onClick={handleDelete}
        />
      )}
      <PaginationComponent
        onPageChange={handlePageNumber}
        pageCount={totalPages}
        forcePage={filters.skip - 1}
        isNextButton={isNextButtonDisabled}
        isPreviousButton={isPreviousButtonDisabled}
      />
      {openModal === true ? (
        <>
          <Modal isOpen={isOpen} onClose={onClose} isCentered size="xl">
            <ModalOverlay />
            <ModalContent h="50vh" overflow="auto" p="2" className="example">
              <ModalHeader>Title: {emailPreviewData?.title}</ModalHeader>
              <ModalBody> {parse(emailPreviewData?.description)}</ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default CMSTable;
