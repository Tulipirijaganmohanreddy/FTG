export const SmartCoach = {
  title: "Available Resources",
  tabsList: [
    {
      id: 1,
      tabTextName: "Recommended",
    },
    {
      id: 2,
      tabTextName: "Test Selection",
    },
  ],
  notAvailableText: "Resources are not found",
};

export const CMSData = {
  title: "CONTENT MANAGEMENT SYSTEM",
  subHead: "Manage on-line help, tooltips, and documentation",
  filter: "FILTER",
  tableHeaders: ["Title", "Category", "Status", "Preview", "Link", "Delete"],
};

export const addCMSData = {
  title: "CMS Category",
  label: "Name of the Subject",
  addTitle: "Add Content",
  editTitle: "Edit Content",
  newSubjectTitle:'Add New CMS Category',
  label2:'Name of the Subject',
  status:'Active',
  status2:'Inactive',
  allowedFileTypes: [
    "application/vnd.ms-excel", // .xls
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/msword", // .doc
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-powerpoint", // .ppt
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "text/html", // .html, .htm
    "video/mpeg", // .mpeg
    "video/avi", // .avi
    "video/quicktime", // .mov
    "application/pdf", // .pdf
    "audio/mpeg", // .mp3
    "video/mp4", // .mp4
    "audio/wav", // .wav
    "video/mpeg", // .mpg
    "image/png", // .png
    "image/jpeg", // .jpg
    "image/gif", // .gif
    "application/vnd.ms-powerpoint", // .pps
  ],
  categoryOptions: [
    {
      label: "Smart Coach Resources",
      value: "Smart Coach Resources",
    },
    {
      label: "Email Templates",
      value: "Email Templates",
    },
  ],
  addContent_smartCoachResources: [
    {
      id: "1",
      Id:'cmsTitle',
      label: "Title*:",
      placeholder: "",
      name: "title",
      inputType: "text",
    },
    {
      id: "2",
      Id:'cmsStatus',
      label: "Status:",
      placeholder: "",
      name: "status",
      inputType: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "3",
      Id:'cmsSubject',
      label: "Subject*:",
      placeholder: "",
      name: "subject",
      inputType: "select",

      labelName: "Subject",
    },
    {
      id: "4",
      Id:'cmsPrimaryAudience',
      label: "Primary Audience*:",
      placeholder: "",
      name: "primary_audience_name",
      inputType: "multiselect",
      // options: audience,
    },

    {
      id: "7",
      Id:'cmsPublishDate',
      label: "Publish Date*:",
      placeholder: "",
      name: "publish_date",
      inputType: "date",
    },
    {
      id: "8",
      Id:'cmsExpiryDate',
      label: "Expiry Date:",
      placeholder: "",
      name: "expired_date",
      inputType: "date",
    },
    {
      id: "9",
      Id:'cmsUrl',
      label: "URL:",
      placeholder: "",
      name: "url",
      inputType: "text",
    },
    {
      id: "5",
      Id:'cmsAssessmentName',
      label: "Assessment:",
      placeholder: "",
      name: "assessment_name",
      inputType: "select",

      labelName: "Assessment",
      options: [
        { label: "Common", value: "common" },
        { label: "FitnessGram", value: "fitnessGram" },
        { label: "ActivityGram", value: "activityGram" },
        { label: "ActivityLog", value: "activityGramLog" },
      ],
    },
    {
      id: "6",
      Id:'cmsTestName',
      label: "Tests:",
      placeholder: "",
      name: "test_name",
      inputType: "select",

      labelName: "TestName",
    },
  ],
  addContent_EmailTemplates: [
    {
      id: "2",
      Id:'emailTemplateTitle',
      label: "Template Title*:",
      placeholder: "",
      name: "title",
      inputType: "text",
    },
    {
      id: "3",
      Id:'emailTemplateSubject',
      label: "Subject*:",
      placeholder: "",
      name: "subject",
      inputType: "text",
    },
    {
      id: "4",
      Id:'emailTemplateStatus',
      label: "Status:",
      placeholder: "",
      name: "status",
      inputType: "select",
      options: [
        { value: "active", label: "Active" },
        { value: "inactive", label: "Inactive" },
      ],
    },
    {
      id: "4",
      Id:'emailTemplateAudience',
      label: "Intended Audience:",
      placeholder: "",
      name: "primary_audience_name",
      inputType: "select",
      options: [
        { value: "admin", label: "Admin" },
        { value: "helpdesk", label: "Help Desk" },
      ],
      labelName: "Intended Audience",
    },
    {
      id: "5",
      Id:'emailTemplatePublishDate',
      label: "Publish Date*:",
      placeholder: "",
      name: "publish_date",
      inputType: "date",
    },
    {
      id: "6",
      Id:'emailTemplateExpiryDate',
      label: "Expiry Date:",
      placeholder: "",
      name: "expired_date",
      inputType: "date",
    },
  ],
  note: "Hint: Only Files with extensions xls, xlsx, doc, docx, ppt, pptx,html, htm, mpeg, avi, mov, pdf, mp3, mp4, wav, mpg, png, jpg, gif,pps are allowed.",
  download: "Download Existing Resource",
  positiveBtnText: "Save",
  negativeBtnText: "Cancel",
  btnText:'Submit'
};

