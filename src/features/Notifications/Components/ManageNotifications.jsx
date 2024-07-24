import { Box, Flex, HStack, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import SingleSelect from "../../../components/FitnessComponents/FitnessSelect/SingleSelect";
import { getManageAnnouncementData } from "../../authentication/components/schoolAdmin/schoolAdminSlice";

import { MdAddCircle } from "react-icons/md";
import Heading6 from "../../../components/FitnessComponents/FitnessTexts/Heading6";
import TextIcon from "../../../components/TextIcon";
import AddAnnouncement from "./AddAnnouncement";
import ManageNotificationsTable from "./ManageNotificationsTable";

const ManageNotifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const statusOptions = ["In Progress", "Not Started", "Completed"];

  const userRole = useSelector((state) => state.profile.selectedRole);
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );

  const [dropdownText, setDropdowntext] = useState("");

  const [addModal, setAddModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const token = useSelector((state) => state?.profile?.token);
  const role = useSelector((state) => state?.profile?.selectedRole);
  const code = useSelector((state) => state.profile.code);
  const message = useSelector((state) => state.profile.message);

  const getFilteredItems = (e) => {
    setDropdowntext(e.target.value);
  };

  useEffect(() => {
    dispatch(
      getManageAnnouncementData({
        status: dropdownText,
        token,
        role,
        skip: pageNumber,
      })
    );
  }, [dropdownText, pageNumber]);
  useEffect(() => {
    if (code === 200) {
      dispatch(
        getManageAnnouncementData({
          status: dropdownText,
          token,
          role,
          skip: pageNumber,
        })
      );
    }
  }, [code]);

  return (
    <Box>
      <Box
        marginTop="4"
        w={{ base: "100%", md: "56%", lg: "50%", xl: "34%", "2xl": "28%" }}
      >
        <SingleSelect
          id="announcementStatus"
          label={"Select status"}
          name="status"
          value={dropdownText}
          onChange={(e) => getFilteredItems(e)}
          optionprops={statusOptions}
        />
      </Box>
      <Flex
        direction={{ base: "row", md: "row" }}
        marginTop="10"
        alignItems="center"
        gap="1"
        mx={{ base: "-1.5", md: "0" }}
      >
        <Heading6>MANAGE ANNOUCEMENTS</Heading6>

        <Spacer display={{ base: "none", md: "block" }} />
        {rolesAndPrevilegesObject?.["Notification System Administration"]
          ?.is_add ?? true ? (
          <HStack cursor="pointer">
            <AddAnnouncement />
          </HStack>
        ) : (
          <Box color="black" mb={{ base: "0", md: "0.5", lg: "0" }}>
            <TextIcon
              changeCursorPointer="not-allowed"
              text={"Add Announcement"}
              icon={MdAddCircle}
              increaseTextSize="increaseTextSize"
            />
          </Box>
        )}
      </Flex>

      <ManageNotificationsTable
        setPageNumber={setPageNumber}
        addModal={addModal}
        setAddModal={setAddModal}
        pageNumber={pageNumber}
      />
    </Box>
  );
};

export default ManageNotifications;
