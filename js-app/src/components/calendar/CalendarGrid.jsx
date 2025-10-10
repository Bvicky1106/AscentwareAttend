import React, { useState } from "react";
import EmployeePopup from "./EmployeePopup";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const dummyEmployee = {
  avatar: "https://via.placeholder.com/80",
  name: "John Doe",
  id: "EMP001",
  department: "IT",
  role: "Developer",
  leaves: { earned: 12, pending: 3, used: 5 },
  metrics: [
    { label: "Tasks Completed", value: 34 },
    { label: "Projects", value: 5 },
  ],
  attendance: [
    { date: 1, status: "present" },
    { date: 2, status: "absent" },
    { date: 3, status: "halfday" },
  ],
};

export default function CalendarGrid() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const currentMonth = "September 2025";
  const today = new Date().getDate();

  const exampleDates = Array.from({ length: 30 }, (_, i) => {
    const day = i + 1;
    let status = "working"; // default
    if ([6, 7, 13, 14, 20, 21, 27, 28].includes(day)) status = "holiday";
    if ([2, 9, 16, 23].includes(day)) status = "absent";
    if ([5, 12, 19, 26].includes(day)) status = "halfday";
    return { day, status };
  });

  const statusClasses = {
    working: "bg-green-400 text-green-800 border-green-500",
    absent: "bg-red-200 text-red-800 border-red-400",
    holiday: "bg-yellow-200 text-yellow-800 border-yellow-400",
    halfday: "bg-blue-200 text-blue-800 border-blue-400",
  };

  return (
    <div className="w-full rounded-xl p-4 font-sans bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg border border-indigo-100 mb-4">
        <h3 className="text-2xl font-bold text-indigo-600 tracking-wide m-0">
          Attendance Calendar
        </h3>
      </div>

      {/* Days of Week */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="text-center font-semibold text-sm bg-teal-50 border border-gray-200 rounded py-1"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-2">
        {exampleDates.map((d, i) => {
          const dayOfWeek = i % 7;
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

          return (
            <div
              key={d.day}
              onClick={() => setSelectedEmployee(dummyEmployee)}
              className={`h-10 flex justify-center items-center rounded border text-base font-medium transition cursor-pointer 
                ${
                  d.day === today
                    ? "border-2 border-black bg-gradient-to-br from-blue-200 to-blue-400 font-bold text-blue-900 shadow"
                    : isWeekend
                    ? "bg-yellow-200 text-yellow-800 border-yellow-400 font-bold"
                    : statusClasses[d.status]
                } hover:scale-105 transform`}
            >
              {d.day}
            </div>
          );
        })}
      </div>

      {selectedEmployee && (
        <EmployeePopup
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}
