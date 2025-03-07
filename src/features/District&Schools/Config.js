export const districtListData = {
  title: "DISTRICTS",
  districtTableHeaders: [
    "District Name",
    "City",
    "State",
    "Zip Code",
    "License(s)",
    "4-Digit District Code",
  ],

  DistrictLookup: {
    title: "DISTRICT LOOKUP",
    subtitle: "Add New District",
    subHead: "Filter",
    filterFields: [
      {
        id: "districtName",
        label: "District Name",
        inputType: "select",
        placeholder: "Enter District Name",
        isrequired: "true",
        name: "district_name",
      },

      {
        id: "districtSsoId",
        label: "4-Digit District Code",
        inputType: "text",
        placeholder: "Enter District Code",
        isrequired: "false",
        name: "district_sso_id",
      },
      {
        id: "districtZipcode",
        label: "Zip Code",
        inputType: "text",
        placeholder: "Enter Zip Code",
        isrequired: "false",
        name: "zipcode",
      },
      {
        id: "schoolName",

        label: "School Name",
        inputType: "text",
        placeholder: "Enter School Name",
        isrequired: "true",
        name: "school_name",
      },
      {
        id: "districtIdentifier",
        label: "District Identifier",
        inputType: "text",
        placeholder: "Enter District Identifier",
        isrequired: "true",
        name: "local_identifier",
      },
      {
        id: "districtState",
        label: "State",
        inputType: "select",
        placeholder: "Start typing the state name...",
        isrequired: "true",
        name: "state",
      },
    ],
    positiveBtnText: "Apply",
    negativeBtnText: "Clear",
  },
  addNewDistrictData: {
    title: "Add New District",
    subHead: `<b>Note</b>: if District/Entity is the same as the school (private
    school, after school program, etc), use the "
    <b>Add as a school and District</b>" button`,
    radioBtnText1: "Add as District Only",
    radioBtnText2: "Add as a School and District",

    addNewDistrictFields: [
      {
        id: "1",
        Id: "districtName",
        label: "Entity Name*:",
        placeholder: "",
        name: "district_name",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "2",
        Id: "districtAddress1",
        label: "Address 1:",
        placeholder: "",
        name: "address_1",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "3",
        Id: "districtAddress2",
        label: "Address 2:",
        placeholder: "",
        name: "address_2",
        inputType: "text",
        isDisabled: false,
      },

      {
        id: "4",
        Id: "districtEmail",
        label: "Email:",
        placeholder: "",
        name: "email",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "5",
        Id: "districtPhone1",
        label: "Phone 1:",
        placeholder: "",
        name: "phone_1",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "6",
        Id: "districtPhone2",
        label: "Phone 2:",
        placeholder: "",
        name: "phone_2",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "7",
        Id: "schoolLocalIdentifier",
        label: "School Local Identifier:",
        placeholder: "",
        name: "local_identifier",
        inputType: "text",
        isDisabled: false,
      },

      {
        id: "8",
        Id: "ssoId",
        label: "SSO ID:",
        placeholder: "",
        name: "sso_id",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "9",
        Id: "schoolStartDate",
        label: "School Year Start Date*:",
        placeholder: "",
        name: "school_start_date",
        inputType: "text",
      },
      {
        id: "10",
        Id: "districtCity",
        label: "City:",
        placeholder: "",
        name: "city",
        inputType: "text",
        isDisabled: false,
      },

      {
        id: "11",
        Id: "districtState",
        label: "State*:",
        placeholder: "",
        name: "state",
        inputType: "select",
        // options: statesData.states,
      },

      {
        id: "12",
        Id: "districtIdentifier",
        label: "District Identifier:",
        placeholder: "",
        name: "local_identifier",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "13",
        Id: "districtZipcode",
        label: "Zip Code*:",
        placeholder: "",
        name: "zipcode",
        inputType: "text",
        isDisabled: false,
      },
      {
        id: "14",
        Id: "sisVendor",
        label: "SIS Vendor:",
        placeholder: "",
        name: "sis_vendor",
        inputType: "select",
        isDisabled: false,
      },
      {
        id: "15",
        Id: "ssoIdentifyingField",
        label: "SSO Identifying Field:",
        placeholder: "",
        name: "sso_identify_field",
        inputType: "select",
        options: [
          { value: "All Schools", label: "All Schools" },
          { value: "Greenlight Elementary", label: "Greenlight Elementary" },
          { value: "Greenlight HighSchool", label: "Greenlight HighSchool" },
        ],
      },
    ],
    positiveBtnText: "Save",
    negativeBtnText: "Cancel",
  },
};

export const districtData = {
  details: [
    {
      id: "districtName",
      lable: "District Name*:",
      inputType: "text",
      name: "district_name",
    },
    {
      id: "districtIdentifier",
      lable: "District Identifier:",
      inputType: "text",
      name: "local_identifier",
    },
    {
      id: "districtSsoId",
      lable: "SSO ID:",
      inputType: "text",
      name:"sso_id",
    },
    {
      id: "districtEmail",
      lable: "Email:",
      inputType: "email",
      name: "email",
    },
    {
      id: "districtPhone1",
      lable: "Phone 1:",
      inputType: "text",
      name: "phone_1",
    },
    {
      id: "districtPhone2",
      lable: "Phone 2:",
      inputType: "text",
      name: "phone_2",
    },
    {
      id: "districtAddress1",
      lable: "Address1:",
      inputType: "text",
      name: "address_1",
    },
    {
      id: "districtAddress2",
      lable: "Address2:",
      inputType: "text",
      name: "address_2",
    },
    {
      id: "districtCity",
      lable: "City:",
      inputType: "text",
      name: "city",
    },
    {
      id: "districtState",
      lable: "State*:",
      inputType: "select",
      name: "state",
    },
    {
      id: "districtZipcode",
      lable: "Zip Code*:",
      inputType: "text",
      name: "zipcode",
    },
    {
      id: "schoolStartDate",
      lable: "School Year Start Date*:",
      inputType: "date",
      name: "school_start_date",
    },
    {
      id: "sisVendor",
      lable: "SIS Vendor",
      inputType: "select",
      name: "sis_vendor",
    },
  ],
  administrators: "Administrators",

  superAdminDistrictDetails: [
    {
      id: "1",
      Id: "districtName",
      lable: "District Name*:",
      placeholder: "",
      name: "district_name",
      inputType: "text",
    },
    {
      id: "2",
      Id: "internalId",
      lable: "District Internal ID*:",
      placeholder: "",
      name: "internal_id",
      inputType: "text",
    },
    {
      Id: "schoolStartDate",
      lable: "School Year Start Date*:",
      inputType: "date",
      name: "school_start_date",
    },

    {
      id: "4",
      Id: "districtIdentifier",
      lable: "District Identifier:",
      placeholder: "",
      name: "local_identifier",
      inputType: "text",
    },
    {
      id: "5",
      Id:'ssoId',
      lable: "SSO ID:",
      placeholder: "",
      name:"sso_id",
      inputType: "text",
    },
    {
      id: "6",
      Id:'districtSsoId',
      lable: "4-Digit District Code*:",
      placeholder: "",
      name: "district_sso_id",
      inputType: "text",
      isDisabled: true,
    },
    {
      id: "7",
      Id:'districtEmail',
      lable: "Email:",
      placeholder: "",
      name: "email",
      inputType: "text",
    },
    {
      id: "8",
      Id:'districtAddress1',
      lable: "Address 1:",
      placeholder: "",
      name: "address_1",
      inputType: "text",
    },
    {
      id: "9",
      Id:'districtAddress2',
      lable: "Address 2:",
      placeholder: "",
      name: "address_2",
      inputType: "text",
    },
    {
      id: "10",
      Id:'districtCity',
      lable: "City:",
      placeholder: "",
      name: "city",
      inputType: "text",
    },
    {
      id: "11",
      Id:'districtState',
      lable: "State*:",
      placeholder: "",
      name: "state",
      inputType: "select",
      options: "",
    },
    {
      id: "12",
      Id:'districtZipcode',
      lable: "Zip Code*:",
      placeholder: "",
      name: "zipcode",
      inputType: "text",
    },

    {
      id: "13",
      Id:'districtPhone1',
      lable: "Phone 1:",
      placeholder: "",
      name: "phone_1",
      inputType: "text",
    },
    {
      id: "14",
      Id:'districtPhone1',
      lable: "Phone 2:",
      placeholder: "",
      name: "phone_2",
      inputType: "text",
    },
    {
      id: "15",
      Id:'ssoUserProperty',
      lable: "SSO User ID Property:",
      placeholder: "",
      name: "sso_user_id_property",
      inputType: "text",
    },
    {
      id: "16",
      Id:'ssoIdentifyingField',
      lable: "SSO Identifying Field:",
      placeholder: "",
      name: "sso_identify_field",
      inputType: "select",
    },

    {
      id: "17",
      Id:'sisVendor',
      lable: "SIS Vendor:",
      placeholder: "",
      name: "sis_vendor",
      inputType: "select",
    },

    // { id: "18", lable: "Administrators" },
  ],

  sis_vendor_options: [
    { label: "Aloe Softwared", value: "Aloe Softwared" },
    { label: "Apta Software", value: "Apta Software" },
    { label: "AuditWare", value: "AuditWare" },
    { label: "Campus-Online", value: "Campus-Online" },
    { label: "CELT", value: "CELT" },
    { label: "Century Ltd", value: "Century Ltd" },
    { label: "Certica Solutions", value: "Certica Solutions" },
    { label: "CPI School", value: "CPI School" },
    { label: "Data Team Systems", value: "Data Team Systems" },
    { label: "DataDriven for Schools", value: "DataDriven for Schools" },
    { label: "eScholar", value: "eScholar" },
    { label: "ESP Solutions Group", value: "ESP Solutions Group" },
    { label: "eSped", value: "eSped" },
    { label: "FOCUS School Software", value: "FOCUS School Software" },
    { label: "h51 Software", value: "h51 Software" },
    { label: "Hayes Software", value: "Hayes Software" },
    { label: "Imagine Schools", value: "Imagine Schools" },
    { label: "Infinite Campus", value: "Infinite Campus" },
    { label: "iTCCS", value: "iTCCS" },
    { label: "K12 Systems Inc", value: "K12 Systems Inc" },
    { label: "Neighborhood Centers", value: "Neighborhood Centers" },
    { label: "Pentamation", value: "Pentamation" },
    { label: "PowerSchool", value: "PowerSchool" },
    {
      label: "ProLogic Tech/TEAMS (PTSTEAMS)",
      value: "ProLogic Tech/TEAMS (PTSTEAMS)",
    },
    { label: "Responsive Education", value: "Responsive Education" },
    { label: "Sci Learning", value: "Sci Learning" },
    { label: "Skyward", value: "Skyward" },
    { label: "Sleek Software", value: "Sleek Software" },
    { label: "SMS Power School", value: "SMS Power School" },
    { label: "Software Technologies", value: "Software Technologies" },
    { label: "SunGard", value: "SunGard" },
    { label: "Texas School Tools", value: "Texas School Tools" },
    { label: "TxEIS", value: "TxEIS" },

    { label: "Tyler Technologies", value: "Tyler Technologies" },
    {
      label: "WebSmart JR3 Education Associates",
      value: "WebSmart JR3 Education Associates",
    },
    { label: "xID", value: "xID" },
  ],
};

export const addAdministrator = {
  title: "Add Administrator",
  popUpTitle: "Add District Administrator",
  addNewUserText: "Add a new user",
  positiveBtnText: "Submit",
  negativeBtnText: "Cancel",
};

export const schoolList = {
  title: "SCHOOLS",
  subHead: "Participating Schools",
  tableHeaders: ["SchoolName", "School ID", "License(s)"],
  addSchoolTitle: "Add School to District ",
  addSchoolFields: [
    {
      id: "1",
      Id:'districtName',
      label: "District Name*",
      inputType: "select",
      placeholder: "Enter District Name",
      // isrequired: "true",
      name: "district_uuid",
    },

    {
      id: "2",
      Id:'schoolName',
      label: "Entity Name*:",
      placeholder: "",
      name: "school_name",
      inputType: "text",
    },
    {
      id: "3",
      Id:'schoolLocalIdentifier',
      label: "Local Identifier:",
      placeholder: "",
      name: "local_identifier",
      inputType: "text",
    },

    {
      id: "4",
      Id:'schoolEmail',
      label: "Email:",
      placeholder: "",
      name: "email",
      inputType: "text",
    },

    {
      id: "5",
      Id:'schoolPhone1',
      label: "Phone 1:",
      placeholder: "",
      name: "phone_1",
      inputType: "text",
    },
    {
      id: "6",
      Id:'schoolPhone2',
      label: "Phone 2:",
      placeholder: "",
      name: "phone_2",
      inputType: "text",
    },
    {
      id: "7",
      Id:'schoolAddress1',
      label: "Address 1:",
      placeholder: "",
      name: "address_1",
      inputType: "text",
    },
    {
      id: "8",
      Id:'schoolAddress2',
      label: "Address 2:",
      placeholder: "",
      name: "address_2",
      inputType: "text",
    },
    {
      id: "9",
      Id:'ssoId',
      label: "SSO ID:",
      placeholder: "",
      name: "sso_id",
      inputType: "text",
    },
    {
      id: "10",
      Id:'schoolCity',
      label: "City:",
      placeholder: "",
      name: "city",
      inputType: "text",
    },
    {
      id: "11",
      Id:'schoolState',
      label: "State*:",
      placeholder: "",
      name: "state",
      inputType: "select",
    },
    {
      id: "12",
      Id:'schoolZipcode',
      label: "Zip Code*:",
      placeholder: "",
      name: "zipcode",
      inputType: "text",
    },
  ],
  positiveBtnText: "Save",
  negativeBtnText: "Cancel",
};
export const schoolData = {
  title: "GreenLight Elementary",
  addAdministrator: "Add Administrator",
  details: [
    {
      id: "1",
      Id:'schoolName',
      head: "School Name*:",
      placeholder: "",
      name: "school_name",
      inputType: "text",
    },
    {
      id: "2",
      Id:'schoolLocalIdentifier',
      head: "School ID:",
      placeholder: "",
      name: "local_identifier",
      inputType: "text",
    },
    {
      id: "3",
      Id:'ssoId',
      head: "SSO ID:",
      placeholder: "",
      name:"sso_id",
      inputType: "text",
    },
    {
      id: "4",
      Id:'schoolAddress1',
      head: "Address 1:",
      placeholder: "",
      name: "address_1",
      inputType: "text",
    },
    {
      id: "5",
      Id:'schoolAddress2',
      head: "Address 2:",
      placeholder: "",
      name: "address_2",
      inputType: "text",
    },
    {
      id: "6",
      Id:'schoolPhone1',
      head: "Phone 1:",
      placeholder: "",
      name: "phone_1",
      inputType: "text",
    },

    {
      id: "7",
      Id:'schoolPhone2',
      head: "Phone 2:",
      placeholder: "",
      name: "phone_2",
      inputType: "text",
    },

    {
      id: "8",
      Id:'schoolCity',
      head: "City:",
      placeholder: "",
      name: "city",
      inputType: "text",
    },

    {
      id: "9",
      Id:'schoolEmail',
      head: "Email:",
      placeholder: "",
      name: "email",
      inputType: "text",
    },
    {
      id: "10",
      Id:'schoolState',
      head: "State:",
      placeholder: "",
      name: "state",
      inputType: "select",
    },
    {
      id: "11",
      Id:'schoolZipcode',
      head: "Zip Code:",
      placeholder: "",
      name: "zipcode",
      inputType: "text",
    },
  ],
  superAdminFields: [
    {
      id: "1",
      Id:'schoolName',
      head: "School Name*:",
      placeholder: "",
      name: "school_name",
      inputType: "text",
    },
    {
      id: "2",
      Id:'schoolInternalId',
      head: "Internal School ID:",
      placeholder: "",
      name: "school_id",
      inputType: "text",
    },
    {
      id: "3",
      Id:'schoolIdentifier',
      head: "School ID:",
      placeholder: "",
      name: "local_identifier",
      inputType: "text",
    },
    {
      id: "4",
      Id:'ssoId',
      head: "SSO Id:",
      placeholder: "",
      name: "sso_id",
      inputType: "text",
    },
    {
      id: "5",
      Id:'schoolAddress1',
      head: "Address 1:",
      placeholder: "",
      name: "address_1",
      inputType: "text",
    },
    {
      id: "6",
      Id:'schoolAddress2',
      head: "Address 2:",
      placeholder: "",
      name: "address_2",
      inputType: "text",
    },

    {
      id: "7",
      Id:'schoolCity',
      head: "City:",
      placeholder: "",
      name: "city",
      inputType: "text",
    },
    {
      id: "8",
      Id:'schoolState',
      head: "State*:",
      placeholder: "",
      name: "state",
      inputType: "select",
    },

    {
      id: "9",
      Id:'schoolPhone1',
      head: "Phone 1:",
      placeholder: "",
      name: "phone_1",
      inputType: "number",
    },
    {
      id: "10",
      Id:'schoolPhone2',
      head: "Phone 2:",
      placeholder: "",
      name: "phone_2",
      inputType: "number",
    },
    {
      id: "11",
      Id:'schoolEmail',
      head: "Email:",
      placeholder: "",
      name: "email",
      inputType: "text",
    },
    {
      id: "12",
      Id:'schoolZipcode',
      head: "Zip Code*:",
      placeholder: "",
      name: "zipcode",
      inputType: "text",
    },
  ],
  administrators: "Administrators",
  positiveBtnText: "Save",
  negativeBtnText: "Cancel",
};

export const teachersTableData = {
  title: "TEACHERS",
  searchPlaceholder: "Search by Alphabet, Names or User ID",
  addTeacher: "Add Teacher",
  tableColumns: ["ID", "Login Status", "Assigned to Class"],
  rows: [
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
    {
      rowData: ["Basu Raj", "4-637788864563451959", "Active", "Assigned"],
    },
  ],
};
export const addAdministratorData = {
  title: "Add Administrator",
  buttonsList: ["BASIC USER INFORMATION", "MANAGE USER'S ASSIGNMENTS"],

  userDetails: [
    {
      lable: "District Administrator Id*",
      inputType: "text",
      name: "district_administrator_id",
    },

    {
      lable: "Username*",
      inputType: "text",
      name: "user_name",
    },
    {
      lable: "Password*",
      inputType: "text",
      name: "password",
    },
    {
      lable: "Re-enter Password*",
      inputType: "text",
      name: "reenterpassword",
    },
    {
      lable: "First Name*",
      inputType: "text",
      name: "first_name",
    },
    {
      lable: "Last Name*",
      inputType: "text",
      name: "last_name",
    },
    {
      lable: "Middle Initial",
      inputType: "text",
      name: "middle_initial",
    },

    {
      lable: "Email Address",
      inputType: "text",
      name: "email",
    },
    {
      lable: "Alternate Email Address1",
      inputType: "text",
      name: "email_1",
    },
    {
      lable: "Alternate Email Address2",
      inputType: "text",
      name: "email_2",
    },
    {
      lable: "Phone",
      inputType: "text",
      name: "phone",
    },

    {
      lable: "Role",
      inputType: "select",
      options: ["Teacher", "School Admin", "District Admin"],
      name: "selectedRole",
    },
    {
      lable: "SSO ID:",
      inputType: "number",
      name: "sso_id",
    },
    {
      groupLable: "Login Status",

      inputType: "radio",
      group: ["Active", "Inactive"],
      name: "login_status",
    },
  ],
};

export const addTeacherModalData = {
  title: "Add teacher",
  userDetails: [
    {
      lable: "Username Last Name:",
      inputType: "text",
    },
    {
      lable: "This role",
      inputType: "text",
      placeholder: "Teacher",
    },
    {
      lable: "At School",
      inputType: "text",
      placeholder: "GreenLight Elementary",
    },
    {
      lable: "Add School",
      inputType: "select",
      options: ["1", "2", "3"],
    },
  ],
};

export const addSchoolAdminModalData = {
  title: "Add School Administrator",
  addNewUser: "Add a new user",
  userDetails: [
    {
      lable: "Username Last Name:",
      inputType: "text",
    },
    {
      lable: "Add/Remove",
      inputType: "select",
      options: ["1", "2", "3"],
    },
    {
      lable: "At School",
      inputType: "text",
      placeholder: "GreenLight Elementary",
    },
  ],
};
