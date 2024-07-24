import { StyleSheet, Font } from "@react-pdf/renderer";

import poppinsMedium from "../../../../assets/fonts/Poppins/Poppins-Medium (1).ttf";

import poppinsBold from "../../../../assets/fonts/Poppins/Poppins-Bold.ttf";

Font.register({
  family: "poppinsMedium",
  src: poppinsMedium,
  // fontWeight: 900,
});

Font.register({
  family: "poppinsBold",
  src: poppinsBold,
});

export const customStyles = StyleSheet.create({
  page: {
    // flexDirection: "row",
    background: "white",
    display: "flex",
    flexDirection: "column",
    gap: "4",
    paddingVertical: "16px",
    paddingHorizontal: "20px",
    fontFamily: "poppinsMedium",
  },

  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 18,
  },

  divider: {
    borderBottom: "2px solid #9D9D9D",
    // marginTop: 5,
  },

  secondDivider: {
    borderBottom: "1px solid black",
    marginTop: 5,
  },

  testItemCardContainer: {
    marginTop: "10",
    display: "flex",
    flexDirection: "row",
  },

  testItemPercentageCard: {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
    textAlign: "center",

    minHeight: "70px",
  },

  testItemName: {
    fontSize: 9,
    minHeight: "30px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  testItemNamePercentageBox: {
    width: "90%",
    height: "76px",
    // minHeight: "25%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // minHeight : '30%',
  },

  table: {
    display: "table",
    width: "100%",
    marginTop: 10,
    border: "1px solid #B5B4B4",
  },

  tableHeaderRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    background: "#231F20",
    color: "#ffffff",
    height: "40px",
  },

  tableHeaderCell: {
    fontSize: 9,
    textAlign: "center",
    flex: 1,
  },

  tableBodyParentRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    background: "#E8E7E7",
    borderBottom: "1px solid #918F8F",
  },

  tableBodyParentCell: {
    background: "#E8E7E7",
    flex: 1,
    fontSize: 9,
    textAlign: "center",
  },

  tableChildCell: {
    flex: 1,
    fontSize: 9,

    textAlign: "center",
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "40px",
    borderBottom: "1px solid #918F8F",
  },

  footer: {
    position: "absolute",
    fontSize: 12,
    bottom: 20,
    left: "20px",
    height: "40px",
    width: "160px",

    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  footerTextContainer: {},

  footerImage: {},

  footerText: {
    fontSize: 6,
  },

  studentReportContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },

  studentReportHeartBodyContainer: {
    flex: 1,
    marginRight: 2,
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
  },

  studentReportMuscleFitnessContainer: {
    flex: 1,
    // border: "1px solid #E0E0E1",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",
    gap: "1px",
  },

  studentReportHeartContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 4,
    paddingTop: 6,
    paddingHorizontal: 5,
    // border: "0.5px solid  #FEFFFE",


    border: "1px solid #E0E0E1",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",

    // border: "1px solid  rgba(0, 0, 0, 0.5)",
  },

  studentReportHeartHeadingContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  studentReportHeartImage: {
    height: "100px",
    width: "100px",
  },

  studentReportSubHeadingText: {
    fontSize: 13,
  },

  studentReportSideHeadingText: {
    fontSize: 11,
    color: "#363636",
  },

  studentReportEventsText: {
    fontSize: 11,
  },

  studentReportHeartResultContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "50px",
    position: "relative",
  },

  studentReportHeartResult: {
    flex: 1,

    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 1,
  },

  studentReportArrowImage: {
    height: "20px",
    width: "16px",
    objectFit: "contain",
  },

  studentReportbackground: {
    improvement: "#FF9A46",
    fit: "#19A617",
    risk: "#FF3F3F",
    lean: "#602e4f",
  },

  studentReportResultText: {
    whiteSpace: "wrap",
    fontSize: 9,
    color: "black",
    textAlign: "center",
  },

  studentReportResultTextName: {
    whiteSpace: "wrap",
    fontSize: 9,
    color: "white",
    textAlign: "center",
  },

  studentReportResultArrowBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",


    color: "black",
    top: "0px",
    left: "0px",
  },

  studentReportResultSitReachArrowBox: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",

    position: "absolute",

    transform: "translate(-20%, -58%)",

    color: "black",
    top: "0px",
    left: "0px",
  },

  studentReportMuscleFitnessBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    paddingRight: 3,
  },

  studentReportMuscleFitnessResultContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    marginTop: "45px",
    position: "relative",
  },

  studentReportMuscleFitnessItemBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingHorizontal: 6,
    // margin: 5,
    gap: 5,
    alignItems: "center",
    fontSize: 11,
  },

  studentReportMuscleFitnessItemBoxImage: {
    height: "25px",
    width: "40px",
    objectFit: "contain",
  },

  studentReportMuscleFitnessItemBoxText: {
    // paddingVertical : 4,
    // paddingHorizontal : 6,

    fontSize: 8,
    color: "#0081c8",
    fontFamily: "poppinsBold",
    fontWeight: 900,
    margin: 3,
  },

  studentReportGoalText: {
    fontSize: 8,
    color: "#0081c8",
    fontFamily: "poppinsBold",
    fontWeight: 900,
    paddingHorizontal: 3,
  },

  studentReportDescriptionText: {
    color: "#464646",
    fontSize: 8,
    padding: 2,
    fontWeight: 700,
  },

  studentReportHeightWeightText: {
    color: "#0081c8",
    fontFamily: "poppinsBold",
    fontWeight: 900,
    padding: 0,
    margin: 0,
    fontSize : "16px",    
    marginBottom : "-5px",


  },

  studentReportLapsTextContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // margin: 2,
  },

  studentReportLapsText: {
    color: "#0081c8",
    fontSize: 16,
  },

  dividerWithLightBorder: {
    borderBottom: "1px solid #EBEBEB",
    // marginTop: 5,
  },

  studentReportHeartMuscleImage: {
    height: "35px",
    width: "50px",
    position: "absolute",
    right: 6,
    top: 3,
    objectFit: "contain",
  },

  studentReportMuscleImage: {
    height: "30px",
    width: "30px",
    position: "absolute",
    right: 6,
    top: 3,
    objectFit: "contain",
  },

  studentReportPersonalizedText: {
    fontSize: 12,
    fontWeight: 700,
  },

  studentReportStudentNameText: {
    color: "#0081c8",
    fontFamily: "poppinsBold",
    fontWeight: 900,
    fontSize: 13,
  },

  studentReportStudentDetailsContainer: {
    border: "1px solid #E0E0E1",
    boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.5)",

    paddingHorizontal: 5,
    paddingTop: 6,
    // paddingVertical: 6,

    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: "2px",
    // marginTop: 0.5,

    // width: "100%",
    // flex: 1,
  },

  studentReportStudentDetailsText: {
    fontSize: 9.5,
    fontWeight: 100,
  },

  studentReportResultIndicatorImageContainer: {
    height: "16px",
    width: "18px",
    marginRight: 2,
  },

  studentReportResultIndicatorImage: {
    height: "100%",
    width: "100%",
    objectFit: "contain",





  },

  studentReportCompleteResultIndicatorImageContainer: {
    height: "14px",
    width: "14px",
  },

  studentReportCompleteResultIndicatorImage: {
    // height: "100%",
    // width: "100%",
  },

  studentReportCompleteEventContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
  },

  studentReportCompleteEventContainerChild: {
    flexBasis: "33.33%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "25px",
    gap: "5px",
  },


  sitReachCompleteEventContainerChild:{

    flexBasis: "50%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "25px",
    gap: "5px",
  }




});
