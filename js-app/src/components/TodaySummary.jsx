import React, { useEffect, useState } from "react";
import { useAttendanceStore } from "../store/attendanceStore";

// 🔗 Replace this with your Google Apps Script Web App URL
const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbz21D5tKDeXV7C_km0iSf1CH2sGlbXD12mmq04HQr__VF90l2K8_GYHyOawVn5VKtV-Tg/exec";

export default function TodaySummary() {
  const {
    isCheckedIn,
    startTime,
    elapsedTime,
    breakCount,
    checkIn,
    checkOut,
    toggleBreak,
    isOnBreak,
  } = useAttendanceStore();

  const [displayTime, setDisplayTime] = useState("00:00:00");

  // Update elapsed time display every second
  useEffect(() => {
    const interval = setInterval(() => {
      const totalSeconds = Math.floor(elapsedTime / 1000);
      const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
      const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
        2,
        "0"
      );
      const seconds = String(totalSeconds % 60).padStart(2, "0");
      setDisplayTime(`${hours}:${minutes}:${seconds}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [elapsedTime]);

  // 📌 Function to push data into Google Sheets
  async function submitAttendance(data) {
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors", // required for Google Apps Script
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log("✅ Submitted to Google Sheets:", data);
    } catch (error) {
      console.error("❌ Error submitting:", error);
    }
  }

  // 📌 Handle Check Out
  const handleCheckOut = () => {
    submitAttendance({
      startTime: startTime ? new Date(startTime).toLocaleTimeString() : "--:--",
      endTime: new Date().toLocaleTimeString(),
      elapsedTime: displayTime,
      breakCount,
    });
    checkOut();
  };

  return (
    <div className="w-full rounded-xl p-3 font-sans bg-white shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-indigo-600 font-bold text-xl md:text-2xl tracking-wide">
          Today Summary
        </h2>
      </div>

      {/* Top Circle + Check-in Box */}
      <div className="grid grid-cols-[200px_1fr] gap-6 items-start mb-6 md:gap-10">
        {/* Circle Timer */}
        <div className="relative w-[200px] h-[200px] flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-gradient-to-br from-green-500 via-green-600 to-green-700 shadow-inner relative overflow-hidden">
            <div className="absolute inset-0 rounded-full bg-white/50 mix-blend-screen"></div>
            <div className="absolute inset-[18%] rounded-full bg-gradient-to-br from-green-400 to-green-600 flex flex-col items-center justify-center shadow-inner">
              <div className="text-black font-bold text-2xl md:text-3xl">
                {displayTime}
              </div>
              <div className="text-green-800 font-bold text-sm mt-1">
                {isOnBreak ? "On Break" : "Working"}
              </div>
            </div>
          </div>
        </div>

        {/* Check-in / Check-out box */}
        <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-4 flex flex-col gap-4 shadow-md max-w-[420px]">
          <div className="flex justify-between items-center">
            <div className="font-bold text-lg md:text-xl text-indigo-600">
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </div>
            <div className="text-gray-700 font-medium text-sm md:text-base">
              {isOnBreak ? "Break" : "Working"}
            </div>
          </div>

          {/* Times */}
          <div className="flex gap-6 mt-2 items-center">
            <div className="flex flex-col gap-1">
              <span className="text-green-700 font-semibold text-xl md:text-2xl">
                {startTime ? new Date(startTime).toLocaleTimeString() : "--:--"}
              </span>
              <span className="text-gray-700 text-sm">Start</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-red-700 font-semibold text-xl md:text-2xl">
                {isCheckedIn ? "Now" : "--:--"}
              </span>
              <span className="text-gray-700 text-sm">End</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 flex-wrap mt-3">
            {!isCheckedIn ? (
              <button
                onClick={checkIn}
                className="bg-gradient-to-br from-green-600 to-green-700 text-white px-6 py-2 rounded-full font-bold text-lg hover:shadow-lg transition"
              >
                Check In
              </button>
            ) : (
              <>
                <button
                  onClick={handleCheckOut}
                  className="bg-gradient-to-br from-red-600 to-red-700 text-white px-6 py-2 rounded-full font-bold text-lg hover:shadow-lg transition"
                >
                  Check Out
                </button>
                <button
                  onClick={toggleBreak}
                  className={`${
                    isOnBreak
                      ? "bg-gradient-to-br from-pink-500 to-red-500"
                      : "bg-gradient-to-br from-purple-500 to-indigo-600"
                  } text-white px-6 py-2 rounded-full font-bold text-lg hover:shadow-lg transition`}
                >
                  {isOnBreak ? "Resume" : "Break"}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-6 md:grid-cols-4 sm:grid-cols-2">
        <div className="bg-gradient-to-br from-green-400 to-green-200 text-green-800 rounded-xl p-4 text-center font-bold hover:shadow-xl transition">
          <h3 className="text-lg">Breaks</h3>
          <span className="block text-xl md:text-2xl mt-1">{breakCount}</span>
        </div>
        <div className="bg-gradient-to-br from-teal-300 to-green-100 text-green-800 rounded-xl p-4 text-center font-bold hover:shadow-xl transition">
          <h3 className="text-lg">OT Hours</h3>
          <span className="block text-xl md:text-2xl mt-1">--:--</span>
        </div>
        <div className="bg-gradient-to-br from-blue-300 to-green-100 text-green-800 rounded-xl p-4 text-center font-bold hover:shadow-xl transition">
          <h3 className="text-lg">Net Hours</h3>
          <span className="block text-xl md:text-2xl mt-1">{displayTime}</span>
        </div>
        <div className="bg-gradient-to-br from-green-300 to-emerald-100 text-green-800 rounded-xl p-4 text-center font-bold hover:shadow-xl transition">
          <h3 className="text-lg">Week OT</h3>
          <span className="block text-xl md:text-2xl mt-1">--:--</span>
        </div>
      </div>
    </div>
  );
}
