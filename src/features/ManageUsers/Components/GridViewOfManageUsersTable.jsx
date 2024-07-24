import { createContext, forwardRef, useContext } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import React from "react";

const StickyGridContext = createContext();
StickyGridContext.displayName = "StickyGridContext";

const getRenderedCursor = (children) => {
  const initialCursor = [
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
    Number.POSITIVE_INFINITY,
    Number.NEGATIVE_INFINITY,
  ];

  return children.reduce(
    (
      [minRow, maxRow, minColumn, maxColumn],
      { props: { columnIndex, rowIndex } }
    ) => [
      Math.min(minRow, rowIndex),
      Math.max(maxRow, rowIndex),
      Math.min(minColumn, columnIndex),
      Math.max(maxColumn, columnIndex),
    ],
    initialCursor
  );
};

const headerBuilder = (
  minColumn,
  maxColumn,
  getColumnWidth,
  headerHeight,
  sumOfFixedColumnWidth,
  headerRenderer
) => {
  const columns = [];
  let left = 0;
  for (let i = minColumn; i < maxColumn; i++) {
    const columnWidth = getColumnWidth(i);
    left = i > 0 ? left + getColumnWidth(i - 1) : sumOfFixedColumnWidth;

    columns.push({
      height: headerHeight,
      width: columnWidth,
      left: left,
      label: headerRenderer(i),
    });
  }

  return columns;
};

const GridCellRender = ({
  rowIndex,
  columnIndex,
  style,
  fixedColumnCount,
  cellRenderer,
}) => {
  if (columnIndex < fixedColumnCount) {
    return null;
  }
  return (
    <div
      className={`sticky-grid__data__column grid-row-${rowIndex}`}
      style={style}
    >
      hello world
      {/* {cellRenderer(columnIndex, rowIndex)}
       */}
    </div>
  );
};

const columnsBuilder = (
  minRow,
  maxRow,
  rowHeightFn,
  sumOfFixedColumnWidth,
  getFixedColumnWidth,
  fixedColumnCount,
  cellRenderer
) => {
  const columns = [];
  const rowHeight = rowHeightFn(0);
  for (let columnIndex = 0; columnIndex < fixedColumnCount; columnIndex++) {
    const rows = [];
    const columnWidth = getFixedColumnWidth(columnIndex);

    for (let rowIndex = minRow; rowIndex <= maxRow; rowIndex++) {
      const firstColumnRow = columns[columnIndex - 1]
        ? columns[columnIndex - 1][0]
        : null;
      const prevColumnLeft =
        columnIndex > 0 && firstColumnRow ? firstColumnRow.left : 0;
      const prevColumnWidth =
        columnIndex > 0 ? getFixedColumnWidth(columnIndex - 1) : 0;
      const height = rowHeight;

      rows.push({
        height: rowHeight,
        width: columnWidth,
        top: rowIndex * rowHeight,
        left: prevColumnLeft + prevColumnWidth,
        label: cellRenderer(columnIndex, rowIndex),
      });
    }

    columns.push(rows);
  }

  return columns;
};

const StickyHeader = ({
  headerHeight,
  sumOfFixedColumnWidth,
  headerColumns,
  getFixedColumnWidth,
  fixedColumnCount,
  headerRenderer,
}) => {
  const baseStyle = {
    height: headerHeight,
    width: sumOfFixedColumnWidth,
  };
  const scrollableStyle = { left: 0 };

  return (
    <div className="sticky-grid__header">
      {/* <div className="sticky-grid__header__base" style={baseStyle}> */}

      {/* 
        {Array.from({ length: fixedColumnCount }).map((_, columnIndex) => (
          <div
            key={`sticky-col-${columnIndex}`}
            style={{
              width: getFixedColumnWidth(columnIndex),
              position: "relative",
              textAlign: "left"
            }}
          >
            Sticky Header only
            {headerRenderer(columnIndex)}
          </div>
        ))} */}

      <p>hello</p>

      <p>hello</p>

      <p>hello</p>

      <p>hello</p>

      {/* </div> */}

      {/* <div className="sticky-grid__header__scrollable" style={scrollableStyle}>
        {headerColumns.map(({ label, ...style }, columnIndex) => {
          if (columnIndex < fixedColumnCount) {
            return null;
          } else {
            return (
              <div
                className="sticky-grid__header__scrollable__column"
                style={style}
                key={columnIndex}
              >
                {label}
              </div>
            );
          }
        })}
      </div> */}
    </div>
  );
};

const StickyColumns = ({
  columns,
  headerHeight,
  sumOfFixedColumnWidth,
  fixedColumnWidths,
  fixedColumnCount,
}) => {
  const leftSideStyle = {
    top: headerHeight,
    width: sumOfFixedColumnWidth,
    height: `calc(100% - ${headerHeight}px)`,
  };

  return (
    <div
      className="sticky-grid__sticky-columns__container"
      style={leftSideStyle}
    >
      {/* {columns.map((rows, rowIndex) =>
        rows.map(({ label, ...style }, i) => (
          <div
            className={`sticky-grid__sticky-columns__row grid-row-${rowIndex}`}
            style={style}
            key={i}
          >
            {label}
          </div>
        ))
      )} */}

      <p>column</p>
    </div>
  );
};

const InnerGridElementType = forwardRef(({ children, ...rest }, ref) => {
  const {
    columnCount,
    headerHeight,
    sumOfFixedColumnWidth,
    columnWidths,
    getFixedColumnWidth,
    fixedColumnCount,
    rowHeight,
    headerBuilder,
    columnsBuilder,
    headerRenderer,
    cellRenderer,
  } = useContext(StickyGridContext);

  const [minRow, maxRow, minColumn, maxColumn] = getRenderedCursor(children);
  const headerColumns = headerBuilder(
    /* minColumn */ 0,
    /* maxColumn + 3 */ columnCount,
    (index) => columnWidths[index],
    headerHeight,
    sumOfFixedColumnWidth,
    headerRenderer
  );
  // Sticky Cells
  const leftSideColumns = columnsBuilder(
    minRow,
    maxRow,
    rowHeight,
    sumOfFixedColumnWidth,
    getFixedColumnWidth,
    fixedColumnCount,
    cellRenderer
  );
  const containerStyle = {
    ...rest.style,
    width: `${parseFloat(rest.style.width) + sumOfFixedColumnWidth}px`,
    height: `${parseFloat(rest.style.height) + headerHeight}px`,
  };
  const containerProps = { ...rest, style: containerStyle };
  const gridDataContainerStyle = {
    top: headerHeight,
    // left: sumOfFixedColumnWidth
  };

  return (
    <div className="sticky-grid__container" ref={ref} {...containerProps}>
      <StickyHeader
        headerColumns={headerColumns}
        headerHeight={headerHeight}
        sumOfFixedColumnWidth={sumOfFixedColumnWidth}
        fixedColumnCount={fixedColumnCount}
        getFixedColumnWidth={getFixedColumnWidth}
        headerRenderer={headerRenderer}
      />

      {/* <StickyHeader
        headerColumns={headerColumns}
        headerHeight={headerHeight}
        sumOfFixedColumnWidth={sumOfFixedColumnWidth}
        fixedColumnCount={fixedColumnCount}
        getFixedColumnWidth={getFixedColumnWidth}
        headerRenderer={headerRenderer}
      />
      <StickyColumns
        columns={leftSideColumns}
        headerHeight={headerHeight}
        sumOfFixedColumnWidth={sumOfFixedColumnWidth}
        fixedColumnCount={fixedColumnCount}
        getFixedColumnWidth={getFixedColumnWidth}
      /> */}

      <div
        className="sticky-grid__data__container"
        style={gridDataContainerStyle}
      >
        {children}
      </div>
    </div>
  );
});

const GridViewOfManageUsersTable = ({
  headerHeight,
  rowHeight,
  overscanRowCount,
  headerRenderer,
  cellRenderer,
  columns,
  fixedColumnWidths,
  ...rest
}) => {
  const sumOfFixedColumnWidth = fixedColumnWidths.reduce(
    (sum, width) => sum + width,
    0
  );
  const fixedColumnCount = fixedColumnWidths.length;
  const columnCount = columns.length;
  const columnWidths = Array.from({ length: columnCount }).map((_, index) => {
    const width = fixedColumnWidths[index] ? 0 : 150;
    return width;
  });
  const getFixedColumnWidth = (index) => fixedColumnWidths[index];
  const getColumnWidth = (index) => columnWidths[index];

  return (
    <StickyGridContext.Provider
      value={{
        headerHeight,
        sumOfFixedColumnWidth,
        getFixedColumnWidth,
        fixedColumnCount,
        rowHeight,
        columnWidths,
        headerBuilder,
        columnsBuilder,
        columnCount,
        headerRenderer,
        cellRenderer,
      }}
    >
      <Grid
        rowHeight={rowHeight}
        columnCount={columnCount}
        innerElementType={InnerGridElementType}
        overscanRowCount={overscanRowCount}
        columnWidth={getColumnWidth}
        {...rest}
      >
        {({ rowIndex, columnIndex, style }) => (
          <GridCellRender
            rowIndex={rowIndex}
            columnIndex={columnIndex}
            style={style}
            fixedColumnCount={fixedColumnCount}
            cellRenderer={cellRenderer}
          />
        )}
      </Grid>
    </StickyGridContext.Provider>
  );
};

export default GridViewOfManageUsersTable;
