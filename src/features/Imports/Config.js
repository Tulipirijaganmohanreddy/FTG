export const importData = {
  tabNamesList: [
    {
      id: 1,
      tabTextName: "IMPORT",
    },

    {
      id: 2,
      tabTextName: "MAPPING",
    },

    {
      id: 3,
      tabTextName: "IMPORT HISTORY",
    },
  ],
  subTitle: `You can preview this file before it's imported`,
  errorText: "Please Select Mapping Before Importing",
  fileErrorText: "Please choose csv file only",
  ftpText: "Optional for IT Professionals:",
  subText:
    "	When importing data using FTP, FitnessGram leverages the SFTP protocol with 256 bit AES encryption.",
  subText2:
    "	Data is encrypted in transit and at rest throughout the import process.",
  visit: "Visit",
  link: `https://help.fitnessgram.net/`,
  text: "for more information on importing.",
};

export const mappingData = {
  subText: "Saved import file mappings:",
  columnNames: [
    "Mapping Name",
    "Data set",
    "Last Updated",
    "Download CSV",
    "Delete Mapping",
  ],
};
export const settingsData = {
  title: "Settings",
  modalTitle: "SETTINGS",
  heading: "The Following settings are currently applied for your district:",
  update: {
    name: "Update usernames and passwords:",
    type1: {
      boolean: "Yes",
      text: "Username and passwords for existing teachers and students WILL be updated to match the values from the import file.",
    },
    type2: {
      boolean: "No",
      text: "Username and passwords for existing teachers and students WILL NOT be modified by the import file.",
    },
  },
  typeOfImport: {
    name: "Type of import:",
    type1: {
      boolean: "Add/Update Only",
      text: "Users, classes, and assignments will be created updated, but existing records excluded from the file will not be affected ('Partial' import)",
    },
    type2: {
      boolean: "Add, Update, and Unassign",
      text: "Users, classes, and assignments will be created updated, and existing records excluded from the file will be inactivated ('Full' import) (*If selected, all classes for the school year should be imported) ",
    },
  },
};

export const instructions = {
  title: "Instructions",
  instructionsList: [
    "This feature will allow you to import students, teachers and classes from a Comma Separated Values (CSV) import file. You can also update existing users in the system with information contained in your file. Please see the information below to (1) create your file, (2) create or verify your file mapping, and (3) preview and import your file. Please note: existing test events will not be modified by this import. Once the file is imported additional information can be found below regarding your file import history.",

    "You may also import a OneRoster™ v1.1 zip file. Both bulk and delta processing are supported. Please see the FitnessGram® import documentation for more details.",

    "Prevent duplicate ID numbers: FitnessGram maps ID numbers from your import file to existing students, teachers, and class ID numbers. When these IDs change, they must be changed in FitnessGram as well or duplicate records will be created. If your district has changed SIS vendors, or made large-scale updates to student, teacher, and class IDs, please contact the Help Desk for assistance.",

    
  ],
};

export const FTPData = {
  title: "View FTP credentials for automated imports",
  subTitle: "FTP User Credentials",
};

export const importRollBack = {
  title: "CONFIRM IMPORT ROLLBACK",
  text: [
    "This option allows you to delete all students, teachers, classes, and assignments that were created during this import EXCEPT FOR any records that have associated test event data. This will NOT undo any updates the import made to existing records",
    "with the exception of reactivating records that were marked for deletion.",
  ],
  caution: "Are you sure want to continue?",
};

export const CreateNewMappingData = {
  title: "IMPORT",
  text1:
    "Set up an import based on the file created by your district's Student Information System.",
  text2:
    "Map the data fields and save them to be used whenever data needs to be updated.",
  sideHeading: "CREATE CSV IMPORT FIELD MAP",
  step1: "Choose a data set",
  step1Options: [
    {
      id: 1,
      lable: "School, Teacher, Class, Student",
      name: "school_teacher_class_student",
    },
    {
      id: 2,
      lable: "School, Teacher, Class",
      name: "school_teacher_class",
    },
    {
      id: 3,
      lable: "School, Student",
      name: "school_student",
    },
    {
      id: 4,
      lable: "School, Administrator",
      name: "school_Admin",
    },
    ,
  ],
  step2: "Name this mapping:",
  step3: "Upload test Csv (include header row)",
  tableName: "MAP DATA FIELDS",
  tableColumns: ["FitnessGram System Data Field", "Data Format", "MapTo"],
  rowData: ["School ID", "50 Characters", "select"],
  errorText: "Name is required",
  errorText2: "Please choose csv file only",
};

export const createTableData = {
  schoolTeacherClassStudentDataFeilds: [
    {
      data_feild: "School ID *",
      data_format: "50 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Student ID *",
      data_format: "50 Characters",
      name: "StudentID",
    },
    {
      data_feild: "Student First Name *",
      data_format: "35 Characters",
      name: "StudentFirstName",
    },
    {
      data_feild: "Student Last Name *",
      data_format: "35 Characters",
      name: "StudentLastName",
    },
    {
      data_feild: "Student Middle Initial",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Student Nickname",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Student Birth Date *",
      data_format: "8 Date (MM/DD/YY)",
      name: "StudentBirthdate",
    },
    {
      data_feild: "Student Grade *",
      data_format: "10 Characters",
      name: "StudentGrade",
    },
    {
      data_feild: "Student Sex Assigned At Birth *",
      data_format: "1 Characters",
      name: "StudentGender",
    },
    {
      data_feild: "Student Ethnicity",
      data_format: "100 Numbers",
      name: "SchoolID",
    },
    {
      data_feild: "Student User Name *",
      data_format: "60 Characters",
      name: "StudentUsername",
    },
    {
      data_feild: "Student Password *",
      data_format: "100 Characters",
      name: "StudentPassword",
    },
    {
      data_feild: "Student Report Email",
      data_format: "128 Characters",
      name: "StudentReportEmail",
    },
    {
      data_feild: "Student SSO ID",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Student Print Body Comp",
      data_format: "1 Characters",
      name: "SchoolID",
    },

    {
      data_feild: "Parent Report Email1",
      data_format: "128 Characters",
      name: "ParentReportEmail1",
    },

    {
      data_feild: "Parent Report Email2",
      data_format: "128 Characters",
      name: "ParentReportEmail2",
    },

    {
      data_feild: "Student Print Report In Spanish",
      data_format: "1 Characters",
      name: "SchoolID",
    },

    {
      data_feild: "Student Permanent Exemption Code",
      data_format: "1 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Student Is Active",
      data_format: "1 Characters",
      name: "SchoolID",
    },

    {
      data_feild: "Class Name *",
      data_format: "100 Characters",
      name: "ClassName",
    },

    {
      data_feild: "Class Id *",
      data_format: "100 Characters",
      name: "ClassID",
    },
    {
      data_feild: "Class Description",
      data_format: "255 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Class Start Date *",
      data_format: "8 Date (MM/DD/YY)",
      name: "ClassStartDate",
    },
    {
      data_feild: "Class End Date *",
      data_format: "8 Date (MM/DD/YY)",
      name: "ClassEndDate",
    },
    {
      data_feild: "Teacher Id *",
      data_format: "50 Characters",
      name: "TeacherID",
    },
    {
      data_feild: "Teacher First Name *",
      data_format: "35 Characters",
      name: "TeacherFirstName",
    },
    {
      data_feild: "Teacher Last Name *",
      data_format: "35 Characters",
      name: "TeacherLastName",
    },
    {
      data_feild: "Teacher Middle Initial",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Teacher NickName",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Teacher User Name *",
      data_format: "60 Characters",
      name: "TeacherUserName",
    },
    {
      data_feild: "Teacher Password *",
      data_format: "100 Characters",
      name: "TeacherPassword",
    },
    {
      data_feild: "Teacher Email",
      data_format: "128 Characters",
      name: "TeacherEmail",
    },
    {
      data_feild: "Teacher SSO ID",
      data_format: "35 Characters",
      name: "SchoolID",
    },
    {
      data_feild: "Teacher Is Active",
      data_format: "1 Characters",
      name: "SchoolID",
    },
  ],
  schoolTeacherClassDataFeilds: [
    {
      data_feild: "School ID *",
      data_format: "50 Characters",
    },
    {
      data_feild: "Teacher Id *",
      data_format: "50 Characters",
    },
    {
      data_feild: "Teacher First Name *",
      data_format: "35 Characters",
    },
    {
      data_feild: "Teacher Middle Initial",
      data_format: "35 Characters",
    },
    {
      data_feild: "Teacher Last Name *",
      data_format: "35 Characters",
    },
    {
      data_feild: "Teacher NickName",
      data_format: "35 Characters",
    },
    {
      data_feild: "Teacher User Name *",
      data_format: "60 Characters",
    },
    {
      data_feild: "Teacher Password *",
      data_format: "100 Characters",
    },
    {
      data_feild: "Teacher SSO ID",
      data_format: "35 Characters",
    },
    {
      data_feild: "Teacher Email",
      data_format: "128 Characters",
    },
    {
      data_feild: "Class Id *",
      data_format: "100 Characters",
    },
    {
      data_feild: "Class Name *",
      data_format: "100 Characters",
    },
    {
      data_feild: "Class Start Date *",
      data_format: "8 Date (MM/DD/YY)",
    },
    {
      data_feild: "Class End Date *",
      data_format: "8 Date (MM/DD/YY)",
    },
    {
      data_feild: "Class Description",
      data_format: "255 Characters",
    },
  ],
};
export const HistoryTableData = {
  subHead: "FILE IMPORT HISTORY FOR THE LAST 30 DAYS",
  columnNames: [
    "File Name",
    "File Download",
    "Import ID",
    "Start Date",
    "End Date",
    "Status",
    "Errors",
    "Students",
    "Teachers",
    "Admins",
    "Deactivations",
    "Classes",
  ],
};
