// BreakApp.jsx
import BreakInfo from "./BreakInfo";

function BreakApp({ checkedIn = false, onBreakStart, onBreakEnd }) {
  return (
    <div className="flex-1 w-full rounded-xl p-3 flex flex-col justify-center tracking-[0.2px] text-[17px] font-medium text-[rgb(60,60,119)]">
      <BreakInfo
        checkedIn={checkedIn}
        onPause={onBreakStart}
        onResume={onBreakEnd}
      />
    </div>
  );
}

export default BreakApp;
