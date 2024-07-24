import { Flex } from "@chakra-ui/react";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid as GridComponent } from "react-window";
import PaginationComponent from "../../../components/PaginationComponent";
import ManageClassCard from "../Components/ManageClassCard";
import { getFilteredManageClassesList } from "../../teacher/teacherSlice";

const GridViewOfClasses = ({
  userIds,
  setUserIds,
  setIsAllChecked,
  handleRedirectOfViewClass,
  formData,
  onPageChange,
}) => {
  const dispatch = useDispatch();

  const manageClassesList = useSelector(
    (state) => state.teacher.manageClasses?.response
  );

  const isSideBarOpen = useSelector((state) => state.profile.openSideBar);

  const totalPages = useSelector((state) => state?.teacher?.totalPages);

  const token = useSelector((state) => state.profile.token);
  const userId = useSelector((state) => state.profile.userId);
  const selectedRole = useSelector((state) => state.profile.selectedRole);

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  const isPreviousButtonDisabled = formData?.skip === 1;
  const isNextButtonDisabled = formData?.skip === totalPages;

  const Column = ({ index, style, item }) => (
    <div
      style={{
        ...style,
      }}
    >
      <ManageClassCard
        item={item}
        index={index}
        userIds={userIds}
        setUserIds={setUserIds}
        setIsAllChecked={setIsAllChecked}
        handleRedirectOfViewClass={handleRedirectOfViewClass}
      />
    </div>
  );

  const onScroll = ({ scrollLeft, scrollTop }) => {
    const totalRows = Math.ceil(
      manageClassesList?.length / widthValues.columnCount
    );
    const visibleRows = Math.ceil((scrollTop + widthValues.height) / 230);

    if (manageClassesList?.length % 100 === 0) {
      let body = {
        user_role: selectedRole,
        user_uuid: userId,
        ...formData,
      };

      //   dispatch(getFilteredManageClassesList({ token, body }));
    }
  };

  const widthValues = useMemo(() => {
    const getColumnCount = () => {
      const screenWidth = viewPortWidth;

      if (screenWidth < 600) {
        return 1;
      } else if (screenWidth < 900) {
        return 2;
      } else if (screenWidth < 1025) {
        return isSideBarOpen ? 2 : 3;
      } else if (screenWidth < 1400) {
        return isSideBarOpen ? 3 : 4;
      } else {
        return isSideBarOpen ? 4 : 5;
      }
    };

    const getContainerWidth = () => {
      if (viewPortWidth >= 1020) {
        return isSideBarOpen ? viewPortWidth - 350 : viewPortWidth - 145;
      } else {
        return viewPortWidth - 30;
      }
    };
    const getColumnWidth = () => {
      if (viewPortWidth >= 1020) {
        return containerWidth / columnCount - 5;
      } else {
        return containerWidth / columnCount - 10;
      }
    };

    const getWindowHeight = () => {
      if (viewPortWidth >= 1020) {
        return window.innerHeight; // Remove the quotes around the numeric value
      } else {
        return window.innerHeight - 90; // Remove the quotes around the numeric value
      }
    };

    const columnCount = getColumnCount();
    const containerWidth = getContainerWidth();
    const columnWidth = getColumnWidth();
    const height = getWindowHeight();

    return { columnCount, containerWidth, columnWidth, height };
  }, [viewPortWidth, isSideBarOpen]);

  useEffect(() => {
    const handleResize = () => {
      setViewPortWidth(window.innerWidth);
      // Perform actions or trigger functions based on the viewport width change
      // For example, you can conditionally render different components or styles
    };

    // Attach the event listener
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const rowCount = Math.ceil(
    manageClassesList?.length / widthValues?.columnCount
  );

  return (
    <>
      <GridComponent
        columnCount={widthValues?.columnCount}
        columnWidth={widthValues?.columnWidth + 2}
        height={widthValues?.height - 200}
        rowCount={rowCount}
        rowHeight={280}
        width={widthValues?.containerWidth - 10}
        className="grid-component-scroll"
        onScroll={(scrollInfo) => {
          if (scrollInfo.scrollLeft === 0 && scrollInfo.scrollTop === 0) {
          } else {
            onScroll(scrollInfo);
          }
        }}
      >
        {({ columnIndex, rowIndex, style }) => {
          const index = rowIndex * widthValues?.columnCount + columnIndex;

          if (index < manageClassesList?.length) {
            return (
              <>
                <Column
                  index={index}
                  item={manageClassesList?.[index]}
                  style={{ ...style }}
                />
              </>
            );
          }

          return null; // Render an empty cell if the index is out of bounds
        }}
      </GridComponent>
    </>
  );
};

export default GridViewOfClasses;
