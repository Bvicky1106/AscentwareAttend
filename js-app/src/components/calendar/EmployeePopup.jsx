import React from "react";

export default function EmployeePopup({ employee, onClose }) {
  if (!employee) return null;

  const {
    avatar = "",
    name = "N/A",
    id = "N/A",
    department = "N/A",
    role = "N/A",
    leaves = { earned: 0, pending: 0, used: 0 },
    metrics = [],
    attendance = [],
  } = employee;

  return (
    <div className="fixed inset-0 bg-black/55 flex justify-center items-center z-50 font-sans">
      <div className="bg-white rounded-xl shadow-lg w-[1200px] max-h-[90vh] overflow-y-auto animate-[fadeIn_0.25s_ease] pb-5">
        {/* Header */}
        <div className="flex justify-between items-center p-4 px-6 bg-cyan-200 border-b border-gray-200 rounded-t-xl">
          <h2 className="text-[20px] font-semibold text-gray-800">
            Employee Details
          </h2>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md font-medium text-sm"
            onClick={onClose}
          >
            Close
          </button>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-[300px_1fr] gap-5 p-5">
          {/* Employee Card */}
          <div className="bg-cyan-100 border border-green-200 rounded-lg p-4 text-center">
            <img
              src={avatar || "https://via.placeholder.com/80"}
              alt="avatar"
              className="w-20 h-20 rounded-full mx-auto mb-2"
            />
            <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
            <p className="text-sm text-gray-700 mb-3">{id}</p>
            <div className="text-left text-gray-700 text-base mt-2">
              <p>Department: {department}</p>
              <p>Role: {role}</p>
            </div>

            {/* Leave Stats */}
            <div className="bg-white border border-gray-200 rounded-lg mt-4 p-3 text-left">
              <h4 className="text-blue-900 font-semibold mb-2 text-lg">
                Leave Balance
              </h4>
              <div className="grid grid-cols-3 gap-2 mb-1">
                <div className="bg-green-500 text-white text-sm font-medium rounded px-2 py-1 text-center">
                  {leaves.earned} Earned
                </div>
                <div className="bg-yellow-500 text-white text-sm font-medium rounded px-2 py-1 text-center">
                  {leaves.pending} Pending
                </div>
                <div className="bg-blue-500 text-white text-sm font-medium rounded px-2 py-1 text-center">
                  {leaves.used} Used
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div>
            {/* Metrics Grid */}
            <div className="grid grid-cols-4 gap-3 mb-5">
              {metrics.length > 0 ? (
                metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-green-100 to-green-200 border border-green-300 rounded-lg p-3 text-center shadow-md"
                  >
                    <span className="block text-gray-700 text-base">
                      {metric.label}
                    </span>
                    <strong className="block text-gray-900 font-medium">
                      {metric.value}
                    </strong>
                  </div>
                ))
              ) : (
                <p className="col-span-4 text-gray-500 text-center">
                  No metrics available
                </p>
              )}
            </div>

            {/* Attendance Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse mt-2">
                <thead>
                  <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
                    <th className="p-2">Date</th>
                    <th className="p-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {attendance.length > 0 ? (
                    attendance.map((day, idx) => (
                      <tr key={idx} className="text-sm">
                        <td className="p-2">{day.date}</td>
                        <td
                          className={`p-2 font-semibold ${
                            day.status === "present"
                              ? "text-green-600"
                              : day.status === "absent"
                              ? "text-red-600"
                              : day.status === "leave"
                              ? "text-blue-600"
                              : day.status === "holiday"
                              ? "text-gray-500"
                              : day.status === "halfday"
                              ? "text-yellow-500"
                              : ""
                          }`}
                        >
                          {day.status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="2" className="text-center p-4 text-gray-500">
                        No attendance data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Back Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-green-400 border border-green-500 rounded-md text-white font-medium hover:bg-green-600 transition"
              >
                Back to Timeline
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between p-4 px-6 bg-gray-100 border-t border-gray-200 rounded-b-xl">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md font-medium">
            Export
          </button>
          <div></div>
        </div>
      </div>
    </div>
  );
}
