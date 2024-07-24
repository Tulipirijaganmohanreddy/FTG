import {
  Box,
  Center,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
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
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { getMergeUser } from "../../../../DistrictAdminApis/districtAdminSlice";
import SingleSelect2 from "../../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../../components/FitnessComponents/FitnessTexts/Heading1";
import Paragraph1 from "../../../../components/FitnessComponents/FitnessTexts/Paragraph1";
import NegativeButton from "../../../../components/NegativeButton";
import PositiveButton from "../../../../components/PositiveButton";
import TextIcon from "../../../../components/TextIcon";
import { setAllUsers } from "../../../../features/teacher/teacherSlice";

const MergeUsers = (props) => {
  const {
    isPopUpShow,
    setIsPopUpShow,
    userIds,
    action,
    setUserIds,
    selectedUsersInfo,
    setSelectedUsersInfo,
    setAction,
    userType,
    schoolUUID,
    setIsAllChecked,
  } = props;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const finalRef = useRef(null);

  const token = useSelector((state) => state?.profile?.token);
  const code = useSelector((state) => state?.profile?.code);

  const isLoading = useSelector((state) => state?.profile?.loading3);

  const [enablePreview, setEnablePreview] = useState(true);

  const [showConfirm, setShowConfirm] = useState(false);

  const tableHeaders = [
    "First Name",
    "Last Name",
    "Local Identifier",
    "Username",
    "Email",
    "Roles",
  ];

  const mergeData = {
    first_name: [],
    last_name: [],
    local_identifier: [],
    user_name: [],
    email: [],
    roles: [],
  };

  selectedUsersInfo?.map((userData, key) => {
    mergeData?.first_name.push({
      label: userData?.first_name,
      value: userData?.first_name,
    });
    mergeData?.last_name.push({
      label: userData?.last_name,
      value: userData?.last_name,
    });

    if (userType === "student") {
      mergeData?.local_identifier.push({
        label: userData?.student_id,
        value: userData?.student_id,
      });
    } else if (userType !== "student") {
      mergeData?.local_identifier.push({
        label: userData?.user_id,
        value: userData?.user_id,
      });
    }

    mergeData?.user_name.push({
      label: userData?.user_name,
      value: userData?.user_name,
    });
    mergeData?.email.push({ label: userData?.email, value: userData?.email });

    mergeData?.roles?.push({
      district_admin_role:
        userData?.district_admin_role !== undefined &&
        userData?.district_admin_role,
      school_admin_role:
        userData?.school_admin_role !== undefined &&
        userData?.school_admin_role,
      teacher_role:
        userData?.teacher_role !== undefined && userData?.teacher_role,
    });
  });

  const showRoles = mergeData?.roles?.reduce((result, current) => {
    return {
      district_admin_role:
        result.district_admin_role || current.district_admin_role,
      school_admin_role: result.school_admin_role || current.school_admin_role,
      teacher_role: result.teacher_role || current.teacher_role,
    };
  }, {});

  const [mergeUserData, setMergeUserData] = useState({
    merge_uuids: userIds,
    first_name: selectedUsersInfo[0]?.first_name,
    last_name: selectedUsersInfo[0]?.last_name,
    user_name: selectedUsersInfo[0]?.user_name,
    student_id: selectedUsersInfo[0]?.student_id,
    user_id: selectedUsersInfo[0]?.user_id,
    user_type: userType,
    email: selectedUsersInfo[0]?.email,
  });

  const handleMergeDataSelection = (e) => {
    setMergeUserData({
      ...mergeUserData,
      [e.target.name]: e.target.value,
    });
  };

  const previewMergeButtonClicked = () => {
    setEnablePreview(false);
    setShowConfirm(true);
  };

  const handleSubmit = () => {
    dispatch(setAllUsers(null));

    const mergedUserUUID = selectedUsersInfo?.filter(
      (each) => each?.email === mergeUserData?.email
    );

    if (userType === "student") {
      const finalPayload = {
        merge_uuids: userIds,
        first_name: mergeUserData?.first_name,
        last_name: mergeUserData?.last_name,
        user_name: mergeUserData?.user_name,
        student_id: mergeUserData?.student_id,
        user_type: userType,
        email: mergeUserData?.email,
        main_uuid: mergedUserUUID?.[0]?.uuid || "",
      };

      dispatch(getMergeUser({ body: finalPayload, token }));


    } else if (userType !== "student") {
      const finalPayload = {
        merge_uuids: userIds,
        first_name: mergeUserData?.first_name,
        last_name: mergeUserData?.last_name,
        user_name: mergeUserData?.user_name,

        user_id: mergeUserData?.user_id,
        email: mergeUserData?.email,
        school_admin_role: showRoles?.school_admin_role,
        district_admin_role: showRoles?.district_admin_role,
        teacher_role: showRoles?.teacher_role,
        user_type: userType,
        main_uuid: mergedUserUUID?.[0]?.uuid || "",
      };

      dispatch(getMergeUser({ body: finalPayload, token }));
    }
  };

  const handleModalClose = () => {
    setIsPopUpShow(false);
    setUserIds("");
    setSelectedUsersInfo([]);
    setAction("action");
    setIsAllChecked(false);
  };

  const handleDelete = (selectedUUID) => {
    let filteredUserData = selectedUsersInfo.filter(
      (userUUIDs) => userUUIDs.uuid !== selectedUUID
    );

    if (filteredUserData?.length > 0) {
      setSelectedUsersInfo(filteredUserData);
    } else {
      setMergeUserData({
        merge_uuids: "",
        first_name: "",
        last_name: "",
        user_name: "",
        student_id: "",
        user_id: "",
        user_type: "",
        email: "",
      });

      setSelectedUsersInfo([]);
    }
  };

  useEffect(() => {
    if (code === 200) {
      setIsPopUpShow(false);
      setUserIds("");
      setSelectedUsersInfo([]);
      setAction("action");
      setIsAllChecked(false);
    }
  }, [code]);

  return (
    <>
      <Modal
        isCentered
        finalFocusRef={finalRef}
        isOpen={isPopUpShow}
        onClose={() => {
          setIsPopUpShow(false);
          setIsAllChecked(false);
          setAction("");
        }}
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent m="3" p="3">
          <ModalCloseButton
            onClick={() => {
              setAction("");
              setUserIds("");
              setSelectedUsersInfo([]);
              setIsAllChecked(false);
            }}
          />
          <ModalBody p="4">
            <Heading1>Merge Users</Heading1>
            <Paragraph1>
              You have selected the following users to merge
            </Paragraph1>
            <TableContainer p="0" height="auto" maxH="400px" overflowY={"auto"}>
              <Table variant="unstyled" size="sm">
                <Thead>
                  <Tr>
                    {tableHeaders.map((header, index) => (
                      <Th key={`merge-users-${index}`}>
                        <Text textStyle="theading" textTransform={"capitalize"}>
                          {header}
                        </Text>
                      </Th>
                    ))}
                  </Tr>
                </Thead>
                {selectedUsersInfo?.map((userData, key) => {
                  return (
                    <Tbody key={`merge-users-list-${key}`}>
                      <Tr>
                        <Td>
                          <Text>{userData?.first_name}</Text>
                        </Td>
                        <Td>
                          <Text>{userData?.last_name}</Text>
                        </Td>
                        <Td>
                          <Text>
                            {userData?.student_id || userData?.user_id || "NA"}
                          </Text>
                        </Td>
                        <Td>
                          <Text>{userData?.user_name || "NA"}</Text>
                        </Td>
                        <Td>
                          <Text>{userData?.email || "NA"}</Text>
                        </Td>
                        <Td>
                          {userType !== "student" ? (
                            <Flex gap="3" alignItems="center">
                              <Text>
                                {mergeData?.roles?.length &&
                                  mergeData?.roles?.[key]
                                    ?.district_admin_role !== undefined &&
                                  mergeData?.roles?.[key]
                                    ?.district_admin_role &&
                                  "District Admin"}
                              </Text>

                              <Text>
                                {mergeData?.roles?.length &&
                                  mergeData?.roles?.[key]?.teacher_role !==
                                    undefined &&
                                  mergeData?.roles?.[key]?.teacher_role &&
                                  "Teacher"}
                              </Text>

                              <Text>
                                {mergeData?.roles?.length &&
                                  mergeData?.roles?.[key]?.school_admin_role !==
                                    undefined &&
                                  mergeData?.roles?.[key]?.school_admin_role &&
                                  "School Admin"}
                              </Text>

                              <Box>
                                {enablePreview === true ? (
                                  <TextIcon
                                    text=""
                                    icon={RxCross2}
                                    size="lg"
                                    onClick={() => handleDelete(userData?.uuid)}
                                  />
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Flex>
                          ) : (
                            <Flex gap="3" alignItems="center">
                              <Text>{userType || "NA"}</Text>

                              <Box>
                                {enablePreview === true ? (
                                  <TextIcon
                                    text=""
                                    icon={RxCross2}
                                    size="lg"
                                    onClick={() => handleDelete(userData?.uuid)}
                                  />
                                ) : (
                                  ""
                                )}
                              </Box>
                            </Flex>
                          )}
                        </Td>
                      </Tr>
                    </Tbody>
                  );
                })}
              </Table>
            </TableContainer>

            <Paragraph1>
              Select the appropriate fields to retain for this user
            </Paragraph1>

            <TableContainer p="0" height="auto" maxH="400px" overflowY={"auto"}>
              <Table>
                <Thead>
                  <Tr>
                    {tableHeaders.map((header) => (
                      <Th>{header}</Th>
                    ))}
                  </Tr>
                </Thead>
                {showConfirm === false && selectedUsersInfo?.length > 0 ? (
                  [mergeData].map((item, index) => {
                    return (
                      <>
                        <Tbody>
                          <Tr>
                            <Td>
                              <SingleSelect2
                                optionsProps={item?.first_name}
                                onChange={handleMergeDataSelection}
                                name="first_name"
                                value={mergeUserData?.first_name}
                                displayKey={"label"}
                                optionValue={"value"}
                              />
                            </Td>
                            <Td>
                              <SingleSelect2
                                optionsProps={item?.last_name}
                                onChange={handleMergeDataSelection}
                                name="last_name"
                                value={mergeUserData?.last_name}
                                displayKey={"label"}
                                optionValue={"value"}
                              />
                            </Td>
                            <Td>
                              <SingleSelect2
                                optionsProps={item?.local_identifier}
                                onChange={handleMergeDataSelection}
                                name={
                                  userType !== "student"
                                    ? "user_id"
                                    : "student_id"
                                }
                                value={
                                  mergeUserData?.student_id ||
                                  mergeUserData?.user_id
                                }
                                displayKey={"label"}
                                optionValue={"value"}
                              />
                            </Td>
                            <Td>
                              <SingleSelect2
                                optionsProps={item?.user_name}
                                onChange={handleMergeDataSelection}
                                name="user_name"
                                value={mergeUserData?.user_name}
                                displayKey={"label"}
                                optionValue={"value"}
                              />
                            </Td>
                            <Td>
                              <SingleSelect2
                                optionsProps={item?.email}
                                onChange={handleMergeDataSelection}
                                name="email"
                                value={mergeUserData?.email}
                                displayKey={"label"}
                                optionValue={"value"}
                              />
                            </Td>

                            <Td>
                              {userType !== "student" ? (
                                <Flex gap="3" alignItems="center">
                                  <Text>
                                    {showRoles?.district_admin_role !==
                                      undefined &&
                                      showRoles?.district_admin_role &&
                                      "District Admin"}
                                  </Text>

                                  <Text>
                                    {showRoles?.teacher_role !== undefined &&
                                      showRoles?.teacher_role &&
                                      "Teacher"}
                                  </Text>

                                  <Text>
                                    {showRoles?.school_admin_role !==
                                      undefined &&
                                      showRoles?.school_admin_role &&
                                      "School Admin"}
                                  </Text>
                                </Flex>
                              ) : (
                                <Text>{userType}</Text>
                              )}
                            </Td>
                          </Tr>
                        </Tbody>
                      </>
                    );
                  })
                ) : (
                  <Tbody>
                    <Tr>
                      <Td>
                        <Text>{mergeUserData?.first_name}</Text>
                      </Td>
                      <Td>
                        <Text>{mergeUserData?.last_name}</Text>
                      </Td>
                      <Td>
                        <Text>
                          {mergeUserData?.student_id || mergeUserData?.user_id}
                        </Text>
                      </Td>
                      <Td>
                        <Text>{mergeUserData?.user_name}</Text>
                      </Td>
                      <Td>
                        <Text>{mergeUserData?.email}</Text>
                      </Td>

                      <Td>
                        {userType !== "student" ? (
                          <Flex gap="3" alignItems="center">
                            <Text>
                              {showRoles?.district_admin_role !== undefined &&
                                showRoles?.district_admin_role &&
                                "District Admin"}
                            </Text>

                            <Text>
                              {showRoles?.teacher_role !== undefined &&
                                showRoles?.teacher_role &&
                                "Teacher"}
                            </Text>

                            <Text>
                              {showRoles?.school_admin_role !== undefined &&
                                showRoles?.school_admin_role &&
                                "School Admin"}
                            </Text>
                          </Flex>
                        ) : (
                          <Text>
                            {selectedUsersInfo?.length !== 0 && userType}
                          </Text>
                        )}
                      </Td>
                    </Tr>
                  </Tbody>
                )}
              </Table>
            </TableContainer>
          </ModalBody>

          <Center gap="7" p="4">
            {enablePreview ? (
              <NegativeButton text="Cancel" onClick={handleModalClose} />
            ) : (
              // <NegativeButton
              //   text="Back to Preview"
              //   onClick={() => {
              //     setEnablePreview(true);
              //     setShowConfirm(false);
              //   }}
              // />

              <Box
                px="3"
                py="2"
                color="black"
                borderRadius="3xl"
                background="#EEEEEE"
                cursor="pointer"
                textStyle="p"
                onClick={() => {
                  setEnablePreview(true);
                  setShowConfirm(false);
                }}
              >
                Back to Preview
              </Box>
            )}

            {!showConfirm ? (
              <PositiveButton
                text="Preview Merge"
                bg="#65a30d"
                onClick={previewMergeButtonClicked}
                isDisabled={selectedUsersInfo?.length === 0 ? true : false}
              />
            ) : (
              <PositiveButton
                text="Confirm"
                bg="#65a30d"
                onClick={handleSubmit}
                isLoading={isLoading}
              />
            )}
          </Center>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MergeUsers;
