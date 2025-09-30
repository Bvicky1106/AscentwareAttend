import React from "react";

function CalendarGrid() {
  return (
    <div>
      <main className="emp-content ml-64 p-4 sm:p-6 lg:p-8">
        <div className="attendance-widget bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Calendar Header */}
          <div className="attendance-header flex items-center justify-between">
            <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg bg-blue-50 transition">
              ◀
            </button>
            <h2 className="attendance-title text-xl font-semibold text-gray-800">
              September 2025
            </h2>
            <button className="text-blue-600 hover:text-blue-800 px-3 py-1 rounded-lg bg-blue-50 transition">
              ▶
            </button>
          </div>

          {/* Days Row */}
          <div className="days-row grid grid-cols-7 text-center text-gray-500 font-medium">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div key={day} className="py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="calendar-grid grid grid-cols-7 gap-2 text-center">
            {/* Example cells */}
            {[...Array(30)].map((_, i) => {
              const day = i + 1;
              let status = "Absent"; // Change based on your logic
              if ([6, 7, 13, 14, 20, 21, 27, 28].includes(day))
                status = "Holiday";
              const today = day === 30 ? " today" : "";

              return (
                <div
                  key={day}
                  className={`calendar-cell relative rounded-lg p-2 ${
                    status === "Absent"
                      ? "bg-red-100 text-red-700"
                      : status === "Holiday"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  } ${today ? "border-2 border-blue-500" : ""}`}
                  title={status}
                >
                  <span className="block font-semibold">{day}</span>
                  <small className="block text-xs">{status}</small>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="attendance-legend flex flex-wrap gap-4 mt-4 text-sm">
            {[
              { status: "Present", color: "bg-green-500" },
              { status: "Absent", color: "bg-red-500" },
              { status: "Holiday", color: "bg-yellow-400" },
              { status: "Halfday", color: "bg-blue-400" },
            ].map((item) => (
              <div
                key={item.status}
                className="legend-item flex items-center gap-2"
              >
                <div
                  className={`legend-box w-4 h-4 rounded ${item.color}`}
                ></div>
                {item.status}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CalendarGrid;
