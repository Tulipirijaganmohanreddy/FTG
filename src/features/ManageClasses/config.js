export const manageClassesCardDetails = [
  { key: "Class Name", value: "Coach Bard HS Period 3" },
  { key: "Class 1D", value: "Hspae" },
  { key: "Start Date", value: "08/02/2022" },
  { key: "End Date", value: "08/02/2023" },
  { key: "Students", value: "38" },
  { key: "Status", value: "in Progress" },
];

export const manageClassesData = {
  title: "MANAGE CLASSES",
  details: [
    { id: 1, name: "school_uuid", type: "select", lable: "School" },
    {
      id: 2,
      name: "teacher_uuid",
      type: "select",
      lable: "Teacher	",
    },
    {
      id: 3,
      name: "status",
      type: "select",
      lable: "Status",
      placeholder: "Select Status",
      options: ["Not Started", "Completed", "In Progress"],
    },
  ],
};

export const classData = {
  title: "Coach Bard HS Period 3",
  addTeacherToClass: "Add Teacher to Class",
  classDetails: [
    {
      id: 1,
      Id: "className",
      lable: "Class Name*",
      name: "class_name",
      type: "text",
    },
    {
      id: 2,
      Id: "classStartDate",
      lable: "Start Date*",
      name: "start_date",
      type: "date",
    },
    {
      id: 3,
      Id: "classEndDate",
      lable: "End Date*",
      name: "end_date",
      type: "date",
    },
    {
      id: 4,
      Id: "school",
      lable: "Select School*",
      name: "schoolUuid",
      type: "select",
    },
    {
      id: 5,
      Id: "classId",
      lable: "Class ID*",
      name: "local_identifier",
      type: "text",
    },
    {
      id: 6,
      Id: "classStatus",
      name: "status",
      type: "select",
      lable: "Status*",
      placeholder: "Select Status",
      options: ["Not Started", "Completed", "In Progress"],
    },
  ],
  teachers: {
    title: "Teachers",
    list: ["kumar", "surya", "Ram Charan"],
  },
};

export const classTableData = {
  tableName: "Class Roster",
  actions: [
    // "Action",
    "Assign",
    "Unassign",
    "Active	Login",
    "Deactivate login",
    // "Delete User",
    "Merge Users ",
  ],
  actionValues: ["Assign", "Unassign", "activate", "deactivate", "merge"],
  addStudentoClass: "Add Student to Class",
  tableColumns: [
    "Student Name",

    "Student ID ",
    "Birth Date ",
    "Grade ",
    "Sex at Birth ",
    "Login Status",
  ],
  rows: [
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
    {
      rowData: ["John", "AS00001", "01/15/2007 ", "10", "M", "Active"],
    },
  ],
};

export const addClassModalData = {
  title: "Add New Class",

  classDetails: [
    {
      id: 1,
      Id: "className",
      lable: "Class Name*",
      name: "class_name",
      type: "text",
    },
    {
      id: 2,
      Id: "classId",
      lable: "Class ID*",
      name: "local_identifier",
      type: "text",
    },
    {
      id: 3,
      Id: "classStartDate",
      lable: "Start Date*",
      name: "start_date",
      type: "date",
    },
    {
      id: 4,
      Id: "classEndDate",
      lable: "End Date*",
      name: "end_date",
      type: "date",
    },
    {
      id: 5,
      Id: "school",
      lable: "Select School*",
      name: "schoolUuid",
      type: "select",
    },
  ],
};

export const addStudentModalData = {
  title: "Add Student to Class",
  studentDetails: [
    {
      lable: "User Last Name",
      inputType: "input",
    },
    {
      lable: "This role",
      inputType: "text",
    },
    {
      lable: "At School",
      inputType: "text",
    },
    ,
    {
      lable: "Add Class",
      inputType: "select",
      options: ["1", "2", "3", "4"],
    },
    ,
  ],
};
