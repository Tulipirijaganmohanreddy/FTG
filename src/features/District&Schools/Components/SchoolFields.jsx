import { GridItem } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Inputs from "../../../components/FitnessComponents/FitnessSelect/Inputs";
import SingleSelect2 from "../../../components/FitnessComponents/FitnessSelect/SingleSelect2";
import {
  setAddResCode,
  setResponseCode,
  setSchoolWithSchoolAdmin,
} from "../../authentication/components/schoolAdmin/schoolAdminSlice";

import { validateFormData } from "../../../Utilities/FormValidation";
const SchoolFields = (props) => {
  const dispatch = useDispatch();
  const { errors, setErrors, setInputs, inputs, dataSet, setDataSet } = props;

  const params = useParams();
  const navigate = useNavigate();
  const code = useSelector((state) => state.profile.code);
  const schoolUuid = params.schoolId;
  const role = useSelector((state) => state?.profile?.selectedRole);
  const duplicateRole = useSelector((state) => state.profile.duplicateRole);
  const rolesAndPrevilegesObject = useSelector(
    (state) => state?.profile?.rolesAndPrevilegesObject
  );
  const [selectedRole, setSelectedRole] = useState(role);

  


  const getSchoolWithSchoolAdminData = useSelector(
    (state) => state?.schoolAdmin?.SchoolWithSchoolAdmin
  );
  const token = useSelector((state) => state?.profile?.token);

  const statesList = useSelector((state) => state?.districtAdmin?.statesList);

  const handleChange = (e) => {
    const { type, name, value } = e.target;
    const trimmedValue = value.trim();
    if (
      [
        "school_name",
        "address_1",
        "address_2",
        "city",
        "zipcode",
        "phone_1",
        "phone_2",
      ].includes(name)
    ) {
      setInputs({
        ...inputs,
        [name]: value,
      });
    } else {
      setInputs({
        ...inputs,
        [name]: trimmedValue,
      });
    }

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

    if (
      (name === "email" || name === "local_identifier") &&
      !trimmedValue?.length
    ) {
      let obj = { ...errors };
      delete obj[name];
      setErrors({ ...obj });
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const trimmedValue = value.trim();
    setInputs({
      ...inputs,
      [name]: trimmedValue,
    });
  };

  useEffect(() => {
    dispatch(setResponseCode(null));
    dispatch(setAddResCode(null));

    return () => {
      dispatch(setSchoolWithSchoolAdmin({}));
    };
  }, []);
  return (
    <>
      {dataSet?.map((item, index) => {
        return (
          <GridItem w="100%" key={"a" + index}>
            {item.inputType === "select" ? (
              <>
                <SingleSelect2
                  id={item?.Id}
                  placeholder="Select State"
                  label={item?.head}
                  name={item?.name}
                  value={inputs[item?.name]}
                  onChange={handleChange}
                  optionsProps={statesList}
                  displayKey={"state"}
                  optionValue={"code"}
                  error={errors?.[item?.name] && errors?.[item?.name]}
                  disabled={
                    selectedRole !== "superAdmin" ||
                    (rolesAndPrevilegesObject?.["Manage District and Schools"]
                      ?.edit ??
                      true)
                      ? true
                      : false
                  }
                />
              </>
            ) : item.name === "school_id" ? (
              <Inputs
                id={item?.Id}
                label={item.head}
                type={item.inputType}
                onBlur={handleBlur}
                name={item?.name}
                value={inputs[item?.name]}
                onChange={handleChange}
                error={errors?.[item?.name] && errors?.[item?.name]}
                disabled={true}
              />
            ) : item.name === "local_identifier" ? (
              <Inputs
                id={item?.Id}
                label={item.head}
                type={item.inputType}
                onBlur={handleBlur}
                name={item?.name}
                value={inputs[item?.name]}
                onChange={handleChange}
                error={errors?.[item?.name] && errors?.[item?.name]}
                disabled={getSchoolWithSchoolAdminData?.schoolId_disable}
              />
            ) : (
              <Inputs
                id={item?.Id}
                label={item.head}
                type={item.inputType}
                onBlur={handleBlur}
                name={item?.name}
                value={inputs[item?.name]}
                onChange={handleChange}
                error={errors?.[item?.name] && errors?.[item?.name]}
                disabled={
                  selectedRole !== "superAdmin" ||
                  rolesAndPrevilegesObject?.["Manage District and Schools"]
                    ?.edit
                    ? item.name === "school_name" ||
                      item.name === "sso_id" ||
                      item.name === "zipcode"
                      ? true
                      : false
                    : false
                }
              />
            )}
          </GridItem>
        );
      })}
    </>
  );
};

export default SchoolFields;
