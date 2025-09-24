import React, { useState, useEffect } from "react";
import { useAttendanceStore } from "../store/attendanceStore";

export default function BreakTime() {
  const { isCheckedIn, isOnBreak, toggleBreak, elapsedTime, breakCount } =
    useAttendanceStore();
  const [breakTime, setBreakTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isOnBreak) {
      interval = setInterval(() => {
        setBreakTime((prev) => prev + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isOnBreak]);

  const formatTime = (ms) => {
    const totalSec = Math.floor(ms / 1000);
    const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="flex flex-col rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center font-bold tracking-[0.2px] text-blue-600 text-2xl mb-4">
        <div>Break Time & Counts</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-6 mb-4">
        <div className="flex flex-col gap-1 p-4 rounded-md bg-gradient-to-br from-green-100 to-emerald-200 shadow">
          <p className="font-semibold text-lg text-gray-700">Break Count:</p>
          <p className="font-extrabold text-blue-600 text-xl">{breakCount}</p>
          <p className="font-semibold text-lg text-gray-700">Current Break:</p>
          <p className="font-extrabold text-blue-600 text-xl">
            {formatTime(breakTime)}
          </p>
        </div>

        <div className="flex flex-col gap-1 p-4 rounded-md bg-gradient-to-br from-green-100 to-emerald-200 shadow">
          <p className="font-semibold text-lg text-gray-700">
            Total Work Time:
          </p>
          <p className="font-extrabold text-blue-600 text-xl">
            {formatTime(elapsedTime)}
          </p>
          <p className="font-bold text-xl text-green-700">
            {isOnBreak ? "On Break" : "Working"}
          </p>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={toggleBreak}
        disabled={!isCheckedIn}
        className={`w-full font-bold text-white py-3 rounded-md transition ${
          isOnBreak
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-orange-600 hover:bg-orange-700"
        } disabled:opacity-50`}
      >
        {isOnBreak ? "Resume Work" : "Take Break"}
      </button>
    </div>
  );
}
