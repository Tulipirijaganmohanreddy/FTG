import React from "react";
import { Route } from "react-router-dom";
import ReportsDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportsDashboard";
import NotificationsComponent from "../../../features/Notifications/Pages/NotificationsComponent";
import AdministerTest from "../../../features/Partners/Reports/AdministerTest";
import SmartCoachDashboard from "../../../features/SmartCoach/Pages/SmartCoachDashboard";
import SystemAdminDashboard from "../../../features/SystemAdminDashboard/SystemAdminDashboard";
import ReportViewDashboard from "../../../components/GlobalComponents/Reports/Pages/ReportViewDashboard";
import Report from "../../../components/GlobalComponents/Reports/Components/Report";
import ComingSoon from "../../../components/GlobalComponents/ComingSoon";

export const PartnerRoute = [
  <Route key="p01" index element={<ReportsDashboard />} />,
  <Route key="p02" path="Reports" element={<ReportsDashboard />} />,
  <Route key="S51" path="reports/fitness" element={<ReportViewDashboard />}>
    <Route key="SC011" path="FitnessGramOverviewReport" element={<Report />} />
    <Route key="SC01" path="FitnessGramCompletionReport" element={<Report />} />
  </Route>,

  <Route key="p03" path="system-admin" element={<SystemAdminDashboard />} />,

  <Route key="p04" path="SmartCoach" element={<SmartCoachDashboard />} />,

  // <Route path="SmartCoach" element={<RecommendedSmart />} />,

  <Route key="p05" path="Notifications" element={<NotificationsComponent />} />,

  <Route key="p06" path="ActivityGramEvent" element={<ComingSoon />} />,

  <Route key="p07" path="ActivityLog" element={<ComingSoon />} />,
];
