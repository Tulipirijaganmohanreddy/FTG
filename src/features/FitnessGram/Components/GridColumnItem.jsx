import React from "react";
import EventDataCard from "./EventDataCard";

const GridColumnItem = (props) => {
  const { index, item, handleDelete, handleViewData } = props;

  return (
    <>
      <EventDataCard
        item={item}
        index={index}
        handleDelete={handleDelete}
        handleViewData={handleViewData}
       
      />
    </>
  );
};

export default GridColumnItem;
