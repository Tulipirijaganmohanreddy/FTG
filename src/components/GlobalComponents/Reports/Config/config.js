import studentReportImg from "../StaticReports/ReportsImages/Student Report_12142023_PlatformPreview .jpg";
import overViewReportImg from "../StaticReports/ReportsImages/FitnessGramOverviewReport_DistrictSummary (1)_page-0001.jpg";
import completionReportImg from "../StaticReports/ReportsImages/Completion Report_DistrictAdmin_2 (1)_page-0001.jpg";
import classScoreReportImg from "../StaticReports/ReportsImages/FG Summary Report (PYFA)_ScoreandHFZ_SchoolAdmin_page-0001.jpg";
import statisticsReportImg from "../StaticReports/ReportsImages/FitnessGram Statistics Report by District_page-0001.jpg";

export const reportsObj = {
	buttonsArray: [
		{
			id: 1,
			tabTextName: "FITNESSGRAM REPORTS",
		},
		{
			id: 2,
			tabTextName: "ACTIVITY REPORTS",
		},

		{
			id: 3,
			tabTextName: "REPORT ACTIVITY",
		},
	],
	districtAdminbuttonsArray: [
		{
			id: 1,
			tabTextName: "FITNESSGRAM REPORTS",
		},
		{
			id: 2,
			tabTextName: "ACTIVITY REPORTS",
		},
		{
			id: 3,
			tabTextName: "DATA EXPORT",
		},
		{
			id: 4,
			tabTextName: "REPORT ACTIVITY",
		},
	],

	student: {
		fitnessGramReports: [
			{
				id: 1,
				text: "FitnessGram Student Report",
				image: studentReportImg,
				description:
					"Provides individual fitness test scores, the relationship of the - scores to the Healthy Fitness Zone, and information on how to improve or maintain current fitness levels.",
			},
		],

		activityReports: [
			{
				id: 1,
				text: "ActivityGram Student Report",
			},

			{ id: 2, text: "ActivityLog Student Report" },
		],
	},

	teacher: {
		fitnessGramReports: [
			{
				id: 1,
				text: "FitnessGram Student Report",
				image: studentReportImg,

				description:
					"Provides individual fitness test scores, the relationship of the - scores to the Healthy Fitness Zone, and information on how to improve or maintain current fitness levels.",
			},

			{
				id: 2,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},

			{
				id: 3,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],

		activityReports: [
			{
				id: 1,
				text: "ActivityGram Student Report",
			},

			{ id: 2, text: "ActivityGram Statistics Report by Class" },

			{ id: 3, text: "ActivityLog Student Report" },
		],
	},

	districtAdmin: {
		fitnessGramReports: [
			{
				id: 1,
				text: "FitnessGram Student Report",

				image: studentReportImg,

				description:
					"Provides individual fitness test scores, the relationship of the - scores to the Healthy Fitness Zone, and information on how to improve or maintain current fitness levels.",
			},
			{
				id: 2,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},

			{
				id: 3,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],

		activityReports: [
			{
				id: 1,
				text: "ActivityGram Student Report",
			},

			{ id: 2, text: "ActivityGram Statistics Report by Class" },

			{ id: 3, text: "ActivityLog Student Report" },
		],
	},

	superAdmin: {
		fitnessGramReports: [
			{
				id: 1,
				text: "FitnessGram Student Report",

				image: studentReportImg,

				description:
					"Provides individual fitness test scores, the relationship of the - scores to the Healthy Fitness Zone, and information on how to improve or maintain current fitness levels.",
			},
			{
				id: 2,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},

			{
				id: 3,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],

		activityReports: [
			{
				id: 1,
				text: "ActivityGram Student Report",
			},

			{ id: 2, text: "ActivityGram Statistics Report by Class" },

			{ id: 3, text: "ActivityLog Student Report" },
		],
	},

	schoolAdmin: {
		fitnessGramReports: [
			{
				id: 1,
				text: "FitnessGram Student Report",

				image: studentReportImg,

				description:
					"Provides individual fitness test scores, the relationship of the - scores to the Healthy Fitness Zone, and information on how to improve or maintain current fitness levels.",
			},

			{
				id: 2,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},

			{
				id: 3,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],

		activityReports: [
			{
				id: 1,
				text: "ActivityGram Student Report",
			},

			{ id: 2, text: "ActivityGram Statistics Report by Class" },

			{ id: 3, text: "ActivityLog Student Report" },
		],
	},

	stateAdmin: {
		fitnessGramReports: [
			{
				id: 3,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},

			{
				id: 4,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],
	},
	partner: {
		fitnessGramReports: [
			{
				id: 3,
				text: "FitnessGram Overview Report",

				image: overViewReportImg,

				description: `
      Provides aggregate level overviews of Healthy Fitness Zone.
Achievement by component.

5 sub reports:

Summary; shows Healthy Fitness Zone and Needs improvement
Zone percentages by sex assigned-at birth. al]

Grade Level Comparison: compares HFZ percentages by
component for each selected grade level. 1l
School Year Comparison: compares 3 years of HFZ percentages by
component. (school/District/State Admin only)

School vs.District:compares HFZ percentages for each selected
School with the entire district. (District/State Admin only)
Districts. State: compares HEZ percentages for each selected
district with the entire state (State Admin only)

      `,
			},
			{
				id: 4,
				text: "FitnessGram Completion Report",

				image: completionReportImg,

				description: `Provides an overview of the percentage of students with

        fitness Gram scores entered into the system by disrictorschool.
        an average percentage s taken based on each health related
        ftness component.`,
			},
		],
	},
};

const date = new Date();

const year = date.getFullYear();

export const dataExportFiltersData = {
	mainHeading: "DATA EXPORT FILTERS",
	subHeading: "SELECT STUDENTS",
	inputFilesList: [
		{
			id: 1,
			Id: "filterSchoolYear",
			placeholder: "SELECT SCHOOL YEAR",
			lable: "SCHOOL YEAR",
			name: "academic_year",
			type: "select",
			options: [
				{ lable: `${year} - ${year + 1}`, value: `${`${year} - ${year + 1}`}` },
			],
		},
		{
			id: 8,
			Id: "filterDistricts",
			placeholder: "SELECT DISTRICT",
			lable: "DISTRICT",
			name: "districts",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},
		{
			id: 2,
			Id: "filterSchool",
			placeholder: "SELECT SCHOOL",
			lable: "SCHOOL",
			name: "school",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 4,
			Id: "filterClass",
			placeholder: "SELECT CLASS",
			lable: "CLASS",
			name: "class_name",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 5,
			Id: "filterGrade",
			placeholder: "Select All",
			lable: "GRADE",
			name: "grade",
			type: "multi-select",
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
				{ lable: "Twelfth Grade", value: 12 },
				{ lable: "Adult", value: "Adult" },
			],
		},
		{
			id: "8",
			Id: "filterStartDate",
			lable: "Start Date",
			name: "start_date",
			type: "date",
		},
		{
			id: "8",
			Id: "filterEndDate",
			lable: "End Date",
			name: "end_date",
			type: "date",
		},

		{
			id: 7,
			Id: "filterDeIdentify",
			lable: "DeIdentify",
			// placeholder: "Select ",
			name: "hashType",
			type: "select",
			options: [
				{ lable: "No De-identification", value: 0 },
				{ lable: "De-identify students by name", value: 1 },
				{ lable: "De-identify students by number", value: 2 },
				{ lable: "De-identify students by name and number", value: 3 },
			],
		},
	],
};

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
				{ lable: "Twelfth Grade", value: 12 },
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

export const studentReportFilters = {
	mainHeading: "REPORT FILTERS",
	subHeading: "SELECT STUDENTS",
	inputFilesList: [
		{
			id: 1,
			placeholder: "SELECT SCHOOL YEAR",
			lable: "SCHOOL YEAR",
			name: "academic_year",
			type: "select",
			options: [
				{ lable: `${year} - ${year + 1}`, value: `${`${year} - ${year + 1}`}` },
			],
		},
		{
			id: 2,
			placeholder: "SELECT SCHOOL",
			lable: "SCHOOL",
			name: "school",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 3,
			placeholder: "SELECT TEACHER",
			lable: "TEACHER",
			name: "teacher",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 4,
			placeholder: "SELECT CLASS",
			lable: "CLASS",
			name: "class_name",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 4,
			placeholder: "SELECT DISTRICT",
			lable: "DISTRICT",
			name: "districts",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 5,
			placeholder: "Select All",
			lable: "GRADE",
			name: "grade",
			type: "multi-select",
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
				{ lable: "Twelfth Grade", value: 12 },
				{ lable: "Adult", value: "Adult" },
			],
		},
		{
			id: 6,
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
			id: 7,

			lable: "AGE",
			placeholder: "Select All",
			name: "age",
			type: "select",
			options: [
				// { lable: 5, value: 5 },
				// { lable: 6, value: 6 },
				// { lable: 7, value: 7 },
				// { lable: 8, value: 8 },
				// { lable: 9, value: 9 },
				// { lable: 10, value: 10 },
				// { lable: 11, value: 11 },
				// { lable: 12, value: 12 },
				// { lable: 13, value: 13 },
				// { lable: 14, value: 14 },
				// { lable: 15, value: 15 },
				// { lable: 16, value: 16 },
				// { lable: 17, value: 17 },
				// { lable: 18, value: 18 },
			],
		},

		{
			id: 10,
			placeholder: "TEST TYPE",
			lable: "TEST TYPE",
			name: "test_type",
			type: "multi-select",
			options: [
				{ lable: `Pre Test`, value: `pre` },
				{ lable: `Post Test`, value: `post` },
				{ lable: `Other`, value: `other` },
			],
		},

		{
			id: 8,
			Id: "filterStartDate",
			lable: "Start Date",
			name: "start_date",
			type: "date",
		},
		{
			id: 9,
			Id: "filterEndDate",
			lable: "End Date",
			name: "end_date",
			type: "date",
		},

		

		{
			id: 11,
			placeholder: "",
			lable: "Show Student ID",
			name: "student_id",
			type: "checkbox",
		},

		{
			id: 12,
			placeholder: "",
			lable: "Show Student Name",
			name: "student_name",
			type: "checkbox",
		},

		{
			id: 13,
			placeholder: "",
			lable: "Show Body Composition",
			name: "body_composition",
			type: "checkbox",
		},

		{
			id: 14,
			placeholder: "",
			lable: "Show Complete Student History",
			name: "complete_student_history",
			type: "checkbox",
		},

		{
			id: 15,
			placeholder: "",
			lable: "Report in Spanish",
			name: "report_in_spanish",
			type: "checkbox",
		},
	],
};

export const completionReportFilters = {
	mainHeading: "REPORT FILTERS",

	inputFilesList: [
		{
			id: 1,
			placeholder: "SELECT SCHOOL YEAR",
			lable: "SCHOOL YEAR",
			name: "academic_year",
			type: "select",
			options: [
				{ lable: `${year} - ${year + 1}`, value: `${`${year} - ${year + 1}`}` },
			],
		},
		{
			id: 10,
			placeholder: "SELECT LICENSE",
			lable: "LICENSE",
			name: "licenses",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 9,
			placeholder: "SELECT DISTRICT",
			lable: "DISTRICT",
			name: "districts",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 2,
			placeholder: "SELECT SCHOOL",
			lable: "SCHOOL",
			name: "school",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 3,
			placeholder: "SELECT CLASS",
			lable: "CLASS",
			name: "class_name",
			type: "multi-select",
			options: [
				{ label: `1 Of 3 Selected`, value: `1 Of 3 Selected` },
				{ label: `2 Of 3 Selected`, value: `2 Of 3 Selected` },
				{ label: `3 Of 3 Selected`, value: `3 Of 3 Selected` },
			],
		},

		{
			id: 4,
			placeholder: "Select All",
			lable: "GRADE",
			name: "grade",
			type: "multi-select",
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
				{ lable: "Twelfth Grade", value: 12 },
				{ lable: "Adult", value: "Adult" },
			],
		},

		{
			id: 5,
			placeholder: "TEST TYPE",
			lable: "TEST TYPE",
			name: "test_type",
			type: "multi-select",
			options: [
				{ lable: `Pre Test`, value: `pre` },
				{ lable: `Post Test`, value: `post` },
				{ lable: `Other`, value: `other` },
			],
		},
		{
			id: 6,
			Id: "filterStartDate",
			lable: "Start Date",
			name: "start_date",
			type: "date",
		},
		{
			id: 7,
			Id: "filterEndDate",
			lable: "End Date",
			name: "end_date",
			type: "date",
		},
	],
};

export const gradeOptionsList = [
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
	{ lable: "Twelfth Grade", value: 12 },
	{ lable: "Adult", value: "Adult" },
];

export const testTypeOptionsList = [
	{ lable: `Pre Test`, value: `pre` },
	{ lable: `Post Test`, value: `post` },
	{ lable: `Other`, value: `other` },
];

export const dataExportData = {
	title: "FitnessGram Data Export",
	text: " Provides individual student information and student level fitness  data for a specified date range. Individual data is presented as rawtest values, with calculated aerobic capacity and BMI, and codedwith Healthy Fitness Zone achievement. Data can be de-identified by student name or ID number prior to download.",
	subHead: "When to use:",
	usageText1:
		"  Provides individual level data with multiple export optionsthat allow FitnessGram data to be easily shared for dataanalysis.",
	usageText2: "Provides individual level data for evaluation purposes.",
	listItems: [
		// {
		//   id: "1",
		//   name: "ActivityGram Data Export",
		// },

		// {
		//   id: "2",
		//   name: "ActivityLog Data Export",
		// },
		{
			id: "3",
			name: "FitnessGram Data Export",
		},
	],
};
