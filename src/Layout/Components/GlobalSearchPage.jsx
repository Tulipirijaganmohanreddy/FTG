import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
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
  getUserData,
  setActivatingID,
  setSearchData,
  setManageUser,
  setPreviousPath,
  getGlobalSearchResults,
  getViewResource,
} from "../../store/slices/profileSlice";
import moment from "moment";
import { IoIosArrowDropdownCircle } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import loading_img from "../../assets/Images/FitnessGramEventImages/loading.gif";
import EventDetailsPopup from "../../features/FitnessGram/Components/EventDetailsPopup";
import StudentEventPopup from "../../features/FitnessGram/Components/StudentEventPopup";

const CATEGORY_DATA = {
  student: [
    { name: "All", value: "All" },
    { name: "FitnessGram", value: "FitnessGram" },
    { name: "Smart Coach Resources", value: "SmartCoachResources" },
  ],
  teacher: [
    { name: "All", value: "All" },
    { name: "FitnessGram", value: "FitnessGram" },
    { name: "Student", value: "Student" },
    { name: "Class", value: "Class" },
    { name: "Smart Coach Resources", value: "SmartCoachResources" },
  ],
  schoolAdmin: [
    { name: "All", value: "All" },
    { name: "FitnessGram", value: "FitnessGram" },
    { name: "Teacher", value: "Teacher" },
    { name: "Student", value: "Student" },
    { name: "Class", value: "Class" },
  ],
  districtAdmin: [
    { name: "All", value: "All" },
    { name: "FitnessGram", value: "FitnessGram" },
    { name: "Teacher", value: "Teacher" },
    { name: "Student", value: "Student" },
    { name: "School", value: "School" },
    { name: "Class", value: "Class" },
    { name: "School Administrator", value: "SchoolAdmin" },
    { name: "District Administrator", value: "DistrictAdmin" },
  ],
  stateAdmin: [
    { name: "All", value: "All" },
    { name: "FitnessGram", value: "FitnessGram" },
    { name: "Teacher", value: "Teacher" },
    { name: "Student", value: "Student" },
    { name: "School", value: "School" },
    { name: "Class", value: "Class" },
    { name: "School Administrator", value: "SchoolAdmin" },
    { name: "District Administrator", value: "DistrictAdmin" },
  ],
  superAdmin: [
    { name: "All", value: "All" },
    { name: "License", value: "License" },
    { name: "Help Desk", value: "HelpDesk" },
    { name: "Super Administrator", value: "SuperAdmin" },
    { name: "Districts", value: "Districts" },
    { name: "School", value: "School" },
    { name: "SSO CONFIGURATION", value: "SsoConfiguration" },
  ],
};

const CATEGORY_NAMES = {
  Student: { userType: "student", display_key: "STUDENTS" },
  Teacher: { userType: "teacher", display_key: "TEACHERS" },
  Class: { display_key: "CLASSES" },
  SchoolAdmin: {
    userType: "schoolAdmin",
    display_key: "SCHOOL ADMINISTRATORS",
  },
  DistrictAdmin: {
    userType: "districtAdmin",
    display_key: "DISTRICT ADMINISTRATORS",
  },
  SuperAdmin: { userType: "superAdmin", display_key: "Super Administrators" },
  FitnessGram: { display_key: "FITNESS GRAM" },
  SmartCoachResources: { display_key: "SMART COACH RESOURCES" },
  School: { display_key: "SCHOOLS" },
  Districts: { display_key: "DISTRICTS" },
  HelpDesk: { display_key: "HELP DESK" },
  SsoConfiguration: { display_key: "SSO CONFIGURATION" },
  License: { display_key: "Licenses" },
};

const GlobalSearchPage = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const openSideBar = useSelector((state) => state.profile.openSideBar);
  const role = useSelector((state) => state.profile.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const userId = useSelector((state) => state?.profile?.userId);

  const token = useSelector((state) => state?.profile?.token);

  const selectedCategory = useSelector(
    (state) => state.profile.searchData?.category
  );
  const searchData = useSelector((state) => state.profile.searchData);

  const searchResults = useSelector(
    (state) => state.profile.globalSearchResults
  );

  const code = useSelector((state) => state.profile.code);
  const loading = useSelector((state) => state?.profile?.loading);
  const [seeMore, setSeeMore] = useState([]);

  const [isViewDataClicked, setIsViewDataClicked] = useState(false);

  const [selectedEventCardData, setSelectedEventCardData] = useState({});
  const [selectedRole, setSelectedRole] = useState(role);

  const handleGlobalSearchCategory = (e) => {
    dispatch(
      setSearchData({
        search: searchData?.search,
        category: e.target.value,
      })
    );
    selectedRole !== "stateAdmin" &&
      searchData?.search &&
      dispatch(
        getGlobalSearchResults({
          token,
          data: { category: e.target.value, search: searchData?.search },
        })
      );
  };

  const handleSeeMore = (index) => {
    let modifiedArr = seeMore.slice();
    modifiedArr.splice(index, 1, {
      is_total_view: !modifiedArr[index].is_total_view,
    });
    setSeeMore([...modifiedArr]);
  };

  const navigatingToSelectedItemPage = (selectedItem, category) => {
    if (category === "FitnessGram") {
      setIsViewDataClicked(true);

      setSelectedEventCardData(selectedItem);
    }

    if (
      [
        "Student",
        "Teacher",
        "SchoolAdmin",
        "DistrictAdmin",
        "superAdmin",
      ].includes(category)
    ) {
      dispatch(setActivatingID("1"));

      dispatch(getUserData({ id: selectedItem?.uuid, token }));

      dispatch(
        setManageUser({
          userType: CATEGORY_NAMES[category].userType,
          formTitle: `EDIT ${CATEGORY_NAMES[category].display_key.slice(
            0,
            -1
          )}`,
        })
      );

      dispatch(setPreviousPath(location.pathname));
      //   dispatch(setGlobalSearchCategory(`${CATEGORY_NAMES[category].userType}`));

      navigate(
        `/role/${selectedRole}/edit/${CATEGORY_NAMES[category].userType}/${selectedItem?.uuid}`
      );
    }

    if (category === "SuperAdmin") {
      dispatch(setActivatingID("1"));

      dispatch(getUserData({ id: selectedItem?.uuid, token }));
      dispatch(
        setManageUser({
          userType: "admin",
          formTitle: `EDIT ADMINISTRATOR`,
        })
      );
      dispatch(setPreviousPath(location.pathname));

      navigate(`/role/${selectedRole}/edit/admin/${selectedItem?.uuid}`);
    }

    if (category === "HelpDesk") {
      dispatch(setActivatingID("1"));

      dispatch(getUserData({ id: selectedItem?.uuid, token }));
      dispatch(
        setManageUser({
          userType: "helpDesk",
          formTitle: `EDIT HELP DESK USER`,
        })
      );
      dispatch(setPreviousPath(location.pathname));

      navigate(`/role/${selectedRole}/edit/helpDesk/${selectedItem?.uuid}`);
    }
    if (category === "School") {
      dispatch(setPreviousPath(location.pathname));

      navigate(`/role/${selectedRole}/school/${selectedItem?.uuid}`);
      if (selectedRole === "districtAdmin") {
        dispatch(setActivatingID("2"));
      } else {
        dispatch(setActivatingID("1"));
      }
    }

    if (category === "Class") {
      dispatch(setActivatingID("1"));

      dispatch(setPreviousPath(location.pathname));
      navigate(
        `/role/${selectedRole}/manage-classes/school/${selectedItem?.school_uuid}/class/${selectedItem?.uuid}`
      );
    }
    if (category === "Districts") {
      navigate(
        `/role/${selectedRole}/Districts/DistrictDetails/${selectedItem.uuid}`
      );
    }
    if (category === "SmartCoachResources") {
      if (selectedItem?.file_url) {
        const filePath = encodeURIComponent(
          selectedItem?.file_url?.split(".com/")[1]
        );

        dispatch(
          getViewResource({
            token,
            filePath,
            isDownload: "false",
            module: "cms",
          })
        );
      } else {
        window.open(selectedItem?.url, "_blank");
      }
    }

    if (category === "License") {
      dispatch(setActivatingID("3"));
      navigate(
        `/role/${selectedRole}/License/${selectedItem.uuid}/${selectedItem.funder_uuid}`
      );
    }
    if (category === "SsoConfiguration") {
      dispatch(setActivatingID("5"));
      dispatch(setPreviousPath(location.pathname));

      navigate(
        `/role/superAdmin/SSOConfig/${userId}/edit/${selectedItem?.uuid}`
      );
    }
  };

  useEffect(() => {
    let arr = [...Array(searchResults?.length)]?.map((item) => ({
      is_total_view: false,
    }));
    setSeeMore([...arr]);
  }, [searchResults]);

  useEffect(() => {
    duplicateRole ? setSelectedRole(duplicateRole) : setSelectedRole(role);
  }, []);

  return (
    <Box
      bg="white"
      border="1px solid white"
      h="full"
      p={{ base: "0", md: "1rem" }}
      overflowY="scroll"
      className="example"
      width={{
        base: "100%",

        md: "100%",

        lg: `calc(99.5% - ${openSideBar ? "300px" : "6.5rem"})`,
      }}
      position="fixed"
      top="4rem" // conditional global search   // top="5rem" for normal
      rounded="lg"
      // mt="4"

      right={{ base: "0", lg: "1rem" }}
      transition="width 0.5s"
      // Added transition property for smooth animation
      // Adjust the duration and timing function as needed
      css={{
        transitionDuration: "0.5s",
        transitionTimingFunction: "ease",
      }}
      id="globalSearchMainContent"
    >
      <Flex
        direction="column"
        mb={{ base: "20", md: "16" }}
        mt={{ base: "6", md: "4" }}
        mx="2"
        gap="4"
      >
        <HStack
          gap={{ md: "2", lg: "4", xl: "6" }}
          display={{ base: "none", md: "flex" }}
        >
          {CATEGORY_DATA?.[selectedRole]?.map((item) => (
            <Button
              // mt='4'
              key={item.value}
              value={item.value}
              borderRadius="full"
              size="sm"
              bg={selectedCategory === item.value ? "primary" : ""}
              border={
                selectedCategory === item.value
                  ? "1px solid primary"
                  : "1px solid gray"
              }
              color={selectedCategory === item.value ? "white" : "gray-3"}
              onClick={handleGlobalSearchCategory}
            >
              {item.name}
            </Button>
          ))}
        </HStack>

        <>
          <Box display={{ base: "block", md: "none" }}>
            <Menu>
              <Box
                display={{ base: "flex", lg: "none" }}
                roundedRight={"4rem"}
                justifyContent={"space-between"}
                bg="#ECF4FF"
              >
                <MenuButton
                  py={2}
                  transition="all 0.2s"
                  borderRadius="none"
                  borderWidth="none"
                  textAlign="left"
                >
                  <Text
                    textTransform={"uppercase"}
                    fontWeight={"bold"}
                    display={"flex"}
                    whiteSpace={"nowrap"}
                    mx="5"
                  >
                    {selectedCategory}
                  </Text>
                </MenuButton>
                <MenuButton>
                  <Box mt="0" mx="2">
                    <IoIosArrowDropdownCircle size="20" />
                  </Box>
                </MenuButton>
              </Box>

              <MenuList
                w="94vw"
                //   m="2"
                shadow={"2xl"}
                p="2"
                display={{ base: "block", md: "none", lg: "none" }}
                h="auto"
                maxH="30vh"
                overflowY="auto"
                zIndex="1000"
              >
                {CATEGORY_DATA?.[selectedRole]?.map((item, index) => (
                  <>
                    <MenuItem
                      rounded={"lg"}
                      _hover={{ bg: "blue.500", color: " white" }}
                      _focus={{ boxShadow: "outline" }}
                      key={item.value}
                      value={item.value}
                      borderRadius="full"
                      size="sm"
                      fontSize="sm"
                      bg={selectedCategory === item.value ? "primary" : ""}
                      border={
                        selectedCategory === item.value
                          ? "1px solid primary"
                          : "1px solid gray"
                      }
                      color={
                        selectedCategory === item.value ? "white" : "gray-3"
                      }
                      onClick={handleGlobalSearchCategory}
                    >
                      {item?.name}
                    </MenuItem>
                    <MenuDivider
                      border="0.5px solid gray"
                      fontWeight={"thin"}
                    />
                  </>
                ))}
              </MenuList>
            </Menu>
          </Box>
        </>

        {loading ? (
          <Center>
            <Image src={loading_img} />
          </Center>
        ) : (
          <>
            {searchResults?.length
              ? searchResults?.map((result, resultIndex) => (
                  <Box>
                    <Text textStyle="textHead" fontWeight="semibold">
                      {CATEGORY_NAMES[result.category]?.display_key}
                    </Text>
                    <Box
                      boxShadow="md"
                      borderRadius="lg"
                      border="1px solid white"
                      overflow="auto"
                      mt="4"
                    >
                      <TableContainer
                        height="auto"
                        maxH="calc(100vh - 12rem)"
                        overflowY="auto"
                      >
                        <Table>
                          <Thead>
                            <Tr>
                              {result?.headers?.map((header) => (
                                <Th>{header.display_key}</Th>
                              ))}
                            </Tr>
                          </Thead>
                          <Tbody>
                            {(seeMore?.[resultIndex]?.is_total_view
                              ? result.data
                              : result.data.slice(0, 2)
                            ).map((row) => (
                              <Tr>
                                {result?.headers?.map((header, index) =>
                                  index === 0 &&
                                  [
                                    "Student",
                                    "Teacher",
                                    "DistrictAdmin",
                                    "SchoolAdmin",
                                    "SuperAdmin",
                                    "HelpDesk",
                                  ].includes(result?.category) ? (
                                    <Td
                                      textColor={index === 0 && "primary"}
                                      cursor={index === 0 && "pointer"}
                                      borderBottomColor={index === 0 && "black"}
                                      onClick={() =>
                                        navigatingToSelectedItemPage(
                                          row,
                                          result?.category
                                        )
                                      }
                                    >{`${row[header.database_key_1]},${
                                      row[header.database_key_2]
                                    }`}</Td>
                                  ) : result?.category ===
                                    "SmartCoachResources" ? (
                                    <Td
                                      textColor={index === 0 && "primary"}
                                      cursor={index === 0 && "pointer"}
                                      borderBottomColor={index === 0 && "black"}
                                      onClick={() =>
                                        navigatingToSelectedItemPage(
                                          row,
                                          result?.category
                                        )
                                      }
                                    >
                                      {row[header.database_key_1]}
                                    </Td>
                                  ) : result.category === "FitnessGram" ? (
                                    <Td
                                      textColor={index === 0 && "primary"}
                                      cursor={index === 0 && "pointer"}
                                      borderBottomColor={index === 0 && "black"}
                                      onClick={() =>
                                        navigatingToSelectedItemPage(
                                          row,
                                          result?.category
                                        )
                                      }
                                    >
                                      {header.database_key === "start_date"
                                        ? moment(
                                            row[header.database_key]
                                          ).format(
                                            navigator.language === "en-GB"
                                              ? "DD-MM-YYYY"
                                              : "MM-DD-YYYY"
                                          )
                                        : row[header.database_key]}
                                    </Td>
                                  ) : header.database_key === "login_status" ? (
                                    <Td
                                      textColor={index === 0 && "primary"}
                                      cursor={index === 0 && "pointer"}
                                      borderBottomColor={index === 0 && "black"}
                                      onClick={() =>
                                        navigatingToSelectedItemPage(
                                          row,
                                          result?.category
                                        )
                                      }
                                    >
                                      {row[header.database_key] == 1
                                        ? "Active"
                                        : "Inactive"}
                                    </Td>
                                  ) : (
                                    <Td
                                      textColor={index === 0 && "primary"}
                                      cursor={index === 0 && "pointer"}
                                      borderBottomColor={index === 0 && "black"}
                                      onClick={() =>
                                        navigatingToSelectedItemPage(
                                          row,
                                          result?.category
                                        )
                                      }
                                    >
                                      {row[header.database_key] || "NA"}
                                    </Td>
                                  )
                                )}
                              </Tr>
                            ))}
                          </Tbody>
                        </Table>
                      </TableContainer>
                      {result?.data?.length > 2 ? (
                        <Flex justify="flex-end" p="4">
                          <Text
                            color="primary"
                            cursor="pointer"
                            textUnderlineOffset="2"
                            textDecoration="underline"
                            onClick={() => handleSeeMore(resultIndex)}
                          >
                            {seeMore?.[resultIndex]?.is_total_view
                              ? "Show Less"
                              : "Show More"}
                          </Text>
                        </Flex>
                      ) : null}
                    </Box>
                  </Box>
                ))
              : null}
          </>
        )}
      </Flex>

      {isViewDataClicked ? (
        selectedRole === "student" ? (
          <StudentEventPopup
            isViewDataClicked={isViewDataClicked}
            setIsViewDataClicked={setIsViewDataClicked}
            selectedCard={selectedEventCardData}
          />
        ) : (
          <EventDetailsPopup
            isViewDataClicked={isViewDataClicked}
            setIsViewDataClicked={setIsViewDataClicked}
            event={selectedEventCardData}
          />
        )
      ) : null}
    </Box>
  );
};

export default GlobalSearchPage;
