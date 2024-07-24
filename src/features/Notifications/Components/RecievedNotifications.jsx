import {
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Image,
  Spinner,
  Text,
} from "@chakra-ui/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { RxDotFilled } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getApprovalNotificationRequestClicked,
  getNotificationsRecievedApiCall,
} from "../../../DistrictAdminApis/districtAdminSlice";
import Heading4new from "../../../components/FitnessComponents/FitnessTexts/Heading4new";
import Label from "../../../components/FitnessComponents/FitnessTexts/Label";
import NormalHeading from "../../../components/FitnessComponents/FitnessTexts/NormalHeading";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import loading_img from "../../../assets/Images/FitnessGramEventImages/loading.gif";
import {
  getNotificationsCountAPICall,
  getNotificationsReadAPICall,
  setCode2,
} from "../../../store/slices/profileSlice";
import parse from "html-react-parser";
import Annoucements from "./Annoucements";
import AddUserRequests from "./AddUserRequests";
import StatusNotifications from "./StatusNotifications";
import FitnessGramRequests from "./FitnessGramRequests";

const RecievedNotifications = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const code2 = useSelector((state) => state?.profile?.code2);
  const code = useSelector((state) => state?.profile?.code);
  const token = useSelector((state) => state.profile.token);
  const loading = useSelector((state) => state?.profile?.loading);
  const notificationsRecievedList = useSelector(
    (state) => state?.districtAdmin?.notificationsRecievedList
  );

  const notificationsRead = useSelector(
    (state) => state?.profile?.notificationsRead
  );

  const [status, setStatus] = useState({
    statusIndex: null,
    statusText: null,
  });

  const handleNotifications = (item) => {
    const UUID = item?.uuid;

    dispatch(getNotificationsReadAPICall({ UUID, token }));
  };

  const handleApprovalRequest = (uuid, status, key) => {
    setStatus({ statusIndex: key, statusText: status });

    let body = {
      status,
      uuid: uuid,
    };
    dispatch(getApprovalNotificationRequestClicked({ body, token }));
  };

  const renderingNotifications = (item, index) => {
    if (item?.type === "announcement") {
      return (
        <Annoucements
          key={"a" + index}
          item={item}
          index={index}
          handleNotifications={handleNotifications}
        />
      );
    } else if (item?.type === "addUserRequests") {
      return (
        <AddUserRequests
          key={"a" + index}
          item={item}
          index={index}
          status={status}
          setStatus={setStatus}
          handleApprovalRequest={handleApprovalRequest}
        />
      );
    } else if (item?.type === "statusNotifications") {
      return (
        <StatusNotifications
          key={"a" + index}
          item={item}
          index={index}
          handleNotifications={handleNotifications}
        />
      );
    } else if (item?.type === "FitnessGramEvents") {
      return (
        <FitnessGramRequests
          key={"a" + index}
          item={item}
          index={index}
          status={status}
        />
      );
    }
  };

  useEffect(() => {
    dispatch(getNotificationsRecievedApiCall({ token }));
  }, []);

  useEffect(() => {
    if (code2 === 200) {
      dispatch(getNotificationsCountAPICall({ token }));

      dispatch(getNotificationsRecievedApiCall({ token }));

      dispatch(setCode2(null));
    }

    setStatus({ statusIndex: null, statusText: null });
  }, [code2]);

  useEffect(() => {
    if (code === 200) {
      dispatch(getNotificationsCountAPICall({ token }));

      dispatch(getNotificationsRecievedApiCall({ token }));
    }
  }, [code]);

  return (
    <>
      {loading ? (
        <Center>
          <Image src={loading_img} />
        </Center>
      ) : notificationsRecievedList?.length ? (
        notificationsRecievedList?.map((item, index) =>
          renderingNotifications(item, index)
        )
      ) : null}

      {/* {notificationsRecievedList?.fitnessgramRequests?.map((item, key) => (
				<Flex
					key={key}
					// onClick={() => handleNotifications(key, item)}
					style={{
						background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
					}}
					gap="1"
				>
					<Box mt="10">
						{!item?.is_read && <RxDotFilled size="20" color="#0081C8" />}
					</Box>
					<Box w="full">
						<Heading4new>Student data approval requests</Heading4new>

						<Flex>
							<Box>
								<Box
									onClick={() => navigate(`/role/${selectedRole}`)}
									cursor="pointer"
									border="1px solid #59AEDD"
									textAlign="center"
									borderLeftRadius="full"
									borderLeftWidth="2px"
									borderRightWidth="2px"
									borderRightRadius="full"
									py="1"
									px="2"
									my="1"
								>
									<Label
										marginTopText={"0"}
										changeTextColor="#59AEDD"
										changeTextStyle="labelBoldHead"
									>
										{item?.requests}+ Requests Pending
									</Label>
								</Box>

								<Box color="black-2">
									<NormalHeading>
										{moment(item?.start_date).format("ddd MMM DD YYYY h:mm A")}{" "}
									</NormalHeading>
								</Box>
							</Box>
						</Flex>

						<Divider />
					</Box>
				</Flex>
			))} */}

      {/* {notificationsRecievedList?.addUserRequests?.map((item, key) => (
				<Flex
					key={key}
					onClick={() => setIsActive(key)}
					style={{
						background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
					}}
				>
					<Box w="full">
						<Flex>
							<Box mt="2">
								<Text p="2" textStyle={"textHead"}>
									{item?.role} addition approval request
								</Text>

								<Text p="2" textStyle={"p"}>
									{item?.requested_role} {item?.requestedBy?.first_name} has
									requested for the user addition of{" "}
									{item?.requestedFor?.first_name} as a {item?.role}
								</Text>

								<Text p="2" textStyle={"p"} color="#8B8B8B">
									{" "}
									{moment(item?.createdAt).format("ddd MMM DD YYYY h:mm A")}
								</Text>
							</Box>
						</Flex>
						<HStack gap="2">
							<Box
								px="4"
								py="2"
								onClick={() =>
									handleApprovalRequest(item?.uuid, "Approved", key)
								}
							>
								<PositiveButton
									text="Approve"
									isLoading={
										status?.statusIndex === key &&
										status?.statusText === "Approved" &&
										loading
									}
								/>{" "}
							</Box>
							<Box
								onClick={() =>
									handleApprovalRequest(item?.uuid, "Rejected", key)
								}
							>
								<NegativeButton
									isLoading={
										status?.statusIndex === key &&
										status?.statusText === "Rejected" &&
										loading
									}
									text="Reject"
								/>
							</Box>
						</HStack>

						<Divider />
					</Box>
				</Flex>
			))} */}
      {/* 
			{notificationsRecievedList?.statusNotifications?.map((item, key) => (
				<Flex
					key={key}
					onClick={() => handleNotifications(item)}
					style={{
						background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
					}}
					gap="1"
					cursor="pointer"
					pt="3"
					pb="2"
				>
					<Box mt="5">
						{!item?.is_read && <RxDotFilled size="20" color="#0081C8" />}
					</Box>
					<Box w="full">
						<Heading4new>
							{item?.approval_role?.charAt(0)?.toUpperCase() +
								item?.approval_role.slice(1)}{" "}
							{item?.status} the request to add new {item?.role}
						</Heading4new>

						<Flex>
							<Box>
								{item?.desc ? (
									<Label marginTopText={"0"}>{parse(item?.desc)}</Label>
								) : null}
								<Box color="black-2">
									<NormalHeading>
										{moment(item?.updatedAt).format("ddd MMM DD YYYY h:mm A")}
									</NormalHeading>
								</Box>
							</Box>
						</Flex>

						<Divider />
					</Box>
				</Flex>
			))} */}

      {/* {notificationsRecievedList?.announcements?.map((item, key) => (
				<Flex
					key={key}
					onClick={() => handleNotifications(item)}
					style={{
						background: item?.is_read ? "#FFFFFF" : "#EBF8FF",
					}}
					gap="1"
					cursor="pointer"
				>
					<Box mt="10">
						{!item?.is_read && <RxDotFilled size="20" color="#0081C8" />}
					</Box>
					<Box w="full">
						<Heading4new>{item?.announcement_title}</Heading4new>

						<Flex>
							<Box>
								{item?.desc ? (
									<Label marginTopText={"0"}>{parse(item?.desc)}</Label>
								) : null}

								<Box color="black-2">
									<NormalHeading>
										{moment(item?.start_date).format("ddd MMM DD YYYY")}{" "}
									</NormalHeading>
								</Box>
							</Box>
						</Flex>

						<Divider />
					</Box>
				</Flex>
			))} */}
    </>
  );
};

export default RecievedNotifications;
