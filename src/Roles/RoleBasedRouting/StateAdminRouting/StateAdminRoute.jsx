import { Route } from "react-router-dom";

import EmailSettings from "../../../features/DistrictAdmin/Settings/EmailSettings";

import ComingSoon from "../../../components/GlobalComponents/ComingSoon";
import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import StudentReportsDashboardList from "../../../components/GlobalComponents/Reports/Pages/StudentReportsDashboardList";
import DataManagementDashboard from "../../../features/DataManagementDashboard/Pages/DataManagementDashboard";
import AddNewDistrict from "../../../features/District&Schools/Components/AddNewDistrict";
import DistrictDashboard from "../../../features/District&Schools/Pages/DistrictDashboard";
import DistrictListDashboard from "../../../features/District&Schools/Pages/DistrictListDashboard";
import SchoolDashboard from "../../../features/District&Schools/Pages/SchoolDashboard";
import ManageClassesDashboard from "../../../features/ManageClasses/Pages/ManageClassesDashboard";
import AddMandates from "../../../features/ManageMandates/Pages/AddMandates";
import AddUser from "../../../features/ManageUsers/Pages/AddUser";
import ManageUsers from "../../../features/ManageUsers/Pages/ManageUsers";
import Myaccount from "../../../features/MyAccount/Pages/MyAccount";
import SystemAdminDashboard from "../../../features/SystemAdminDashboard/SystemAdminDashboard";
import DistrictStatistics from "../../../features/Usage&Statistics/Pages/DistrictStatistics";
import SystemUsage from "../../../features/Usage&Statistics/Pages/SystemUsage";

const StateAdminRoute = [
  <Route key="St1" index element={<SystemAdminDashboard />} />,

  <Route
    key="St2"
    path="data-management"
    element={<DataManagementDashboard />}
  />,

  <Route key="St3" path="import" element={<ComingSoon />} />,

  <Route
    key="St6"
    path="manage-classes"
    element={<ManageClassesDashboard />}
  />,

  //   schools elements

  <Route key="St7" path="district" element={<DistrictDashboard />} />,

  <Route
    key="St8"
    path="Districts/DistrictLookup"
    element={<DistrictListDashboard />}
  />,
  <Route
    key="St9"
    path="Districts/AddNewDistrict"
    element={<AddNewDistrict />}
  />,
  <Route
    key="St10"
    path="Districts/GreenlightElementary"
    element={<SchoolDashboard />}
  />,

  // <Route key="St11"
  //   path="EditDistrictAdministrator"
  //   element={<EditDistrictAdministrator />}
  // />,

  <Route key="St12" path="edit/:role/:id" element={<AddUser />} />,

  <Route key="St14" path="AddUser" element={<AddUser />} />,

  <Route key="St16" path="system-admin" element={<SystemAdminDashboard />} />,
  <Route key="St17" path="manage-mandates" element={<ComingSoon />} />,
  <Route key="St18" path="add-mandates" element={<AddMandates />} />,
  // <Route
  //   key="St19"
  //   path="roles-privilages"
  //   element={<RolesAndPrivilegesDashboard />}
  // />,

  <Route key="St20" path="manage-users" element={<ManageUsers />} />,
  // <Route key="St21" path='add-user' element={<AddUser />} />,
  <Route key="St22" path="email-settings" element={<EmailSettings />} />,

  <Route
    key="St23"
    path="district-statistics"
    element={<DistrictStatistics />}
  />,

  <Route key="St24" path="SmartCoach" element={<ComingSoon />} />,

  <Route key="St25" path="system_usage" element={<SystemUsage />} />,

  <Route
    key="S7"
    path="Districts/DistrictDetails/:districtId"
    element={<DistrictDashboard />}
  />,

  <Route key="St27" path="reports" element={<ReportsDashboard />} />,

  <Route key="S51" path="reports/fitness" element={<ReportViewDashboard />}>
    <Route key="SC01" path="FitnessGramCompletionReport" element={<Report />} />
    ,
    <Route key="SC011" path="FitnessGramOverviewReport" element={<Report />} />
    <Route
      key="SC02"
      path="FitnessGramStudentReport"
      element={<StudentReportsDashboardList />}
    />
    ,
    <Route
      key="SC03"
      path="FitnessGramStudentReport/student/:studentUUID"
      element={<StudentReportsDashboardList />}
    />
    ,
  </Route>,

  <Route key="St28" path="roles-privileges" element={<ComingSoon />} />,
  // <Route key="St29" path='schools' element={<Schools />} />,

  <Route key="St30" path="my-account" element={<Myaccount />} />,

  // <Route key="St31" path="GreenLiteElementary" element={<SchoolDashboard />} />,

  <Route key="St32" path="Notifications" element={<ComingSoon />} />,
  <Route key="S85" path="school/:schoolId" element={<SchoolDashboard />} />,

  <Route key="St34" path="ActivityGramEvent" element={<ComingSoon />} />,

  <Route key="St35" path="ActivityLog" element={<ComingSoon />} />,
];

export default StateAdminRoute;
