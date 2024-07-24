import { Box, Center, Divider, Flex } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import { debounce } from "../../../Utilities/utils";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import MultiSelector from "../../../components/FitnessComponents/FitnessSelect/MultiSelector";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading from "../../../components/FitnessComponents/FitnessTexts/Heading";
import LoadingComponent from "../../../components/GlobalComponents/LoadingComponent";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  getDistrictsForRoleChange,
  getNewSSOConfig,
  getSSOConfigById,
  getUpdatedSSOConfigById,
  setSsoConfigDataById,
} from "../../../store/slices/superAdminSlice/superAdminSlice";

import { ssoConfigData } from "../Config";
import OAuth2 from "./OAuth2";
import OpenIdConnect from "./OpenIdConnect";
import WSFederation from "./WSFederation";

const CreateSSO = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const districts = useSelector(
    (state) => state?.superAdmin?.districtsForChangeRole
  );
  const {
    title,
    addSso,
    authenticationProtocolTypes,
    subTitle,
    positiveBtnText,
    protocolObj,
    negativeBtnText,
  } = ssoConfigData;

  const loading = useSelector((state) => state?.superAdmin?.loading);
  const upLoading = useSelector((state) => state?.profile?.upLoading);

  const token = useSelector((state) => state?.profile?.token);

  const userId = useSelector((state) => state?.profile?.userId);

  const selectedRole = useSelector((state) => state.profile.selectedRole);
  const previousPath = useSelector((state) => state.profile.previousPath);

  const ssoConfigDataById = useSelector(
    (state) => state?.superAdmin?.ssoConfigDataById
  );

  const [authorizationProtocol, setAuthorizationProtocol] =
    useState("WS-Federation");

  const [districtsList, setDistrictsList] = useState([]);

  const [selectedDistrict, setSelectedDistrict] = useState();

  const [errors, setErrors] = useState({});

  const [ssoConfigObj, setSsOConfigObj] = useState(
    protocolObj[authorizationProtocol]
  );

  const handleProtocol = (event) => {
    setAuthorizationProtocol(event.target.value);

    setSsOConfigObj(protocolObj[event.target.value]);

    setErrors({});
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setSsOConfigObj((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    let errorObj = validateFormData({
      [name]: trimmedValue,
    });

    if (Object.keys(errorObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };
  const handleBlur = (event) => {
    const { name, value } = event.target;
    const trimmedValue = value.trim();
    setSsOConfigObj((prevState) => ({
      ...prevState,
      [name]: trimmedValue,
    }));
  };

  const handleDistricts = (districts) => {
    if (districts?.length > 1 && districts[0].label == "All") {
      setSelectedAudience([districts?.[1]]);

      setInputFields((prevState) => ({
        ...prevState,
        primary_audience_name: [audienceList[1]?.value],
      }));
    } else {
      let all_value = null;

      if (districts?.length) {
        for (let district of districts) {
          if (district.label == "All") {
            all_value = district;
            break;
          }
        }
      }

      if (all_value) {
        setSelectedDistrict([all_value]);
        setSsOConfigObj((prevState) => ({
          ...prevState,
          district_uuid: all_value.value,
        }));
      } else {
        setSelectedDistrict(districts);
        setSsOConfigObj((prevState) => ({
          ...prevState,
          district_uuid: districts?.map((districts) => districts.value),
        }));
      }
    }

    let errorObj = validateFormData({
      district_uuid: districts,
    });

    if (Object.keys(errorObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    } else {
      let obj = { ...errors };
      delete obj["district_uuid"];
      setErrors({ ...obj });
    }
  };

  const handleInputChange = debounce((text) => {
    const body = {
      search: text,
    };
    text?.length > 3 && dispatch(getDistrictsForRoleChange({ token, body }));
  }, 500);

  const validateData = (event) => {
    event.preventDefault();

    const {
      created_by,
      authorization_protocol,
      caption,
      enable_state,
      enable_nonce,
      authentication_type,
      metadata_url,
      callback_url,
      app_id_url,
      discovery_url,
      issuer,
      authorization_url,
      token_url,
      user_info_url,
      user_info_http_type,
      user_info_response_type,
      user_id_property,
      fitness_gram_sso_field,
      district_id_property,
      Json_web_key_set_url,
      url_path,
      client_id,
      client_secret,
      response_type,
      response_mode,
      scope,
      ...finalPayload
    } = ssoConfigObj;

    let errorObj = validateFormData(finalPayload);

    if (Object.keys(errorObj).length) {
      setErrors((prevState) => ({
        ...prevState,
        ...errorObj,
      }));
    } else {
      if (params?.userId) {
        const { created_by, ...finalPayload } = ssoConfigObj;

        const removed_districts =
          ssoConfigDataById?.[0].districts
            ?.filter((each) =>
              finalPayload?.district_uuid?.every((item) => each?.uuid !== item))?.map((newItem) => newItem?.uuid) || [];

        const add_districts =
          finalPayload?.district_uuid?.filter((each) =>
            ssoConfigDataById?.[0].districts?.every(
              (item) => each !== item?.uuid
            )
          ) || [];

        const payload = {
          updated_by: userId,
          ...finalPayload,
          removed_districts,
          add_districts,
        }


        dispatch(
          getUpdatedSSOConfigById({
            id: params?.selectedSSOID,
            body: payload,
            token: token,
          })
        )

      } else {
        dispatch(getNewSSOConfig({ body: ssoConfigObj, token: token }));
      }
    }
  };

  useEffect(() => {
    if (districts?.length) {
      let arr = districts.map((district) => ({
        label: district?.district_name,
        value: district?.uuid,
      }));
      setDistrictsList(arr);
    } else {
      setDistrictsList([]);
    }
  }, [districts]);

  useEffect(() => {
    const body = {
      search: "",
    };

    !districts?.length && dispatch(getDistrictsForRoleChange({ token, body }));

    if (params?.userId) {
      dispatch(
        getSSOConfigById({ selectedSSOID: params?.selectedSSOID, token })
      );
    }

    return () => {
      dispatch(setSsoConfigDataById(null));
    };
  }, []);

  useEffect(() => {
    if (params?.userId) {
      setAuthorizationProtocol(ssoConfigDataById?.authorization_protocol);

      setSsOConfigObj(protocolObj[ssoConfigDataById?.authorization_protocol]);

      if (ssoConfigDataById?.[0]?.districts?.length) {
        let districts = ssoConfigDataById?.[0].districts?.map((district) => ({
          label: district?.district_name,
          value: district?.uuid,
        }));
        setSelectedDistrict(districts);

        setSsOConfigObj((prevState) => ({
          ...prevState,
          district_uuid: ssoConfigDataById?.[0]?.districts?.map(
            (districts) => districts.uuid
          ),
        }));
      }
    }
  }, [ssoConfigDataById]);

  useEffect(() => {
    if (params?.userId) {
      Object.keys(ssoConfigObj)?.forEach((key) => {
        setAuthorizationProtocol(
          ssoConfigDataById?.[0]?.authorization_protocol
        );
        setSsOConfigObj((ssoConfigObj) => ({
          ...ssoConfigObj,
          client_id: ssoConfigDataById?.[0]?.client_id,
          configuration_name: ssoConfigDataById?.[0]?.configuration_name,
          discovery_url: ssoConfigDataById?.[0]?.discovery_url,
          fitness_gram_sso_field:
            ssoConfigDataById?.[0]?.fitness_gram_sso_field,
          district_id_property: ssoConfigDataById?.[0]?.district_id_property,

          enable_nonce: ssoConfigDataById?.[0]?.enable_nonce,
          enable_state: ssoConfigDataById?.[0]?.enable_state,
          issuer: ssoConfigDataById?.[0]?.issuer,
          metadata_url: ssoConfigDataById?.[0]?.metadata_url,
          response_type: ssoConfigDataById?.[0]?.response_type ?? "",
          scope: ssoConfigDataById?.[0]?.scope ?? "",
          token_url: ssoConfigDataById?.[0]?.token_url,
          url_path: ssoConfigDataById?.[0]?.url_path,
          user_id_property: ssoConfigDataById?.[0]?.user_id_property,
          user_info_http_type: ssoConfigDataById?.[0]?.user_info_http_type,
          user_info_response_type:
            ssoConfigDataById?.[0]?.user_info_response_type,
          user_info_url: ssoConfigDataById?.[0]?.user_info_url,
          authorization_url: ssoConfigDataById?.[0]?.authorization_url,
          callback_url: ssoConfigDataById?.[0]?.callback_url,
          app_id_url: ssoConfigDataById?.[0]?.app_id_url,
          authentication_type: ssoConfigDataById?.[0]?.authentication_type,
          caption: ssoConfigDataById?.[0]?.caption,
          client_secret: ssoConfigDataById?.[0]?.client_secret,
        }));
      });
    } else {
      setSsOConfigObj((prevState) => ({
        ...prevState,
        authorization_protocol: authorizationProtocol,
        created_by: userId,
      }));
    }
  }, [ssoConfigDataById, params?.userId, userId, authorizationProtocol]);

  return (
    <>
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <Flex marginTop="1rem">
            <Box>
              <Heading>{title}</Heading>
            </Box>
          </Flex>
          <Divider borderColor="gray" />

          <form onSubmit={validateData}>
            <Flex
              // border='2px'
              marginTop="5"
              mx="5"
              display={{ base: "flex flex-col", md: "flex", lg: "flex" }}
              justifyContent={"space-between"}
            >
              <Flex flexDirection={"column"} gap="3" w={"50%"}>
                <SingleSelect2
                  id={"authorizationProtocol"}
                  placeholder="Select "
                  label={"Authorization Protocol*:"}
                  name={"authorization_protocol"}
                  value={authorizationProtocol}
                  onChange={handleProtocol}
                  optionsProps={authenticationProtocolTypes}
                  displayKey={"label"}
                  optionValue={"value"}
                  error={
                    errors?.["authorization_protocol"] &&
                    errors?.["authorization_protocol"]
                  }
                />

                <Inputs
                  label={"Configuration Name*:"}
                  id="configurationName"
                  type="text"
                  background="#F5F9FF"
                  rounded="lg"
                  w={{ base: "100%", md: "90%", lg: "90%" }}
                  border="none"
                  name="configuration_name"
                  value={ssoConfigObj?.configuration_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={
                    errors?.["configuration_name"] &&
                    errors?.["configuration_name"]
                  }
                />

                <MultiSelector
                  id="districtName"
                  label={"District(s)*"}
                  name="districts"
                  options={districtsList}
                  onInputChange={handleInputChange}
                  onChange={handleDistricts}
                  value={selectedDistrict}
                  error={
                    errors?.["district_uuid"] ? errors?.["district_uuid"] : ""
                  }
                />
              </Flex>

              {authorizationProtocol === "WS-Federation" ? (
                <WSFederation
                  ssoConfigObj={ssoConfigObj}
                  setSsOConfigObj={setSsOConfigObj}
                  errors={errors}
                  setErrors={setErrors}
                />
              ) : authorizationProtocol === "OAuth2" ? (
                <OAuth2
                  ssoConfigObj={ssoConfigObj}
                  setSsOConfigObj={setSsOConfigObj}
                  errors={errors}
                  setErrors={setErrors}
                />
              ) : authorizationProtocol === "OpenId Connect" ? (
                <OpenIdConnect
                  ssoConfigObj={ssoConfigObj}
                  setSsOConfigObj={setSsOConfigObj}
                  errors={errors}
                  setErrors={setErrors}
                />
              ) : null}
            </Flex>
            <Center mt="2rem" gap="4">
              <NegativeButton
                onClick={() => {
                  dispatch(setSsoConfigDataById(null));
                  previousPath
                    ? navigate(previousPath)
                    : navigate(`/role/${selectedRole}/SSOConfigMain`);
                }}
                text={negativeBtnText}
              />

              <PositiveButton
                type="submit"
                text={"Save"}
                bg="#19A617"
                isLoading={upLoading}
              />
            </Center>
          </form>
        </>
      )}
    </>
  );
};

export default CreateSSO;
