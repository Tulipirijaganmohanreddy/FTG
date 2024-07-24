import {
  Box,
  ButtonGroup,
  Center,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  Input,
  Spacer,
  Spinner,
  Text,
} from "@chakra-ui/react";
import JoditEditor from "jodit-react";
import React, { useEffect, useState } from "react";
import { HiDownload } from "react-icons/hi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import Label1 from "../../../components/FitnessComponents/FitnessTexts/Lable1";
import Paragraph2new from "../../../components/FitnessComponents/FitnessTexts/Paragraph2new";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import TextIcon from "../../../components/TextIcon";
import {
  getViewResource,
  setMessage,
  setPreviousPath,
} from "../../../store/slices/profileSlice";
import {
  addCMSEmailTemplateResource,
  getAllSubjects,
  getCMSAudienceList,
  getCMSContent,
  getCMSTestsLists,
  getDeletedCMSContentById,
  getUpdatedCMSContent,
  getUpdatedEmailTemplate,
  setCurrentCMSContent,
  setNewSubject,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import { addCMSData } from "../Config";
import SubjectPopUp from "./SubjectPopUp";

const AddCMS = () => {
  const {
    allowedFileTypes,
    categoryOptions,
    addContent_smartCoachResources,
    addContent_EmailTemplates,
    addTitle,
    editTitle,
    note,
    download,
    positiveBtnText,
    negativeBtnText,
  } = addCMSData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const loading = useSelector((state) => state.profile.upLoading);
  const exportLoading = useSelector((state) => state.profile.loading2);
  const selectedRole = useSelector((state) => state?.profile?.selectedRole);
  const token = useSelector((state) => state?.profile?.token);
  const userId = useSelector((state) => state?.profile?.userId);
  const code = useSelector((state) => state?.profile?.code);
  const code2 = useSelector((state) => state?.profile?.code2);

  const previousPath = useSelector((state) => state.profile.previousPath);

  const {
    category,
    title,
    status,
    subject,
    publish_date,
    expired_date,
    primary_audience_name,
    assessment_name,
    test_name,
    file_url,
    uuid,
    html_content,
    url,
  } = useSelector((state) => state?.superAdmin?.currentCMSContent);

  const CMSTestsList = useSelector((state) => state?.superAdmin?.testsList);
  const CMSAudienceList = useSelector(
    (state) => state?.superAdmin?.audienceList
  );
  const subjectsResponse = useSelector(
    (state) => state?.superAdmin?.getSubjects
  );

  const [popup, setPopup] = useState(false);
  const [audience, setAudience] = useState([]);
  const [selectedAudience, setSelectedAudience] = useState([]);
  const [errors, setErrors] = useState({});
  const [inputFields, setInputFields] = useState([]);
  const [inputObjects, setInputObjects] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [testItems, setTestItems] = useState([]);

  const initEmailTemplateFields = {
    category: "Email Templates",
    title: "",
    subject: "",
    status: "active",
    primary_audience_name: "All",
    publish_date: "",
    expired_date: "",
    file_url: "",
    html_content: "",
  };
  const initSmartCoachResourcesFields = {
    category: "Smart Coach Resources",
    title: "",
    status: "active",
    subject: "",
    publish_date: "",
    expired_date: "",
    primary_audience_name: [],
    assessment_name: "",
    test_name: "",
    file_url: "",
    html_content: "",
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    if (categoryValue === "Smart Coach Resources" || categoryValue === "All") {
      setInputFields(initSmartCoachResourcesFields);
      setInputObjects(addContent_smartCoachResources);
    } else if (categoryValue === "Email Templates") {
      setInputFields(initEmailTemplateFields);
      setInputObjects(addContent_EmailTemplates);
      setSelectedAudience([]);
    }

    setErrors({});
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    if (name === "title" && inputFields.category === "Email Templates") {
      setInputFields({ ...inputFields, subject: value });
    }
    if (e.target.name === "file_url") {
      const selectedFile = e.target.files[0];
      if (allowedFileTypes.includes(selectedFile.type)) {
        setInputFields({ ...inputFields, [e.target.name]: e.target.files[0] });
      } else {
        dispatch(setMessage("The Selected File type is not supported!"));
      }
    } else {
      setInputFields((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
    if (name != "expired_date") {
      const errorsObj = validateFormData({
        [name]: trimmedValue,
      });

      if (Object.keys(errorsObj).length) {
        setErrors((prevState) => ({
          ...prevState,
          ...errorsObj,
        }));
      } else {
        let obj = { ...errors };
        delete obj[name];
        setErrors({ ...obj });
      }
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setInputFields({ ...inputFields, [name]: trimmedValue });
  };

  const handlePrimaryAudience = (audienceList) => {
    if (audienceList?.length > 1 && audienceList[0].label == "All") {
      setSelectedAudience([audienceList?.[1]]);

      setInputFields((prevState) => ({
        ...prevState,
        primary_audience_name: [audienceList[1]?.value],
      }));
    } else {
      let all_value = null;

      if (audienceList?.length) {
        for (let audience of audienceList) {
          if (audience.label == "All") {
            all_value = audience;
            break;
          }
        }
      }

      if (all_value) {
        setSelectedAudience([all_value]);
        setInputFields((prevState) => ({
          ...prevState,
          primary_audience_name: all_value.value,
        }));
      } else {
        setSelectedAudience(audienceList);
        setInputFields((prevState) => ({
          ...prevState,
          primary_audience_name: audienceList?.map(
            (audience) => audience.value
          ),
        }));
      }
    }
  };

  const validateData = (event) => {
    event.preventDefault();

    let getAudienceList = [];
    for (let i in selectedAudience) {
      getAudienceList.push(selectedAudience[i].value);
    }

    var formData = new FormData();
    // formData.append("primary_audience_name", getAudienceList);

    const {
      comments,
      test_name,
      assessment_name,
      status,
      html_content,
      primary_audience,
      expired_date,

      ...payload
    } = inputFields;

    inputFields?.category === "Smart Coach Resources" &&
      inputFields?.url &&
      delete payload["file_url"];

    uuid?.length && delete payload["url"];

    let errorObj = validateFormData(payload);

    setErrors((prevState) => ({
      ...prevState,
      ...errorObj,
    }));

    for (var key in inputFields) {
      if (
        (["assessment_name"].includes(key) && inputFields[key] === undefined) ||
        (["assessment_name"].includes(key) && inputFields[key] === "")
      ) {
        formData.append(key, "common");
      } else if (
        (key === "test_name" && inputFields[key] === undefined) ||
        (key === "test_name" && inputFields[key] === "")
      ) {
        formData.append(key, "all");
      } else if (
        key === "primary_audience_name" &&
        inputFields?.category === "Smart Coach Resources"
      ) {
        formData.append(key, getAudienceList);
      } else {
        formData.append(key, inputFields[key]);
      }
    }

    if (uuid?.length > 0) {
      formData.append("updated_by", userId);
      formData.append("updater_role", selectedRole);
      formData.append("language", "");
      if (category === "Smart Coach Resources") {
        if (Object.keys(errorObj).length === 0) {
          if (previousPath === location.pathname || previousPath === null) {
            dispatch(setPreviousPath(`/role/${selectedRole}/CMS`));
          }
          dispatch(
            getUpdatedCMSContent({
              body: formData,
              token,
              contentId: uuid,
            })
          );
        }
      } else {
        if (
          Object.keys(errorObj).length === 0 ||
          (Object.keys(errorObj).length === 1 &&
            Object.keys(errorObj)[0] === "file_url")
        ) {
          if (previousPath === location.pathname || previousPath === null) {
            dispatch(setPreviousPath(`/role/${selectedRole}/CMS`));
          }
          dispatch(
            getUpdatedEmailTemplate({
              body: formData,
              token,
              contentId: uuid,
            })
          );
        }
      }
    } else {
      if (inputFields?.category === "Email Templates") {
        formData.append("created_by", userId);
        formData.append("creater_role", selectedRole);
        formData.append("language", "");

        if (
          Object.keys(errorObj).length === 0 ||
          (Object.keys(errorObj).length === 1 &&
            Object.keys(errorObj)[0] === "file_url")
        ) {
          if (previousPath === location.pathname || previousPath === null) {
            dispatch(setPreviousPath(`/role/${selectedRole}/CMS`));
          }
          dispatch(addCMSEmailTemplateResource({ body: formData, token }));
        }
      } else {
        if (Object.keys(errorObj).length === 0) {
          formData.append("created_by", userId);
          formData.append("creater_role", selectedRole);
          formData.append("language", "");

          if (previousPath === location.pathname || previousPath === null) {
            dispatch(setPreviousPath(`/role/${selectedRole}/CMS`));
          }
          dispatch(getCMSContent({ body: formData, token }));
        }
      }
    }
  };

  useEffect(() => {
    if (subjectsResponse?.length) {
      let subjectOptions = subjectsResponse.map((item) => {
        return { label: item.name, value: item.name };
      });

      setSubjects(subjectOptions);
    } else {
      setSubjects([]);
    }
  }, [subjectsResponse]);

  useEffect(() => {
    if (CMSTestsList?.length) {
      let testOptions = [];
      let testArr = CMSTestsList.map((item) => {
        testOptions.push({ label: item.test_name, value: item.name });
        return item.name;
      });
      testOptions.unshift({ label: "All", value: testArr });

      setTestItems(testOptions);
    }
  }, [CMSTestsList]);

  const handleCancel = () => {
    navigate(`/role/${selectedRole}/CMS`);
    dispatch(setCurrentCMSContent(null));
  };

  const handleDelete = () => {
    dispatch(getDeletedCMSContentById({ id: uuid, token: token }));
  };

  const getFileNameFromUrl = (url) => {
    const segments = url.split("/");
    return segments[segments.length - 1];
  };

  const handleFileDownload = (url) => {
    // window.open(url, "_blank");
    const filePath = encodeURIComponent(url?.split(".com/")[1]);

    dispatch(
      getViewResource({ token, filePath, isDownload: "true", module: "cms" })
    );
  };
  const handleUrlDocumentView = (url) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    if (category === "Email Templates") {
      setInputFields({
        ...initEmailTemplateFields,
        category,
        title,
        status,
        subject,
        publish_date,
        expired_date,
        primary_audience_name,
        file_url,
        html_content,
        url,
      });
    } else {
      setInputFields({
        ...initSmartCoachResourcesFields,
        category,
        title,
        status,
        subject,
        publish_date,
        expired_date,
        primary_audience_name,
        assessment_name,
        test_name,
        file_url,
        html_content,
        url,
      });
    }

    if (primary_audience_name?.length > 0) {
      const audience_list = primary_audience_name?.split(",");
      for (let audience in audience_list) {
        setSelectedAudience((selectedAudience) => [
          ...selectedAudience,
          { label: audience_list[audience], value: audience_list[audience] },
        ]);
      }
    } else {
      setSelectedAudience([]);
    }

    if (category === "Email Templates") {
      setInputObjects(addContent_EmailTemplates);
    } else {
      setInputObjects(addContent_smartCoachResources);
    }
    category && setPopup(true);
  }, [category]);

  useEffect(() => {
    dispatch(getAllSubjects({ token: token }));
    dispatch(getCMSTestsLists());
    dispatch(getCMSAudienceList());

    return () => {
      dispatch(setNewSubject(""));
      dispatch(setCurrentCMSContent({}));
    };
  }, []);

  useEffect(() => {
    if (code === 200) {
      dispatch(getAllSubjects({ token: token }));
    }
  }, [code]);

  useEffect(() => {
    if (CMSAudienceList?.length) {
      let convertAudienceList = []; // Adjust the font size as per your requirement
      const result = CMSAudienceList?.map((item, key) => {
        convertAudienceList?.push({
          value: item.Value,
          label: item.Role_name,
        });
        return item.Value;
      });
      convertAudienceList.unshift({ label: "All", value: result });
      // setSelectedAudience([{ label: "All", value: 'all' }]);
      setAudience(convertAudienceList);
    } else {
      setAudience([]);
    }
  }, [CMSAudienceList]);
  const customStyles = {
    control: (provided) => ({
      ...provided,
      fontSize: "14px", // Adjust the font size as per your requirement
    }),
  };

  const handleFileUploadLable = () => {
    if (inputFields?.category === "Smart Coach Resources") {
      if (inputFields?.url) {
        return <Label1 name="fileUpload">File Upload</Label1>;
      }
      return <Label1 name="fileUpload">File Upload*</Label1>;
    }
    return <Label1 name="fileUpload">File Upload</Label1>;
  };

  return (
    <Flex gap="2" direction={"column"}>
      <Flex display={{ base: "flex flex-col", md: "flex", lg: "flex" }}>
        {" "}
        {popup === true ? (
          <>
            <Box>
              <Heading1>{editTitle}</Heading1>
            </Box>
            <Spacer />
            <Box role="button">
              <TextIcon
                text="Delete"
                changeIconColor="red"
                icon={RiDeleteBin5Line}
                onClick={() => handleDelete()}
              ></TextIcon>
            </Box>
          </>
        ) : (
          <>
            <Box>
              <Heading1>{addTitle}</Heading1>
            </Box>
            <Spacer />
            <Box
              display={{ base: "none", md: "block" }}
              ml={{ md: "0", lg: "0" }}
            >
              {" "}
              <SubjectPopUp />
            </Box>
          </>
        )}
      </Flex>
      {!popup ? (
        <Box display={{ base: "flex", md: "none" }} justifyContent={"end"}>
          <SubjectPopUp />
        </Box>
      ) : null}
      <Divider borderColor="gray" />
      <form onSubmit={validateData}>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap="3"
        >
          <Box>
            <SingleSelect2
              id={"category"}
              label={"Category*:"}
              name={"category"}
              placeholder="Select Category"
              value={inputFields.category}
              optionsProps={categoryOptions}
              displayKey={"label"}
              optionValue={"value"}
              onChange={handleCategoryChange}
              error={errors?.category && errors?.category}
            />
          </Box>

          {inputObjects?.map((item, index) => {
            return (
              <GridItem colSpan="1" key={"a" + index}>
                {item.inputType === "select" && item.name === "status" && (
                  <SingleSelect2
                    id={item?.Id}
                    label={item.label}
                    name={item?.name}
                    value={inputFields[item?.name]}
                    optionsProps={item.options}
                    displayKey={"label"}
                    optionValue={"value"}
                    onChange={handleChange}
                    error={errors?.[item?.name] && errors?.[item?.name]}
                  />
                )}
                {item.inputType === "select" &&
                  item.name === "test_name" &&
                  item.name !== "status" &&
                  inputFields?.assessment_name?.includes(["fitnessGram"]) && (
                    <SingleSelect2
                      id={item?.Id}
                      label={item.label}
                      name={item?.name}
                      value={inputFields[item?.name]}
                      optionsProps={testItems}
                      displayKey={"label"}
                      optionValue={"value"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  )}

                {item.inputType === "select" &&
                  item.name !== "test_name" &&
                  item.name !== "status" &&
                  item.name !== "assessment_name" && (
                    <SingleSelect2
                      id={item?.Id}
                      placeholder="Select"
                      label={item.label}
                      name={item?.name}
                      value={inputFields[item?.name]}
                      optionsProps={
                        item.name === "subject" ? subjects : item?.options
                      }
                      displayKey={"label"}
                      optionValue={"value"}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  )}

                {item.inputType === "select" &&
                  item.name !== "test_name" &&
                  item.name !== "status" &&
                  item.name === "assessment_name" && (
                    <Box>
                      <SingleSelect2
                        id={item?.Id}
                        label={item.label}
                        name={item?.name}
                        value={inputFields[item?.name]}
                        optionsProps={item.options}
                        displayKey={"label"}
                        optionValue={"value"}
                        onChange={handleChange}
                        error={errors?.[item?.name] && errors?.[item?.name]}
                        placeholder="Select"
                      />
                    </Box>
                  )}
                {item.inputType === "text" && (
                  <Box>
                    <Inputs
                      id={item?.Id}
                      type={"text"}
                      label={item.label}
                      onBlur={handleBlur}
                      name={item?.name}
                      value={inputFields[item?.name]}
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}

                {item.inputType === "multiselect" && (
                  <Box>
                    <MultiSelector
                      id={item?.Id}
                      label={item.label}
                      name="primary_audience_name"
                      options={audience}
                      onChange={handlePrimaryAudience}
                      value={selectedAudience}
                      error={
                        errors?.primary_audience_name
                          ? errors?.primary_audience_name
                          : ""
                      }
                    />
                  </Box>
                )}
                {item.inputType === "date" && (
                  <Box>
                    <Inputs
                      id={item?.Id}
                      type={"date"}
                      label={item.label}
                      name={item?.name}
                      onBlur={handleBlur}
                      min={
                        item?.name === "expired_date"
                          ? inputFields.publish_date?.split("T")[0]
                          : null
                      }
                      max={
                        item?.name === "publish_date"
                          ? inputFields.expired_date?.split("T")[0]
                          : null
                      }
                      value={
                        inputFields[item?.name]?.split("T")[0] != null
                          ? inputFields[item?.name]?.split("T")[0]
                          : ""
                      }
                      onChange={handleChange}
                      error={errors?.[item?.name] && errors?.[item?.name]}
                    />
                  </Box>
                )}
              </GridItem>
            );
          })}
        </Grid>
        <Box flex="1" mt="2">
          {" "}
          <Label1 name="description"> Description </Label1>
          {/* <Paragraph2>Description</Paragraph2> */}
          <Box>
            <JoditEditor
              id="description"
              name="html_content"
              value={inputFields?.html_content}
              onBlur={(event) => {
                setInputFields({
                  ...inputFields,
                  html_content: event,
                });
              }}
            />
          </Box>
        </Box>

        <Box mt="5">
          {handleFileUploadLable()}

          <Input
            id="fileUpload"
            type="file"
            name="file_url"
            accept=".xls,.xlsx,.doc,.docx,.ppt,.pptx,.html,.htm,.mpeg,.avi,.mov,.pdf,.mp3,.mp4,.wav,.mpg,.png,.jpg,.gif,.pps"
            onChange={handleChange}
            border="none"
            textStyle={"textHead"}
          />
          <Paragraph2new>{note}</Paragraph2new>

          {uuid?.length && (inputFields?.file_url ?? inputFields?.url) ? (
            <Text
              role="button"
              display="flex"
              onClick={() =>
                inputFields?.file_url
                  ? handleFileDownload(inputFields?.file_url)
                  : handleUrlDocumentView(inputFields?.url)
              }
            >
              <HStack>
                <Text color={"primary"}>{download}</Text>
                {exportLoading ? (
                  <Spinner color="primary" />
                ) : (
                  <HiDownload size={19} fill="#1890ff" />
                )}
              </HStack>
            </Text>
          ) : null}
        </Box>

        {inputFields?.category === "Smart Coach Resources" && (
          <Text color={"red"} textStyle={"textHead"}>
            {errors && errors?.file_url}
          </Text>
        )}
        <Center h={{ base: "3rem", md: "5rem", lg: "5rem" }}>
          {" "}
          <Flex minWidth="max-content" alignItems="center" mt="3" ml="3">
            <ButtonGroup gap={{ base: "1", md: "4", lg: "4" }}>
              <NegativeButton onClick={handleCancel} text={negativeBtnText} />
              <PositiveButton
                type="submit"
                text={positiveBtnText}
                bg="#65a30d"
                isLoading={loading}
              />
            </ButtonGroup>
          </Flex>
        </Center>
      </form>
    </Flex>
  );
};

export default AddCMS;
