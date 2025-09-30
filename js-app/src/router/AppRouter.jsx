import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "../constants/routes";
import Dashboard from "../pages/Dashboard";
import EmpSidebar from "../components/sidebar/EmpSidebar";
import EmpSidebarItem from "../components/sidebar/EmpSidebarItem";
import CalendarGrid from "../components/CalendarGrid";
import WeeklyStatusChart from "../components/WeeklyStatusChart";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
        <Route path={ROUTES.SIDEBAR} element={<EmpSidebar />} />
        <Route path={ROUTES.SIDEBARITEM} element={<EmpSidebarItem />} />
        <Route path={ROUTES.CALENDARGRID} element={<CalendarGrid />} />
        <Route
          path={ROUTES.WEEKLYSTATUSCHART}
          element={<WeeklyStatusChart />}
        />
      </Routes>
    </BrowserRouter>
  );
}
