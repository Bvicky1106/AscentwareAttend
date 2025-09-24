import Calendar from "../components/Calendar";
import EmployeeDetails from "../components/EmployeeDetails";
import TodaySummary from "../components/TodaySummary";
import BreakTime from "../components/BreakTime";
import Navbar from "../components/Navbar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header Navbar */}
      <header>
        <Navbar />
      </header>

      {/* Main content grid */}
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <Calendar />
        <EmployeeDetails />
        <TodaySummary />
        <BreakTime />
      </main>
    </div>
  );
}
