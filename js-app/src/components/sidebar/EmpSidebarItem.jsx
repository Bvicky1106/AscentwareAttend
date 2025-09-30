import React from "react";

const EmpSidebarItem = ({ icon, label, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 my-1 rounded-lg cursor-pointer text-lg font-medium transition 
    ${
      active
        ? "bg-white text-[#0077b6] shadow-md"
        : "hover:bg-[#023e8a] hover:shadow"
    }`}
    >
      <span className="text-xl">{icon}</span>
      <span>{label}</span>
    </div>
  );
};

export default EmpSidebarItem;
