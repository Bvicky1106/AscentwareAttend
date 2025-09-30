// src/components/WeeklyStatusChart.jsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from "recharts";

// Sample data
const data = [
  { day: "Mon", working: 8, absent: 0, halfday: 0 },
  { day: "Tue", working: 6, absent: 2, halfday: 0 },
  { day: "Wed", working: 4, absent: 0, halfday: 4 },
  { day: "Thu", working: 8, absent: 0, halfday: 0 },
  { day: "Fri", working: 7, absent: 1, halfday: 0 },
  { day: "Sat", working: 0, absent: 0, halfday: 0 },
  { day: "Sun", working: 0, absent: 0, halfday: 0 },
];

// Map JS Date getDay() to day string
const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const todayStr = dayMap[new Date().getDay()]; // e.g., "Tue"

// Custom X-axis label renderer
const CustomXAxisTick = ({ x, y, payload }) => {
  const isWeekend = payload.value === "Sat" || payload.value === "Sun";
  const isToday = payload.value === todayStr;
  const highlight = isWeekend || isToday;

  return (
    <text
      x={x}
      y={y + 15}
      textAnchor="middle"
      fontSize={14}
      fill={highlight ? "#facc15" : "#374151"} // Yellow if weekend or today
      fontWeight={highlight ? "bold" : "normal"}
    >
      {payload.value}
    </text>
  );
};

export default function WeeklyStatusChart() {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
        Weekly Status & Bar Chart
      </h2>

      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} barGap={6}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />

          {/* Axes */}
          <XAxis dataKey="day" tick={<CustomXAxisTick />} />
          <YAxis tick={{ fill: "#374151", fontSize: 14 }} />

          {/* Tooltip + Legend */}
          <Tooltip
            contentStyle={{
              backgroundColor: "#f9fafb",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
            }}
          />
          <Legend wrapperStyle={{ fontSize: "14px" }} />

          {/* Bars */}
          <Bar dataKey="working" stackId="a" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => {
              const isWeekend = entry.day === "Sat" || entry.day === "Sun";
              const isToday = entry.day === todayStr;
              return (
                <Cell
                  key={`working-${index}`}
                  fill={isWeekend || isToday ? "#facc15" : "#34d399"}
                />
              );
            })}
          </Bar>

          <Bar dataKey="halfday" stackId="a" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => {
              const isWeekend = entry.day === "Sat" || entry.day === "Sun";
              const isToday = entry.day === todayStr;
              return (
                <Cell
                  key={`halfday-${index}`}
                  fill={isWeekend || isToday ? "#facc15" : "#60a5fa"}
                />
              );
            })}
          </Bar>

          <Bar dataKey="absent" stackId="a" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => {
              const isWeekend = entry.day === "Sat" || entry.day === "Sun";
              const isToday = entry.day === todayStr;
              return (
                <Cell
                  key={`absent-${index}`}
                  fill={isWeekend || isToday ? "#facc15" : "#f87171"}
                />
              );
            })}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
