import React, { useState } from "react";
import {
  FaTachometerAlt,
  FaChevronDown,
  FaChevronUp,
  FaUserShield,
  FaCalendarAlt,
  FaTable,
} from "react-icons/fa";
import EmpSidebarItem from "../sidebar/EmpSidebarItem";

const EmpSidebar = ({ isOpen, onNavigate, activePage }) => {
  const [openPermission, setOpenPermission] = useState(false);

  return (
    <aside
      className={`fixed  left-0 h-full w-60 bg-[#0077b6] text-white shadow-lg transition-transform duration-300 z-[900] ${
        isOpen ? "translate-x-0" : "-translate-x-60"
      }`}
    >
      {/* Dashboard */}
      <EmpSidebarItem
        icon={<FaTachometerAlt />}
        label="Dashboard"
        onClick={() => onNavigate("dashboard")}
        active={activePage === "dashboard"}
      />

      {/* Attendance */}
      <EmpSidebarItem icon={<FaCalendarAlt />} label="Attendance" />

      {/* Attendance Table */}
      <EmpSidebarItem icon={<FaTable />} label="Admin" />

      {/* Permission Dropdown */}
      <div className="mx-2 mt-3">
        <button
          className="w-full flex items-center justify-between bg-[#023e8a] px-4 py-3 rounded-lg text-lg font-semibold hover:bg-[#0353a4] transition"
          onClick={() => setOpenPermission(!openPermission)}
        >
          <span className="flex items-center gap-2">
            <FaUserShield /> Permission
          </span>
          {openPermission ? <FaChevronUp /> : <FaChevronDown />}
        </button>

        {/* Dropdown Items */}
        <div
          className={`bg-gray-100 rounded-lg shadow-md mt-2 overflow-hidden transition-all duration-300 ${
            openPermission ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {[
            "Leave Request",
            "Corrections Request",
            "Permission Request",
            "Check-in Reset Request",
          ].map((item, i) => (
            <div
              key={i}
              className="text-center px-3 py-2 m-2 rounded-md bg-white text-[#0077b6] text-sm font-medium cursor-pointer hover:bg-blue-50 hover:scale-[1.02] transition"
              onClick={() => console.log(`${item} clicked`)} // 👉 replace with your handler
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default EmpSidebar;
