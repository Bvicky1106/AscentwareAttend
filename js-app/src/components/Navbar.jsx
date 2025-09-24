import { useAttendanceStore } from "../store/attendanceStore";
import Logo from "../assets/logo.png";

// Format milliseconds into HH:MM:SS
function formatTime(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
  const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
  const s = String(totalSec % 60).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export default function Navbar() {
  const { isCheckedIn, checkIn, checkOut, elapsedTime, isOnBreak } =
    useAttendanceStore();

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="Logo" // replace with your logo
            alt="Logo"
            className="h-10 w-10 rounded-full shadow-sm"
          />
          <span className="text-white font-bold text-xl">MyCompany</span>
        </div>

        {/* Right: Timer & Buttons */}
        <div className="flex items-center space-x-4">
          {/* Timer */}
          <span
            className={`font-mono text-lg ${
              isOnBreak ? "text-yellow-300" : "text-white"
            }`}
          >
            {formatTime(elapsedTime)} {isOnBreak && "(On Break)"}
          </span>

          {/* Buttons */}
          {!isCheckedIn ? (
            <button
              onClick={checkIn}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              Check In
            </button>
          ) : (
            <button
              onClick={checkOut}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md transition duration-200"
            >
              Check Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
