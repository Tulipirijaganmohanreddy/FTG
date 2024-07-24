export const ManageMandatesData = {
  title: "Manage Mandates",
  text: "Choose a mandate manage. you may edit existing mandates as well as add new mandates into the system.",
  selectLable: "Status",
  selectOptions: ["Inactive", "Active", "Pending"],
  addMandate: "Add Mandate",
  tableColumns: [
    "Mandate Title",
    "Start Date",
    "End Date",
    "Scope",
    "status",
    "Edit",
    "Delete",
  ],
  noMandatesText: "No Mandates Are Found",
};

export const addMandatesData = {
  title: "Add Mandates",
  editTitle:'Edit Mandate',

  inputFields: [
    {
      id: "1",
      Id:'mandateTitle',
      label: "Mandate Title *",
      name: "title",
      inputType: "text",
    },
    {
      id: "2",
      Id:'MandateStartDate',
      label: "Start Date *",
      name: "start_date",
      inputType: "date",
    },
    {
      id: "3",
      Id:'MandateEndDate',
      label: "End Date *",
      name: "end_date",
      inputType: "date",
    },
    {
      id: "4",
      Id:'MandateRequired',
      label: "Required/Excluded* ",
      name: "required",
      placeholder: "Select Type",
      inputType: "select",
      options: [
        { label: "Required", value: "1" },
        { label: "Excluded", value: "0" },
      ],
    },
    {
      id: "5",
      Id:'MandateTestItems',
      label: "Choose tests to mandate*",
      name: "tests",
      inputType: "select",
    },
    {
      id: "6",
      Id:'MandateSchools',
      label: "Choose Schools*",
      name: "schools",
      inputType: "select",
    },
  ],
 
  positiveBtnText: "Save",
  negativeBtnText: "Cancel",
  editBtnText:'Update'
};
