import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeGrid as GridComponent } from "react-window";
import EventDataCard from "../Components/EventDataCard";

const GridEventsList = (props) => {
  const { handleDelete, handleViewData, data, events, handlePageNumber } =
    props;

 
  const isSideBarOpen = useSelector((state) => state.profile.openSideBar);

  const [viewPortWidth, setViewPortWidth] = useState(window.innerWidth);

  const Column = ({ index, style, data }) => (
    <div
      style={{
        ...style,
      }}
    >
      <EventDataCard
        item={data}
        index={index}
        handleDelete={handleDelete}
        handleViewData={handleViewData}
      />
    </div>
  );

  const widthValues = useMemo(() => {
    const getColumnCount = () => {
      const screenWidth = viewPortWidth;

      if (screenWidth < 600) {
        return 1;
      } else if (screenWidth < 900) {
        return 2;
      } else if (screenWidth < 1400) {
        return isSideBarOpen ? 2 : 3;
      } else {
        return isSideBarOpen ? 3 : 4;
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
        return containerWidth / columnCount - 1.5;
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

  const rowCount = Math.ceil(events?.length / widthValues?.columnCount);

  return (
    <>
      <GridComponent
        columnCount={widthValues?.columnCount}
        columnWidth={widthValues?.columnWidth - 3}
        height={widthValues?.height - 200}
        rowCount={rowCount}
        rowHeight={230}
        width={widthValues?.containerWidth - 10}
        className="grid-component-scroll"
      
      >
        {({ columnIndex, rowIndex, style }) => {
          const index = rowIndex * widthValues?.columnCount + columnIndex;

          if (index < events?.length) {
            return (
              <>
                <Column
                  index={index}
                  data={events?.[index]}
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

export default GridEventsList;
