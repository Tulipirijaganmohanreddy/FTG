import {
  Box,
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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { debounce } from "../../../Utilities/utils";
import loadingImg from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import Heading2 from "../../../components/FitnessComponents/FitnessTexts/Heading2";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import NoDataFoundText from "../../../components/FitnessComponents/FitnessTexts/NoDataFoundText";
import ParagraphWithColorBlack from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorBlack";
import ParagraphWithColorPrimary from "../../../components/FitnessComponents/FitnessTexts/ParagraphWithColorPrimary";
import SearchComponent from "../../../components/GlobalComponents/SearchComponent";
import PaginationComponent from "../../../components/PaginationComponent";
import { getSchoolsByDistrictId } from "../../../store/slices/superAdminSlice/superAdminSlice";
import { getSchoolsForAdmin } from "../../authentication/components/schoolAdmin/schoolAdminSlice";
import { setTotalPages } from "../../teacher/teacherSlice";
import { schoolList } from "../Config";
import AddSchool from "./AddSchool";
import Heading5 from "../../../components/FitnessComponents/FitnessTexts/Heading5";

const SchoolsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const { title, subHead, tableHeaders } = schoolList;

  const token = useSelector((state) => state?.profile?.token);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const manageSchoolsData = useSelector(
    (state) => state?.schoolAdmin?.SchoolsForAdmin
  );
  const code = useSelector((state) => state?.profile?.code);

  const loading = useSelector((state) => state?.superAdmin?.loading);

  const selectedRole = useSelector((state) => state?.profile?.selectedRole);

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const [pageNumber, setPageNumber] = useState(1);
  const [search, setSearch] = useState("");

  const isPreviousButtonDisabled = pageNumber === 1;
  const isNextButtonDisabled = pageNumber === totalPages;

  const handlePageNumber = (event) => {
    setPageNumber(event.selected + 1);
  };

  const handleSearch = debounce((text) => {
    setSearch(text);
    setPageNumber(1);
    if (selectedRole === "superAdmin" && !duplicateRole) {
      let body = {
        size: "20",
        skip: 1,
        search: text,
      };
      text?.length != 1 &&
        dispatch(
          getSchoolsByDistrictId({
            districtId: params?.districtId,
            token: token,
            body: body,
          })
        );
    } else {
      const data = {
        size: "20",
        skip: pageNumber,
        search: text,
      };
      text?.length != 1 &&
        dispatch(getSchoolsForAdmin({ token, finalBody: data }));
    }
  }, 1000);
  const clickToNavigate = (item) => {
    const schoolId = item?.uuid;

    navigate(`/role/${selectedRole}/school/${schoolId}`);
  };

  useEffect(() => {
    if (["superAdmin", "stateAdmin"].includes(selectedRole) && !duplicateRole) {
      let body = {
        size: "20",
        skip: pageNumber,
        search: search?.length ? search : "",
      };
      dispatch(
        getSchoolsByDistrictId({
          districtId: params?.districtId,
          token: token,
          body: body,
        })
      );
    } else {
      const data = {
        size: "20",
        skip: pageNumber,
        search: search?.length ? search : "",
      };
      dispatch(getSchoolsForAdmin({ token, finalBody: data }));
    }
  }, [pageNumber]);
  useEffect(() => {
    if (code === 200) {
      if (selectedRole === "superAdmin" && !duplicateRole) {
        let body = {
          size: "20",
          skip: pageNumber,
          search: "",
        };
        dispatch(
          getSchoolsByDistrictId({
            districtId: params?.districtId,
            token: token,
            body: body,
          })
        );
      } else {
        const data = {
          size: "20",
          skip: pageNumber,
          search: "",
        };
        dispatch(getSchoolsForAdmin({ token, finalBody: data }));
      }
    }
  }, [code]);

  useEffect(() => {
    dispatch(setTotalPages(""));
  }, []);

  return (
    <>
      <Flex direction="column" gap="2" mt="4">
        <Heading2> {title}</Heading2>

        <Flex justifyContent="space-between" alignItems="center">
          <Flex
            gap="5"
            alignItems={"center"}
            // mt={{ base: "3", md: "4", lg: "3" }}
          >
            <Heading2>{subHead}</Heading2>
            <Box>
              <SearchComponent
                name="search"
                id="searchSchool"
                display={{ base: "none", md: "flex", lg: "flex " }}
                onChange={(e) => {
                  handleSearch(e.target.value);
                }}
                inlineSize="48"
              />
            </Box>
          </Flex>

          {selectedRole === "superAdmin" && !duplicateRole ? (
            <Box role="button">
              <AddSchool DistrictId={params?.districtId} />
            </Box>
          ) : null}
        </Flex>
        <SearchComponent
          name="search"
          id="searchSchool"
          display={{ base: "flex", md: "none", lg: "none " }}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <>
          {loading ? (
            <Center justify="center">
              <Image src={loadingImg} w="5rem" />
            </Center>
          ) : (
            <TableContainer
              height="auto"
              maxH="calc(100vh - 12rem)"
              overflowY="auto"
            >
              <Table>
                <Thead>
                  <Tr>
                    {tableHeaders.map((item, key) => (
                      <Th key={"a" + key}>{item}</Th>
                    ))}
                  </Tr>
                </Thead>
                <Tbody>
                  {manageSchoolsData?.length > 0 &&
                    manageSchoolsData?.map((item, index) => {
                      return (
                        <>
                          <Tr key={"abc" + index}>
                            <Td
                              role="button"
                              onClick={() => clickToNavigate(item)}
                            >
                              <ParagraphWithColorPrimary
                                filter={
                                  !item?.license_attached
                                    ? "grayscale(100%)"
                                    : item.license_status?.toLowerCase() !==
                                      "active"
                                    ? "grayscale(100%)"
                                    : null
                                }
                              >
                                {item?.school_name}
                              </ParagraphWithColorPrimary>
                            </Td>

                            <Td>
                              <ParagraphWithColorBlack>
                                {item?.local_identifier || "NA"}
                              </ParagraphWithColorBlack>
                            </Td>
                            <Td>
                              <ParagraphWithColorBlack>
                                {item?.license_name || "NA"}
                              </ParagraphWithColorBlack>
                            </Td>
                          </Tr>
                        </>
                      );
                    })}
                </Tbody>
              </Table>

              {!manageSchoolsData?.length && (
                <NoDataFoundText>No Records Found</NoDataFoundText>
              )}
            </TableContainer>
          )}
          {totalPages > 1 && (
            <PaginationComponent
              onPageChange={handlePageNumber}
              pageCount={totalPages}
              forcePage={pageNumber - 1}
              isNextButton={isNextButtonDisabled}
              isPreviousButton={isPreviousButtonDisabled}
            />
          )}
        </>
      </Flex>
    </>
  );
};

export default SchoolsList;
