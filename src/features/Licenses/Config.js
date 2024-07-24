export const licenseFields = {
  title: "LICENSES",
  createText: "Create New License",
  subHead: "DISTRICTS",
  exportText: "Export Licenses",
  filterFields: [
    {
      id: "1",
      Id: "licenseFunderName",
      label: "Funder Name",
      name: "funder_name",
      inputType: "multiselect",
      placeholder: "Start Typing funder name",
    },
    {
      id: "2",
      name: "funder_type",
      Id: "licenseFunderType",
      label: "Funder Type",
      inputType: "checkbox",
      placeholder: "Enter Funder Type",
      options: [
        { value: "state", label: "State" },
        { value: "district", label: "District" },
        { value: "partner", label: "Partner" },
        { value: "school", label: "School" },
      ],
    },
    {
      id: "3",
      Id: "licenseStatus",
      name: "login_status",
      label: "License Status",
      inputType: "checkbox",
      options: [
        {
          value: "Pending",
          label: "Pending",
        },
        {
          value: "Active",
          label: "Active",
        },
        {
          value: "Inactive",
          label: "Inactive",
        },
      ],
    },
    {
      id: "4",
      name: "district_name",
      label: "District Name",
      inputType: "text",
      placeholder: "Enter District Name",
    },
  ],
  positiveBtnText: "Apply",
  negativeBtnText: "Cancel",
  tableHeaders: [
    "Funder",
    "Funder Type",
    "Status",
    "State",
    "Schools Licensed / Total",
    "Start Date",
    "End Date",
  ],
};

export const CreateLicenseData = {
	title: "CREATE LICENSE",

	LicenseFields: [
		{
			label: "Funder Name*",
			id: "licenseFunderName",
			name: "funder_name",
			inputType: "multiselect",
			placeholder: "Start Typing funder name",
		},

		{
			id: "licenseStartDate",
			label: "Start Date*",
			name: "start_date",
			inputType: "date",
			// value: startDate,
		},
		{
			id: "licenseSchoolLimit",
			label: "School Limit*",
			name: "school_limit",
			inputType: "number",
			placeholder: "",
		},

		{
			label: "License Name*",
			id: "licenseName",
			name: "license_name",
			inputType: "text",
		},

		{
			id: "licenseEndDate",
			label: "End Date*",
			name: "end_date",
			inputType: "date",
		},
		{
			id: "LicenseCategory",
			label: "Category*",
			name: "category",
			inputType: "radio",
		},
	],
	createBtnText: "Create License",
	addDistrict: "Add New District/School",
	negativeBtnText: "Cancel",
};

export const updateLicenseData = {
	LicenseFields: [
		{
			id: 1,
			label: "ID",
			Id: "licenseId",
			name: "id",
			inputType: "text",
			isDisabled: "true",
		},

		{
			id: 2,
			Id: "licenseSchoolLimit",
			label: "School Limit*",
			name: "school_limit",
			inputType: "number",
			placeholder: "",
			isrequired: "true",
		},

		{
			id: 3,
			Id: "licenseFunderName",
			label: "Funder Name*",
			name: "funder_name",
			inputType: "text",
			placeholder: "Start Typing funder name",
			isDisabled: "true",
		},

		{
			label: "License Name*",
			id: "licenseName",
			name: "license_name",
			inputType: "text",
			isDisabled: "true",
		},

		{
			id: 4,
			Id: "licenseNotes",
			label: "Notes*",
			name: "notes",
			inputType: "textArea",
			isrequired: "true",
		},

		{
			id: 5,
			Id: "licenseStartDate",
			label: "Start Date*",
			name: "start_date",
			inputType: "date",
			isrequired: "true",
		},

		{
			id: 6,
			Id: "licenseEndDate",
			label: "End Date*",
			name: "end_date",
			inputType: "date",
			isrequired: "true",
		},
		{
			id: 7,
			Id: "LicenseCategory",
			label: "Category*",
			name: "category",
			inputType: "radio",
			isrequired: "true",
		},
	],
	checkboxText: "Change the End Date to all the Licenses?",
};

export const licenseSchoolData = {
  tableHeaders: [
    "School",
    "District",
    "State",
    "Status",
    "Start Date",
    "End Date",
    "Delete",
  ],
  statePartnersTable: [
    "District",
    "State",
    "Status",
    "Start Date",
    "End Date",
    "Delete",
  ],
  schoolTableHeaders: [
    "School",
    "District",
    "State",

    // "Delete"
  ],
  schoolDatesFields: [
    {
      id: "1",
      Id: "licenseStartDate",
      label: "Start Date:",
      placeholder: "",
      name: "license_start_date",
      inputType: "date",
    },
    {
      id: "2",
      Id: "licenseStartDate",
      label: "End Date:",
      placeholder: "",
      name: "license_end_date",
      inputType: "date",
    },
  ],
};

export const licenseContactsData = {
  filterRolesDropdown: {
    partner: [
      {
        id: "1",
        label: "Filter By Role",
        value: "",
      },

      {
        id: "2",
        label: "Partner",
        value: "partner",
      },

      {
        id: "3",
        label: "School Admin",
        value: "schoolAdmin",
      },

      {
        id: "4",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],

    district: [
      {
        id: "1",
        label: "Filter By Role",
        value: "",
      },

      {
        id: "2",
        label: "School Admin",
        value: "schoolAdmin",
      },

      {
        id: "3",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],

    state: [
      {
        id: "1",
        label: "Filter By Role",
        value: "",
      },

      {
        id: "2",
        label: "School Admin",
        value: "schoolAdmin",
      },

      {
        id: "3",
        label: "District Admin",
        value: "districtAdmin",
      },

      {
        id: "4",
        label: "State Admin",
        value: "stateAdmin",
      },
    ],

    school: [
      {
        id: "1",
        label: "Filter By Role",
        value: "",
      },

      {
        id: "2",
        label: "School Admin",
        value: "schoolAdmin",
      },

      {
        id: "3",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],
  },
  roleObj: {
    partner_role: " Partner ",
    school_admin_role: " School Admin ",
    district_admin_role: " District Admin ",
    state_admin_role: " State Admin ",
  },
  roleValuesObj: {
    partner_role: "partner",
    school_admin_role: "schoolAdmin",
    district_admin_role: "districtAdmin",
    state_admin_role: "stateAdmin",
  },
  districtStateNamesObj: {
    district_name: "District : ",

    state_name: "State : ",
  },
  // New Contacts data
  rolesListBasedOnFunderType: {
    district: [
      {
        id: "1",
        label: "School Admin",
        value: "schoolAdmin",
      },
      {
        id: "2",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],

    state: [
      {
        id: "1",
        label: "State Admin",
        value: "stateAdmin",
      },

      {
        id: "2",
        label: "School Admin",
        value: "schoolAdmin",
      },
      {
        id: "3",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],

    partner: [
      {
        id: "1",
        label: "Partner",
        value: "partner",
      },

      {
        id: "2",
        label: "School Admin",
        value: "schoolAdmin",
      },
      {
        id: "3",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],

    school: [
      {
        id: "1",
        label: "School Admin",
        value: "schoolAdmin",
      },
      {
        id: "2",
        label: "District Admin",
        value: "districtAdmin",
      },
    ],
  },
  optionsList: {
    districtAdmin: "district_name",

    stateAdmin: "state_name",

    partner: "state_name",

    schoolAdmin: "school_name",
  },
};
