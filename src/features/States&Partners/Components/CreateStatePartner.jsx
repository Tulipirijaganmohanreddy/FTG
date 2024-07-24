import { Box, Divider, Flex, Grid } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { validateFormData } from "../../../Utilities/FormValidation";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import Heading1 from "../../../components/FitnessComponents/FitnessTexts/Heading1";
import NegativeButton from "../../../components/NegativeButton";
import PositiveButton from "../../../components/PositiveButton";
import {
  addState,
  getStateByIdApiCall,
  setStatePartnerDataByID,
  updateStateByIdApiCall,
} from "../../../store/slices/superAdminSlice/superAdminSlice";
import StatePartnersDetails from "./StatePartnersDetails";
import { statesPartnersData } from "../Config";

const CreateStatePartner = () => {
  const { createTitle, negativeBtnText } = statesPartnersData;
  const dispatch = useDispatch();

  const navigate = useNavigate("");

  const token = useSelector((state) => state?.profile?.token);

  const userRole = useSelector((state) => state.profile.selectedRole);
  const loading = useSelector((state) => state.profile.upLoading);

  const statePartnerDataByID = useSelector(
    (state) => state?.superAdmin?.statePartnerDataByID
  );

  const params = useParams();

  const [data, setData] = useState({
    state_name: "",
    type: "",
    state_sso_id: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setData({
      ...data,
      [name]: value,
    });

    let errorObj = validateFormData({ [name]: trimmedValue });

    if (Object.keys(errorObj)?.length) {
      setErrors({ ...errorObj });
    } else {
      delete errors[name];
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setData({
      ...data,
      [name]: trimmedValue,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const { state_sso_id, ...payload } = data;

    let errorObj = validateFormData(payload);
    setErrors({ ...errorObj });

    if (Object.keys(errorObj)?.length === 0) {
      try {
        if (params?.userId && params?.selectedItemId) {
          dispatch(
            updateStateByIdApiCall({
              body: data,
              token,
              stateId: params?.selectedItemId,
            })
          );
        } else {
          const { state_sso_id, ...finalPayload } = data;

          dispatch(addState({ body: finalPayload, token: token }));
        }
      } catch (error) {}
    }
  };

  const handleClear = () => {
    navigate(`/role/${userRole}/StatesPartners`);
  };

  useEffect(() => {
    dispatch(setStatePartnerDataByID(null));

    if (params?.userId) {
      dispatch(getStateByIdApiCall({ stateId: params?.selectedItemId, token }));
    }
  }, [params]);

  useEffect(() => {
    setData((prevState) => ({
      ...prevState,
      state_name: statePartnerDataByID?.state_name,
      type: statePartnerDataByID?.type,
      state_sso_id: statePartnerDataByID?.state_sso_id,
    }));
  }, [statePartnerDataByID]);

  return (
    <>
      <Box>
        <Flex direction="column" gap="2" m={{ base: "0", md: "4" }}>
          <Heading1>
            {params?.userId && params?.selectedItemId
              ? statePartnerDataByID?.state_name
              : createTitle}{" "}
          </Heading1>

          <Divider marginTop="3" borderColor="gray" />

          <form onSubmit={handleSubmit}>
            <Grid
              templateColumns={{
                base: "repeat(1, 1fr)",
              }}
              gap="3"
            >
              <Flex
                direction="column"
                gap="5"
                w={{ base: "100%", md: "20rem" }}
              >
                <Inputs
                  id={"creationName"}
                  label={"Name (use abbrevation for states)*:"}
                  type="text"
                  placeholder="Enter Partner Name"
                  background="#F5F9FF"
                  rounded="lg"
                  border="none"
                  name={"state_name"}
                  value={data?.state_name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isDisabled={
                    params?.userId && params?.selectedItemId
                      ? data?.type === "state"
                        ? true
                        : false
                      : null
                  }
                  error={errors?.["state_name"] && errors?.["state_name"]}
                />

                <SingleSelect2
                  id="creationType"
                  label={"Type:"}
                  placeholder="Select"
                  background="#F5F9FF"
                  border="none"
                  name="type"
                  value={data?.type}
                  onChange={handleChange}
                  optionsProps={
                    params?.userId && params?.selectedItemId
                      ? data?.type === "state"
                        ? [{ label: "State", value: "state" }]
                        : [{ label: "Partner", value: "partner" }]
                      : [{ label: "Partner", value: "partner" }]
                  }
                  displayKey={"label"}
                  optionValue={"value"}
                  isDisabled={
                    params?.userId && params?.selectedItemId ? true : false
                  }
                  error={errors?.["type"] && errors?.["type"]}
                />

                {params?.userId && params?.selectedItemId && (
                  <>
                    <Box mt="1" w={{ base: "100%", md: "20rem" }}>
                      <Inputs
                        id="createdSsoId"
                        label="4-Digit Code"
                        type="text"
                        background="#F5F9FF"
                        placeholder="e.g. wysx"
                        border="none"
                        name="state_sso_id"
                        value={data?.state_sso_id}
                        isDisabled={true}
                        onChange={handleChange}
                        size={{ base: "sm", lg: "md", md: "md" }}
                      />
                    </Box>
                  </>
                )}
              </Flex>
            </Grid>
            <Box
              display="flex"
              gap="2rem"
              mt="1.5rem"
              ml={{ base: "0.8rem", md: "3rem" }}
            >
              <NegativeButton text={negativeBtnText} onClick={handleClear} />
              <PositiveButton
                type="submit"
                text={
                  params?.userId && params?.selectedItemId
                    ? "Update"
                    : "Create Partner"
                }
                bg="#27A617"
                px={{base:'10rem',md:'4rem',lg:'4rem' }}
                py="1rem"
              
                isLoading={loading}
              />
            </Box>
          </form>
        </Flex>

        {params?.userId && params?.selectedItemId && <StatePartnersDetails />}
      </Box>
    </>
  );
};

export default CreateStatePartner;
