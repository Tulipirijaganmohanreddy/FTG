import { Box, Flex, Spacer } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import ErrorText from "../../../components/FitnessComponents/FitnessTexts/ErrorText";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import PositiveButton from "../../../components/PositiveButton";
import { setPreviousPath } from "../../../store/slices/profileSlice";
import {
  getEmailTemplate,
  sendEmailsToContacts,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import AddNewContacts from "./AddNewContacts";
import ContactsList from "./ContactsList";

const LicenseContacts = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();

  const token = useSelector((state) => state?.profile?.token);
  const code = useSelector((state) => state?.profile?.code);
  const loading = useSelector((state) => state?.profile?.upLoading2);
  const emailTemplatesData = useSelector(
    (state) => state?.superAdmin?.emailTemplate
  );

  const [emailBody, setEmailBody] = useState({
    sendTo: "",
    subject: "",
    cc: "",
    bcc: "",
  });
  const [errors, setErrors] = useState("");

  const CCValues = (cc) => {
    setEmailBody({ ...emailBody, sendTo: cc.join(",") });
  };

  const handleChange = (e) => {
    if ([e.target.name] == "cc" || [e.target.name] == "bcc") {
      if (e.target.value?.length > 0) {
        let errorObj = validateFormData({ [e.target.name]: e.target.value });

        if (Object.keys(errorObj)?.length > 0) {
          setErrors((prevState) => ({
            ...prevState,
            ...errorObj,
          }));
        } else if (Object.keys(errorObj)?.length === 0) {
          setErrors((prevState) => ({
            ...prevState,
            [e.target.name]: "",
          }));
        }
      } else {
        delete errors[e.target.name];
      }
    }

    setEmailBody({ ...emailBody, [e.target.name]: e.target.value });
  };

  const handleSendEmail = (event) => {
    event.preventDefault();
    dispatch(setPreviousPath(location?.pathname));

    const { bcc, cc, ...payloadForValidation } = emailBody;

    let errorObj = validateFormData(payloadForValidation);

    setErrors({ ...errorObj });

    if (cc?.length > 0) {
      let errorObj = validateFormData({ cc: cc });

      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    } else if (cc?.length === 0) {
      delete errors["cc"];
    }

    if (bcc?.length > 0) {
      let errorObj = validateFormData({ bcc: bcc });

      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    } else if (bcc?.length === 0) {
      delete errors["bcc"];
    }

    const finalPayload = {
      ...payloadForValidation,
      bcc,
      cc,
      district_uuid: params?.funderId,
      license_uuid:params?.licenseId

    };

    Object.keys(errorObj).length === 0 &&
      dispatch(sendEmailsToContacts({ body: finalPayload, token: token }));
  };

  useEffect(() => {
    dispatch(getEmailTemplate({ token: token }));
  }, []);

  useEffect(() => {
    if (code === 200) {
      setEmailBody({ ...emailBody, subject: "", cc: "", bcc: "" });
    }
  }, [code]);

  return (
    <>
      <Box marginTop="6">
        <form onSubmit={handleSendEmail}>
          <Label1 name="emailTemplate" mb="2">
            Select an Email Template Below
          </Label1>

          <Box w={{ base: "100%", md: "22rem" }}>
            <SingleSelect2
              id="emailTemplate"
              onChange={handleChange}
              name="subject"
              value={emailBody?.subject}
              placeholder="Select an Email Template"
              optionsProps={emailTemplatesData}
              displayKey={"subject"}
              optionValue={"subject"}
            />
          </Box>

          {!emailBody?.subject ? (
            <ErrorText textStyle="p" mx="2">
              {errors?.subject}
            </ErrorText>
          ) : null}

          <Flex marginTop="4">
            <Box>
              <Inputs
                id="emailCc"
                label={"CC:"}
                type="text"
                name="cc"
                onChange={handleChange}
                value={emailBody?.cc}
                error={errors?.cc && errors?.cc}
              />
            </Box>
            <Box marginLeft="10">
              <Inputs
                id="emailBcc"
                label={"BCC:"}
                type="text"
                name="bcc"
                onChange={handleChange}
                value={emailBody?.bcc}
                error={errors?.bcc && errors?.bcc}
              />
            </Box>
            <Box mt="5">
              <PositiveButton
                type="submit"
                mt="10"
                text="Send Email"
                bg="#65a30d"
                isLoading={loading}
              />
            </Box>
          </Flex>
        </form>

        <Flex>
          <Spacer />
          <Box>
            <AddNewContacts />
          </Box>
        </Flex>
        <Box>
          <ContactsList
            ContactsCC={CCValues}
            errorObjValues={errors}
            setErrors={setErrors}
          />
        </Box>
      </Box>
    </>
  );
};

export default LicenseContacts;
