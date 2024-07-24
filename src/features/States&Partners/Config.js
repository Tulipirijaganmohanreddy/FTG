export const statesPartnersData = {
  title: "STATES & PARTNERS",
  createTitle: "CREATE PARTNER",
  subHead: "Filter",
  subTitle: "Create New Partner",
  typeOptions: [
    { value: "partner", label: "Partner" },
    { value: "state", label: "State" },
  ],
  licenseStatus: [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "Pending", label: "Pending" },
  ],
  tableHeaders: ["Name", "Type", "State Code", "License(s)", "Status"],
  positiveBtnText: "Apply",
  negativeBtnText: "Cancel",
};

export const adminLicenseData = {
  tabNamesList: [
    {
      id: 1,
      tabTextName: "ADMINISTRATORS",
    },

    {
      id: 2,
      tabTextName: "LICENSES",
    },
  ],
  adminTableHeaders: [
    "Administrator Name",
    " Administrator ID",
    "Email",
    "Phone",
    "Status",
  ],
  licenseTableHeaders: [
    "License Name",
    "Funder Type",
    "Start Date",
    "End Date",
    "Schools Licensed/Total",

    "Status",
  ],
};
