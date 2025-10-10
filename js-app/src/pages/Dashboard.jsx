import { useState, useEffect } from "react";
import { useAttendanceStore } from "../store/attendanceStore";

import EmployeeDetails from "../components/EmployeeDetails";
import TodaySummary from "../components/TodaySummary";
import BreakTime from "../components/BreakTime";
import Navbar from "../components/Navbar";
import EmpSidebar from "../components/sidebar/EmpSidebar";
import WeeklyStatusChart from "../components/WeeklyStatusChart";
import Admin from "../components/admin/Admin";
import { ROUTES } from "../constants/routes";
import CalendarGrid from "../components/calendar/CalendarGrid";

export default function Dashboard() {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activePage, setActivePage] = useState(ROUTES.DASHBOARD);

  // Resume attendance timer after page refresh
  const resumeTimer = useAttendanceStore((state) => state.resumeTimer);
  useEffect(() => {
    resumeTimer();
  }, [resumeTimer]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Navbar */}
      <header className="w-full fixed top-0 left-0 z-50 shadow-md bg-white">
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      </header>

      <div className="flex pt-[70px]">
        {/* Sidebar */}
        <div
          className={`fixed top-[70px] left-0 h-[calc(100%-70px)] transition-all duration-300 bg-white shadow-md overflow-hidden ${
            isSidebarOpen ? "w-64" : "w-0"
          }`}
        >
          <EmpSidebar
            isOpen={isSidebarOpen}
            onNavigate={setActivePage}
            activePage={activePage}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 pt-8 px-4 sm:px-6 lg:px-8 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <main className="grid grid-cols-8 gap-6">
            {/* Dashboard Components */}
            <div
              className={`col-span-2 bg-white p-4 rounded-xl shadow-md ${
                activePage === ROUTES.DASHBOARD ? "" : "hidden"
              }`}
            >
              <EmployeeDetails />
            </div>

            <div
              className={`col-span-2 bg-white p-4 rounded-xl shadow-md ${
                activePage === ROUTES.DASHBOARD ? "" : "hidden"
              }`}
            >
              <BreakTime />
            </div>

            <div
              className={`col-span-4 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.DASHBOARD ? "" : "hidden"
              }`}
            >
              <TodaySummary />
            </div>

            <div
              className={`col-span-4 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.DASHBOARD ? "" : "hidden"
              }`}
            >
              <WeeklyStatusChart />
            </div>

            <div
              className={`col-span-4 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.DASHBOARD ? "" : "hidden"
              }`}
            >
              <CalendarGrid />
            </div>

            {/* Other Pages */}
            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.CALENDARGRID ? "" : "hidden"
              }`}
            >
              <CalendarGrid />
            </div>

            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.ADMIN ? "" : "hidden"
              }`}
            >
              <Admin />
            </div>

            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.LEAVE ? "" : "hidden"
              }`}
            >
              <h2 className="text-xl font-semibold">Leave Request Page</h2>
            </div>

            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.CORRECTION ? "" : "hidden"
              }`}
            >
              <h2 className="text-xl font-semibold">
                Corrections Request Page
              </h2>
            </div>

            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.PERMISSION ? "" : "hidden"
              }`}
            >
              <h2 className="text-xl font-semibold">Permission Request Page</h2>
            </div>

            <div
              className={`col-span-8 bg-white p-6 rounded-xl shadow-md ${
                activePage === ROUTES.RESET ? "" : "hidden"
              }`}
            >
              <h2 className="text-xl font-semibold">
                Check-in Reset Request Page
              </h2>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
