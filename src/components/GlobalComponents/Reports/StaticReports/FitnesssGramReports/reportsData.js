const date = new Date();

const year = date.getFullYear();

export const reportFilterData = {
  mainHeading: "REPORT FILTERS",
  subHeading: "SELECT STUDENTS",

  inputFilesList: [
    {
      id: 1,
      placeholder: "SELECT SCHOOL YEAR",
      lable: "SCHOOL YEAR",
      name: "school_year",
      type: "select",
      options: [
        {
          lable: `${year - 2} - ${year - 1}`,
          value: `${`${year - 2} - ${year - 1}`}`,
        },

        { lable: `${year - 1} - ${year}`, value: `${`${year - 1} - ${year}`}` },

        { lable: `${year} - ${year + 1}`, value: `${`${year} - ${year + 1}`}` },
      ],
    },

    {
      id: 2,
      placeholder: "SELECT SCHOOL",
      lable: "SCHOOL",
      name: "school",
      type: "select",
      options: [
        { lable: `1 Of 3 Selected`, value: `1 Of 3 Selected` },

        { lable: `2 Of 3 Selected`, value: `2 Of 3 Selected` },

        { lable: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
      ],
    },

    {
      id: 3,
      placeholder: "SELECT CLASS",
      lable: "CLASS",
      name: "class_name",
      type: "select",
      options: [
        { lable: `1 Of 3 Selected`, value: `1 Of 3 Selected` },

        { lable: `2 Of 3 Selected`, value: `2 Of 3 Selected` },

        { lable: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
      ],
    },

    {
      id: 4,
      placeholder: "Select All",
      lable: "GRADE",
      name: "grade",
      type: "select",
      options: [
        { lable: "Kindergarten", value: "K" },
        { lable: "First Grade", value: 1 },
        { lable: "Second Grade", value: 2 },
        { lable: "Third Grade", value: 3 },
        { lable: "Fourth Grade", value: 4 },
        { lable: "Fifth Grade", value: 5 },
        { lable: "Sixth Grade", value: 6 },
        { lable: "Seventh Grade", value: 7 },
        { lable: "Eighth Grade", value: 8 },
        { lable: "Ninth Grade", value: 9 },
        { lable: "Tenth Grade", value: 10 },
        { lable: "Eleventh Grade", value: 11 },
        { lable: "Twelth Grade", value: 12 },
        { lable: "Adult", value: "Adult" },
      ],
    },
    {
      id: "5",
      lable: "SEX ASSIGNED AT BIRTH",
      placeholder: "Select All",
      name: "gender",
      type: "select",
      options: [
        { lable: "Male", value: "M" },
        { lable: "Female", value: "F" },
      ],
    },

    {
      id: "6",
      lable: "SEARCH STUDENT",
      placeholder: "Search Student here",
      name: "student_search",
      type: "text",
    },

    {
      id: "7",
      lable: "SELECT ASSESMENTS",
      placeholder: "",
      name: "assesments",
      type: "text",
    },

    {
      id: 8,
      placeholder: "TEST TYPE",
      lable: "TEST TYPE",
      name: "test_type",
      type: "select",
      options: [
        { lable: `Pre Test`, value: `Pre Test` },

        { lable: `Post Test`, value: `Post Test` },

        { lable: `Other`, value: `Other` },
      ],
    },
  ],
};
