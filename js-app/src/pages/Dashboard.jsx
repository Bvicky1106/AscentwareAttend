import { useState } from "react";
import Calendar from "../components/Calendar";
import EmployeeDetails from "../components/EmployeeDetails";
import TodaySummary from "../components/TodaySummary";
import BreakTime from "../components/BreakTime";
import Navbar from "../components/Navbar";
import EmpSidebar from "../components/sidebar/EmpSidebar";
import WeeklyStatusChart from "../components/WeeklyStatusChart";

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
            onClose={() => setIsSidebarOpen(false)}
          />
        </div>

        {/* Main Content */}
        <div
          className={`flex-1 transition-all duration-300 pt-8 px-4 sm:px-6 lg:px-8 ${
            isSidebarOpen ? "ml-64" : "ml-0"
          }`}
        >
          <main className="grid grid-cols-8 gap-6">
            {/* Employee Details */}
            <div className="col-span-2 bg-white p-4 rounded-xl shadow-md">
              <EmployeeDetails />
            </div>

            {/* Break Time */}
            <div className="col-span-2 bg-white p-4 rounded-xl shadow-md">
              <BreakTime />
            </div>

            {/* Today Summary */}
            <div className="col-span-4 bg-white p-6 rounded-xl shadow-md">
              <TodaySummary />
            </div>

            <div className="col-span-4 bg-white p-6 rounded-xl shadow-md">
              <WeeklyStatusChart />
            </div>
            <div className="col-span-4 bg-white p-6 rounded-xl shadow-md">
              <Calendar />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
