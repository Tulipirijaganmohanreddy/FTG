import {
  default as heartPulseImage,
  default as pushUpImage,
} from "../../src/assets/Images/ReportImages/Group 12.png";
import sitAndStretchImg from "../../src/assets/Images/ReportImages/Group 3779.png";
import trunkLiftImg from "../../src/assets/Images/ReportImages/Group 3781.png";
import curlUpImg from "../../src/assets/Images/ReportImages/Group 3784.png";

export const handleDateRange = () => {
  const currentDate = new Date();
  const endDate = new Date();
  endDate.setFullYear(currentDate.getFullYear() + 1);
  endDate.setDate(endDate.getDate() - 1);

  return {
    start_date: currentDate.toISOString().split("T")[0],
    end_date: endDate.toISOString().split("T")[0],
  };
};

export const handleEndDate = (date) => {
  const inputDate = new Date(date);
  const nextYear = inputDate.getFullYear() + 1;
  const endDate = new Date(nextYear, inputDate.getMonth(), inputDate.getDate());

  return {
    end_date: endDate.toISOString().split("T")[0],
  };
};

export function debounce(cb, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
}

// Function to export data as a file
export const exportData = (data, fileName, type) => {
  // Create a link and download the file
  const blob = new Blob([data], { type });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  window.URL.revokeObjectURL(url);
};

export const handleSelectedIds = (
  e,
  itemId,
  index,
  selectedUUIDsList,
  setSelectedUUIDsList,
  childCheckBoxList,
  setChildCheckBoxList,
  parentCheckBoxList,
  setParentCheckBoxList,
  dataListArray,

  objKey
) => {
  if (e.target.checked) {
    setSelectedUUIDsList((prevState) => {
      setChildCheckBoxList((prevState) => ({
        ...prevState,
        [index]: [...prevState?.[index], itemId],
      }));

      dataListArray[index]?.[objKey]?.length ===
      childCheckBoxList[index]?.length + 1
        ? setParentCheckBoxList((prevState) => {
            const newArr = [...prevState];

            newArr[index] = true;

            return newArr;
          })
        : setParentCheckBoxList((prevState) => {
            const newArr = [...prevState];

            newArr[index] = false;

            return newArr;
          });

      return [...prevState, itemId];
    });
  } else {
    let dummyUserIds = selectedUUIDsList.slice();

    let userIdIndex = dummyUserIds?.findIndex((id) => id === itemId);

    dummyUserIds.splice(userIdIndex, 1);

    setSelectedUUIDsList([...dummyUserIds]);

    let dummyArrayUserIds = childCheckBoxList[index]?.slice();

    let dummyIdIndex = dummyArrayUserIds?.findIndex((id) => id === itemId);

    dummyArrayUserIds?.splice(dummyIdIndex, 1);

    setChildCheckBoxList((prevState) => ({
      ...prevState,
      [index]: dummyArrayUserIds,
    }));

    dataListArray[index]?.[objKey]?.length ===
    childCheckBoxList[index]?.length - 1
      ? setParentCheckBoxList((prevState) => {
          const newArr = [...prevState];

          newArr[index] = true;

          return newArr;
        })
      : setParentCheckBoxList((prevState) => {
          const newArr = [...prevState];

          newArr[index] = false;

          return newArr;
        });
  }
};

export const handleCheckAllIds = (
  e,
  index,
  selectedUUIDsList,
  setSelectedUUIDsList,
  childCheckBoxList,
  setChildCheckBoxList,
  parentCheckBoxList,
  setParentCheckBoxList,
  dataListArray,

  objKey
) => {
  if (e.target.checked) {
    let arr = dataListArray[index]?.[objKey]?.map((user) => user?.uuid);

    setSelectedUUIDsList((prevState) => [...prevState, ...arr]);

    setChildCheckBoxList((prevState) => ({
      ...prevState,
      [index]: [...prevState?.[index], ...arr],
    }));

    dataListArray[index]?.[objKey]?.length === arr?.length &&
      setParentCheckBoxList((prevState) => {
        const newArr = [...prevState];

        newArr[index] = true;

        return newArr;
      });
  } else {
    setChildCheckBoxList((prevState) => ({
      ...prevState,
      [index]: [],
    }));

    let dummyArrayUserIds = childCheckBoxList[index]?.slice() || [];

    setSelectedUUIDsList((prevState) => {
      return prevState?.filter((item) => !dummyArrayUserIds?.includes(item));
    });

    setParentCheckBoxList((prevState) => {
      const newArr = [...prevState];

      newArr[index] = false;

      return newArr;
    });
  }
};

export const handleToggleBodyVisibility = (index, setIsCollapseOpen) => {
  setIsCollapseOpen((prevState) => {
    const newArr = [...prevState];

    newArr[index] = !prevState[index];

    return newArr;
  });
};

export const handleStudentReportDataObject = (reportDetails) => {
  const obj = {
    heartHelathCard: {
      headingsList: [
        {
          heading: "HEART HEALTH",
          image: heartPulseImage,
        },

        {
          heading: "Aerobic Capacity (V02MAX)",
          image: heartPulseImage,
        },
      ],

      riskFactorData: {
        riskList: [
          {
            id: 1,
            title: "Health Risk",
          },

          {
            id: 2,
            title: "Needs Improvement",
          },

          {
            id: 3,
            title: "Healthy Fitness Zone",
          },
        ],

        aerobicCapacity: reportDetails?.aerobicCapacity || [],
      },

      goal: `GOAL: ${reportDetails?.aerobic_goal}`,

      m15_pacer: reportDetails?.m15_pacer || [],
      m20_pacer: reportDetails?.m20_pacer || [],
    },

    bodyHealthCard: {
      headingsList: [
        {
          heading: "BODY HEALTH",
          image: "",
        },

        {
          heading: "Body Mass Index",
          image: "",
        },
      ],

      riskFactorData: {
        riskList: [
          {
            id: 1,
            title: "Health Risk",
          },

          {
            id: 2,
            title: "Needs Improvement",
          },

          {
            id: 3,
            title: "Healthy Fitness Zone",
          },

          {
            id: 4,
            title: "Very Lean",
          },
        ],

        bmiCategories: reportDetails?.bmiCategories || [],
      },

      height_in_feets: reportDetails?.height_in_feets,

      height_in_inches: reportDetails?.height_in_inches,

      weight: reportDetails?.weight,

      goal: `GOAL: ${reportDetails?.body_composition_goal}`,
    },

    muscleFitnessCard: {
      headingsList: [
        {
          heading: "Push Ups",
          image: pushUpImage,
        },

        {
          heading: "Curl-Ups",
          image: curlUpImg,
        },

        {
          heading: "Trunk Lift",
          image: trunkLiftImg,
        },

        {
          heading: "Sit and Stretch",
          image: sitAndStretchImg,
        },
      ],

      riskFactorData: {
        riskList: [
          {
            id: 1,
            title: "Needs Improvement",
          },

          {
            id: 2,
            title: "Healthy Fitness Zone",
          },
        ],

        muscleFitnessData: reportDetails?.muscleFitnessData || [],
      },

      goal: {
        curl_up_goal: `GOAL: ${reportDetails?.curl_up_goal}`,
        push_up_goal: `GOAL:  ${reportDetails?.push_up_goal}`,
        sit_reach_goal: `GOAL:  ${reportDetails?.sit_reach_goal}`,
        trunk_lift_goal: `GOAL:  ${reportDetails?.trunk_lift_goal}`,
      },
    },

    date_of_birth: reportDetails?.date_of_birth || "",
    first_name: reportDetails?.first_name || "",
    gender: reportDetails?.gender || "",
    last_name: reportDetails?.last_name || "",
    age: reportDetails?.age || "",
    grade: reportDetails?.grade || "",
  };

  return obj;
};

export const handleCompletionReportCalculation = (totalNumberOfObjects) => {
  const numbersPerPage = [10, 15];
  const pages = [];

  let currentIndex = 0;

  while (currentIndex < totalNumberOfObjects) {
    const currentPage = [];
    const perPage = currentIndex === 0 ? numbersPerPage[0] : numbersPerPage[1];

    for (let i = 0; i < perPage && currentIndex < totalNumberOfObjects; i++) {
      currentPage.push(currentIndex + 1);
      currentIndex++;
    }

    pages.push(currentPage);
  }

  // Print the pages

  return pages;
};

export function academicYear() {
  const date = new Date();
  const month = date.getMonth();
  const year = date.getFullYear();

  let currentYear = "";
  if (month >= 6) {
    currentYear = `${year}-${year + 1}`;
  } else {
    currentYear = `${year - 1}-${year}`;
  }
  return currentYear;
}

export function handlePadStartTimer(inputValue) {
  const cleanedTime = inputValue.replace(/\D/g, "");

  const formattedTime = cleanedTime.padStart(4, "0");

  const minutes = formattedTime.slice(-4, -2);

  const seconds = formattedTime.slice(-2);

  const finalTime = `${minutes}:${seconds}`;
  return finalTime;
}

export function calculatePaginationLength(schoolsList, selectedSchools) {
  let schoolsListLength = [];

  if (schoolsList?.length) {
    schoolsList?.forEach((each) => {
      if (each?.schools?.length) {
        schoolsListLength = [...schoolsListLength, ...each?.schools];
      }
    });
  }

  let finalSchoolsList = schoolsListLength?.length
    ? schoolsListLength?.filter(
        (each) => !selectedSchools?.includes(each?.uuid)
      )
    : [];

  return finalSchoolsList;
}
