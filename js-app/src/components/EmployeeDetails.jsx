export default function EmployeeDetails() {
  return (
    <div className="flex justify-center items-start h-full w-full">
      <div className="rounded-xl text-center flex flex-col items-center justify-center font-sans text-sm w-full max-w-sm shadow-md p-4 bg-white">
        {/* Header */}
        <h2 className="text-2xl font-bold text-blue-600 mb-4 tracking-wide">
          Employee Details
        </h2>

        {/* Profile Image */}
        <div className="w-20 h-20 rounded-full bg-orange-500 flex justify-center items-center mb-4">
          <img
            src="/profile.png" // replace with actual image
            alt="Employee"
            className="w-12 h-12 rounded-full"
          />
        </div>

        {/* Employee Info */}
        <div className="text-left w-full px-4 space-y-1 text-lg">
          <p>
            <span className="font-semibold">Name:</span> John Doe
          </p>
          <p>
            <span className="font-semibold">Role:</span> Software Engineer
          </p>
          <p>
            <span className="font-semibold">Employee ID:</span> EMP123
          </p>
        </div>
      </div>
    </div>
  );
}
